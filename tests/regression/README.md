# tests/regression — Pilar 4 Test-as-Documentation

> Suite de regresión: golden runs como fixtures, schemas v4 como contratos, ajv como validador. Hito 1 piloto cubre 1 fixture DIESEL contra `pm-2-3.schema.json`.

## Cómo correr

```bash
make test-canon                # desde root del repo
# o equivalentemente:
node tests/regression/test-canon.js
```

Primera vez:

```bash
make test-canon-install        # instala ajv + ajv-formats en tests/regression/node_modules
```

Exit code: `0` si todos los fixtures pasan, `1` si alguno falla.

## Decisiones de diseño (Hito 1)

| Decisión | Opción elegida | Razón |
|---|---|---|
| Runner | Node + ajv (draft 2020-12) | Schemas `v4/` ya están en formato AJV; sin migración de validador |
| Ubicación | `fpi-sena-factory/tests/regression/` | Junto a runs (fixtures) y schemas (contratos) |
| Primer fixture | `runs/DIESEL-2026-04-19/pm-2-3.json` | Reading anchor · run estable · pre-v2.7 paradigm shift |
| Schema target | `v4/schemas/pm-2-3.schema.json` | Contrato vigente del sistema |

## Estructura

```
tests/regression/
├── README.md
├── package.json              # ajv ^8.17 · ajv-formats ^3.0
├── test-canon.js             # runner; carga schemas, valida fixtures, reporta
├── fixtures/
│   └── diesel-pm-2-3.json    # frozen copy de runs/DIESEL-2026-04-19/pm-2-3.json
└── node_modules/             # gitignore
```

## Estado del piloto (2026-05-04)

Baseline: **1 fixture · 0 PASS · 1 FAIL**. El fail NO es bug — es **drift legacy detectado correctamente**:

- DIESEL `pm-2-3.json` declara `_meta.schema_version: "activity-card-v2.0"`
- `pm-2-x-base.schema.json` v4.0 exige `enum: ["activity-card-v2.7"]` y la nota `"v4.0 canon: solo v2.7 6-bloque. Legacy v2.0 debe migrar."`
- Resultado: 17 errores de validación esperados (estructura simple `activities[]` vs schema 6-bloque `activity_cards[]`, `pm_envelope` ausente, etc.)

**El piloto demuestra que la infraestructura detecta drift real entre runs históricos y schemas vigentes.** Es exactamente el value proposition de Pilar 4.

## Smoke regression verificado

Demostración de que el test responde a cambios — corrida 2026-05-04:

```
Baseline                                      → 17 validation errors
Fixture _meta.schema_version: v2.0 → v2.7     → 16 validation errors  (↓1)
Revert                                        → 17 validation errors
```

Confirma: cualquier modificación del fixture cambia el resultado. Cambios `sed` reverted con `cp` desde backup. Mismo principio aplicaría modificando el schema.

## Roadmap Pilar 4

- [x] **Hito 1 (semana 1)** — piloto DIESEL pm-2-3 + infraestructura ajv + Makefile + drift detectado
- [ ] **Hito 2 (semana 2)** — cobertura 3 golden runs Phase 2 (DIESEL + MGV + IMARPOR-CC) · target separado `test-phase0` para PM-0.0 matrices (RECREACION + INFRATI) · CI wire
- [ ] **Hito 3 (semana 3)** — F2.8 schema drift CI (master prompts ↔ v4/schemas) · va a flaggar 4 schemas v2.0 NEW pendientes
- [ ] **Hito 4 (semana 4)** — bifurcación: F2.5 close · Sprint 2 E2E IMARPOR-CC · o promover `test-phase0` a bloqueante (Opción C)

## Cómo agregar un fixture nuevo

1. Copiar el JSON desde `runs/<RUN_ID>/<output>.json` a `fixtures/<run-id>-<pm>.json`
2. Editar `test-canon.js` y agregar entry a `testCases[]`:
   ```js
   {
     label: 'MGV · pm-2-3 vs v4 schema',
     fixture: path.join(FIXTURES_DIR, 'mgv-pm-2-3.json'),
     schemaId: 'fpi-sena-factory/v4/schemas/pm-2-3.schema.json',
   }
   ```
3. `make test-canon`

## Deuda explícita conocida

- DIESEL `pm-2-3.json` (y probablemente todos los pm-2-X de DIESEL) están en formato legacy v2.0 · contrato vigente es v2.7 · migración de runs golden es trabajo separado (candidato Hito 4 Opción C)
- 4 schemas v2.0 NEW (post-2026-05-04) faltan en `v4/schemas/`: `contenido_tecnico_crudo.competencias[]`, `_v2_audit_anclaje_tecnico`, `_deuda_explicita_para_guia_siguiente`, `_cobertura_total_programa` · F2.8 schema drift CI los detectará en Hito 3
