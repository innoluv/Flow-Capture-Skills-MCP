# Non-Billable Header Codes Reference (FY 2026)

## What is a Header Code?

A header code is a category-level ICD-10-CM code that has further subdivisions. Header codes CANNOT be submitted on claims — they must be coded to their most specific (leaf-node) level.

## How to identify a header code

If a code has valid subcodes beneath it in the ICD-10-CM tabular, it is a header and is non-billable. Only codes that have NO further subdivisions (leaf nodes) are billable.

---

## Common Non-Billable Headers (Alphabetical)

| Header | Billable? | Required Subdivision | Minimum Billable |
|---|---|---|---|
| C34 | NO | Site + laterality | C34.00, C34.01, C34.02, C34.10, C34.11, C34.12, etc. |
| C50 | NO | Site + laterality | C50.011, C50.012, C50.019, C50.111, etc. |
| C79 | NO | Site specificity | C79.00, C79.01, C79.02, C79.10, C79.11, etc. |
| C80 | NO | Type | C80.0, C80.1, C80.2 |
| C85 | NO | Subtype + site | C85.10, C85.11, C85.12, C85.90, C85.91, etc. |
| C96 | NO | Subtype | C96.0, C96.20, C96.21, C96.22, C96.29, C96.4, C96.5, C96.6, C96.9, C96.A, C96.Z |
| D09 | NO | Site | D09.0, D09.10, D09.19, D09.20, D09.21, D09.22, D09.3, D09.8, D09.9 |
| D61 | NO | Type | D61.01, D61.09, D61.1, D61.2, D61.3, D61.810, D61.811, D61.818, D61.82, D61.89, D61.9 |
| D70 | NO | Cause/type | D70.0, D70.1, D70.2, D70.3, D70.4, D70.8, D70.9 |
| D72 | NO | Type | D72.0, D72.1, D72.810, D72.818, D72.819, D72.820, D72.821, D72.822, D72.823, D72.824, D72.825, D72.829, D72.89, D72.9 |
| D75 | NO | Type | D75.0, D75.1, D75.81, D75.82, D75.89, D75.9, D75.A |
| D84 | NO | Type | D84.0, D84.1, D84.81, D84.821, D84.822, D84.89, D84.9 |
| D89 | NO | Type | D89.0, D89.1, D89.2, D89.3, D89.40, D89.41, D89.42, D89.43, D89.44, D89.49, D89.810, D89.811, D89.812, D89.813, D89.82, D89.83, D89.89, D89.9 |
| E10 | NO | Complication type | E10.10, E10.11, E10.21, E10.22, E10.29, E10.311–E10.9 |
| E11 | NO | Complication type | E11.00, E11.01, E11.10, E11.11, E11.21, E11.22, E11.29, E11.311–E11.9 |
| E13 | NO | Complication type | E13.00–E13.9 |
| E78 | NO | Type | E78.00, E78.01, E78.1, E78.2, E78.3, E78.41, E78.49, E78.5, E78.6, E78.70–E78.9 |
| J01 | NO | Site | J01.00, J01.01, J01.10, J01.11, J01.20, J01.21, J01.30, J01.31, J01.40, J01.41, J01.80, J01.81, J01.90, J01.91 |
| J44 | NO | Exacerbation type | J44.0, J44.1, J44.9 |
| K57 | NO | Site + type | K57.00–K57.93 |
| L03 | NO | Site | L03.011–L03.90 |
| M54 | NO | Site | M54.2, M54.30–M54.9 |
| M84 | NO | Fracture type + site | M84.30XA–M84.68XS (with 7th character) |
| N18 | NO | Stage | N18.1, N18.2, N18.30, N18.31, N18.32, N18.4, N18.5, N18.6, N18.9 |
| R50 | NO | Type | R50.2, R50.81, R50.82, R50.83, R50.84, R50.9 |
| R53 | NO | Type | R53.0, R53.1, R53.81, R53.82, R53.83 |
| S52 | NO | Fracture type + laterality + 7th char | S52.001A–S52.92XS |
| T81 | NO | Complication type + 7th char | T81.10XA–T81.9XXS |

---

## Confirmed Billable Codes (Common Exceptions)

These codes look like they might be headers but ARE billable as-is:

| Code | Description | Billable? |
|---|---|---|
| I10 | Essential (primary) hypertension | YES — billable, no further subdivision |
| J90 | Pleural effusion, NEC | YES — billable leaf code |
| R58 | Hemorrhage, NEC | YES — billable leaf code |
| R50.9 | Fever, unspecified | YES — billable (R50 is non-billable, but R50.9 is a leaf) |
| D64.9 | Anemia, unspecified | YES — billable leaf code |
| E78.5 | Hyperlipidemia, unspecified | YES — billable leaf code |
| R16.1 | Splenomegaly, not elsewhere classified | YES — billable leaf code |

---

## Decision Logic

For each code in the working set:
1. Is the code in the Non-Billable Headers table above? → Flag as non-billable, recommend subdivision
2. Is the code a 3-character code (e.g., E11, D89, C50)? → Almost certainly non-billable (rare exceptions like I10)
3. Does the code have further valid subdivisions in the tabular? → If yes, it's non-billable
4. Is the code a leaf node with no further subdivisions? → Billable
