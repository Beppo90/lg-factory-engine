# SISTEMA DE PROMPTS MAESTROS — FÁBRICA CURRICULAR FPI SENA
### Portafolio del Instructor — Sergio | Bilingüismo SENA
*Versión 2.0 · Soluciones implementadas · Marzo 2026*

---

## NUEVA NUMERACIÓN LIMPIA

La numeración sigue la lógica **FASE.SECUENCIA**, donde el primer dígito indica la fase del desarrollo curricular y el segundo la secuencia dentro de esa fase.

```
FASE 1 — ANÁLISIS (Del diseño curricular a la arquitectura macro)
├── PM-1.1  Ruta Macrotemática (6 Bloques)
└── PM-1.2  Scope & Sequence + Curación de Material Auténtico

FASE 2 — PLANEACIÓN (Diseño de la Guía de Aprendizaje)
│   3 CONJUNTOS (orden entre conjuntos alternable, interno fijo)
│
├── APERTURA (fijo)
│   ├── PM-2.1  The Spark (5 arquetipos: Crisis/Debate/News/Personal/Competition)
│   └── PM-2.2  Gap Analysis (5 arquetipos: Visual/Scenario/Scale/Prediction/Group Map)
│
├── CONJUNTO A — ESCRITURA (Reading → Writing → Literacy & Vocab)
│   ├── PM-2.3  Reading (6 arquetipos: TBLT/Strategies/Info Gap/Cooperative/Multimodal/HOTS)
│   ├── PM-2.4  Writing (5 arquetipos: Exploratory/Academic/Collaborative/AI-Mediated/Genre)
│   └── PM-2.5  Literacy & Vocabulary (5 arquetipos: Phonics/Vocabulary/Fluency/Scaffolding/Interactive)
│
├── CONJUNTO B — ORAL (Listening → Pronunciation → Speaking)
│   ├── PM-2.6  Listening (6 arquetipos: Micro-Skills/Phase-Based/TBLT/Bloom/Advanced/Multimedia)
│   ├── PM-2.7  Pronunciation (5 arquetipos: Phoneme/Prosody/Shadowing/Chunking/Minimal Pairs)
│   └── PM-2.8  Speaking (5 arquetipos: Gap Tasks/Role-Based/Multimedia/Rehearsal/Interaction)
│
└── CONJUNTO C — SISTEMAS DEL LENGUAJE (Functions → Grammar)
    ├── PM-2.9  Language Functions (5 arquetipos: Info Exchange/Persuasion/Social/Gamified/Academic)
    └── PM-2.10 Structure Use & Grammar (5 arquetipos: Discovery/Controlled/Communicative/Creative/Editing)

FASE 3 — EJECUCIÓN
├── PM-3.1  Playbook Outline (Session Map)
├── PM-3.2  Playbook Build-Out (Step-by-Step)
├── PM-3.3  Canva Deck (Visual Support)
├── PM-3.4  Workbook Autónomo (Practice Lab)
├── PM-3.5  Final Mission (Integrative Task) ← 5 arquetipos: desempeño oral + producto
└── PM-3.6  GFPI-F-135 Integrator ← ensambla documento institucional final

FASE 4 — EVALUACIÓN
├── PM-4.1  Sistema de Evaluación (Checklist + Rúbrica + Feedback Loop)
└── PM-4.2  Cuestionario Técnico (IE-01, 50 pts)

         ANÁLISIS (PM-1.x)
        ↗                ↘
EVALUACIÓN (PM-4.x)    PLANEACIÓN (PM-2.x)
        ↖                ↙
         EJECUCIÓN (PM-3.x)
```

**Total: 22 prompts + 52 arquetipos de actividad**

### Tabla de Equivalencias (Numeración Anterior → Nueva Estructura)

| Antes | Ahora | Nombre | Arquetipos |
|---|---|---|---|
| PM-0 | **PM-2.1** | The Spark | 5 |
| PM-0.5 | **PM-2.2** | Gap Analysis | 5 |
| PM-2.0 | **PM-2.3** | Reading | 6 |
| PM-2.1 | **PM-2.6** | Listening | 6 |
| PM-3 | **PM-2.5** | Literacy & Vocabulary | 5 |
| PM-4 | **PM-2.7** | Pronunciation | 5 |
| PM-5 | **PM-2.10** | Structure Use & Grammar | 5 |
| PM-6 | **PM-2.4** | Writing | 5 |
| *(nuevo)* | **PM-2.8** | Speaking | 5 |
| *(nuevo)* | **PM-2.9** | Language Functions | 5 |
| PM-Eval | **PM-4.1** | Evaluación + Feedback Loop | — |
| *(nuevo)* | **PM-4.2** | Cuestionario Técnico | — |
| *(nuevo)* | **PM-3.5** | Final Mission (Integrative Task) | 5 |

---

## PARÁMETROS ESTÁNDAR DEL SISTEMA

Estos parámetros aplican a **todos** los prompts del sistema y deben estar interiorizados como contexto permanente.

### 1. Nivel CEFR por Defecto

