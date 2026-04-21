# CHANGELOG — MGV-2026-04-20
## Programa 522309 — Desarrollo de Medios Gráficos Visuales (Tecnológico · 6 guías)

**Run base:** MGV-2026-04-20
**Modelo principal:** claude-opus-4-6 + claude-sonnet-4-6 (generación DOCX)
**Enfoque:** Human-in-the-loop — validación módulo a módulo + canon evolutivo
**Regla de bloques:** 1:1 alignment (6 RAPs pre-numerados → 6 bloques)
**Progresión CEFR:** A1.1 → A1.2 → A1.3 → A2.0 → A2.1 → A2.1

---

## PIPELINE LOG — GUÍA 1 (A1.1 · The Visual Communicator)

| Módulo | Status | Output |
|--------|--------|--------|
| PM-0 Context | ✅ | `pm-0-context.json` |
| PM-1.1 Ruta | ✅ | `pm-1-1.json` (6 bloques 1:1) |
| PM-1.2 Scope | ✅ | `pm-1-2.json` (3 fuentes verificadas) |
| PM-2.0 Session Blueprint | ✅ | `pm-2-0.json` (8 sesiones · 60h) |
| PM-2.1–PM-2.11 | ✅ | 10 Activity Cards schema v2.0 |
| PM-3.1 Playbook Outline | ✅ | `pm-3-1.json` + `pm-3-1-FINAL-G1.docx` |
| PM-3.2 Build-Outs S1–S8 | ✅ | `pm-3-2-s1..s8.json` + `pm-3-2-FINAL-G1.docx` |
| PM-3.5 Misión Final | ✅ | `pm-3-5.json` + `pm-3-5-FINAL-G1.docx` |
| PM-3.6 GFPI-F-135 | ✅ | `pm-3-6.json` + `pm-3-6-FINAL-G1.docx` |
| PM-4.1 Instrumentos | ✅ | `pm-4-1.json` + `pm-4-1-review.docx` |
| PM-4.2 Cuestionario E6 | ✅ | `pm-4-2.json` + `pm-4-2-review.docx` |
| PM-3.3 Canva Spec | ⚠️ PENDIENTE | — |
| PM-3.4 Workbook | ⚠️ PENDIENTE | — |

---

## CANON EVOLUTIVO EN ESTE RUN

| Versión | Fecha | Cambio |
|---------|-------|--------|
| v2.6.3 | 2026-04-20 | Activity card v2.6.3 — scaffolds por tipo + 30 actividades PM-3.6 |
| v2.6.4 | 2026-04-21 | Sección 4 PM-3.6 formato SENA (6-col × N filas) · E2 drift fix |
| v2.6.5 | 2026-04-21 | **Shared Renderer Pattern** — `scripts/lib/render_seccion4_evidencias.js` fuente única de verdad · parity validator |
| v2.6.6 | 2026-04-21 | **Paleta SENA institucional** — verde `#39A900` protagonista + azul oscuro `#0B2E45` · CEFR gradient remap verde→azul |
| v2.6.6-cleanup | 2026-04-21 | **Cleanup conservador + fix duplicación raíz** — eliminados 18 archivos legacy (.bak + PREVIEW) · `pm-3-5-FINAL-G1.docx` ahora es output directo de `gen_35_36_docx.js` (eliminada la copia manual `cp pm-3-5-review → pm-3-5-FINAL-G1`) · v264 y PASO-1 movidos a `drafts/` · tamaño run 3.7 MB → 2.6 MB |

---

## ARTEFACTOS FINAL-G1 (v2.6.6 · paleta SENA)

| Archivo | Tamaño | MD5 |
|---------|--------|-----|
| `pm-3-1-FINAL-G1.docx` | 35,613 B | `14b0f66729838d3a0cdb7e554a0830c8` |
| `pm-3-2-FINAL-G1.docx` | 70,608 B | `62a1ce992c5f228446dbdfaf0f4268b8` |
| `pm-3-5-FINAL-G1.docx` | 26,602 B | `2960d89a03c71234165094e95d9986e7` (regen v2.6.6 post-dedup) |
| `pm-3-6-FINAL-G1.docx` | 91,336 B | `73eaa70ad20345481449d453b4641426` |

**Ubicación primaria:** `runs/MGV-2026-04-20/`
**Ubicación espejo (estable):** `~/Documents/ObsidianVault/proyectos/lg-factory-engine/fpi-cd-engine/entregables-MGV-G1-v266/`

**Backup de scripts pre-paleta:** `scripts/backup-pre-sena-palette-20260421-052405/`

---

