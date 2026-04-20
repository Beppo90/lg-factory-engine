# FPI SENA Factory — Fábrica Curricular de Bilingüismo
**Versión:** 2.1 — Abril 2026  
**Programa activo:** Mantenimiento de Motores Diesel — G1: The Workshop Specialist  
**CEFR:** A1.1 → A1.2

---

## Qué es este sistema

El **LG Factory Engine v2.0** es un pipeline de 22 Prompt Modules (PMs) + 52 arquetipos de actividad que genera guías de aprendizaje de inglés técnico (ESP) para programas técnicos y tecnológicos del SENA. Produce materiales bilingües alineados al CEFR, al formato GFPI-F-135 y a los principios pedagógicos de la capa fundacional PM-0.

---

## Estructura del proyecto

```
fpi-sena-factory/
├── prompts/                     # ◀ FUENTE ÚNICA DE VERDAD — todos los templates operativos
│   ├── pm-0.md                  #   PM-0 v2.0 (SUCCESS+M) — se inyecta en todos los PM-2.x
│   ├── pm-2-1.md … pm-2-10.md  #   Activity card templates (con PM-0 context inyectado)
│   └── pm-3-x.md, pm-4-x.md   #   Templates de output y evaluación
├── master-prompts/              # 22 PMs + arquetipos (documentos de referencia, NO editar para runs)
│   ├── PM-0 — CEFR Framework & Pedagogical Foundation.md  ← LEER PRIMERO
│   └── …
├── lg-factory-engine/
│   ├── prompts → ../prompts     # ⚠️ SYMLINK — apunta a prompts/ de arriba. NO es una copia.
│   └── engine/pm_runner.py      #   Lee prompts/ via el symlink — transparente
├── runs/
│   ├── DIESEL-2026-04-19/       # Run activo (G1 Workshop Specialist — Opus 4.6)
│   └── DIESEL-2026-04-15/       # Run base (referencia)
├── knowledge-bases/             # Teoría ELT/ESP/TBLT + currículo SENA
├── reference-docs/              # Formularios GFPI-F-134, GFPI-F-135
└── DIAGRAMA-MASTER-PROMPTS.html
```

> ⚠️ **Regla de arquitectura (2026-04-19):** editar templates SIEMPRE en `prompts/`. Nunca en `lg-factory-engine/prompts/` — es un symlink, cualquier edición directa puede romperlo. El engine recoge los cambios automáticamente.

**Scripts del pipeline (raíz de sesión):**

| Script | Propósito |
|--------|-----------|
| `pm-0-gen.js` | Genera `pm-0-cefr-foundation.docx` |
| `pm-3-1-gen.js` | Genera Playbook Outline DOCX |
| `pm-3-1-amb-patch.js` | Parche: ambientes y materiales |
| `pm-3-1-estrategias-patch.js` | Parche: estrategias didácticas |
| `pm-3-1-voc-patch.js` | Parche: V+O+C dimensions |
| `pm-3-2-build-out-gen.js` | Genera Build-Out Completo (8 sesiones) |
| `pm-3-2-estrategias-patch.js` | Parche: estrategias → JSONs de sesión |
| `pm-3-2-pm0-patch.js` | **Parche PM-0:** inyecta `pm0_protocol` en los 8 JSONs |
| `pm-3-3-gen.js` | Genera Canva Deck PPTX |
| `pm-3-3-spec-gen.js` | Genera especificación del deck |
| `pm-3-5-gen.js` | Genera Final Mission DOCX |
| `pm-3-6-gen.js` / `pm-3-6-assemble.js` | Genera Learning Guide GFPI-F-135 |
| `pm-4-1-gen.js` | Genera Instrumentos de Evaluación Formativa |
| `pm-4-2-gen.js` | Genera Cuestionario Técnico (Evidence 6) |

---

## Capa Fundacional: PM-0

**PM-0** es el documento raíz. Todo PM de fase 2, 3 y 4 debe ser trazable a un descriptor CEFR o principio pedagógico de PM-0.

| Sección PM-0 | Principio |
|-------------|-----------|
| §5.5 | Memorización SUCCESS (Sounds, Use, Conceptualize×2, Encounter, Self-expression) |
| §5.6 | Silabus gramatical: 17 grupos, 57+ estructuras (Intro / Consolida / Aplica) |
| §5.11 | Feedback diferenciado: accuracy vs. fluency |
| §5.12 | Gestión del L1 — English Zone + reducción progresiva |
| §5.13 | Noticing de stress (finger drilling, backchaining, clapping, board marking) |
| §9.1 | Tabla de % L1 por sesión: S1 ≤30% → S8 ≤5% |
| §9.2 | Activación de grupos gramaticales por sesión |
| §9.3 | Esquema JSON canónico del campo `pm0_protocol` |

### El campo `pm0_protocol`

Desde v2.1, cada `pm-3-2-sX.json` incluye `pm0_protocol` con 5 subsecciones:

```
pm0_protocol
├── grammar_groups        — grupos del silabus activos (Intro/Consolida/Aplica)
├── feedback              — mode + accuracy_techniques + fluency_techniques
├── l1_management         — l1_percentage + english_zone + l1_allowed_for
├── stress_pronunciation  — focus_words + techniques + board_marking
└── success_vocabulary    — target_words + factors_applied (SUCCESS)
```

