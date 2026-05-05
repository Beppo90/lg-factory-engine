# tests/regression — Pilar 4 Test-as-Documentation

> Suite de regresión: golden runs como fixtures, schemas v4 + master prompts como contratos. Dos targets: `test-canon` (Phase 2 — Activity Cards vs JSON Schema) y `test-phase0` (Phase 0 — matrices PM-0.0 vs validation_checks emitidos por LLM).

## Cómo correr

```bash
make test-canon                # Phase 2 (Activity Cards vs v4 JSON Schema)
make test-phase0               # Phase 0 (PM-0.0 matrices · validation_checks PASS)
make test-all                  # corre ambos
```

Primera vez:

```bash
make test-canon-install        # instala ajv + ajv-formats
make setup-hooks               # activa pre-commit hook (configura core.hooksPath)
```

Exit code: `0` si todos los fixtures pasan, `1` si alguno falla.

## Pre-commit hook

Activado vía `make setup-hooks` (configura `git config core.hooksPath .githooks`).
Política de bloqueo elegida (Hito 2 fase C): **opción (b)** — bloquea solo lo verde.

| Test | Comportamiento en pre-commit |
|---|---|
| `test-phase0` | **Bloqueante** · si alguna matriz PM-0.0 deja de tener `validation_checks` todos PASS, el commit aborta |
| `test-canon` | **Informativo** · drift Phase 2 cross-versions schema/runs es deuda conocida (Hito 4 Opción C) · NO bloquea |

Bypass explícito: `git commit --no-verify`.

Hook script en `.githooks/pre-commit` (versionado · ejecutable). `core.hooksPath` es config local — cada clone necesita correr `make setup-hooks` una vez.

## Decisiones de diseño

| Decisión | Opción elegida | Razón |
|---|---|---|
| Runner | Node + ajv (draft 2020-12) | Schemas `v4/` ya están en formato AJV |
| Ubicación | `fpi-sena-factory/tests/regression/` | Junto a runs (fixtures) y schemas (contratos) |
| Fixtures | Frozen copy en `fixtures/` | Reproducibilidad · tests no rompen si runs cambian |
| Phase 2 contract | `v4/schemas/pm-2-3.schema.json` | Schema vigente del sistema |
| Phase 0 contract | `validation_checks[].status === "PASS"` emitidos por LLM en cada matriz | No hay schema PM-0.0 en `v4/`; verdad opera-cional son los flags que el LLM emite (deuda: schema PM-0.0 formal pendiente) |

## Estructura

```
tests/regression/
├── README.md
├── package.json              # ajv ^8.17 · ajv-formats ^3.0
├── test-canon.js             # Phase 2 runner
├── test-phase0.js            # Phase 0 runner
├── fixtures/
│   ├── diesel-pm-2-3.json                  # Phase 2 (Técnico · v2.0 legacy)
│   ├── mgv-pm-2-3.json                     # Phase 2 (Tecnológico · v2.0 legacy)
│   ├── imarpor-cc-v2-pm-2-3.json           # Phase 2 (Curso Compl · v3.0 nuevo)
│   ├── recreacion-pm-0-0-matriz-G1.json    # Phase 0 (Técnico · 1ra guía)
│   ├── recreacion-pm-0-0-matriz-G2.json    # Phase 0 (Técnico · 2da guía)
│   ├── infrati-pm-0-0-matriz-G1.json       # Phase 0 (Tecnólogo multi-comp · 1ra)
│   ├── infrati-pm-0-0-matriz-G2.json       # Phase 0 (Tecnólogo multi-comp · 2da)
│   └── infrati-pm-0-0-matriz-G3.json       # Phase 0 (Tecnólogo multi-comp · CIERRE)
└── node_modules/             # gitignore
```

## Estado del Hito 2 (2026-05-04)

### test-canon · Phase 2 — `0/3 PASS · 3/3 FAIL`

Drift estructural triple cross-runs vs schema vigente:

| Fixture | Errores | Tipo de drift |
|---|---|---|
| DIESEL pm-2-3 | 17 | legacy v2.0 — estructura `activities[]` simple, falta `pm_envelope`, `activity_cards[]` |
| MGV pm-2-3 | 36 | legacy v2.0 — distinto formato; ni siquiera tiene `_meta`. Más lejos del canon que DIESEL |
| IMARPOR-CC-V2 pm-2-3 | 26 | v3.0 nuevo — `activity_card` (singular) vs schema exige `activity_cards[]` (plural). Otro tipo de drift |

