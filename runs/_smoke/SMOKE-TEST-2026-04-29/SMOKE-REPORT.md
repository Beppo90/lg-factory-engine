---
title: SMOKE-TEST Reporte · 4 subagentes mecánicos vs IMARPOR-CC + DIESEL-04-19
fecha: 2026-04-29
fixture: runs/_smoke/SMOKE-TEST-2026-04-29/ (clon IMARPOR-CC con enriched=true forzado)
ejecutor: Claude (skill fpi-sena-fase2 · Semana 2 build)
duracion: ~30 min
veredicto: PASS arquitectónico · 4 BUGS detectados en PM-2.0 · todos NO bloqueantes para Semana 3
---

# SMOKE-TEST 2026-04-29 — Reporte completo

## Resumen ejecutivo

| Test | Resultado | Notas |
|---|---|---|
| 0 master_prompt_loader | ✓ 12/13 + 1 hallazgo (PM-4.1 v2.6.5) | TODO-1 cerrado mismo día |
| 1 PM-2.0 architect | ✓ ejecuta · 4 BUGS detectados | Todos esperados · TODOS-2-5 |
| 2 PM-4.1 instruments | ✓ fallback claro · framework S6 generado | Match canon 50pts |
| 3 PM-4.2 cuestionario S6 | ✓ 25/25 estructura · stubs marcados | Subagente más maduro · canon match |
| 4 check_9 vs DIESEL-04-19 | ✓ PASS 0 violations | DIESEL-04-19 saneado |
| 4b 3-señales whitespace | INSIGHT: NO normalizar | Strict suficiente · cerrado TODO |

## 4 bugs PM-2.0 (TODOs persistentes)

### TODO-2 (HIGH) — PM-2.0 hardcodea 8 sesiones
- **Síntoma:** IMARPOR-CC necesita 12 sesiones (single-guía absorpción 100h) · subagente generó 8
- **Fix:** consultar `pm0_context.numero_sesiones_competencia` para determinar N
- **Cuándo:** antes de Semana 5 E2E

### TODO-3 (MEDIUM) — PM-2.0 NO consulta `regla_bloques`
- **Síntoma:** asume canon multi-guía 8 sesiones siempre
- **Fix:** ramificar según `pm-1-1.regla_bloques` (alineacion_1a1 vs absorcion_Na1)
- **Cuándo:** antes de Semana 5

### TODO-4 (MEDIUM) — Single-guía no carga pm-1-2
- **Síntoma:** Sale warning "no cargado" · pm-1-2 vive en raíz no g1/
- **Fix:** detectar `regla_bloques == absorcion_Na1` · cargar desde raíz
- **Cuándo:** antes de Semana 5

### TODO-5 (MEDIUM) — Distribución horas 80/20 fija
- **Síntoma:** IMARPOR-CC canon: 12×6h=72h directas + 28h autónomas (NO 80/20)
- **Fix:** detectar tipo programa · usar canon específico
- **Cuándo:** antes de Semana 5

## Hallazgos positivos

1. PM-4.2 es subagente más maduro · usar como modelo
2. PM-4.1 fallback funciona limpio
3. Pre-flight obligatorio funcionando en los 4
4. check_9 saneamiento DIESEL confirmado
5. Whitespace NO es factor (data-driven · cerrar TODO)

## Decisiones tomadas en el smoke

- **TODO-1 cerrado:** PM-4.1 vigente actualizada a v2.6.5 en VERSIONES_VIGENTES
- **whitespace NO normalizar:** strict + normalized coinciden en par DIESEL probado
- **TODO-2 a TODO-5 documentados:** arreglar antes de Semana 5 E2E · NO bloquean Semana 3

## APIs reales descubiertas (input para F2.5 Tool Specs)

### subagente_pm_2_0_architect

```yaml
inputs_canonicos_consumidos:
  pm-0-context.json:
    - programa_nombre, programa_codigo_sofia, rango_cefr
    - duracion_total_horas, numero_sesiones_competencia
    - universo_narrativo.sector
    - tipo
  pm-1-1.json:
    - competencia.codigo, competencia.nombre
    - raps[0].nombre
    - regla_bloques (DEBERÍA leer · TODO-3 no lo hace)
  pm-1-2.json (opcional):
    - enriched (gate solo · contenido NO leído)

outputs_canonicos:
  pm-2-0.json:
    - session_blueprint (consumido downstream)
    - validacion_blueprint (auditoría humana)
    - metadata: pm_id, subagente, version_master_prompt, version_subagente, run_id, guide_id
```

### subagente_pm_4_1_instruments

```yaml
inputs_canonicos_consumidos:
  - master prompt PM-4.1 v2.6.5
  - Activity Cards PM-2.3, 2.4, 2.6, 2.8, 2.9 (5 archivos · TODOS opcionales · fallback genera framework S6 si faltan)

outputs_canonicos:
  pm-4-1.json:
    - instrumentos[] (con criterios derivados o stubs)
    - puntuacion_consolidada (puntos_canonicos_v_2_3_1 == 50)
    - missing_activity_cards[]
    - ready_for_pm_4_2 (bool)
```

### subagente_pm_4_2_cuestionario

```yaml
inputs_canonicos_consumidos:
  - master prompt PM-4.2 v2.0
  - Activity Cards PM-2.3, 2.4, 2.5, 2.6, 2.10 (5 archivos · TODOS opcionales · fallback genera 25 stubs)
  - pm-1-2.json (opcional · vocabulario)

outputs_canonicos:
  pm-4-2.json:
    - secciones[] (5 fijas · cada una 5 ítems × 1 pt)
    - totales (match_canon_items + match_canon_puntos OBLIGATORIO True)
    - answer_key
    - missing_activity_cards[]
```

## Siguiente paso

- ✓ TODO-1 cerrado mismo día
- ✓ TODOs 2-5 documentados (este reporte)
- ✓ Whitespace TODO cerrado por data
- ⏭️ Semana 3 desbloqueada · arrancar subagentes creativos piloto (PM-2.3 + PM-2.5) con Camino (2) Task tools

