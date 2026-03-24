# FLOW-v2: FLUJO CORREGIDO — LG FACTORY ENGINE
## Errata / Flow Correction
## Author: Sergio Cortés Perdomo + Mimo
## Date: 2026-03-24
## Status: PENDING APPROVAL

---

## 0. POR QUÉ ESTE DOCUMENTO

Los SPECs originales (SPEC-001 a SPEC-004) fueron escritos con un flujo que asumía:
- El pipeline empieza en PM-1.2 con un programa JSON pre-configurado
- Todos los PMs son obligatorios y secuenciales
- Los productos no tienen categorías diferenciadas
- PM-4.1 es un paso separado post-Phase 2

El flujo real del sistema, según la validación con el instructor (2026-03-24), es diferente. Este documento captura el flujo corregido como fuente de verdad antes de tocar los SPECs.

---

## 1. FLUJO COMPLETO — 6 MOMENTOS

### MOMENTO 1: Topic Creation (PM-1.1)

**Punto de contacto del usuario.** El instructor inicia aquí, NO en PM-1.2.

**Inputs del instructor:**
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Nombre de programa | Sí | Nombre del programa de formación |
| Ficha | Sí | Código de ficha del programa |
| Tipo de programa | Sí | `técnica` (→ 6 macrotemas) o `tecnología` (→ 10 macrotemas) |
| Temas / insumo base | Sí | Temas técnicos y funcionales del diseño curricular |

**Output:** Lista de macrotemas sugeridos (6 para técnica, 10 para tecnología).

**Gate:** G0 — Selección de macrotema
- El instructor elige uno de los macrotemas sugeridos O ingresa un macrotema libre
- Este gate es OBLIGATORIO — no se puede auto-aprobar

**Prompt template:** `pm-1.1.md` (definido — ACTÚA COMO Senior Curriculum Architect)

**Notas arquitectónicas:**
- Este PM es `is_per_unit: false` (se ejecuta una vez por programa)
- No tiene dependencias
- Su output alimenta PM-1.2

---

### MOMENTO 2: Setting the Universe (PM-1.2)

Con un macrotema elegido (de G0 o libre), el instructor configura el programa.

**Inputs del instructor:**
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Nombre de programa | Sí | (puede pre-llenarse desde Momento 1) |
| Ficha | Sí | (puede pre-llenarse desde Momento 1) |
| Macrotema | Sí | El macrotema elegido en G0 o uno libre |
| CEFR | Sí | Beginner / Elementary / Pre-intermediate / Intermediate |
| Competencia | No | Competencia del programa |
| RAP | No | Resultado de Aprendizaje |

**Output:** Scope & Sequence + fuentes auténticas curadas (3 fuentes)

**Gate:** G1 — Selección de textos auténticos
- El instructor elige los textos sobre los cuales se construyen los 3 universos (ocupacional, comunicacional, lingüístico)
- Los textos deben cumplir las 4 Cs (Content, Communication, Cognition, Culture)
- Este gate es OBLIGATORIO

**Notas arquitectónicas:**
- PM-1.2 depende de PM-1.1 (el macrotema viene de ahí)
- G1 ocurre DENTRO del flujo de PM-1.2, no después

---

### MOMENTO 3: Building the Learning Guide (PM-2.1 → PM-2.10)

Con el macrotema, el universo y los textos definidos, se activan los 10 PMs de Phase 2.

**Flujo secuencial por PM:**
1. Se activa el PM
2. El instructor elige un arquetipo (tipo de actividad) de las opciones disponibles
3. El PM genera el worksheet
4. Se pasa al siguiente PM

**PMs y sus arquetipos:**

| PM | Nombre | Conjunto | Arquetipos | Gate |
|----|--------|----------|------------|------|
| PM-2.1 | The Spark — Reflexión Inicial | Apertura | 5 opciones | G2 |
| PM-2.2 | Gap Analysis — Contextualización | Apertura | 5 opciones | G2 |
| PM-2.3 | Reading — The Master Anchor | A | 6 opciones | G2 |
| PM-2.4 | Writing — Task-Based Production | A | 5 opciones | G2 |
| PM-2.5 | Literacy & Vocabulary Skills | A | 5 opciones | G2 |
| PM-2.6 | Listening — The Auditory Anchor | B | 6 opciones | G2 |
| PM-2.7 | Pronunciation & Speaking Skills | B | 5 opciones | G2 |
| PM-2.8 | Speaking Production & Simulation | B | 5 opciones | G2 |
| PM-2.9 | Language Functions — Transversal | C | Sin arquetipos | G3 |
| PM-2.10 | Grammar — Structure Use | C | 5 opciones | G2 |

