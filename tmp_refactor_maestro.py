import os

FILE_PATH = "/Users/Beppo/Projects/fpi-sena-factory/master-prompts/DOCUMENTO MAESTRO — Sistema Completo de Prompts FPI SENA Bilingüismo.md"

with open(FILE_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
"""         FASE 1: ANÁLISIS (PM-1.x)
        ↗         2 prompts          ↘
FASE 4: EVALUACIÓN                   FASE 2: PLANEACIÓN
  2 prompts                            10 prompts (47 arquetipos)
        ↖                            ↙
         FASE 3: EJECUCIÓN (PM-3.x)
               6 prompts (5 arquetipos en PM-3.5)""",
"""FASE 1: ANÁLISIS (Macroarquitectura) → 2 prompts
       ↓
FASE 2: PLANEACIÓN (Diseño de Unidad) → 10 prompts por unidad
       ↓
FASE 4: EVALUACIÓN (Instrumentos) → 2 prompts dictados al final de la unidad
       ↓
FASE 3: EJECUCIÓN (Ensamblaje Global) → 6 prompts transversales para el programa"""
    ),
    (
"""| **Nivel CEFR** | A1.1 — A1.2 | Sí (ajustable a A2 en excepciones) |
| **Duración por guía** | 24 horas | Estándar fijo |
| **Programas técnicos (≈180h)** | 6 guías (6 macrotemáticas × 1 guía) | 144h directa + 36h autónoma |
| **Programas tecnológicos (≈350h)** | 12 guías (6 macrotemáticas × 2 guías) | 288h directa + 62h autónoma |""",
"""| **Nivel CEFR** | A1.1 — A2.2 | Progresivo según extensión del programa |
| **Duración por guía** | 24 horas | Estándar fijo |
| **Programas técnicos (≈180h)** | 5 guías (5 macrotemáticas puras) | 120h directa + 30h autónoma |
| **Programas tecnológicos (≈350h)** | 10 guías (10 macrotemáticas puras) | 240h directa + 60h autónoma |"""
    ),
    (
"""| **PM-1.1** | Ruta Macrotemática (6 Bloques) | Temas técnicos del PDF de Sofía Plus | 6 bloques con nombre ESP/industrial, justificación y nivel |""",
"""| **PM-1.1** | Ruta Macrotemática (5 o 10 Bloques) | Temas técnicos del PDF de Sofía Plus | 5 o 10 bloques con nombre ESP/industrial, justificación y nivel |"""
    ),
    (
"""| PM | Nombre | Fase Guía SENA | Arquetipos |
|---|---|---|---|
| **PM-2.1** | The Spark & Problematic Situation | Reflexión Inicial | 5: Crisis / Debate / News / Personal / Competition |
| **PM-2.2** | The Gap Analysis & Prior Knowledge | Contextualización | 5: Visual / Scenario / Scale / Prediction / Group Map |""",
"""| PM | Nombre | Subfase GFPI-F-135 | Arquetipos |
|---|---|---|---|
| **PM-2.1** | The Spark & Problematic Situation | 3.1 Reflexión Inicial | 5: Crisis / Debate / News / Personal / Competition |
| **PM-2.2** | The Gap Analysis & Prior Knowledge | 3.2 Contextualización | 5: Visual / Scenario / Scale / Prediction / Group Map |"""
    ),
    (
"""PM-3.5 (FINAL MISSION)
   │ Integra TODO lo de Fase 3
   │ Produce: Desempeño (oral) + Producto (artefacto)
   ▼
PM-4.1 (EVALUACIÓN)
   │ Evalúa desempeño + producto con instrumentos alineados
   ▼
→ REGRESA A PM-1.1 ←""",
"""(CIERRE DE UNIDAD FASE 2)
   │ Al terminar PM-2.1 a PM-2.10
   ▼
PM-4.1 (EVALUACIÓN FORMATIVA)
   │ Evalúa desempeño + proceso
   ▼
PM-4.2 (CUESTIONARIO TÉCNICO)
   │ Evalúa conocimiento
   ▼
→ REGRESA A PM-1.1 (FEEDBACK LOOP) ← O AVANZA A FASE 3 (GLOBAL)"""
    ),
    (
"""PASO 2: Extraer temas técnicos, competencias y RAPs
PASO 3: Ejecutar PM-1.1 → Obtener 6 macrotemáticas
PASO 4: Ejecutar PM-1.2 → Desarrollar scope & sequence por bloque + curar 3 fuentes auténticas → instructor elige 2 stories

══════════════════════════════════════════════════════════
FASE 2 — PLANEACIÓN (por cada guía de 24h)
══════════════════════════════════════════════════════════

PASO 5:  PM-2.1 → The Spark (elegir arquetipo de 5 opciones)
PASO 6:  PM-2.2 → Gap Analysis (elegir arquetipo de 5 opciones)
PASO 7:  PM-2.3 → Reading (elegir arquetipo de 6 opciones)
PASO 8:  PM-2.4 → Writing (elegir arquetipo de 5 opciones)
PASO 9:  PM-2.5 → Literacy & Vocabulary (elegir arquetipo de 5 opciones)
PASO 10: PM-2.6 → Listening (elegir arquetipo de 6 opciones)
PASO 11: PM-2.7 → Pronunciation (elegir arquetipo de 5 opciones)
PASO 12: PM-2.8 → Speaking (elegir arquetipo de 5 opciones)
PASO 13: PM-2.9 → Language Functions (elegir arquetipo de 5 opciones)
PASO 14: PM-2.10 → Grammar & Structure Use (elegir arquetipo de 5 opciones)

══════════════════════════════════════════════════════════
FASE 3 — EJECUCIÓN
══════════════════════════════════════════════════════════

PASO 15: PM-3.1 → Playbook Outline (Session Map)
PASO 16: PM-3.2 → Playbook Build-Out (1 por sesión)
PASO 17: PM-3.3 → Canva Presentation (20 slides)
PASO 18: PM-3.4 → Workbook Autónomo (1 capítulo por sesión)
PASO 19: PM-3.5 → Final Mission (elegir arquetipo de 5 opciones)

══════════════════════════════════════════════════════════
FASE 4 — EVALUACIÓN
══════════════════════════════════════════════════════════

PASO 20: PM-4.1 → Evaluación (Checklist desempeño + Rúbrica producto + Feedback Loop)
PASO 21: PM-4.2 → Cuestionario Técnico (IE-01, 50 pts)
         → Retroalimenta PASO 3 del siguiente ciclo

══════════════════════════════════════════════════════════
                    → REGRESA A FASE 1 ←""",
"""PASO 2: Extraer temas técnicos, competencias y RAPs
PASO 3: Ejecutar PM-1.1 → Obtener 5 o 10 macrotemáticas
PASO 4: Ejecutar PM-1.2 → Desarrollar scope & sequence por bloque + curar 3 fuentes auténticas → instructor elige 2 stories

══════════════════════════════════════════════════════════
FASE 2 — PLANEACIÓN (por cada guía de 24h)
══════════════════════════════════════════════════════════

PASO 5:  PM-2.1 → The Spark (elegir arquetipo de 5 opciones)
PASO 6:  PM-2.2 → Gap Analysis (elegir arquetipo de 5 opciones)
PASO 7:  PM-2.3 → Reading (elegir arquetipo de 6 opciones)
PASO 8:  PM-2.4 → Writing (elegir arquetipo de 5 opciones)
PASO 9:  PM-2.5 → Literacy & Vocabulary (elegir arquetipo de 5 opciones)
PASO 10: PM-2.6 → Listening (elegir arquetipo de 6 opciones)
PASO 11: PM-2.7 → Pronunciation (elegir arquetipo de 5 opciones)
PASO 12: PM-2.8 → Speaking (elegir arquetipo de 5 opciones)
PASO 13: PM-2.9 → Language Functions (elegir arquetipo de 5 opciones)
PASO 14: PM-2.10 → Grammar & Structure Use (elegir arquetipo de 5 opciones)

══════════════════════════════════════════════════════════
FASE 4 — EVALUACIÓN (por unidad)
══════════════════════════════════════════════════════════

PASO 14.1: PM-4.1 → Evaluación Formativa (Checklist desempeño + Feedback Loop)
PASO 14.2: PM-4.2 → Cuestionario Técnico (IE-01, 50 pts)
           → Retroalimenta PASO 2 del siguiente ciclo

══════════════════════════════════════════════════════════
FASE 3 — EJECUCIÓN (Global para el programa)
══════════════════════════════════════════════════════════

PASO 15: PM-3.1 → Playbook Outline (Session Map)
PASO 16: PM-3.2 → Playbook Build-Out (1 por sesión)
PASO 17: PM-3.3 → Canva Presentation (20 slides)
PASO 18: PM-3.4 → Workbook Autónomo (1 capítulo por sesión)
PASO 19: PM-3.5 → Final Mission (Misión integradora final)
PASO 20: PM-3.6 → GFPI-F-135 Integrator (Ensamblaje final de la guía oficial SENA)

══════════════════════════════════════════════════════════
                    → REGRESA A FASE 1 ←"""
    ),
    (
"""| **4 Fases de la Guía** | PM-2.1 (Reflexión) → PM-2.2 (Contextualización) → PM-2.3 a PM-2.10 (Apropiación/Transferencia) → PM-3.5 (Misión Final) |
| **Triada de Evidencias** | PM-4.1: Conocimiento (Quiz) + Desempeño (Checklist) + Producto (Rúbrica) |""",
"""| **4 Fases de la Guía** | 3.1 Reflexión (PM-2.1) → 3.2 Contextualización (PM-2.2) → 3.3 Apropiación (PM-2.3 a PM-2.10) → 3.4 Transferencia (PM-3.5) |
| **Triada de Evidencias** | Fase 4 - PM-4.1 (Desempeño + Proceso) + PM-4.2 (Conocimiento TE-01) |"""
    )
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"Succeessfully replaced snippet.")
    else:
        print(f"WARNING: Snippet not found!")

with open(FILE_PATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("Master Document overhaul complete.")
