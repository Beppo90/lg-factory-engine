# PM-3.3: VISUAL AID GENERATOR — STUDENT-FACING (TOOL-AGNOSTIC)

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.3 |
| **Nombre** | Visual Aid Generator — Student-Facing Markdown (tool-agnostic) |
| **Versión** | 3.0 |
| **Last Verified** | 2026-04-30 |
| **Destinatario** | Aprendiz (apoyo visual ilustrativo de cada actividad/evidencia · STUDENT-FACING) |
| **Función** | Generar `pm-3-3.md` — un único archivo Markdown estructurado · 1 sección por actividad · tool-agnostic input para Claude Design / PPTX / Canva / NotebookLM / cualquier herramienta visual |
| **Analogía** | Es el "guion visual" de la guía — descripciones narrativas + design constraints que cualquier herramienta puede interpretar |
| **Herramienta de consumo** | Cualquier · Claude Design · PPTX · Canva · NotebookLM · etc. (output es 100% portable) |
| **Phase** | 4 |
| **Depends On** | [PM-0, PM-1.2, PM-2.x ACs, PM-3.1, PM-3.2, PM-3.5, PM-3.6] |
| **Trigger** | post_playbook_confirmation (Gate 3 cerrado) |
| **Fuente de verdad** | `pm-3-3.md` (single source of truth · NO hay spec.json intermedio) |

> [!warning] Cambio paradigmático v3.0 (2026-04-30) · Sergio Cortés
> PM-3.3 ya NO produce `.pptx` ni `pm-3-3-spec.json`. Output es UN solo archivo Markdown student-facing
> tool-agnostic. La herramienta de consumo (Claude Design · Canva · PPTX · NotebookLM · cualquier otra)
> ES el renderer. Todo el contenido v2.x sobre `pm-3-3-spec.json` + `pm-3-3-gen.js` + paleta hardcoded
> queda DEPRECATED · permanece como referencia legacy (NO eliminar para programas pre-2026-04 que ya
> consumieron v2.4). Programas nuevos generan con v3.0 strict.

---

## CAMBIO v2.0 — MOVIDO A FASE 4

> [!info] Cambio v2.0 (2026-04-13)
> PM-3.3 se movió de Fase 3 a **Fase 4**. El Canva Deck ahora se genera DESPUÉS de que el Instructor's Playbook esté completo (PM-3.1 + PM-3.2), usando el Playbook como fuente de verdad del contenido visual. Requiere confirmación post-Playbook.

---

## INPUT REQUERIDO

| Input | Fuente |
|-------|--------|
| **Playbook Build-Out completo (todas las sesiones)** | **PM-3.2** |
| Playbook Outline (panorama de sesiones + slides asignados) | PM-3.1 |
| Vocabulario, grammar formulas, chunks | PM-1.2, PM-2.5, PM-2.10 |
| Universo narrativo (empresa, personajes, colores) | PM-1.2 |

---

## OUTPUT ESPERADO

Un run de PM-3.3 produce **dos artefactos obligatorios**:

1. **`pm-3-3-spec.json`** — el contrato de datos canónico (ver §11.0). Es la fuente de verdad. Se versiona y se audita.
2. **`[PROGRAMA] — GUÍA [#] — [Nombre] — Canva Deck.pptx`** — el render del spec generado por `pm-3-3-gen.js`. Es un artefacto derivado y reproducible.

Si solo existe el PPTX pero no el spec → el run es **inválido** (no reproducible, no auditable).
Si solo existe el spec pero no el PPTX → el run está incompleto (falta el render).

**Carpeta esperada dentro de `runs/[RUN-ID]/`:**
```
pm-3-3-spec.json          ← contrato de datos (canónico)
pm-3-3-deck.pptx          ← render derivado
scripts/pm-3-3-gen.js     ← renderer puro (sin contenido hardcodeado)
```

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

## §11 — SISTEMA DE DISEÑO CANÓNICO