El script `pm-3-2-pm0-patch.js` lo inyecta. El generador `pm-3-2-build-out-gen.js` lo renderiza como sección **"PM-0 — Protocolo Pedagógico"** en el Build-Out DOCX.

---

## Sistema de 4 Fases

| Fase | PMs | Propósito |
|------|-----|-----------|
| **FASE 1 — ANÁLISIS** | PM-1.1, PM-1.2 | Macro-temas → Scope & Sequence → Activity Cards |
| **FASE 2 — PLANEACIÓN** | PM-2.1 a PM-2.11 | 8 sesiones × 52 arquetipos |
| **FASE 3 — EJECUCIÓN** | PM-3.1 a PM-3.6 | Playbook + Canva + Workbook + LG GFPI-F-135 |
| **FASE 4 — EVALUACIÓN** | PM-4.1, PM-4.2 | Instrumentos formativos + Cuestionario técnico |

Fases 2 y 4 se ejecutan **por guía**. Fase 3 se ejecuta al cierre de cada guía.

---

## Estado actual — DIESEL G1: The Workshop Specialist

### Completado ✅

- **PM-0** v1.1 — CEFR Foundation + Life 2nd Ed + silabus 17 grupos + §5.11-5.13 + §9 técnica
- **PM-1x** — Plantilla de configuración de programa (program-agnostic)
- **PM-1.1 / PM-1.2** — Ruta macrotemática y Scope & Sequence para G1
- **PM-2.1 a PM-2.11** — 52 arquetipos para G1
- **PM-3.1** — Playbook Outline con estrategias, ambientes, V+O+C
- **PM-3.2** — Build-Out Completo 8 sesiones + **`pm0_protocol` integrado**
- **PM-3.3** — Canva Deck (pptx)
- **PM-3.4** — Workbook del aprendiz
- **PM-3.5** — Final Mission
- **PM-3.6** — Learning Guide GFPI-F-135 ensamblado
- **PM-4.1** — Instrumentos de Evaluación Formativa
- **PM-4.2** — Cuestionario Técnico (Evidence 6)

### Pendiente ⏳

- Refactorizar scripts con bloque `CFG` configurable (actualmente hardcodeados a `DIESEL-2026-04-15`)
- `pm-3-3-gen.js`: convertir a data-driven (leer desde `pm-3-3-spec.json` — ver PM-3.3 §11.5)
- G2: The Safety Auditor (A1.2 — siguiente guía del programa Diesel)

---

## Campos canónicos de pm-3-1.json (v2.1+)

Todo run completo de DIESEL G1 requiere que `pm-3-1.json` contenga:

| Campo | Generado por | Documenta |
|-------|-------------|-----------|
| `sessions_detail[n].logistics_box.ambiente` | `pm-3-1-amb-patch.js` | Espacio físico y configuración por sesión |
| `sessions_detail[n].logistics_box.estrategia` | `pm-3-1-estrategias-patch.js` | Estrategia didáctica dominante |
| `sessions_detail[n].logistics_box.momento_sena` | `pm-3-1-estrategias-patch.js` | Momento del ciclo SENA (3.1→3.4) |
| `sessions_detail[n].logistics_box.justificacion` | `pm-3-1-estrategias-patch.js` | Por qué esta estrategia en esta sesión |
| `sessions_detail[n].logistics_box.tecnicas` | `pm-3-1-estrategias-patch.js` | Técnica didáctica por bloque A/B/C/D/E |
| `voc_dimensions_table[]` | `pm-3-1-voc-patch.js` | V+O+C (Cognitiva/Procedimental/Actitudinal) por sesión |
| `ambientes_resumen` | `pm-3-1-amb-patch.js` | Patrón general de ambientes + recursos fijos |
| `estrategias_resumen` | `pm-3-1-estrategias-patch.js` | Ciclo SENA completo + estrategia dominante |

Y que cada `pm-3-2-sX.json` contenga:

| Campo | Generado por | Documenta |
|-------|-------------|-----------|
| `pm0_protocol` | `pm-3-2-pm0-patch.js` | Feedback, L1%, stress, SUCCESS, grammar por sesión |
| `momento_sena` | `pm-3-2-estrategias-patch.js` | Momento SENA propagado desde pm-3-1.json |
| `estrategia_didactica` | `pm-3-2-estrategias-patch.js` | Estrategia propagada |
| `justificacion_didactica` | `pm-3-2-estrategias-patch.js` | Justificación propagada |
| `while_X.tecnica_didactica` | `pm-3-2-estrategias-patch.js` | Técnica por bloque de cada sesión |

---

## Reglas de arquitectura

1. **PM-0 primero** — cualquier sesión que no pueda trazarse a PM-0 §5 debe revisarse antes de producción.
2. **Playbook-first** — PM-3.1 y PM-3.2 son obligatorios antes de producir materiales de aprendiz.
3. **`pm0_protocol` obligatorio** — todo `pm-3-2-sX.json` debe tener el campo antes de generar el DOCX.
4. **Campos extendidos** — todo `pm-3-1.json` debe tener ambiente, estrategia y V+O+C (ver tabla arriba).
5. **Scripts con CONFIG** — al adaptar a un nuevo programa, cambiar solo el bloque `CFG` al inicio del script.
6. **Vault sync** — después de cualquier cambio en master-prompts/, sincronizar al vault.