## DECISIONES GLOBALES

| Fecha | Decisión | Impacto |
|-------|----------|---------|
| 2026-04-20 | Regla 1:1 RAP↔bloque (6=6) — DM v2.5.1 §10 PASO 1 | PM-1.1 del run + futuros runs con RAPs pre-numerados |
| 2026-04-21 | Shared Renderer Pattern (REGLA 20) | Ningún generador puede tener implementación propia de Sección 4; variantes vía parámetro, no copia |
| 2026-04-21 | Paleta SENA canónica (`#39A900` verde + `#0B2E45` azul + `#007832` verde oscuro) | Todos los runs futuros heredan esta paleta; nombres legacy `NAVY/ORANGE` preservados (remap de valor) |

---

## INCIDENTE ABIERTO — Desaparición de DOCX en carpeta primaria

**Síntoma:** Los 4 `pm-3-*-FINAL-G1.docx` se borran solos de `runs/MGV-2026-04-20/` después de generarse. Patrón específico por nombre — algunos `*-review.docx` persisten.
**Mitigación aplicada:** Copia espejo en `ObsidianVault/proyectos/lg-factory-engine/fpi-cd-engine/entregables-MGV-G1-v266/` (MD5 idéntico, persiste estable).
**Causa sospechada:** Sync agent (iCloud Drive / Dropbox) o lock de Finder. No confirmado.
**Estado:** No diagnosticado. Próxima sesión decide: diagnosticar o adoptar carpeta espejo como canónica.

---

## PRÓXIMA SESIÓN

> **Instrucción para el LLM:** Lee SOLO esta sección para arrancar. No re-leas el CHANGELOG completo ni pidas contexto adicional. Empieza directamente con las tres instrucciones de arranque al final.

---

### Estado actual — cierre de sesión 2026-04-21 06:00

**Run:** MGV-2026-04-20 · Programa 522309 Desarrollo de Medios Gráficos Visuales · Tecnológico · 6 guías
**Guía activa:** **G1 — The Visual Communicator · CEFR A1.1** · ✅ PIPELINE COMPLETO
**Canon vigente:** **v2.6.6** (Shared Renderer Pattern + paleta SENA institucional)

#### Lo que está hecho

- Pipeline G1 completo: PM-0 → PM-4.2, todos los JSON validados, 4 DOCX FINAL generados con paleta SENA verde+azul
- Shared Renderer Pattern implementado: `scripts/lib/render_seccion4_evidencias.js` es fuente única de verdad; parity validator verde
- Paleta SENA institucional aplicada en `gen_audit_docx.js`, `gen_35_36_docx.js`, `gen_3_docx.js`, `render_seccion4_evidencias.js` — cero residuales de naranja/navy/cream
- Backup de scripts pre-paleta conservado en `scripts/backup-pre-sena-palette-20260421-052405/`
- Copia espejo de los 4 DOCX FINAL en `~/Documents/ObsidianVault/proyectos/lg-factory-engine/fpi-cd-engine/entregables-MGV-G1-v266/`
- DM actualizado a **v2.6.6** (footer + §11 entry completa) — paleta SENA canonizada como marca institucional permanente; sync al vault Obsidian ✅ MD5 match

#### Lo que está abierto

1. **G2 — The Brand Strategist (A1.2)** — siguiente guía. RAP 02: Interacción. Universo temático: Proyecto de diseño + brief + imagen corporativa. PM-0 v2.0 aplica. Canon SENA v2.6.6 aplica desde el inicio.
2. **PM-3.3 deck** — spec pendiente de generar. El usuario no ha confirmado formato (Canva vs PPTX).
3. **PM-3.4 Workbook del aprendiz** — ausente en este run. Decisión pendiente: generar, deprecar o copiar estructura de DIESEL-2026-04-19.
4. **DM footer v2.6.6** — documentar paleta SENA como canon institucional permanente.
5. **Incidente DOCX desaparecen** — diagnosticar el agente que borra archivos de `runs/MGV-2026-04-20/` **o** adoptar la carpeta espejo de Obsidian como canónica de entrega.

#### Variables que el usuario llena manualmente

- Código del Programa 522309 — ya presente en README.md
- Código Competencia 240202501 — ya presente
- Códigos RAPs individuales — los 6 pre-numerados ya fijados en pm-1-1.json
- Aparecen en: `pm-3-6.json` §1, `pm-2-11.json`, `pm-4-1.json`

---

### Pendiente — en orden de prioridad

