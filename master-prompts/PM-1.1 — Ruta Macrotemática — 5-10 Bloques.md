# PM-1.1: RUTA MACROTEMÁTICA

> **Nota sobre el filename:** este archivo conserva el nombre histórico "5-10 Bloques" por compatibilidad con scripts y referencias del DM. Desde v2.7 el número de bloques NO está atado al tipo de programa — ver Regla 1.

---

**Metadata:**
```yaml
version: 2.7.1
last_verified: 2026-04-27
required_inputs:
  - pm0_anchors_ref       # Ruta a pm-0-context.json del programa (v2.6)
  - tipo                  # "Técnico" | "Tecnológico" | "Curso Especial" | "Curso Complementario" (v2.7.1)
  - total_guias           # Número libre de bloques decidido por el instructor (v2.7)
  - duracion_total_horas  # Para validación horas/bloque ≥ 48h (v2.7)
  - regla_bloques         # RESTAURADO en v2.7.1 — debe declarar uno de los 4 patrones canónicos
conditional_inputs:
  # Si tipo ∈ {Técnico, Tecnológico}:
  - diseño_curricular
  - nombre_proyecto_formativo               # SOLO Técnico/Tecnológico
  - proyecto_formativo_fase                 # SOLO Técnico/Tecnológico
  - contexto_adicional_proyecto_formativo   # SOLO Técnico/Tecnológico
  # Si tipo ∈ {Curso Especial, Curso Complementario}:
  - final_mission_scenario                  # SOLO Curso Especial/Complementario — escenario integral
optional_inputs:
  - codigo_competencia
  - nombre_competencia
  - codigo_rap
  - nombre_rap
v2_7_1_corrections:
  - "Restaurado regla_bloques con enum de 4 patrones (no eliminado, expandido)"
  - "Asimetría tipo-programa para proyecto formativo: solo aplica Técnico/Tecnológico"
  - "Curso Complementario reconocido como sinónimo administrativo SOFÍA de Curso Especial"
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
| Tipo de programa | Instructor (Técnico / Tecnológico / Curso Especial / Curso Complementario — solo metadata, no determina bloques) |
| **`total_guias`** | Instructor (v2.7 — número libre, recomendado = número de RAPs del programa) |
| **`regla_bloques`** | Instructor (v2.7.1 — uno de los 4 patrones canónicos: `alineacion_1a1` \| `absorcion_Na1` \| `desdoblamiento_1aN` \| `alineacion_NaM`) |

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
# Versión v2.7.1 — estructura condicional según tipo
program_context:
  # Campos comunes
  diseño_curricular: ""           # Nombre/código del diseño curricular
  codigo_competencia: ""          # Código numérico (ej. 22030101)
  nombre_competencia: ""          # Nombre completo de la competencia
  codigo_rap: ""                  # Código numérico del RAP
  nombre_rap: ""                  # Descripción completa del RAP
  provided: true                  # true si se proporcionaron datos; false si son genéricos

  # SOLO si tipo ∈ {Técnico, Tecnológico}:
  proyecto_formativo:             # OMITIR si tipo es Curso Especial/Complementario
    nombre: ""                    # Nombre del proyecto formativo articulador
    fase: ""                      # Fase del proyecto donde se ubica la guía
    contexto_adicional: ""        # Cliente, sector, restricciones

  # SOLO si tipo ∈ {Curso Especial, Curso Complementario}:
  final_mission_scenario: ""      # Escenario integral del curso que ancla la Misión Final
                                  # Reemplaza arquitectónicamente al proyecto_formativo en cursos cortos
                                  # OMITIR si tipo es Técnico/Tecnológico (esos usan proyecto_formativo)
```

Este contexto permite que PM-1.2 genere un Scope & Sequence alineado específicamente con el programa real.

---

## INPUTS DEL PROGRAMA (Opcional)

PM-1.1 puede operar en dos modos:

### Modo 1: Con contexto del programa (RECOMENDADO)

