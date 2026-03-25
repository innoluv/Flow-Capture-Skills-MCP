---
name: ncci-edit-checker
description: >
  Use this skill whenever the user wants to check NCCI (National Correct Coding Initiative) edit
  compliance on a patient claim or encounter. Triggers include: "check NCCI edits", "are these
  codes bundled?", "PTP edit", "procedure-to-procedure edit", "MUE check", "medically unlikely
  edit", "claim has a coding edit breach", "will this claim get denied for NCCI?", "validate
  CPT codes on encounter", "NCCI compliance check", or any mention of checking if two procedure
  codes can be billed together on the same date of service. Also use for any workflow involving
  fetching CMS NCCI edit tables, comparing procedure codes against NCCI rules, or reporting
  on modifier bypass eligibility. Use this skill proactively whenever the user mentions a claim
  with multiple CPT/HCPCS codes and wants to know if they're valid to bill together.
---

# NCCI Edit Checker Skill

## What this skill does

This skill checks a patient claim or encounter for **NCCI (National Correct Coding Initiative)**
edit breaches. It parses a structured encounter JSON, checks every procedure code pair against
PTP (Procedure-to-Procedure) edit rules, checks units billed against MUE (Medically Unlikely Edit)
limits, and returns a concise breach report.

---

## Step 0 — Parse the input

The encounter is provided as a JSON object with these fields. All fields except `encounter_note`
are required for a complete check — if any are missing, ask the user to supply them before
proceeding.

```json
{
  "encounter_note": "...",          // free-text clinical note (informational only, not evaluated)
  "date_of_service": "YYYY-MM-DD", // used to select the correct quarterly edit table
  "payer_name": "...",              // e.g. "Medicare", "Medicaid", "United Healthcare"
  "cpt_codes": [
    { "code": "99214", "modifiers": ["25"] },
    { "code": "93000", "modifiers": [] }
  ],
  "hcpcs_codes": [
    { "code": "G0439", "modifiers": [] }
  ],
  "em_codes": [
    { "code": "99214", "modifiers": ["25"] }
  ],
  "icd_codes": ["Z00.00", "I10"],   // diagnosis codes — not evaluated in NCCI checks (see note below)

  "modifier_context": {             // OPTIONAL — provide to enable single-modifier recommendation
    "[code]": {                     // key = the Column 2 (component) code needing a modifier
      "different_site": true,       // true if services were on a different anatomical structure/site
      "different_provider": false,  // true if a different practitioner performed this service
      "different_encounter": false, // true if performed at a separate encounter on the same DOS
      "unusual_service": false,     // true if the service was clinically unusual / non-overlapping
      "clinical_rationale": "..."   // one sentence explaining why the service was distinct
    }
  }
}
```

**modifier_context rules — when provided, always resolve to exactly ONE modifier:**

| Condition (checked in priority order) | Recommended Modifier |
|---|---|
| `different_site: true` | **-XS** — Separate anatomical Structure |
| `different_provider: true` | **-XP** — Separate Practitioner |
| `different_encounter: true` | **-XE** — Separate Encounter |
| `unusual_service: true` | **-XU** — Unusual, non-overlapping service |
| None of the above / context not provided | **-59** — Distinct Procedural Service (fallback) |

When `modifier_context` is absent or the specific code is not listed, default to recommending **-59** with a note that the submitter should review whether a more specific X-modifier applies. Never list multiple modifiers as options — always commit to one recommendation.

> **Note on ICD codes:** NCCI PTP and MUE edits are procedure-code-only rules. ICD/diagnosis codes
> are not part of NCCI logic and will not be evaluated here. They matter for separate medical
> necessity / LCD (Local Coverage Determination) checks, which are outside the scope of this skill.

Collect all procedure codes into a single working list by combining `cpt_codes`, `hcpcs_codes`,
and `em_codes`, deduplicating where the same code appears in multiple fields. Carry the modifiers
forward for each code.

---

## Step 1 — Fetch the NCCI PTP edit tables

CMS publishes NCCI PTP edit tables quarterly at:
**https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-procedure-procedure-ptp-edits**