**Output de Phase 2:** 9 worksheets (PM-2.9 es transversal, no genera worksheet propio)

**Producto resultante: La Guía de Aprendizaje del Aprendiz**

Esta guía INCLUYE:
- Los 9 worksheets de PM-2.1 a PM-2.10
- Los Instrumentos de Evaluación (PM-4.1): Quiz + Checklist + Rúbrica

**IMPORTANTE:** PM-4.1 se genera como parte de la guía, NO como un paso separado post-Phase 2. Los instrumentos de evaluación van DENTRO de la guía del aprendiz.

---

### MOMENTO 4: Achiever's Outputs (Opcionales)

Después de completar la Guía de Aprendizaje, el sistema pregunta al instructor si quiere productos adicionales. Estos son los **Achiever's Outputs** — lo que recibe el aprendiz.

**Pregunta 1: ¿Quiere el texto descriptivo para Canva Deck? (PM-3.3)**
- Output: Texto descriptivo para crear un Canva Deck / PPTX / NotebookLM
- Generación: El PM-3.3 usa los outputs de Phase 2 como insumo
- Gate: Pregunta de confirmación (sí/no)

**Pregunta 2: ¿Quiere el Workbook de Aprendizaje Autónomo? (PM-3.4)**
- Output: Workbook con secciones REINFORCE + EXTEND + PREPARE
- Generación AUTOMÁTICA:
  - Usa PM-2.3 a PM-2.10 como base
  - Toma **2 arquetipos cualquiera por cada PM** (sin gate humano)
- Gate: Pregunta de confirmación (sí/no) — NO hay gate para selección de arquetipos

**Pregunta 3: ¿Quiere el Cuestionario IE-01? (PM-4.2)**
- Output: Cuestionario de evaluación + Answer Key (clave de respuestas al final)
- Generación AUTOMÁTICA:
  - Usa PM-2.3 a PM-2.10 como base
  - Toma **1 arquetipo por cada PM** (sin gate humano)
- Gate: Pregunta de confirmación (sí/no) — NO hay gate para selección de arquetipos

**Notas:**
- Estos 3 productos son OPCIONALES — el instructor puede elegir ninguno, uno, dos o los tres
- PM-3.4 y PM-4.2 son automáticos: no requieren selección de arquetipos por parte del instructor
- Los Achiever's Outputs van dentro de la Guía de Aprendizaje del aprendiz

---

### MOMENTO 5: Instructor's Playbook (Opcional)

Después de los Achiever's Outputs, el sistema pregunta si el instructor quiere los materiales del instructor.

**Pregunta 4: ¿Quiere el Playbook Outline? (PM-3.1)**
- Output: Mapa de sesiones para el instructor
- IMPORTANTE: Los Instrumentos de Evaluación (PM-4.1: Quiz + Checklist + Rúbrica) van DENTRO del Playbook también (además de estar en la LG del aprendiz)
- Gate: Pregunta de confirmación (sí/no)

**Pregunta 5: ¿Quiere el Playbook Build-Out? (PM-3.2)**
- Output: Desarrollo paso a paso de cada sesión
- Dependencia: Requiere PM-3.1 (el Playbook Outline)
- Gate: Pregunta de confirmación (sí/no) — solo se pregunta si PM-3.1 fue generado

**Notas:**
- Estos productos son OPCIONALES
- PM-3.2 depende de PM-3.1 — si el instructor dice NO a PM-3.1, no se pregunta por PM-3.2
- Los instrumentos de evaluación (PM-4.1) se insertan en DOS lugares: la LG del aprendiz Y el Playbook del instructor

---

## 2. CATEGORÍAS DE PRODUCTO

Los outputs se dividen en dos categorías arquitectónicas:

### Achiever's Outputs (lo que recibe el aprendiz)
| Producto | PM | ¿Opcional? | ¿Automático? |
|----------|-----|-----------|--------------|
| Guía de Aprendizaje (9 worksheets) | PM-2.1 a PM-2.10 | No (obligatorio) | No (arquetipos manuales) |
| Instrumentos de Evaluación | PM-4.1 | No (va dentro de la LG) | No |
| Texto para Canva Deck | PM-3.3 | Sí | No |
| Workbook Autónomo | PM-3.4 | Sí | Sí (2 arquetipos/PM) |
| Cuestionario IE-01 + Answer Key | PM-4.2 | Sí | Sí (1 arquetipo/PM) |

