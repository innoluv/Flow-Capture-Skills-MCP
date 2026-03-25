---
name: medical-necessity-checker
version: "3"
version_date: "2026-03-20"
changes: "Narrowed scope to ICD-CPT alignment (incl. NCD/LCD exclusions, specificity) and documentation completeness only. Removed: prior auth, frequency, modifier, POS, screening substitution checks. Removed: ICD sequencing and combination code checks. Documentation check now runs only for CPTs matching a category in documentation-requirements.md. Note-absence rule scoped to CPTs with documentation requirements only. Web search logic flipped: KB-first, web only as fallback for missing entries or MODERATE/LOW confidence findings. Output sections for policy, prior auth, and frequency removed."
description: >
  Validates medical necessity of physician orders (CPT/HCPCS codes) via ICD-CPT alignment
  and clinical documentation completeness. ALWAYS use this skill when a user mentions:
  checking medical necessity, validating CPT or HCPCS codes, ICD-CPT alignment, CMS coverage,
  denial risk, clinical documentation gaps, FHIR encounter review, claim scrubbing, coding
  compliance, or pre-submission review. Also trigger for: "will this get denied?",
  "is this covered?", "is this the right code?", "what documentation do I need?",
  "can I bill this?", "is this ICD too vague?", or any scenario pairing CPT codes with
  ICD-10-CM diagnoses. Use for single CPT questions, full FHIR bundle reviews, and
  everything in between — even without a full FHIR bundle.
---

# Medical Necessity Checker

A clinical validation skill that reviews physician orders (CPT codes) for a given encounter
against CMS Medicare/Medicaid guidelines across two dimensions:

1. **ICD-CPT Alignment** — Does the diagnosis support the procedure? Does an NCD/LCD exclusion apply?
2. **Documentation Completeness** — Does the encounter note contain the required elements for this CPT? *(Only checked for CPTs that have documentation requirements in the knowledge base.)*

It consumes FHIR-formatted encounter data and produces both a structured JSON result and a
human-readable report for the ordering physician.

---

## Reference Files

Load reference files using this priority order. The knowledge base is always the primary
source — web search is a fallback only (see Step 1b for rules).

| File | When to load |
|------|-------------|
| `references/guidelines-kb/INDEX.md` | **Always — load first.** Contains all reference_id mappings. |
| `references/guidelines-kb/NCD-100-03.md` | When a CPT has a known NCD (PET, pacemaker, ICD device, bariatric, DME, mammography, colonoscopy) |
| `references/guidelines-kb/MBPM-100-02.md` | When citing medical necessity standard, diagnostic test requirements, or documentation rules |
| `references/guidelines-kb/MCPM-100-04.md` | When citing E/M documentation rules or preventive code documentation |
| `references/guidelines-kb/ICD-10-CM-GUIDELINES.md` | When citing ICD specificity or unspecified code rules |
| `references/icd-cpt-alignment.md` | Always — ICD-CPT mapping rules and specificity logic |
| `references/documentation-requirements.md` | Always — required documentation elements per CPT category |
| `references/fhir-schema.md` | When parsing or simulating FHIR input |
| `references/output-templates.md` | When formatting the final output |

**Do not load** `references/cms-policy-kb.md` — frequency, modifier, POS, and screening
substitution checks are out of scope for this skill.

---

## Workflow

Follow these steps in order for every encounter review.

---

### Step 1 — Parse the FHIR Encounter

Extract the following from the FHIR bundle (see `references/fhir-schema.md` for field paths):

- **Patient demographics**: age, sex, Medicare/Medicaid eligibility
- **Encounter**: date, type (inpatient/outpatient/office), place of service (POS) code
- **Diagnoses**: all ICD-10-CM codes, their `use` (principal / secondary / admitting), and display text
- **Orders / Procedures**: all CPT codes with quantities and ordering provider
- **Encounter note**: extract and fully parse all `DocumentReference` resources linked to
  this encounter. Required only for CPTs that have documentation requirements — see Step 1c.

If the input is mock/simulated data, use the schema in `references/fhir-schema.md` to interpret it.

---

### Step 1b — Knowledge Base First, Web Search as Fallback

**This skill always checks the knowledge base before going to the web.**