Si el instructor proporciona los datos específicos del programa, PM-1.1 ancla los macrotemas al contexto real del programa. **Los campos disponibles dependen del `tipo` del programa** (asimetría v2.7.1):

#### Campos comunes a todos los tipos:

- **`diseño_curricular`**: Nombre o código del diseño curricular SENA (ej. "Análisis y Desarrollo de Sistemas de Información")
- **`codigo_competencia`**: Código numérico de la competencia (ej. 22030101)
- **`nombre_competencia`**: Nombre completo de la competencia (ej. "Interpretar requerimientos del cliente para plasmarlos en requisitos del software")
- **`codigo_rap`**: Código numérico del RAP (ej. 220301011)
- **`nombre_rap`**: Descripción completa del Resultado de Aprendizaje

#### Campos SOLO para Técnico/Tecnológico (programas con proyecto formativo):

- **`nombre_proyecto_formativo`**: Nombre del proyecto formativo articulador (ej. "Desarrollo de plataforma de gestión de inventarios")
- **`proyecto_formativo_fase`**: Fase del proyecto en que se ubica la guía (ej. "Fase 2 — Análisis de requerimientos")
- **`contexto_adicional_proyecto_formativo`**: Cliente, sector, escenario real, restricciones técnicas

#### Campo SOLO para Curso Especial / Complementario (sin proyecto formativo):

- **`final_mission_scenario`**: Escenario laboral integral del curso que ancla la Misión Final (ej. "Simulación de Operaciones: The CML Port Turnaround"). Este campo reemplaza arquitectónicamente al proyecto formativo en cursos cortos. NO usar `proyecto_formativo_*` con tipo Curso Especial/Complementario.

Cuando se proveen estos datos, los macrotemas generados se alinean directamente con el RAP indicado y al contexto pedagógico apropiado al tipo de programa.

### Modo 2: Sin contexto (GENÉRICO)

Si el instructor NO proporciona estos datos, PM-1.1 genera macrotemas genéricos apropiados para el tipo de programa indicado (Técnico o Tecnológico), basados únicamente en el nombre y código del programa.

---

## 6 REGLAS DE DISEÑO

### REGLA 1 — CANTIDAD DE BLOQUES (v2.7.1 — 4 PATRONES CANÓNICOS)

El número de bloques (`total_guias`) lo decide el instructor según la lógica del diseño curricular y su criterio pedagógico. **El campo `tipo` (Técnico / Tecnológico / Curso Especial / Curso Complementario) es metadata administrativa de certificación SENA y NO determina el número de bloques.**

**El campo `regla_bloques` es OBLIGATORIO y debe declarar uno de los 4 patrones canónicos:**

| Patrón | Significado | Ejemplo |
|--------|-------------|---------|
| `alineacion_1a1` | 1 RAP = 1 guía (default Técnico/Tecnológico canon) | MGV: 6 RAPs → 6 guías |
| `absorcion_Na1` | N RAPs absorbidos en 1 guía única (variante Curso Especial/Complementario) | IMARPOR-CC: 4 RAPs → 1 guía 100h |
| `desdoblamiento_1aN` | 1 RAP desdoblado en N guías (RAP complejo subdividido pedagógicamente) | RAP de "Diseño completo de software" → guía análisis + guía implementación + guía testing |
| `alineacion_NaM` | Mapeo libre N RAPs ↔ M guías (agrupaciones híbridas) | 8 RAPs → 6 guías con agrupación temática |

**Validación blanda (soft warning) — horas mínimas recomendadas por bloque:**

```
horas_por_bloque = duracion_total_horas / total_guias
SI horas_por_bloque < 48: MOSTRAR warning amarillo, permitir continuar
```

48h por bloque es el umbral pedagógico recomendado para que quepan las 6 evidencias formales (Reading, Writing, Listening, Speaking, Language Functions, Cuestionario S6) más Playbook + Misión Final con la profundidad estándar. Por debajo de 48h, el instructor recibe un aviso amarillo en el formulario indicando que tendrá que comprimir actividades, pero puede continuar — útil para casos legítimos como micro-guías de refuerzo, módulos de actualización o cursos cortos.

