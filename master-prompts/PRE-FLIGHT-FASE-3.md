---
title: PRE-FLIGHT FASE 3 — Inventario canon antes de PLAN-FASE-3-ARQUITECTURA.md v1.0
proposito: Documento de descubrimiento que mapea el canon operacional Fase 3 existente (DIESEL g1..g5 + MGV g1..g6 ya tienen pm-3-* implementado manualmente con scripts node) ANTES de escribir el plan v1.0
status: PRE-FLIGHT (lectura disciplinada · NO escribir plan v1.0 aquí)
sesion_actual: 2026-04-29
quien_escribe: Claude (skill fpi-sena-fase2 activa) + Sergio (instructor responsable)
duracion_estimada_v10_post_preflight: 2-3h sesión fresca dedicada (post Hito 4 cierre Fase 2)
---

# PRE-FLIGHT FASE 3 — Inventario del canon antes de planear

## Propósito de este documento

A diferencia de la Fase 2 (donde inventamos canon ex-novo basado en pocos runs DIESEL), **Fase 3 ya tiene canon operacional cristalizado en DIESEL+MGV** — incluyendo scripts node generadores reales que producen docx/pptx. Este documento NO es el plan v1.0. Es el **inventario disciplinado** del canon que debe leerse ANTES de escribir el plan, para no inventar lo que ya existe.

Cuando se escriba PLAN-FASE-3-ARQUITECTURA.md v1.0 (sesión fresca · 2-3h dedicadas), partirá de este inventario · NO de la memoria del autor.

---

## §1. Master prompts Fase 3 vigentes (8 archivos · 227 KB total)

| PM | Archivo | Versión | Tamaño | Función |
|---|---|---|---|---|
| **PM-3.1** | Playbook Outline — Session Map.md | 2.6 | 41.6 KB | Distribuir 9 worksheets Fase 2 + Cuestionario en 8 sesiones reales · pre-carga `pm0_alignment_by_session` |
| **PM-3.2** | Playbook Build-Out — Step by Step.md | 2.5 | 30.0 KB | Expandir UNA sesión del outline a plan minuto-a-minuto · Teacher Talk · answer keys · ejecuta 8 veces |
| **PM-3.3** | Canva Deck — Visual Support.md | 2.4 | 22.3 KB | Generar `pm-3-3-spec.json` (contrato datos) + PPTX derivada · prohibido hardcoding en generador |
| **PM-3.4** | Workbook — Autonomous Work.md | 2.0 | 8.7 KB | Capítulos del Workbook autónomo · 1 capítulo por sesión presencial · default 7 capítulos |
| **PM-3.5** | Final Mission — Integrative Task.md | 2.6 | 23.8 KB | Tarea integradora ABP S6½-S8 · 27 keys canónicos · `activity_footer × 5 sub-fases` · checklist PRE-GENERATION obligatorio |
| **PM-3.6** | GFPI-F-135 Integrator.md | 2.6.5 | 48.0 KB | Transformar Playbook Instructor (PM-3.2) en Guía del Aprendiz GFPI-F-135 V02 (2ª persona) |
| **PM-4.1** | Instrumentos de Evaluación Formativa.md | 2.6.5 | 28.3 KB | **Derivador** · genera 6 instrumentos formales desde Activity Cards Fase 2 + PM-2.11 |
| **PM-4.2** | Cuestionario Técnico — Evidencia.md | 2.0 | 24.9 KB | **Ensamblador** Cuestionario Consolidado S6 · 25 pts · 5 skills × 5 pts |

**Observaciones críticas del frontmatter:**

- PM-3.3 ya marca `Phase: 4` (no 3) · esquema actual lo trata como derivado post-Playbook
- PM-3.4 también `Phase: 4` · idem (canon DM v2.0+ moved both to Phase 4)
- PM-3.6 marca `Phase: 4` con trigger `post_playbook_confirmation`
- PM-4.1 + PM-4.2 son `Phase: 3`
- PM-3.1 + PM-3.2 + PM-3.5 son `Phase: 3` (orden estricto: 3.1 → 3.2 → 3.5)

