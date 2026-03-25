# Common NCCI PTP Edit Pairs — Quick Reference

This is an offline reference for frequently encountered PTP edit pairs. Use this when the CMS site is unavailable or to quickly pre-screen a claim. Always confirm against the current CMS quarterly tables when possible.

**MI = Modifier Indicator**
- `0` = Cannot be bypassed (hard edit — never payable together)
- `1` = Can be bypassed with a valid modifier (-59, -XS, -XU, -XP, -XE) plus documentation

**Sub-reason types:**
- **C/C** = CCI Bundling — Comprehensive/Component Code Conflict (Column 2 is a subset/step already included in Column 1)
- **ME** = CCI Bundling — Mutually Exclusive Code Conflict (two codes that represent alternative approaches and cannot both be performed on the same patient same date)

---

## Evaluation & Management (E&M) + Procedure Bundles

> ⚠️ **Scope note:** The E&M bundles in this section apply **only** to office/outpatient E&M codes 99202–99215. They do **NOT** apply to preventive medicine codes (99381–99397, e.g., 99396). Preventive E&M codes have their own NCCI relationships and do **not** bundle separately ordered, separately documented lab panels (e.g., 85025 CBC, 80061 lipid panel) billed independently from the visit.

| Column 1 (Comprehensive) | Column 2 (Component) | MI | Sub-reason | Notes |
|---|---|---|---|---|
| 99202–99215 (Office E&M) | 99000 (Specimen handling) | 1 | C/C | Routine specimen handling is included in E&M work |
| 99202–99215 | 36415 (Venipuncture, routine) | 0 | C/C | Routine blood draw is a component service included in office E&M (99202–99215 only; does NOT apply to preventive codes 99381–99397) |
| 99202–99215 | 99211 (Nurse visit) | 0 | C/C | Lower-level E&M service bundled into higher-level visit |
| 99221–99223 (Hospital admit) | 99201–99215 (Office E&M) | 0 | ME | Same-day hospital admission and office E&M represent the same encounter, billed under different settings — mutually exclusive |
| 99232–99233 (Hospital subsequent) | 99231 | 0 | C/C | Lower-complexity subsequent visit bundled into higher-complexity code |

---

## Surgery Bundles

| Column 1 | Column 2 | MI | Sub-reason | Notes |
|---|---|---|---|---|
| Any major surgery (global period) | 99024 (Post-op visit) | 0 | C/C | Post-operative visits are included in the surgical global package |
| 27447 (Total knee arthroplasty) | 27310 (Arthrotomy, knee) | 0 | C/C | Arthrotomy (opening the joint) is a required component step within the TKA procedure |
| 43239 (EGD with biopsy) | 43235 (EGD, diagnostic) | 0 | C/C | Diagnostic EGD is the precursor component to any therapeutic EGD — already included |
| 45380 (Colonoscopy with biopsy) | 45378 (Diagnostic colonoscopy) | 0 | C/C | Diagnostic colonoscopy is included within the therapeutic biopsy colonoscopy |
| 45385 (Colonoscopy with polypectomy) | 45378 (Diagnostic colonoscopy) | 1 | C/C | Diagnostic component included in polypectomy; MI=1 allows bypass with modifier if truly distinct |
| 45385 | 45380 (Colonoscopy with biopsy) | 1 | ME | Two different therapeutic colonoscopy techniques; mutually exclusive unless performed at distinct anatomical sites |
| 47562 (Laparoscopic cholecystectomy) | 47600 (Open cholecystectomy) | 0 | ME | Laparoscopic and open approaches to the same organ removal — only one surgical approach can be used |

---

## Radiology / Imaging

| Column 1 | Column 2 | MI | Sub-reason | Notes |
|---|---|---|---|---|
| 71046 (Chest X-ray, 2 views) | 71045 (Chest X-ray, 1 view) | 0 | C/C | Single-view X-ray is a component of the 2-view study |
| 73721 (MRI knee without contrast) | 73722 (MRI knee with contrast) | 0 | ME | Without-contrast and with-contrast MRI of the same joint on the same date are mutually exclusive studies; only one protocol should be ordered |
| 77067 (Screening mammogram, bilateral) | 77065 (Screening mammogram, unilateral) | 0 | C/C | Unilateral mammogram is a component of the bilateral study |

---

## Anesthesia / Pain Management

| Column 1 | Column 2 | MI | Sub-reason | Notes |
|---|---|---|---|---|
| 62323 (Epidural injection, lumbar) | 62321 (Epidural, thoracic) | 1 | ME | Different spinal levels; mutually exclusive when applied to the same level, but MI=1 allows bypass if genuinely separate levels are treated |
| 64483 (Transforaminal epidural, lumbar) | 64479 (Transforaminal epidural, cervical/thoracic) | 1 | ME | Different spinal regions; same logic as above |
| 00810 (Anesthesia, colonoscopy) | 00740 (Anesthesia, upper GI) | 1 | ME | Two separate anesthesia services for upper and lower endoscopy on same day; mutually exclusive unless both scopes performed |

---

## Cardiology

| Column 1 | Column 2 | MI | Sub-reason | Notes |
|---|---|---|---|---|
| 93306 (Echo with Doppler, complete) | 93303 (Echo, congenital) | 1 | ME | Complete echo and congenital echo are alternative interpretive approaches to the same imaging study |
| 93306 | 93307 (Echo, 2D without Doppler) | 0 | C/C | 2D echo without Doppler is a component subset of the complete echo with Doppler |
| 93000 (ECG with interpretation) | 93005 (ECG tracing only) | 0 | C/C | ECG tracing is the technical component already included in the complete ECG service |
| 93000 | 93010 (ECG interpretation only) | 0 | C/C | ECG interpretation is the professional component already included in the complete ECG service |
| 93017 (ETT tracing) | 93016 (ETT supervision) | 0 | C/C | Supervision is a component of the exercise tolerance test tracing service |

---

## Pathology / Lab

| Column 1 | Column 2 | MI | Sub-reason | Notes |
|---|---|---|---|---|
| 88305 (Surgical pathology, level IV) | 88300 (Level I) | 0 | C/C | Lower-level pathology work is a component of the higher-level service |
| 80053 (Comprehensive metabolic panel) | 80048 (Basic metabolic panel) | 0 | C/C | BMP is a strict subset of CMP — every BMP analyte is included in the CMP panel |
| 80053 | 82040 (Albumin) | 0 | C/C | Albumin is an individual component analyte of the CMP panel |
| 80061 (Lipid panel) | 82465 (Cholesterol, serum) | 0 | C/C | Cholesterol is an individual component analyte of the lipid panel |

---

## Wound Care / Integumentary

| Column 1 | Column 2 | MI | Sub-reason | Notes |
|---|---|---|---|---|
| 13100 (Complex repair) | 12001 (Simple repair) | 1 | ME | Simple and complex repair at the same anatomical site are mutually exclusive; MI=1 allows bypass if performed at genuinely separate sites |
| 97597 (Debridement, open wound, selective) | 97602 (Debridement, non-selective) | 0 | ME | Selective and non-selective debridement are alternative techniques that cannot both be applied to the same wound on the same date |

---

> **Note:** This list is illustrative and not exhaustive. Always verify sub-reason classifications and MI values against the current CMS quarterly NCCI PTP tables for authoritative results.
