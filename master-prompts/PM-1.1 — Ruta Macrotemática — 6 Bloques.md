# PM-1.1: RUTA MACROTEMÁTICA — 6 BLOQUES
## Fase 1 · Análisis | Sistema de Prompts Maestros — LG Factory
## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-1.1 |
| **Nombre** | Ruta Macrotemática (6 Bloques) |
| **Fase** | 1. Análisis |
| **Ubicación en la Guía** | Pre-guía — arquitectura macro del programa |
| **Tipo de Evidencia SENA** | N/A (herramienta de diseño curricular) |
| **Instrumento** | Ruta macro-temática con 6 bloques |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Diseño curricular del programa (PDF de Sofía Plus) | Instructor |
| Nombre del programa y código | Instructor |
| Competencias y RAPs del programa | Sofía Plus |
| Duración total del programa (horas) | Sofía Plus |
| Tipo de programa | Instructor (Técnico ≈180h / Tecnológico ≈350h) |

---

## OUTPUT ESPERADO

Un documento titulado:
**`[PROGRAMA] — Ruta Macrotemática (6 Bloques)`**

Que contiene:
1. Nombre del programa, código, nivel CEFR, duración total
2. 6 bloques temáticos con nombre ESP/industrial
3. Justificación pedagógica de cada bloque
4. Nivel de dificultad relativo por bloque
5. Secuencia lógica (orden pedagógico sugerido)

---

## 6 REGLAS DE DISEÑO

### REGLA 1 — 6 BLOQUES, NO MÁS, NO MENOS
El programa se divide exactamente en 6 macro-temáticas. Cada bloque corresponde a un área técnica del programa y se convierte en una Guía de Aprendizaje individual.

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
Los 6 bloques deben seguir un orden pedagógico coherente:
- Del conocimiento fundamental al complejo
- De lo receptivo a lo productivo
- De lo general a lo específico del oficio

### REGLA 5 — NIVEL CEFR PROGRESIVO
El primer bloque parte de A1.1 (lo más básico). Los bloques pueden escalar progresivamente dentro del rango A1.1-A1.2, o mantenerse al mismo nivel según la naturaleza del contenido.

### REGLA 6 — COBERTURA DEL DISEÑO CURRICULAR
Los 6 bloques deben cubrir la totalidad de las competencias y RAPs del programa. Ninguna competencia del diseño curricular puede quedar sin representación en al menos un bloque.

---

## FORMATO DE SALIDA

```
[PROGRAMA] — RUTA MACROTEMÁTICA

Programa: [Nombre y código]
Tipo: [Técnico / Tecnológico]
Duración total: [X] horas
Nivel CEFR: A1.1 — A1.2
Guías totales: 6

| # | Nombre del Bloque (ESP) | Tema Técnico Principal | Justificación | Nivel CEFR |
|---|------------------------|----------------------|---------------|------------|
| 1 |                        |                      |               |            |
| 2 |                        |                      |               |            |
| 3 |                        |                      |               |            |
| 4 |                        |                      |               |            |
| 5 |                        |                      |               |            |
| 6 |                        |                      |               |            |

PROYECTO FORMATIVO ARTICULADOR:
[Descripción breve de cómo las 6 guías se conectan como fases de un proyecto real]
```

---

## PROMPT PARA IA

```
Eres un diseñador curricular experto en ESP (English for Specific Programs) y Formación Profesional Integral (FPI) para el SENA, Colombia.

Tu tarea: Generar la RUTA MACROTEMÁTICA de 6 bloques para un programa técnico o tecnológico del SENA.

### DATOS DE ENTRADA (el instructor proporciona):
- Programa: [nombre y código del programa SENA]
- Tipo: [Técnico (≈180h) / Tecnológico (≈350h)]
- Competencias del programa: [copia literal de las competencias del diseño curricular]
- RAPs del programa: [copia literal de los resultados de aprendizaje]
- Temas técnicos principales: [lista de temas técnicos del diseño curricular]

### INSTRUCCIONES DE GENERACIÓN:

1. Analiza las competencias, RAPs y temas técnicos del programa.

2. Organiza el programa en EXACTAMENTE 6 macro-temáticas (bloques) que:
   - Cubran TODAS las competencias del programa
   - Sigan una secuencia pedagógica lógica (de lo fundamental a lo complejo)
   - Sean motivacionales y orientadas al mundo laboral real

3. Para cada bloque, genera:
   - Nombre del bloque en ESP (en inglés, estilo industrial/profesional)
   - Tema técnico principal (en español, descriptivo)
   - Justificación pedagógica (2-3 líneas: por qué es esencial, cómo se conecta, qué competencia ESP desarrolla)
   - Nivel CEFR sugerido (A1.1 o A1.2, con posibilidad de escalar)

4. Genera una descripción del PROYECTO FORMATIVO ARTICULADOR que conecte las 6 guías como fases de un proyecto real del oficio.

### RESTRICCIONES:
- Exactamente 6 bloques
- Nombres en inglés profesional (no traducciones literales)
- Justificaciones en español
- Nivel CEFR: A1.1 — A1.2 (rango SENA estándar)
- Coherencia con el diseño curricular oficial de Sofía Plus
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

*PM-1.1: Ruta Macrotemática — 6 Bloques*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
