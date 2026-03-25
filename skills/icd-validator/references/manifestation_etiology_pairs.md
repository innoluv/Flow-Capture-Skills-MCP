# Manifestation-Etiology Exhaustive Reference Table (FY 2026)

Source: CMS ICD-10-CM FY 2026 Official Tabular — Manifestation/Etiology Pairs
Total manifestation codes: 422 | With explicit etiology: 67 | Generic "code first": 355

## Key Rules

1. Manifestation codes can **NEVER** be the principal/first-listed diagnosis.
2. The etiology (underlying cause) must always sequence **FIRST**.
3. If a manifestation code is present but its required etiology is missing, flag as incomplete.
4. If etiology_codes column shows a range (e.g., C00-D49), ANY code in that range is a valid etiology.
5. If etiology_codes column shows a dash suffix (e.g., N18.-), it means all subcodes of that prefix.

## How to Use

1. For EVERY code in the working set, check if it appears in the Manifestation Code column below.
2. If found WITH explicit etiology codes: verify at least one matching etiology is in the working set.
3. If found WITHOUT explicit etiology (generic "code first"): verify ANY underlying disease code is present and sequenced before it.
4. Check sequencing: etiology must come BEFORE manifestation in the code list.

## Quick Detection Rule

If a code description contains ANY of these phrases, it is a manifestation code:
- "in diseases classified elsewhere"
- "in other diseases"
- "code first underlying disease"
- "code first underlying condition"

---

## Part A — Manifestation Codes with Explicit Etiology Requirements

67 codes with specified etiology code ranges.

### Chapter III — Blood & Immune

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| D63.0 | Anemia in neoplastic disease | C00-D49 |
| D63.1 | Anemia in chronic kidney disease | N18.- |
| D63.8 | Anemia in other chronic diseases classified elsewhere | B70.0, B76.0- B76.9, E00.0- E03.9, B50.0- B54, A52.79, A18.89 |
| D72.18 | Eosinophilia in diseases classified elsewhere | C93.1- |
| D75.81 | Myelofibrosis | C50.- |
| D77 | Other disorders of blood and blood-forming organs in diseases classified elsewhe... | E85.-, A50.0-, B67.0- B67.9, B50.0- B54, B65.0- B65.9, E54 |
| D84.81 | Immunodeficiency due to conditions classified elsewhere | Q90-Q99, E08-E13, C00 - C96 |

### Chapter IV — Endocrine, Nutritional & Metabolic

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| E35 | Disorders of endocrine glands in diseases classified elsewhere | A50.59 |

### Chapter V — Mental & Behavioral

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| F54 | Psychological and behavioral factors associated with disorders or diseases class... | J45.-, L23 - L25, K25.-, K58.-, K51.-, L50.- |

### Chapter VI — Nervous System

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| G02 | Meningitis in other infectious and parasitic diseases classified elsewhere | B56.-, A80.- |
| G07 | Intracranial and intraspinal abscess and granuloma in diseases classified elsewh... | B65.- |
| G13.0 | Paraneoplastic neuromyopathy and neuropathy | C00-D49 |
| G13.1 | Other systemic atrophy primarily affecting central nervous system in neoplastic ... | C00-D49 |
| G13.2 | Systemic atrophy primarily affecting the central nervous system in myxedema | E03.-, E00.1 |
| G32.0 | Subacute combined degeneration of spinal cord in diseases classified elsewhere | D51.3, D51.0, D51.8, E53.8 |
| G32.81 | Cerebellar ataxia in diseases classified elsewhere | K90.0, C00-D49, M35.9 |
| G53 | Cranial nerve disorders in diseases classified elsewhere | C00-D49 |
| G55 | Nerve root and plexus compressions in diseases classified elsewhere | C00-D49 |
| G63 | Polyneuropathy in diseases classified elsewhere | E85.-, E00-E07 , E15-E16 , E20 - E34, E70-E88, C00-D49, E40 - E64 |
| G73.1 | Lambert-Eaton syndrome in neoplastic disease | C00-D49 |
| G73.3 | Myasthenic syndromes in other diseases classified elsewhere | C00-D49, E05.- |
| G73.7 | Myopathy in diseases classified elsewhere | E74.0-, E21.0 , E21.3, E20.-, E75.- |
| G91.4 | Hydrocephalus in diseases classified elsewhere | A50.4-, C00-D49, E88.02 |
| G99.0 | Autonomic neuropathy in diseases classified elsewhere | E85.-, M1A.- , M10.-, E05.- |
| G99.2 | Myelopathy in diseases classified elsewhere | C00-D49 |
| G99.8 | Other specified disorders of nervous system in diseases classified elsewhere | E85.-, E56.- |

