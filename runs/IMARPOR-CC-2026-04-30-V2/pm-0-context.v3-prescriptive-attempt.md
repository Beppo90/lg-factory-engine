# PM-0 v3.0 · Contexto Pedagógico · IMARPOR-CC-2026-04-30-V2

**Run ID:** IMARPOR-CC-2026-04-30-V2
**Guide ID:** IMARPOR-CC-V2-G1
**Master Prompt:** PM-0 v3.0 (simplificado · paradigm shift post PM-0.0)
**Generado:** 2026-05-01
**Instructores:** Sergio Leonardo Cortés · Diana Rocío Samboni
**Centro:** FPI SENA Bilingüismo

---

## 1. Por qué este artefacto es distinto (paradigm shift v3.0)

PM-0 v3.0 abandona el rol de **constructor de matriz pedagógica** y asume el rol de **capa pedagógica liviana**. La matriz curricular (saberes, procesos, criterios alineados por RAP) ya vive canónicamente en `pm-0-0-matriz-alineada.json` (output de PM-0.0). PM-0 NO duplica esa información — solo la **referencia** y agrega tres capas que la matriz no contiene:

1. **Universo narrativo** (terminal, personajes, escenarios, vocabulario sector específico).
2. **CEFR descriptors** del subnivel objetivo (A2.1) — solo target, no los 6 subniveles del marco.
3. **Principios pedagógicos aplicables** (5 maestros, NO 13 sub-principios prescriptivos).

Resultado práctico: **18 fields top-level** (vs ~41 del schema v1.x), **6 validation_checks** (vs 22), **8 grupos gramaticales sector-relevantes** (vs 17 hardcoded). Libertad LLM explícita REGLA 10.

---

## 2. Matriz alineada heredada (referencia · NO duplicada)

PM-0 consume `runs/IMARPOR-CC-2026-04-30-V2/pm-0-0-matriz-alineada.json` como insumo principal. Resumen ejecutivo:

| RAP | Verbo cognitivo | Foco temático |
|-----|-----------------|---------------|
| RA1 | RECONOCER | Vocablos básicos físicos buque/puerto + oficios |
| RA2 | COMPRENDER | Frases SMCP estandarizadas OMI |
| RA3 | APLICAR | Reglas gramaticales básicas puerto-buque |
| RA4 | DESCRIBIR | Funciones habituales/momentáneas marítimo-portuarias |

**Overlaps documentados** (no arbitrarios, justificados pedagógicamente en PM-0.0):
- MODAL VERBS · RA3 (regla gramatical) ↔ RA4 (función descriptiva).
- EXPRESAR E INTERPRETAR ÓRDENES · RA3 (imperative aplicado) ↔ RA4 (acto descriptivo del rol).

PM-0 NO toca esta matriz. Cualquier downstream que necesite saberes/criterios canon debe leer `_matriz_alineada_ref` y consumir directamente `pm-0-0-matriz-alineada.json`.

---

## 3. Programa · datos canónicos

- **Denominación:** Inglés Marítimo y Portuario (Curso Complementario).
- **Código SOFÍA:** 12340002.
- **Duración:** 100h (72h directas + 28h independientes).
- **Sesiones:** 12 × 6h.
- **Regla bloques:** absorción Na1 (single-guía absorbe los 4 RAPs internamente).
- **Total guías:** 1.
- **Sector:** marítimo y portuario.
- **Subsector:** banana / fruta refrigerada · cold chain reefer · Cavendish export.

---

## 4. CEFR · subnivel objetivo A2.1 (entrada A1.2 → salida A2.1)

PM-0 v3.0 produce descriptores **solo** del subnivel target. Los 6 subniveles A1.1→A2.2 permanecen en la sección legacy del master prompt como referencia, no como requirement.

### Descriptors A2.1 sector-aplicados

- **Comprensión oral:** capta operaciones reefer · seguridad puerto · instrucciones SMCP simples · órdenes pilot vía VHF.
- **Comprensión lectora:** reefer logs · ATP cert · phytosanitary cert · SMCP message markers · safety signage.
- **Interacción oral:** intercambios sencillos cold chain familiares · reefer plug-in · setpoint reporting al capitán · briefings ICA.
- **Producción oral:** describe rol (Junior Reefer Operator) · equipo (cold chain crew Puerto Antioquia) · funciones (plug-in inspection · temperature monitoring · tripartite handover).
- **Producción escrita:** refrigeration log entries · short reports temperature deviation · email simple a Captain Lim.
- **Vocabulario activo:** ~1500 palabras · 70% sector + 30% general.
- **Gramática:** verb to be + simple present · imperative · modal verbs · tag questions · present progressive + prepositional phrases · quantifiers · first conditional emergente.
- **Fonología:** NATO Phonetic automatizado · stress correcto en lexicón sector (REE-fer · phy-to-SAN-i-ta-ry).

