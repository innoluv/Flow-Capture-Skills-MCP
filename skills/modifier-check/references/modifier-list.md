# Modifier Reference List
**Sources (Priority Order):**
1. AMA CPT 2026 Appendix A (CPT_Code_Book_Modifiers.pdf)
2. AAPC HCPCS Level II 2026 (HCPCS_Code_Book_Modifiers.pdf)
3. CMS NCCI Coding Policy Manual Ch. 1 §E, Rev. 1/1/2026 (NCCI_Modifiers_Coding_Policy.pdf)
4. KMAP Modifier Table, Updated 05/22 (Modifiers-Table_KMAP.pdf)

---

## SECTION 1 — CPT Modifiers (AMA CPT 2026 Appendix A)

### Surgical / Procedural

| Modifier | Description | Valid On | NOT Valid On | Key Conditions |
|----------|-------------|----------|-------------|----------------|
| 22 | Increased Procedural Services | Surgery codes (global 000/010/090/YYY) | E&M codes; global MMM/XXX/ZZZ | Doc must support substantially more work; KMAP denies on E&M |
| 33 | Preventive Services (ACA-mandated) | Non-E&M preventive/therapeutic codes on non-Medicare claims | Medicare claims (use PT or G0121 instead); E&M codes (use 25 on E&M separately) | Append to the therapeutic/interventional code when a USPSTF A/B-rated screening service converts to therapeutic in same encounter. **Colonoscopy rule**: add 33 to every polypectomy code (45384, 45385, 45386) when performed during screening colonoscopy on non-Medicare claim. Compatible with NCCI modifiers — e.g., 45385-XS-33 is correct when both NCCI bundling and ACA cost-sharing apply. NEVER on Medicare. |
| 47 | Anesthesia by Surgeon | Surgical CPT code only | Anesthesia codes; moderate sedation | Surgeon personally administered regional/general anesthesia |
| 50 | Bilateral Procedure — Single-Line Method (Commercial-Preferred) | Codes with MPFS Bilat Surg indicator = 1 | Indicator 0/2/3/9; descriptor says "bilateral" or "unilateral or bilateral"; same line as LT/RT/26/TC | **Two valid bilateral billing methods exist:**  (1) Two separate lines with RT + LT — preferred by Medicare/Medicaid. When this cross-line pattern is detected → APPROVE both lines; do NOT suggest Mod 50.  (2) Single line with Mod 50, Units = 1 — preferred by commercial payers. Reimburses at 150% base (KMAP). Only suggest Mod 50 when commercial payer confirmed and two-line method is not already present.  **Cross-line rule**: Mod 50 + LT or RT on same line = INVALID (remove one). |
| 51 | Multiple Procedures | Secondary procedures with MPFS Mult Proc indicator 1/2/3/4 | Add-on codes (Appendix D); 51-exempt; indicator 0/9; global = ZZZ | Primary procedure (highest RVU) gets no 51 |
| 52 | Reduced Services | Surgery and diagnostic codes | E&M (unless doc submitted, KMAP) | Physician-elected partial completion; not for discontinuation after anesthesia |
| 53 | Discontinued Procedure | Surgical and diagnostic codes | E&M codes | Procedure started then stopped for patient safety; ASC uses 73/74 |
| 54 | Surgical Care Only | Surgery codes global 010 or 090 | All others | Invalid with 55/56/80/81/82/AS (KMAP) |
| 55 | Postoperative Management Only | Surgery codes global 010 or 090 | All others | Invalid with 54/56/78/80/81/82/AS |
| 56 | Preoperative Management Only | Surgery codes global 010 or 090 | All others | Invalid with 54/55 |
| 57 | Decision for Surgery | E&M codes only | All non-E&M codes | Major surgery 90-day global; day of or day before |
| 58 | Staged/Related Procedure in Postop Period | Surgery codes (not XXX global) | ASC facility claims; XXX global codes | Invalid with 80/81/82/AS |
| 59 | Distinct Procedural Service | Non-E&M CPT codes with CCMI = 1; Column 2 only | E&M; 77427; CCMI = 0; Column 1 | Use XE/XS/XP/XU when more specific; invalid with 76 (KMAP) |
| 62 | Two Surgeons | Surgery codes | Same line as 26/66/80/81/82/AS/TC | Each bills same code with 62 |
| 63 | Procedure on Neonate/Infant ≤4kg | CPT 20000–69990 only | E&M, Anesthesia, Radiology, Lab, Medicine; CPT Appendix E exclusions | KMAP denies outside 20000–69990 |
| 66 | Surgical Team | Surgery codes | Same line as 26/62/80/81/82/AS/TC | Highly complex multi-physician team |
| 76 | Repeat Procedure, Same Physician | Surgical/diagnostic; same day same physician | E&M; clinical diagnostic lab; same line as 59/77 | Repeat must be identical to original; same-day claims on same claim |
| 77 | Repeat Procedure, Different Physician | Surgical/diagnostic | E&M; clinical diagnostic lab; same line as 76 | Different physician; same procedure |
| 78 | Unplanned Return to OR (Related) | Surgery codes global 000/010/090/MMM/YYY/ZZZ | Same line as 80/81/82/AS | Complication requiring OR during postop |
| 79 | Unrelated Procedure in Postop Period | Surgery codes global 000/010/090/MMM/YYY/ZZZ | — | Unrelated to original surgery |
| 80 | Assistant Surgeon | Surgery codes | Same line as 54/55/58/62/66/78/79 | MD only; not hospitals; 25% rate (KMAP) |
| 81 | Minimum Assistant Surgeon | Surgery codes | Same line as 54/55/58/62/66/78/79 | Brief assistance; 25% rate |
| 82 | Assistant Surgeon (No Qualified Resident) | Surgery codes teaching hospital | Same line as 54/55/58/62/66/78/79 | Doc required; 25% rate |
| 90 | Reference (Outside) Laboratory | Lab procedure codes only | All others | Confirm CLIA status of performing lab |
| 91 | Repeat Clinical Diagnostic Lab Test | CMS CDLFS codes only | Non-CDLFS; same line as 76/77 | Multiple results needed same day; NOT for rerun/series |
| 92 | Alternative Lab Platform | Lab codes | — | Kit/transportable instrument; no dedicated space |
| 99 | Multiple Modifiers | All procedure codes | — | ≥5 modifiers on single line |