**Implicación arquitectónica:** la "Fase 3" nominal en realidad agrupa 2 sub-fases:
- **Phase 3 (Playbook + assessment):** PM-3.1 · PM-3.2 (8 ejecuciones) · PM-3.5 · PM-4.1 · PM-4.2
- **Phase 4 (derivados estudiante):** PM-3.3 · PM-3.4 · PM-3.6 (post-Playbook approval)

Esto debe canonizarse en el plan v1.0.

---

## §2. Canon operacional real · outputs existentes en runs DIESEL/MGV

### MGV-2026-04-20 (run más maduro · 6 guías originalmente · solo G1 con Fase 3 completa)

```
runs/MGV-2026-04-20/
├─ pm-3-1.json (75 KB)               ← Playbook Outline G1
├─ pm-3-2-s1.json (43 KB)            ← Build-Out S1
├─ pm-3-2-s2.json (22 KB)            ← Build-Out S2
├─ pm-3-2-s3.json (22 KB)            ← Build-Out S3
├─ pm-3-2-s4.json (23 KB)            ← Build-Out S4
├─ pm-3-2-s5.json (22 KB)            ← Build-Out S5
├─ pm-3-2-s6.json (20 KB)            ← Build-Out S6
├─ pm-3-2-s7.json (20 KB)            ← Build-Out S7
├─ pm-3-2-s8.json (21 KB)            ← Build-Out S8
├─ pm-3-2-pm0-propagation-report.json (1.5 KB)  ← artefacto de propagación
├─ pm-3-4-content.json (9 KB)        ← Workbook content
├─ pm-3-5.json (37 KB)               ← Final Mission (más extenso · canon v2.6)
├─ pm-3-6.json (280 KB · grande)     ← GFPI-F-135 G1
├─ pm-4-1.json (28 KB)               ← Instrumentos
├─ pm-4-2.json (22 KB)               ← Cuestionario S6
├─ Docs finales:
│   ├─ pm-3-1-FINAL-G1.docx (36 KB)
│   ├─ pm-3-2-FINAL-G1.docx (71 KB)
│   ├─ pm-3-5-FINAL-G1.docx (27 KB)
│   ├─ pm-3-6-FINAL-G1.docx (106 KB · GFPI-F-135 oficial)
│   ├─ pm-3-1-review.docx (47 KB)    ← review pre-final
│   ├─ pm-4-1-review.docx (20 KB)
│   └─ pm-4-2-review.docx (18 KB)
└─ scripts/
    └─ pm-3-2-pm0-propagate.js (5 KB)
```

**MGV es el ground truth Fase 3 más completo · estado: 1 guía completa · falta deck PPTX**

### DIESEL-2026-04-15 (run primer · 1 guía · más outputs incluido PPTX)

```
runs/DIESEL-2026-04-15/
├─ pm-3-1.json (96 KB)               ← Playbook Outline (más grande que MGV)
├─ pm-3-2-s1..s7.json                ← 7 Build-Outs (no s8)
├─ pm-3-3-spec.json (36 KB)          ← Canva Deck spec
├─ pm-3-3-deck.pptx (374 KB)         ← PPTX final · ÚNICO run con deck
├─ pm-3-4.json (52 KB)               ← Workbook completo
├─ pm-3-4-workbook.docx (78 KB)      ← Workbook docx final
├─ pm-3-5.json (16 KB · más pequeño que MGV) + pm-3-5-final-mission.docx (21 KB)
├─ pm-3-6-master-prompt.md (12 KB)   ← prompt usado para generar GFPI
├─ pm-3-6-learning-guide.docx (49 KB) ← GFPI-F-135 final
├─ pm-4-1.json (26 KB) + pm-4-1-instrumentos.docx (22 KB)
└─ scripts/ (10 archivos JS · ver §3)
```

### DIESEL-2026-04-18 + DIESEL-2026-04-19

Duplicados de DIESEL-2026-04-15 con iteraciones · contienen archivos `.broken`, `.pre-v266`, `.pre-v4-anexos` que muestran historia de fixes. **NO son canon limpio · son debugging history.**

### MGV-2026-04-27 + IMARPOR-CC-2026-04-27 + INGBAS4-2026 + INGBAS1-AGRO-2026

