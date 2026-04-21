---
title: PASO 1 — Diagnóstico por Síntomas — Veredicto Final
date: 2026-04-20
branch: mgv-g1-pre-rework
commit: 312d1d0
method: Comparación binaria y textual de DOCX review (18:28) vs FINAL (22:10) para identificar qué se rompió y qué lo rompió
---

# PASO 1 — ¿Qué decisión jodió qué?

## TL;DR — El canon v2.6 NO es el culpable

El contenido de las decisiones arquitectónicas (schemas estructurados, `pm0_alignment_by_session`, `activity_footer`, `contenido_inline`, doble render) está **sólido**. Los 28 JSONs del run tienen la información correcta y completa.

**Lo que se rompió fue la capa de renderizado**: los scripts `.js` que producen los DOCX FINAL fueron modificados el 2026-04-20 entre las 20:22 y 22:10 para leer los nuevos schemas v2.6, pero **perdieron funcionalidad crítica de presentación** en el proceso. Los DOCX FINAL salieron peor que los DOCX review generados horas antes.

---

## Evidencia de regresión

| Documento | Review (18:28) | FINAL (22:10) | Pérdida |
|-----------|----------------|---------------|---------|
| pm-3-1 | 46,574 bytes / 1079 párrafos / 48,047 chars | 21,162 bytes / 298 párrafos / 21,159 chars | **−55% tamaño · −72% párrafos · −56% texto** |
| pm-3-6 | 46,420 bytes / 986 párrafos / 59,641 chars | 31,694 bytes / 904 párrafos / 35,956 chars | **−32% tamaño · −8% párrafos · −40% texto** |
| pm-3-5 | 26,591 bytes | 26,591 bytes | idéntico (OK) |

---

## Bugs concretos identificados (con línea de código)

### BUG 1 — `[object Object]` masivo en pm-3-1 §3 (PM-0 Alignment)

**Síntoma:** 32 ocurrencias de `[object Object]` en campos clave de las 8 sesiones.

```
L1 target %: [object Object]%
Dominant feedback mode: [object Object]
CEFR descriptor: [object Object]
```

**Causa raíz:** El schema v2.6 de `pm-3-1.json` tiene estos campos como **objetos estructurados** `{value, source}` o `{mode, rationale}`, no como primitivos.

```json
"l1_percentage_target": { "value": 30, "source": "pm-0-context.json ..." },
"dominant_feedback_mode": { "mode": "ACCURACY", "rationale": "Día 1 prioriza ..." },
"cefr_descriptor_focus":  { "subnivel": "A1.1", "habilidad_principal": "..." }
```

Pero el generador `gen_audit_docx.js` (líneas 220–240) los trata como strings:

```js
ch.push(kv('L1 target %', s.l1_percentage_target != null ? `${s.l1_percentage_target}%` : '—'));
ch.push(kv('Dominant feedback mode', s.dominant_feedback_mode));
ch.push(kv('CEFR descriptor', s.cefr_descriptor_focus));
```

**Quién lo causó:** Actualización de schema B3 (canon v2.6 promovió `pm0_alignment_by_session` con trazabilidad estructurada) sin actualizar el generador.

---

### BUG 2 — JSON crudo en stress_focus y success_factors

**Síntoma:** Una línea entera de JSON crudo aparece como texto visible al lector:

```
Stress focus: {"target_words":[{"word":"Helvetica","ipa":"/hɛlˈvɛtɪkə/","tonica":"SEGUNDA (helVEtica)"}, ...]
```

**Causa raíz:** El generador tiene fallback a `JSON.stringify(s.stress_focus)` cuando el campo es objeto. En v2.6 esos campos SIEMPRE son objetos complejos, así que el fallback se activa SIEMPRE.

```js
ch.push(kv('Stress focus', Array.isArray(s.stress_focus) ? s.stress_focus.join(' · ') : JSON.stringify(s.stress_focus)));
```

**Quién lo causó:** Mismo que BUG 1.

---

### BUG 3 — Iteración carácter-por-carácter en pm-3-1 §4 (Recursos variables)

**Síntoma:** 61 líneas de un carácter cada una aparecen como lista numerada:

```
0: V
1: e
2: r
3:  
4: c
5: a
6: m
7: p
8: o
...
```

Deletrea el string: `"Ver campo 'ambiente' en cada session_detail[n].logistics_box."`

**Causa raíz:** El schema pone `recursos_variables_por_sesion` como **string** (nota referencial). El generador hace `Object.entries(string)`, que en JavaScript itera los caracteres como índice/char.

**Quién lo causó:** El generador `gen_audit_docx.js` asume que ese campo es siempre un objeto.

---

### BUG 4 — §5 Glosario de pm-3-6 prácticamente vacío (29 chars)

**Síntoma:** El review tenía las 20 Toolbelt Words completas con definición EN/ES + ejemplos (2,459 chars). El FINAL tiene solo el encabezado `"5. Glosario (Key Vocabulary)"` — **29 chars, 0 palabras**.