Attempt to fetch this page and locate the most recent quarterly download. Use the appropriate table:
- **Physician/Practitioner** table for professional claims (CMS-1500 / 837P)
- **Outpatient Hospital** table for facility claims (UB-04 / 837I)

If the CMS site is inaccessible, fall back to the reference files in this skill folder and your
training knowledge. Always clearly note in the report whether live CMS tables or fallback knowledge
was used.

---

## Step 2 — PTP (Procedure-to-Procedure) Edit Check

For every unique pair of procedure codes (A, B), check the PTP edit table.

**Bidirectional lookup — always check both orderings:**
The CMS PTP table lists each pair only once with a fixed Column 1 / Column 2 orientation.
A claim may submit codes in either order. You must check **both (A, B) and (B, A)** against
the table. Use whichever ordering produces a match. If neither ordering matches, the pair
is ALLOWED and should not be added to findings.

**Date-activity check — perform this before treating a record as active:**
The PTP table includes `effective_date` and `deletion_date` for each record. Convert the
encounter `date_of_service` to a YYYYMMDD integer (`encounter_date_int`) and apply:

| Condition | Result |
|---|---|
| `effective_date > encounter_date_int` | → **ALLOWED** — edit not yet in effect at time of service; do not add to findings |
| `deletion_date ≤ encounter_date_int` | → **ALLOWED** — edit was retired on or before the DOS; do not add to findings (this includes `deletion_date == effective_date`, meaning CMS created and immediately retired the record) |
| Neither condition above | → **Record is date-active** — continue to modifier indicator check |

When working from training knowledge or offline reference files rather than a live CMS table,
assume records are date-active unless you have specific knowledge of an edit's retirement.

**Key columns in the PTP table:**
- **Column 1** — the comprehensive (primary) code
- **Column 2** — the component code that is bundled into Column 1
- **Modifier Indicator (MI):**
  - `9` = Not Applicable — this edit does not apply to this pair under the current policy context. Treat as **ALLOWED**; do not add to findings.
  - `0` = Hard edit — this pair can **never** be billed together, regardless of any modifier
  - `1` = Soft edit — this pair **may** be billed together if a valid bypass modifier is present
    on the Column 2 code and clinical documentation supports a distinct service

**For every flagged pair, determine the sub-reason — this is required in the output:**

- **CCI Bundling — Comprehensive/Component Code Conflict**
  The Column 2 code describes a step, sub-service, or element whose work is already fully
  included in the Column 1 code's descriptor and reimbursement. The component is not a
  separate procedure — it is part of the comprehensive one.
  *Indicators:* one code is a narrower version of another (e.g., tracing-only vs full ECG);
  a panel includes an individual analyte; a therapeutic procedure includes its diagnostic
  precursor; a higher-level service includes a lower-level one.

- **CCI Bundling — Mutually Exclusive Code Conflict**
  The two codes represent alternative approaches, techniques, or interpretations of the same
  clinical service that cannot logically or physically both be performed on the same patient
  on the same date. Neither is strictly a component of the other — they are competing options.
  *Indicators:* open vs laparoscopic approach to the same organ; bilateral vs unilateral
  version of the same study; two interpretations of the same test; same procedure repeated
  under different codes.

**Important scope limitations — do NOT over-apply the E&M bundle rules:**
- The rule that venipuncture (36415) bundles into E&M applies **only** to office/outpatient E&M codes 99202–99215.
- **Preventive medicine codes (99381–99397, including 99396)** have different NCCI relationships. When a preventive E&M is billed, separately ordered and separately documented lab panels (e.g., 85025 CBC, 80061 lipid panel, 80048 BMP) are **not** bundled into the preventive E&M under NCCI — they are billable separately.
- Do not flag code pairs as NCCI edits unless you can identify a specific CMS PTP table entry or a clear reference in the offline tables. When in doubt, mark as CLEAR.

**Modifier bypass (MI = 1 only):**
Always recommend exactly **one** bypass modifier — never more than one for NCCI purposes. Choose
the most specific applicable modifier:
- **-XE** — services were at a Separate Encounter
- **-XS** — services were on a Separate anatomical Structure
- **-XP** — services were by a Separate Practitioner
- **-XU** — service is Unusual, does not overlap with the other procedure
- **-59** — Distinct Procedural Service (broad fallback when none of the X-modifiers fit precisely)