> [!important] Estado del script — pm-3-3-gen.js (v2.4, 2026-04-20)
> **Hardcoding PROHIBIDO.** Desde v2.4, `pm-3-3-gen.js` DEBE leer **exclusivamente** desde `pm-3-3-spec.json`. No se acepta literal de paleta, personajes, Toolbelt o funciones comunicativas embebido en el script. El script se limita a:
>
> 1. Cargar `pm-3-3-spec.json` desde la carpeta del run.
> 2. Validar el spec contra el schema declarado en §11.0 (abajo).
> 3. Iterar `slides[]` y renderizar cada slide según su `type` + `content`.
> 4. Aplicar `design_tokens` (paleta + tipografía) leídos del spec.
>
> **Resolución de la deuda técnica v2.1 → v2.4:** Esta sección §11 documenta tanto el schema del spec (§11.0) como los valores canónicos por dominio; la separación entre "patrón universal" y "ejemplo de referencia DIESEL G1" sigue vigente, pero ahora como valores DE DATOS que viven en el spec, no en el código.

---

### §11.0 — CONTRATO DEL ARCHIVO `pm-3-3-spec.json` (v2.4 — obligatorio)

**Regla de oro:** Toda guía produce su propio `pm-3-3-spec.json` en `runs/[RUN-ID]/pm-3-3-spec.json`. El script `pm-3-3-gen.js` es un renderer puro — no contiene contenido pedagógico.

**Schema mínimo obligatorio:**

```json
{
  "spec_version": "2.4",
  "run_id": "DIESEL-2026-04-15-G1",
  "program": {
    "code": "...",
    "name": "Mantenimiento de Motores Diesel",
    "guide_number": 1,
    "guide_name": "The Workshop Specialist",
    "cefr_level": "A1.1",
    "total_sessions": 8
  },

  "design_tokens": {
    "palette": {
      "dark":    "#1C2B3C",
      "mid":     "#243447",
      "orange":  "#F59316",
      "white":   "#FFFFFF",
      "offwhite":"#F3F5F7",
      "steel":   "#8A9DB5",
      "light":   "#D6E0EA",
      "sky":     "#0EA5E9",
      "green":   "#22C55E",
      "purple":  "#A855F7",
      "red":     "#E84545",
      "text":    "#1A2535"
    },
    "typography": {
      "display":   "Arial Black",
      "subtitle":  "Georgia Italic",
      "body":      "Calibri",
      "min_body_pt":   20,
      "min_title_pt":  28
    },
    "motif": {
      "left_bar_color": "#F59316",
      "left_bar_width_in": 0.22,
      "bottom_strip": true
    }
  },

  "narrative_universe": {
    "scenario":  "The Diesel Workshop — Bay 2, Monday 7:00 AM",
    "characters": [
      { "role": "authority", "name": "CARLOS MENDOZA", "title": "Workshop Supervisor", "sessions": [1,2,3,4,5,6,7,8] },
      { "role": "apprentice","name": "VALENTINA CRUZ","title": "Apprentice Technician","sessions": [1,2,3,4,5,6,7,8] },
      { "role": "peer_expert","name": "SANTIAGO RÍOS","title": "Senior Technician",    "sessions": [4,5,7,8] }
    ]
  },

  "toolbelt": {
    "total_terms": 20,
    "categories": [
      { "name": "ENVIRONMENT",        "color_token": "sky",    "terms": ["bay","workshop","floor drain","workbench"] },
      { "name": "TOOLS & EQUIPMENT",  "color_token": "orange", "terms": ["torque wrench","floor jack","socket set","pressure gauge"] },
      { "name": "SAFETY",             "color_token": "red",    "terms": ["fire extinguisher","PPE","safety goggles","hazard cone"] },
      { "name": "MAINTENANCE",        "color_token": "green",  "terms": ["preventive maintenance","calibration","lubrication","inspection"] },
      { "name": "DOCUMENTS",          "color_token": "purple", "terms": ["work order","inspection checklist","service log","parts list"] }
    ]
  },

  "language_functions": [
    { "id": "F1", "type": "instruct", "structures": ["Check the _.", "Make sure the _.", "Don't forget to _."] },
    { "id": "F2", "type": "request",  "structures": ["Can I have the _?", "I need the _ to _.", "Where is the _?"] },
    { "id": "F3", "type": "report",   "structures": ["Bay _ is ready / not ready.", "The _ shows _.", "I found a problem with _."] },
    { "id": "F4", "type": "assign",   "structures": ["Your job is to _.", "[Name], you're in charge of _."] },
    { "id": "F5", "type": "confirm",  "structures": ["Got it.", "Understood.", "So, I need to _? Is that right?"] }
  ],

  "slides": [
    {
      "number": 1,
      "session": null,
      "type": "title",
      "momento": null,
      "title": "The Workshop Specialist",
      "subtitle": "Guía 1 — Mantenimiento de Motores Diesel",
      "layout": "title",
      "design_notes": "Fondo dark, barra naranja izquierda, logo SENA"
    },
    {
      "number": 5,
      "session": 1,
      "type": "session_opener",
      "momento": "SET-UP",
      "title": "SESSION 1 — Meet the Workshop",
      "objective_one_line": "Identify Bay 2 safety zones and the morning briefing routine",
      "layout": "title_dark",
      "design_notes": "Fondo oscuro, marca inicio de sesión"
    }
    /* ...resto de slides (38–46 por guía de 8 sesiones)... */
  ],

  "counts_validation": {
    "total_slides_min": 38,
    "total_slides_max": 46,
    "session_openers": 8,
    "setup_warmups":   8,
    "wrapups":         8,
    "evaluation_slides_min": 5
  }
}
```