For each CPT in the encounter, apply this decision logic:

1. **Look up the CPT in the knowledge base** (`references/icd-cpt-alignment.md`,
   `references/guidelines-kb/NCD-100-03.md`, `references/guidelines-kb/INDEX.md`).

2. **If the KB has a clear, current entry for this CPT:**
   - Apply the KB guideline directly.
   - Record `web_search_performed: false`.
   - Proceed to Step 2.

3. **If the KB has no entry for this CPT:**
   - Perform a web search to find the applicable CMS NCD/LCD guideline.
   - Record `web_search_performed: true` and `web_verified_date`.
   - Use the web result as the guideline for this CPT.

4. **If the KB has an entry but the finding confidence would be MODERATE or LOW:**
   - Perform a web search to attempt to resolve the ambiguity before finalizing the finding.
   - Record `web_search_performed: true` and `web_verified_date`.
   - If the web search confirms the KB finding → confidence may be upgraded.
   - If the web search does not resolve the ambiguity → keep the MODERATE or LOW confidence
     rating AND set `web_verification_inconclusive: true`. Flag this in the output with:
     `"Web search performed but did not resolve ambiguity. Manual clinical review recommended."`

**Rule**: Never perform a web search before first checking the knowledge base. The KB is
always the primary source regardless of how recently it was updated.

---

### Step 1c — Identify CPTs Requiring Documentation Check

Before running any checks, determine which CPTs in the encounter will undergo a
documentation completeness check (Dimension B).

1. Load `references/documentation-requirements.md`.
2. For each CPT in the encounter, check whether it matches **any category** in the
   documentation requirements file. Use category-level matching — a CPT does not need
   an exact entry; a match to its category (e.g. "E/M codes", "surgical CPTs",
   "diagnostic imaging", "lab orders", "immunizations", "DME") is sufficient.
3. If a CPT matches **multiple categories**, apply **all matching category rules**.
4. Record for each CPT: `documentation_check_required: true/false` and if true,
   `matching_categories: [list of matched category names]`.

CPTs with `documentation_check_required: false` will only be evaluated on Dimension A
(ICD-CPT alignment). They are never failed for documentation reasons.

---

### Step 1d — Encounter Note Extraction

The encounter note is required only for CPTs that have `documentation_check_required: true`.

**If at least one CPT in the encounter requires a documentation check:**

1. **Locate** all `DocumentReference` resources where `context.encounter` references this encounter.
   Priority order when multiple notes exist:
   - Operative/procedure note (LOINC 28570-0) → highest priority for surgical CPTs
   - H&P note (LOINC 34117-2) → highest priority for inpatient CPTs
   - Progress/office note (LOINC 11506-3) → standard for outpatient E/M and orders
   - Consultation note (LOINC 11488-4) → use if no progress note present

2. **Decode** the note content from `content[0].attachment.data` (base64) or fetch from
   `content[0].attachment.url`. Parse the full free-text.

3. **Extract and tag** these elements from the note text:
   | Element | What to look for in the note |
   |---------|------------------------------|
   | Chief complaint | "CC:", "Chief Complaint:", opening sentence |
   | HPI | "History of Present Illness", "HPI:" section |
   | Duration of symptoms | "for X days/weeks/months", temporal language |
   | Clinical findings / exam | "Physical Exam", "Findings:", "On examination" |
   | Assessment | "Assessment:", "Impression:", diagnosis statements |
   | Plan | "Plan:", "Orders:", treatment decisions |
   | Physician signature | Attestation line, "Signed by", "Authenticated by" |
   | Time documentation | "Total time:", "Face-to-face time:", minutes notation |
   | Procedure indication | "Indication:", "Reason for procedure:", clinical justification |
   | Informed consent | "Consent obtained", "Patient agrees", consent form reference |

4. **If the encounter note is absent** from the FHIR bundle:
   - For CPTs with `documentation_check_required: true`: FAIL with category `NOTE_ABSENT`,
     confidence `DEFINITIVE`. Flag: `"Encounter note absent from FHIR bundle. Documentation
     compliance cannot be assessed. Note must be attached before submission."`
   - For CPTs with `documentation_check_required: false`: note absence has no effect.
     These CPTs are evaluated on Dimension A only and are not failed for note absence.

