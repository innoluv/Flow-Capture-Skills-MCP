---
name: addon-dependency-check
description: >
  Use this skill whenever the user wants to validate, identify, or suggest CPT/HCPCS add-on code
  dependencies for a claim or encounter. Trigger on phrases like "check add-on codes", "missing
  add-on", "add-on dependency", "is this code valid without a primary", "what add-on codes apply
  here", "suggest add-on codes", "validate add-on billing", "NCCI add-on", "CPT add-on",
  "standalone add-on", "add-on without primary", or any scenario where procedure codes are being
  reviewed for add-on/primary service relationships. Also trigger when the user provides an
  encounter note + CPT/HCPCS codes + date of service and wants to know which add-on codes should
  be appended, or whether existing add-ons are valid. Covers both NCCI AOC (CMS-defined) and
  CPT-editorial (non-NCCI) add-on dependencies. Always requires: (1) encounter note, (2)
  CPT/HCPCS codes, (3) date of service. If any of these are missing, ask for them before
  proceeding.
---

# Service Add-On Dependency Check Skill

Evaluates CPT/HCPCS procedure codes against an encounter note and date of service to determine
which add-on codes should be appended. Works in two directions:

1. **Flag** — Add-on present on claim, primary missing → flag as invalid standalone
2. **Suggest** — Primary present, applicable add-on not yet on claim → recommend addition

---

## Required Inputs

Before beginning analysis, confirm all three inputs are present. If any are missing, ask the user:

| Input | Description |
|---|---|
| **Encounter Note** | Clinical documentation for the visit (SOAP note, op report, H&P, etc.) |
| **CPT/HCPCS Codes** | The procedure codes submitted or being considered for the claim |
| **Date of Service (DOS)** | Used to validate active/deleted status of all codes and edit rules |

---

## Step 0: Load the NCCI AOC Reference File

Load the bundled NCCI Add-On Code file using pandas:

```
/mnt/skills/user/addon-dependency-check/references/AOC_V2026Q2-MCR.xlsx
```

**File structure (header row = row index 1, skip row 0 which is AMA copyright notice):**

```python
import pandas as pd
df = pd.read_excel('AOC_V2026Q2-MCR.xlsx', sheet_name=0, header=1)
```

| Column | Field Name | Description |
|---|---|---|
| A | `AOC_Edit_Type` | Add-on type: 1, 2, or 3 (see type definitions below) |
| B | `Add-On_Code` | The CPT/HCPCS code that is the add-on |
| C | `AOC_DelDT` | Add-on code delete date (format: `YYYYDDD` where DDD = day of year) |
| D | `Primary_Code` | The qualifying primary code. `CCCCC` = contractor-defined (Type 2) |
| E | `Primary_Code_DelDT` | Primary code delete date (format: `YYYYDDD`) |
| F | `AOC_Edit_EffDT` | Date the add-on/primary pairing became effective (format: `YYYYDDD`) |
| G | `AOC_Edit_DelDT` | Date the add-on/primary pairing was deleted (format: `YYYYDDD`) |
| H | `Special_Instruction_Notes` | Notes such as "Contractor Defined Primary Codes" |

### Date Format Conversion (`YYYYDDD`)

All dates in the AOC file use the format `YYYYDDD` where `DDD` is the ordinal day of the year:
- `2026001` = January 1, 2026
- `2026365` = December 31, 2026
- `2026091` = April 1, 2026

To convert to a calendar date for comparison against DOS:
```python
from datetime import datetime
import pandas as pd

def parse_yyyyddd(val):
    if pd.isna(val): return None
    val = int(val)
    year = val // 1000
    day = val % 1000
    return datetime(year, 1, 1) + pd.Timedelta(days=day - 1)
```

---

## Step 1: Filter AOC File for Relevant Codes

Given the input CPT/HCPCS codes, filter the AOC dataframe to rows where:
- `Add-On_Code` OR `Primary_Code` matches any of the input codes

Then apply DOS-based validity filtering in Step 2.

---

## Step 2: Three-Gate Evaluation per Primary Code

For each CPT/HCPCS code in the input, run it through all three gates. A suggested add-on only
proceeds to output if it passes **all three gates**.

---

### Gate 1: Eligibility — Does this primary code have applicable add-on codes?