**SIN outputs Fase 3** — solo tienen Fase 1 + Fase 2 cerrada. Son los runs que el FPI CD Engine debe generar Fase 3 cuando esté listo.

---

## §3. Scripts node generadores · qué ya existe vs qué hay que portar

### DIESEL-2026-04-15 (versión más limpia · sin debugging)

| Script | Tamaño | Función |
|---|---|---|
| `pm-3-1-gen.js` | 70 KB | Generador principal Playbook Outline |
| `pm-3-1-amb-patch.js` | 17 KB | Patch ambientes_resumen + ambientes por sesión |
| `pm-3-1-voc-patch.js` | 19 KB | Patch voc_dimensions_table (V+O+C) |
| `pm-3-1-estrategias-patch.js` | 28 KB | Patch estrategias_resumen + estrategias por sesión |
| `pm-3-2-build-out-gen.js` | 62 KB | Generador principal Build-Out (8 sesiones) |
| `pm-3-2-estrategias-patch.js` | 9 KB | Propagación estrategias S1-S8 a Build-Out |
| `pm-3-2-pm0-patch.js` | 28 KB | Propagación pm0_protocol por sesión |
| `pm-3-3-gen.js` | 36 KB | Generador deck PPTX (hardcoded · pendiente refactor) |
| `pm-3-3-spec-gen.js` | 37 KB | Generador `pm-3-3-spec.json` (separado del PPTX) |
| `pm-3-5-gen.js` | 33 KB | Generador Final Mission JSON + DOCX |
| `pm-3-6-assemble.js` | 14 KB | Ensamblador GFPI-F-135 (combina inputs Fase 2+3) |
| `pm-3-6-gen.js` | 25 KB | Generador GFPI-F-135 DOCX |
| `pm-4-1-gen.js` | 23 KB | Generador instrumentos JSON + DOCX |
| `pm-4-2-gen.js` | 17 KB | Generador cuestionario JSON + DOCX |

**Total: ~458 KB de código JS Node · ya validado en producción DIESEL**

### MGV-2026-04-20 (más derivadores · validation extra)

```
- gen_3_docx.js                  ← generador DOCX para todos los pm-3-X
- gen_35_36_docx.js              ← generador DOCX específico pm-3-5 + pm-3-6
- gen_s2_s8.js                   ← generador específico Build-Out s2..s8
- gen_audit_docx.js              ← generador audit reports
- enrich_playbook_upstream.js    ← enriquecimiento playbook con upstream
- enrich_activity_footers.js     ← enriquecimiento activity_footers
- derive_activity_footer_from_playbook.js ← derivación bidireccional
- check-activity-card-schema.js  ← validador schema
- check-content-uniqueness.js    ← validador anti-copia (= CHECK 9)
- check-no-orphan-footer.js      ← validador footers
- check-generator-parity.js      ← validador paridad gen vs source
- pm-3-2-pm0-propagate.js        ← propagación pm0 (versión MGV)
- patch_apendices_inline.js + embed_apendices.js ← inlining de apéndices
- patch_presentacion_narrativa.js ← reformat presentación narrativa
- patch_v264_seccion4_y_e2.js    ← fix sección 4 + E2
```

**Decisión arquitectónica pendiente (§5):** ¿reusar estos scripts JS via `subprocess.run("node ...")` o reescribir en Python como hicimos en Fase 2?

---

## §4. Diferencias estructurales Fase 2 → Fase 3 (8 puntos críticos)