**Causa raíz:** El generador `gen_audit_docx.js` busca el glosario en un campo que no coincide con el schema del JSON. Probablemente quedó huérfano durante el refactor.

**Quién lo causó:** Refactor del generador PM-3.6 para canon v2.6 (regla 10/11/12).

---

### BUG 5 — §4 Evidencias de pm-3-6 colapsó a placeholders

**Síntoma:** La tabla de evidencias muestra:
```
E1  —  —  —  —  —
E2  —  —  —  —  —
E3  —  —  —  —  —
E4  —  —  —  —  —
E5  —  —  —  —  —
```

El review tenía cada E1–E6 con descripción de 5 líneas (qué es, cuándo, cómo evaluada, puntos, tipo SENA) — 11,197 chars totales. El FINAL tiene 2,520 chars (−77%).

**Causa raíz:** El generador nuevo arma la tabla leyendo campos que no existen en el schema actual (ej. busca `e.nombre` pero el JSON tiene `e.titulo`).

**Quién lo causó:** Refactor del generador PM-3.6.

---

### BUG 6 — pm-3-6 expone nombres internos del schema al lector

**Síntoma:** En §6 Referencias aparecen los nombres internos de los campos como si fueran labels para el estudiante:

```
titulo_aprendiz: 6. References (Suggested Resources)
fuentes_curadas_pm12: [object Object] · [object Object] · [object Object]
recursos_adicionales_recomendados_a11: British Council LearnEnglish ...
nota: Toda referencia externa es opcional. ...
```

**Causa raíz:** El generador hace `Object.entries()` sobre el objeto §6 y usa las keys tal cual. No tiene un mapa `{key_interno → label para el aprendiz}`.

**Quién lo causó:** Refactor del generador PM-3.6.

---

## Conclusión: separar canon vs generador

| Capa | Diagnóstico | Acción |
|------|------------|--------|
| **Canon v2.6 (contenido del prompt)** | Sólido. Schemas estructurados mejoran trazabilidad. `pm0_alignment_by_session`, `activity_footer`, `contenido_inline` son decisiones correctas. | **KEEP** |
| **JSONs de MGV-2026-04-20** (28 archivos) | Pobladas correctamente con schema v2.6. Contenido pedagógico íntegro. | **KEEP** |
| **Generadores `gen_audit_docx.js` + `gen_35_36_docx.js`** | Schema drift: leen schemas antiguos mientras el JSON es v2.6. Perdieron rutas de render. Exponen nombres internos. | **REDO** (re-escribir, no revertir) |

---

## Lo que el Paso 2 ya no necesita decidir

Originalmente el Paso 2 planteaba "¿qué hacemos con los 28 JSONs?". Diagnóstico resuelve la pregunta:

- Los 28 JSONs están **bien**.
- El problema está aislado a ~200 líneas dentro de 2 scripts (`gen_audit_docx.js` buildPM31Docx + buildPM36Docx; `gen_35_36_docx.js` buildPM36Docx si aplica).
- El Paso 2 se simplifica a: **fix 6 bugs específicos en los generadores** (sin tocar canon ni JSONs).

---

## Plan de fix (propuesta para tu aprobación)

Lista acotada y auditable — 6 arreglos:

1. **PM-3.1 §3** — Desestructurar `l1_percentage_target`, `dominant_feedback_mode`, `cefr_descriptor_focus` (mostrar `.value`, `.mode`, `.subnivel`)
2. **PM-3.1 §3** — Renderizar `stress_focus` y `success_factors_priorized` como párrafos con sub-campos, no JSON.stringify
3. **PM-3.1 §4** — Tratar `recursos_variables_por_sesion` como string cuando lo es (no `Object.entries` sobre string)
4. **PM-3.6 §5 Glosario** — Conectar al campo correcto del JSON (probablemente `key_vocabulary_pm12` o `glosario_consolidado`)
5. **PM-3.6 §4 Evidencias** — Mapear nombres de campo al schema actual (`titulo_aprendiz`, `tipo_sena`, `puntos_canon`, etc.)
6. **PM-3.6 §6 Referencias** — Reescribir con labels legibles; no `Object.entries()` directo

Tiempo estimado: 30–45 min de trabajo de fix + 1 round de regeneración + verificación de los 4 DOCX.

---

## Tu decisión ahora

Ante este diagnóstico, hay 3 caminos:

**A)** Arreglar los 6 bugs en los generadores y regenerar los 4 DOCX (lo más barato, preserva todo el canon v2.6).

**B)** Revertir los generadores al estado pre-v2.6 y renunciar a renderizar `pm0_alignment_by_session` (revertir B3) → pierde BUG-PM31-001 fix.

**C)** Abrir el canon v2.6 y simplificar los schemas para que los generadores antiguos funcionen (revertir parcialmente B3 y quizá B5) → pierde trazabilidad estructurada.

Recomendación: **A**. Los schemas v2.6 representan trabajo conceptual sólido; el problema está en ≤200 líneas de JS. Revertir canon sería tirar el diseño pedagógico por un bug de presentación.
