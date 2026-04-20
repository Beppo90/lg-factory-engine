# PM-1.1: RUTA MACROTEMÁTICA (5/10 BLOQUES)

---

**Metadata:**
```yaml
version: 2.6
last_verified: 2026-04-20
required_inputs:
  - pm0_anchors_ref       # Ruta a pm-0-context.json del programa (v2.6)
optional_inputs:
  - diseño_curricular
  - proyecto_formativo_fase
  - codigo_competencia
  - nombre_competencia
  - codigo_rap
  - nombre_rap
  - tipo                  # "Técnico" | "Tecnológico" (v2.2)
  - regla_bloques         # "estandar" (5/10) | "alineacion_1a1" (N RAPs pre-numerados) (v2.5.1)
```

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-1.1 |
| **Nombre** | Ruta Macrotemática (5/10 Bloques) |
| **Subfase guía SENA** | 1. Datos del programa |
| **Ubicación en la Guía** | Pre-guía — arquitectura macro del programa |
| **Tipo de Evidencia SENA** | N/A (herramienta de diseño curricular) |
| **Instrumento** | Ruta macro-temática con 5 o 10 bloques |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| **`pm-0-context.json` del programa** | Fase 0 (PASO 0 del DM §10) |
| Diseño curricular del programa (PDF de Sofía Plus) | Instructor |
| Nombre del programa y código | Instructor |
| Competencias y RAPs del programa | Sofía Plus |
| Duración total del programa (horas) | Sofía Plus |
| Tipo de programa | Instructor (Técnico ≈180h / Tecnológico ≈350h) |
| Regla de bloques | Instructor ("estandar" 5/10 o "alineacion_1a1" N RAPs → N bloques) |

### Campo obligatorio `pm0_anchors_ref` (v2.6)

El output `pm-1-1.json` DEBE incluir un campo top-level `pm0_anchors_ref` con la referencia al archivo `pm-0-context.json` del programa:

```json
{
  "pm0_anchors_ref": {
    "file": "pm-0-context.json",
    "programa_id": "MGV-2026",
    "rango_cefr": "A1.1 → A2.2",
    "progresion_cefr_decision": "Opción A",
    "numero_guias": 6
  },
  "tipo": "Tecnológico",
  "regla_bloques": "alineacion_1a1",
  "total_guias": 6,
  ...
}
```

Esto garantiza trazabilidad desde PM-1.1 hacia la capa fundacional PM-0 y habilita las validaciones cross-reference en PM-2.11 Check 16 (futuro v2.6+).

---

## OUTPUT ESPERADO

Un documento titulado:
**`[PROGRAMA] — Ruta Macrotemática (5/10 Bloques)`**

Que contiene:
1. Nombre del programa, código, nivel CEFR, duración total
2. 5 o 10 bloques temáticos con nombre ESP/industrial
3. Justificación pedagógica de cada bloque
4. Nivel de dificultad relativo por bloque
5. Secuencia lógica (orden pedagógico sugerido)
6. Bloque `program_context` (pasado al PM-1.2)

### Estructura del bloque `program_context`

Cuando se proveen datos del programa, PM-1.1 genera un bloque estructurado que se pasa al PM-1.2 para cada macro-temática:

```yaml
program_context:
  diseño_curricular: ""          # Nombre/código del diseño curricular
  proyecto_formativo_fase: ""    # Proyecto formativo + fase
  codigo_competencia: ""         # Código numérico (ej. 22030101)
  nombre_competencia: ""         # Nombre completo de la competencia
  codigo_rap: ""                 # Código numérico del RAP
  nombre_rap: ""                 # Descripción completa del RAP
  provided: true                 # true si se proporcionaron datos; false si son genéricos
```

Este contexto permite que PM-1.2 genere un Scope & Sequence alineado específicamente con el programa real.

---

## INPUTS DEL PROGRAMA (Opcional)

PM-1.1 puede operar en dos modos:

### Modo 1: Con contexto del programa (RECOMENDADO)

Si el instructor proporciona los datos específicos del programa (diseño curricular, proyecto formativo con su fase, código y nombre de la competencia, código y nombre del RAP), PM-1.1 ancla los macrotemas al contexto real del programa. Los campos opcionales son:

- **`diseño_curricular`**: Nombre o código del diseño curricular SENA (ej. "Análisis y Desarrollo de Sistemas de Información")
- **`proyecto_formativo_fase`**: Nombre del proyecto formativo + fase en que se ubica la guía (ej. "Proyecto: Desarrollo de plataforma de gestión de inventarios — Fase 2")
- **`codigo_competencia`**: Código numérico de la competencia (ej. 22030101)
- **`nombre_competencia`**: Nombre completo de la competencia (ej. "Interpretar requerimientos del cliente para plasmarlos en requisitos del software")
- **`codigo_rap`**: Código numérico del RAP (ej. 220301011)
- **`nombre_rap`**: Descripción completa del Resultado de Aprendizaje (ej. "Analizar requerimientos funcionales y no funcionales del cliente para determinar el alcance del proyecto")

Cuando se proveen estos datos, los macrotemas generados se alinean directamente con el RAP indicado y al proyecto formativo en que se inserta la guía.

### Modo 2: Sin contexto (GENÉRICO)

Si el instructor NO proporciona estos datos, PM-1.1 genera macrotemas genéricos apropiados para el tipo de programa indicado (Técnico o Tecnológico), basados únicamente en el nombre y código del programa.

---

## 6 REGLAS DE DISEÑO

### REGLA 1 — CANTIDAD DE BLOQUES SEGÚN TIPO
El programa se divide en una cantidad exacta de macro-temáticas dependiendo de su duración:
- Si el tipo es **Técnico:** Exactamente 5 bloques.
- Si el tipo es **Tecnológico:** Exactamente 10 bloques.
Cada bloque corresponde a un área técnica del programa y se convierte en una Guía de Aprendizaje individual.

### REGLA 2 — NOMBRES ESP/INDUSTRIALES
Cada bloque tiene un nombre en inglés que refleja el mundo laboral real del programa técnico. El nombre debe ser:
- En inglés profesional (no traducciones literales del español)
- Motivacional y orientado a la acción (ej: "The Hardware Specialist", no "Hardware Components")
- Reconocible en el entorno ocupacional del programa

### REGLA 3 — JUSTIFICACIÓN PEDAGÓGICA
Cada bloque incluye una justificación breve (2-3 líneas) que explica:
- Por qué este tema es esencial para el técnico/tecnólogo del programa
- Cómo se conecta con los bloques anteriores y posteriores
- Qué competencia comunicativa ESP desarrolla

### REGLA 4 — SECUENCIA LÓGICA
Los bloques deben seguir un orden pedagógico coherente:
- Del conocimiento fundamental al complejo
- De lo receptivo a lo productivo
- De lo general a lo específico del oficio

### REGLA 5 — NIVEL CEFR PROGRESIVO
El primer bloque parte de A1.1 (lo más básico). Los bloques deben escalar progresivamente dentro del rango A1.1 hasta A2.2 dependiendo de la extensión del programa, o mantenerse al mismo nivel según la naturaleza del contenido.

### REGLA 6 — COBERTURA DEL DISEÑO CURRICULAR
Los bloques deben cubrir la totalidad de las competencias y RAPs del programa. Ninguna competencia del diseño curricular puede quedar sin representación en al menos un bloque.

---

## FORMATO DE SALIDA