```
NIVEL ESTÁNDAR:  A1.1 — A1.2
VARIABLE:        Sí (el instructor puede ajustar a A2 en casos excepcionales)
REALIDAD:        El 98% de los aprendices SENA llegan en nivel A- a A1
```

### 2. Duración Estándar por Guía de Aprendizaje

```
ESTRUCTURA ESTÁNDAR:  1 GUÍA = 24 HORAS = 1 MACROTEMÁTICA

PROGRAMAS TÉCNICOS (≈180h):
├── 6 macrotemáticas × 1 guía cada una = 6 GUÍAS
├── Formación directa:  144 horas (6 × 24h)
└── Formación autónoma:  36 horas

PROGRAMAS TECNOLÓGICOS (≈350h):
├── 6 macrotemáticas × 2 guías cada una = 12 GUÍAS
├── Formación directa:  288 horas (12 × 24h)
└── Formación autónoma:  62 horas
```

### 3. Nivel Bloom y Dificultad Técnica

```
BLOOM:           Relativo — depende de la naturaleza de cada actividad,
                 los objetivos de aprendizaje y el outcome esperado.
                 Las actividades NO deben ser monótonas en su nivel cognitivo.

DIFICULTAD TÉCNICA: SIMPLE — Input comprensible dentro de entornos
                    ocupacionales con procesos y procedimientos técnicos
                    de comprensión simple.
```

### 4. Needs Analysis

```
SE OBVIA como paso separado.
RAZÓN: El contenido ya parte del entorno ocupacional del aprendiz,
       analizado y planeado para ser necesario y altamente motivacional.
       Las guías tienen objetivos medibles y entendimientos definidos.
       La Reflexión Inicial (PM-2.1) cumple esa función diagnóstica.
```

### 5. RAPs y Competencia — Regla de Inserción

```
REGLA: Cada prompt debe dejar el ESPACIO para que el instructor
       inserte manualmente la competencia y el RAP.
       Es OPCIONAL en la ejecución (el prompt funciona con o sin ellos),
       pero el espacio siempre debe existir.
NOTA:  La transcripción literal desde Sofía Plus es responsabilidad
       del instructor. El sistema no la parafrasea ni la genera.
```

### 6. Formatos GFPI

```
ESTADO: Pendiente de integración.
PLAN:   Primero se consolida el sistema automatizado completo.
        Luego se ingresa el formato de la guía de aprendizaje
        (GFPI-F-019 / F135) como capa de salida final.
```

---

## NUEVA SECCIÓN DEL PM-4.1: §5 — FEEDBACK LOOP (RETROALIMENTACIÓN AL CICLO)

*Esta sección se añade al final del PM-4.1 (Sistema de Evaluación), después de las 4 Reglas de Oro del Evaluador. Es la pieza que cierra la espiral y convierte el sistema en circular.*

---

Añadir al PM-4.1 la siguiente sección:

> #### 🔄 5. FEEDBACK LOOP — RETROALIMENTACIÓN AL CICLO (THE SPIRAL CLOSE)
>
> **Uso:** Este es el momento de reflexión del INSTRUCTOR (no del aprendiz). Después de aplicar los instrumentos de evaluación, el instructor analiza los resultados para alimentar el siguiente ciclo de Análisis (PM-1.1).
>
> **Output obligatorio:**
>
> **5A. Tres Preguntas de Reflexión Docente:**
>
> Genera tres preguntas de reflexión que obliguen al instructor a analizar sus propios resultados de evaluación:
> * Una pregunta sobre **efectividad del contenido:** ¿Los temas técnicos y el vocabulario ESP seleccionados fueron relevantes y suficientes para que los aprendices completaran las tareas?
> * Una pregunta sobre **calibración del nivel:** ¿El nivel de dificultad lingüístico (A1/A2) fue apropiado? ¿Hubo frustración excesiva o, al contrario, la tarea fue demasiado fácil?
> * Una pregunta sobre **transferencia real:** ¿Los aprendices demostraron capacidad de usar lo aprendido en un contexto que se acerque a su realidad laboral, o solo reprodujeron mecánicamente?
>
> **5B. Tabla de Retroalimentación al Ciclo:**
>
> Genera una tabla con el siguiente formato:
>
> | ¿Qué funcionó bien? | ¿Qué brecha persiste? | ¿Qué ajustar en el PM-1.1 del próximo ciclo? |
> |---|---|---|
> | *(Ej: El vocabulario de troubleshooting fue altamente motivacional y los aprendices lo retuvieron)* | *(Ej: La simulación oral reveló que los aprendices no lograron formular preguntas, solo responder)* | *(Ej: En el próximo ciclo, incluir "Question Formation" como función comunicativa prioritaria desde el PM-1.2)* |
> | | | |
> | | | |
>
> **5C. Declaración de Cierre Circular:**
>
> Incluye la siguiente nota al pie del instrumento:
>
> *"Los hallazgos de esta tabla alimentan directamente la Fase 1 — Análisis del siguiente ciclo formativo. El instructor debe revisar el PM-1.1 (Ruta Macrotemática) y el PM-1.2 (Scope & Sequence) a la luz de estos resultados antes de iniciar la planeación de la siguiente guía o del siguiente grupo."*