### Instructor's Playbook (lo que usa el instructor)
| Producto | PM | ¿Opcional? | ¿Automático? |
|----------|-----|-----------|--------------|
| Playbook Outline (Session Map) | PM-3.1 | Sí | No |
| Playbook Build-Out | PM-3.2 | Sí (requiere PM-3.1) | No |

**Nota:** PM-4.1 vive en AMBAS categorías — se genera una vez y se inserta en la LG del aprendiz Y en el Playbook del instructor.

---

## 3. GATES (HUMAN CHECKPOINTS)

| Gate | Momento | Qué decide el instructor | ¿Obligatorio? |
|------|---------|-------------------------|---------------|
| G0 | Después de PM-1.1 | Selecciona macrotema (de sugeridos o libre) | Sí |
| G1 | Dentro de PM-1.2 | Selecciona textos auténticos (4 Cs) | Sí |
| G2 | Antes de cada PM-2.x | Selecciona arquetipo de actividad | Sí (con perfil auto: opcional) |
| G3 | Después de PM-2.9 | Aprueba mapa de inyección de funciones transversales | Opcional |
| G4 | Después de PM-3.5 | Aprueba diseño de Misión Final | Sí |
| G5 | Después de Validación | Revisa reporte de coherencia | Sí |
| G6 | Antes de Exportación | Revisión final de documentos | Sí |

**Nuevos gates para productos opcionales:**
| Gate | Momento | Qué decide el instructor | ¿Obligatorio? |
|------|---------|-------------------------|---------------|
| G-AO-1 | Después de la LG | ¿Quiere PM-3.3 (Canva)? | Confirmación sí/no |
| G-AO-2 | Después de la LG | ¿Quiere PM-3.4 (Workbook)? | Confirmación sí/no |
| G-AO-3 | Después de la LG | ¿Quiere PM-4.2 (Cuestionario)? | Confirmación sí/no |
| G-IP-1 | Después de Achiever's | ¿Quiere PM-3.1 (Playbook)? | Confirmación sí/no |
| G-IP-2 | Después de PM-3.1 | ¿Quiere PM-3.2 (Build-Out)? | Confirmación sí/no |

---

## 4. ORDEN DE EJECUCIÓN CORREGIDO

```
PM-1.1 [Topic Creation]
  │
  └─▶ G0: Selección de macrotema (obligatorio)
       │
       ▼
PM-1.2 [Setting the Universe]
  │
  └─▶ G1: Selección de textos auténticos (obligatorio)
       │
       ▼
PM-2.1 → G2 → PM-2.2 → G2  [APERTURA]
  │
PM-2.3 → G2 → PM-2.4 → G2 → PM-2.5 → G2  [CONJUNTO A]
  │
PM-2.6 → G2 → PM-2.7 → G2 → PM-2.8 → G2  [CONJUNTO B]
  │
PM-2.9 → G3  [CONJUNTO C — transversal]
PM-2.10 → G2  [CONJUNTO C]
  │
  ▼
PM-4.1 [Instrumentos de Evaluación — DENTRO de la LG]
  │
  ▼
╔═══════════════════════════════════════════════╗
║  PRODUCTO OBLIGATORIO: Guía de Aprendizaje   ║
║  (9 worksheets + PM-4.1)                     ║
╚═══════════════════════════════════════════════╝
  │
  ├──▶ G-AO-1: ¿Quiere Canva Deck? → PM-3.3 (opcional)
  ├──▶ G-AO-2: ¿Quiere Workbook? → PM-3.4 (opcional, automático)
  └──▶ G-AO-3: ¿Quiere Cuestionario? → PM-4.2 (opcional, automático)
  │
  ▼
╔═══════════════════════════════════════════════╗
║  ACHIEVER'S OUTPUTS COMPLETOS                ║
╚═══════════════════════════════════════════════╝
  │
  ├──▶ G-IP-1: ¿Quiere Playbook? → PM-3.1 (opcional)
  │     │
  │     └──▶ G-IP-2: ¿Quiere Build-Out? → PM-3.2 (opcional)
  │
  ▼
╔═══════════════════════════════════════════════╗
║  INSTRUCTOR'S PLAYBOOK COMPLETO (si aplica)  ║
╚═══════════════════════════════════════════════╝
```

---

## 5. REGLAS DE GENERACIÓN AUTOMÁTICA