### E&M Modifiers

| Modifier | Description | Valid On | NOT Valid On | Key Conditions |
|----------|-------------|----------|-------------|----------------|
| 24 | Unrelated E&M During Postop Global | E&M and eye exam codes | Surgical codes; non-E&M | Unrelated dx from surgery required; can be day before major surgery if unrelated (KMAP) |
| 25 | Significant, Separately Identifiable E&M Same Day | E&M codes only | Surgical, procedure, supply, anesthesia | Distinct MDM beyond pre-/post-procedure work; NOT for decision for major surgery (use 57) |
| 27 | Multiple Outpatient Hospital E&M Same Date | Hospital outpatient E&M codes only | Physician practices | Hospital outpatient only; separate distinct encounters in multiple outpatient settings |
| 57 | Decision for Surgery | E&M codes only | All non-E&M | Major surgery (90-day global); day of or day before |

---

## SECTION 2 — Anesthesia Modifiers

### Who Performed (Required — First Modifier Field)

| Modifier | Description | Notes |
|----------|-------------|-------|
| AA | Anesthesiologist personally performed | First field; most common |
| AD | Medical direction of >4 concurrent procedures | First field; KMAP denies as noncovered |
| QK | Medical direction of 2–4 concurrent anesthesia procedures | First field |
| QX | CRNA with physician medical direction | First field |
| QY | Anesthesiologist medically directs one CRNA | First field |
| QZ | CRNA without medical direction | First field |