---

### 💡 Por qué el Feedback Loop cierra la espiral:

1. **Rompe la linealidad:** Sin esta sección, el sistema termina en "Evaluar" y el instructor archiva las notas. Con el Feedback Loop, los resultados de la evaluación se convierten en el nuevo **insumo de análisis** del próximo ciclo.

2. **Formaliza la mejora continua:** El SENA exige mejora continua (Actividad 21 del flujo operativo: "Realizar acciones de mejora curricular"). Esta tabla es exactamente eso: evidencia documentada de reflexión y ajuste.

3. **Conecta con el modelo circular:**

```
PM-1.1 (Análisis: Ruta Macrotemática)
        ↓
PM-1.2 → PM-2.1 → PM-2.2 → ... → PM-2.9
        ↓
PM-4.1 (Evaluación: Instrumentos)
        ↓
PM-4.1§5 (Feedback Loop)
        ↓
→ REGRESA A PM-1.1 con datos enriquecidos ←
```

---

## CADENA COMPLETA DEL SISTEMA (POST-SOLUCIONES)

```
FASE 1 — ANÁLISIS
PM-1.1 ──→ PM-1.2 (Scope & Sequence + Curación de Material Auténtico)
   │           │
   │           │ 3 fuentes reales curadas → instructor elige 2 stories
   │           │ Story A → Reading, Story B → Listening, Story C → Backup
   │           │ Vocabulario, grammar targets, universo narrativo extraídos
   │           ▼
   │         PARÁMETROS ESTÁNDAR
   │         ├── CEFR: A1.1-A1.2 (variable)
   │         ├── Guía: 24h estándar
   ▼         ├── Técnicas: 6 guías
FASE 2 — PLANEACIÓN   ├── Tecnológicas: 12 guías
   │                  └── Bloom: relativo/variado
APERTURA: PM-2.1 ──→ PM-2.2
   │
   ▼
CONJUNTO A (Escritura): PM-2.3 ──→ PM-2.4 ──→ PM-2.5
CONJUNTO B (Oral):      PM-2.6 ──→ PM-2.7 ──→ PM-2.8
CONJUNTO C (Sistemas):  PM-2.9 ──→ PM-2.10
   │
   ▼
FASE 3 — EJECUCIÓN
PM-3.1 ──→ PM-3.2 ──→ PM-3.3 ──→ PM-3.4 ──→ PM-3.5 (Final Mission) ──→ PM-3.6 (GFPI-F-135 Integrator)
   │
   ▼
FASE 4 — EVALUACIÓN
PM-4.1 (Checklist + Rúbrica evalúan PM-3.5) + PM-4.2 (Cuestionario Técnico, 50 pts)
   │
   ▼
→ REGRESA A PM-1.1 ←
```

**Total de prompts del sistema: 22 + 52 arquetipos**
- Fase 1: 2 prompts (PM-1.1 + PM-1.2 con curación de material auténtico)
- Fase 2: 10 prompts (PM-2.1 a PM-2.10) — 47 arquetipos
- Fase 3: 6 prompts (PM-3.1 a PM-3.6) — 5 arquetipos en PM-3.5
- Fase 4: 2 prompts (PM-4.1 + PM-4.2)

---

## ADAPTACIÓN: INGLÉS MARÍTIMO Y PORTUARIO

### Modificaciones al flujo estándar:

| Elemento | Estándar | Marítimo |
|----------|----------|----------|
| PM-1.1 | Genera 6 macrotemáticas | **OMITIDO** — 5 unidades ya definidas |
| PM-1.2 | Recibe input de PM-1.1 | Recibe unidad directamente (U1-U5) |
| Grammar targets | Variables por programa | Fijos por unidad (ver tabla abajo) |
| Fuentes auténticas | Tech industry | Shipping industry, IMO, port authorities |
| Universo narrativo | Variable | Caribbean Maritime Lines (CML), Cartagena |
| GFPI | Programa genérico | "Inglés Marítimo y Portuario" |
| PM-3.5 | Reemplaza Session 6 (Speaking) | Simulaciones marítimas (PSC, VTS, SMCP) |

### Grammar targets fijos por unidad:

| Unidad | Grammar | PM-2.10 constraint |
|--------|---------|---------------------|
| 1 — Ship Overview | Demonstratives, Verb To Be | Solo estructuras demostrativas y to be |
| 2 — The Crew | Present Simple, Imperative | Solo rutinas y órdenes |
| 3 — Places in Port | Present Progressive, Tag Questions | Solo acciones en curso y confirmaciones |
| 4 — In Port | Quantifiers, Modals | Solo cantidades y can/could/should/must |
| 5 — IMO SMCP | SMCP Phrases, Reported Commands | Solo frases SMCP y comandos reportados |

### Vocabulario: 20 términos marítimos por unidad (ver PM-1.2 de cada unidad)

---

*Sistema de Prompts Maestros — Fábrica Curricular FPI SENA*
*Portafolio Instructor Bilingüismo SENA — Sergio · 2026*