| # | Tarea | Contexto |
|---|-------|---------|
| **P0** | **Decidir ubicación canónica de entregables G1** | El usuario ha visto los archivos desaparecer 3+ veces de `runs/MGV-2026-04-20/`. Opción A: diagnosticar con `fs_usage` / revisar si la carpeta está sincronizada por iCloud/Dropbox. Opción B: adoptar `~/Documents/ObsidianVault/proyectos/lg-factory-engine/fpi-cd-engine/entregables-MGV-G1-v266/` como carpeta canónica. **Preguntar antes de avanzar a cualquier otra tarea.** |
| **P1** | **G2 — Arrancar pipeline A1.2** | Correr PM-1.2 para RAP 02 (Interacción) desde `pm-1-1.json` bloque 2. Aplicar canon SENA v2.6.6 desde el primer DOCX. Seguir secuencia PM-1.2 → PM-2.0 → PM-2.1–2.11 → PM-3.1 → PM-3.2 → PM-3.5 → PM-3.6 → PM-4.1 → PM-4.2. |
| ~~P2~~ ✅ | ~~Actualizar DM footer v2.6.5 → v2.6.6~~ | **COMPLETADO 2026-04-21** — DM v2.6.6 con entry §11 + sync al vault. MD5 `7391bb23a7dd9e206d539924401965e5`. |
| **P3** | **PM-3.3 deck G1** | Confirmar con el usuario: Canva spec JSON o PPTX directo. Si PPTX, leer `pptx/SKILL.md` antes de generar. |
| **P4** | **PM-3.4 Workbook G1** | Confirmar con el usuario si se porta de DIESEL-2026-04-19 o se genera fresco. |
| **P5** | **Documentar CHECK de paleta en `check-generator-parity.js`** | Ampliar validador para incluir chromatic sanity check como regla formal (no solo post-generación manual). |

---

### Instrucciones de arranque — primeras 3 acciones de la próxima sesión

**1. Verificar los 4 FINAL-G1 en ambas ubicaciones**
```bash
ls -la /Users/Beppo/Projects/fpi-sena-factory/runs/MGV-2026-04-20/pm-3-*-FINAL-G1.docx
ls -la "/Users/Beppo/Documents/ObsidianVault/proyectos/lg-factory-engine/fpi-cd-engine/entregables-MGV-G1-v266/"
```
Si la carpeta primaria está vacía otra vez → Opción B (adoptar espejo como canon). Si está llena → preguntar al usuario si diagnostica o sigue con G2.

**2. Decidir con el usuario: G2 o cerrar loose ends de G1 primero**
Pregunta directa: *"G1 está completo y validado. Tres opciones: (a) arrancar G2 (A1.2) con canon SENA v2.6.6, (b) cerrar PM-3.3 deck + PM-3.4 Workbook de G1 antes de avanzar, (c) actualizar DM v2.6.6 + diagnosticar el incidente de archivos que desaparecen. ¿Cuál primero?"*

**3. Si la respuesta es G2, empezar con PM-1.2**
Leer:
- `pm-1-1.json` → `.bloques[1]` (RAP 02 · Interacción · A1.2)
- `prompts/pm-1-2.md` (single source of truth)
- `runs/DIESEL-2026-04-19/pm-1-2.json` como referencia de estructura
Generar `runs/MGV-2026-04-20/pm-1-2-g2.json`. **No** copiar contenido de G1; universo temático G2 = brief + imagen corporativa + gestión de proyectos de diseño.

---

> **Archivos clave para contexto rápido (leer en este orden si necesitas más contexto):**
> 1. `README.md` — mapa del run y los 6 RAPs
> 2. `pm-1-1.json` — universo temático de los 6 bloques
> 3. `scripts/lib/render_seccion4_evidencias.js` — Shared Renderer canon v2.6.5
> 4. `scripts/gen_audit_docx.js` líneas 27-39 + 497-503 — paleta SENA v2.6.6 + CEFR gradient
> 5. `pm-3-1.json` → `.sessions_detail[]` — estructura G1 (referencia para G2)

---

## COMPARACIÓN CON RUNS BASE

| vs | Diferencia clave |
|----|------------------|
| DIESEL-2026-04-19 | MGV usa regla 1:1 (6 RAPs = 6 bloques), DIESEL usa 5-bloques técnico · MGV introduce Shared Renderer + paleta SENA |
| DIESEL-2026-04-15 | MGV es el primer run con Shared Renderer Pattern canonizado · DIESEL-15 tiene Workbook pm-3-4, MGV no |

---

*CHANGELOG vivo — actualizar `## PRÓXIMA SESIÓN` al cerrar cada sesión, no solo como registro histórico.*
