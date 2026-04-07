# PM-3.3: CANVA DECK — VISUAL SUPPORT

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.3 |
| **Nombre** | Canva Deck — Visual Support |
| **Destinatario** | Instructor (presentación visual durante clase) |
| **Función** | Generar la especificación de slides para la presentación Canva que el instructor proyecta durante las sesiones presenciales |
| **Analogía** | Es el "set de iluminación" de la guía — lo que el aprendiz VE mientras el instructor dirige |
| **Herramienta** | Canva (presentación) — se construye manualmente siguiendo la especificación |

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| Playbook Outline (panorama de sesiones + slides asignados) | PM-3.1 |
| Build-Out de cada sesión (qué se muestra en cada momento) | PM-3.2 |
| Worksheets (contenido visual: tablas, diagrams, textos) | PM-2.1 a PM-2.10 |
| Vocabulario, grammar formulas, chunks | PM-1.2, PM-2.5, PM-2.10 |
| Universo narrativo (empresa, personajes, colores) | PM-1.2 |

---

## OUTPUT ESPERADO

Un documento titulado:
**`[PROGRAMA] — GUÍA [#] — [Nombre] — Canva Deck Specification`**

Que contiene la especificación slide por slide para construir la presentación en Canva.

---

## 10 REGLAS DE DISEÑO

### REGLA 1 — UNA PRESENTACIÓN POR GUÍA
Toda la guía usa UNA sola presentación Canva. No hay presentaciones separadas por sesión. Las slides están numeradas secuencialmente (1-38 para una guía de 8 sesiones).

### REGLA 2 — MÁXIMO 7 LÍNEAS DE TEXTO POR SLIDE
Las slides NO son documentos. Son soporte visual. Regla de oro:
- Título: 1 línea
- Contenido: máximo 6 líneas de texto
- Si necesitas más texto → dividir en 2 slides

### REGLA 3 — DISEÑO CONSISTENTE
Todas las slides usan la misma plantilla:
- Fondo: blanco o color claro institucional
- Título: misma fuente, mismo tamaño, mismo color (azul oscuro #1F3A5F)
- Texto: misma fuente (Calibri o similar), tamaño legible desde el fondo del salón (≥24pt para texto, ≥36pt para títulos)
- Colores de acento: máximo 2 (azul #4472C4 + verde #2E7D32)
- Logo SENA en esquina inferior derecha (todas las slides)

### REGLA 4 — SLIDES DE ACTIVIDAD INCLUEN INSTRUCCIONES
Cada slide que corresponde a una actividad del worksheet incluye:
- El nombre de la actividad
- Las instrucciones CLAVE en inglés (las mismas que dice el instructor)
- El tiempo asignado
- La agrupación (Individual / Pairs / Groups / Plenary)

### REGLA 5 — SLIDES DE VOCABULARIO USAN FORMATO VISUAL
Las slides de vocabulario NO son listas de texto. Usan:
- Tablas con categorías (Input/Output/Internal/Storage)
- Imágenes de componentes cuando sea posible
- Color coding por categoría

### REGLA 6 — SLIDES DE GRAMMAR MUESTRAN LA FÓRMULA
Las slides de grammar muestran la fórmula con código de color:
- Estructura en negro
- Ejemplo en azul
- Palabra clave (is/has/demonstrative) en verde o resaltada

### REGLA 7 — SLIDES DE LISTENING SON MÍNIMAS
Durante el listening, la pantalla muestra SOLO:
- El número de la escucha (Listen 1, Listen 2, Listen 3)
- La pregunta guía (gist o detail)
- NADA de texto largo que distraiga del audio

### REGLA 8 — TRANSICIONES ENTRE SESIONES
La primera slide de cada sesión es una "slide de título" con:
- Número de sesión
- Nombre comunicativo
- Objetivo en 1 línea
- Fondo de color diferente al resto de la sesión (para marcar el inicio)

### REGLA 9 — SLIDES DE CIERRE
La última slide de cada sesión muestra:
- Exit Ticket instruction
- Trabajo autónomo asignado
- Preview de la siguiente sesión

### REGLA 10 — ACCESIBILIDAD
- Contraste alto entre texto y fondo (texto oscuro en fondo claro)
- Fuente sans-serif (Calibri, Arial, Open Sans)
- Tamaño mínimo 24pt para texto legible desde el fondo del salón
- Sin texto en imágenes (siempre texto editable como capa separada)

---

## PROMPT PARA IA

```
Eres un diseñador de presentaciones para formación presencial. Tu tarea: generar la ESPECIFICACIÓN SLIDE POR SLIDE de la presentación Canva que el instructor proyecta durante una guía de aprendizaje.

### DATOS DE ENTRADA:
- Playbook Outline (qué slides hay por sesión)
- Build-Out de cada sesión (qué se muestra en cada momento)
- Contenido de los worksheets

### INSTRUCCIONES:
Para CADA slide genera:

#### SLIDE [#]: [TÍTULO]
**Session:** [#]
**Momento:** [SET-UP / WHILE / WRAP-UP]
**Actividad:** [qué actividad del Build-Out soporta]

**Contenido:**
[texto exacto, tablas, instrucciones que van en la slide]

**Layout:** [title / content / split / table / image / blank]

**Design Notes:**
[colores, énfasis, imágenes sugeridas]

### RESTRICCIONES:
- Usa Micro-Cápsulas visuales para tips: `> ⚠️ **Safety/Grammar Rule:**` o `> 🎧 **Audio Cue:**` (diseña como manual de supervivencia ágil, no como libro de texto).
- Máximo 7 líneas de texto por slide
- Diseño consistente en toda la presentación
- Contraste alto, fuente ≥24pt
- Slides de listening: mínimo contenido
```

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-3.1 | Panorama de sesiones + slides asignados |
| **Depende de** | PM-3.2 | Qué se muestra en cada momento de cada sesión |
| **Depende de** | PM-2.x | Contenido visual de los worksheets |
| **Alimenta a** | Instructor | Presentación visual durante clase |

---

*PM-3.3: Canva Deck — Visual Support*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