---

## 5. Universo narrativo · Puerto Antioquia · Eje Bananero

> **Preservado del análisis V2 anterior** (Hito 7 · pre-paradigm-shift). NO re-inventado. Solo reorganizado bajo schema v3.0.

### Terminal

Puerto Antioquia · Terminal Multipropósito de Urabá · Necoclí · Antioquia · Caribe colombiano. Operacional desde 2025. Vocación principal Eje Bananero (~80% del banano colombiano de exportación). Tres zonas críticas: Pre-cooling chamber · Reefer yard (plug-in + genset backup) · Front de muelle (vessels reefer + container ships con reefer plugs). Hinterland Antioquia + Eje Cafetero vía Túnel del Toyo desde Medellín.

### Personajes

- **Manuel Padilla** (avatar aprendiz, 24 años, Apartadó) — Junior Reefer Operator + Cold Chain Technician Track · 2ª semana en el rol · A1.1 inicial → A2.1 final.
- **Carolina Vélez** (mentor pilot, B2) — Port Pilot · primera mujer pilota práctica del Terminal · bilingüe nativa-funcional · modela inglés operativo VHF.
- **Hernando Ospina** (mentor safety, B1+) — Terminal Safety Manager · supervisa Toolbox Talks bilingües.
- **Mariana Suárez** (mentor banana-specific, B2) — Cold Chain Coordinator + ICA Phytosanitary Liaison · figura banana-essential.
- **Captain Lim Wei-Ming** (cliente externo, singapurense) — Vessel Master MV CARIBBEAN STAR (Star Reefers · 9,200 DWT · 580 reefer plugs).
- **Andrés Mejía** (bosun secundario, colombiano de Turbo) — coordina cuadrilla local stevedores reefer.

### Vocabulario sector central (19 términos)

reefer · cold chain · banana cluster · Cavendish · CFR · ICA · phytosanitary · pre-cooling · temperature setpoint 13.3-13.9°C · genset · ATP certificate · weight tolerance · refrigeration log · VHF · SMCP · plug-in inspection · tripartite handover · GlobalGAP · Rainforest Alliance.

### Scenarios operacionales

Reefer plug-in inspection · Cold chain audit pre-shipment · Pre-shipment phytosanitary check · Banana export manifest verification · Bridge VHF coordination · Tripartite handover (Vessel + Port + ICA).

### Imagery & iconography

Real photos profesionales del Eje Bananero (NO cartoon · NO infantil). Uniformes safety, grúas reefer, contenedores Star Reefers, muelle banano Urabá, pre-cooling chamber, reefer yard, ICA inspector con clipboard fitosanitario, banana cluster Cavendish. Iconografía técnica adulta: anchor · radio VHF · contenedor reefer · termómetro digital · grúa portuaria · plug socket · phytosanitary stamp · cluster banana.

---

## 6. Final Mission · Pre-Departure Banana Reefer Compliance Check & Tripartite Handover

**Título completo:** "The CARIBBEAN STAR Departure".
**Duración:** 90 min · **L2:** 100% · **Panel:** 3 evaluadores (Captain Lim · Hernando Ospina · Mariana Suárez).

| Fase | Duración | Actividad |
|------|----------|-----------|
| 1 | 30 min | Reefer yard walk + plug-in inspection (Manuel verifica 6 reefer containers) |
| 2 | 20 min | VHF bridge call (arrival exchange con MV CARIBBEAN STAR · SMCP message markers) |
| 3 | 40 min | Tripartite handover (Manuel presenta Cold Chain Audit + Reefer Temperature Log + ATP cert + Phytosanitary cert al panel) |

Evidencia alineada cubre los 4 RAPs (RA1 vocablos reconocidos · RA2 SMCP usado · RA3 modals/imperatives/tag questions aplicados · RA4 descripción funcional roles+processes+ubicaciones).

---

## 7. Principios pedagógicos aplicables (5 maestros REGLA 2)

