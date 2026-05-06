# KICKOFF · Mejora #3 PM-0 · REGLA 14 NEW Mid-Program Awareness Pedagógica Estructural

**Sesión planificada:** Próxima Cowork · ~2h estimado
**Fecha kickoff:** 2026-05-05
**Estado:** Parked · ready to dispatch
**Predecesor inmediato:** Mejora #4 cerrada (schema NEW v3.3.1) · DM v3.27

---

## 1. Trigger del problema

PM-0 v3.3.1 maneja correctamente los **extremos** del eje guide_position:

| Caso | Regla canónica | Behavior |
|------|----------------|----------|
| **G1 of N** (apertura programa) | default | LLM diseña sin contexto previo (no hay G0) |
| **G_n of N** donde n = N (CIERRE PROGRAMA) | REGLA 13.3 | `final_mission` integra N comps · `cierre_programa: true` · `_cobertura_total_programa` |

**Pero NO maneja explícitamente el caso intermedio:**

| Caso | Gap actual |
|------|-----------|
| **G_k of N** donde 1 < k < N (mid-program) | ❌ PM-0 NO declara qué saberes G1..G(k-1) ya cubrieron · NO declara qué saberes G(k+1)..GN aún cubrirán · LLM puede repetir innecesariamente o concluir prematuramente |

**Ejemplo concreto INFRATI:** G2 (de 3 guías) se diseña sin awareness explícito de:
- Qué `final_mission` G1 ya entrenó (no debe re-entrenar el mismo capstone parcial)
- Qué saberes G3 cerrará (no debe agotar la integración antes de tiempo)
- Qué cognitive load se acumula G1 → G2 (Bloom L2 G1 → L3 G2 vs L3 G1 → L3 G2 = drift)

## 2. Hipótesis de canon · REGLA 14 NEW

REGLA 14 declarará la awareness pedagógica estructural mid-program como **obligatoria** cuando `total_guias > 1` AND no es CIERRE PROGRAMA:

```jsonc
{
  "_position_programa": {
    "guide_id": "G2",
    "guide_total": 3,
    "es_apertura": false,                    // k === 1
    "es_cierre_programa": false,             // k === N
    "es_intermedia": true,                   // 1 < k < N

    "guias_anteriores": ["G1"],
    "saberes_acumulados_g_anteriores": {
      "G1": {
        "ra_codigos": ["RA1", "RA2"],
        "competencias_tecnicas_ya_cubiertas": ["220501086"],
        "cefr_subnivel": "A1.1",
        "evidencias_g1": ["E1_S3_Reading_C01", "..."]
      }
    },

    "guias_posteriores": ["G3"],
    "saberes_pendientes_g_posteriores": {
      "G3": {
        "ra_codigos": ["RA3", "RA4"],
        "competencias_tecnicas_pendientes": ["220501103"],
        "cefr_subnivel_target": "A1.3",
        "es_ultima_guia": true
      }
    },

    "_anclaje_matriz": {
      "cognitive_load_acumulado_bloom": "L2 → L3 (G1 cerró L2 · G2 abre L3 · G3 cerrará L4)",
      "cefr_progresion_inter_guia": "A1.1 (G1) → A1.2 (G2) → A1.3 (G3)",
      "no_concluir_capstone_aqui": true,       // anti-pattern: G2 no debe simular cierre programa
      "no_repetir_saberes_g1": true            // anti-pattern: re-entrenar contenido ya consolidado
    }
  }
}
```

## 3. Sub-reglas anticipadas

### REGLA 14.1 — Detección automática position
Inspecciona `programa.total_guias` + `_raps_metadata.guide_id` upstream → categoriza apertura/intermedia/cierre.

### REGLA 14.2 — Heredancia saberes anteriores
Lee matrices alineadas G1..G(k-1) (paths conocidos en `runs/<RUN-ID>/g<n>/pm-0-0-matriz-alineada.json`) → extrae RAs + competencias + CEFR + evidencias.

### REGLA 14.3 — Heredancia saberes posteriores
Lee matrices G(k+1)..GN (si existen runtime) o `_cobertura_total_programa` (si CIERRE upstream lo emitió) → declara qué pending.

### REGLA 14.4 — Anti-conclusion premature flag
Si `es_intermedia === true`: `final_mission` de esta guía NO debe simular CIERRE PROGRAMA · escenario debe ser **scope reducido** (solo competencias de esta guía + arrastre G1..G(k-1)) · NO N comps integradas.

### REGLA 14.5 — Anti-repetition flag
Si saber X ya cubrió G(k-1) en Bloom L3: G_k debe abrir en Bloom L3+ o L4 sobre ese saber · NO retrocede a L1-L2.

### REGLA 14.6 — Cognitive load progression check
Validation_check 9 NEW (BLOQUEANTE): la progresión Bloom inter-guía debe ser monotónica creciente o, máximo, estable (NO decreciente).

### REGLA 14.7 — Schema NEW field `_position_programa`
Top-level · OBLIGATORIO cuando `total_guias > 1`. Conditional schema: si guide_total > 1 · `_position_programa` required.

## 4. Cobertura cross-PM downstream

REGLA 14 propaga awareness a:

| PM downstream | Uso de `_position_programa` |
|---------------|---------------------------|
| PM-1.1 | macrotemáticas G_k NO repiten G1..G(k-1) · NO anticipan G(k+1)..GN |
| PM-1.2 | curación fuentes per RAP NO duplica fuentes G_anteriores · vocabulario_anchor incrementa NO reemplaza |
| PM-2.0 | Session blueprint G_k abre Bloom donde G(k-1) cerró · NO reset |
| PM-2.x ACs | actividades referencian saberes G_anteriores como prerequisito · NO como objetivo nuevo |
| PM-3.5 final_mission G_k | scope mid · NO simula CIERRE PROGRAMA |

## 5. Casos operacionales que activarían la regla

| Run | Modo | guide_total | guide_id | es_intermedia | Aplica REGLA 14 |
|-----|------|-------------|----------|---------------|----------------|
| INFRATI-2026-05-04 G1 | multi-comp | 3 | G1 | false (apertura) | parcial · solo `guias_posteriores` |
| INFRATI-2026-05-04 G2 | multi-comp | 3 | G2 | **true** | ✅ FULL |
| INFRATI-2026-05-04 G3 | multi-comp | 3 | G3 | false (cierre) | parcial · solo `guias_anteriores` (REGLA 13.3 ya activa) |
| RECREACION-IMDER G1 | single-comp v2.0 | 2 | G1 | false (apertura) | parcial |
| RECREACION-IMDER G2 | single-comp v2.0 | 2 | G2 | false (cierre) | parcial · REGLA 13.3 |
| MGV-2026 G3 | single-comp legacy | 6 | G3 | **true** | ✅ FULL |
| MGV-2026 G4 | single-comp legacy | 6 | G4 | **true** | ✅ FULL |
| IMARPOR-CC-V2 | single-comp legacy | 1 | G1 | false (única) | N/A · regla NO activa |

## 6. Estimación 2h sesión

| Bloque | Tiempo | Tarea |
|--------|--------|-------|
| 1 | 20min | Pre-flight REGLA 19 · leer matrices INFRATI G1+G2+G3 buscando "asimetría inter-guía" empírica |
| 2 | 30min | Drafting REGLA 14 con sub-reglas 14.1-14.7 · schema field `_position_programa` |
| 3 | 20min | Updating PM-0 master prompt v3.3.1 → v3.4 · adicionar REGLA 14 + Anexo D mid-program example INFRATI G2 verbatim |
| 4 | 15min | Bumping schema `pm-0-context.schema.json` v3.3.1 → v3.4 · adicionar field + conditional schema |
| 5 | 20min | Audit independiente LLM Agent (auditor anti-drift 6-pasos) · verifica regla coherente · sin contradicciones REGLA 13 |
| 6 | 15min | Memory snapshot + DM bump v3.27 → v3.28 + cierre sesión |

## 7. Deliverables previstos

- `master-prompts/PM-0 — CEFR Framework & Pedagogical Foundation.md` v3.3.1 → v3.4 (REGLA 14 NEW + Anexo D)
- `v4/schemas/pm-0-context.schema.json` v3.3.1 → v3.4 (field `_position_programa` + conditional schema #4)
- `v4/scripts/validate-pm-0-context.sh` (sin cambios · wrapper agnóstico)
- `audits/PM-0-AUDIT-MEJORA-3-REGLA-14-2026-MM-DD.md` (audit anti-drift)
- `memory/feedback_pm0_regla_14_mid_program_awareness.md` (snapshot canon)
- DM v3.27 → v3.28 (entrada Mejora #3)

## 8. Pre-requisitos antes de dispatch

✅ Mejora #4 cerrada (schema v3.3.1 NEW · este es el predecesor lógico)
✅ Cluster cascade 100% cerrado (PM-0 + PM-1.1 + PM-1.2 alineados)
☐ Confirmar disponibilidad runtime INFRATI G1+G2 matrices (validación empírica de la regla)
☐ Decidir si REGLA 14 también propaga a PM-1.1 v2.9 → v2.10 (probable cascade adicional · evaluar al diseñar)

## 9. Riesgos arquitectónicos identificados

| Riesgo | Mitigación |
|--------|-----------|
| REGLA 14 puede entrar en conflicto con REGLA 13 (multi-comp) si se diseña mal | Audit independiente · verificar ortogonalidad ejes (multi-comp vs guide-position) |
| Heredar saberes G_anteriores requiere I/O matrices runtime · puede ser frágil | Schema canon: `_position_programa` puede ser **opcional-pero-recomendado** · no bloqueante si runtime G_anteriores ausente |
| Cascade impact en PM-1.1, PM-1.2, PM-2.0 bloqueante para programas mid-program | Documentar como deuda explícita post-bump · regla activable progresivamente |

## 10. Razón canon · "evidence before canon" recordatorio

REGLA 18.7 PM-1.2 v4.3.1 canonizó "deferralización N≥3 comps" para casos sin runtime evidence. Para REGLA 14: tenemos **evidencia operacional INFRATI G2 mid-program** ya runtime (matriz alineada · dashboard) → procede sin postpone.

Si en pre-flight Bloque 1 NO encontramos asimetría empírica clara: revaluar canon vs. defer.

---

*KICKOFF MEJORA #3 · 2026-05-05 · Sergio Cortés Perdomo · próxima sesión Cowork ~2h*