**MI = 1 action table — determine the correct action based on what modifiers are on Column 2:**

| Column 2 modifier state | Action | Message |
|---|---|---|
| Valid NCCI override modifier present (`-59`, `-XE`, `-XS`, `-XP`, `-XU`) | **MODIFIER_APPLIED** — potential bypass | Override satisfied; documentation must support a distinct service |
| No modifiers at all | **SUPPRESS** | Recommend dropping the Column 2 (component) code; no clinical context for a distinct service has been submitted. Note: if MEAT documentation in the encounter note supports a separate service, `-59` may be justified — flag for reviewer. |
| Non-NCCI modifier present (e.g., `-LT`, `-RT`, `-26`, `-50`, `-TC`, `-GC`) but no valid NCCI bypass modifier | **MODIFIER_NEEDED** | A site/laterality/technical modifier is present but does not satisfy the NCCI bypass requirement. Add `-59` or the appropriate X-modifier (`-XE`, `-XS`, `-XP`, `-XU`) to Column 2 to indicate a distinct service. |

> **SUPPRESS vs MODIFIER_NEEDED note:** Both apply when MI=1 and no valid NCCI override modifier is present. The distinction matters for the action message: SUPPRESS means "drop the code unless documentation justifies adding -59"; MODIFIER_NEEDED means "the claim already signals a distinct service via another modifier — add the NCCI bypass modifier to complete the override."

---

## Step 3 — MUE (Medically Unlikely Edit) Check

For each procedure code, compare billed units to the CMS MUE value. MUE values are at:
**https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-medically-unlikely-edits**

**MAI (MUE Adjudication Indicator):**
- `1` — Line edit: strictly enforced per claim line
- `2` — Date of Service edit: units are summed across all lines on the same DOS
- `3` — Clinical edit: based on clinical criteria; less automatic, but still enforced

Flag any code where billed units exceed the MUE value.

---

## Step 4 — Output format

Return the report in this exact structure. Be concise — no extra narrative outside the defined
fields. Every field below must be present even if the answer is "None" or "N/A".

---

### NCCI Edit Check Report

**Date of Service:** [value]
**Payer:** [value]
**Edit Table Source:** [e.g. "CMS Q1 2026 tables" | "Training knowledge fallback — verify against current CMS tables"]

---

#### PTP Findings

For each flagged code pair, use this block. If no PTP breaches, write: `✅ No PTP edit breaches found.`

```
[Column 1 code + description] × [Column 2 code + description]
Edit type:   HARD (MI=0) | SOFT (MI=1)
Sub-reason:  CCI Bundling — Comprehensive/Component Code Conflict
             | CCI Bundling — Mutually Exclusive Code Conflict
Status:      ACTIVE BREACH | POTENTIAL BYPASS | CLEAR
Modifier:    [If SOFT + modifier already present]: "[modifier]" detected on [Column 2 code] — potential bypass, documentation required
             [If SOFT + no modifier present]:      No bypass modifier present — recommend adding [single best modifier] to [Column 2 code]
             [If HARD]:                            No modifier can override this edit
Explanation: [One sentence: why these codes conflict — reference the sub-reason type in plain language]
```

---

#### MUE Findings

For each code exceeding its MUE, use this block. If no MUE breaches, write: `✅ No MUE breaches found.`

```
[CPT/HCPCS code + description]
Units billed:   [X]
MUE limit:      [Y]  (MAI [1/2/3] — [Line | Date of Service | Clinical] edit)
Units over:     [X - Y]
Action:         Reduce to [Y] units, or split excess units to a separate date of service with
                supporting documentation.
```

---

#### Summary

