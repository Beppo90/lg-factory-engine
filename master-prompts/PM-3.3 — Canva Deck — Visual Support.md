# PM-3.3: CANVA DECK — VISUAL SUPPORT

## FPI SENA — Bilingüismo

---

## IDENTIDAD DEL PROMPT

| Campo | Valor |
|-------|-------|
| **Código** | PM-3.3 |
| **Nombre** | Canva Deck — Visual Support |
| **Versión** | 2.4 |
| **Last Verified** | 2026-04-20 |
| **Destinatario** | Instructor (presentación visual durante clase) |
| **Función** | Generar (a) `pm-3-3-spec.json` — contrato de datos del deck — y (b) la presentación PPTX derivada de ese spec |
| **Analogía** | Es el "set de iluminación" de la guía — lo que el aprendiz VE mientras el instructor dirige |
| **Herramienta** | Canva / PPTX — se construye automáticamente desde `pm-3-3-spec.json` (prohibido hardcoding en el script generador) |
| **Phase** | 4 |
| **Depends On** | [PM-3.2] |
| **Trigger** | post_playbook_confirmation |
| **Fuente de verdad** | `pm-3-3-spec.json` (único input del generador) |

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

*PM-3.3: Canva Deck — Visual Support*
*Sistema de Prompts Maestros — LG Factory — FPI SENA — Bilingüismo*
*Versión 2.4 — 2026-04-20 (spec-driven: `pm-3-3-spec.json` único input del generador)*
*Instructor Sergio Cortés Perdomo · Marzo 2026*