**Reglas de validación del spec (ejecutadas antes de renderizar):**

1. `spec_version` presente y = "2.4".
2. `design_tokens.palette` contiene las 12 claves canónicas listadas en §11.1.
3. `toolbelt.total_terms == 20` y cada categoría tiene exactamente 4 términos.
4. `language_functions[].type ∈ {instruct, request, report, assign, confirm}`.
5. `narrative_universe.characters` incluye al menos los 3 arque-roles (authority, apprentice, peer_expert).
6. `slides[].number` es secuencial 1..N sin saltos ni duplicados.
7. `slides[].type ∈ {title, program_at_glance, narrative, toolbelt, session_opener, setup_warmup, while_activity, wrapup, evaluation}`.
8. Conteo de slides cumple `counts_validation` (rango 38–46 para 8 sesiones).
9. **Uniqueness (paralelo a CHECK 9 del DOCUMENTO MAESTRO §10):** `narrative_universe`, `toolbelt`, `language_functions` NO son byte-idénticos (SHA256 canonical JSON sin `run_id`) al spec de ninguna guía previa del mismo programa.
10. Todos los `color_token` referenciados en slides existen en `design_tokens.palette`.

**Fallo de cualquier regla → el generador NO renderiza** y emite un reporte de validación al run. El spec debe corregirse antes de regenerar el PPTX.

---

> [!warning] AVISO PARA EL LLM — Cómo leer esta sección
> Los elementos marcados como **"Referencia DIESEL G1"** son INSTANCIAS CONCRETAS de un programa específico (Mantenimiento de Motores Diesel, Guía 1). Son **ejemplos de referencia de implementación**, NO plantillas a copiar.
>
> Al diseñar un nuevo programa, el LLM debe:
> 1. Extraer el **PATRÓN UNIVERSAL** descrito en cada sección (roles, categorías, tipos funcionales).
> 2. **Ignorar los valores concretos** (nombres de personajes, términos del toolbelt, estructuras lingüísticas específicas del diesel).
> 3. Generar valores nuevos apropiados para el dominio técnico del nuevo programa.
>
> Copiar directamente "Carlos Mendoza", "torque wrench" o "Bay 2" para un programa de Salud Ocupacional o Contabilidad sería una **alucinación de contexto**. El ejemplo G1 ilustra la estructura, no el contenido.

---

### §11.1 — PALETA DE MARCA Y TIPOGRAFÍA

La paleta de diseño del deck es parte del sistema de identidad FPI SENA Factory:

| Token | Hex | Uso |
|-------|-----|-----|
| `dark` / navy | `#1C2B3C` | Fondo slides oscuras, headers, bordes dominantes |
| `mid` | `#243447` | Cards en fondos oscuros |
| `orange` | `#F59316` | Acento principal, CTAs, strip inferior, líneas divisoras |
| `white` | `#FFFFFF` | Texto sobre fondos oscuros |
| `offwhite` | `#F3F5F7` | Fondo de slides de contenido |
| `steel` | `#8A9DB5` | Captions, texto secundario |
| `light` | `#D6E0EA` | Texto body sobre fondos oscuros |
| `sky` | `#0EA5E9` | Color de habilidad Reading / Listening |
| `green` | `#22C55E` | Color de habilidad Writing |
| `purple` | `#A855F7` | Color de habilidad Language Functions |
| `red` | `#E84545` | Color de habilidad Speaking / Alert |
| `text` | `#1A2535` | Texto oscuro sobre fondos claros |

**Tipografía:**
- Títulos principales: `Arial Black` (display, bold)
- Subtítulos / texto de cuadros: `Georgia` italic
- Cuerpo: `Calibri` regular
- Tamaño mínimo legible desde el fondo del salón: **20pt** (Calibri body), **28pt** (títulos de sección)

**Motivo visual recurrente:** Barra vertical naranja izquierda (`w: 0.22"`, full height) en todas las slides con fondo oscuro. Strip naranja inferior en slides de contenido.

---

### §11.2 — UNIVERSO NARRATIVO Y PERSONAJES

**Patrón universal:** Toda guía G tiene un universo narrativo anclado a su sector productivo. El escenario, los personajes y el momento del día son específicos al programa y deben derivarse del RAP y del perfil del aprendiz — no reutilizarse de otra guía.

**Arquitectura de 3 arque-roles (universal):**

| Arque-rol | Función pedagógica | Funciones comunicativas que modela |
|-----------|-------------------|-------------------------------------|
| **AUTORIDAD LABORAL** | Representa al supervisor/jefe real del sector | F1 (dar instrucciones), F4 (asignar tareas) |
| **APRENDIZ** | Personaje de identificación del estudiante | F2 (solicitar), F3 (reportar), F5 (confirmar) |
| **PAR EXPERTO** | Puente novice→expert, modelo lingüístico avanzado | F1, F3, F4 según contexto |

> **Ejemplo de referencia — DIESEL G1 (NO copiar para otros programas):**
> - Escenario: *The Diesel Workshop — Bay 2, Monday 7:00 AM*
> - Autoridad laboral: *CARLOS MENDOZA — Workshop Supervisor* (presente S1–S8)
> - Aprendiz: *VALENTINA CRUZ — Apprentice Technician* (presente S1–S8)
> - Par experto: *SANTIAGO RÍOS — Senior Technician* (presente S4, S5, S7, S8)

**Al diseñar un nuevo programa:** definir escenario (lugar + hora + contexto), nombrar los 3 personajes con nombres apropiados al perfil sociodemográfico del sector, y asignar sus funciones según el RAP.

---

### §11.3 — TOOLBELT: SISTEMA DE 20 TÉRMINOS EN 5 CATEGORÍAS

**Patrón universal:** El Toolbelt es el vocabulario operativo de la guía — exactamente **20 términos** (4 por categoría × 5 categorías). Las 5 categorías son conceptuales y se adaptan al dominio del programa; los términos son 100% específicos al sector técnico.

**Estructura canónica de categorías:**

| Categoría conceptual | Color asignado | Qué incluye |
|---------------------|---------------|-------------|
| ENVIRONMENT | `sky #0EA5E9` | Espacios físicos y zonas del entorno laboral |
| TOOLS & EQUIPMENT | `orange #F59316` | Herramientas, instrumentos y equipos del sector |
| SAFETY | `red #E84545` | Elementos de seguridad, EPP, señalización |
| MAINTENANCE / PROCESS | `green #22C55E` | Procedimientos, procesos y tareas técnicas del RAP |
| DOCUMENTS | `purple #A855F7` | Formatos, registros y documentos del sector |

**Reglas del Toolbelt (universales):**
- Exactamente **20 términos** (4 por categoría × 5 categorías). Ni más ni menos.
- Los colores de categoría corresponden a los colores de habilidades del deck (consistencia visual).
- El Word Wall físico en el aula replica estas 5 categorías (tarjetas de colores).
- El Toolbelt aparece en S2 (setup), S3 (grammar), S4 (speaking), S5 (functions), S8 (final mission).

