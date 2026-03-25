# 7th Character Extension Rules (FY 2026)

## When 7th Characters Are Required

7th characters are MANDATORY (not optional) for codes in these categories. A missing 7th character = hard claim rejection.

### Category 1: Injury Codes (S00–S99)

ALL S-category codes require a 7th character.

| 7th Char | Meaning | Use when note describes |
|---|---|---|
| A | Initial encounter | First visit, active treatment, ER presentation, initial workup, surgery |
| D | Subsequent encounter | Follow-up, routine healing, ongoing management of known injury |
| S | Sequela | Late effect — the original injury is healed but causes residual problems |

**Placeholder X:** If the code has fewer than 6 characters before the 7th, pad with X:
- S90.51 (5 chars) → S90.512D (add laterality digit 2 for left, then 7th char D)
- S06.0 (4 chars) → S06.0X0A (pad with X, add concussion loss of consciousness digit, add 7th char A)

### Category 2: Poisoning / Adverse Effects (T36–T50)

All T36–T50 codes require a 7th character (A, D, or S).

- T36.0X1A = Poisoning by penicillins, accidental, initial encounter
- The X is a placeholder (position 5), 1 = accidental intent, A = initial encounter

### Category 3: Complications of Care (T80–T88)

All require 7th character A, D, or S.

### Category 4: Fractures

**Standard fracture 7th characters:**

| 7th Char | Meaning |
|---|---|
| A | Initial encounter for closed fracture |
| B | Initial encounter for open fracture type I or II |
| C | Initial encounter for open fracture type IIIA/IIIB/IIIC |
| D | Subsequent encounter for fracture with routine healing |
| G | Subsequent encounter for fracture with delayed healing |
| K | Subsequent encounter for fracture with nonunion |
| P | Subsequent encounter for fracture with malunion |
| S | Sequela |

**Applies to:** S12, S22, S32, S42, S49, S52, S59, S62, S72, S79, S82, S89, S92

### Category 5: Pathological Fractures (M80, M84.3–M84.6)

| 7th Char | Meaning |
|---|---|
| A | Initial encounter for fracture |
| D | Subsequent encounter for fracture with routine healing |
| G | Subsequent encounter with delayed healing |
| K | Subsequent encounter with nonunion |
| P | Subsequent encounter with malunion |
| S | Sequela |

### Category 6: External Causes (V00–Y99)

All require 7th character A, D, or S.

### Category 7: Secondary Malignancy / Metastasis Codes (C77–C79, C80)

These codes are commonly output by extraction services WITHOUT encounter-type extensions. While the ICD-10-CM tabular does not technically require a 7th character for all C77–C79 codes, many payers and coding compliance programs expect encounter-type specificity.

**When to add encounter-type extension:**
- If the clinical note clearly describes an initial encounter (new diagnosis, active treatment) → add XA via placeholder
- C79.51 → C79.51XA (initial encounter for bone metastasis)
- C79.31 → C79.31XA (initial encounter for brain metastasis)

**When NOT to add:** If the code is already at maximum specificity per the tabular and no 7th character position exists.

---

## Placeholder X — Detailed Rules

When a code requires a 7th character but has fewer than 7 total characters (including the letter, digits, and decimal), fill intermediate positions with X.

**Examples:**

| Original | Chars | Needs 7th? | Corrected | Explanation |
|---|---|---|---|---|
| T36.0 | 5 | Yes (T-code) | T36.0X1A | X fills position 5, 1 = intent, A = encounter |
| S90.51 | 6 | Yes (S-code) | S90.512A | Position 6 = laterality (2=left), position 7 = A |
| C79.51 | 6 | Recommended | C79.51XA | X fills position 6, A = encounter type |
| R53.82 | 6 | No (R-code, 5 chars after decimal is sufficient) | R53.82 | No 7th char needed — not an injury/fracture/complication code |
| M84.40 | 6 | Yes (pathological fracture) | M84.40XA | X fills position 6, A = initial encounter |

**Key rule:** Count the positions. ICD-10-CM format is: `L##.####` where L is a letter, ## is 2 digits, and up to 4 characters after the decimal. The 7th character is the 7th position counting from the start (letter = position 1).

---

## Laterality Extensions (Common Families)

| Code family | Right | Left | Bilateral | Unspecified |
|---|---|---|---|---|
| C34 (Lung neoplasm) | .x1 (right) | .x2 (left) | — | .x0 (unspecified) |
| J91.0 (Malig pleural effusion) | .01 | .02 | .03 | .0 (no laterality) |
| H40 (Glaucoma) | .x1 | .x2 | .x3 | .x0 or .x9 |
| M25 (Joint disorders) | site-specific 5th char | varies | varies | .x9 |
| S-codes (Injuries) | often 1 at 5th/6th pos | 2 | — | 9 |

**Action:** When the note documents "right-sided," "left," or "bilateral," verify the code includes the correct laterality digit. If it uses unspecified (0 or 9) when laterality is documented, upgrade.