| Dimensión | Fase 2 (validada hoy) | Fase 3 (qué cambia) |
|---|---|---|
| **Output type** | JSON estructurado (Activity Card schemas) | JSON intermedio + **documentos finales** (docx · pptx · pdf) |
| **Granularidad** | 9 Activity Cards × 1 RAP en 1 sesión cada uno | 1 Playbook + 8 Build-Outs + 1 Workbook + 1 Final Mission + 1 GFPI-F-135 + 1 Deck + 6 Instrumentos + 1 Quiz S6 = 19+ artefactos por guía |
| **Generador del documento final** | (no aplica · Fase 2 emite JSON terminal) | **node scripts** (DIESEL) o **Python con docx/pptx skills** (alternativa) — DECISIÓN PENDIENTE |
| **Dependencies** | Linear (PM-2.X → PM-2.Y) | **Mesh con bidirectional enrichment** (PM-3.6 = espejo de Fase 2 + PM-4 · activity_footer fluye Fase 2 ↔ PM-3.2) |
| **Validación** | 16 checks schema-bound (PM-2.11) | ¿Qué CHECKs? Pedagogical fidelity? Format compliance SENA? · DECISIÓN PENDIENTE |
| **Reusabilidad bundler** | `task_tool_bundler.py` confirmado escalable Camino 2 | ¿Funciona igual? Master prompts Fase 3 son MÁS narrativos · template-driven · slim-context puede no aplicar igual |
| **Camino 1 vs 2 mix** | 4 mecánicos + 9 creativos | Más complejo: PM-3.1 (Camino 1?) · PM-3.2 ×8 (Camino 2 obligatorio) · PM-3.6 (Camino 1 ensamblador) · PM-3.3 (híbrido) · etc. · DECISIÓN POR PM |
| **Gates Humanos** | Gate 1 (arquetipos) + Gate 2 (enriched=true) | Gate 3 (Playbook approval · canon DM §7 obligatorio) + Gate 4 (derivados estudiantes) · DM v2.12 §7 explícito |

---

## §5. Decisiones arquitectónicas pendientes para PLAN-FASE-3 v1.0

Estas son las preguntas que el plan v1.0 debe responder · cada una con opción default sugerida (NO decisión tomada):

### §5.1 — Skill separada o submódulo
- **Pregunta:** ¿`fpi-sena-fase3` skill nueva o submódulo de `fpi-sena-fase2`?
- **Default sugerido:** **Skill separada** (canon DM § + PLAN-FASE-2 §11 línea 572 ya zanjada · "mi sugerencia: separada")
- **Justificación:** Phase 3 outputs son producción de documentos (docx/pptx) · skills separadas mantienen scope claro

### §5.2 — Reusar scripts node o reescribir Python
- **Pregunta:** ¿Subprocess `node script.js` o port a Python?
- **Default sugerido:** **Híbrido pragmático** · usar scripts node existentes via subprocess (cubren ~458KB ya validado en DIESEL) · escribir wrappers Python que orquesten + validen
- **Trade-off:** node tiene mejor fidelidad inmediata (DIESEL outputs son docx ya) · Python tiene mejor integración con resto de skill · alternativa: pdf/docx/pptx skills de Anthropic ya disponibles

### §5.3 — Camino 1 vs Camino 2 por PM
- **PM-3.1 (Outline):** Camino 1 mecánico (estructura tabular fija · derivar de pm-2-11.json + pm-2-0.json)
- **PM-3.2 (Build-Out 8 docs):** Camino 2 obligatorio (narrativa pedagógica de aula · Teacher Talk creativo)
- **PM-3.3 (Canva Deck):** Híbrido · estructura Camino 1 (`pm-3-3-spec.json`) + contenido Camino 2 (slides creativas) + script PPTX gen
- **PM-3.4 (Workbook):** Camino 2 (capítulos creativos REINFORCE/EXTEND/PREPARE)
- **PM-3.5 (Final Mission):** Camino 2 (narrativa ABP 5 sub-fases)
- **PM-3.6 (GFPI-F-135):** Camino 1 ensamblador (formato oficial SENA fijo · espejo de Fase 2+PM-4)

### §5.4 — Output formats finales
- **Pregunta:** ¿JSON intermedio + render docx/pptx/pdf separadamente, o JSON terminal + render externo?
- **Default sugerido:** **JSON intermedio + docx/pptx final** (siguiendo canon DIESEL/MGV · cada PM emite su JSON + renderiza su docx)

### §5.5 — Manejo de identidad visual del programa
- **Pregunta:** Logos · paletas · tipografías · viene de PM-0 o se especifica en PM-3.3?
- **Default sugerido:** **PM-3.3 spec lo declara** · pm-0-context.json puede incluir hints opcionales (color sectorial · logo path)

