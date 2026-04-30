#!/usr/bin/env node
/**
 * fix-pm36-v27.js — One-shot transformer to fix structural compliance issues
 * in pm-3-6.json (IMARPOR-CC-2026-04-27).
 *
 * Fixes:
 *   1. tipo_actividad_sena strict (REGLA 23 v2.7)
 *      - "actitudinal" → "Actividad actitudinal"
 *      - "procedimental" → "Actividad procedimental"
 *      - "Actividad cognitiva (evidencia formal)" → "Actividad cognitiva"
 *      - "Actividad procedimental (evidencia formal)" / "(... · final)" / "(... · segmento parcial)"
 *        → "Actividad procedimental"
 *      - "Actividad cognitiva (evidencia formal sumativa)" → "Actividad cognitiva"
 *
 *   2. scaffold_inline.estructura per-tipo canon shapes (REGLA 27)
 *      Per-activity remap: PRESERVE pedagógico content · only fix structural keys.
 *
 *   3. rating items escala "✓ ~ ?" → "emoji" (REGLA 27 · solo "emoji" valid)
 *
 *   4. A3.4.5 reflection_lines: scaffold currently rating-shaped. Convert to
 *      reflection_lines canon shape {prompt_en, prompt_es, lines: N}.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const PM36_PATH = path.resolve(__dirname, '..', 'pm-3-6.json');
const pm36 = JSON.parse(fs.readFileSync(PM36_PATH, 'utf8'));

// ── Helpers ────────────────────────────────────────────────────────────────

function normalizeTipo(tipo) {
  if (!tipo) return tipo;
  const parts = String(tipo).split(/\s*\+\s*/).map(p => p.trim());
  const valid = new Set(['Actividad cognitiva', 'Actividad procedimental', 'Actividad actitudinal']);
  const out = [];
  for (let p of parts) {
    p = p.replace(/\s*\(.*?\)\s*$/, '').trim();
    if (/^cognitiva$/i.test(p))      p = 'Actividad cognitiva';
    if (/^procedimental$/i.test(p))  p = 'Actividad procedimental';
    if (/^actitudinal$/i.test(p))    p = 'Actividad actitudinal';
    if (!valid.has(p)) {
      const m = p.match(/^Actividad\s+(cognitiva|procedimental|actitudinal)/i);
      if (m) p = `Actividad ${m[1].toLowerCase()}`;
    }
    out.push(p);
  }
  return [...new Set(out)].join(' + ');
}

const acts = [];
(function walk(o) {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) return o.forEach(walk);
  if (o.actividad_id || o.activity_id) acts.push(o);
  for (const k of Object.keys(o)) walk(o[k]);
})(pm36.seccion_3_actividades_aprendizaje);

// ── Per-activity scaffold rewrites ─────────────────────────────────────────