**Variante Curso Especial / Complementario con `regla_bloques: "absorcion_Na1"`:**
- Se OMITE: TODO el bloque `proyecto_formativo` (`nombre`, `fase`, `contexto_adicional`) y `proyecto_formativo_articulador`. **Cursos Complementarios/Especiales NO tienen proyecto formativo en absoluto** (canon SENA).
- Se REQUIERE: campo `final_mission_scenario` que describe el escenario laboral integral del curso (ancla narrativa para la Misión Final que se construye en Fase 2)
- Se CONSERVA: las 6 evidencias formales, Playbook PM-3.1/3.2, Cuestionario S6, Misión Final, todo el contenido de la guía única
- Se AJUSTA: la Misión Final pasa a ser la entrega completa del curso, no una "transferencia post-evaluación" como en programas multi-guía

**Asimetría canónica tipo-programa:**

| Tipo | proyecto_formativo | final_mission_scenario |
|------|--------------------|-----------------------|
| Técnico | ✓ Obligatorio (con N fases articuladas entre guías) | ✓ Uno por guía |
| Tecnológico | ✓ Obligatorio (con N fases articuladas entre guías) | ✓ Uno por guía |
| Curso Especial | ✗ NO aplica | ✓ Uno integral del curso |
| Curso Complementario | ✗ NO aplica | ✓ Uno integral del curso |

Cada bloque corresponde a un área temática autónoma del programa y se convierte en una Guía de Aprendizaje individual.

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
   - Genere EXACTAMENTE el número de bloques indicado en `total_guias` (decisión libre del instructor).
   - APLIQUE el patrón declarado en `regla_bloques`:
     - `alineacion_1a1` → 1 bloque por RAP, en orden
     - `absorcion_Na1` → todos los RAPs absorbidos en 1 sola guía (single-guía); validar que `total_guias === 1`
     - `desdoblamiento_1aN` → un RAP específico se desdobla en N bloques; documentar la subdivisión
     - `alineacion_NaM` → mapeo libre; documentar explícitamente qué RAPs van a qué bloques
   - CALCULE `horas_por_bloque = duracion_total_horas / total_guias`. Si < 48h, anotar `horas_por_bloque_warning: true` en el output y continuar (no bloquear).
   - Cubra TODAS las competencias del programa (Regla 6).
   - Siga una secuencia pedagógica lógica (de lo fundamental a lo complejo).
   - Sea motivacional y orientada al mundo laboral real.
   - APLIQUE la asimetría tipo-programa para campos de proyecto:
     - Si `tipo ∈ {Técnico, Tecnológico}` → INCLUIR `proyecto_formativo` (con sub-fases) y `proyecto_formativo_articulador` (narrativa entre guías).
     - Si `tipo ∈ {Curso Especial, Curso Complementario}` → OMITIR ambos. INCLUIR `final_mission_scenario` (escenario integral).

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
- Número de bloques = `total_guias` (decidido por instructor). `regla_bloques` OBLIGATORIO con uno de los 4 patrones canónicos. Validación blanda: ≥ 48h por bloque (warning amarillo si menor, no bloqueo).
- Asimetría tipo-programa: Técnico/Tecnológico usan `proyecto_formativo` + `proyecto_formativo_articulador`. Curso Especial/Complementario usan SOLO `final_mission_scenario`. NO mezclar.
- Nombres en inglés profesional (no traducciones literales)
- Justificaciones en español
- Nivel CEFR: progresión dentro del rango definido en pm-0-context (A1.1 → A2.2 máximo)
- Coherencia con el diseño curricular oficial de Sofía Plus
- Si se proporciona `program_context`, úsalo como ancla para alinear los macrotemas al RAP específico
- Si `tipo === "Curso Especial"` y `total_guias === 1`, OMITIR el bloque "proyecto formativo articulador" del output
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