5. **If the note exists but is incomplete** (e.g. missing HPI, no plan, no signature):
   - Complete the documentation check using what is present.
   - Flag each missing element as a specific documentation gap.

**If no CPT in the encounter requires a documentation check:**
- Skip note extraction entirely. Proceed directly to Step 2.

---

### Step 2 — Run the Two Validation Dimensions

For each CPT code in the encounter, run the applicable dimensions.

---

#### Dimension A: ICD-CPT Alignment *(runs for every CPT)*

> Load `references/icd-cpt-alignment.md`, `references/guidelines-kb/ICD-10-CM-GUIDELINES.md`, and `references/guidelines-kb/NCD-100-03.md` as needed. Apply knowledge-base-first logic from Step 1b.

**A1 — Approved indication check**
Check whether at least one ICD-10-CM code on the encounter is an approved indication for
this CPT under CMS NCD/LCD policy. If no ICD supports this CPT → `MISMATCH`.

**A2 — Diagnosis specificity check**
Check whether the supporting ICD code is at the highest appropriate level of specificity.
Flag unspecified codes (e.g. codes ending in `.9`, "not elsewhere classified" codes, or
codes with more specific alternatives available) that fail to satisfy NCD/LCD indication
requirements → `SPECIFICITY`.

**A3 — NCD/LCD exclusion check**
Check whether an explicit NCD/LCD exclusion criterion applies to this CPT given the
patient's diagnoses, demographics, or documented clinical context.
→ `EXCLUSION` if an exclusion criterion is met.

**Citation rules for Dimension A:**
- ICD specificity issues → `ICD-2026-IB5` (unspecified codes) or `ICD-2026-IB1`
  (specificity rule); use `ICD-2025-IB5` / `ICD-2025-IB1` as fallback if 2026 entry unavailable
- ICD-CPT mismatch → relevant NCD entry (e.g. `NCD-220.2`, `NCD-190.3`) or `MBPM-100-02-CH1-S10`
- NCD/LCD exclusion → relevant NCD entry from `NCD-100-03.md`

**What Dimension A does NOT check:**
- ICD principal diagnosis sequencing (outpatient use case only — sequencing rules are inpatient)
- ICD combination code errors
- Place of service, frequency, modifiers, or prior authorization

---

#### Dimension B: Documentation Completeness *(runs only if `documentation_check_required: true`)*

> Load `references/documentation-requirements.md`, `references/guidelines-kb/MCPM-100-04.md`, and `references/guidelines-kb/MBPM-100-02.md`. Apply knowledge-base-first logic from Step 1b.

Use the **extracted note elements from Step 1d** as the evidence base.

1. For this CPT, retrieve all matching category rules from `references/documentation-requirements.md`
   (using the `matching_categories` list identified in Step 1c).
2. For each required documentation element across all matching categories:
   - If present in the extracted note tags → mark as satisfied.
   - If absent → flag as a specific documentation gap (`DOC_ABSENT` if completely missing,
     `DOC_INSUFFICIENT` if present but below the required standard).
3. If a required element appears in multiple matching categories, it only needs to be
   satisfied once — do not double-penalize.
4. Cross-check note content against billed ICD codes for internal consistency.

**Citation rules for Dimension B:**
- E/M documentation (MDM, time, A&P) → `MCPM-100-04-CH12-S30.6.1`
- Surgical documentation (operative report, consent, H&P) → `MBPM-100-02-CH6-S10`
- Diagnostic imaging (order, indication, stepped approach) → `MBPM-100-02-CH15-S80` + `MCPM-100-04-CH13-S90`
- Lab without clinical indication → `MBPM-100-02-CH15-S80`
- AWV component requirements → `MBPM-100-02-CH15-S280`
- Immunization documentation (counseling, VIS, lot number, site) → `MBPM-100-02-CH6-S10` + `MCPM-100-04-CH12-S30.6.1`
- Note absence → `MBPM-100-02-CH1-S10` + `MCPM-100-04-CH12-S30.6.1`

**What Dimension B does NOT check:**
- Prior authorization requirements
- Frequency or utilization limits
- Modifier validity
- Place of service compliance
- Screening code substitutions