const SCAFFOLD_REWRITES = {

  'A3.2.1': (sc) => {
    const items = (sc.estructura && sc.estructura.items) || [];
    sc.estructura = {
      columnas: [
        { header_en: 'Person', header_es: 'Persona', width_pct: 50 },
        { header_en: 'Role',   header_es: 'Rol',     width_pct: 50 }
      ],
      filas_prellenadas: items.map(it => {
        const [enPerson, enRole] = String(it.en).split(/\s*·\s*/);
        const [esPerson, esRole] = String(it.es).split(/\s*·\s*/);
        return {
          en: { col_a: enPerson || it.en, col_b: enRole || '' },
          es: { col_a: esPerson || it.es, col_b: esRole || '' }
        };
      })
    };
  },

  'A3.2.2': (sc) => {
    const items = (sc.estructura && sc.estructura.items) || [];
    sc.estructura = {
      columnas_check: sc.estructura.columnas_check || [
        { header_en: '✓ I commit',      header_es: 'Me comprometo' },
        { header_en: '✗ I have doubts', header_es: 'Tengo dudas'  }
      ],
      terminos: items.map(it => ({
        en: it.texto_en || it.en || '',
        es: it.texto_es || it.es || ''
      }))
    };
  },

  'A3.3.S2.1': (sc) => {
    const turnos = (sc.estructura && sc.estructura.turnos) || [];
    sc.estructura = {
      turnos: turnos.map(t => ({
        rol:       t.rol       || t.hablante || 'Trainee',
        prompt_en: t.prompt_en || t.linea_en || '',
        prompt_es: t.prompt_es || t.linea_es || '',
        lines:     t.lines     || 2
      }))
    };
  },

  'A3.3.S3.3': (sc) => {
    const items = (sc.estructura && sc.estructura.items) || [];
    const TF_OPTS = [
      { k: 'A', en: 'True',  es: 'Verdadero' },
      { k: 'B', en: 'False', es: 'Falso'     }
    ];
    const SHORT_OPTS = [
      { k: 'A', en: 'Short answer (1-3 words)', es: 'Respuesta corta (1-3 palabras)' },
      { k: 'B', en: 'Full sentence',            es: 'Oración completa'                }
    ];
    const MC_OPTS_ITEM3 = [
      { k: 'A', en: 'bollard', es: 'bita'    },
      { k: 'B', en: 'crane',   es: 'grúa'    },
      { k: 'C', en: 'bow',     es: 'proa'    },
      { k: 'D', en: 'funnel',  es: 'chimenea' }
    ];
    sc.estructura = {
      items: items.map((it, i) => {
        const out = {
          n:    it.n   || (i + 1),
          q_en: it.q_en || it.pregunta_en || '',
          q_es: it.q_es || it.pregunta_es || ''
        };
        if (Array.isArray(it.opts) && it.opts.length >= 2) {
          out.opts = it.opts;
        } else {
          const tipo = (it.tipo || '').toLowerCase();
          if (tipo.includes('t/f')) out.opts = TF_OPTS;
          else if (it.n === 3 || (it.pregunta_en || '').includes('bollard'))
            out.opts = MC_OPTS_ITEM3;
          else out.opts = SHORT_OPTS;
        }
        return out;
      })
    };
  },

  'A3.3.S4.2': (sc) => {
    const slots = (sc.estructura && sc.estructura.slots) || [];
    const SLOT_GLOSS_ES = {
      'vessel name':                          'Nombre del buque',
      'berth #':                              'Número de berth',
      'bow location':                         'Ubicación de la proa',
      'stern location':                       'Ubicación de la popa',
      'bridge deck level':                    'Nivel del puente',
      'imperative + bollard/crane location':  'Imperativo + ubicación de bita/grúa',
      'imperative + gate/IN office':          'Imperativo + puerta/oficina IN',
      'verb + status':                        'Verbo + estado',
      'negative status':                      'Estado negativo'
    };
    sc.estructura = {
      lineas_gap: slots.map(s => ({
        prompt_en: s,
        prompt_es: SLOT_GLOSS_ES[s] || s,
        lines: 1
      }))
    };
  },

  'A3.3.S5.1': (sc) => {
    const items = (sc.estructura && sc.estructura.items) || [];
    sc.estructura = {
      columnas: [
        { header_en: 'SMCP phrase', header_es: 'Frase SMCP',  width_pct: 50 },
        { header_en: 'Meaning',     header_es: 'Significado', width_pct: 50 }
      ],
      filas_prellenadas: items.map(it => ({
        en: { col_a: it.en || '', col_b: '' },
        es: { col_a: it.en || '', col_b: it.es || '' }
      }))
    };
  },

  'A3.3.S5.2': (sc) => {
    const secs = (sc.estructura && sc.estructura.secciones) || [];
    sc.estructura = {
      secciones: secs.map(s => ({
        header_en: s.header_en || s.label_en || '',
        header_es: s.header_es || s.label_es || '',
        tipo:      s.tipo      || 'gap',
        guia:      s.guia      || '',
        lineas:    s.lineas    || 1
      }))
    };
  },

  'A3.3.S6.1': (sc) => {
    const turnos = (sc.estructura && sc.estructura.turnos) || [];
    sc.estructura = {
      turnos: turnos.map(t => ({
        rol:       t.rol       || t.hablante || 'Speaker',
        prompt_en: t.prompt_en || t.linea_en || '',
        prompt_es: t.prompt_es || t.linea_es || '',
        lines:     t.lines     || 2
      }))
    };
  },

  'A3.3.S7.1': (sc) => {
    const secs = (sc.estructura && sc.estructura.secciones) || [];
    sc.estructura = {
      secciones: secs.map(s => ({
        header_en: s.header_en || s.label_en || '',
        header_es: s.header_es || s.label_es || '',
        tipo:      s.tipo      || 'gap',
        guia:      s.guia      || '',
        lineas:    s.lineas    || 2
      }))
    };
  },

  'A3.3.S8.1': (sc) => {
    const turnos = (sc.estructura && sc.estructura.turnos) || [];
    sc.estructura = {
      turnos: turnos.map(t => ({
        rol:       t.rol       || t.hablante || 'Speaker',
        prompt_en: t.prompt_en || t.linea_en || '',
        prompt_es: t.prompt_es || t.linea_es || '',
        lines:     t.lines     || 3
      }))
    };
  },

  'A3.3.S9.1': (sc) => {
    const turnos = (sc.estructura && sc.estructura.turnos) || [];
    sc.estructura = {
      turnos: turnos.map(t => ({
        rol:       t.rol       || t.hablante || 'Station',
        prompt_en: t.prompt_en || t.linea_en || '',
        prompt_es: t.prompt_es || t.linea_es || '',
        lines:     t.lines     || 2
      }))
    };
  },

  'A3.3b.1': (sc) => {
    const items = (sc.estructura && sc.estructura.items) || [];
    sc.estructura = {
      items: items.map(it => ({
        prompt_en: it.prompt_en || '',
        prompt_es: it.prompt_es || '',
        escala:    'emoji'
      }))
    };
  },

  'A3.3b.2': (sc) => {
    const items = (sc.estructura && sc.estructura.items) || [];
    const SECTION_OPTS = [
      { k: 'A', en: 'Items demonstrate transfer to new context', es: 'Ítems demuestran transferencia al nuevo contexto' },
      { k: 'B', en: 'Items repeat already-seen examples',         es: 'Ítems repiten ejemplos ya vistos'                  }
    ];
    sc.estructura = {
      items: items.map((it, i) => ({
        n:    i + 1,
        q_en: it.q_en || it.pregunta_en || '',
        q_es: it.q_es || it.pregunta_es || '',
        opts: Array.isArray(it.opts) && it.opts.length >= 2 ? it.opts : SECTION_OPTS
      }))
    };
  },

  'A3.3b.3': (sc) => {
    const items = (sc.estructura && sc.estructura.items) || [];
    sc.estructura = {
      columnas_check: sc.estructura.columnas_check || [
        { header_en: '✓ I have it', header_es: 'Lo tengo' },
        { header_en: '~ Partial',   header_es: 'Parcial'  },
        { header_en: '? Missing',   header_es: 'Falta'    }
      ],
      terminos: items.map(it => ({
        en: it.texto_en || it.en || '',
        es: it.texto_es || it.es || ''
      }))
    };
  },

  'A3.4.2': (sc) => {
    const slots = (sc.estructura && sc.estructura.slots) || [];
    const SLOT_GLOSS_ES = {
      'vessel name':           'Nombre del buque',
      'LOA':                   'Eslora total',
      'TEU':                   'TEU',
      'ETA':                   'ETA (hora estimada de llegada)',
      'ETD':                   'ETD (hora estimada de salida)',
      'berth #':               'Número de berth',
      'tide times':            'Horas de marea',
      'responsibility scope':  'Alcance de mi responsabilidad',
      'Diego specialty':       'Especialidad de Diego',
      'Bosun coordination':    'Coordinación de Bosun Romero',
      'Lopera supervision':    'Supervisión de Captain Lopera',
      'report to':             'Reporto a',
      'wind contingency':      'Contingencia de viento',
      'tide contingency':      'Contingencia de marea'
    };
    sc.estructura = {
      lineas_gap: slots.map(s => ({
        prompt_en: s,
        prompt_es: SLOT_GLOSS_ES[s] || s,
        lines: 1
      }))
    };
  },

  'A3.4.3': (sc) => {
    const turnos = (sc.estructura && sc.estructura.turnos) || [];
    sc.estructura = {
      turnos: turnos.map(t => ({
        rol:       t.rol       || t.hablante || 'Turn',
        prompt_en: t.prompt_en || t.linea_en || '',
        prompt_es: t.prompt_es || t.linea_es || '',
        lines:     t.lines     || 4
      }))
    };
  },

  'A3.4.4': (sc) => {
    const turnos = (sc.estructura && sc.estructura.turnos) || [];
    sc.estructura = {
      turnos: turnos.map(t => ({
        rol:       t.rol       || t.hablante || 'Section',
        prompt_en: t.prompt_en || t.linea_en || '',
        prompt_es: t.prompt_es || t.linea_es || '',
        lines:     t.lines     || 3
      }))
    };
  },

  'A3.4.5': (sc) => {
    const est  = sc.estructura || {};
    const open = est.open_self || est.open_peer || {};
    sc.estructura = {
      prompt_en: open.prompt_en ||
                 'What I see now that I did not see on Day 1 (3-5 sentences EN/ES free)',
      prompt_es: open.prompt_es ||
                 'Lo que ahora veo y no veía el Día 1 (3-5 oraciones)',
      lines:     open.lines || 5
    };
  }
};