### PM-3.4 (Workbook Autónomo)
- **Base:** PM-2.3 a PM-2.10 (8 PMs)
- **Arquetipos:** 2 arquetipos cualquiera por cada PM (selección automática, sin gate)
- **Secciones:** REINFORCE + EXTEND + PREPARE
- **Insumo adicional:** Outputs completos de los PMs base

### PM-4.2 (Cuestionario IE-01)
- **Base:** PM-2.3 a PM-2.10 (8 PMs)
- **Arquetipos:** 1 arquetipo por cada PM (selección automática, sin gate)
- **Secciones:** Reading Comprehension + Writing Task + Listening Comprehension + Vocabulary HOTS + Grammar HOTS + Answer Key
- **Insumo adicional:** Outputs completos de los PMs base

### PM-4.1 (Instrumentos de Evaluación)
- **Generación:** Una vez por unidad
- **Inserción:** Se inserta en DOS lugares:
  1. Dentro de la Guía de Aprendizaje del aprendiz
  2. Dentro del Playbook Outline del instructor (si se genera PM-3.1)
- **No es opcional** — siempre se genera como parte de la LG

---

## 6. IMPACTO EN ARCHITECTURA

### Cambios en el Orchestrator
- `resolve_next()` debe manejar PM-1.1 como primer paso
- Nueva lógica de "pregunta después de completar la LG" para Achiever's Outputs
- Nueva lógica de "pregunta después de Achiever's" para Instructor's Playbook
- PM-3.4 y PM-4.2 tienen generación automática (sin gate de arquetipos)
- PM-4.1 se genera como parte de Phase 2, no como paso separado

### Cambios en el State Manager
- Nuevo estado: `waiting_user_confirmation` (diferente de `waiting_human` para gates)
- El RunState debe rastrear qué productos opcionales fueron confirmados
- PM-4.1 output se referencia desde dos lugares (LG y Playbook)

### Cambios en Data Models (SPEC-002)
- Nuevo enum: `ProductCategory` (ACHIEVERS_OUTPUT / INSTRUCTOR_PLAYBOOK)
- Nuevo campo en PMDefinition: `product_category: ProductCategory`
- Nuevo campo en PMDefinition: `optional: bool`
- Nuevo campo en PMDefinition: `auto_generate: bool` (para PM-3.4 y PM-4.2)

### Cambios en el Assembler
- PM-4.1 se inserta en dos ubicaciones (LG del aprendiz + Playbook del instructor)
- Los Achiever's Outputs se ensamblan dentro de la LG
- El Playbook es un ensamble separado (si se confirma)

---

## 7. GAPS RESUMIDOS (del análisis original)

| Gap | Descripción | Estado en FLOW-v2 |
|-----|-------------|-------------------|
| G1 | PM-1.1 no existe como primer paso | Corregido — Momento 1 |
| G2 | Inputs de PM-1.2 diferentes | Corregido — Momento 2 |
| G3 | Estructura de productos invertida | Corregido — Momentos 4-5 |
| G4 | PM-4.1 va DENTRO de la guía | Corregido — Momento 3 |
| G5 | PM-3.3/3.4/4.2 son opcionales | Corregido — Momento 4 |
| G6 | PM-3.4/4.2 son automáticos | Corregido — §5 Reglas |
| G7 | Dos categorías de producto | Corregido — §2 Categorías |
| G8 | Playbook viene después de Achiever's | Corregido — Momento 5 |

---

## 8. PRÓXIMOS PASOS (después de aprobación)

1. Actualizar `pm-registry.json` con:
   - PM-1.1 completo (inputs, outputs, prompt template, G0)
   - Flag `optional` para PM-3.3, PM-3.4, PM-4.2, PM-3.1, PM-3.2
   - Flag `auto_generate` para PM-3.4 y PM-4.2
   - PM-4.1 como parte de Phase 2 (no separado)

2. Actualizar SPEC-001 §3, §5, §6

3. Actualizar SPEC-002 con ProductCategory enum

4. Actualizar SPEC-003 §3, §10 con nuevo orden de ejecución

5. Actualizar DIAGRAMA-MASTER-PROMPTS.html

6. Actualizar orchestrator.py con nueva lógica de resolve_next()

7. Rediseñar frontend basado en flujo conversacional

---

*FLOW-v2: Flujo Corregido — LG Factory Engine*
*Status: PENDING APPROVAL*
*Next action: Esperar aprobación de Sergio antes de tocar SPECs*
