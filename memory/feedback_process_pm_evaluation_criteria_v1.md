---
name: PROCESS-PM-EVALUATION-CRITERIA v1.0 framework canónico
description: Master prompt NEW canonizado 2026-05-04 · framework 7 capas de criterios para evaluar necesidad/utilidad arquitectónica de cada PM · PM Card schema YAML/Markdown · Anexo A verbatim PM-0.0 v2.3 caso de oro · trigger T1-T5 · disciplina REGLA 19/20 + Anti-patrón #19 checklist 7-item · cross-PM aplicable
type: feedback
originSessionId: 2c6808d4-0c63-4334-90fb-ff7d73b8a0ee
mirrored_from: cowork-memory
mirror_date: 2026-05-04
---

**Decisión Sergio canon 2026-05-04 (post-audit Fase A pipeline 22 PMs · pregunta sobre criterios)**

Sergio detectó que necesitaba framework explícito para evaluar **necesidad y utilidad arquitectónica** de cada PM en el workflow. Las preguntas clave:
- ¿Qué hace con el input?
- ¿Cómo procesa la data?
- ¿Para qué? · objetivo en relación al sistema
- ¿Qué producto entrega?
- ¿Calidad del producto?
- ¿Qué implicaciones tiene downstream?
- ¿Se duplica con otro PM?
- ¿Es realmente necesario?

Sin framework explícito · cada respuesta queda implícita · se reinventa cuando arranca proyecto N+2.

**Solución canonizada · framework v1.0:**

7 capas de criterios:
1. **Identidad operacional** (qué es) · 5 criterios enum
2. **Contrato I/O** (qué recibe · qué entrega) · 7 criterios verificables
3. **Función pedagógica** (para qué sirve) · 4 criterios narrativos
4. **Grafo de dependencias** (cómo se conecta) · 5 criterios estructurales
5. **Test de necesidad arquitectónica** (capa CRÍTICA) · 4 tests objetivos:
   - Test eliminación · ¿qué se rompe sin él?
   - Test fusión · ¿hay PM que podría reemplazarlo con extensión menor?
   - Test duplicación · ¿output se solapa?
   - Test evidencia runtime · ¿hay runs reales que lo validan?
6. **Calidad / robustez** · 5 métricas con thresholds
7. **Decisiones arquitectónicas** (ADRs · REGLAs · antipatterns · trade-offs)

**PM Card schema YAML/Markdown:**

Output canónico del framework · 1 archivo por PM · `audits/pm-cards/PM-X.Y-card-YYYY-MM-DD.md`. Análogo a Activity Card pero para arquitectura.

**5 triggers canónicos (T1-T5):**
- T1 · audit pipeline sistemático (trimestral)
- T2 · evaluación pre-bump (por bump)
- T3 · justificación fusión/deprecation (por decisión)
- T4 · onboarding nuevo arquitecto/LLM (1 vez)
- T5 · validación post-bump cross-LLM (post-bump crítico)

**Disciplina canon obligatoria:**
- REGLA 19 pre-flight obligatorio · 5 fuentes canon (master prompt + DM § historial + memory snapshots + runs canónicos + ADRs)
- REGLA 20 verificación antes de negar · 5 vectores grep (master prompts + runs + subagentes + scripts + DM/planes)
- Anti-patrón #19 checklist 7-item PASS/FAIL al cierre · canonizado en PM-0.0 v2.3 §ANTI-PATRÓN #19

**Anexo A verbatim · PM-0.0 v2.3 caso de oro:**

Framework aplicado completo al PM-0.0 v2.3 · todas las 7 capas pobladas con evidencia citada · veredicto ESENCIAL · prioridad_bump NONE · 5 runs canónicos validan + 13/13 validation_checks PASS + drift score 0 días + 4 versiones publicadas en 4 días (disciplina bumps incrementales).

**Why:** El framework codifica preguntas que Sergio venía haciendo implícitamente desde meses · canonizar las preguntas + el formato de respuesta + la disciplina de pre-flight = sistema sostenible cross-LLM cross-sesión cross-arquitecto. PM-0.0 v2.3 es el caso de oro porque acabamos de ejecutar disciplina canon completa hoy mismo (4 bumps coordinados · audit anti-drift independiente · 3 iteraciones · 0 deuda residual) · sirve como referencia tangible para evaluar otros PMs.

**How to apply:**

Próximos pasos canon (no urgentes · ordenados por prioridad):

1. **Aplicar framework a PM-0** (siguiente bump candidate HIGH · audit Fase A) · genera `audits/pm-cards/PM-0-card-YYYY-MM-DD.md`
2. **Aplicar a PM-1.1 + PM-1.2** (también HIGH · cluster cascade)
3. **Aplicar a PM-3.1 + PM-4.1** (MED + LOW)
4. **Aplicar al cluster Phase 2 estable** (8 PMs · audit rápido para validar `Estable`)
5. **Aplicar a deprecation candidates** (PM-2.7 · PM-3.7 · PM-1x) · genera evidencia objetiva para deprecation final

Estimación: ~22 PM Cards × 30-60 min cada uno = 11-22 horas trabajo focused distribuido en 5-10 sesiones. Ortogonal a Pilar 4 (CC) · puede ejecutarse en paralelo.

**Cascade canonizado 2026-05-04:**
- master-prompts/PROCESS-PM-EVALUATION-CRITERIA.md NEW v1.0 (~700 líneas)
- DM v3.19 → v3.20 (HISTORIAL §11 entry)
- Memory snapshot · este
- Mirror a fpi-sena-factory/memory/

**Aplicabilidad cross-PM:**

Framework aplica a TODOS los PMs del sistema (PM-0/1.x/2.x/3.x/4.x) · es metalevel · reutilizable. Si emergen nuevos PMs en el futuro · se aplica framework v1.0 a ellos también.

**Aplicabilidad cross-LLM:**

Framework es agnóstico al LLM ejecutor · cualquier orchestrator (Cowork · Claude Code · auditor independiente) puede generar PM Cards aplicando los criterios. Validación cross-LLM via T5 · si 2 LLMs convergen al mismo veredicto = señal estable; si divergen = input arquitectónico para Sergio.

*Sergio Cortés Perdomo 2026-05-04 · canon arquitectónico meta · framework de evaluación PMs · cross-PM cross-LLM cross-sesión*
