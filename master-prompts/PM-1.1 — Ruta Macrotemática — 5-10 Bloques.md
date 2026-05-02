# PM-1.1: RUTA MACROTEMÁTICA

> **Nota sobre el filename:** este archivo conserva el nombre histórico "5-10 Bloques" por compatibilidad con scripts y referencias del DM. Desde v2.7 el número de bloques NO está atado al tipo de programa — ver Regla 1.

---

**Metadata:**
```yaml
version: 2.8
last_verified: 2026-05-01
status: v2.8 PARADIGM SHIFT estructura tripartita + tiempos canon universales + traceability _anclaje_matriz heredado v3.2 (cascade Phase 1 IMARPOR-V2 Step 1.2 · post PM-0.0 v1.2 + PM-0 v3.2)
required_inputs:
  - pm00_matriz_ref       # NEW v2.8 · referencia a pm-0-0-matriz-alineada.json (PM-0.0 v1.2 · 8 criterios canon)
  - pm0_anchors_ref       # Ruta a pm-0-context.json del programa (v2.6) · ahora PM-0 v3.2
  - tipo                  # "Técnico" | "Tecnológico" | "Curso Especial" | "Curso Complementario" (v2.7.1)
  - total_guias           # Número libre de bloques decidido por el instructor (v2.7)
  - duracion_total_horas  # Para validación horas/bloque ≥ 48h (v2.7) + tiempos canon tripartita (v2.8)
  - regla_bloques         # RESTAURADO en v2.7.1 · v2.8 aplica SOLO a sub-tipo APROPIACIÓN
  - sesiones_count        # NEW v2.8 · número total de sesiones del programa (típicos: 8 técnico · 12 CC · 16 tecnológico)
  - horas_por_sesion      # NEW v2.8 · típicamente 6h CC / 7.5h técnico · usado para tiempos canon tripartita
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
v2_8_changes:
  - "NEW estructura tripartita obligatoria: 1 APERTURA + N APROPIACIÓN + 1 TRANSFERENCIA (REGLA 7)"
  - "NEW tiempos canon universales: APERTURA=6h/1sesión · TRANSFERENCIA≤12h/≤2sesiones · APROPIACIÓN=resto (REGLA 8)"
  - "NEW schema diferenciado por tipo_bloque + _anclaje_matriz heredado v3.2 (REGLA 9)"
  - "NEW prompt operacional anti-prescriptivo · libertad LLM REAL (REGLA 10 · canonización Anti-patrón #16)"
  - "NEW 8 validation_checks (5 estructurales + 3 tiempos) + check 7 traceability heredado"
  - "regla_bloques v2.7.1 PRESERVADA aplicando SOLO a sub-tipo APROPIACIÓN"
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

---

## EXTENSIÓN v2.8 — ESTRUCTURA TRIPARTITA + TIEMPOS CANON + TRACEABILITY (2026-05-01)

> [!warning] PARADIGM SHIFT canonizado · Sergio Cortés decisión arquitectónica 2026-05-01
>
> PM-1.1 v2.7.1 generaba bloques macrotemáticos sin diferenciar TIPO de bloque pedagógico. v2.8 canoniza la **estructura tripartita** que refleja cómo realmente se despliega la pipeline FPI Factory: APERTURA (transversal) + APROPIACIÓN (por RAP) + TRANSFERENCIA (transversal capstone). Esta estructura se hereda de la realidad operacional: PM-2.1/PM-2.2 son transversales por competencia, PM-2.3 a PM-2.10 son por RAP, PM-3.5 Final Mission es capstone integrador.
>
> **Razón:** Sergio detectó (2026-05-01 Step 1.2 IMARPOR-V2) que PM-1.1 v2.7.1 trataba todos los bloques uniformemente. Esto causaba que downstream (PM-1.2, PM-2.0) tuviera que re-decidir qué bloques son apropiación vs transversales, perdiendo la traceability canon. La matriz alineada (PM-0.0 v1.2) ya tiene la información canónica · PM-1.1 v2.8 la respeta y la propaga.
>
> **Reglas v2.7.1** (1-6) permanecen como REFERENCIA para `regla_bloques` aplicado a sub-tipo APROPIACIÓN. Las nuevas REGLAS 7-10 son canon obligatorio.

### REGLA 7 — ESTRUCTURA TRIPARTITA OBLIGATORIA

El output `pm-1-1.json` v2.8 DEBE contener exactamente 3 tipos de bloque:

```
1. BLOQUE APERTURA       (transversal · 1 bloque único)
2. BLOQUES APROPIACIÓN   (1 bloque por RAP · alimenta PM-2.3 a PM-2.10 de ese RAP)
3. BLOQUE TRANSFERENCIA  (transversal capstone · 1 bloque único)
```

Para `N` RAPs en la matriz alineada (PM-0.0):

```
total_bloques = 1 (APERTURA) + N (APROPIACIÓN) + 1 (TRANSFERENCIA) = N + 2
```

Ejemplo IMARPOR-V2 (4 RAPs) → 6 bloques (1 + 4 + 1).
Ejemplo Tecnológico (6 RAPs) → 8 bloques (1 + 6 + 1).
Ejemplo Técnico (4 RAPs) → 6 bloques (1 + 4 + 1).

**NO ES OPCIONAL.** Si el output tiene un bloque sin `tipo_bloque` declarado, validation_check 1 FAIL → BLOQUEANTE.

### REGLA 8 — TIEMPOS CANON UNIVERSALES

Independiente del tipo de programa (Técnico · Tecnológico · Curso Especial · Curso Complementario):

| `tipo_bloque` | `sesiones_count` | `horas_directas` | Canon |
|---|---|---|---|
| **APERTURA** | exactamente 1 | exactamente 6h | OBLIGATORIO `=` |
| **APROPIACIÓN** | N (LLM distribuye entre RAPs) | (total_programa − APERTURA − TRANSFERENCIA) | flexible · LLM balancea |
| **TRANSFERENCIA** | máximo 2 | máximo 12h | OBLIGATORIO `≤` |

**Caso operacional IMARPOR-V2 (12 sesiones × 6h = 72h directas):**
```
S1                  APERTURA      6h    1 sesión
S2 — S10            APROPIACIÓN   54h   9 sesiones (4 RAPs · LLM distribuye)
S11 — S12           TRANSFERENCIA 12h   2 sesiones
                                  ───   ──────────
                                  72h   12 sesiones ✓