---

### Step 3 — Determine Tier 1 Verdict (Pass / Fail per CPT)

For each CPT, determine the **medical necessity verdict**:

| Verdict | Criteria |
|---------|----------|
| ✅ **PASS** | No FAIL-level findings in Dimension A or Dimension B. WARNING findings do not trigger FAIL. |
| ❌ **FAIL** | One or more FAIL-level findings in Dimension A or Dimension B. Proceed to Step 3b. |

**Note-absence rule (scoped)**: If the encounter note is absent AND the CPT has
`documentation_check_required: true` → that CPT is automatically **FAIL** with category
`NOTE_ABSENT` and confidence `DEFINITIVE`. CPTs with `documentation_check_required: false`
are not affected by note absence.

---

### Step 3b — Tier 2 Failure Confidence Assessment (FAIL CPTs only)

For each failed CPT, determine and document all four elements:

**1. Failure reason categories** — identify ALL applicable dimension failures.
Multi-dimension failures (A+B) must be fully reported:

| Code | Category | Apply when |
|------|----------|-----------|
| `MISMATCH` | ICD-CPT Mismatch | No ICD on the encounter supports this CPT |
| `SPECIFICITY` | Insufficient Specificity | ICD present but too vague to satisfy NCD/LCD indication |
| `EXCLUSION` | NCD/LCD Exclusion Active | An explicit NCD/LCD exclusion criterion applies |
| `DOC_ABSENT` | Documentation Absent | Required element completely missing from note |
| `DOC_INSUFFICIENT` | Documentation Insufficient | Element present but doesn't meet the required standard |
| `NOTE_ABSENT` | Note Absent | No encounter note in FHIR bundle (only for CPTs with documentation requirements) |

Set `failure_reason_categories` (array) to ALL applicable codes.
Set `primary_failure_reason` to the single most clinically significant category.
For A+B failures, include at least one cited confidence driver per dimension.

**2. Confidence level and score:**

| Level | Score | Apply when |
|-------|-------|-----------|
| `DEFINITIVE` | 95–100% | NCD exclusion is unambiguous and fully determinable from ICD/CPT codes alone without clinical interpretation; complete body-part mismatch with no contextual justification; note absent; statutory exclusion |
| `HIGH` | 80–94% | Strong mismatch or clear documentation gap unlikely to be resolved by context. Use HIGH (not DEFINITIVE) when an NCD exclusion criterion requires clinical assessment of whether documented conditions qualify (e.g. evaluating whether comorbidities meet a coverage threshold) — such determinations involve clinical judgment beyond code lookup. |
| `MODERATE` | 60–79% | Probable failure but clinical context or additional documentation could change outcome. Use MODERATE (not HIGH) for MISMATCH findings when the clinical note contains protocol or policy ordering language (e.g. "ordered per protocol," "per standing order") — such language introduces genuine ambiguity. Also apply when `web_verification_inconclusive: true`. |
| `LOW` | 40–59% | Possible failure; genuinely ambiguous; physician judgment and additional context required. Also apply when `web_verification_inconclusive: true` and the KB finding itself was already uncertain. |

**3. Confidence drivers** — write 2–4 specific, evidence-based reasons supporting the score.
Each driver MUST cite a `reference_id` from the guidelines KB.
For A+B failures, include at least one driver per reported dimension.
If `web_verification_inconclusive: true`, include a driver stating:
`"Web search performed but did not resolve ambiguity — manual clinical review recommended."`

**4. Recommendation + alternative codes** — corrective action if one exists.
If no solution is identifiable: state `"No recommendation — clinical review required."` Do not fabricate.

---

### Step 4 — Format the Output

> Load `references/output-templates.md` for the full schema.

Produce **two outputs simultaneously**:

#### Output A: Structured JSON

Use Template A from `output-templates.md`. Key elements:
- `tier1_verdict`: PASS or FAIL per CPT
- `documentation_check_performed`: true/false per CPT (from Step 1c)
- `web_search_performed`: true/false per CPT (from Step 1b)
- `web_verification_inconclusive`: true/false per CPT where applicable
- `warnings`: array of WARNING-level findings with guideline citations
- `tier2_failure_assessment`: null for PASS; populated for FAIL with:
  - `primary_failure_reason`: string — single most clinically significant failure category
  - `failure_reason_categories`: array — all applicable failure category codes
  - `confidence_level`, `confidence_score`, `confidence_drivers` (each with citation),
    `recommendation`, `alternative_codes`