### Type of Anesthesia / Supplemental (Second Field)

| Modifier | Description | Valid Codes | Notes |
|----------|-------------|-------------|-------|
| QS | Monitored Anesthesia Care (MAC) | 00100–01999 | Second field |
| G8 | MAC for deep/complex/invasive procedure | 00100, 00160, 00300, 00400, 00532, 00920 only | Second field |
| G9 | MAC for patient with severe cardiopulmonary disease | 00100–01999 | Second field |
| 23 | Unusual anesthesia | 00100–01999 | Normally local/regional required general; not moderate sedation |

### Physical Status (Any Field After First)

| Modifier | Description |
|----------|-------------|
| P1 | Normal healthy patient |
| P2 | Mild systemic disease |
| P3 | Severe systemic disease |
| P4 | Severe systemic disease, constant threat to life |
| P5 | Moribund, not expected to survive without operation |
| P6 | Brain-dead, organ procurement |

**Rule**: AA/AD/QK/QX/QY/QZ MUST be in first modifier field on anesthesia CPT codes 00100–01999. Claim denied without them. Denied if billed on non-anesthesia codes.

---

## SECTION 3 — Radiology Modifiers

| Modifier | Description | Valid Codes | NOT Valid With | Notes |
|----------|-------------|-------------|----------------|-------|
| 26 | Professional Component | MPFS PC/TC indicator = 1 | Indicator 0/2/3/4/5/8/9; same line as 50/62/66/TC; hospitals | Interpretation only |
| TC | Technical Component | MPFS indicator = 1 or 7 | Indicator 0/2/3/4/5/6/8/9; same line as 26/50/62/66 | Facility/equipment only |
| GG | Screening + diagnostic mammogram same day | 76706, 77051, 77055, 77056, 77065, 77066 | — | Append to diagnostic code; both billed same claim |
| GH | Screening converted to diagnostic by radiologist | 76706, 77055, 77056, 77065, 77066 | — | Radiologist orders additional films same visit |
| FX | X-ray using film | Radiology codes | FY | TC reduced 20% |
| FY | X-ray using computed radiography/cassette | Radiology codes | FX | TC reduced 7% |
| CT | CT equipment not meeting NEMA XR-29-2013 | 70450–70498, 71250–71275, 72191–72194, 73200–73206, 73700–73706, 74150–74178, 74261–74263, 75571–75574 | — | TC reduced 15% |
| PI | PET/PET-CT for initial cancer treatment strategy | PET/CT codes | — | Biopsy-proven/strongly suspected; one per dx |
| PS | PET/PET-CT for subsequent cancer treatment strategy | PET/CT codes | — | Subsequent anti-tumor strategy |

---

## SECTION 4 — Pathology / Laboratory Modifiers

| Modifier | Description | Valid Codes | NOT Valid With | Notes |
|----------|-------------|-------------|----------------|-------|
| 90 | Reference (Outside) Laboratory | Lab procedure codes only | All others | Confirm CLIA status; physician billing for outside lab |
| 91 | Repeat Clinical Diagnostic Lab Test | CMS CDLFS codes only | Non-CDLFS; same line as 76/77 | Multiple results medically necessary same day; NOT for rerun/series |
| QP | Lab test ordered individually or as recognized panel | CPT 80100–89356 | Non-lab | Distinguish from automated profile codes |
| QW | CLIA-waived test | CMS Waived Tests list codes | Non-waived codes | Facility must hold CLIA certificate of waiver |
| Q4 | Service to clinical research participant | CPT 80002–89399; HCPCS G0058–G0060 | — | Informational only |

---

## SECTION 5 — NCCI Bundling Modifiers