**Hallazgo crítico:** los runs evolucionaron `v2.0 → v3.0/v3.1`, pero el **schema `v4/schemas/` se quedó en `v2.7`**. La deuda no es solo de los runs viejos: el schema vigente está obsoleto respecto al canon evolutivo de Activity Cards.

### test-phase0 · Phase 0 — `5/5 PASS`

Todas las matrices PM-0.0 emiten validation_checks PASS según el master prompt v2.3:

| Fixture | Checks | Status |
|---|---|---|
| RECREACION G1 | 12/12 | ✓ PASS |
| RECREACION G2 | 13/13 | ✓ PASS |
| INFRATI G1 | 15/15 | ✓ PASS · multi-comp añade checks sobre el mínimo |
| INFRATI G2 | 15/15 | ✓ PASS · multi-comp |
| INFRATI G3 | 15/15 | ✓ PASS · multi-comp · CIERRE PROGRAMA |

LLM auto-validación funciona. El test garantiza que ningún flag silenciosamente quedó FAIL/WARN.

## Smoke regression verificado (corrida 2026-05-04)

**test-canon (modificar fixture):**
```
Baseline DIESEL                                → 17 errors
Fixture _meta.schema_version: v2.0 → v2.7      → 16 errors  (↓1)
Revert                                         → 17 errors
```

**test-phase0 (induce FAIL):**
```
Baseline                                       → 5/5 PASS
Modify RECREACION G1 check #1 status PASS→FAIL → 4/5 PASS · runner detecta y reporta
Revert                                         → 5/5 PASS
```

Ambos targets responden correctamente a cambios. Cambios `cp` reverted desde backup.

## Roadmap Pilar 4

- [x] **Hito 1** — piloto DIESEL pm-2-3 + infraestructura ajv + Makefile + drift detectado
- [x] **Hito 2** — cobertura 3 fixtures Phase 2 + 5 fixtures Phase 0 + target separado `test-phase0` + smoke en ambos targets + pre-commit hook bloqueo opción (b) (`test-phase0` bloqueante · `test-canon` informativo)
- [ ] **Hito 3 (semana 3)** — F2.8 schema drift CI (master prompts ↔ v4/schemas) · va a detectar (a) los 4 schemas v2.0 NEW pendientes y (b) que activity-card schema está stale en v2.7
- [ ] **Hito 4 (semana 4)** — bifurcación: F2.5 close · Sprint 2 E2E IMARPOR-CC · o Opción C (promover `test-phase0` a bloqueante + migrar fixtures legacy o schema v4)

## Cómo agregar un fixture nuevo

### Phase 2 (Activity Card vs JSON Schema)

1. `cp runs/<RUN_ID>/<pm-X-Y>.json fixtures/<run-id>-<pm-X-Y>.json`
2. Editar `test-canon.js`, agregar entry a `testCases[]` con `schemaId` apropiado
3. `make test-canon`

### Phase 0 (matriz PM-0.0)

1. `cp runs/<RUN_ID>/pm-0-0-matriz-alineada[-G<N>].json fixtures/<run-id>-pm-0-0-matriz-G<N>.json`
2. Editar `test-phase0.js`, agregar entry a `testCases[]` con `expected_min_checks` (12 G1, 13 G2+, 15 si multi-comp)
3. `make test-phase0`

## Deuda explícita conocida

1. **Activity Card schema v4 está stale** — declara `enum: ["activity-card-v2.7"]` pero los runs evolucionaron a v3.0/v3.1. Decisión pendiente Hito 4 Opción C: migrar schema o migrar runs
2. **No existe `v4/schemas/pm-0-0.schema.json`** — Phase 0 valida solo `validation_checks` flags. Construir un schema PM-0.0 formal sería deuda separada
3. **4 schemas v2.0 NEW pendientes en `v4/schemas/`** (post-paradigm shift 2026-05-04): `contenido_tecnico_crudo.competencias[]`, `_v2_audit_anclaje_tecnico`, `_deuda_explicita_para_guia_siguiente`, `_cobertura_total_programa`. Hito 3 F2.8 los detectará automáticamente
4. **Backups `.pre-wave-*` y `.pre-v*` en runs/** confunden el ls; los fixtures se eligen por path exacto sin sufijos para evitar ambigüedad