> **Ejemplo de referencia — DIESEL G1 (NO usar en otros programas):**
> ENVIRONMENT: bay · workshop · floor drain · workbench · overhead lift
> TOOLS & EQUIPMENT: torque wrench · floor jack · socket set · oil drain pan · pressure gauge
> SAFETY: fire extinguisher · PPE · safety goggles · spill kit · hazard cone
> MAINTENANCE: preventive maintenance · calibration · lubrication · inspection · filter replacement
> DOCUMENTS: work order · inspection checklist · service log · parts list · daily report

**Al diseñar un nuevo programa:** seleccionar 20 términos del vocabulario real del RAP, distribuirlos en las 5 categorías según el dominio, y verificar que sean los términos que el aprendiz necesita usar en su entorno laboral real. Las categorías pueden renombrarse si el sector lo requiere (e.g., "PROCEDURES" en lugar de "MAINTENANCE" para un programa de Salud Ocupacional).

---

### §11.4 — FUNCIONES COMUNICATIVAS F1-F5

**Patrón universal:** Toda guía define entre 4 y 6 funciones comunicativas transversales que articulan las necesidades reales del puesto de trabajo. Los **tipos funcionales** son universales (instruct / request / report / assign / confirm); las **estructuras lingüísticas** son específicas al registro del sector.

**Arquitectura funcional universal (F1-F5):**

| Función | Tipo funcional | Descripción |
|---------|---------------|-------------|
| **F1** | Dar instrucciones / comandos | El supervisor o experto dirige la acción |
| **F2** | Solicitar herramientas / información / materiales | El aprendiz pide lo que necesita |
| **F3** | Reportar estado / hallazgos / novedades | El técnico informa resultados al supervisor |
| **F4** | Asignar tareas / roles / responsabilidades | El líder distribuye el trabajo |
| **F5** | Confirmar comprensión / acuerdo | El aprendiz verifica que entendió correctamente |

**Principio de progresión funcional (universal):**
- S1–S2: Exposición pasiva (funciones en textos y audio)
- S3–S4: Práctica controlada (drills por función)
- S5: Práctica integrada (simulación con todas las funciones en secuencia)
- S7–S8: Transferencia (performance autónoma en contexto evaluado)

> **Ejemplo de referencia — DIESEL G1 (estructuras específicas del taller diesel, NO copiar para otros programas):**
> F1: *"Check the _. Make sure the _. Don't forget to _."* (imperativo técnico)
> F2: *"Can I have the _? I need the _ to _. Where is the _?"* (solicitud de herramientas)
> F3: *"Bay _ is ready / not ready. The _ shows _. I found a problem with _."* (reporte de estado)
> F4: *"Your job is to _. [Name], you're in charge of _."* (asignación de roles en taller)
> F5: *"Got it. Understood. So, I need to _? Is that right?"* (confirmación en contexto oral)

**Al diseñar un nuevo programa:** derivar las estructuras lingüísticas del RAP, del vocabulario del Toolbelt y del tipo de comunicación real del sector. Un programa de Salud Ocupacional tendrá estructuras como *"The patient presents _"*, *"Apply _ to the _"*, *"The procedure requires _"* — distintas en registro y léxico pero idénticas en tipo funcional.

---

### §11.5 — TIPOS DE SLIDES Y CONTEO CANÓNICO

Para una guía de 8 sesiones, el deck tiene entre **38-46 slides**. Estructura canónica:

| Tipo de slide | Cantidad | Cuándo |
|---------------|----------|--------|
| Título del deck | 1 | Slide 1 |
| Program at a Glance | 1 | Slide 2 |
| Narrative Universe / Characters | 1 | Slide 3 |
| Toolbelt (20 términos) | 1 | Slide 4 |
| Por sesión: título de sesión (fondo oscuro) | 1 por sesión = 8 | Inicio de cada sesión |
| Por sesión: SET-UP warm-up | 1 por sesión = 8 | SET-UP |
| Por sesión: actividad WHILE (1-3 por sesión) | 2-3 por sesión ≈ 20 | WHILE A-D |
| Por sesión: WRAP-UP + exit ticket | 1 por sesión = 8 | WRAP-UP |
| Instrumento de evaluación (por evidencia) | 1 por evidencia ≈ 6 | S2/S3/S4/S5/S6/S8 |