| Modifier | Description | NOT Valid On | Key Conditions |
|----------|-------------|-------------|----------------|
| 59 | Distinct Procedural Service (legacy) | E&M; 77427; CCMI = 0; Column 1 | Prefer XE/XS/XP/XU when applicable; different dx alone insufficient; invalid with 76 (KMAP) |
| XE | Separate Encounter | E&M; CCMI = 0; Column 1 | Different session same DOS; distinct encounter documented |
| XP | Separate Practitioner | E&M; CCMI = 0; Column 1 | Different NPI performed service; both documented |
| XS | Separate Structure | E&M; CCMI = 0; Column 1 | Different organ or anatomic region; not contiguous structures |
| XU | Unusual Non-Overlapping Service | E&M; CCMI = 0; Column 1 | Use when none of XE/XS/XP is more specific |

**Critical NCCI Rules:**
- Always append to Column 2 (component) code; never Column 1
- CCMI = 0: no modifier can bypass the edit
- CCMI = 1: PTP-associated modifier may bypass under appropriate circumstances
- Different diagnoses alone are NOT sufficient for 59/X-modifiers
- Contiguous structures in same organ/anatomic region = single site; modifier does NOT apply

---

## SECTION 6 — Medicare / CMS Required Modifiers

| Modifier | Description | Valid Codes | NOT Valid With | Notes |
|----------|-------------|-------------|----------------|-------|
| LT | Left side | Paired anatomical structure procedures | Same line as 50; NOT for eyelids; NOT for digits | Laterality required for unilateral procedures |
| RT | Right side | Paired anatomical structure procedures | Same line as 50; NOT for eyelids; NOT for digits | Laterality required |
| GC | Teaching Physician Oversight | All teaching physician service codes | — | Attestation of key portion presence required in record |
| GE | Resident Without Teaching Physician (Primary Care Exception) | 99202, 99203, 99211–99213, 93005, 93041; G0402 | — | Primary care exception; informational |

---

## SECTION 7 — Anatomical HCPCS Level II Modifiers

### Eyelids (Use instead of LT/RT for all eyelid procedures)
| Modifier | Description |
|----------|-------------|
| E1 | Upper left eyelid |
| E2 | Lower left eyelid |
| E3 | Upper right eyelid |
| E4 | Lower right eyelid |

### Hand Digits
| FA | Left hand, thumb | F1 | Left hand, 2nd digit | F2 | Left hand, 3rd digit |
| F3 | Left hand, 4th digit | F4 | Left hand, 5th digit | F5 | Right hand, thumb |
| F6 | Right hand, 2nd digit | F7 | Right hand, 3rd digit | F8 | Right hand, 4th digit | F9 | Right hand, 5th digit |

### Foot Digits
| TA | Left foot, great toe | T1 | Left foot, 2nd | T2 | Left foot, 3rd | T3 | Left foot, 4th | T4 | Left foot, 5th |
| T5 | Right foot, great toe | T6 | Right foot, 2nd | T7 | Right foot, 3rd | T8 | Right foot, 4th | T9 | Right foot, 5th |

### Coronary Arteries
| LC | Left circumflex | LD | Left anterior descending | LM | Left main | RC | Right coronary | RI | Ramus intermedius |

**Rules**: E1–E4, FA–F9, TA–T9 NOT for E&M services. Use E1–E4 for eyelids (not LT/RT). Use F/T series for digits (not LT/RT).

---

## SECTION 8 — DME / Supply Modifiers

| Modifier | Description | Notes |
|----------|-------------|-------|
| RR | Rental | Use when DME is to be rented |
| NU | New equipment | Verify against CMS DME fee schedule |
| UE | Used durable medical equipment | Verify against CMS DME fee schedule |
| KH | DMEPOS, initial claim / first month rental | Month 1 sequence |
| KI | DMEPOS, 2nd or 3rd month rental | Months 2–3 sequence |
| KJ | DMEPOS, PEN pump / capped rental months 4–15 | Months 4–15 sequence |
| RA | Replacement due to loss/damage/theft | First-month claim only; required for hearing aid replacements |
| RB | Replacement part for repair | DME repair |
| KX | Policy requirements met | Required for insulin-dependent diabetic; invalid with KS |
| KS | Glucose monitor, non-insulin-treated diabetic | Invalid with KX |
| BP | Beneficiary informed; elected to purchase | DME beneficiary choice |
| BR | Beneficiary informed; elected to rent | DME beneficiary choice |
| BU | Beneficiary informed; did not respond within 30 days | DME beneficiary choice |

