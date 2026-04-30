# IMARPOR-CC-2026-04-27 · Inglés Marítimo y Portuario

**Programa:** INGLÉS MARÍTIMO Y PORTUARIO · Curso Complementario · 100h
**Tipo:** Curso Complementario (single-guía · 12 sesiones · 4 RAPs absorbidos)
**CEFR:** A2.1 progresivo (A1.2 entrada → A2.1 salida)
**Sector:** Marítimo y portuario · Buenaventura
**Instructor:** Sergio Leonardo Cortés · Diana Rocío Samboni
**Generado:** Abril 2026

---

## Pipeline FPI Factory · 4 phases · 24 PMs · COMPLETO ✅

```
PHASE 1 (Scope)         → 3 PMs    → análisis curricular
PHASE 2 (Architecture)  → 11 PMs   → 8 sesiones × 60h blueprint + activity cards
PHASE 3 (Playbook)      → 4 PMs    → instructor's playbook + instrumentos
PHASE 4 (Derivados)     → 4 PMs    → entregables estudiante/instructor
```

---

## Inventario de archivos · Cómo consumir cada uno

### Phase 1 · Scope (3 archivos)

| Archivo | Propósito | Consumir como |
|---------|-----------|---------------|
| `pm-0-context.json` + `.md` | Programa metadata + sector + universo narrativo | Reference para todas las phases siguientes |
| `pm-1-1.json` + `.md` | Ruta macrotemática · 4 RAPs (RA1-RA4) absorbidos | Input para PM-1.2 |
| `pm-1-2.json` + `.md` | Scope & Sequence · universo narrativo extendido · cols 1-5 GFPI-F-134 | Input para Phase 2 |

### Phase 2 · Session Architecture (11 archivos)

| Archivo | Propósito |
|---------|-----------|
| `pm-2-0.json` | Session blueprint · 12 sesiones × 60h |
| `pm-2-1.json` ... `pm-2-10.json` | 9 Activity Cards (PM-2.7 deprecated) |
| `pm-2-11.json` | GFPI-F-134 Row Assembler · cols 1-11 completas |
| `pm-2-validation-report.json` | Validation cross-PM Phase 2 |

### Phase 3 · Playbook (15 archivos)

| Archivo | Propósito |
|---------|-----------|
| `pm-3-1.json` | Playbook Outline · session map · pm0_alignment_by_session |
| `pm-3-2-s1.json` ... `pm-3-2-s12.json` | Build-Out detail · 12 sesiones · facilitación SET-UP/WHILE/WRAP-UP |
| `pm-3-5.json` | Final Mission · 5 sub-fases ABP transferencia |
| `pm-4-1.json` | 6 Instrumentos formativos (E1-E5 + framework E6) |
| `pm-4-2.json` | Cuestionario Consolidado E6 · S10 · 25 pts · 5 skills × 5 pts |

### Phase 4 · Derivados estudiantiles/instructor (8 archivos)

| Archivo | Tipo | Propósito | Consumir como |
|---------|------|-----------|---------------|
| **`pm-3-3.md`** | Markdown | Visual Aid Generator student-facing **tool-agnostic** · 25 actividades con 7 secciones canónicas cada una | Copia secciones a Claude Design / PPTX / Canva / NotebookLM / Figma · cada herramienta interpreta wireframe textual y respeta paleta + universo |
| `pm-3-3-SAMPLE.md` | Markdown | 2 actividades preview canónico (A3.1.1 + A3.3.S3.3) · referencia futura | Reference para validar futuros runs PM-3.3 |
| **`pm-3-4.json`** | JSON | Workbook Autónomo · 12 chapters · 45 actividades · v2.7 anatomy 18 fields | Input para futuro renderer Workbook DOCX (Hito 5 pendiente) |
| **`pm-3-6.json`** | JSON | GFPI-F-135 Guía del Aprendiz canon v2.7 · 25 actividades · 8 secciones | Source de verdad pedagógica · consumido por renderer DOCX |
| **`pm-3-6-FINAL-IMARPOR-CC.docx`** | DOCX | Guía del Aprendiz **lista para imprimir/distribuir** · 79 KB · paleta SENA · 23 tablas | **Entrega oficial al instructor/aprendiz** |
| **`pm-3-7.json`** | JSON | GFPI-F-134 Matrix V04 oficial SENA · multi-RAP · 4 rows | Source de verdad agregada · consumido por xlsx_renderer |
| **`pm-3-7-gfpi-f134-matrix.xlsx`** | XLSX | Matriz Pedagógica oficial SENA V04 · **lista para entrega coordinación** | **Entrega oficial cordinación académica** |
| `pm-3-7-input-V04-authoritative.xlsx` | XLSX | Sergio's manual fill-in V04 (ground truth) | Reference operacional · NO modificar |