```
[PROGRAMA] — RUTA MACROTEMÁTICA

Programa: [Nombre y código]
Tipo: [Técnico / Tecnológico]
Duración total: [X] horas
Nivel CEFR: A1.1 — A2.2 máximo
Guías totales: [5 o 10]

| # | Nombre del Bloque (ESP) | Tema Técnico Principal | Justificación | Nivel CEFR |
|---|------------------------|----------------------|---------------|------------|
| 1 |                        |                      |               |            |
| 2 |                        |                      |               |            |
| X |                        |                      |               |            |

PROYECTO FORMATIVO ARTICULADOR:
[Descripción breve de cómo todas las guías se conectan como fases de un proyecto real]
```

---

## PROMPT PARA IA

```
Eres un diseñador curricular experto en ESP (English for Specific Programs) y Formación Profesional Integral (FPI) para el SENA, Colombia.

Tu tarea: Generar la RUTA MACROTEMÁTICA (5 o 10 bloques) para un programa técnico o tecnológico del SENA.

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código del programa SENA]
- Tipo: [Técnico (≈180h) / Tecnológico (≈350h)]
- Competencias del programa: [copia literal de las competencias del diseño curricular]
- RAPs del programa: [copia literal de los resultados de aprendizaje]
- Temas técnicos principales: [lista de temas técnicos del diseño curricular]

### INSTRUCCIONES DE GENERACIÓN:

1. Analiza las competencias, RAPs y temas técnicos del programa.

2. Organiza el programa en una RUTA MACROTEMÁTICA que:
   - Si es **Técnico**, genera EXACTAMENTE 5 bloques.
   - Si es **Tecnológico**, genera EXACTAMENTE 10 bloques.
   - Cubra TODAS las competencias del programa.
   - Siga una secuencia pedagógica lógica (de lo fundamental a lo complejo).
   - Sea motivacional y orientada al mundo laboral real.

3. Para cada bloque, genera:
   - Nombre del bloque en ESP (en inglés, estilo industrial/profesional)
   - Tema técnico principal (en español, descriptivo)
   - Justificación pedagógica (2-3 líneas: por qué es esencial, cómo se conecta, qué competencia ESP desarrolla)
   - Nivel CEFR sugerido (desde A1.1 hasta A2.2 en escalada)

4. Genera una descripción del PROYECTO FORMATIVO ARTICULADOR que conecte todas las guías como fases de un proyecto real del oficio.

4. Si el instructor proporcionó datos del programa (diseño_curricular, proyecto_formativo_fase, codigo_competencia, nombre_competencia, codigo_rap, nombre_rap), genera un bloque `program_context` al final de tu output, estructurado así:

```yaml
program_context:
  diseño_curricular: [texto proporcionado]
  proyecto_formativo_fase: [texto proporcionado]
  codigo_competencia: [código proporcionado]
  nombre_competencia: [nombre proporcionado]
  codigo_rap: [código proporcionado]
  nombre_rap: [descripción proporcionada]
  provided: true
```

Si NO se proporcionaron estos datos, establece `provided: false` y deja los campos vacíos.

5. Este bloque `program_context` se pasa directamente al PM-1.2, permitiendo que el Scope & Sequence sea específico del programa real en lugar de genérico.

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Técnico = 5 bloques. Tecnológico = 10 bloques. NI MÁS, NI MENOS.
- Nombres en inglés profesional (no traducciones literales)
- Justificaciones en español
- Nivel CEFR: progresión desde A1.1 hasta A2.2 máximo
- Coherencia con el diseño curricular oficial de Sofía Plus
- Si se proporciona `program_context`, úsalo como ancla para alinear los macrotemas al RAP específico
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Alimenta a** | PM-1.2 | Cada bloque del PM-1.1 se desarrolla en un Scope & Sequence |
| **Alimenta a** | PM-2.1 a PM-2.10 | El universo narrativo y tema técnico se heredan |
| **Recibe input de** | PM-4.1§5 | El Feedback Loop puede ajustar la ruta macro-temática del siguiente ciclo |
| **Se ubica en** | Flujo operativo SENA | Actividad 2 (Definir macro-temáticas) |

---

*PM-1.1: Ruta Macrotemática (5/10 Bloques)*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