### §5.6 — Política de revisión instructor del Playbook
- **Pregunta:** Cómo se versiona el Playbook si instructor lo edita post-aprobación?
- **Default sugerido:** **Append-only versioning** · pm-3-1.json + pm-3-1.json.v2 + pm-3-1.json.v3 · cada versión carries delta + author + timestamp

### §5.7 — Gate 3 (Playbook approval) · mecánica
- **Pregunta:** Cómo el instructor aprueba el Playbook? Toda la cadena S1-S8 a la vez o por sesión?
- **Default sugerido:** **Por sesión + lote final** · cada PM-3.2-sX se aprueba individualmente al ser revisado · luego un sign-off final del Playbook completo

### §5.8 — Validación pedagogical fidelity Fase 3
- **Pregunta:** ¿Qué CHECKs adicionales en Fase 3? (Fase 2 = 16 checks)
- **Default sugerido:** Min 5 checks: (1) Playbook timing suma 60h · (2) cada Build-Out tiene Teacher Talk bilingüe · (3) Workbook chapters count match sessions · (4) Final Mission integra E1-E5 · (5) GFPI-F-135 schema v2.6.5 conforme

### §5.9 — Anti-copia-fantasma cross-program (Fase 3 nivel)
- **Pregunta:** CHECK 9 en Fase 3 · ¿byte-comparison con runs anteriores también?
- **Default sugerido:** **Sí · más estricto** · documentos docx tienen más oportunidades de filtrar texto · validación de hashes + heurísticas (no copiar narrativa MGV en run DIESEL · no copiar timing template DIESEL en MGV)

### §5.10 — Bidirectional enrichment (activity_footer)
- **Pregunta:** Cómo manejar activity_footer que fluye Fase 2 ↔ PM-3.2 (canon MGV)?
- **Default sugerido:** **Pre-enrichment automático** · al arrancar Fase 3, propagar activity_footer de pm-3-2-sX al pm-2-X correspondiente · marcar pm-2-X.activity_footer_propagated_at

### §5.11 — Bilingüismo en docx
- **Pregunta:** Columnas paralelas? Cursive support? Footnotes?
- **Default sugerido:** **Cursive support** (canon Fase 2 ya validado · Spanish en cursiva debajo del English primary)

---

## §6. Conclusión · qué cubre PRE-FLIGHT vs qué cubre PLAN v1.0

### PRE-FLIGHT cubre (este documento)

✓ Inventario master prompts Fase 3 con versiones reales
✓ Inventario outputs reales en runs DIESEL/MGV (qué existe ya · con bytes)
✓ Inventario scripts node generadores (qué función cumple cada uno)
✓ 8 diferencias estructurales Fase 2 → Fase 3
✓ 11 decisiones arquitectónicas pendientes (con default sugerido · NO tomadas)

### PLAN-FASE-3-ARQUITECTURA.md v1.0 cubrirá (sesión fresca · 2-3h dedicadas)

- Decisiones arquitectónicas TOMADAS (no defaults · decisiones del instructor con justificación)
- Hitos secuenciados (similar a Fase 2 §7 plan de trabajo · 4 hitos · ~6-8 semanas)
- Gates humanos detallados · cuándo · cómo · con qué UI
- Schema canónico de cada subagente (input/output contracts)
- Tasks estructuradas por hito
- Anti-patrones a documentar pre-emptivamente

### Insight clave para el plan v1.0

A diferencia de Fase 2, **Fase 3 no se construye desde cero** · se construye desde el canon DIESEL/MGV ya cristalizado. La pregunta principal NO es "qué arquetipos hay?" sino "**cómo encapsulamos el canon existente en subagentes reusables?**".

El timeline realista es **MÁS CORTO** que Fase 2 (~3-4 semanas vs ~6-8) si se reusa scripts node existentes. **MÁS LARGO** (~8-10 semanas) si se reescribe todo en Python.

---

*PRE-FLIGHT FASE 3 · escrito 2026-04-29 · post cierre Hito 3 Fase 2 + cierre PM-2.11 14/16 PASS + F2.5 Tool Specs*
*Próximo paso: Hito 4 Fase 2 cerrado → sesión fresca dedicada para PLAN-FASE-3-ARQUITECTURA.md v1.0*