```
Procedure codes checked:  [N]
PTP pairs evaluated:      [N]
  Hard breaches (MI=0):   [N]  ← cannot be resolved with a modifier
  Soft breaches (MI=1):   [N]  ← can be bypassed with correct modifier + documentation
  Potential bypasses:     [N]  ← soft edit where a modifier is already present
MUE breaches:             [N]
ICD codes:                [list] — not evaluated (out of scope for NCCI)
Overall status:           ✅ CLEAN | ⚠️ REVIEW REQUIRED | ❌ BREACH(ES) FOUND

Status rules:
- ✅ CLEAN — No PTP or MUE breaches of any kind
- ⚠️ REVIEW REQUIRED — One or more soft PTP edits (MI=1) with a bypass modifier already present (potential bypass; documentation review needed). No hard breaches, no MUE breaches.
- ❌ BREACH(ES) FOUND — Use this whenever ANY of the following: hard PTP breach (MI=0), soft PTP breach with NO modifier, OR any MUE breach. MUE breaches always produce ❌ BREACH(ES) FOUND.
```

---

#### Payer Note

One short paragraph tailored to the payer provided:
- **Medicare / Medicaid**: NCCI edits are mandatory and enforced at adjudication. Hard edits cause automatic denial. Soft edits with a valid modifier still require documentation.
- **Medicare Advantage**: Follows Medicare coding baseline; individual plan policies may layer additional restrictions.
- **Commercial**: Most commercial payers mirror CMS NCCI logic. Plan-specific exceptions exist — verify with the specific payer's policy before resubmitting.

---

#### Why Are We Suggesting This — Audit Trail

This section is **required in every report** regardless of whether breaches were found. It provides a traceable, step-by-step record of how the analysis was performed, what sources were consulted, and why each conclusion was reached. Each step must cite its source.

Use this exact format — one numbered step per action taken:

```
Why are we suggesting this
──────────────────────────────────────────────────────

1. [Action taken]
   Source: [Encounter note | CMS PTP Table (Q[X] [YEAR]) | CMS MUE Table | Skill reference: common-ptp-pairs.md | Skill reference: mue-common-codes.md | Training knowledge fallback]
   Finding: [What was found — one sentence]

2. [Action taken]
   Source: [...]
   Finding: [...]

... (one step per code pair evaluated, one step for MUE check, one step for payer note)
```

**Required steps — always include all of these:**

**Step A — Input parsing**
Action: "Parsed encounter input and extracted all procedure codes."
Source: Encounter note (JSON input)
Finding: List all codes extracted, e.g. "Extracted 4 procedure codes: 99214, 36415, 93000, 93005. Carrying modifiers: [25] on 99214."

**Step B — Edit table source**
Action: "Attempted to retrieve current CMS NCCI PTP edit tables."
Source: CMS PTP page URL (if live fetch succeeded) OR "Training knowledge fallback" (if fetch failed)
Finding: "Using [Q1 2026 CMS tables | training knowledge] for this analysis."

**Step C — For each PTP pair checked (one step per pair, including CLEAR pairs)**
Action: "Evaluated PTP pair: [Code A] × [Code B]."
Source: [CMS PTP table | Skill reference: common-ptp-pairs.md | Training knowledge]
Finding: "Pair found in NCCI table as [Column 1] × [Column 2], MI=[0/1] — [BREACH / CLEAR]. [Sub-reason if breach.]"

**Step D — MUE check (one step per code)**
Action: "Checked MUE limit for [code]."
Source: [CMS MUE table | Skill reference: mue-common-codes.md | Training knowledge]
Finding: "[X] units billed vs MUE of [Y] (MAI [N]) — [BREACH / CLEAR]."

**Step E — Payer applicability**
Action: "Assessed NCCI applicability for payer: [payer name]."
Source: CMS NCCI policy documentation
Finding: "[NCCI is mandatory for this payer | NCCI is adopted by this payer — plan-specific exceptions may apply]."

**Step F — Final determination**
Action: "Compiled findings and determined overall claim status."
Source: Aggregated PTP and MUE results above
Finding: "Overall status: [CLEAN / REVIEW REQUIRED / BREACH(ES) FOUND]. [Brief reason.]"

---

## Reference files

- `references/common-ptp-pairs.md` — Frequently encountered PTP edit pairs for offline lookup
- `references/mue-common-codes.md` — Common MUE values for high-frequency procedure codes

Read these when the CMS site is unavailable or to quickly pre-screen results.