```

**Caso operacional Técnico (8 sesiones × 7.5h = 60h directas):**
```
S1                  APERTURA      6h    1 sesión (canon universal · NO 7.5h)
S2 — S7             APROPIACIÓN   42h   6 sesiones (LLM distribuye entre RAPs)
S8                  TRANSFERENCIA 12h   2 sesiones... wait, S8 sola = 1 sesión × 7.5h
                                                       
Ajuste: TRANSFERENCIA ≤ 12h ≤ 2 sesiones · si programa tiene sesiones de 7.5h, 
TRANSFERENCIA puede ser 1 sesión × 7.5h (si suficiente) o 2 sesiones × 7.5h = 15h... 
PERO canon dice ≤ 12h. Entonces TRANSFERENCIA = 1 sesión × 7.5h cuando sesión > 6h.

Regla refinada: TRANSFERENCIA = MIN(2 sesiones, 12h)
```

**Resolución regla refinada:**
- TRANSFERENCIA tiene `sesiones_count ≤ 2` Y `horas_directas ≤ 12`
- Ambas condiciones deben cumplirse simultáneamente
- LLM elige la combinación apropiada al programa

### REGLA 9 — SCHEMA DIFERENCIADO POR `tipo_bloque` + `_anclaje_matriz` HEREDADO v3.2

Cada bloque del output tiene schema diferente según su `tipo_bloque`:

#### Schema APERTURA (transversal)

```jsonc
{
  "bloque_id": "B0",
  "tipo_bloque": "APERTURA",
  "transversal": true,
  "titulo": "...",                          // LLM elige · ESP industrial
  "narrativa_macrotematica": "...",         // LLM redacta
  "sesiones_anchor": ["S1"],                // canon: 1 sesión
  "horas_directas": 6,                      // canon: exactamente 6h
  "_anclaje_matriz": {
    "alcance": "competencia_completa",
    "raps_atravesados": ["RA1", "RA2", "RA3", "RA4"],   // todos
    "pms_destino": ["PM-2.1", "PM-2.2"],
    "arquetipos_target": 4,                              // 2 PM-2.1 + 2 PM-2.2
    "evidencias_target": [],                             // sin evidencias formales
    "criterios_canon": []                                // sin criterios canon
  }
}
```

#### Schema APROPIACIÓN (por RAP)

```jsonc
{
  "bloque_id": "B1",
  "tipo_bloque": "APROPIACION",
  "transversal": false,
  "titulo": "...",                          // LLM elige · ESP industrial
  "narrativa_macrotematica": "...",         // LLM redacta
  "sesiones_anchor": ["S2", "S3", "S4"],    // LLM decide
  "horas_directas": 18,                     // LLM calcula = sum(sesiones × 6h)
  "regla_bloques_aplicada": "alineacion_1a1",  // del v2.7.1 · obligatorio aquí
  "_anclaje_matriz": {
    "rap_target": "RA1",                              // UN RAP principal
    "raps_secundarios": [],                           // si overlap multi-RAP
    "saberes_conceptos_cubiertos": ["RA1.SC.1", "RA1.SC.2"],
    "saberes_proceso_cubiertos": ["RA1.SP.1"],
    "criterios_canon_assigned": ["C01", "C02"],       // subset de los que PM-0.0 asignó a RA1
    "pms_destino": ["PM-2.3", "PM-2.4", "PM-2.5", "PM-2.6", "PM-2.8", "PM-2.9", "PM-2.10"],
    "evidencias_target": ["E1", "E2"],
    "sesiones_anchor": ["S2", "S3", "S4"],            // debe incluir sesiones canon de evidencias
    "cefr_subnivel": "A1.2"
  }
}
```

#### Schema TRANSFERENCIA (capstone)

```jsonc
{
  "bloque_id": "BT",
  "tipo_bloque": "TRANSFERENCIA",
  "transversal": true,
  "capstone": true,
  "titulo": "...",                          // LLM elige · típicamente "Final Mission · ..."
  "narrativa_macrotematica": "...",         // LLM redacta · 5 sub-fases ABP
  "sesiones_anchor": ["S11", "S12"],        // canon: ≤ 2 sesiones
  "horas_directas": 12,                     // canon: ≤ 12h
  "_anclaje_matriz": {
    "alcance": "todos_los_raps_integrados",
    "raps_movilizados": ["RA1", "RA2", "RA3", "RA4"],   // todos
    "pms_destino": ["PM-3.5"],
    "criterios_canon": ["C08"],                          // canon: C08 capstone
    "evidencias_target": ["E-Misión"],                   // canon: E-Misión
    "sesiones_anchor": ["S11", "S12"],
    "subfases_abp": 5                                    // 5 sub-fases canon ABP
  }
}
```

**Disciplina canon (heredada de PM-0 v3.2 REGLA 12):** cada bloque DEBE tener `_anclaje_matriz` non-empty con los campos requeridos según su `tipo_bloque`. Sin esto, validation_check 7 FAIL → BLOQUEANTE.

### REGLA 10 — PROMPT OPERACIONAL DEBE RESPETAR LIBERTAD LLM (heredado §10/§11/§12 PLAN-FASE-1)

El orchestrator que dispatchea Agent ejecutando PM-1.1 v2.8 DEBE:

SÍ pasar al Agent:
- Master prompt PM-1.1 v2.8 completo (canon strict · REGLAS 7-10)
- `pm-0-0-matriz-alineada.json` (input principal · matriz canon con 8 criterios C01-C08)
- `pm-0-context.json` v3.2 (universo narrativo · personajes · grammar focus · todos con `_anclaje_matriz`)
- 8 validation_checks (5 estructurales + 3 tiempos) como BLOQUEANTES
- Bloque "INSTRUCCIÓN CRÍTICA · LIBERTAD LLM REAL" explícito

NO pasar al Agent:
- Template JSON literal con N+2 bloques pre-fabricados
- Distribución sesiones APROPIACIÓN entre RAPs decidida por orchestrator
- Títulos de bloques pre-decididos
- `regla_bloques` decidido por orchestrator (LLM elige `alineacion_1a1` · `desdoblamiento_1aN` · etc.)
- Narrativa macrotemática pre-redactada

**LIBERTAD LLM REAL** sobre:
- Cuántas sesiones APROPIACIÓN consume cada RAP (LLM balancea 9 sesiones entre 4 RAPs según complejidad)
- Qué `regla_bloques` aplica a APROPIACIÓN (`alineacion_1a1` típico · `desdoblamiento_1aN` si un RAP es muy complejo)
- Títulos ESP industriales (LLM crea desde universo PM-0 v3.2)
- Narrativa macrotemática (LLM redacta desde personajes/grammar focus PM-0)
- Cómo distribuye criterios canon overlap multi-RAP (e.g., C02 RA1+RA3: en bloque RA1 o RA3 o ambos)

**LIBERTAD LLM SOBRE NADA**:
- Estructura tripartita (REGLA 7 canon obligatorio)
- Tiempos canon (REGLA 8 universal)
- Schema diferenciado por tipo (REGLA 9 obligatorio)
- 8 validation_checks (todos BLOQUEANTES)
- Sesiones canon de evidencias C01-C08 (heredadas de PM-0.0 · NO modificables)

### REGLA 11 — VALIDATION POST-GENERATION · 8 CHECKS

```jsonc
"validation_checks": [
  {"id": 1, "name": "estructura_tripartita_completa", "status": "PASS|FAIL"},   // 1 + N + 1
  {"id": 2, "name": "apropiacion_cobertura_raps_1a1", "status": "PASS|FAIL"},   // N bloques APROPIACIÓN = N RAPs
  {"id": 3, "name": "transversalidad_correcta", "status": "PASS|FAIL"},         // APERTURA/TRANSFERENCIA transversal:true
  {"id": 4, "name": "cobertura_criterios_canon_completa", "status": "PASS|FAIL"}, // C01-C07 en APROPIACIÓN según PM-0.0 · C08 en TRANSFERENCIA
  {"id": 5, "name": "pms_destino_correctos_por_tipo", "status": "PASS|FAIL"},   // APERTURA→{2.1,2.2} · APROPIACIÓN→{2.3-2.10} · TRANSFERENCIA→{3.5}
  {"id": 6, "name": "apertura_horas_canon", "status": "PASS|FAIL"},             // APERTURA = 6h · 1 sesión exacto
  {"id": 7, "name": "transferencia_horas_canon", "status": "PASS|FAIL"},        // TRANSFERENCIA ≤ 12h · ≤ 2 sesiones
  {"id": 8, "name": "apropiacion_horas_balanced", "status": "PASS|FAIL"},       // sum(APROPIACIÓN.horas) = total_horas - APERTURA - TRANSFERENCIA
  {"id": 9, "name": "traceability_matriz_completa", "status": "PASS|FAIL"}      // hereda PM-0 v3.2 REGLA 12 · _anclaje_matriz en cada bloque
]
```

Si CUALQUIER check FAIL · output marcado `enriched: false` · BLOQUEANTE para Step 1.3 (PM-1.2 cascade).

### REGLA 12 — SESIONES CANON DE EVIDENCIAS PRESERVADAS

PM-0.0 v1.2 asigna sesiones canon a las 8 evidencias C01-C08:

| Evidencia | Sesión canon | Asignada a bloque |
|---|---|---|
| C01 Reading | S3 | bloque APROPIACIÓN del RAP target (RA1) |
| C02 Writing | S4 | bloque APROPIACIÓN del RAP target principal (RA1 o RA3 · LLM elige) |
| C03 Listening | S5 | bloque APROPIACIÓN del RAP target (RA2) |
| C04 Speaking parcial | S6 | bloque APROPIACIÓN del RAP target principal (RA2 o RA3) |
| C05 Speaking final | S8 | bloque APROPIACIÓN del RAP target (RA3) |
| C06 Lang Functions | S9 | bloque APROPIACIÓN del RAP target principal (RA3 o RA4) |
| C07 Cuestionario S6 | S6 | bloque APROPIACIÓN intersectivo (4-way · típicamente RA2 o RA3) |
| C08 Misión Final | S12 | bloque TRANSFERENCIA capstone |

**Cada bloque APROPIACIÓN debe declarar `sesiones_anchor` que INCLUYA las sesiones canon donde caen sus criterios asignados.**

Ejemplo IMARPOR-V2 distribución posible:
- Bloque RA1 (B1): sesiones_anchor=[S2,S3,S4] · incluye S3 (C01) y S4 (C02)
- Bloque RA2 (B2): sesiones_anchor=[S5,S6] · incluye S5 (C03) y S6 (C04, C07)
- Bloque RA3 (B3): sesiones_anchor=[S7,S8] · incluye S8 (C05)
- Bloque RA4 (B4): sesiones_anchor=[S9,S10] · incluye S9 (C06)
- Bloque TRANSFERENCIA (BT): sesiones_anchor=[S11,S12] · incluye S12 (C08)

LLM tiene libertad de proponer otra distribución siempre que sesiones canon de evidencias se respeten.

### REGLA 13 — RELACIÓN CON OTROS PROMPTS v2.8

| Relación | Prompt | Cambio v2.8 |
|----------|--------|-------------|
| **Consume de (NEW · CRÍTICO)** | PM-0.0 v1.2 | matriz pedagógica alineada con 8 criterios canon |
| **Consume de** | PM-0 v3.2 | universo narrativo + personajes + grammar focus + L1 policy |
| **Alimenta a** | PM-1.2 v4.2+ | scope diferenciado por tipo_bloque (APROPIACIÓN requiere curación POR RAP · APERTURA/TRANSFERENCIA NO) |
| **Alimenta a** | PM-2.0 architect | session blueprint hereda tipo_bloque + tiempos canon |
| **Alimenta a** | PM-2.1, PM-2.2 | toman input del bloque APERTURA (transversal) |
| **Alimenta a** | PM-2.3 a PM-2.10 | toman input del bloque APROPIACIÓN del RAP correspondiente |
| **Alimenta a** | PM-3.5 | toma input del bloque TRANSFERENCIA capstone |

### REGLA 14 — DEPRECATION PATH v2.7.1 → v2.8

Programas con `pm-1-1.json` v2.7.1 (sin estructura tripartita · sin `_anclaje_matriz` · sin tiempos canon):
- KEEP los archivos legacy en run dir (NO eliminar · son canon histórico)
- Generar nuevo `pm-1-1.json` v2.8 cuando se re-run el programa
- Marcar artefactos v2.7.1 como `*.legacy-v2-7-1` (sufijo informativo · NO mover)

Run resultante puede tener AMBOS: legacy v2.7.1 (para auditoría) + v2.8 (operacional).

---

## ESTRUCTURA OPERACIONAL v2.8 (resumen ejecutivo)

```
pm-0-0-matriz-alineada.json (PM-0.0 v1.2 · 8 criterios canon C01-C08)
  +
