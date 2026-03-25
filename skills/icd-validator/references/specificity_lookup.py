#!/usr/bin/env python3
"""
ICD-10-CM Specificity Checker — deterministic lookup against full FY 2026 tabular.

Checks each input code for:
1. Billable status — flags non-billable headers with their direct billable children
2. Unspecified (.9) — lists specific sibling alternatives
3. Short codes — flags codes that have more specific subcodes available
4. 7th character — flags S/T/V/W/X/Y codes needing 7th character extension
5. Trailing zeros — flags .0/.00 codes when non-zero siblings exist
6. Other-specified (.8) — notes when .8 code may need more detail

Usage:
  echo '["C50", "D70.9", "R53.82"]' | python3 specificity_lookup.py
  python3 specificity_lookup.py C50 D70.9 R53.82
"""
import json, sys
from pathlib import Path
from collections import defaultdict

def clean(code):
    return code.replace(".", "")

def load_reference():
    ref_path = Path(__file__).parent / "icd10cm_codes.json"
    with open(ref_path) as f:
        return json.load(f)

def build_indexes(ref):
    """Build prefix index and parent-children index for efficient lookups."""
    # Group codes by their clean prefix (all lengths)
    by_clean = {}  # clean -> dotted code
    for code in ref:
        by_clean[clean(code)] = code

    # Build children index: for each code, find codes that extend by 1 char
    children_idx = defaultdict(list)
    for cl, code in by_clean.items():
        if len(cl) > 1:
            parent_cl = cl[:-1]
            if parent_cl in by_clean:
                children_idx[parent_cl].append(code)

    # Build sibling index: codes sharing same parent prefix and same clean length
    sibling_idx = defaultdict(list)
    for cl, code in by_clean.items():
        if len(cl) >= 4:  # At least X00.x level
            parent_cl = cl[:-1]
            sibling_idx[(parent_cl, len(cl))].append(code)

    return by_clean, children_idx, sibling_idx

def check_code(code, ref, by_clean, children_idx, sibling_idx):
    findings = {"code": code}
    cl = clean(code)

    if code not in ref:
        findings["error"] = "Code not found in FY 2026 reference"
        return findings

    entry = ref[code]
    findings["description"] = entry["d"]
    findings["billable"] = entry["b"]

    # 1. Non-billable header — list direct billable children
    if not entry["b"]:
        children = sorted(children_idx.get(cl, []))
        billable_children = [c for c in children if ref[c]["b"]]
        if billable_children:
            findings["direct_billable_children"] = [
                {"code": c, "desc": ref[c]["d"][:60]} for c in billable_children
            ]
        findings["issue"] = "NON_BILLABLE_HEADER"

    # 2. Unspecified (.9 terminal) — list specific siblings
    if '.' in code:
        after_dot = code.split('.')[1]
        if after_dot and after_dot[0] == '9':
            key = (cl[:-1], len(cl))
            siblings = sorted(c for c in sibling_idx.get(key, []) if c != code)
            specific_siblings = [c for c in siblings if not clean(c)[-1] == '9']
            if specific_siblings:
                findings["unspecified_siblings"] = [
                    {"code": c, "desc": ref[c]["d"][:60]} for c in specific_siblings[:10]
                ]
                findings.setdefault("issue", "UNSPECIFIED_9")

    # 3. Trailing zeros (.0, .00) — may indicate unspecified subtype
    if '.' in code:
        after_dot = code.split('.')[1]
        if after_dot and all(c == '0' for c in after_dot):
            key = (cl[:-1], len(cl))
            siblings = sorted(c for c in sibling_idx.get(key, []) if c != code)
            non_zero = [c for c in siblings if clean(c)[-1] != '0']
            if non_zero:
                findings["trailing_zero_siblings"] = [
                    {"code": c, "desc": ref[c]["d"][:60]} for c in non_zero[:10]
                ]
                findings.setdefault("issue", "TRAILING_ZERO")

    # 4. Other-specified (.8 terminal) — note for review
    if '.' in code:
        after_dot = code.split('.')[1]
        if after_dot and after_dot[0] == '8':
            findings.setdefault("note", "OTHER_SPECIFIED_8 — verify documentation supports this specificity level")

    # 5. Has more specific children (even if billable, children = more specific option)
    if entry["b"]:
        children = children_idx.get(cl, [])
        if children:
            billable_children = sorted(c for c in children if ref[c]["b"])
            if billable_children:
                findings["more_specific_children"] = [
                    {"code": c, "desc": ref[c]["d"][:60]} for c in billable_children[:10]
                ]
                findings.setdefault("issue", "HAS_MORE_SPECIFIC")

    # 6. 7th character check (S/T/V/W/X/Y codes with < 7 clean chars)
    if code[0] in "STVWXY" and len(cl) < 7:
        findings["may_need_7th_char"] = True
        findings.setdefault("issue", "MISSING_7TH_CHAR")

    # 7. Laterality check — position 5 (0-indexed 4) = 9 in M/S/H/G/L codes
    if code[0] in "MSHGL" and len(cl) >= 5:
        if cl[4] == '9':
            # Check if lateralized siblings exist (position 5 = 1/2/3)
            key = (cl[:4], 5) if len(cl) == 5 else (cl[:4], len(cl))
            lat_siblings = [c for c in sibling_idx.get((cl[:4], len(cl)), [])
                           if c != code and clean(c)[4] in '123']
            if lat_siblings:
                findings["laterality_unspecified"] = [
                    {"code": c, "desc": ref[c]["d"][:60]} for c in sorted(lat_siblings)[:6]
                ]
                findings.setdefault("issue", "UNSPECIFIED_LATERALITY")

    return findings

def main():
    if len(sys.argv) > 1:
        codes = sys.argv[1:]
    else:
        try:
            codes = json.loads(sys.stdin.read())
            if not isinstance(codes, list): codes = [codes]
        except json.JSONDecodeError:
            print("Error: Invalid JSON input", file=sys.stderr)
            sys.exit(1)

    ref = load_reference()
    by_clean, children_idx, sibling_idx = build_indexes(ref)

    results = [check_code(c.strip(), ref, by_clean, children_idx, sibling_idx)
               for c in codes if c.strip()]

    print(json.dumps(results, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