1. **Contenido técnico primario** — el idioma se enseña ALREDEDOR de cold chain real banana. Realia (ATP cert · refrigeration log · SMCP cards · phytosanitary cert · reefer manifest). Yard walks y bridge VHF, no aulas abstractas.
2. **Progresión CEFR diferenciada** — A1.2 → A2.1 en 12 sesiones. Bloques internos por RAP: S1-S3 RA1 vocablos · S4-S6 RA2 SMCP · S7-S9 RA3 gramática aplicada · S10-S12 RA4 descripción funcional + Final Mission. Solo descriptors A2.1 (NO los 6 subniveles).
3. **L1 decrece progresivamente** — S1-S3: 30% L1 (huddles formalizados para conceptos densos: ICA regs · phytosanitary · concord modals) · S4-S8: 15% (aclaraciones puntuales) · S9-S12: 0-5% (L2 dominante). LLM ajusta per cohort observed.
4. **Feedback diferenciado accuracy ↔ fluency** — accuracy (modal verbs · simple present · SMCP exact phrases · NATO Phonetic · imperative form) corregido inmediato durante drills. Fluency (VHF roleplay · tripartite handover · debrief circles · peer-pilot rotaciones) feedback diferido al cierre, respetando flow.
5. **Evidencia alineada al criterio** — cada actividad valida un criterio específico del RAP heredado de matriz PM-0.0. Trazabilidad criterio↔evidencia obligatoria en cada `pm-3-2-sX.json`.

---

## 8. Tono pedagógico V2

**Estilo:** colaborativo · trabajo-equipo · cold-chain-first.

**Rituales canon:**
- Debrief circles post-actividad (3-5 min · 1 takeaway por aprendiz en L2).
- Peer-pilot rotaciones (rotar rol mentor cada 3 sesiones · aprendiz designado coachea peer).
- Stand-down ritual cierre de sesión (3 takeaways: 1 cold-chain risk · 1 vocabulario nuevo · 1 SMCP phrase).
- L1 huddles formalizados S1-S3 (15 min · ICA regulations · phytosanitary terminology densa).

**Diferenciador V2 vs V1:** V1 IMARPOR-CC fue concentrado-disciplinado (instructor central). V2 es colaborativo-grupal (debrief, peer-pilot, stand-down).

---

## 9. Grammar focus per session (sector-relevante · 8 grupos · NO 17)

REGLA 3 explícita: la gramática del programa hereda de PM-0.0 RA3 (donde toda la gramática está concentrada). El LLM activa solo los grupos sector-relevantes:

| Grupo | Sesiones | Justificación sector |
|-------|----------|----------------------|
| verb to be + simple present | S1-S3 | Rutinas reefer ops · identificación roles |
| demonstratives + singular/plural nouns | S2-S4 | Señalética · vocabulario físico |
| imperative + commands SMCP | S2-S5 | Órdenes capitán→timonel · pilot→tug |
| modal verbs CAN/COULD/SHOULD/MUST/MAY | S4-S8 | Phytosanitary regs · safety · permission |
| tag questions | S6-S9 | VHF confirmation exchanges |
| present progressive + prep phrases | S5-S10 | Maniobras · ubicación dinámica buque |
| quantifiers | S7-S10 | Carga banana · tonelaje · weight tolerance |
| first conditional emergente | S9-S12 | Contingency cold chain ('if temp rises >14°C, then alert ICA') |

**Excluidos justificadamente:** past tense · future perfect · subjunctive · pasiva compleja. El sector cold chain pre-departure opera en presente + imperativo + modal + condicional simple. Past/future complejos NO aparecen en realia operacional A1-A2.

---

## 10. Validation checks · 6/6 PASS

| # | Check | Status |
|---|-------|--------|
| 1 | matriz_alineada_ref_valid | PASS |
| 2 | cefr_subnivel_canonical | PASS |
| 3 | universo_narrativo_complete | PASS |
| 4 | principios_aplicados | PASS |
| 5 | no_duplication_matriz | PASS |
| 6 | anti_copia_fantasma | PASS |

Detalle de evidencia en `pm-0-context.json` campo `validation_checks`. Ningún check FAIL → `enriched: false` se mantiene a la espera de gate Sergio pre-PM-1.1, no por error de generación.

---

## 11. Downstream consumers

- **PM-1.1** ruta macrotemática POR RAP (consume matriz + universo + CEFR target).
- **PM-1.2** scope POR RAP (curación fuentes auténticas con universo banana cold chain).
- **PM-2.x** ACs (universo + principios + matriz como context creativo).
- **PM-3.x** generación (universo + CEFR descriptors A2.1).
- **PM-2.11** consume directamente PM-0.0 (NO PM-0).
- **PM-3.7 V04** consume PM-0.0 + PM-2.11 (NO PM-0).

---

## 12. Audit · simplificación v3.0

- `fields_count_top_level: 18` (objetivo 12-18 cumplido).
- `matriz_curricular_NOT_duplicated: true`.
- `saberes_conceptos_array_present: false`, `saberes_proceso_array_present: false`, `criterios_evaluacion_array_present: false`.
- `cefr_descriptors_only_target_subnivel: true`, `cefr_descriptors_6_subniveles_NOT_present: true`.
- `grammar_groups_count: 8` (vs 17 v1.x).
- `validation_checks_count: 6` (vs 22 v1.x).

---

**Gate pendiente:** Sergio approval pre-PM-1.1 cascade.