**Check NCCI AOC file:**
- Query filtered AOC data: find ALL rows where `Primary_Code` = this code
- Collect every associated `Add-On_Code` entry as a candidate list — there may be multiple
- Record each candidate's `AOC_Edit_Type` and `Special_Instruction_Notes`

**Check CPT-editorial (non-NCCI) add-ons:**
- Using CPT knowledge: identify ALL `+` prefix add-on codes whose CPT descriptor states
  "listed separately in addition to" this primary code
- A single primary may have several CPT-editorial add-ons (e.g., vessel repair primary may
  have add-ons for each additional branch, stent placement, endarterectomy, etc.)
- These will NOT appear in the AOC file — apply from training knowledge
- Mark each as `CPT-Editorial` type

**Important — treat each candidate add-on independently:**
A primary code may yield a list of N candidate add-on codes from NCCI and/or CPT sources.
Each candidate proceeds through Gates 2 and 3 separately. Do not collapse or deduplicate
until after all gates are evaluated.

If no NCCI or CPT-editorial add-ons exist for this primary → mark as **No Add-On Applicable**,
skip remaining gates.

---

### Gate 2: Validity — Are the codes and the edit rule active on the DOS?

For each candidate add-on code identified in Gate 1, all four conditions must be true:

| Condition | Rule |
|---|---|
| **Add-on code not deleted** | `AOC_DelDT` is blank OR `parse_yyyyddd(AOC_DelDT) > DOS` |
| **Primary code not deleted** | `Primary_Code_DelDT` is blank OR `parse_yyyyddd(Primary_Code_DelDT) > DOS` |
| **Edit rule is effective** | `parse_yyyyddd(AOC_Edit_EffDT) <= DOS` |
| **Edit rule not deleted** | `AOC_Edit_DelDT` is blank OR `parse_yyyyddd(AOC_Edit_DelDT) > DOS` |

For CPT-editorial add-ons: the add-on is valid if it exists in the CPT edition covering the DOS year.

If any condition fails → mark as **Invalid for DOS**, exclude from output.

---

### Gate 3: Necessity — Does the encounter note support this add-on?

For **each individual add-on candidate** that passed Gates 1 and 2, read the encounter note
and evaluate clinical necessity independently. All passing candidates are retained — a primary
code may result in multiple add-ons all clearing Gate 3.

**Clinical signals to look for by add-on category:**

| Add-On Category | Signals in Encounter Note |
|---|---|
| Additional lesion/unit | Quantity > 1 (e.g., "3 lesions", "bilateral", "multiple sites") |
| Complexity add-on | Documentation of increased complexity, difficulty, or extended time |
| Additional segment/level | Multiple levels, segments, or vertebral bodies specified |
| Additional vessel/branch | Each named vessel or branch explicitly documented as treated |
| Stent/device placement | Specific device, stent, or implant noted as placed at a distinct site |
| Intraoperative monitoring | References to neuromonitoring, SSEP, MEP, or EMG during procedure |
| Prolonged services | Extended time beyond typical service duration documented |
| Imaging guidance | Fluoroscopy, ultrasound, or CT guidance explicitly noted as used |
| Drug/substance add-on | Specific drug, dose, or administration route documented |

Extract 1–2 sentences from the encounter note as the supporting clinical rationale for **each**
add-on evaluated.

**Necessity decision (per add-on candidate):**
- Note clearly supports → **Necessary** → retain for output
- Note partially supports or is ambiguous → **Needs Review** → retain for output with review flag
- Note provides no support → **Not Supported** → exclude from output

---

## Step 3: Determine Output Status

| Condition | Status |
|---|---|
| All three gates passed confidently, clinical rationale clearly in note | **Auto-Approved** |
| Gate 3 ambiguous — note partially supports | **Needs Review** |
| NCCI Type 2 (contractor-defined primaries, `CCCCC` in file) | **Needs Review** |
| NCCI Type 3 — primary not in CMS partial list (MAC expansion may apply) | **Needs Review** |
| Conflicting signals in encounter note | **Needs Review** |
| Add-on billed without valid primary present on claim | **Flagged — Invalid Standalone** |

---

## Step 4: Output Format

### A. Summary Table

Group results by primary code. If a primary code has multiple add-ons that passed all three
gates, combine them into a single chained row:

| Code String | Source(s) | DOS Valid? | Clinical Support | Status | Reason (brief) |
|---|---|---|---|---|---|
| `XXXXX + YYYYY` | NCCI T1 | Yes | Yes | Auto-Approved | One-line rationale |
| `XXXXX + YYYYY + ZZZZZ + AAAAA` | NCCI T1, CPT-Editorial, NCCI T3 | Yes | Yes / Partial | Needs Review | One-line rationale |
| `(missing) + YYYYY` | NCCI T1 | Yes | — | Flagged — Invalid Standalone | Primary absent from claim |

**Code string formatting rules:**
- Single add-on: `Primary + Add-On`
- Multiple add-ons: `Primary + Add-On 1 + Add-On 2 + ... + Add-On N`
- List add-ons in order: NCCI Type 1 first, then Type 2/3, then CPT-Editorial
- Flag rows: replace primary with `(missing)` and show the orphaned add-on code
**Status for multi-add-on rows:**
- All add-ons Auto-Approved → row status = **Auto-Approved**
- Any add-on is Needs Review → entire row status = **Needs Review** (do not split into separate rows)
- Always use the most conservative status across all add-ons for the combined row

### B. Narrative Detail

For each primary code, produce one narrative block covering all its add-ons:

```
Primary Code:    [XXXXX] — [Brief descriptor]
Add-On Code(s):  +YYYYY | +ZZZZZ | +AAAAA
Full Code String: XXXXX + YYYYY + ZZZZZ + AAAAA

Per Add-On:
  +YYYYY  Source: NCCI Type 1 | DOS Valid: Yes
          Clinical Signal: [Quote or paraphrase from note]
          Rationale: [2–3 sentences]
          Status: Auto-Approved

  +ZZZZZ  Source: CPT-Editorial | DOS Valid: Yes
          Clinical Signal: [Quote or paraphrase from note]
          Rationale: [2–3 sentences]
          Status: Auto-Approved

  +AAAAA  Source: NCCI Type 3 | DOS Valid: Yes
          Clinical Signal: [Ambiguous — note mentions X but does not confirm Y]
          Rationale: [2–3 sentences]
          Status: Needs Review

Overall Action: Add XXXXX + YYYYY + ZZZZZ to claim. Submit +AAAAA for review.
```

**Flag direction blocks** (orphaned add-on, no valid primary):
```
Add-On Code:     +YYYYY — [Brief descriptor]
Primary Code:    (missing from claim)
Source:          NCCI Type [1/2/3] | CPT-Editorial
Rationale:       [Why this is invalid standalone]
Status:          Flagged — Invalid Standalone
Action:          Remove from claim or add required primary [XXXXX]
```

---

## Step 5: Disclaimer

Always append:

> **Note:** This analysis uses the CMS NCCI AOC Q2 2026 file and AMA CPT editorial rules.
> Type 2 NCCI add-ons require MAC-defined primary codes not available in this file. Type 3
> add-ons may have MAC-expanded primary lists beyond what CMS publishes. CPT-editorial add-ons
> are based on AMA CPT guidelines, updated annually. Always verify against applicable payer
> policy, LCD/NCD, and the current CPT manual. This output does not constitute billing or
> legal advice.

---

## Add-On Type Reference

| Type | Source | Primary Code Defined By | Flexibility |
|---|---|---|---|
| NCCI Type 1 | CMS NCCI AOC file | CMS — closed, explicit list | None — strict |
| NCCI Type 2 | CMS NCCI AOC file | MAC (shown as `CCCCC` in file) | MAC defines all acceptable primaries |
| NCCI Type 3 | CMS NCCI AOC file | CMS partial list; MAC may expand | MACs may allow additional primaries |
| CPT-Editorial | AMA CPT manual | AMA parenthetical/descriptor notes | Enforced by MACs, LCDs, post-pay audits |

---

## Reference Files

| File | Purpose | When to Load |
|---|---|---|
| `references/AOC_V2026Q2-MCR.xlsx` | CMS NCCI Add-On Code dependency rules, Q2 2026 | Always — load in Step 0 |

> This file covers Q2 2026. For DOS outside this period, note that rules may differ.
> Recommend the user supply the AOC file for the applicable quarter.