**Nota sobre pm-3-3-spec.json (v2.4):** El archivo `pm-3-3-spec.json` es ahora la **única fuente de verdad** del deck. `pm-3-3-gen.js` lo lee, valida contra §11.0 y renderiza. No hay contenido pedagógico hardcodeado en el script. Cada guía tiene su propio spec (no se reutiliza entre guías — aplica la regla de universo original del DOCUMENTO MAESTRO v2.3 §10).

---

## RELACIÓN CON OTROS PROMPTS

| Relación | Prompt | Descripción |
|----------|--------|-------------|
| **Depende de** | PM-3.1 | Panorama de sesiones + slides asignados |
| **Depende de** | PM-3.2 | Qué se muestra en cada momento de cada sesión |
| **Depende de** | PM-2.x | Contenido visual de los worksheets |
| **Alimenta a** | Instructor | Presentación visual durante clase |

---

*PM-3.3 v2.4: Canva Deck — Visual Support (legacy · pre-2026-04)*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Versión 2.4 — 2026-04-20 (spec-driven: `pm-3-3-spec.json` único input del generador)*
*Instructor Sergio Cortés Perdomo · Marzo 2026*

---

## EXTENSIÓN v3.0 — VISUAL AID GENERATOR · STUDENT-FACING · TOOL-AGNOSTIC (2026-04-30)

> [!warning] Decisión arquitectónica · Sergio Cortés (2026-04-30)
>
> **Trigger:** Sergio rediseñó el rol de PM-3.3. Ya NO es un Canva/PPTX deck para instructor durante clase.
> Ahora es un **archivo Markdown student-facing** que el aprendiz (o el instructor) lleva a cualquier
> herramienta visual (Claude Design · PPTX · Canva · NotebookLM · etc.) para generar la herramienta
> didáctica de apoyo visual a cada actividad/evidencia.
>
> **Decisión:** v3.0 es CANON OFICIAL · v2.4 (Canva Deck instructor-facing PPTX) permanece como reference
> legacy. Programas nuevos generan con v3.0 strict.
>
> **Camino arquitectónico:** Camino 2 puro LLM. NO hay renderer Python. La herramienta visual externa
> (Claude Design · etc.) ES el renderer. PM-3.3 v3.0 produce UN solo `.md` estructurado · listo para
> copy-paste a cualquier tool.

### REGLA 11 — OUTPUT PARADIGM v3.0 · UN SOLO `.md` STUDENT-FACING

| Aspecto | v2.4 Canva Deck (legacy) | v3.0 Visual Aid (canon) |
|---|---|---|
| Output | `pm-3-3-spec.json` + `.pptx` | **`pm-3-3.md` único** |
| Destinatario | Instructor (durante clase) | **Aprendiz (apoyo visual)** |
| Renderer | `pm-3-3-gen.js` (pptxgenjs) | **Claude Design / PPTX / Canva / NotebookLM** (externo · agnóstico) |
| Granularidad | 1 deck con 45 slides | **1 .md con N secciones · 1 per actividad** |
| Hardcoding | paleta + diseño en JS | **NO hardcoding tool-locked · solo design constraints universales** |
| Stack alignment | Híbrido (LLM spec + JS render) | **Camino 2 puro LLM** (sin renderer Python) |

### REGLA 12 — ESTRUCTURA POR ACTIVIDAD · 7 SECCIONES CANÓNICAS

Cada actividad/evidencia en el `.md` tiene 7 secciones obligatorias en este orden:

```markdown
## Actividad [actividad_id] — [titulo_es] / [titulo_en]

### 1. IDENTIFICACIÓN
- Sesión: S[N] · Momento pedagógico: [reflexion / contextualizacion / apropiacion / evaluacion / transferencia]
- Tiempo estimado: [N min] · Agrupación: [individual / parejas / grupos / pleno]
- Tipo SENA: [Actividad cognitiva / procedimental / actitudinal] (o combinación)
- Scaffold canónico v2.7: [matching / checklist / form / t_chart / writing_template / listening_capture / quiz_preview / speaking_script / reflection_lines / rating]
- Evidencia formal: [E1-E6 si aplica · NO si es práctica]

### 2. CONCEPTO VISUAL (idea fuerte)
- **Hero idea**: la imagen mental que el aprendiz debe quedarse después
- **Tono / mood**: energético / concentrado / reflexivo / urgente / colaborativo
- **Anclaje narrativo**: cómo conecta con el universo de la guía (personajes · escenarios · vocabulario propio)

### 3. BLOQUES DE CONTENIDO
- **Headline** (1 línea fuerte · titular del visual)
- **Subhead** (contexto breve · 1-2 líneas)
- **Body** (instrucciones / ejemplos / bullets concretos)
- **Call-to-action** (qué hace el aprendiz · verbo + objeto + resultado)

### 4. LAYOUT DEL SCAFFOLD (wireframe textual · NO pixels)
- **Tipo de scaffold**: [matching / form / etc.]
- **Regiones del workspace**:
  - Izquierda / centro / derecha / superior / inferior
  - Cada región describe: qué contiene · cómo se interactúa
- **Interacción esperada**: drag · fill · click · annotate · grabar · etc.
- **Estado inicial vs estado final**: qué ve antes · qué ve después de completar

### 5. EVIDENCIA & RÚBRICA VISIBLE
- **Producto observable**: qué entrega el aprendiz tangiblemente
- **Criterio mínimo**: cuál es el umbral de "completado"
- **Rúbrica visible al aprendiz**: 2-4 criterios que él mismo puede verificar
- **Conexión con instrumento**: PM-4.1 INST-X / PM-4.2 cuestionario S[N]

### 6. RESTRICCIONES DE DISEÑO (cross-tool coherence)
- **Paleta SENA institucional**: verde `#39A900` (acento) · azul oscuro `#0B2E45` (titular) · neutros (white · light grey)
- **Universo narrativo de ESTA guía**: derivado de pm-1-2.universo_narrativo (personajes · lugares · vocabulario · sector económico)
- **Imagery guidance**: real photos · contexto laboral profesional · NO cartoon ni infantil
- **Iconografía**: technical · adult · adecuada al sector
- **Jerarquía tipográfica**: heading > body > caption (sin pixels específicos · solo orden)

### 7. PROMPT DE GENERACIÓN (frase narrativa para tool)
> "Diseña un [tipo de visual] student-facing donde [acción del aprendiz].
> Usa la paleta SENA con [color] como acento principal.
> Incluye [elemento del universo narrativo de la guía].
> La sensación debe ser [tono] y el resultado debe permitir [evidencia esperada]."
```

### REGLA 13 — DESIGN CONSTRAINTS DISCIPLINADOS · UNIVERSAL vs TOOL-LOCKED

**SÍ incluir** (cross-tool universal · garantiza coherence visual):
- Paleta hex codes (`#39A900` · `#0B2E45` · accents)
- Universo narrativo dinámico extraído de `pm-1-2.universo_narrativo` (NO hardcoded por programa)
- Imagery guidance principios (real · profesional · contexto laboral · NO infantil)
- Iconografía tone (technical · adult · sector-adecuada)
- Jerarquía tipográfica (heading · body · caption · sin pixels)
- Mood/tone narrativo (concentrado · energético · etc.)

**NO incluir** (tool-locked · rompe agnosticidad):
- Dimensiones específicas ("Calibri 24pt" PPTX-only · "Inter 16px" Claude Design-only)
- Schema-specific keys (Canva element types · Claude Design components · Slidev frontmatter)
- Slide layout names (LAYOUT_16x9 pptxgenjs-only · CSS classes Tailwind-only)
- Animation/transition specs (PPTX-only · Reveal.js-only)
- Tool-specific markdown extensions (NotebookLM `[!callout]` · MDX `<Component/>`)

### REGLA 14 — UNIVERSO DINÁMICO POR GUÍA (NO hardcoded)

El subagente PM-3.3 v3.0 lee `pm-1-2.json` de cada guía y extrae automáticamente el universo narrativo
para inyectarlo como design constraint en cada bloque visual. NUNCA hardcoded.