### Chapter VII — Eye & Adnexa

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| H22 | Disorders of iris and ciliary body in diseases classified elsewhere | M1A.- , M10.-, A30.-, B89 |
| H28 | Cataract in diseases classified elsewhere | E20.-, G71.1-, E03.-, E40-E46 |
| H32 | Chorioretinal disorders in diseases classified elsewhere | P37.1, B39.-, A30.- |
| H42 | Glaucoma in diseases classified elsewhere | E85.-, Q13.1, E08.39 , E09.39 , E10.39 , E11.39 , E13.39, E72.03, Q13.81, E70-E88 |

### Chapter IX — Circulatory

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| I31.31 | Malignant pericardial effusion in diseases classified elsewhere | C00-D49 |
| I39 | Endocarditis and heart valve disorders in diseases classified elsewhere | A78 |
| I41 | Myocarditis in diseases classified elsewhere | A75.0- A75.9 |
| I43 | Cardiomyopathy in diseases classified elsewhere | E85.-, E74.0-, M10.0-, E05.0- E05.9- |
| I52 | Other heart disorders in diseases classified elsewhere | A50.5, E76.3, B65.0- B65.9 |
| I68.0 | Cerebral amyloid angiopathy | E85.- |
| I79.8 | Other disorders of arteries, arterioles and capillaries in diseases classified e... | E85.- |

### Chapter X — Respiratory

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| J17 | Pneumonia in diseases classified elsewhere | A78, I00, B65.0- B65.9 |
| J84.03 | Idiopathic pulmonary hemosiderosis | E83.1- |
| J84.170 | Interstitial lung disease with progressive fibrotic phenotype in diseases classi... | J60-J70, M05.00- M06.9, D86.-, M30-M36 |
| J84.178 | Other interstitial pulmonary diseases with fibrosis in diseases classified elsew... | M34.0, M05.00- M06.9, M32.0- M32.9 |
| J91.0 | Malignant pleural effusion | C00-D49 |
| J91.8 | Pleural effusion in other conditions classified elsewhere | B74.0- B74.9, J09.X2 , J10.1 , J11.1 |
| J99 | Respiratory disorders in diseases classified elsewhere | E85.-, M45.-, A50.-, D89.1, A50.0-, E88.02, B65.0- B65.9 |

### Chapter XI — Digestive

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| K23 | Disorders of esophagus in diseases classified elsewhere | A50.5 |
| K67 | Disorders of peritoneum in infectious diseases classified elsewhere | A50.0, B65.0 - B83.9 |
| K77 | Liver disorders in diseases classified elsewhere | E85.-, A50.0 , A50.5, P37.1, B27.0- B27.9 with fifth character 9, B65.0- B65.9 |

### Chapter XII — Skin & Subcutaneous

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| L62 | Nail disorders in diseases classified elsewhere | M89.4- |
| L86 | Keratoderma in diseases classified elsewhere | M02.3- |
| L99 | Other disorders of skin and subcutaneous tissue in diseases classified elsewhere | E85.- |

### Chapter XIII — Musculoskeletal

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| M36.0 | Dermato(poly)myositis in neoplastic disease | C00-D49 |
| M36.1 | Arthropathy in neoplastic disease | C91 - C95, C96.A, C90.0 |
| M36.2 | Hemophilic arthropathy | D66, D68.0-, D67, D66, D67, D68.1 |
| M36.4 | Arthropathy in hypersensitivity reactions classified elsewhere | D69.0, T80.6- |
| M36.8 | Systemic disorders of connective tissue in other diseases classified elsewhere | E70.29, D80.-, E70.29 |

### Chapter XIV — Genitourinary

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| N08 | Glomerular disorders in diseases classified elsewhere | E85.-, A50.5, D89.1, D65, M1A.- , M10.-, M31.7, C90.0-, A40.0- A41.9, D57.0- D57.8 |
| N16 | Renal tubulo-interstitial disorders in diseases classified elsewhere | A23.0- A23.9, D89.1, E74.0-, C91 - C95, C81.0- C85.9 , C96.0- C96.9, C90.0-, A40.0- A41.9, E83.01 |
| N22 | Calculus of urinary tract in diseases classified elsewhere | M1A.- , M10.-, B65.0- B65.9 |
| N29 | Other disorders of kidney and ureter in diseases classified elsewhere | E85.-, E83.59, B65.0- B65.9 |
| N33 | Bladder disorders in diseases classified elsewhere | B65.0- B65.9 |
| N51 | Disorders of male genital organs in diseases classified elsewhere | B74.0- B74.9 |
| N77.0 | Ulceration of vulva in diseases classified elsewhere | M35.2 |
| N77.1 | Vaginitis, vulvitis and vulvovaginitis in diseases classified elsewhere | B80 |

### Chapter XVI — Perinatal

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| P91.811 | Neonatal encephalopathy in diseases classified elsewhere | P78.81, P52.-, P57.- |