- `summary.encounter_verdict`: FAIL if any CPT fails; PASS only if all pass
- `summary.failure_confidence_breakdown`: count of DEFINITIVE/HIGH/MODERATE/LOW failures
- `summary.failure_reason_breakdown`: count per failure category
- `summary.guidelines_referenced`: array of all `reference_id`s cited
- `summary.web_searches_performed`: count
- `summary.web_verification_inconclusive_count`: count of CPTs where web search did not resolve ambiguity

#### Output B: Physician-Facing Report

Use Template B from `output-templates.md`. Structure:

1. **Encounter Summary** — encounter verdict box (PASS/FAIL + CPT count)
2. **Order Review Summary Table** — CPT, description, MN verdict; if FAIL: confidence + category; if documentation check was not performed: note "Documentation check not applicable"
3. **Detailed Findings** — for each CPT:
   - PASS: confirmation + any WARNING findings
   - FAIL: Tier 1 box + Tier 2 box with all failure dimensions, confidence drivers (each citing a specific guideline), and recommendation
   - If `web_verification_inconclusive: true`: include a prominent flag: ⚠️ "Guideline ambiguity unresolved — manual clinical review recommended before submission"
4. **Action Items** — prioritized list covering ICD alignment gaps and documentation gaps only; each item cites a guideline reference_id
5. **Guidelines Referenced** — full list of all citations used, with web verification status and inconclusive flags where applicable

---

## Key Rules & Guardrails

- **Knowledge base is always the primary source.** Never search the web before checking the KB. Web search is a fallback only — for missing KB entries or MODERATE/LOW confidence findings.
- **Every finding must cite a guideline** from the guidelines KB. Never produce a finding without a `guideline_citation` referencing a specific `reference_id`, section, and source URL.
- **Documentation check is opt-in per CPT.** Only CPTs matching a category in `documentation-requirements.md` undergo Dimension B. CPTs with no matching category are evaluated on Dimension A only.
- **Note absence is scoped.** A missing encounter note only fails CPTs that have documentation requirements. CPTs without documentation requirements are unaffected by note absence.
- **Web verification inconclusive must be flagged.** If a web search does not resolve a MODERATE or LOW confidence finding, set `web_verification_inconclusive: true` and surface the flag prominently in both outputs.
- **PASS means submittable, not perfect.** WARNING findings on PASS CPTs are improvement opportunities only — they do not block submission.
- **Never fabricate clinical information.** If content is absent, flag the absence.
- **Never recommend a code that is not clinically supported** by the documented diagnosis or note.
- **If no recommendation is identifiable:** state "No recommendation — clinical review required."
- **Note content governs Dimension B.** Structured FHIR fields alone do not satisfy documentation requirements — the note must explicitly contain the elements.
- **Confidence scores reflect evidentiary certainty**, not severity.
- **ICD-10-CM codes only** (not ICD-10-PCS) for outpatient/physician orders.
- **Out of scope — do not check:** prior authorization, frequency/utilization limits, modifier validity, place of service compliance, screening code substitutions, ICD sequencing, ICD combination code errors.
- **This tool is for pre-submission review only.** It does not constitute a coverage determination or legal compliance opinion. Recommend physician + coder review for all FAIL findings.

---

## Example Invocations

- "Check medical necessity for this FHIR encounter JSON"
- "Review these CPT and ICD codes for medical necessity"
- "Is CPT 93000 supported by the diagnosis codes in this encounter?"
- "Run a medical necessity check on encounter E12345"
- "What documentation is missing for this order to pass CMS review?"
- "Will this claim get denied?"
- "My patient has acute bronchitis — is it okay to bill 99215?"
- "We ordered a colonoscopy with Z12.11 on a Medicare patient — is 45378 the right code?"
- "The encounter note is missing from the FHIR bundle — what's the risk?"
- "Is this MRI order medically justified based on the diagnoses?"
- "Flag any ICD codes that are too vague for this claim"