// ── Apply fixes ────────────────────────────────────────────────────────────

let tipoFixed = 0;
let scaffoldFixed = 0;
let ratingFixed = 0;

for (const a of acts) {
  const id = a.actividad_id || a.activity_id;

  if (a.tipo_actividad_sena) {
    const before = a.tipo_actividad_sena;
    const after  = normalizeTipo(before);
    if (after !== before) {
      a.tipo_actividad_sena = after;
      tipoFixed++;
      console.log(`[tipo] ${id}: "${before}" → "${after}"`);
    }
  }

  if (a.scaffold_inline && SCAFFOLD_REWRITES[id]) {
    const before = JSON.stringify(a.scaffold_inline.estructura);
    SCAFFOLD_REWRITES[id](a.scaffold_inline);
    const after = JSON.stringify(a.scaffold_inline.estructura);
    if (before !== after) {
      scaffoldFixed++;
      if (a.scaffold_inline.tipo === 'rating') ratingFixed++;
      console.log(`[scaffold] ${id}: ${a.scaffold_inline.tipo} estructura rewritten`);
    }
  }
}

fs.writeFileSync(PM36_PATH, JSON.stringify(pm36, null, 2));
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Fixes applied:`);
console.log(`  tipo_actividad_sena fixes:   ${tipoFixed}`);
console.log(`  scaffold_inline fixes:       ${scaffoldFixed}`);
console.log(`  rating escala fixes:         ${ratingFixed}`);
console.log(`Saved → pm-3-6.json`);