pm-0-context.json (PM-0 v3.2 · universo + _anclaje_matriz)
  +
pm-1-1-input.json (tipo programa · sesiones_count · horas_por_sesion · regla_bloques default)
  ↓
PM-1.1 v2.8 dispatcher (Agent con prompt anti-prescriptive · libertad LLM REAL)
  ↓
pm-1-1.json v2.8
  ├─ bloque APERTURA   (1 · transversal · 6h · S1 · pms→{2.1,2.2})
  ├─ bloques APROPIACIÓN (N · 1 por RAP · sum=resto · pms→{2.3-2.10} · _anclaje C01-C07)
  └─ bloque TRANSFERENCIA (1 · transversal · ≤12h · ≤2 sesiones · pms→{3.5} · _anclaje C08)
  ↓
9 validation_checks (8 estructurales/tiempos + 1 traceability heredado)
  ↓
Step 1.3 PM-1.2 cascade (scope diferenciado por tipo_bloque)
```

---

## CASO OPERACIONAL CONFIRMADO (pendiente Step 1.2 IMARPOR-V2 dispatch)

**Input esperado IMARPOR-V2:**
- pm-0-0-matriz-alineada.json v1.1 · 4 RAPs · 8 criterios C01-C08 · 4 overlaps multi-RAP
- pm-0-context.json v3.2 · 21 keys · 44 anclajes · 7/7 PASS
- tipo: Curso Complementario · sesiones_count: 12 · horas_por_sesion: 6

**Output esperado pm-1-1.json v2.8:**
- 6 bloques (1 + 4 + 1)
- Bloque APERTURA (B0) · S1 · 6h · transversal a competencia
- 4 bloques APROPIACIÓN (B1-B4) · S2-S10 · 54h total · 1 por RAP
- Bloque TRANSFERENCIA (BT) · S11-S12 · 12h · capstone E-Misión C08
- 9/9 validation_checks PASS
- 0 elementos sin `_anclaje_matriz` (traceability completa)

---

*PM-1.1 v2.8 · Ruta Macrotemática Tripartita · Tiempos Canon Universales · Traceability Heredada PM-0.0 v1.2 + PM-0 v3.2 · Anti-prescriptive prompt operacional*
*Sergio Cortés decisión arquitectónica 2026-05-01 · cascade Phase 1 Step 1.2 IMARPOR-V2*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