Ejemplos de universos detectados:
- **IMARPOR-CC** (marítimo portuario): Diego · Captain Lopera · CML CARRIER · Buenaventura · SMCP · NATO Phonetic · radio VHF · contenedores · grúa · muelle
- **DIESEL** (workshop motores): operario · supervisor · taller · herramientas · turbo · piezas · diagnóstico
- **MGV** (medios gráficos visuales): brand · paleta · tipografía · logo · cliente · brief · entregable
- **Cualquier futuro programa**: extraído de `pm-1-2.universo_narrativo` automáticamente

El `.md` resultante tiene el sabor visual del sector económico de su guía SIN modificar el master prompt.

### REGLA 15 — ESTRUCTURA TOP-LEVEL DEL `.md`

```markdown
# Visual Aid Guide — [Programa Nombre] — Guía [N] · [Nombre Guía]

## Frontmatter
- run_id, guide_id, generated_date, instructor
- pm_version: 3.0
- universo_narrativo: extracted from pm-1-2 (resumen)
- paleta_canon: SENA institucional v2.6.6
- tools_compatibles: ["Claude Design", "PPTX", "Canva", "NotebookLM", "cualquier"]

## Cómo usar este documento
- Copia la sección de la actividad que vas a visualizar
- Pégala como prompt en tu herramienta visual preferida
- Las RESTRICCIONES DE DISEÑO (sección 6) y el PROMPT (sección 7) garantizan coherencia cross-tool
- El layout del scaffold (sección 4) es wireframe textual · cada tool lo interpreta a su manera

## Tabla de contenido
- Lista de N actividades con anchor links

## Actividades

### Sesión 1 — [titulo]
[Actividad A1 con 7 secciones]
[Actividad A2 con 7 secciones]
...

### Sesión 2 — [titulo]
...

[hasta SN]
```

### REGLA 16 — VALIDATION CHECKS v3.0 (10 checks)

1. ✅ Output es UN solo archivo `.md` (no .pptx · no .json · no spec)
2. ✅ Frontmatter contiene: run_id · guide_id · generated_date · pm_version=3.0 · paleta_canon · tools_compatibles
3. ✅ Cada actividad tiene las 7 secciones canónicas en orden (REGLA 12)
4. ✅ Sección 1 referencia evidencia formal (E1-E6) cuando aplica · NO si es práctica
5. ✅ Sección 6 incluye paleta SENA hex + universo narrativo extraído de pm-1-2 · NO hardcoded
6. ✅ Sección 7 prompt narrativo NO menciona herramientas específicas (Claude Design · Canva · PPTX) por nombre
7. ✅ NO hay tool-locks: NO Calibri Npt · NO LAYOUT_16x9 · NO CSS classes · NO MDX components
8. ✅ Tabla de contenido al inicio · cada actividad navegable via anchor link Markdown
9. ✅ Total actividades en `.md` === actividades de pm-3-6.json (cross-validation)
10. ✅ Universo narrativo en frontmatter coincide con pm-1-2.universo_narrativo (no copia-fantasma de otro programa)

### REGLA 17 — DEPRECATION PATH v2.4 → v3.0

Programas con artefactos v2.4 (`pm-3-3-spec.json` + `.pptx` + `pm-3-3-gen.js`):
1. Mantener artefactos legacy en run dir (NO eliminar · son canon histórico)
2. Generar nuevo `pm-3-3.md` con master prompt v3.0
3. Marcar artefactos v2.4 como `*.legacy-v24-deprecated` (sufijo informativo · NO mover)
4. Run resultante tiene ambos: legacy v2.4 (instructor-facing PPTX) + v3.0 (student-facing .md)

### Operacional canon — IMARPOR-CC ground truth (próximo)

El primer `pm-3-3.md` IMARPOR-CC será generado en sesión 2026-04-30 (post Hito 5 · post PM-3.7 V04).
Ese mismo se vuelve **referencia operacional** para futuros programas (DIESEL · MGV · INGBAS · etc.).

---

*PM-3.3 v3.0 · escrito 2026-04-30 (Visual Aid Generator student-facing tool-agnostic · IMARPOR-CC pending)*
*Bumps: master prompt PM-3.3 v2.4 → v3.0 · output paradigm spec.json+.pptx → .md · destinatario instructor → aprendiz · renderer JS → external tool*