### Soporte (3 archivos)

| Archivo | Propósito |
|---------|-----------|
| `IMARPOR-CC-input.xlsx` | Input original Fase 1 (Sergio) |
| `arquetipos-elegidos.json` | Decisiones arquetipos Phase 2 (Gate 1) |
| `pm-3-3-input-V04-authoritative.xlsx` | Sergio fill V04 GFPI-F-134 (ground truth) |

### Scripts del run (`scripts/`)

| Archivo | Propósito |
|---------|-----------|
| `gen_audit_docx.js` | Renderer DOCX · port from MGV · paleta SENA v2.6.6 · 3064 líneas |
| `lib/render_seccion4_evidencias.js` | Helper compartido renderer DOCX |
| `validator_v27.js` | Validador canon v2.7 actividades |
| `check-activity-card-schema.js` | Validador schema Activity Card |
| `fix-pm36-v27.js` | Migrador one-shot Vf shape → v2.7 strict |

---

## Cómo entregar al instructor / coordinación

### Paquete entrega instructor (3 archivos)

1. **`pm-3-6-FINAL-IMARPOR-CC.docx`** · Guía del Aprendiz oficial GFPI-F-135 · imprimible
2. **`pm-3-7-gfpi-f134-matrix.xlsx`** · Matriz Pedagógica oficial GFPI-F-134 V04
3. **`pm-3-3.md`** · Visual Aid Generator · el instructor lo usa para crear apoyo visual en Claude Design / PPTX / Canva / cualquier tool

### Paquete entrega coordinación académica (1 archivo)

1. **`pm-3-7-gfpi-f134-matrix.xlsx`** · Matriz Pedagógica oficial GFPI-F-134 V04 · 4 RAPs documentados · sumas SUM · paleta SENA institucional

### Workflow día-a-día instructor

```
Para cada sesión SX:
  1. Lee pm-3-2-sX.json (build-out · facilitación)
  2. Lee pm-3-1.json (overview · materials · estrategias)
  3. Para visuals: copia sección actividad de pm-3-3.md → tu tool preferido
  4. Para evaluación: usa instrumentos pm-4-1.json + cuestionario pm-4-2.json (S10)
  5. Para evidencias entregadas: compara contra criterios pm-3-6.json
```

---

## Versiones canónicas usadas

| PM | Versión vigente |
|----|----------------|
| PM-1.1 | v2.7.1 |
| PM-1.2 | v4.1 |
| PM-2.x | v3.0 (Fase 2 Camino 2 LLM) |
| PM-3.1 | v2.6 |
| PM-3.2 | v2.6 |
| PM-3.3 | **v3.0** (NEW · paradigm shift student-facing tool-agnostic) |
| PM-3.4 | **v4.1** (paridad v2.7 anatomy con PM-3.6) |
| PM-3.5 | v2.0 |
| PM-3.6 | **v2.7** (Learner-Readable Anatomy 6-bloque) |
| PM-3.7 | **v2.0** (canon V04 oficial · multi-RAP) |
| PM-4.1 | v2.0 |
| PM-4.2 | v2.0 |

---

## Archivos legacy / cleanup futuro

- `pm-3-4.json.bak.v40` · backup pre v4.1 migration (mantener para auditoría)
- `pm-3-6.json.bak-v265` · backup pre v2.7 migration
- `pm-3-6.json.bak.before-fix-2026-04-30` · backup pre scaffold structure fix
- `.archive/pm-3-7-vf-obsolete-2026-04-30/` · v1.0 Vf shape obsoleto (migrado a V04 · canon update)

---

## Para más información

- **Pipeline general:** `master-prompts/DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md`
- **Plan Fase 3:** `master-prompts/PLAN-FASE-3-ARQUITECTURA.md` v1.5
- **Master prompts canon:** `master-prompts/PM-X.X — *.md`
- **Skill operacional:** `.claude/skills/fpi-sena-fase3/`
- **CHANGELOG sesión-by-sesión:** `runs/IMARPOR-CC-2026-04-27/CHANGELOG.md`

---

*README · IMARPOR-CC-2026-04-27 · Generado 2026-04-30 · Cierre Phase 4 + Hito 5 parcial*