---

## SECTION 9 — Drug / Biological Modifiers

| Modifier | Description | Notes |
|----------|-------------|-------|
| JA | Administered intravenously | Route documentation required |
| JB | Administered subcutaneously | Route documentation required |
| JC | Skin substitute used as a graft | KMAP: Q4100–Q4114 |
| JD | Skin substitute not used as a graft | |
| JG | 340B drug pricing program acquisition | Payment reduced 28%; report to Medicaid if required for Medicare |
| JW | Discarded drug/biological | Separate line from administered amount; both reimbursable (dual/QMB) |
| JZ | Zero drug discarded/not administered to patient | |
| KD | Drug/biological infused through DME pump | |

---

## SECTION 10 — KMAP Invalid Modifier Combinations

| Modifier | Invalid With |
|----------|-------------|
| 26 | 50, 62, 66, TC |
| 50 | 26, LT, RT, TC |
| 54 | 55, 56, 80, 81, 82, AS |
| 55 | 54, 56, 78, 80, 81, 82, AS |
| 59 | 76 |
| 62 | 26, 66, 80, 81, 82, AS, TC |
| 66 | 26, 62, 80, 81, 82, AS, TC |
| 76 | 59, 77 |
| 77 | 76 |
| 78 | 80, 81, 82, AS |
| 80 | 54, 55, 58, 62, 66, 78, 79 |
| 81 | 54, 55, 58, 62, 66, 78, 79 |
| 82 | 54, 55, 58, 62, 66, 78, 79 |
| AS | 54, 55, 58, 62, 66, 78, 79 |
| KS | KX |
| KX | KS |
| LT | 50 |
| RT | 50 |
| TC | 26, 50, 62, 66 |

---

## SECTION 11 — KMAP Processing Modifier Rates

| Modifier | Rate |
|----------|------|
| 50 (Bilateral) | 150% of base code |
| 80 (Assistant Surgeon) | 25% of base code |
| 81 (Minimum Assistant) | 25% of base code |
| 82 (Assistant, no resident) | 25% of base code |
| AS (PA/NP/CNS Assistant) | 25% of base code |

---

## SECTION 12 — Hard No-Go Rules

1. **Mod 22**: NEVER on E&M codes
2. **Mod 25**: NEVER on surgical, procedure, supply, or anesthesia codes — only E&M
3. **Mod 51**: NEVER on add-on (Appendix D) or 51-exempt codes or global = ZZZ
4. **Mod 53**: NEVER on E&M codes
5. **Mod 59/XE/XS/XP/XU**: NEVER on E&M codes; NEVER on Column 1; NEVER when CCMI = 0
6. **Mod 26 / TC**: NEVER when MPFS PC/TC indicator is not 1 (TC also valid on 7)
7. **Mod 50**: NEVER with LT or RT on same line; NEVER when descriptor states "bilateral"
8. **Mod 63**: NEVER outside CPT 20000–69990
9. **Mod 76/77**: NEVER on E&M or lab codes (use 91 for lab repeats)
10. **Anesthesia modifiers (AA/AD/QK/QX/QY/QZ)**: NEVER on non-anesthesia codes; MUST be first modifier field
11. **Mod 57**: NEVER on non-E&M codes
12. **Mod 27**: NEVER for physician practice; hospital outpatient only
13. **FA–F9 / TA–T9**: NEVER on E&M codes
14. **E1–E4**: NEVER on E&M codes; ALWAYS use instead of LT/RT for eyelid procedures
