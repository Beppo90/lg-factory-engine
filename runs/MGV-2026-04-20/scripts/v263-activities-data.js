/**
 * v263-activities-data.js
 *
 * Specs v2.6.3 de las 30 actividades de MGV G1 "The Visual Communicator".
 * Cada entrada reemplaza los campos aprendiz-facing en pm-3-6 dejando
 * intactos activity_footer (derivado), produce_evidencia y metadatos.
 *
 * Canon v2.6.3:
 *   - titulo_en / titulo_es          → encabezado bilingüe
 *   - voc_dimension[]                → implícito, NO se renderiza
 *   - descripcion_aprendiz.{en,es}   → lead-in
 *   - paso_a_paso[]                  → 5–7 pasos bilingües sin prefijos
 *   - scaffold_inline                → bloque embebido (tipo + estructura)
 *   - entregable.{producto,formato,criterio_minimo}.{en,es}
 *
 * Universo: Pixel & Ink studio, Sophia Ramírez (Creative Director),
 * Laura, Diego, Don Pedro. Toolbelt 5×4 (Typography, Color, Shape & Composition,
 * Tools & Software, Products & Actions). Master Anchor "The Story of Two Fonts"
 * (serif vs sans-serif). 5 fuentes: Helvetica, Times New Roman, Comic Sans,
 * Bodoni, Futura. Final Mission: La Esquina bakery brand mood board.
 */

'use strict';