### Chapter XVIII — Signs & Symptoms

| Manifestation Code | Description | Etiology (Code First) |
|---|---|---|
| R47.82 | Fluency disorder in conditions classified elsewhere | G20.- |
| R50.81 | Fever presenting with conditions classified elsewhere | C91 - C95, D70.-, D57.- |

---

## Part B — Manifestation Codes with Generic "Code First Underlying Disease"

355 codes that require ANY underlying disease to be coded first.
These codes have no specific etiology restriction — any documented underlying condition qualifies.

| Manifestation Code | Description |
|---|---|
| D64.1 | Secondary sideroblastic anemia due to disease |
| E08.00 | Diabetes mellitus due to underlying condition with hyperosmolarity without nonketotic hyperglycemic-... |
| E08.01 | Diabetes mellitus due to underlying condition with hyperosmolarity with coma |
| E08.10 | Diabetes mellitus due to underlying condition with ketoacidosis without coma |
| E08.11 | Diabetes mellitus due to underlying condition with ketoacidosis with coma |
| E08.21 | Diabetes mellitus due to underlying condition with diabetic nephropathy |
| E08.22 | Diabetes mellitus due to underlying condition with diabetic chronic kidney disease |
| E08.29 | Diabetes mellitus due to underlying condition with other diabetic kidney complication |
| E08.311 | Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy with macular ede... |
| E08.319 | Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy without macular ... |
| E08.3211 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with m... |
| E08.3212 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with m... |
| E08.3213 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with m... |
| E08.3219 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with m... |
| E08.3291 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy withou... |
| E08.3292 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy withou... |
| E08.3293 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy withou... |
| E08.3299 | Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy withou... |
| E08.3311 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3312 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3313 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3319 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3391 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3392 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3393 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3399 | Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy wi... |
| E08.3411 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3412 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3413 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3419 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3491 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3492 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3493 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3499 | Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with... |
| E08.3511 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular e... |
| E08.3512 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular e... |
| E08.3513 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular e... |
| E08.3519 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular e... |
| E08.3521 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3522 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3523 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3529 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3531 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3532 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3533 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3539 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with traction ... |
| E08.3541 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with combined ... |
| E08.3542 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with combined ... |
| E08.3543 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with combined ... |
| E08.3549 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with combined ... |
| E08.3551 | Diabetes mellitus due to underlying condition with stable proliferative diabetic retinopathy, right ... |
| E08.3552 | Diabetes mellitus due to underlying condition with stable proliferative diabetic retinopathy, left e... |
| E08.3553 | Diabetes mellitus due to underlying condition with stable proliferative diabetic retinopathy, bilate... |
| E08.3559 | Diabetes mellitus due to underlying condition with stable proliferative diabetic retinopathy, unspec... |
| E08.3591 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macula... |
| E08.3592 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macula... |
| E08.3593 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macula... |
| E08.3599 | Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macula... |
| E08.36 | Diabetes mellitus due to underlying condition with diabetic cataract |
| E08.37X1 | Diabetes mellitus due to underlying condition with diabetic macular edema, resolved following treatm... |
| E08.37X2 | Diabetes mellitus due to underlying condition with diabetic macular edema, resolved following treatm... |
| E08.37X3 | Diabetes mellitus due to underlying condition with diabetic macular edema, resolved following treatm... |
| E08.37X9 | Diabetes mellitus due to underlying condition with diabetic macular edema, resolved following treatm... |
| E08.39 | Diabetes mellitus due to underlying condition with other diabetic ophthalmic complication |
| E08.40 | Diabetes mellitus due to underlying condition with diabetic neuropathy, unspecified |
| E08.41 | Diabetes mellitus due to underlying condition with diabetic mononeuropathy |
| E08.42 | Diabetes mellitus due to underlying condition with diabetic polyneuropathy |
| E08.43 | Diabetes mellitus due to underlying condition with diabetic autonomic (poly)neuropathy |
| E08.44 | Diabetes mellitus due to underlying condition with diabetic amyotrophy |
| E08.49 | Diabetes mellitus due to underlying condition with other diabetic neurological complication |
| E08.51 | Diabetes mellitus due to underlying condition with diabetic peripheral angiopathy without gangrene |
| E08.52 | Diabetes mellitus due to underlying condition with diabetic peripheral angiopathy with gangrene |
| E08.59 | Diabetes mellitus due to underlying condition with other circulatory complications |
| E08.610 | Diabetes mellitus due to underlying condition with diabetic neuropathic arthropathy |
| E08.618 | Diabetes mellitus due to underlying condition with other diabetic arthropathy |
| E08.620 | Diabetes mellitus due to underlying condition with diabetic dermatitis |
| E08.621 | Diabetes mellitus due to underlying condition with foot ulcer |
| E08.622 | Diabetes mellitus due to underlying condition with other skin ulcer |
| E08.628 | Diabetes mellitus due to underlying condition with other skin complications |
| E08.630 | Diabetes mellitus due to underlying condition with periodontal disease |
| E08.638 | Diabetes mellitus due to underlying condition with other oral complications |
| E08.641 | Diabetes mellitus due to underlying condition with hypoglycemia with coma |
| E08.649 | Diabetes mellitus due to underlying condition with hypoglycemia without coma |
| E08.65 | Diabetes mellitus due to underlying condition with hyperglycemia |
| E08.69 | Diabetes mellitus due to underlying condition with other specified complication |
| E08.8 | Diabetes mellitus due to underlying condition with unspecified complications |
| E08.9 | Diabetes mellitus due to underlying condition without complications |
| E20.811 | Secondary hypoparathyroidism in diseases classified elsewhere |
| F02.80 | Dementia in other diseases classified elsewhere, unspecified severity, without behavioral disturbanc... |
| F02.811 | Dementia in other diseases classified elsewhere, unspecified severity, with agitation |
| F02.818 | Dementia in other diseases classified elsewhere, unspecified severity, with other behavioral disturb... |
| F02.82 | Dementia in other diseases classified elsewhere, unspecified severity, with psychotic disturbance |
| F02.83 | Dementia in other diseases classified elsewhere, unspecified severity, with mood disturbance |
| F02.84 | Dementia in other diseases classified elsewhere, unspecified severity, with anxiety |
| F02.A0 | Dementia in other diseases classified elsewhere, mild, without behavioral disturbance, psychotic dis... |
| F02.A11 | Dementia in other diseases classified elsewhere, mild, with agitation |
| F02.A18 | Dementia in other diseases classified elsewhere, mild, with other behavioral disturbance |
| F02.A2 | Dementia in other diseases classified elsewhere, mild, with psychotic disturbance |
| F02.A3 | Dementia in other diseases classified elsewhere, mild, with mood disturbance |
| F02.A4 | Dementia in other diseases classified elsewhere, mild, with anxiety |
| F02.B0 | Dementia in other diseases classified elsewhere, moderate, without behavioral disturbance, psychotic... |
| F02.B11 | Dementia in other diseases classified elsewhere, moderate, with agitation |
| F02.B18 | Dementia in other diseases classified elsewhere, moderate, with other behavioral disturbance |
| F02.B2 | Dementia in other diseases classified elsewhere, moderate, with psychotic disturbance |
| F02.B3 | Dementia in other diseases classified elsewhere, moderate, with mood disturbance |
| F02.B4 | Dementia in other diseases classified elsewhere, moderate, with anxiety |
| F02.C0 | Dementia in other diseases classified elsewhere, severe, without behavioral disturbance, psychotic d... |
| F02.C11 | Dementia in other diseases classified elsewhere, severe, with agitation |
| F02.C18 | Dementia in other diseases classified elsewhere, severe, with other behavioral disturbance |
| F02.C2 | Dementia in other diseases classified elsewhere, severe, with psychotic disturbance |
| F02.C3 | Dementia in other diseases classified elsewhere, severe, with mood disturbance |
| F02.C4 | Dementia in other diseases classified elsewhere, severe, with anxiety |
| G01 | Meningitis in bacterial diseases classified elsewhere |
| G05.3 | Encephalitis and encephalomyelitis in diseases classified elsewhere |
| G05.4 | Myelitis in diseases classified elsewhere |
| G13.8 | Systemic atrophy primarily affecting central nervous system in other diseases classified elsewhere |
| G26 | Extrapyramidal and movement disorders in diseases classified elsewhere |
| G32.89 | Other specified degenerative disorders of nervous system in diseases classified elsewhere |
| G47.27 | Circadian rhythm sleep disorder in conditions classified elsewhere |
| G47.36 | Sleep related hypoventilation in conditions classified elsewhere |
| G47.37 | Central sleep apnea in conditions classified elsewhere |
| G47.421 | Narcolepsy in conditions classified elsewhere with cataplexy |
| G47.429 | Narcolepsy in conditions classified elsewhere without cataplexy |
| G47.54 | Parasomnia in conditions classified elsewhere |
| G59 | Mononeuropathy in diseases classified elsewhere |
| G70.81 | Lambert-Eaton syndrome in disease classified elsewhere |
| G94 | Other disorders of brain in diseases classified elsewhere |
| H36.89 | Other retinal disorders in diseases classified elsewhere |
| H62.40 | Otitis externa in other diseases classified elsewhere, unspecified ear |
| H62.41 | Otitis externa in other diseases classified elsewhere, right ear |
| H62.42 | Otitis externa in other diseases classified elsewhere, left ear |
| H62.43 | Otitis externa in other diseases classified elsewhere, bilateral |
| H62.8X1 | Other disorders of right external ear in diseases classified elsewhere |
| H62.8X2 | Other disorders of left external ear in diseases classified elsewhere |
| H62.8X3 | Other disorders of external ear in diseases classified elsewhere, bilateral |
| H62.8X9 | Other disorders of external ear in diseases classified elsewhere, unspecified ear |
| H67.1 | Otitis media in diseases classified elsewhere, right ear |
| H67.2 | Otitis media in diseases classified elsewhere, left ear |
| H67.3 | Otitis media in diseases classified elsewhere, bilateral |
| H67.9 | Otitis media in diseases classified elsewhere, unspecified ear |
| H75.00 | Mastoiditis in infectious and parasitic diseases classified elsewhere, unspecified ear |
| H75.01 | Mastoiditis in infectious and parasitic diseases classified elsewhere, right ear |
| H75.02 | Mastoiditis in infectious and parasitic diseases classified elsewhere, left ear |
| H75.03 | Mastoiditis in infectious and parasitic diseases classified elsewhere, bilateral |
| H75.80 | Other specified disorders of middle ear and mastoid in diseases classified elsewhere, unspecified ea... |
| H75.81 | Other specified disorders of right middle ear and mastoid in diseases classified elsewhere |
| H75.82 | Other specified disorders of left middle ear and mastoid in diseases classified elsewhere |
| H75.83 | Other specified disorders of middle ear and mastoid in diseases classified elsewhere, bilateral |
| H82.1 | Vertiginous syndromes in diseases classified elsewhere, right ear |
| H82.2 | Vertiginous syndromes in diseases classified elsewhere, left ear |
| H82.3 | Vertiginous syndromes in diseases classified elsewhere, bilateral |
| H82.9 | Vertiginous syndromes in diseases classified elsewhere, unspecified ear |
| H94.00 | Acoustic neuritis in infectious and parasitic diseases classified elsewhere, unspecified ear |
| H94.01 | Acoustic neuritis in infectious and parasitic diseases classified elsewhere, right ear |
| H94.02 | Acoustic neuritis in infectious and parasitic diseases classified elsewhere, left ear |
| H94.03 | Acoustic neuritis in infectious and parasitic diseases classified elsewhere, bilateral |
| H94.80 | Other specified disorders of ear in diseases classified elsewhere, unspecified ear |
| H94.81 | Other specified disorders of right ear in diseases classified elsewhere |
| H94.82 | Other specified disorders of left ear in diseases classified elsewhere |
| H94.83 | Other specified disorders of ear in diseases classified elsewhere, bilateral |
| I32 | Pericarditis in diseases classified elsewhere |
| I68.2 | Cerebral arteritis in other diseases classified elsewhere |
| I68.8 | Other cerebrovascular disorders in diseases classified elsewhere |
| I79.0 | Aneurysm of aorta in diseases classified elsewhere |
| I79.1 | Aortitis in diseases classified elsewhere |
| K82.A1 | Gangrene of gallbladder in cholecystitis |
| K82.A2 | Perforation of gallbladder in cholecystitis |
| K87 | Disorders of gallbladder, biliary tract and pancreas in diseases classified elsewhere |
| L14 | Bullous disorders in diseases classified elsewhere |
| L45 | Papulosquamous disorders in diseases classified elsewhere |
| L54 | Erythema in diseases classified elsewhere |
| M01.X0 | Direct infection of unspecified joint in infectious and parasitic diseases classified elsewhere |
| M01.X11 | Direct infection of right shoulder in infectious and parasitic diseases classified elsewhere |
| M01.X12 | Direct infection of left shoulder in infectious and parasitic diseases classified elsewhere |
| M01.X19 | Direct infection of unspecified shoulder in infectious and parasitic diseases classified elsewhere |
| M01.X21 | Direct infection of right elbow in infectious and parasitic diseases classified elsewhere |
| M01.X22 | Direct infection of left elbow in infectious and parasitic diseases classified elsewhere |
| M01.X29 | Direct infection of unspecified elbow in infectious and parasitic diseases classified elsewhere |
| M01.X31 | Direct infection of right wrist in infectious and parasitic diseases classified elsewhere |
| M01.X32 | Direct infection of left wrist in infectious and parasitic diseases classified elsewhere |
| M01.X39 | Direct infection of unspecified wrist in infectious and parasitic diseases classified elsewhere |
| M01.X41 | Direct infection of right hand in infectious and parasitic diseases classified elsewhere |
| M01.X42 | Direct infection of left hand in infectious and parasitic diseases classified elsewhere |
| M01.X49 | Direct infection of unspecified hand in infectious and parasitic diseases classified elsewhere |
| M01.X51 | Direct infection of right hip in infectious and parasitic diseases classified elsewhere |
| M01.X52 | Direct infection of left hip in infectious and parasitic diseases classified elsewhere |
| M01.X59 | Direct infection of unspecified hip in infectious and parasitic diseases classified elsewhere |
| M01.X61 | Direct infection of right knee in infectious and parasitic diseases classified elsewhere |
| M01.X62 | Direct infection of left knee in infectious and parasitic diseases classified elsewhere |
| M01.X69 | Direct infection of unspecified knee in infectious and parasitic diseases classified elsewhere |
| M01.X71 | Direct infection of right ankle and foot in infectious and parasitic diseases classified elsewhere |
| M01.X72 | Direct infection of left ankle and foot in infectious and parasitic diseases classified elsewhere |
| M01.X79 | Direct infection of unspecified ankle and foot in infectious and parasitic diseases classified elsew... |
| M01.X8 | Direct infection of vertebrae in infectious and parasitic diseases classified elsewhere |
| M01.X9 | Direct infection of multiple joints in infectious and parasitic diseases classified elsewhere |
| M02.80 | Other reactive arthropathies, unspecified site |
| M02.811 | Other reactive arthropathies, right shoulder |
| M02.812 | Other reactive arthropathies, left shoulder |
| M02.819 | Other reactive arthropathies, unspecified shoulder |
| M02.821 | Other reactive arthropathies, right elbow |
| M02.822 | Other reactive arthropathies, left elbow |
| M02.829 | Other reactive arthropathies, unspecified elbow |
| M02.831 | Other reactive arthropathies, right wrist |
| M02.832 | Other reactive arthropathies, left wrist |
| M02.839 | Other reactive arthropathies, unspecified wrist |
| M02.841 | Other reactive arthropathies, right hand |
| M02.842 | Other reactive arthropathies, left hand |
| M02.849 | Other reactive arthropathies, unspecified hand |
| M02.851 | Other reactive arthropathies, right hip |
| M02.852 | Other reactive arthropathies, left hip |
| M02.859 | Other reactive arthropathies, unspecified hip |
| M02.861 | Other reactive arthropathies, right knee |
| M02.862 | Other reactive arthropathies, left knee |
| M02.869 | Other reactive arthropathies, unspecified knee |
| M02.871 | Other reactive arthropathies, right ankle and foot |
| M02.872 | Other reactive arthropathies, left ankle and foot |
| M02.879 | Other reactive arthropathies, unspecified ankle and foot |
| M02.88 | Other reactive arthropathies, vertebrae |
| M02.89 | Other reactive arthropathies, multiple sites |
| M02.9 | Reactive arthropathy, unspecified |
| M14.80 | Arthropathies in other specified diseases classified elsewhere, unspecified site |
| M14.811 | Arthropathies in other specified diseases classified elsewhere, right shoulder |
| M14.812 | Arthropathies in other specified diseases classified elsewhere, left shoulder |
| M14.819 | Arthropathies in other specified diseases classified elsewhere, unspecified shoulder |
| M14.821 | Arthropathies in other specified diseases classified elsewhere, right elbow |
| M14.822 | Arthropathies in other specified diseases classified elsewhere, left elbow |
| M14.829 | Arthropathies in other specified diseases classified elsewhere, unspecified elbow |
| M14.831 | Arthropathies in other specified diseases classified elsewhere, right wrist |
| M14.832 | Arthropathies in other specified diseases classified elsewhere, left wrist |
| M14.839 | Arthropathies in other specified diseases classified elsewhere, unspecified wrist |
| M14.841 | Arthropathies in other specified diseases classified elsewhere, right hand |
| M14.842 | Arthropathies in other specified diseases classified elsewhere, left hand |
| M14.849 | Arthropathies in other specified diseases classified elsewhere, unspecified hand |
| M14.851 | Arthropathies in other specified diseases classified elsewhere, right hip |
| M14.852 | Arthropathies in other specified diseases classified elsewhere, left hip |
| M14.859 | Arthropathies in other specified diseases classified elsewhere, unspecified hip |
| M14.861 | Arthropathies in other specified diseases classified elsewhere, right knee |
| M14.862 | Arthropathies in other specified diseases classified elsewhere, left knee |
| M14.869 | Arthropathies in other specified diseases classified elsewhere, unspecified knee |
| M14.871 | Arthropathies in other specified diseases classified elsewhere, right ankle and foot |
| M14.872 | Arthropathies in other specified diseases classified elsewhere, left ankle and foot |
| M14.879 | Arthropathies in other specified diseases classified elsewhere, unspecified ankle and foot |
| M14.88 | Arthropathies in other specified diseases classified elsewhere, vertebrae |
| M14.89 | Arthropathies in other specified diseases classified elsewhere, multiple sites |
| M36.3 | Arthropathy in other blood disorders |
| M49.80 | Spondylopathy in diseases classified elsewhere, site unspecified |
| M49.81 | Spondylopathy in diseases classified elsewhere, occipito-atlanto-axial region |
| M49.82 | Spondylopathy in diseases classified elsewhere, cervical region |
| M49.83 | Spondylopathy in diseases classified elsewhere, cervicothoracic region |
| M49.84 | Spondylopathy in diseases classified elsewhere, thoracic region |
| M49.85 | Spondylopathy in diseases classified elsewhere, thoracolumbar region |
| M49.86 | Spondylopathy in diseases classified elsewhere, lumbar region |
| M49.87 | Spondylopathy in diseases classified elsewhere, lumbosacral region |
| M49.88 | Spondylopathy in diseases classified elsewhere, sacral and sacrococcygeal region |
| M49.89 | Spondylopathy in diseases classified elsewhere, multiple sites in spine |
| M63.80 | Disorders of muscle in diseases classified elsewhere, unspecified site |
| M63.811 | Disorders of muscle in diseases classified elsewhere, right shoulder |
| M63.812 | Disorders of muscle in diseases classified elsewhere, left shoulder |
| M63.819 | Disorders of muscle in diseases classified elsewhere, unspecified shoulder |
| M63.821 | Disorders of muscle in diseases classified elsewhere, right upper arm |
| M63.822 | Disorders of muscle in diseases classified elsewhere, left upper arm |
| M63.829 | Disorders of muscle in diseases classified elsewhere, unspecified upper arm |
| M63.831 | Disorders of muscle in diseases classified elsewhere, right forearm |
| M63.832 | Disorders of muscle in diseases classified elsewhere, left forearm |
| M63.839 | Disorders of muscle in diseases classified elsewhere, unspecified forearm |
| M63.841 | Disorders of muscle in diseases classified elsewhere, right hand |
| M63.842 | Disorders of muscle in diseases classified elsewhere, left hand |
| M63.849 | Disorders of muscle in diseases classified elsewhere, unspecified hand |
| M63.851 | Disorders of muscle in diseases classified elsewhere, right thigh |
| M63.852 | Disorders of muscle in diseases classified elsewhere, left thigh |
| M63.859 | Disorders of muscle in diseases classified elsewhere, unspecified thigh |
| M63.861 | Disorders of muscle in diseases classified elsewhere, right lower leg |
| M63.862 | Disorders of muscle in diseases classified elsewhere, left lower leg |
| M63.869 | Disorders of muscle in diseases classified elsewhere, unspecified lower leg |
| M63.871 | Disorders of muscle in diseases classified elsewhere, right ankle and foot |
| M63.872 | Disorders of muscle in diseases classified elsewhere, left ankle and foot |
| M63.879 | Disorders of muscle in diseases classified elsewhere, unspecified ankle and foot |
| M63.88 | Disorders of muscle in diseases classified elsewhere, other site |
| M63.89 | Disorders of muscle in diseases classified elsewhere, multiple sites |
| M90.50 | Osteonecrosis in diseases classified elsewhere, unspecified site |
| M90.511 | Osteonecrosis in diseases classified elsewhere, right shoulder |
| M90.512 | Osteonecrosis in diseases classified elsewhere, left shoulder |
| M90.519 | Osteonecrosis in diseases classified elsewhere, unspecified shoulder |
| M90.521 | Osteonecrosis in diseases classified elsewhere, right upper arm |
| M90.522 | Osteonecrosis in diseases classified elsewhere, left upper arm |
| M90.529 | Osteonecrosis in diseases classified elsewhere, unspecified upper arm |
| M90.531 | Osteonecrosis in diseases classified elsewhere, right forearm |
| M90.532 | Osteonecrosis in diseases classified elsewhere, left forearm |
| M90.539 | Osteonecrosis in diseases classified elsewhere, unspecified forearm |
| M90.541 | Osteonecrosis in diseases classified elsewhere, right hand |
| M90.542 | Osteonecrosis in diseases classified elsewhere, left hand |
| M90.549 | Osteonecrosis in diseases classified elsewhere, unspecified hand |
| M90.551 | Osteonecrosis in diseases classified elsewhere, right thigh |
| M90.552 | Osteonecrosis in diseases classified elsewhere, left thigh |
| M90.559 | Osteonecrosis in diseases classified elsewhere, unspecified thigh |
| M90.561 | Osteonecrosis in diseases classified elsewhere, right lower leg |
| M90.562 | Osteonecrosis in diseases classified elsewhere, left lower leg |
| M90.569 | Osteonecrosis in diseases classified elsewhere, unspecified lower leg |
| M90.571 | Osteonecrosis in diseases classified elsewhere, right ankle and foot |
| M90.572 | Osteonecrosis in diseases classified elsewhere, left ankle and foot |
| M90.579 | Osteonecrosis in diseases classified elsewhere, unspecified ankle and foot |
| M90.58 | Osteonecrosis in diseases classified elsewhere, other site |
| M90.59 | Osteonecrosis in diseases classified elsewhere, multiple sites |
| M90.60 | Osteitis deformans in neoplastic diseases, unspecified site |
| M90.611 | Osteitis deformans in neoplastic diseases, right shoulder |
| M90.612 | Osteitis deformans in neoplastic diseases, left shoulder |
| M90.619 | Osteitis deformans in neoplastic diseases, unspecified shoulder |
| M90.621 | Osteitis deformans in neoplastic diseases, right upper arm |
| M90.622 | Osteitis deformans in neoplastic diseases, left upper arm |
| M90.629 | Osteitis deformans in neoplastic diseases, unspecified upper arm |
| M90.631 | Osteitis deformans in neoplastic diseases, right forearm |
| M90.632 | Osteitis deformans in neoplastic diseases, left forearm |
| M90.639 | Osteitis deformans in neoplastic diseases, unspecified forearm |
| M90.641 | Osteitis deformans in neoplastic diseases, right hand |
| M90.642 | Osteitis deformans in neoplastic diseases, left hand |
| M90.649 | Osteitis deformans in neoplastic diseases, unspecified hand |
| M90.651 | Osteitis deformans in neoplastic diseases, right thigh |
| M90.652 | Osteitis deformans in neoplastic diseases, left thigh |
| M90.659 | Osteitis deformans in neoplastic diseases, unspecified thigh |
| M90.661 | Osteitis deformans in neoplastic diseases, right lower leg |
| M90.662 | Osteitis deformans in neoplastic diseases, left lower leg |
| M90.669 | Osteitis deformans in neoplastic diseases, unspecified lower leg |
| M90.671 | Osteitis deformans in neoplastic diseases, right ankle and foot |
| M90.672 | Osteitis deformans in neoplastic diseases, left ankle and foot |
| M90.679 | Osteitis deformans in neoplastic diseases, unspecified ankle and foot |
| M90.68 | Osteitis deformans in neoplastic diseases, other site |
| M90.69 | Osteitis deformans in neoplastic diseases, multiple sites |
| M90.80 | Osteopathy in diseases classified elsewhere, unspecified site |
| M90.811 | Osteopathy in diseases classified elsewhere, right shoulder |
| M90.812 | Osteopathy in diseases classified elsewhere, left shoulder |
| M90.819 | Osteopathy in diseases classified elsewhere, unspecified shoulder |
| M90.821 | Osteopathy in diseases classified elsewhere, right upper arm |
| M90.822 | Osteopathy in diseases classified elsewhere, left upper arm |
| M90.829 | Osteopathy in diseases classified elsewhere, unspecified upper arm |
| M90.831 | Osteopathy in diseases classified elsewhere, right forearm |
| M90.832 | Osteopathy in diseases classified elsewhere, left forearm |
| M90.839 | Osteopathy in diseases classified elsewhere, unspecified forearm |
| M90.841 | Osteopathy in diseases classified elsewhere, right hand |
| M90.842 | Osteopathy in diseases classified elsewhere, left hand |
| M90.849 | Osteopathy in diseases classified elsewhere, unspecified hand |
| M90.851 | Osteopathy in diseases classified elsewhere, right thigh |
| M90.852 | Osteopathy in diseases classified elsewhere, left thigh |
| M90.859 | Osteopathy in diseases classified elsewhere, unspecified thigh |
| M90.861 | Osteopathy in diseases classified elsewhere, right lower leg |
| M90.862 | Osteopathy in diseases classified elsewhere, left lower leg |
| M90.869 | Osteopathy in diseases classified elsewhere, unspecified lower leg |
| M90.871 | Osteopathy in diseases classified elsewhere, right ankle and foot |
| M90.872 | Osteopathy in diseases classified elsewhere, left ankle and foot |
| M90.879 | Osteopathy in diseases classified elsewhere, unspecified ankle and foot |
| M90.88 | Osteopathy in diseases classified elsewhere, other site |
| M90.89 | Osteopathy in diseases classified elsewhere, multiple sites |
| N37 | Urethral disorders in diseases classified elsewhere |
| N48.32 | Priapism due to disease classified elsewhere |
| N52.1 | Erectile dysfunction due to diseases classified elsewhere |
| N74 | Female pelvic inflammatory disorders in diseases classified elsewhere |

---

## Heuristic Rules (for codes not listed above)

1. If description contains "in diseases classified elsewhere" — treat as manifestation, require etiology first.
2. If description contains "code first" — the referenced condition must precede this code.
3. E08.x codes (DM due to underlying condition) always require the underlying condition coded first.
4. D63.x (anemia in other diseases) always requires the causative disease first.
5. Any secondary/metastatic neoplasm (C77-C79) requires the primary neoplasm coded first.