module.exports = [

// ═══════════════════════════════════════════════════════════════════════════
// S1 — REFLEXIÓN INICIAL + CONTEXTUALIZACIÓN
// ═══════════════════════════════════════════════════════════════════════════

{
  actividad_id: 'A3.1.1',
  titulo_en: "Image Walk — A designer's first look",
  titulo_es: 'Paseo visual — La primera mirada del diseñador',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 30,
  agrupacion: 'individual + dúo',
  voc_dimension: ['cognitiva', 'actitudinal'],
  descripcion_aprendiz: {
    en: "Six visual references are waiting on the wall. Your first job as a Junior Designer is to look — not to analyze yet. Pick the one that pulls your eye and give it a single word in English.",
    es: 'Seis referencias visuales te esperan en la pared. Tu primera tarea como Junior Designer es mirar — aún no analizar. Elige la que te atraiga y dale una sola palabra en inglés.'
  },
  paso_a_paso: [
    { en: 'Walk along the wall and look at the 6 references.',
      es: 'Recorre la pared y observa las 6 referencias.' },
    { en: 'Choose the one you like the most.',
      es: 'Elige la que más te guste.' },
    { en: 'In the table below, write its number and one word that describes it in English (a color, a shape, or a feeling).',
      es: 'En la tabla de abajo escribe su número y una palabra en inglés que la describa (un color, una forma, o una sensación).' },
    { en: 'Pair up with a partner and share using: "I like number __ because it is __."',
      es: 'Agrúpate con un compañero y comparte con: "I like number __ because it is __."' },
    { en: 'Listen to your partner and write down their word in the shared column.',
      es: 'Escucha a tu compañero y anota su palabra en la columna compartida.' },
    { en: 'Return to plenary and listen to 3 volunteer words.',
      es: 'Regresa a la plenaria y escucha 3 palabras de voluntarios.' }
  ],
  scaffold_inline: {
    tipo: 'matching',
    titulo_en: 'My pick · Your pick',
    titulo_es: 'Mi elección · Tu elección',
    estructura: {
      columnas: [
        { header_en: 'Reference #', header_es: 'Ref. #', width_pct: 20 },
        { header_en: 'My 1-word description', header_es: 'Mi descripción (1 palabra)', width_pct: 40 },
        { header_en: "Partner's word", header_es: 'Palabra del compañero', width_pct: 40 }
      ],
      filas: 3
    }
  },
  entregable: {
    producto:        { en: 'Table with reference number, your word and your partner\'s word.',
                       es: 'Tabla con el número de la referencia, tu palabra y la palabra de tu compañero.' },
    formato:         { en: 'Inline table inside this guide.',
                       es: 'Tabla embebida dentro de esta guía.' },
    criterio_minimo: { en: 'At least 1 row completed with all 3 columns.',
                       es: 'Mínimo 1 fila con las 3 columnas diligenciadas.' }
  }
},

{
  actividad_id: 'A3.1.2',
  titulo_en: 'Vocabulary Pre-Diagnostic — Map your starting point',
  titulo_es: 'Pre-diagnóstico de vocabulario — Tu punto de partida',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 25,
  agrupacion: 'individual',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'This checklist is your personal map of design vocabulary. It is not graded; its only job is to show your starting point so you can measure your growth later.',
    es: 'Esta lista es tu mapa personal del vocabulario de diseño. No tiene nota; su único rol es mostrar tu punto de partida para que midas tu crecimiento después.'
  },
  paso_a_paso: [
    { en: 'Read each term on the table slowly, one at a time.', es: 'Lee cada término de la tabla despacio, uno a uno.' },
    { en: 'For every row, mark exactly one checkbox.', es: 'Para cada fila, marca exactamente una casilla.' },
    { en: 'Mark ✓ if you can explain the term in English.', es: 'Marca ✓ si puedes explicar el término en inglés.' },
    { en: 'Mark ~ if the word looks familiar but you could not explain it.', es: 'Marca ~ si la palabra te resulta familiar pero no podrías explicarla.' },
    { en: 'Mark ? if the word is new. Zero blanks.', es: 'Marca ? si la palabra es nueva. Sin vacíos.' },
    { en: 'Keep this page. We will reopen it at the end of Session 6.', es: 'Conserva esta página. La volveremos a abrir al final de la Sesión 6.' }
  ],
  scaffold_inline: {
    tipo: 'checklist',
    titulo_en: 'Self-check · 20 design terms',
    titulo_es: 'Autoevaluación · 20 términos de diseño',
    estructura: {
      columnas_check: [
        { header_en: '✓  I know it', header_es: 'Lo sé' },
        { header_en: '~  Seen it', header_es: 'Lo he visto' },
        { header_en: '?  New', header_es: 'Es nuevo' }
      ],
      terminos: [
        { en: 'Typography',   es: 'tipografía' },
        { en: 'Font',         es: 'fuente' },
        { en: 'Serif',        es: 'serif (con remate)' },
        { en: 'Sans-serif',   es: 'sans-serif (sin remate)' },
        { en: 'Hierarchy',    es: 'jerarquía' },
        { en: 'Contrast',     es: 'contraste' },
        { en: 'Alignment',    es: 'alineación' },
        { en: 'Grid',         es: 'retícula' },
        { en: 'White space',  es: 'espacio en blanco' },
        { en: 'Kerning',      es: 'interletrado' },
        { en: 'Palette',      es: 'paleta' },
        { en: 'Warm color',   es: 'color cálido' },
        { en: 'Cool color',   es: 'color frío' },
        { en: 'Canvas',       es: 'lienzo' },
        { en: 'Layout',       es: 'diagramación' },
        { en: 'Logo',         es: 'logo' },
        { en: 'Poster',       es: 'afiche' },
        { en: 'Brand',        es: 'marca' },
        { en: 'Mood board',   es: 'tablero de referencia' },
        { en: 'CMYK',         es: 'CMYK' }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Checklist with one box marked in every row.',
                       es: 'Lista con una casilla marcada en cada fila.' },
    formato:         { en: 'Inline table inside this guide.',
                       es: 'Tabla embebida dentro de esta guía.' },
    criterio_minimo: { en: 'Zero blank rows.', es: 'Ninguna fila vacía.' }
  }
},

{
  actividad_id: 'A3.2.1',
  titulo_en: 'Studio Tour — Meet Pixel & Ink',
  titulo_es: 'Tour por el estudio — Conoce Pixel & Ink',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 45,
  agrupacion: 'individual + dúo + plenaria',
  voc_dimension: ['cognitiva', 'actitudinal'],
  descripcion_aprendiz: {
    en: 'Pixel & Ink is the studio where you will work as a Junior Designer. Meet the four people on the team and notice who you are most drawn to — that instinct matters.',
    es: 'Pixel & Ink es el estudio donde trabajarás como Junior Designer. Conoce a las cuatro personas del equipo y fíjate en quién te atrae más — esa intuición importa.'
  },
  paso_a_paso: [
    { en: 'Read the Studio Welcome Card (1-page A4) silently.',
      es: 'Lee la ficha de bienvenida del estudio (1 hoja A4) en silencio.' },
    { en: 'Underline the names of the 4 team members: Sophia, Laura, Diego, Don Pedro.',
      es: 'Subraya los nombres de los 4 miembros: Sophia, Laura, Diego, Don Pedro.' },
    { en: 'For each member, fill in the mini-card below with their role and one word that describes them.',
      es: 'Para cada miembro, llena la mini-ficha de abajo con su rol y una palabra que lo describa.' },
    { en: 'In pairs, answer: How is Pixel & Ink similar to or different from a workplace you know?',
      es: 'En parejas, responde: ¿En qué se parece o se diferencia Pixel & Ink de un trabajo que conozcas?' },
    { en: 'Share 1 sentence in plenary.',
      es: 'Comparte 1 oración en la plenaria.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: 'Team mini-cards',
    titulo_es: 'Mini-fichas del equipo',
    estructura: {
      campos: [
        { label_en: 'Sophia · Creative Director',   label_es: 'Directora Creativa',          lines: 1 },
        { label_en: 'Laura · Senior Designer',      label_es: 'Diseñadora Sénior',           lines: 1 },
        { label_en: 'Diego · Junior Designer',      label_es: 'Diseñador Junior',            lines: 1 },
        { label_en: 'Don Pedro · Studio Manager',   label_es: 'Gerente del estudio',         lines: 1 },
        { label_en: 'My one-sentence comparison with a workplace I know',
          label_es: 'Mi comparación en una oración con un trabajo que conozco', lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: '4 mini-cards completed + 1 comparison sentence.',
                       es: '4 mini-fichas diligenciadas + 1 oración de comparación.' },
    formato:         { en: 'Inline form inside this guide.', es: 'Formulario embebido dentro de esta guía.' },
    criterio_minimo: { en: 'All 4 team members have a 1-word description; comparison sentence written.',
                       es: 'Los 4 miembros del equipo con descripción de 1 palabra; oración de comparación escrita.' }
  }
},

{
  actividad_id: 'A3.2.2',
  titulo_en: 'Roles Carousel — Who does what?',
  titulo_es: 'Carrusel de roles — ¿Quién hace qué?',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 50,
  agrupacion: 'rotación 4 estaciones × 4 grupos',
  voc_dimension: ['cognitiva', 'procedimental'],
  descripcion_aprendiz: {
    en: 'You will rotate through 4 stations — one per team member. At each station, read the clue card and match the role to the correct action.',
    es: 'Rotarás por 4 estaciones — una por cada miembro del equipo. En cada estación lee la tarjeta de pista y empareja el rol con la acción correcta.',
  },
  paso_a_paso: [
    { en: 'Form groups of 4 and assign a starting station (S1–S4).',
      es: 'Formen grupos de 4 y asignen una estación inicial (S1–S4).' },
    { en: 'Read the clue card silently. Discuss for 60 seconds.',
      es: 'Lean la tarjeta de pista en silencio. Discutan por 60 segundos.' },
    { en: 'In the matching table, connect each team member with the action you observed at the station.',
      es: 'En la tabla de emparejamiento, conecta cada miembro con la acción que observaste en la estación.' },
    { en: 'Rotate clockwise when the instructor signals.',
      es: 'Roten en el sentido de las manecillas cuando el instructor lo indique.' },
    { en: 'After 4 rotations, your table should have all 4 roles matched.',
      es: 'Después de 4 rotaciones, tu tabla debe tener los 4 roles emparejados.' },
    { en: 'Compare with another group and correct any disagreement.',
      es: 'Compara con otro grupo y corrige cualquier desacuerdo.' }
  ],
  scaffold_inline: {
    tipo: 'matching',
    titulo_en: 'Role ↔ action',
    titulo_es: 'Rol ↔ acción',
    estructura: {
      columnas: [
        { header_en: 'Team member', header_es: 'Miembro del equipo', width_pct: 30 },
        { header_en: 'Action observed (in English)', header_es: 'Acción observada (en inglés)', width_pct: 50 },
        { header_en: 'Station #', header_es: 'Estación #', width_pct: 20 }
      ],
      filas_prellenadas: [
        [{ label_en: 'Sophia',   label_es: 'Sophia' }, '', ''],
        [{ label_en: 'Laura',    label_es: 'Laura' }, '', ''],
        [{ label_en: 'Diego',    label_es: 'Diego' }, '', ''],
        [{ label_en: 'Don Pedro',label_es: 'Don Pedro' }, '', '']
      ]
    }
  },
  entregable: {
    producto:        { en: 'Matching table with 4 roles connected to 4 actions.',
                       es: 'Tabla de emparejamiento con 4 roles conectados a 4 acciones.' },
    formato:         { en: 'Inline table.', es: 'Tabla embebida.' },
    criterio_minimo: { en: 'All 4 rows completed with an action in English.',
                       es: 'Las 4 filas completas con una acción en inglés.' }
  }
},

{
  actividad_id: 'A3.2.3',
  titulo_en: 'Bridge to S2 — Why vocabulary matters',
  titulo_es: 'Puente a la S2 — Por qué importa el vocabulario',
  tipo_actividad_sena: 'Actividad actitudinal',
  tiempo_min: 50,
  agrupacion: 'individual + plenaria',
  voc_dimension: ['actitudinal'],
  descripcion_aprendiz: {
    en: 'Before the next session opens the Toolbelt, take 10 minutes to put in your own words why a designer needs to name what they see in English.',
    es: 'Antes de que la próxima sesión abra el Toolbelt, tómate 10 minutos para poner en tus palabras por qué un diseñador necesita nombrar lo que ve en inglés.'
  },
  paso_a_paso: [
    { en: 'Re-read your notes from A3.2.1 and A3.2.2 for 2 minutes.',
      es: 'Re-lee tus notas de A3.2.1 y A3.2.2 durante 2 minutos.' },
    { en: 'In the reflection space below, write 2 sentences (English or Spanish) answering: Why is it important for a Junior Designer to name what they see in English?',
      es: 'En el espacio de reflexión escribe 2 oraciones (inglés o español) respondiendo: ¿Por qué es importante que un Junior Designer nombre lo que ve en inglés?' },
    { en: 'Choose your strongest sentence and share it in plenary.',
      es: 'Elige tu mejor oración y compártela en plenaria.' },
    { en: 'Listen to 3 classmates and write down 1 idea that was different from yours.',
      es: 'Escucha a 3 compañeros y anota 1 idea distinta a la tuya.' }
  ],
  scaffold_inline: {
    tipo: 'reflection_lines',
    titulo_en: 'Why vocabulary matters — 2 sentences',
    titulo_es: 'Por qué importa el vocabulario — 2 oraciones',
    estructura: {
      prompt_en: 'Why is it important for a Junior Designer to name what they see in English?',
      prompt_es: '¿Por qué es importante que un Junior Designer nombre lo que ve en inglés?',
      lines: 4
    }
  },
  entregable: {
    producto:        { en: '2-sentence reflection + 1 different idea from a classmate.',
                       es: 'Reflexión de 2 oraciones + 1 idea distinta de un compañero.' },
    formato:         { en: 'Inline writing space.', es: 'Espacio de escritura embebido.' },
    criterio_minimo: { en: '2 full sentences written; 1 classmate idea noted.',
                       es: '2 oraciones completas; 1 idea de compañero anotada.' }
  }
},

// ═══════════════════════════════════════════════════════════════════════════
// S2 — APROPIACIÓN: Reading + Vocabulary
// ═══════════════════════════════════════════════════════════════════════════

{
  actividad_id: 'A3.3.S2.1',
  titulo_en: 'Toolbelt 5×4 — Word Wall Construction',
  titulo_es: 'Toolbelt 5×4 — Construcción del muro de palabras',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 100,
  agrupacion: 'grupos de 4',
  voc_dimension: ['cognitiva', 'procedimental'],
  descripcion_aprendiz: {
    en: 'The Toolbelt is the designer\'s 20-word working kit, organized in 5 categories. Your group will place each of the 20 cards under the correct category and justify each placement in English.',
    es: 'El Toolbelt es el kit de 20 palabras de trabajo del diseñador, organizado en 5 categorías. Tu grupo colocará cada una de las 20 tarjetas bajo la categoría correcta y justificará cada ubicación en inglés.'
  },
  paso_a_paso: [
    { en: 'Form groups of 4. Receive the pack of 20 cards (English + Spanish gloss).',
      es: 'Formen grupos de 4. Reciban el paquete de 20 tarjetas (inglés + glosa en español).' },
    { en: 'Read all 20 cards together once.',
      es: 'Lean las 20 tarjetas juntos una vez.' },
    { en: 'In the 5×4 table below, write the 4 terms that belong to each category.',
      es: 'En la tabla 5×4 escribe los 4 términos de cada categoría.' },
    { en: 'For each placement, one group member says: "X goes in [category] because…"',
      es: 'Para cada ubicación, un miembro del grupo dice: "X goes in [category] because…"' },
    { en: 'Compare with another group; if you disagree on a term, consult the instructor.',
      es: 'Comparen con otro grupo; si no coinciden en un término, consulten al instructor.' },
    { en: 'Stick your completed Word Wall on the classroom wall.',
      es: 'Peguen su muro de palabras completo en la pared del aula.' }
  ],
  scaffold_inline: {
    tipo: 'matching',
    titulo_en: 'Toolbelt 5×4 — Categorize the 20 terms',
    titulo_es: 'Toolbelt 5×4 — Clasifica los 20 términos',
    estructura: {
      columnas: [
        { header_en: 'Typography',           header_es: 'Tipografía',             width_pct: 20 },
        { header_en: 'Color',                header_es: 'Color',                  width_pct: 20 },
        { header_en: 'Shape & Composition',  header_es: 'Forma y composición',    width_pct: 20 },
        { header_en: 'Tools & Software',     header_es: 'Herramientas y software',width_pct: 20 },
        { header_en: 'Products & Actions',   header_es: 'Productos y acciones',   width_pct: 20 }
      ],
      filas: 4
    }
  },
  entregable: {
    producto:        { en: 'Completed Word Wall — 5 categories × 4 terms.',
                       es: 'Muro de palabras completo — 5 categorías × 4 términos.' },
    formato:         { en: 'Inline 5×4 grid.', es: 'Tabla embebida 5×4.' },
    criterio_minimo: { en: 'All 20 terms placed; all 5 categories have exactly 4 terms.',
                       es: 'Los 20 términos ubicados; las 5 categorías con exactamente 4 términos.' }
  }
},

{
  actividad_id: 'A3.3.S2.2',
  titulo_en: "Master Anchor — Jigsaw on 'The Story of Two Fonts'",
  titulo_es: "Lectura ancla — Rompecabezas sobre 'The Story of Two Fonts'",
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 100,
  agrupacion: 'Jigsaw — grupos base + grupos expertos',
  voc_dimension: ['cognitiva', 'procedimental'],
  descripcion_aprendiz: {
    en: 'The class splits in 3 expert groups — one per section of the Master Anchor text. You will become an expert in your section, then teach it to your base group.',
    es: 'La clase se divide en 3 grupos expertos — uno por sección del texto ancla. Te volverás experto de tu sección y luego se la enseñarás a tu grupo base.'
  },
  paso_a_paso: [
    { en: 'Receive your section: A (Origin of Serif), B (Rise of Sans-Serif) or C (When to use which).',
      es: 'Recibe tu sección: A (Origen del Serif), B (Auge del Sans-Serif) o C (Cuándo usar cada uno).' },
    { en: 'Read your section silently for 10 minutes.',
      es: 'Lee tu sección en silencio durante 10 minutos.' },
    { en: 'In the template below, write 3 facts from YOUR section.',
      es: 'En la plantilla escribe 3 hechos de TU sección.' },
    { en: 'Join your base group. Teach your 3 facts in English, 2 minutes max.',
      es: 'Únete a tu grupo base. Enseña tus 3 hechos en inglés, máximo 2 minutos.' },
    { en: 'Listen to the other two experts and fill their rows in the template.',
      es: 'Escucha a los otros dos expertos y llena sus filas en la plantilla.' },
    { en: 'Confirm all 9 facts with the instructor in plenary.',
      es: 'Confirmen los 9 hechos con el instructor en plenaria.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: '3 sections × 3 facts each',
    titulo_es: '3 secciones × 3 hechos cada una',
    estructura: {
      campos: [
        { label_en: 'Section A · Origin of Serif — Fact 1', label_es: 'Sección A · Origen del Serif — Hecho 1', lines: 2 },
        { label_en: 'Section A — Fact 2', label_es: 'Sección A — Hecho 2', lines: 2 },
        { label_en: 'Section A — Fact 3', label_es: 'Sección A — Hecho 3', lines: 2 },
        { label_en: 'Section B · Rise of Sans-Serif — Fact 1', label_es: 'Sección B · Auge del Sans-Serif — Hecho 1', lines: 2 },
        { label_en: 'Section B — Fact 2', label_es: 'Sección B — Hecho 2', lines: 2 },
        { label_en: 'Section B — Fact 3', label_es: 'Sección B — Hecho 3', lines: 2 },
        { label_en: 'Section C · When to use which — Fact 1', label_es: 'Sección C · Cuándo usar cada uno — Hecho 1', lines: 2 },
        { label_en: 'Section C — Fact 2', label_es: 'Sección C — Hecho 2', lines: 2 },
        { label_en: 'Section C — Fact 3', label_es: 'Sección C — Hecho 3', lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Jigsaw template with 9 facts (3 per section).',
                       es: 'Plantilla del rompecabezas con 9 hechos (3 por sección).' },
    formato:         { en: 'Inline form.', es: 'Formulario embebido.' },
    criterio_minimo: { en: 'All 9 fact lines written in complete sentences.',
                       es: 'Los 9 renglones de hechos escritos en oraciones completas.' }
  }
},

{
  actividad_id: 'A3.3.S2.3',
  titulo_en: 'Classification Drill — Serif vs Sans-Serif in the wild',
  titulo_es: 'Drill de clasificación — Serif vs Sans-Serif en el mundo real',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 75,
  agrupacion: 'dúo',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'Twelve real visual samples — logos, posters, magazine covers — are about to land on your desk. You will sort each one as SERIF or SANS-SERIF and justify in one short phrase.',
    es: 'Doce muestras visuales reales — logos, afiches, portadas — llegarán a tu mesa. Clasificarás cada una como SERIF o SANS-SERIF y justificarás en una frase corta.'
  },
  paso_a_paso: [
    { en: 'Pair up and receive 12 visual samples (numbered 1–12).',
      es: 'Fórmate en parejas y reciban 12 muestras visuales (numeradas 1–12).' },
    { en: 'For each sample, look at the dominant type.',
      es: 'Para cada muestra, mira la tipografía dominante.' },
    { en: 'Write the sample number in the correct column of the T-chart below.',
      es: 'Escribe el número de la muestra en la columna correcta del cuadro T de abajo.' },
    { en: 'Beside the number, write a short phrase: "has small feet" (serif) or "clean ends" (sans-serif).',
      es: 'Al lado del número escribe una frase corta: "has small feet" (serif) o "clean ends" (sans-serif).' },
    { en: 'Compare with another pair and resolve disagreements.',
      es: 'Comparen con otra pareja y resuelvan desacuerdos.' }
  ],
  scaffold_inline: {
    tipo: 't_chart',
    titulo_en: 'Serif  vs  Sans-Serif',
    titulo_es: 'Serif  vs  Sans-Serif',
    estructura: {
      columna_a: { header_en: 'SERIF — has small feet', header_es: 'SERIF — tiene remates' },
      columna_b: { header_en: 'SANS-SERIF — clean ends', header_es: 'SANS-SERIF — trazos limpios' },
      filas: 6
    }
  },
  entregable: {
    producto:        { en: 'T-chart with all 12 samples sorted + phrase.',
                       es: 'Cuadro T con las 12 muestras clasificadas + frase.' },
    formato:         { en: 'Inline T-chart.', es: 'Cuadro T embebido.' },
    criterio_minimo: { en: 'All 12 samples placed; each one has a phrase.',
                       es: 'Las 12 muestras ubicadas; cada una con una frase.' }
  }
},

{
  actividad_id: 'A3.3.S2.4',
  titulo_en: 'EVIDENCE E1 — Reading Quiz on "The Story of Two Fonts"',
  titulo_es: 'EVIDENCIA E1 — Quiz de lectura sobre "The Story of Two Fonts"',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 25,
  agrupacion: 'individual',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'This is Evidence 1 of your learning path — the first formal check of what you understood from the Master Anchor text. Below you see 2 sample items so you recognize the shape of the quiz.',
    es: 'Esta es la Evidencia 1 de tu ruta — el primer cierre formal de lo que entendiste del texto ancla. Abajo ves 2 ítems de muestra para que reconozcas la forma del quiz.'
  },
  paso_a_paso: [
    { en: 'Re-read "The Story of Two Fonts" once before starting.',
      es: 'Re-lee "The Story of Two Fonts" una vez antes de empezar.' },
    { en: 'Receive the formal 5-item quiz from the instructor.',
      es: 'Recibe el quiz formal de 5 ítems del instructor.' },
    { en: 'Answer each item by circling a single letter (A, B, C or D).',
      es: 'Responde cada ítem encerrando una sola letra en círculo (A, B, C o D).' },
    { en: 'Go back to the text to confirm the evidence — do not guess.',
      es: 'Vuelve al texto para confirmar la evidencia — no adivines.' },
    { en: 'Write your name and the date; submit the quiz.',
      es: 'Escribe tu nombre y la fecha; entrega el quiz.' }
  ],
  scaffold_inline: {
    tipo: 'quiz_preview',
    titulo_en: 'Quiz preview · 2 of 5 sample items',
    titulo_es: 'Vista previa del quiz · 2 de 5 ítems de muestra',
    badge: 'FORMAL INSTRUMENT  ·  PM-4.1 instrument_1_reading  ·  5 items total',
    estructura: {
      items: [
        {
          n: 1,
          q_en: 'According to the text, which family developed first?',
          q_es: 'Según el texto, ¿cuál familia se desarrolló primero?',
          opts: [
            { k: 'A', en: 'Sans-serif, in the 20th century.', es: 'Sans-serif, en el siglo XX.' },
            { k: 'B', en: 'Serif, in ancient Roman inscriptions.', es: 'Serif, en inscripciones romanas antiguas.' },
            { k: 'C', en: 'Both families appeared at the same time.', es: 'Ambas familias surgieron al tiempo.' },
            { k: 'D', en: 'Neither family has a historical origin.', es: 'Ninguna tiene origen histórico.' }
          ]
        },
        {
          n: 2,
          q_en: 'The text suggests that sans-serif fonts work best on:',
          q_es: 'El texto sugiere que las fuentes sans-serif funcionan mejor en:',
          opts: [
            { k: 'A', en: 'Long printed books.', es: 'Libros impresos largos.' },
            { k: 'B', en: 'Screens and signage.', es: 'Pantallas y señalización.' },
            { k: 'C', en: 'Handwritten letters.', es: 'Cartas manuscritas.' },
            { k: 'D', en: 'Legal contracts.', es: 'Contratos legales.' }
          ]
        }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Completed quiz sheet with 5 answers circled.',
                       es: 'Hoja del quiz con las 5 respuestas encerradas.' },
    formato:         { en: 'Printed A4 sheet provided by instructor.',
                       es: 'Hoja A4 impresa entregada por el instructor.' },
    criterio_minimo: { en: 'All 5 items answered with a single clear circled letter; name and date filled in.',
                       es: 'Los 5 ítems respondidos con una sola letra claramente encerrada; nombre y fecha diligenciados.' }
  }
},

// ═══════════════════════════════════════════════════════════════════════════
// S3 — APROPIACIÓN: Writing + Grammar
// ═══════════════════════════════════════════════════════════════════════════

{
  actividad_id: 'A3.3.S3.1',
  titulo_en: 'Grammar Activation — This is / That is + Adjective Position',
  titulo_es: 'Activación gramatical — This is / That is + posición del adjetivo',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 105,
  agrupacion: 'individual + plenaria con corrección',
  voc_dimension: ['cognitiva', 'procedimental'],
  descripcion_aprendiz: {
    en: 'Two grammar habits live at the heart of every designer sentence: point at something (this/that) and describe it (adjective BEFORE noun). You will train both with 10 visual prompts.',
    es: 'Dos hábitos gramaticales viven en el corazón de toda oración de diseñador: señalar algo (this/that) y describirlo (adjetivo ANTES del sustantivo). Entrenarás ambos con 10 estímulos visuales.'
  },
  paso_a_paso: [
    { en: 'Watch the instructor demo: "This is a serif font." / "That is a warm color."',
      es: 'Mira la demostración del instructor: "This is a serif font." / "That is a warm color."' },
    { en: 'For each of the 10 prompts below, write 1 sentence using THIS or THAT + adjective + noun.',
      es: 'Para cada uno de los 10 estímulos, escribe 1 oración usando THIS o THAT + adjetivo + sustantivo.' },
    { en: 'Keep adjectives BEFORE the noun: "a bold logo" (correct), not "a logo bold" (wrong).',
      es: 'Mantén el adjetivo ANTES del sustantivo: "a bold logo" (correcto), no "a logo bold" (incorrecto).' },
    { en: 'Exchange with a partner and mark any sentence where the adjective is in the wrong place.',
      es: 'Intercambia con un compañero y marca cualquier oración con el adjetivo mal ubicado.' },
    { en: 'Correct your mistakes in plenary with the instructor.',
      es: 'Corrige tus errores en plenaria con el instructor.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: '10 prompts · Write one sentence each',
    titulo_es: '10 estímulos · Escribe una oración en cada uno',
    estructura: {
      campos: [
        { label_en: '1 · Image of serif font', label_es: '1 · Imagen de fuente serif', lines: 1 },
        { label_en: '2 · Image of warm color', label_es: '2 · Imagen de color cálido', lines: 1 },
        { label_en: '3 · Image of bold logo', label_es: '3 · Imagen de logo en negrita', lines: 1 },
        { label_en: '4 · Image of cool poster', label_es: '4 · Imagen de afiche frío', lines: 1 },
        { label_en: '5 · Image of sans-serif typeface', label_es: '5 · Imagen de tipografía sans-serif', lines: 1 },
        { label_en: '6 · Image of clean layout', label_es: '6 · Imagen de diagramación limpia', lines: 1 },
        { label_en: '7 · Image of big title', label_es: '7 · Imagen de titular grande', lines: 1 },
        { label_en: '8 · Image of light background', label_es: '8 · Imagen de fondo claro', lines: 1 },
        { label_en: '9 · Image of round shape', label_es: '9 · Imagen de forma redonda', lines: 1 },
        { label_en: '10 · Image of sharp contrast', label_es: '10 · Imagen de contraste marcado', lines: 1 }
      ]
    }
  },
  entregable: {
    producto:        { en: '10 sentences using THIS/THAT + adjective + noun.',
                       es: '10 oraciones con THIS/THAT + adjetivo + sustantivo.' },
    formato:         { en: 'Inline form.', es: 'Formulario embebido.' },
    criterio_minimo: { en: '10 sentences with adjective correctly placed BEFORE the noun.',
                       es: '10 oraciones con el adjetivo correctamente ubicado ANTES del sustantivo.' }
  }
},

{
  actividad_id: 'A3.3.S3.2',
  titulo_en: "Font Card Modeling — Andrés' First Card",
  titulo_es: 'Modelado de Font Card — La primera ficha de Andrés',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 50,
  agrupacion: 'individual + dúo',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'Before you write your own Font Card, study a model. Andrés is a Junior Designer like you; his first attempt shows every grammar piece we will reuse.',
    es: 'Antes de escribir tu propia Font Card, estudia un modelo. Andrés es un Junior Designer como tú; su primer intento muestra cada pieza gramatical que reutilizaremos.'
  },
  paso_a_paso: [
    { en: "Read Andrés' Font Card silently (embedded in the guide).",
      es: 'Lee la Font Card de Andrés en silencio (embebida en la guía).' },
    { en: 'Using 4 different colors, underline 4 adjectives, 2 uses of IN, 3 uses of BE, 1 connector (and/but).',
      es: 'Con 4 colores distintos, subraya 4 adjetivos, 2 usos de IN, 3 usos de BE, 1 conector (and/but).' },
    { en: 'In the count box below, write how many you found of each.',
      es: 'En el cuadro de conteo de abajo escribe cuántos encontraste de cada uno.' },
    { en: 'Compare with a partner and resolve any differences.',
      es: 'Compara con un compañero y resuelvan las diferencias.' },
    { en: 'Write 1 sentence: what makes this card clear for a client?',
      es: 'Escribe 1 oración: ¿qué hace clara esta ficha para un cliente?' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: 'Count box · Grammar pieces found',
    titulo_es: 'Cuadro de conteo · Piezas gramaticales encontradas',
    estructura: {
      campos: [
        { label_en: 'Adjectives (target: 4)',            label_es: 'Adjetivos (objetivo: 4)',              lines: 1 },
        { label_en: 'Preposition IN (target: 2)',        label_es: 'Preposición IN (objetivo: 2)',         lines: 1 },
        { label_en: 'Verb BE — is/are (target: 3)',      label_es: 'Verbo BE — is/are (objetivo: 3)',      lines: 1 },
        { label_en: 'Connector and/but (target: 1)',     label_es: 'Conector and/but (objetivo: 1)',       lines: 1 },
        { label_en: 'Why is this card clear for a client?', label_es: '¿Por qué es clara esta ficha para un cliente?', lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: "Annotated Font Card + count box with 4 numbers + 1 reflection sentence.",
                       es: 'Font Card anotada + cuadro de conteo con 4 números + 1 oración de reflexión.' },
    formato:         { en: 'Inline form; annotations on embedded card.', es: 'Formulario embebido; anotaciones sobre la ficha.' },
    criterio_minimo: { en: 'All 4 counts filled; reflection sentence complete.',
                       es: 'Los 4 conteos diligenciados; oración de reflexión completa.' }
  }
},

{
  actividad_id: 'A3.3.S3.3',
  titulo_en: 'Production — Write your own Font Card',
  titulo_es: 'Producción — Escribe tu propia Font Card',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 130,
  agrupacion: 'individual con consulta libre',
  voc_dimension: ['procedimental'],
  descripcion_aprendiz: {
    en: 'Now it is your turn. Pick one font from the shelf, look at it carefully, and produce your own Font Card using the template below. Borrow the shape from Andrés, but make the content yours.',
    es: 'Ahora es tu turno. Elige una fuente del estante, obsérvala con calma y produce tu propia Font Card con la plantilla de abajo. Toma la forma de Andrés, pero haz el contenido tuyo.'
  },
  paso_a_paso: [
    { en: 'Choose 1 font: Helvetica, Times New Roman, Comic Sans, Bodoni, or Futura.',
      es: 'Elige 1 fuente: Helvetica, Times New Roman, Comic Sans, Bodoni o Futura.' },
    { en: 'Write the font name and family (serif / sans-serif) in the template.',
      es: 'Escribe el nombre y la familia (serif / sans-serif) en la plantilla.' },
    { en: 'Write 3 adjectives that describe its mood.',
      es: 'Escribe 3 adjetivos que describan su ánimo.' },
    { en: 'Write 2 sentences using the preposition IN (e.g., "It shines in posters").',
      es: 'Escribe 2 oraciones con la preposición IN (ej: "It shines in posters").' },
    { en: 'Write 1 sentence using AND or BUT as connector.',
      es: 'Escribe 1 oración con AND o BUT como conector.' },
    { en: 'Re-read and check: adjectives BEFORE the noun; BE used correctly.',
      es: 'Re-lee y verifica: adjetivos ANTES del sustantivo; BE bien usado.' }
  ],
  scaffold_inline: {
    tipo: 'writing_template',
    titulo_en: 'Font Card Template',
    titulo_es: 'Plantilla de Font Card',
    estructura: {
      lineas_gap: [
        { prompt_en: 'Font name',                              prompt_es: 'Nombre de la fuente',                        lines: 1 },
        { prompt_en: 'Family (serif / sans-serif)',            prompt_es: 'Familia (serif / sans-serif)',               lines: 1 },
        { prompt_en: '3 adjectives describing the mood',       prompt_es: '3 adjetivos que describen el ánimo',         lines: 1 },
        { prompt_en: '2 sentences using preposition IN',       prompt_es: '2 oraciones con la preposición IN',          lines: 3 },
        { prompt_en: '1 sentence using AND or BUT',            prompt_es: '1 oración con AND o BUT',                    lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Font Card following the template.',
                       es: 'Font Card siguiendo la plantilla.' },
    formato:         { en: 'Inline template; this is a draft — peer review in A3.3.S3.4.',
                       es: 'Plantilla embebida; este es el borrador — revisión de pares en A3.3.S3.4.' },
    criterio_minimo: { en: 'All template fields filled: name, family, 3 adjectives, 2 IN sentences, 1 and/but sentence.',
                       es: 'Todos los campos: nombre, familia, 3 adjetivos, 2 oraciones con IN, 1 con and/but.' }
  }
},

{
  actividad_id: 'A3.3.S3.4',
  titulo_en: 'EVIDENCE E2 — Peer Review + Final Font Card',
  titulo_es: 'EVIDENCIA E2 — Revisión de pares + Font Card final',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 75,
  agrupacion: 'dúos rotativos',
  voc_dimension: ['cognitiva', 'procedimental', 'actitudinal'],
  descripcion_aprendiz: {
    en: 'Evidence 2 has two parts: first you review a partner\'s draft using a 5-item checklist, then you apply their feedback and submit your FINAL Font Card.',
    es: 'La Evidencia 2 tiene dos partes: primero revisas el borrador de un compañero con una lista de 5 ítems, luego aplicas su feedback y entregas tu Font Card FINAL.'
  },
  paso_a_paso: [
    { en: 'Swap your draft Font Card with a partner.',
      es: 'Intercambia tu borrador de Font Card con un compañero.' },
    { en: 'Read your partner\'s card once, then use the checklist below to review.',
      es: 'Lee la ficha de tu compañero una vez, luego usa la lista para revisar.' },
    { en: 'For each of the 5 items, mark ✓ (done) or ✗ (missing/incorrect).',
      es: 'Para cada uno de los 5 ítems, marca ✓ (cumple) o ✗ (falta/incorrecto).' },
    { en: 'Give your partner 1 specific suggestion written in English.',
      es: 'Da a tu compañero 1 sugerencia específica escrita en inglés.' },
    { en: 'Apply the suggestion you received and rewrite your FINAL Font Card.',
      es: 'Aplica la sugerencia recibida y reescribe tu Font Card FINAL.' },
    { en: 'Submit the FINAL card to the instructor.',
      es: 'Entrega la ficha FINAL al instructor.' }
  ],
  scaffold_inline: {
    tipo: 'checklist',
    titulo_en: 'Peer Review Checklist · 5 items',
    titulo_es: 'Lista de revisión de pares · 5 ítems',
    badge: 'FORMAL INSTRUMENT  ·  PM-4.1 instrument_2_writing  ·  Escala No 2',
    estructura: {
      columnas_check: [
        { header_en: '✓  Done', header_es: 'Cumple' },
        { header_en: '✗  Not yet', header_es: 'Aún no' }
      ],
      terminos: [
        { en: 'Name and family (serif/sans-serif) are stated.',         es: 'Nombre y familia están declarados.' },
        { en: '3 adjectives describe the mood, placed BEFORE the noun.', es: '3 adjetivos describen el ánimo, ANTES del sustantivo.' },
        { en: '2 sentences use the preposition IN correctly.',          es: '2 oraciones usan la preposición IN correctamente.' },
        { en: '1 sentence uses AND or BUT as connector.',               es: '1 oración usa AND o BUT como conector.' },
        { en: 'Verb BE (is/are) appears at least 3 times, correctly.',  es: 'El verbo BE (is/are) aparece al menos 3 veces, correctamente.' }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Peer review checklist + 1 suggestion + FINAL Font Card.',
                       es: 'Lista de revisión + 1 sugerencia + Font Card FINAL.' },
    formato:         { en: 'Inline checklist + rewritten card.',
                       es: 'Lista embebida + ficha reescrita.' },
    criterio_minimo: { en: 'All 5 checklist items marked; 1 written suggestion; FINAL card submitted.',
                       es: 'Los 5 ítems marcados; 1 sugerencia escrita; ficha FINAL entregada.' }
  }
},

// ═══════════════════════════════════════════════════════════════════════════
// S4 — APROPIACIÓN: Listening + Speaking
// ═══════════════════════════════════════════════════════════════════════════

{
  actividad_id: 'A3.3.S4.1',
  titulo_en: 'Color Wheel Vocabulary Activation',
  titulo_es: 'Activación de vocabulario — Rueda cromática',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 60,
  agrupacion: 'individual + plenaria',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'Twelve colors, twelve English names. By the end of this activity every color on your wheel will have a label and belong to a temperature family — warm or cool.',
    es: 'Doce colores, doce nombres en inglés. Al final de esta actividad cada color de tu rueda tendrá etiqueta y pertenecerá a una familia de temperatura — cálido o frío.'
  },
  paso_a_paso: [
    { en: 'Receive the Color Wheel worksheet (blank).',
      es: 'Recibe la hoja de la rueda cromática (en blanco).' },
    { en: 'Match each of the 12 colors with its English name using the table below.',
      es: 'Empareja cada uno de los 12 colores con su nombre en inglés en la tabla.' },
    { en: 'For each row, decide: warm (W) or cool (C).',
      es: 'Para cada fila, decide: cálido (W) o frío (C).' },
    { en: 'Transfer your labels to the blank Color Wheel.',
      es: 'Pasa tus etiquetas a la rueda cromática en blanco.' },
    { en: 'Display your wheel on the wall and compare with 2 classmates.',
      es: 'Pega tu rueda en la pared y compara con 2 compañeros.' }
  ],
  scaffold_inline: {
    tipo: 'matching',
    titulo_en: 'Color · English name · Temperature',
    titulo_es: 'Color · Nombre en inglés · Temperatura',
    estructura: {
      columnas: [
        { header_en: 'Color swatch', header_es: 'Muestra',              width_pct: 30 },
        { header_en: 'English name', header_es: 'Nombre en inglés',     width_pct: 45 },
        { header_en: 'Warm / Cool', header_es: 'Cálido / Frío',         width_pct: 25 }
      ],
      filas_prellenadas: [
        [{ label_en: 'Red',    label_es: 'Rojo' },    '', ''],
        [{ label_en: 'Orange', label_es: 'Naranja' }, '', ''],
        [{ label_en: 'Yellow', label_es: 'Amarillo' },'', ''],
        [{ label_en: 'Green',  label_es: 'Verde' },   '', ''],
        [{ label_en: 'Blue',   label_es: 'Azul' },    '', ''],
        [{ label_en: 'Violet', label_es: 'Violeta' }, '', ''],
        [{ label_en: 'Magenta',label_es: 'Magenta' }, '', ''],
        [{ label_en: 'Cyan',   label_es: 'Cian' },    '', ''],
        [{ label_en: 'Lime',   label_es: 'Lima' },    '', ''],
        [{ label_en: 'Teal',   label_es: 'Verde azulado' }, '', ''],
        [{ label_en: 'Coral',  label_es: 'Coral' },   '', ''],
        [{ label_en: 'Navy',   label_es: 'Azul marino' }, '', '']
      ]
    }
  },
  entregable: {
    producto:        { en: 'Matching table + labeled Color Wheel.',
                       es: 'Tabla de emparejamiento + rueda cromática rotulada.' },
    formato:         { en: 'Inline table; wheel on separate A4.',
                       es: 'Tabla embebida; rueda en A4 aparte.' },
    criterio_minimo: { en: 'All 12 rows completed with name + temperature.',
                       es: 'Las 12 filas completas con nombre + temperatura.' }
  }
},

{
  actividad_id: 'A3.3.S4.2',
  titulo_en: "EVIDENCE E3 — Listening: Sophia's voice note + Laura's reply",
  titulo_es: "EVIDENCIA E3 — Escucha: nota de voz de Sophia + respuesta de Laura",
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 75,
  agrupacion: 'individual',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'Evidence 3 is your ear training. You will listen to a 2-minute exchange between Sophia (voice note) and Laura (reply) about color choices for La Esquina bakery — and capture what you hear in a structured sheet.',
    es: 'La Evidencia 3 entrena tu oído. Escucharás un intercambio de 2 minutos entre Sophia (nota de voz) y Laura (respuesta) sobre los colores para la panadería La Esquina — y capturarás lo que oigas en una hoja estructurada.'
  },
  paso_a_paso: [
    { en: 'Listen to the full 2-minute audio once without writing.',
      es: 'Escucha el audio completo de 2 minutos una vez sin escribir.' },
    { en: 'Listen a second time. Write down 6 colors mentioned.',
      es: 'Escucha una segunda vez. Anota 6 colores mencionados.' },
    { en: 'Listen a third time. For each color, mark warm (W) or cool (C).',
      es: 'Escucha una tercera vez. Para cada color, marca cálido (W) o frío (C).' },
    { en: 'Fill the 3 gap sentences in the listening sheet below.',
      es: 'Completa las 3 oraciones con huecos en la hoja de escucha.' },
    { en: 'Submit your sheet to the instructor as Evidence E3.',
      es: 'Entrega tu hoja al instructor como Evidencia E3.' }
  ],
  scaffold_inline: {
    tipo: 'listening_capture',
    titulo_en: 'Listening sheet · Colors + gap sentences',
    titulo_es: 'Hoja de escucha · Colores + huecos',
    badge: 'FORMAL INSTRUMENT  ·  PM-4.1 instrument_3_listening  ·  Lista de Chequeo No 3',
    estructura: {
      secciones: [
        { header_en: '6 colors mentioned', header_es: '6 colores mencionados', tipo: 'boxes', items: 6 },
        { header_en: 'Temperature per color (W / C)', header_es: 'Temperatura de cada color (W / C)', tipo: 'boxes', items: 6 },
        { header_en: 'Gap sentences (write the missing word)', header_es: 'Oraciones con huecos (escribe la palabra faltante)', tipo: 'gap', items: [
          { prompt_en: '1. Sophia wants the bakery to feel ______.',         prompt_es: '1. Sophia quiere que la panadería se sienta ______.' },
          { prompt_en: '2. Laura suggests using ______ as the main accent.', prompt_es: '2. Laura sugiere usar ______ como acento principal.' },
          { prompt_en: '3. They both agree to avoid ______.',                prompt_es: '3. Ambas acuerdan evitar ______.' }
        ] }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Completed listening sheet: 6 colors + 6 temperatures + 3 gap sentences.',
                       es: 'Hoja de escucha: 6 colores + 6 temperaturas + 3 huecos.' },
    formato:         { en: 'Inline listening sheet.', es: 'Hoja de escucha embebida.' },
    criterio_minimo: { en: 'All 15 items filled (6 + 6 + 3).', es: 'Los 15 ítems diligenciados (6 + 6 + 3).' }
  }
},

{
  actividad_id: 'A3.3.S4.3',
  titulo_en: 'Pronunciation Lab — The 4 tricky words',
  titulo_es: 'Laboratorio de pronunciación — Las 4 palabras difíciles',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 70,
  agrupacion: 'individual + dúo de coevaluación',
  voc_dimension: ['procedimental'],
  descripcion_aprendiz: {
    en: 'Four design words sabotage more junior presentations than any other. You will train each one with its IPA, record yourself, compare with the model and rate your own progress.',
    es: 'Cuatro palabras de diseño sabotean más presentaciones junior que cualquier otra. Entrenarás cada una con su AFI, te grabarás, compararás con el modelo y calificarás tu avance.'
  },
  paso_a_paso: [
    { en: 'Listen to the model audio for each of the 4 words.',
      es: 'Escucha el audio modelo de cada una de las 4 palabras.' },
    { en: 'Repeat each word out loud 5 times.',
      es: 'Repite cada palabra en voz alta 5 veces.' },
    { en: 'Record yourself saying all 4 words in a single short clip.',
      es: 'Grábate diciendo las 4 palabras en un clip corto.' },
    { en: 'Compare with the model and rate yourself 1–5 in the table.',
      es: 'Compara con el modelo y califícate 1–5 en la tabla.' },
    { en: 'Coevaluate with a partner: listen to their clip and add a peer rating.',
      es: 'Coevalúa con un compañero: escucha su clip y agrega una calificación.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: 'Pronunciation self-rating',
    titulo_es: 'Autoevaluación de pronunciación',
    estructura: {
      campos: [
        { label_en: 'serif  /ˈser.ɪf/  — self 1–5 / peer 1–5',        label_es: 'serif — propio 1–5 / par 1–5',       lines: 1 },
        { label_en: 'sans-serif  /ˈsænz.ser.ɪf/ — self / peer',       label_es: 'sans-serif — propio / par',          lines: 1 },
        { label_en: 'canvas  /ˈkæn.vəs/ — self / peer',               label_es: 'canvas — propio / par',              lines: 1 },
        { label_en: 'CMYK  /siː.em.waɪˈkeɪ/ — self / peer',           label_es: 'CMYK — propio / par',                lines: 1 },
        { label_en: 'One word I want to improve next',                label_es: 'Una palabra que quiero mejorar después', lines: 1 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Self + peer rating table for 4 words.',
                       es: 'Tabla de autoevaluación y coevaluación de las 4 palabras.' },
    formato:         { en: 'Inline form; audio clip saved separately.',
                       es: 'Formulario embebido; clip de audio guardado aparte.' },
    criterio_minimo: { en: 'All 4 words rated twice (self + peer) + 1 word target.',
                       es: '4 palabras con 2 calificaciones (propia + de par) + 1 palabra objetivo.' }
  }
},

{
  actividad_id: 'A3.3.S4.4',
  titulo_en: 'EVIDENCE E4 — Speaking Roleplay (Junior Designer → Sophia)',
  titulo_es: 'EVIDENCIA E4 — Roleplay de habla (Junior Designer → Sophia)',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 90,
  agrupacion: 'dúos rotativos',
  voc_dimension: ['procedimental', 'actitudinal'],
  descripcion_aprendiz: {
    en: 'Evidence 4 is your first real studio conversation. You will play the Junior Designer presenting one visual reference to Sophia — in English, 3 clean turns.',
    es: 'La Evidencia 4 es tu primera conversación real de estudio. Harás el papel del Junior Designer presentando una referencia visual a Sophia — en inglés, en 3 turnos limpios.'
  },
  paso_a_paso: [
    { en: 'Choose 1 visual reference from Session 1 or 2.',
      es: 'Elige 1 referencia visual de la Sesión 1 o 2.' },
    { en: 'Follow the 3-turn script below to structure your exchange.',
      es: 'Sigue el script de 3 turnos para estructurar el intercambio.' },
    { en: 'Rehearse once in silence; then perform for your partner (Sophia).',
      es: 'Ensaya una vez en silencio; luego actúa frente a tu compañero (Sophia).' },
    { en: 'Sophia asks 1 follow-up question; the Junior answers in English.',
      es: 'Sophia hace 1 pregunta; el Junior responde en inglés.' },
    { en: 'Rotate roles so both partners perform as Junior.',
      es: 'Rota roles para que ambos hagan de Junior.' },
    { en: 'Instructor observes both performances with Escala No 4.',
      es: 'El instructor observa ambas actuaciones con la Escala No 4.' }
  ],
  scaffold_inline: {
    tipo: 'speaking_script',
    titulo_en: '3-turn roleplay script',
    titulo_es: 'Script del roleplay en 3 turnos',
    badge: 'FORMAL INSTRUMENT  ·  PM-4.1 instrument_4_speaking  ·  Escala No 4',
    estructura: {
      turnos: [
        { rol: 'Junior Designer', prompt_en: 'Greet Sophia and introduce yourself (1 sentence).',
                                   prompt_es: 'Saluda a Sophia y preséntate (1 oración).', lines: 2 },
        { rol: 'Junior Designer', prompt_en: 'Describe the reference: color + font family + composition (2–3 sentences).',
                                   prompt_es: 'Describe la referencia: color + familia tipográfica + composición (2–3 oraciones).', lines: 3 },
        { rol: 'Sophia',          prompt_en: 'Ask 1 follow-up question about the reference.',
                                   prompt_es: 'Pregunta 1 cosa sobre la referencia.', lines: 2 },
        { rol: 'Junior Designer', prompt_en: 'Answer Sophia and close (1 sentence).',
                                   prompt_es: 'Responde a Sophia y cierra (1 oración).', lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Live 3-turn exchange observed by instructor + written script template.',
                       es: 'Intercambio en vivo de 3 turnos observado por el instructor + script escrito.' },
    formato:         { en: 'Inline script + oral performance.',
                       es: 'Script embebido + ejecución oral.' },
    criterio_minimo: { en: 'All 4 prompts attempted in English; Sophia\'s question answered.',
                       es: 'Los 4 prompts intentados en inglés; respondida la pregunta de Sophia.' }
  }
},

// ═══════════════════════════════════════════════════════════════════════════
// S5 — APROPIACIÓN: Functions + System
// ═══════════════════════════════════════════════════════════════════════════

{
  actividad_id: 'A3.3.S5.1',
  titulo_en: 'Connector Awareness — AND / BUT in design discourse',
  titulo_es: 'Uso de conectores — AND / BUT en el discurso de diseño',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 60,
  agrupacion: 'individual + plenaria',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'Two small words — AND and BUT — carry most of what a designer says about tension and harmony. Train your ear to choose the right one.',
    es: 'Dos palabras pequeñas — AND y BUT — sostienen casi todo lo que un diseñador dice sobre tensión y armonía. Entrena tu oído para elegir la correcta.'
  },
  paso_a_paso: [
    { en: 'Study the 8 model sentences your instructor shows.',
      es: 'Estudia las 8 oraciones modelo que muestra el instructor.' },
    { en: 'Identify the rule: AND adds, BUT opposes.',
      es: 'Identifica la regla: AND suma, BUT opone.' },
    { en: 'For each of the 10 prompts below, write a full sentence using AND or BUT.',
      es: 'Para cada uno de los 10 estímulos, escribe una oración completa con AND o BUT.' },
    { en: 'Mark each sentence with the connector used (A for AND, B for BUT).',
      es: 'Marca cada oración con el conector usado (A para AND, B para BUT).' },
    { en: 'In plenary, share 2 sentences; the class decides if the connector fits.',
      es: 'En plenaria, comparte 2 oraciones; la clase decide si el conector encaja.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: '10 connector prompts',
    titulo_es: '10 estímulos de conector',
    estructura: {
      campos: [
        { label_en: '1 · red · yellow',            label_es: '1 · rojo · amarillo',         lines: 1 },
        { label_en: '2 · bold · readable',         label_es: '2 · en negrita · legible',    lines: 1 },
        { label_en: '3 · warm · cool',             label_es: '3 · cálido · frío',           lines: 1 },
        { label_en: '4 · simple · expensive',      label_es: '4 · simple · costoso',        lines: 1 },
        { label_en: '5 · serif · sans-serif',      label_es: '5 · serif · sans-serif',      lines: 1 },
        { label_en: '6 · big · elegant',           label_es: '6 · grande · elegante',       lines: 1 },
        { label_en: '7 · round · sharp',           label_es: '7 · redondo · anguloso',      lines: 1 },
        { label_en: '8 · old · modern',            label_es: '8 · viejo · moderno',         lines: 1 },
        { label_en: '9 · light · dark',            label_es: '9 · claro · oscuro',          lines: 1 },
        { label_en: '10 · playful · professional', label_es: '10 · juguetón · profesional', lines: 1 }
      ]
    }
  },
  entregable: {
    producto:        { en: '10 sentences using AND or BUT, each marked A or B.',
                       es: '10 oraciones con AND o BUT, cada una marcada A o B.' },
    formato:         { en: 'Inline form.', es: 'Formulario embebido.' },
    criterio_minimo: { en: '10 complete sentences with the connector explicit.',
                       es: '10 oraciones completas con el conector explícito.' }
  }
},

{
  actividad_id: 'A3.3.S5.2',
  titulo_en: '5 Functions Drill — F1 to F5',
  titulo_es: 'Drill de 5 funciones — F1 a F5',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 100,
  agrupacion: 'dúos rotativos',
  voc_dimension: ['cognitiva', 'procedimental'],
  descripcion_aprendiz: {
    en: 'Five communicative functions, five cards, five attempts. You will cycle through each function with a partner and capture your best attempt in the form below.',
    es: 'Cinco funciones comunicativas, cinco tarjetas, cinco intentos. Pasarás por cada función con un compañero y capturarás tu mejor intento en el formulario de abajo.'
  },
  paso_a_paso: [
    { en: 'Pair up and receive 5 cards: F1 Greet, F2 Identify, F3 Describe, F4 Instruct, F5 Express likes.',
      es: 'Fórmate en pareja y reciban las 5 tarjetas: F1 Saludar, F2 Identificar, F3 Describir, F4 Instruir, F5 Expresar gustos.' },
    { en: 'For each function, take 3 minutes to try it out loud with your partner.',
      es: 'Para cada función, tomen 3 minutos para intentarla en voz alta.' },
    { en: 'Write your best attempt (1 sentence) in the corresponding row.',
      es: 'Escribe tu mejor intento (1 oración) en la fila correspondiente.' },
    { en: 'After the 5 functions, underline the one you performed most comfortably.',
      es: 'Al terminar las 5, subraya la que hiciste con más comodidad.' },
    { en: 'Switch partners and repeat with the hardest function.',
      es: 'Cambia de pareja y repite con la función más difícil.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: 'My best attempt per function',
    titulo_es: 'Mi mejor intento por función',
    estructura: {
      campos: [
        { label_en: 'F1 · Greet + introduce yourself',   label_es: 'F1 · Saludar + presentarse',        lines: 2 },
        { label_en: 'F2 · Identify 3 objects',           label_es: 'F2 · Identificar 3 objetos',        lines: 2 },
        { label_en: 'F3 · Describe with 3 adjectives',   label_es: 'F3 · Describir con 3 adjetivos',    lines: 2 },
        { label_en: 'F4 · Give 2 instructions',          label_es: 'F4 · Dar 2 instrucciones',          lines: 2 },
        { label_en: 'F5 · Express 1 like / dislike',     label_es: 'F5 · Expresar 1 gusto / disgusto',  lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Form with 5 best attempts (1 per function) + most comfortable underlined.',
                       es: 'Formulario con 5 mejores intentos (1 por función) + la más cómoda subrayada.' },
    formato:         { en: 'Inline form.', es: 'Formulario embebido.' },
    criterio_minimo: { en: 'All 5 functions attempted; 1 underlined.',
                       es: 'Las 5 funciones intentadas; 1 subrayada.' }
  }
},

{
  actividad_id: 'A3.3.S5.3',
  titulo_en: 'EVIDENCE E5 — Role Carousel (5 stations × 90 seconds)',
  titulo_es: 'EVIDENCIA E5 — Carrusel de roles (5 estaciones × 90 segundos)',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 130,
  agrupacion: 'rotación 5 estaciones × parejas',
  voc_dimension: ['procedimental', 'actitudinal'],
  descripcion_aprendiz: {
    en: 'Evidence 5 is your full language functions check. You will rotate through 5 stations — one per function — and perform live for 90 seconds. The instructor observes with Escala No 5.',
    es: 'La Evidencia 5 es el cierre completo de funciones. Rotarás por 5 estaciones — una por función — y actuarás en vivo 90 segundos. El instructor observa con la Escala No 5.'
  },
  paso_a_paso: [
    { en: 'Form pairs and assign a starting station (F1–F5).',
      es: 'Formen parejas y asignen una estación inicial (F1–F5).' },
    { en: 'At each station, read the card and perform the function for 90 seconds.',
      es: 'En cada estación, lean la tarjeta y ejecuten la función por 90 segundos.' },
    { en: 'Rotate clockwise when the instructor rings the bell.',
      es: 'Roten en el sentido de las manecillas cuando suene la campana.' },
    { en: 'The instructor marks Escala No 5 — 1 criterion per station.',
      es: 'El instructor marca la Escala No 5 — 1 criterio por estación.' },
    { en: 'After the 5 rotations, complete the self-reflection row below.',
      es: 'Luego de las 5 rotaciones, completa la fila de autorreflexión de abajo.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: 'Station checklist · Criterion the instructor observes',
    titulo_es: 'Lista por estación · Criterio que observa el instructor',
    badge: 'FORMAL INSTRUMENT  ·  PM-4.1 instrument_5_language_functions  ·  Escala No 5',
    estructura: {
      campos: [
        { label_en: 'F1 · Greet — clear opening & name delivered',            label_es: 'F1 · Saludo — apertura clara y nombre dicho',         lines: 1 },
        { label_en: 'F2 · Identify — 3 objects named correctly',              label_es: 'F2 · Identificar — 3 objetos nombrados bien',         lines: 1 },
        { label_en: 'F3 · Describe — 3 adjectives BEFORE noun',               label_es: 'F3 · Describir — 3 adjetivos ANTES del sustantivo',   lines: 1 },
        { label_en: 'F4 · Instruct — 2 imperative sentences delivered',       label_es: 'F4 · Instruir — 2 oraciones imperativas dichas',      lines: 1 },
        { label_en: 'F5 · Express likes — 1 clear preference stated',         label_es: 'F5 · Gustos — 1 preferencia clara',                   lines: 1 },
        { label_en: 'Self-reflection · Which station felt strongest?',        label_es: 'Autorreflexión · ¿Cuál estación fue la más fuerte?',  lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Live 5-station performance + self-reflection row.',
                       es: 'Ejecución en vivo de 5 estaciones + fila de autorreflexión.' },
    formato:         { en: 'Inline checklist + oral performance observed.',
                       es: 'Lista embebida + ejecución oral observada.' },
    criterio_minimo: { en: 'All 5 stations attempted; self-reflection written.',
                       es: 'Las 5 estaciones intentadas; autorreflexión escrita.' }
  }
},

{
  actividad_id: 'A3.3.S5.4',
  titulo_en: 'Wrap-Up Reflection — Which function was hardest?',
  titulo_es: 'Cierre reflexivo — ¿Cuál función fue la más difícil?',
  tipo_actividad_sena: 'Actividad actitudinal',
  tiempo_min: 70,
  agrupacion: 'individual',
  voc_dimension: ['actitudinal'],
  descripcion_aprendiz: {
    en: 'Before we move to Session 6, name the friction. Which of the 5 functions gave you the most trouble, and why? Naming it is how you prepare to unblock it.',
    es: 'Antes de pasar a la Sesión 6, ponle nombre a la fricción. ¿Cuál de las 5 funciones te costó más y por qué? Nombrarla es como empiezas a destrabarla.'
  },
  paso_a_paso: [
    { en: 'Re-read your 5 attempts from A3.3.S5.2 and the station observations.',
      es: 'Re-lee tus 5 intentos de A3.3.S5.2 y las observaciones de las estaciones.' },
    { en: 'Choose the function that gave you the most friction.',
      es: 'Elige la función que más te costó.' },
    { en: 'In the reflection space, write 2 sentences: WHICH function + WHY.',
      es: 'En el espacio de reflexión escribe 2 oraciones: CUÁL función + POR QUÉ.' },
    { en: 'Optional: add 1 small action for Session 6 to work on it.',
      es: 'Opcional: agrega 1 acción pequeña para trabajarla en la Sesión 6.' }
  ],
  scaffold_inline: {
    tipo: 'reflection_lines',
    titulo_en: 'Friction reflection — 2 sentences + 1 action',
    titulo_es: 'Reflexión de fricción — 2 oraciones + 1 acción',
    estructura: {
      prompt_en: 'Which of the 5 functions was hardest, and why?',
      prompt_es: '¿Cuál de las 5 funciones fue la más difícil y por qué?',
      lines: 4
    }
  },
  entregable: {
    producto:        { en: '2-sentence reflection (+ optional action).',
                       es: 'Reflexión de 2 oraciones (+ acción opcional).' },
    formato:         { en: 'Inline space.', es: 'Espacio embebido.' },
    criterio_minimo: { en: '2 complete sentences naming the function and the reason.',
                       es: '2 oraciones completas con función y razón.' }
  }
},

// ═══════════════════════════════════════════════════════════════════════════
// S6 — EVALUACIÓN
// ═══════════════════════════════════════════════════════════════════════════

{
  actividad_id: 'A3.3b.1',
  titulo_en: 'Portfolio Check — Your 5 pieces of evidence',
  titulo_es: 'Revisión de portafolio — Tus 5 evidencias',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 90,
  agrupacion: 'individual con instructor',
  voc_dimension: ['cognitiva', 'actitudinal'],
  descripcion_aprendiz: {
    en: 'Before the consolidated quiz, you and the instructor audit your evidence set. Five pieces. Bring each one. Review each one. No surprises on quiz day.',
    es: 'Antes del cuestionario consolidado, tú y el instructor auditan tu set de evidencias. Cinco piezas. Trae cada una. Revisen cada una. Sin sorpresas el día del quiz.'
  },
  paso_a_paso: [
    { en: 'Bring all 5 evidences: E1 quiz, E2 Font Card, E3 listening, E4 roleplay, E5 carousel.',
      es: 'Trae las 5 evidencias: E1 quiz, E2 Font Card, E3 escucha, E4 roleplay, E5 carrusel.' },
    { en: 'In the checklist below, confirm each evidence is present and signed.',
      es: 'En la lista de abajo, confirma que cada evidencia está presente y firmada.' },
    { en: 'Sit with the instructor for a 10-minute review.',
      es: 'Siéntate con el instructor en una revisión de 10 minutos.' },
    { en: 'For each evidence, mark ✓ (ready), ~ (needs minor fix) or ✗ (missing).',
      es: 'Para cada evidencia marca ✓ (lista), ~ (necesita ajuste) o ✗ (falta).' },
    { en: 'Write 1 sentence: which evidence made you most proud?',
      es: 'Escribe 1 oración: ¿cuál evidencia te dio más orgullo?' }
  ],
  scaffold_inline: {
    tipo: 'checklist',
    titulo_en: 'Portfolio completeness check',
    titulo_es: 'Verificación de portafolio completo',
    estructura: {
      columnas_check: [
        { header_en: '✓  Ready', header_es: 'Lista' },
        { header_en: '~  Fix', header_es: 'Ajustar' },
        { header_en: '✗  Missing', header_es: 'Falta' }
      ],
      terminos: [
        { en: 'E1 · Reading Quiz (5 items, signed)',             es: 'E1 · Quiz de lectura (5 ítems, firmado)' },
        { en: 'E2 · FINAL Font Card (after peer review)',        es: 'E2 · Font Card FINAL (post revisión)' },
        { en: 'E3 · Listening sheet (15 items filled)',          es: 'E3 · Hoja de escucha (15 ítems diligenciados)' },
        { en: 'E4 · Speaking roleplay observation (Escala No 4)', es: 'E4 · Observación del roleplay (Escala No 4)' },
        { en: 'E5 · Carousel checklist (Escala No 5, 5 stations)', es: 'E5 · Lista del carrusel (Escala No 5, 5 estaciones)' }
      ]
    }
  },
  entregable: {
    producto:        { en: '5-item portfolio checklist + 1 pride sentence.',
                       es: 'Lista de 5 ítems + 1 oración de orgullo.' },
    formato:         { en: 'Inline checklist.', es: 'Lista embebida.' },
    criterio_minimo: { en: 'All 5 evidences marked in one column; pride sentence written.',
                       es: 'Las 5 evidencias marcadas en una columna; oración de orgullo escrita.' }
  }
},

{
  actividad_id: 'A3.3b.2',
  titulo_en: 'EVIDENCE E6 — Consolidated Quiz (25 items × 1 pt)',
  titulo_es: 'EVIDENCIA E6 — Cuestionario consolidado (25 ítems × 1 pt)',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 90,
  agrupacion: 'individual',
  voc_dimension: ['cognitiva'],
  descripcion_aprendiz: {
    en: 'Evidence 6 is the integrative cognitive check — 5 sections × 5 items. Below you see one sample item per section so you recognize the shape of the 5 genres.',
    es: 'La Evidencia 6 es el cierre cognitivo integrador — 5 secciones × 5 ítems. Abajo ves un ítem de muestra por sección para que reconozcas la forma de los 5 géneros.'
  },
  paso_a_paso: [
    { en: 'Review your portfolio (E1–E5) for 15 minutes as pre-reading.',
      es: 'Revisa tu portafolio (E1–E5) durante 15 minutos como pre-lectura.' },
    { en: 'Receive the 25-item consolidated quiz.',
      es: 'Recibe el cuestionario consolidado de 25 ítems.' },
    { en: 'Work through the 5 sections in order: Reading, Writing, Listening, Vocabulary, Grammar.',
      es: 'Avanza por las 5 secciones en orden: Lectura, Escritura, Escucha, Vocabulario, Gramática.' },
    { en: 'Answer every item — there is no penalty for attempting.',
      es: 'Responde todos los ítems — no hay castigo por intentar.' },
    { en: 'Review all 25 answers once before submitting.',
      es: 'Revisa las 25 respuestas una vez antes de entregar.' },
    { en: 'Submit the quiz to the instructor.',
      es: 'Entrega el cuestionario al instructor.' }
  ],
  scaffold_inline: {
    tipo: 'quiz_preview',
    titulo_en: 'Quiz preview · 1 sample item per section (5 total shown of 25)',
    titulo_es: 'Vista previa · 1 ítem por sección (5 de 25 mostrados)',
    badge: 'FORMAL INSTRUMENT  ·  PM-4.2 Cuestionario Consolidado  ·  25 items · 5 sections × 5 pts',
    estructura: {
      items: [
        {
          n: 1,
          section_en: 'READING',
          section_es: 'LECTURA',
          q_en: 'According to "The Story of Two Fonts", serif typefaces originated in:',
          q_es: 'Según "The Story of Two Fonts", las fuentes serif se originaron en:',
          opts: [
            { k: 'A', en: 'Medieval calligraphy.',       es: 'Caligrafía medieval.' },
            { k: 'B', en: 'Ancient Roman inscriptions.', es: 'Inscripciones romanas antiguas.' },
            { k: 'C', en: '20th-century printing.',      es: 'Impresión del siglo XX.' },
            { k: 'D', en: 'Digital screens.',            es: 'Pantallas digitales.' }
          ]
        },
        {
          n: 2,
          section_en: 'VOCABULARY',
          section_es: 'VOCABULARIO',
          q_en: 'Which word means "space between letter pairs"?',
          q_es: '¿Qué palabra significa "espacio entre pares de letras"?',
          opts: [
            { k: 'A', en: 'Canvas.',   es: 'Canvas.' },
            { k: 'B', en: 'Palette.',  es: 'Palette.' },
            { k: 'C', en: 'Kerning.',  es: 'Kerning.' },
            { k: 'D', en: 'Contrast.', es: 'Contrast.' }
          ]
        }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Completed 25-item quiz (5 sections × 5 items).',
                       es: 'Cuestionario de 25 ítems (5 secciones × 5 ítems).' },
    formato:         { en: 'Printed quiz provided by instructor.',
                       es: 'Cuestionario impreso entregado por el instructor.' },
    criterio_minimo: { en: 'All 25 items answered; name and date filled in.',
                       es: 'Los 25 ítems respondidos; nombre y fecha diligenciados.' }
  }
},

{
  actividad_id: 'A3.3b.3',
  titulo_en: 'Co-evaluation + Apropiación Closure',
  titulo_es: 'Coevaluación + Cierre de Apropiación',
  tipo_actividad_sena: 'Actividad actitudinal',
  tiempo_min: 90,
  agrupacion: 'grupos de 4',
  voc_dimension: ['actitudinal'],
  descripcion_aprendiz: {
    en: 'Close the Apropiación phase with peers. Share your portfolio, give a design star, reflect out loud on the journey from Session 1 to Session 6.',
    es: 'Cierra la fase de Apropiación con los compañeros. Comparte tu portafolio, otorga una estrella de diseño, reflexiona en voz alta sobre el camino de la Sesión 1 a la Sesión 6.'
  },
  paso_a_paso: [
    { en: 'Form groups of 4. Lay out all 5 evidences on the table.',
      es: 'Formen grupos de 4. Pongan las 5 evidencias sobre la mesa.' },
    { en: 'Each person presents their portfolio in 2 minutes.',
      es: 'Cada persona presenta su portafolio en 2 minutos.' },
    { en: 'Give a design star ★ to one peer, written below with a 1-sentence reason.',
      es: 'Otorga una estrella ★ a un compañero, escrito abajo con 1 oración de razón.' },
    { en: 'Reflect as a group: what was the biggest leap from S1 to S6?',
      es: 'Reflexionen en grupo: ¿cuál fue el mayor salto de S1 a S6?' },
    { en: 'Write your individual leap sentence in the reflection space.',
      es: 'Escribe tu oración individual del salto en el espacio de reflexión.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: 'Design star + my leap',
    titulo_es: 'Estrella de diseño + mi salto',
    estructura: {
      campos: [
        { label_en: '★ Design star goes to (peer name)',          label_es: '★ La estrella va para (nombre del compañero)', lines: 1 },
        { label_en: 'Reason — 1 sentence in English',             label_es: 'Razón — 1 oración en inglés',                  lines: 2 },
        { label_en: 'My biggest leap from S1 to S6 — 1 sentence', label_es: 'Mi mayor salto de S1 a S6 — 1 oración',        lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Design star to 1 peer + my leap sentence.',
                       es: 'Estrella a 1 compañero + mi oración del salto.' },
    formato:         { en: 'Inline form.', es: 'Formulario embebido.' },
    criterio_minimo: { en: 'Peer name + reason + personal leap sentence.',
                       es: 'Nombre del compañero + razón + oración personal.' }
  }
},

{
  actividad_id: 'A3.3b.4',
  titulo_en: 'Bridge to Final Mission',
  titulo_es: 'Puente a la Misión Final',
  tipo_actividad_sena: 'Actividad actitudinal',
  tiempo_min: 90,
  agrupacion: 'individual + plenaria corta',
  voc_dimension: ['actitudinal'],
  descripcion_aprendiz: {
    en: 'The Final Mission Brief is about to land on your desk. Read it in silence. Commit to one sentence starting with "For the Final Mission, I will…"',
    es: 'El brief de la Misión Final está por llegar a tu mesa. Léelo en silencio. Comprométete con una oración que empiece por "For the Final Mission, I will…"'
  },
  paso_a_paso: [
    { en: 'Receive the Final Mission Brief (1 page).',
      es: 'Recibe el brief de la Misión Final (1 página).' },
    { en: 'Read it once in silence.',
      es: 'Léelo una vez en silencio.' },
    { en: 'In the commitment space below, write 1 sentence: "For the Final Mission, I will…"',
      es: 'En el espacio de compromiso escribe 1 oración: "For the Final Mission, I will…"' },
    { en: 'Share your sentence in a short plenary.',
      es: 'Comparte tu oración en una plenaria corta.' }
  ],
  scaffold_inline: {
    tipo: 'reflection_lines',
    titulo_en: 'My commitment — 1 sentence',
    titulo_es: 'Mi compromiso — 1 oración',
    estructura: {
      prompt_en: 'For the Final Mission, I will…',
      prompt_es: 'Para la Misión Final, yo…',
      lines: 3
    }
  },
  entregable: {
    producto:        { en: '1-sentence commitment starting with "For the Final Mission, I will…"',
                       es: '1 oración de compromiso que inicie con "For the Final Mission, I will…"' },
    formato:         { en: 'Inline space.', es: 'Espacio embebido.' },
    criterio_minimo: { en: '1 complete sentence; shared in plenary.',
                       es: '1 oración completa; compartida en plenaria.' }
  }
},

// ═══════════════════════════════════════════════════════════════════════════
// S7–S8 — TRANSFERENCIA: Final Mission ABP
// ═══════════════════════════════════════════════════════════════════════════

{
  actividad_id: 'A3.4.1',
  titulo_en: "PLAN — Read Sophia's Brief & plan your direction",
  titulo_es: 'PLANEAR — Lee el brief de Sophia y planea tu rumbo',
  tipo_actividad_sena: 'Actividad cognitiva',
  tiempo_min: 105,
  agrupacion: 'individual',
  voc_dimension: ['cognitiva', 'actitudinal'],
  descripcion_aprendiz: {
    en: 'Sophia needs a visual direction for La Esquina bakery — a family business that wants to feel modern but warm. Your first move: decide the core choices before you search a single image.',
    es: 'Sophia necesita un rumbo visual para la panadería La Esquina — un negocio familiar que quiere sentirse moderno pero cálido. Tu primer movimiento: decidir las elecciones centrales antes de buscar una sola imagen.'
  },
  paso_a_paso: [
    { en: "Read Sophia's 1-page brief silently.",
      es: 'Lee el brief de 1 página de Sophia en silencio.' },
    { en: 'Complete your Planning Canvas below with 5 decisions.',
      es: 'Completa tu Planning Canvas con 5 decisiones.' },
    { en: 'Each decision must be specific — no vague words like "nice" or "cool".',
      es: 'Cada decisión debe ser específica — sin palabras vagas como "lindo" o "cool".' },
    { en: 'Validate your canvas with a classmate in 3 minutes.',
      es: 'Valida tu canvas con un compañero en 3 minutos.' },
    { en: 'Adjust 1 decision if your classmate\'s feedback convinced you.',
      es: 'Ajusta 1 decisión si el feedback del compañero te convenció.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: 'Planning Canvas · 5 decisions',
    titulo_es: 'Canvas de planeación · 5 decisiones',
    estructura: {
      campos: [
        { label_en: '1 · What kind of bakery is La Esquina?',            label_es: '1 · ¿Qué tipo de panadería es La Esquina?',            lines: 2 },
        { label_en: '2 · What mood should the brand feel?',              label_es: '2 · ¿Qué ánimo debe transmitir la marca?',             lines: 2 },
        { label_en: '3 · Serif or sans-serif? Why?',                     label_es: '3 · ¿Serif o sans-serif? ¿Por qué?',                   lines: 2 },
        { label_en: '4 · Warm palette, cool palette, or mix?',           label_es: '4 · ¿Paleta cálida, fría o mixta?',                    lines: 2 },
        { label_en: '5 · 6 reference categories I will search for',      label_es: '5 · 6 categorías de referencia que buscaré',           lines: 3 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Planning Canvas with 5 specific decisions.',
                       es: 'Canvas de planeación con 5 decisiones específicas.' },
    formato:         { en: 'Inline canvas.', es: 'Canvas embebido.' },
    criterio_minimo: { en: '5 decisions filled; specific language (no vague adjectives).',
                       es: '5 decisiones diligenciadas; lenguaje específico (sin adjetivos vagos).' }
  }
},

{
  actividad_id: 'A3.4.2',
  titulo_en: 'DESIGN — Reference search & visual selection',
  titulo_es: 'DISEÑAR — Búsqueda de referencias y selección visual',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 95,
  agrupacion: 'individual con peer scout libre',
  voc_dimension: ['cognitiva', 'procedimental'],
  descripcion_aprendiz: {
    en: 'Armed with your Planning Canvas, hunt for 6 real visual references — one per category — from the world (logos, posters, magazine covers, packaging, social posts). Collect, label, justify.',
    es: 'Con tu canvas de planeación en mano, caza 6 referencias visuales reales — una por categoría — del mundo real (logos, afiches, portadas, empaques, posts). Colecciona, etiqueta, justifica.'
  },
  paso_a_paso: [
    { en: 'Copy your 6 categories from A3.4.1 into the reference grid below.',
      es: 'Copia tus 6 categorías de A3.4.1 al grid de referencias.' },
    { en: 'For each category, search online or in physical magazines.',
      es: 'Para cada categoría, busca en línea o en revistas físicas.' },
    { en: 'Choose 1 reference per category; write its source (URL or magazine + page).',
      es: 'Elige 1 referencia por categoría; escribe su fuente (URL o revista + página).' },
    { en: 'Write a short English label (5–7 words) that captures why you chose it.',
      es: 'Escribe una etiqueta corta en inglés (5–7 palabras) que capte por qué la elegiste.' },
    { en: 'Ask 1 peer to scout 1 of your choices and challenge or confirm it.',
      es: 'Pide a 1 compañero que audite 1 de tus elecciones y la cuestione o confirme.' },
    { en: 'Print or organize digitally for the board build in A3.4.3.',
      es: 'Imprime u organiza digitalmente para el armado del mood board en A3.4.3.' }
  ],
  scaffold_inline: {
    tipo: 'form',
    titulo_en: '6 references · source + English label',
    titulo_es: '6 referencias · fuente + etiqueta en inglés',
    estructura: {
      campos: [
        { label_en: 'Ref 1 · Category', label_es: 'Ref 1 · Categoría', lines: 1 },
        { label_en: 'Ref 1 · Source + label', label_es: 'Ref 1 · Fuente + etiqueta', lines: 2 },
        { label_en: 'Ref 2 · Category', label_es: 'Ref 2 · Categoría', lines: 1 },
        { label_en: 'Ref 2 · Source + label', label_es: 'Ref 2 · Fuente + etiqueta', lines: 2 },
        { label_en: 'Ref 3 · Category', label_es: 'Ref 3 · Categoría', lines: 1 },
        { label_en: 'Ref 3 · Source + label', label_es: 'Ref 3 · Fuente + etiqueta', lines: 2 },
        { label_en: 'Ref 4 · Category', label_es: 'Ref 4 · Categoría', lines: 1 },
        { label_en: 'Ref 4 · Source + label', label_es: 'Ref 4 · Fuente + etiqueta', lines: 2 },
        { label_en: 'Ref 5 · Category', label_es: 'Ref 5 · Categoría', lines: 1 },
        { label_en: 'Ref 5 · Source + label', label_es: 'Ref 5 · Fuente + etiqueta', lines: 2 },
        { label_en: 'Ref 6 · Category', label_es: 'Ref 6 · Categoría', lines: 1 },
        { label_en: 'Ref 6 · Source + label', label_es: 'Ref 6 · Fuente + etiqueta', lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: '6 references with source + English label + peer scout on 1.',
                       es: '6 referencias con fuente + etiqueta + auditoría de par en 1.' },
    formato:         { en: 'Inline form; refs printed or in digital folder.',
                       es: 'Formulario embebido; referencias impresas o en carpeta digital.' },
    criterio_minimo: { en: '6 refs with source; 6 English labels; 1 peer validation note.',
                       es: '6 referencias con fuente; 6 etiquetas en inglés; 1 nota de par.' }
  }
},

{
  actividad_id: 'A3.4.3',
  titulo_en: 'PERFORM — Build your final Mood Board',
  titulo_es: 'EJECUTAR — Construye tu Mood Board final',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 60,
  agrupacion: 'individual',
  voc_dimension: ['procedimental'],
  descripcion_aprendiz: {
    en: 'Six references, one A3 surface. Arrange them with intention and write the FINAL English label for each — 2–4 sentences using A1.1 grammar (BE + IN + adjectives before noun + and/but + a/an).',
    es: 'Seis referencias, una superficie A3. Acomódalas con intención y escribe la etiqueta FINAL en inglés para cada una — 2–4 oraciones con gramática A1.1 (BE + IN + adjetivos antes del sustantivo + and/but + a/an).'
  },
  paso_a_paso: [
    { en: 'Arrange the 6 references on A3 (physical or digital PDF).',
      es: 'Acomoda las 6 referencias en A3 (físico o PDF).' },
    { en: 'For each reference, write the FINAL English label using the template below.',
      es: 'Para cada referencia escribe la etiqueta FINAL usando la plantilla.' },
    { en: 'Each label: 2–4 sentences with BE + IN + 2 adjectives BEFORE noun + and/but + a/an.',
      es: 'Cada etiqueta: 2–4 oraciones con BE + IN + 2 adjetivos ANTES del sustantivo + and/but + a/an.' },
    { en: 'Re-read each label out loud once to check rhythm and clarity.',
      es: 'Re-lee cada etiqueta en voz alta una vez para revisar ritmo y claridad.' },
    { en: 'Save the Mood Board as PDF or photograph; keep for A3.4.4 pitch.',
      es: 'Guarda el Mood Board como PDF o foto; consérvalo para el pitch de A3.4.4.' }
  ],
  scaffold_inline: {
    tipo: 'writing_template',
    titulo_en: '6 FINAL labels · 2–4 sentences each',
    titulo_es: '6 etiquetas FINAL · 2–4 oraciones cada una',
    estructura: {
      lineas_gap: [
        { prompt_en: 'Ref 1 · FINAL label', prompt_es: 'Ref 1 · Etiqueta FINAL', lines: 3 },
        { prompt_en: 'Ref 2 · FINAL label', prompt_es: 'Ref 2 · Etiqueta FINAL', lines: 3 },
        { prompt_en: 'Ref 3 · FINAL label', prompt_es: 'Ref 3 · Etiqueta FINAL', lines: 3 },
        { prompt_en: 'Ref 4 · FINAL label', prompt_es: 'Ref 4 · Etiqueta FINAL', lines: 3 },
        { prompt_en: 'Ref 5 · FINAL label', prompt_es: 'Ref 5 · Etiqueta FINAL', lines: 3 },
        { prompt_en: 'Ref 6 · FINAL label', prompt_es: 'Ref 6 · Etiqueta FINAL', lines: 3 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'A3 Mood Board + 6 FINAL English labels.',
                       es: 'Mood Board en A3 + 6 etiquetas FINAL en inglés.' },
    formato:         { en: 'A3 + inline labels.', es: 'A3 + etiquetas embebidas.' },
    criterio_minimo: { en: '6 labels, 2–4 sentences each, with BE + IN + adj position.',
                       es: '6 etiquetas, 2–4 oraciones cada una, con BE + IN + posición de adjetivo.' }
  }
},

{
  actividad_id: 'A3.4.4',
  titulo_en: 'PRESENT — Pitch your Mood Board to Sophia (2 minutes)',
  titulo_es: 'PRESENTAR — Pitch de tu Mood Board a Sophia (2 minutos)',
  tipo_actividad_sena: 'Actividad procedimental',
  tiempo_min: 95,
  agrupacion: 'individual ante Sophia (instructor o compañero rotativo)',
  voc_dimension: ['procedimental', 'actitudinal'],
  descripcion_aprendiz: {
    en: 'Two minutes. That is all Sophia gives you. Three moves: greet + introduce, describe 3 of your 6 references, close with your visual recommendation for La Esquina.',
    es: 'Dos minutos. Eso te da Sophia. Tres movimientos: saludo + presentación, descripción de 3 de las 6 referencias, cierre con tu recomendación visual para La Esquina.'
  },
  paso_a_paso: [
    { en: 'Rehearse alone once following the 3-move script below.',
      es: 'Ensaya solo una vez siguiendo el script de 3 movimientos.' },
    { en: 'Time yourself: greet 20s + describe 3 refs 80s + close 20s = 2 minutes.',
      es: 'Mide tu tiempo: saludo 20s + 3 refs 80s + cierre 20s = 2 minutos.' },
    { en: 'Present your Mood Board live to Sophia (instructor or rotating peer).',
      es: 'Presenta en vivo tu Mood Board a Sophia (instructor o compañero).' },
    { en: 'Keep eye contact; point at each reference as you describe it.',
      es: 'Mantén contacto visual; señala cada referencia al describirla.' },
    { en: 'Close with your visual recommendation in 1 clear sentence.',
      es: 'Cierra con tu recomendación visual en 1 oración clara.' },
    { en: 'After the pitch, swap roles if paired.',
      es: 'Después del pitch, intercambien roles si están en parejas.' }
  ],
  scaffold_inline: {
    tipo: 'speaking_script',
    titulo_en: '3-move pitch · 2 minutes total',
    titulo_es: 'Pitch en 3 movimientos · 2 minutos total',
    estructura: {
      turnos: [
        { rol: 'OPEN  (20 s)', prompt_en: 'Greet Sophia and introduce yourself (1 sentence).',
                                prompt_es: 'Saluda a Sophia y preséntate (1 oración).', lines: 2 },
        { rol: 'BODY  (80 s)', prompt_en: 'Describe 3 of your 6 references (color, font, composition) — 1 sentence each.',
                                prompt_es: 'Describe 3 de tus 6 referencias (color, fuente, composición) — 1 oración por cada una.', lines: 4 },
        { rol: 'CLOSE (20 s)', prompt_en: 'State your visual recommendation for La Esquina in 1 clear sentence.',
                                prompt_es: 'Declara tu recomendación visual para La Esquina en 1 oración clara.', lines: 2 }
      ]
    }
  },
  entregable: {
    producto:        { en: 'Live 2-minute pitch + written 3-move script.',
                       es: 'Pitch en vivo de 2 minutos + script escrito.' },
    formato:         { en: 'Inline script + oral performance.', es: 'Script embebido + ejecución oral.' },
    criterio_minimo: { en: 'Open + 3 descriptions + close delivered within 2 min.',
                       es: 'Apertura + 3 descripciones + cierre en 2 minutos.' }
  }
},

{
  actividad_id: 'A3.4.5',
  titulo_en: 'ASSESS — Self-reflection + peer evaluation',
  titulo_es: 'EVALUAR — Autorreflexión + evaluación de pares',
  tipo_actividad_sena: 'Actividad actitudinal',
  tiempo_min: 60,
  agrupacion: 'individual + plenaria',
  voc_dimension: ['actitudinal'],
  descripcion_aprendiz: {
    en: 'Rate your own performance honestly with 5 emoji questions, give one design star to a peer with a reason, and close the whole journey with one open sentence of what you take with you.',
    es: 'Califica tu desempeño con honestidad en 5 preguntas con emoji, otorga una estrella a un compañero con razón, y cierra todo el camino con una oración abierta sobre lo que te llevas.'
  },
  paso_a_paso: [
    { en: 'Answer the 5 emoji-scale questions below (🙂 / 😐 / 🙁).',
      es: 'Responde las 5 preguntas con escala emoji (🙂 / 😐 / 🙁).' },
    { en: 'Choose 1 peer and write their name.',
      es: 'Elige 1 compañero y escribe su nombre.' },
    { en: 'Justify your design star in 1 English sentence.',
      es: 'Justifica tu estrella en 1 oración en inglés.' },
    { en: 'Answer the 1 open reflection question.',
      es: 'Responde la pregunta abierta de reflexión.' },
    { en: 'Share your open sentence in plenary if you want.',
      es: 'Comparte tu oración abierta en plenaria si quieres.' }
  ],
  scaffold_inline: {
    tipo: 'rating',
    titulo_en: 'Self + peer · 5 emoji questions + peer star + open reflection',
    titulo_es: 'Autoevaluación y par · 5 preguntas + estrella + reflexión',
    estructura: {
      items: [
        { prompt_en: '1 · My Planning Canvas decisions were specific.',       prompt_es: '1 · Mis decisiones del canvas fueron específicas.',       escala: 'emoji' },
        { prompt_en: '2 · My 6 references fit the bakery mood.',              prompt_es: '2 · Mis 6 referencias cuadran con el ánimo de la panadería.', escala: 'emoji' },
        { prompt_en: '3 · My English labels used BE + IN + adj position.',    prompt_es: '3 · Mis etiquetas usaron BE + IN + posición del adjetivo.', escala: 'emoji' },
        { prompt_en: '4 · My pitch opened, described 3 refs and closed.',     prompt_es: '4 · Mi pitch abrió, describió 3 refs y cerró.',           escala: 'emoji' },
        { prompt_en: '5 · I stayed within 2 minutes.',                        prompt_es: '5 · Me mantuve en los 2 minutos.',                        escala: 'emoji' }
      ],
      open_peer: {
        prompt_en: '★ Design star to (peer name) — 1 sentence reason',
        prompt_es: '★ Estrella a (nombre del compañero) — 1 oración de razón',
        lines: 2
      },
      open_self: {
        prompt_en: 'What do I take with me from this whole journey? (1 sentence)',
        prompt_es: '¿Qué me llevo de todo este camino? (1 oración)',
        lines: 2
      }
    }
  },
  entregable: {
    producto:        { en: '5 emoji ratings + peer star + open reflection sentence.',
                       es: '5 calificaciones + estrella + oración de reflexión.' },
    formato:         { en: 'Inline rating card.', es: 'Tarjeta de evaluación embebida.' },
    criterio_minimo: { en: 'All 5 emoji filled; peer star + reason; 1 open sentence written.',
                       es: 'Las 5 emoji marcadas; estrella + razón; 1 oración abierta.' }
  }
}

];
