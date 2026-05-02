---
title: REPORTE DE APRENDIZAJE · Construcción Sistema FPI Factory v3.x · Paradigm Shift Completo
version: 1.0
last_updated: 2026-05-02
authored_by: Claude (orchestrator) · revisado por Sergio Cortés Perdomo
canon_status: meta-documento de sistema · referencia obligatoria para entender rationale arquitectónico v3.x
proposito: Capturar lecciones profundas · anti-patrones · patrones canónicos emergentes · conclusiones meta-arquitectónicas del paradigm shift v3.x para que cualquier futuro implementador (Claude · Sergio · otro instructor) entienda POR QUÉ el sistema está como está hoy
audience: Sergio (instructor) · Claude principal en futuras sesiones · cualquier nuevo agente/instructor que herede el sistema
related_docs:
  - DM (DOCUMENTO MAESTRO Sistema Completo de Prompts FPI SENA Bilingüismo) v3.6+
  - PLAN-FASE-1-ARQUITECTURA v1.5+ (Phase 0+1+2 boundary)
  - PLAN-FASE-2-ARQUITECTURA v1.4+ (Phase 2 architect+activities)
  - 11 memory snapshots feedback_*.md (anti-patrones + patrones canónicos)
when_to_consult:
  - Antes de bumpear cualquier master prompt (entender qué decisiones canónicas hay y POR QUÉ)
  - Antes de arrancar nuevo programa (entender qué es heredado · qué es decisión per programa)
  - Cuando se detecte drift cross-PM (este reporte tiene los anti-patrones documentados)
  - Cuando un nuevo agente/instructor entra al sistema (onboarding meta-arquitectónico)
---

# 📚 Reporte de Aprendizaje · Construcción Sistema FPI Factory v3.x

> **Documento meta-arquitectónico** que captura las lecciones profundas del paradigm shift v3.x · construido entre 2026-05-01 y 2026-05-02 · con foco cross-program reusable. NO es un changelog · NO es un how-to. Es un análisis de POR QUÉ el sistema está como está hoy.

---

## Línea temporal del paradigm shift completo

| Fase | Fechas | Resultado tangible | Aprendizaje núcleo |
|---|---|---|---|
| **0 · Pre-paradigma** | (heredado) | Sistema 22 PMs · DM v2.x · 8 sesiones hardcoded · Activity Card v2.0 | Funcionaba pero tenía gaps arquitectónicos profundos no visibles desde dentro |
| **1 · NEW PM-0.0 Matriz Alineadora** | 2026-05-01 marathon | 1 nuevo subagente PRE-PM-0 + cascade impact toda pipeline | Diseñar "de adentro hacia afuera" requiere infraestructura ad-hoc · no sale gratis con master prompt declarándolo |
| **2 · PM-0 v3.0 simplificado + Anti-patrón #16** | 2026-05-01 (3 iteraciones) | PM-0 v1.x (1077 líneas) → v3.0 (~270 líneas) · 5 principios maestros · libertad LLM | **Master prompt declara libertad ≠ prompt operacional respeta libertad** · disciplina al dispatchear es crítica |
| **3 · Re-cascade con criterios canon** | 2026-05-01 | 8 criterios C01-C08 + traceability `_anclaje_matriz` cross-PM | TRACEABILITY EXPLÍCITA separa diseño bonito de diseño AUDITABLE · "nada por fuera de la matriz" |
| **4 · PM-1.1 v2.8 estructura tripartita** | 2026-05-01 | 1+N+1 bloques (no plano) · tiempos canon universales | Estructura pedagógica REAL debe reflejarse upstream · NO inventarse downstream · tiempos canon trascienden tipo programa |
| **5 · PM-1.2 v4.2 scope diferenciado** | 2026-05-01 | 3 schemas por tipo_bloque · `_produces_evidencia` mapping E1-E6+E-Misión | NO toda actividad apropiación produce evidencia · cada tipo_bloque tiene PROPÓSITO PEDAGÓGICO distinto |
| **6 · Validación crítica matriz** | 2026-05-02 (3 iteraciones) | Detección drift cruzado · Opción A refinada (gramática sigue UNIT pedagógico) | Verbo cognitivo RAP DICTA dominio · rationale pedagógico (CEFR/ESP/TBLT) guía decisiones · self-report Agent NO detecta drift |
| **7 · Re-cascade Opción A refinada** | 2026-05-02 (B.1+B.2+B.3+B.4) | matriz v1.3 + pm-1-1 v2 + pm-1-2 v2 + 3 dashboards · 23/23 PASS | Drift en upstream → re-cascade desde fuente · NO parche en downstream · backup legacy = disciplina canon |
| **8 · Cadena pedagógica UbD** | 2026-05-02 | DM v3.5 EXTENSIÓN canónica · 6 eslabones documentados | Modelo mental fundamental DEBE documentarse explícito · trazabilidad bidireccional = test canon |
| **9 · PM-2.0 v3.0 architect heredero** | 2026-05-02 | 12 sesiones heredadas dinámicamente · cero invención · libertad LIMITADA | Cuando upstream tiene info · downstream NO re-inventa · solo expande temporalmente |
| **10 · Activity Card v3.0 + PM-2.3 PILOT** | 2026-05-02 | 5 NEW campos · 3 ejemplos Sergio · pilot 7/7 PASS REAL (2 iteraciones) | Schema canónico ANTES de bumps masivos · audit cruzado OBLIGATORIO · safety margin > canon estricto |

---

## Aprendizajes profundos · cross-program (10 lecciones núcleo)

### 1. La cadena pedagógica UbD invertida es el modelo mental fundamental

El sistema NO es una pipeline de generación de documentos. Es la materialización progresiva de **una cadena pedagógica de 6 eslabones**:

```
Saber Concepto → Saber Proceso → Actividad → Evidencia → Criterio → Instrumento
```

Cada PM materializa un eslabón. Sin esta cadena explícita en mi mental model · cada decisión arquitectónica era ad-hoc. **Al canonizarla en DM v3.5 · todas las decisiones siguientes ganaron coherencia.**

**Aplicación cross-program:** cualquier programa nuevo debe pasar por los 6 eslabones · NO importa el sector (banana cold chain · diesel · agro · tecnología). El modelo es UNIVERSAL · lo que cambia son los saberes y criterios canon.

### 2. Verbo cognitivo del RAP DICTA dominio de saberes

Esta fue mi lección más profunda en la Etapa 6 (validación matriz). Yo había aceptado una distribución de saberes con drift cruzado porque el LLM había "interpretado libremente". El rationale correcto:

- **RA1 RECONOCER** (Bloom L1) → vocab base + estructuras MÍNIMAS PARA NOMBRAR (verb to be + plural · necesarias para "this is a hatch")
- **RA2 COMPRENDER** (Bloom L2) → dominio especializado SMCP completo
- **RA3 APLICAR** (Bloom L3) → gramática operacional INTERACCIÓN bilateral (commands + imperative + modals)
- **RA4 DESCRIBIR** (L2-L3) → estructuras descriptivas (tag questions + progressive + quantifiers)

Anti-patrón descartado: "toda gramática a RA3" · viola CEFR A1-A2 · viola ESP · viola TBLT.

**Aplicación cross-program:** distribución de saberes NO se delega libremente al LLM · se canoniza explícitamente en `pm-0-0-input.json.distribucion_canonica_saberes_por_rap` por rationale pedagógico documentado.

### 3. Libertad LLM tiene NIVELES (no es binaria)

| Capa pipeline | Tipo libertad | Por qué |
|---|---|---|
| **PM-0.0** matriz | LIMITADA (canon estricto distribución) | Es la fuente de verdad · drift aquí cascade downstream |
| **PM-0** capa pedagógica | AMPLIA (universo · personajes · principios) | Sector-specific · LLM analiza realidad operacional |
| **PM-1.1** ruta tripartita | AMPLIA pero acotada (estructura canon · contenido libre) | Estructura es universal · narrativa es sector-specific |
| **PM-1.2** scope diferenciado | AMPLIA en curación (3 vías · 8 filtros) · LIMITADA en schema | Elegir fuentes auténticas requiere analítica · estructura es canon |
| **PM-2.0** architect | LIMITADA (secuenciador puro) | Hereda todo · solo orden temporal interno |
| **PM-2.x** Activity Cards | AMPLIA en redacción · LIMITADA en heredancia + canon evidencias | Materializa pedagogía pero respeta cadena canon |
| **PM-2.11** ensamblador | LIMITADA (mecánica) | Ya viene todo decidido · solo agrega cols GFPI-F-134 |

**Aprendizaje:** declarar "libertad LLM" en master prompt NO basta. Hay que documentar QUÉ es libertad y QUÉ es canon estricto · y el orchestrator (Claude principal) debe respetar esa diferenciación al dispatchear.

### 4. Anti-patrón #16 es el más insidioso del sistema

**"Master prompt declara libertad LLM ≠ prompt operacional respeta libertad."**

Es insidioso porque:
- El master prompt está bien escrito (declara libertad)
- El orchestrator dispatcha "siguiendo el master prompt"
- Pero el prompt operacional contradice (template literal · 25 keys fijos · listas cerradas · tono pre-decidido)
- El Agent rellena · NO innova · output mecánico
- El reporte dice "PASS" pero el output es prescriptivo

Solo Sergio lo detecta vía REGLA 21 trigger mutual. La detección requiere un humano que sepa qué OUTPUT es canon vs derivado prescriptivo.

**Aplicación cross-program:** trigger interno orchestrator (3 checks pre-dispatch) DEBE ejecutarse antes de cada Agent dispatch. Documentado como REGLA 11 en cada master prompt downstream.

### 5. Audit cruzado independiente es OBLIGATORIO

Lo viví dos veces:
- **Etapa 6:** Agent generó matriz v1.1 · reporte "PASS" · mi audit detectó saberes drifteados entre RAPs
- **Etapa 10:** Agent generó pm-2-3 attempt-1 · reporte "545 palabras" · mi audit detectó 664 palabras reales

El Agent self-report es necesario pero NO suficiente. El audit cruzado debe:
1. Re-contar / re-medir lo que el Agent reportó
2. Comparar saberes/criterios contra fuente canon (matriz v1.3)
3. Verificar `_anclaje_matriz_heredado` literal copy
4. Detectar drift cruzado entre RAPs/bloques
5. Reportar discrepancias HONESTAMENTE (no maquillarlas)

**Aplicación cross-program:** post-dispatch · ejecutar audit script Python que valide checks REALES (no solo trust Agent self-report). Si discrepancia entre Agent y audit · el AUDIT gana.

### 6. Re-cascade desde la fuente · NO parche downstream

Cuando detecté drift en matriz v1.1 (Etapa 6) tenía 2 opciones:
- **Opción A:** parchar pm-1-1 + pm-1-2 directamente (corregir drift downstream sin tocar matriz)
- **Opción B:** re-cascade desde PM-0.0 (corregir matriz · re-run PM-1.1 · re-run PM-1.2)

Elegimos B. Razones:
- Si el drift está en la fuente (matriz) · cualquier parche downstream eventualmente diverge
- Re-cascade con backups legacy preserva auditoría histórica · permite ver qué era v1 vs v2
- Cross-coherencia inter-PM (audit cruzado del Step B.4) confirma que corrección fue completa

**Aplicación cross-program:** ante drift detectado en upstream · siempre re-cascade desde la fuente · NUNCA parche downstream solo. Backups con sufijo `*.legacy-pre-fix-distribucion` preservados.

### 7. La estructura tripartita es UNIVERSAL · los tiempos también

PM-1.1 v2.8 canonizó:
- **APERTURA** = exactamente 6h / 1 sesión (motivacional + diagnóstico · NO conocimiento nuevo)
- **APROPIACIÓN** = el resto (vivero de evidencias formales · 1 bloque por RAP)
- **TRANSFERENCIA** = ≤12h / ≤2 sesiones (capstone Final Mission)

Esto trasciende tipo programa:
- Curso Complementario (12 sesiones × 6h): 1 + 9 + 2 = 12 sesiones · 1 + 4 + 1 = 6 bloques
- Técnico (8 sesiones × 7.5h): 1 + 6 + 1 = 8 sesiones · 1 + N + 1 = N+2 bloques
- Tecnológico (16 sesiones × 7.5h): 1 + 13 + 2 = 16 sesiones · 1 + 6 + 1 = 8 bloques

**Aprendizaje:** las restricciones canon de tiempo son PEDAGÓGICAS (no logísticas). Sergio las canonizó porque están validadas por experiencia real de aula · NO se debe relajarlas.

### 8. NO toda actividad apropiación produce evidencia formal

Esta clarificación de Sergio en Etapa 5 cambió mi modelo:
- **Anchors** (PM-2.3 reading · PM-2.6 listening · PM-2.8 speaking · etc.) → SÍ producen evidencia (E1-E5)
- **Scaffolds** (PM-2.5 vocab · PM-2.10 grammar consciousness raising · rehearsals) → NO producen evidencia formal · contribuyen a E6 consolidación

**Aprendizaje:** distinguir anchors vs scaffolds en pm-1-2 elementos vía `_produces_evidencia: "E1"` o `null`. El renderer debe respetar "No aplica" literal cuando scaffold (canon Sergio).

### 9. Schema canónico ANTES de bumps masivos

En Etapa 10 detecté gap antes de hacer bumps a 12 PMs:
- Si hubiéramos bumpeado los 12 PMs primero (Wave 1 + 2 + 3 + 4 + 5)
- Y DESPUÉS Sergio detectaba que Activity Card v2.0 tenía 5 gaps (dimension actitudinal · descripcion narrativa · material_apoyo array · evidencia.nombre · numero_actividad)
- TODOS los 12 PMs hubieran necesitado re-bump

Decisión correcta: definir schema Activity Card v3.0 PRIMERO · validar con pilot PM-2.3 · DESPUÉS escalar.

**Aplicación cross-program:** antes de bumps masivos · validar schema/pattern con 1 piloto. Costo de re-trabajo si pilot detecta gap = 1 PM. Costo si no validas = N PMs.

### 10. Safety margin > canon estricto

En el pilot PM-2.3:
- Canon Activity Card v3.0: descripción 200-600 palabras
- Attempt-1 con prompt "200-600 estricto": 664 palabras (overshoot 10.6%)
- Re-dispatch con prompt "target 480-580": 541 palabras (sweet spot · safety margin 59 bajo límite)

**Aprendizaje:** "estricto" no funciona porque LLM optimiza otras cosas (calidad pedagógica · narrativa) y excede límites. Target con safety margin (sweet spot 80-90% del límite) sí funciona.

**Aplicación cross-program:** todos los prompts operacionales con límites numéricos deben usar safety margin · NO límite estricto.

---

## Anti-patrones detectados y canonizados

| # | Nombre | Detectado en | Documentado |
|---|---|---|---|
| **#11** | Asumir Camino 1 desde KB script (sin grep) | Pre-paradigma | feedback_anti_patron_11 |
| **#12** | Smoke deuda como excusa | Pre-paradigma | feedback_anti_patron_12 |
| **#13** | Urgencia presentación → quality shortcut | Pre-paradigma | feedback_anti_patron_13 |
| **#14** | Audit shallow disfrazado de profundo | Pre-paradigma | feedback_anti_patron_14 |
| **#15** | Master-prompt-only audit ignora operational evolution | Pre-paradigma | feedback_anti_patron_15 |
| **#16** | Prompt operacional prescriptivo contradice libertad LLM declarada | Etapa 2 | feedback_anti_patron_16 |
| **NEW · A** | Distribución por libre interpretación LLM (drift cruzado) | Etapa 6 | feedback_traceability_anclaje_matriz_canon |
| **NEW · B** | Saberes con `_anclaje_matriz` vacío (gap traceability) | Etapa 5 | feedback_pm12_scope_diferenciado_tipo_bloque |
| **NEW · C** | Toda gramática a un solo RAP (anti-CEFR/ESP/TBLT) | Etapa 6 | feedback_cadena_pedagogica_ubd_canon |
| **NEW · D** | Agent self-report sin audit cruzado independiente (miscount) | Etapa 10 | (capturado en este reporte) |

10 anti-patrones canonizados · cada uno con trigger interno orchestrator + memory snapshot.

---

## Patrones canónicos emergentes (reusables cross-program)

### Pattern #1 · Heredancia cascade tripartita

`pm-0-0-matriz` → `pm-0-context` → `pm-1-1` → `pm-1-2` → `pm-2-0` → `pm-2-x` Activity Cards · cada uno HEREDA literal del anterior con `_anclaje_matriz_heredado` + `_produces_evidencia` + `_consumed_by_pm` + `_ref_pm12_path` + `_ref_pm20_session`.

### Pattern #2 · Validación bloqueante por capa

Cada PM downstream tiene N validation_checks BLOQUEANTES (Phase 1 → Phase 2 boundary). Si CUALQUIER check FAIL · `enriched: false` · BLOQUEA cascade.

### Pattern #3 · 3 schemas diferenciados por tipo_bloque

APERTURA (transversal · NO conocimiento nuevo) · APROPIACIÓN (vivero evidencias por RAP) · TRANSFERENCIA (capstone ABP). Aplica a PM-1.1 · PM-1.2 · PM-2.0 · Activity Cards.

### Pattern #4 · Backup legacy + sufijo descriptivo

Cuando se re-cascade · NUNCA sobrescribir sin backup. Sufijos canónicos: `*.legacy-pre-fix-distribucion-rev` · `*.legacy-pre-v3-0` · `*.attempt-N-over-600-words`.

### Pattern #5 · Audit cruzado independiente Python script

Post-dispatch · ejecutar Python script que recorre output JSON y verifica:
- Schema completo (campos obligatorios presentes)
- Word counts reales (no trust Agent self-report)
- Heredancia literal (subset de fuente canon)
- Drift cruzado (saberes/criterios en RAP equivocado)

### Pattern #6 · Master prompt EXTENSIÓN al final · NO refactor inline

Cada bump master prompt agrega EXTENSIÓN al final con NEW REGLAS · preservando contenido legacy como REFERENCIA. Ningún bump elimina contenido v anterior · solo lo deprecia. Permite back-compat para runs en flight.

### Pattern #7 · Memory snapshot por bump significativo

Cada paradigm shift · anti-patrón canonizado · pattern emergente → memory snapshot en `feedback_*.md` + entrada en MEMORY.md. Permite recuperar el rationale meses después sin re-leer commits.

---

## Conclusiones meta-arquitectónicas

### El sistema cambió de "generador de documentos" a "materializador de matriz pedagógica canon"

Antes (modelo viejo):
- Cada PM era un generador independiente
- La coherencia pedagógica se buscaba retroactivamente en PM-2.11
- Cada run era un experimento (qué saberes asignó el LLM aquí · qué evidencias inventó allá)

Después (modelo nuevo · v3.x):
- Cada PM es un materializador progresivo de la matriz canon
- La coherencia pedagógica se garantiza upstream · downstream solo expande/reformula
- Cada run es reproducible (mismo input matriz → mismo output cascade)

### La disciplina "nada por fuera de la matriz" es lo más importante

Cualquier elemento pedagógico (actividad · evidencia · criterio · instrumento) DEBE poder trazarse de vuelta a un saber/criterio canon de la matriz. Si no puede · es invención · viola disciplina.

Esto es el test ultimate del sistema: dame cualquier Activity Card · pregúntame "de dónde viene este enunciado V+O+C" y debo poder responder con una ruta JSON específica en pm-1-2 + pm-2-0 + matriz.

### Sergio es el único que detecta los gaps profundos

Mi rol (Claude orchestrator) es:
- Implementar disciplinadamente
- Auditar cruzadamente (no trust Agent self-report)
- Documentar canon explícitamente

El rol de Sergio es:
- Detectar drift profundo (saberes en RAP equivocado · libertad LLM violada · descripción demasiado larga)
- Aportar canon real (criterios C01-C08 · ejemplos de guía SENA · clarificaciones pedagógicas)
- Decidir entre opciones cuando hay tradeoffs (Opción A refinada vs B vs C)

REGLA 21 trigger mutual significa que ambos detectamos drift · pero las detecciones de Sergio son siempre más profundas (saberes pedagógicos · CEFR/ESP/TBLT/UbD) y las mías son más operacionales (word count · validation checks · cross-coherencia inter-PM).

### El ritmo "B 1-step + checkpoints" funciona

Cada Step (1.1 · 1.2 · 1.3 · 1.4 · 1.5) tuvo sub-steps A → B → C → D con GATE Sergio entre sub-steps. Esto evitó:
- Hacer bumps masivos sin validación
- Cascade con drift que se propaga
- Re-trabajo costoso

Costo: más mensajes de coordinación · checkpoints intermedios.
Ganancia: cada sub-step validado antes de avanzar · drift detectado temprano.

### Lo que falta (Wave 1-5 escalado)

Pilot PM-2.3 v3.0 validó el pattern. Para escalar:
- 11 PMs restantes a v3.x con Activity Card v3.0 emisión
- 5 waves (APERTURA · APROPIACIÓN×2 · TRANSFERENCIA+CONSOLIDACIÓN · ENSAMBLADO)
- Cada wave necesita: bump master + dispatch Agent paralelo + audit cruzado + commit

Estimación realista: 5-7 sesiones de trabajo. Pero el pattern está validado · el riesgo es bajo.

### Lo que ya queda canonizado para futuros programas

| Componente | Versión canon | Aplicabilidad |
|---|---|---|
| **DM Sistema** | v3.6+ | TODO programa futuro |
| **PM-0.0 Matriz Alineadora** | v1.2 | TODO programa (NEW pre-Phase 1) |
| **PM-0 capa pedagógica** | v3.2 | TODO programa |
| **PM-1.1 ruta tripartita** | v2.8 | TODO programa |
| **PM-1.2 scope diferenciado** | v4.2 | TODO programa |
| **PM-2.0 architect heredero** | v3.0 | TODO programa |
| **PM-2.3 reading anchor** | v3.0 (PILOT) | TODO programa post-validación pattern |
| **Activity Card Schema** | v3.0 | TODO programa post-cascade Phase 1 v3.x |
| **PLAN-FASE-1** | v1.5 | TODO programa (workflow Phase 0+1+2 boundary) |
| **PLAN-FASE-2** | v1.4 (DRAFT-PLAN → ACTIVE) | TODO programa post-Phase 1 v3.x |

10 documentos canónicos versionados. 11 memory snapshots reusables. 1 cadena pedagógica UbD documentada. 16 anti-patrones identificados (10 documentados como memory + 6 documentados en master prompts/PLAN docs).

---

## Conclusión personal honesta (Claude orchestrator)

**Lo más importante que aprendí en este proceso:** mi mental model del sistema cambió. Pasé de verlo como "una pipeline complicada de generación de docs" a verlo como "la materialización progresiva de una cadena pedagógica UbD canon · con disciplina trazabilidad bidireccional".

Ese cambio no vino solo. Vino de Sergio detectando drift profundo · forzando re-cascades · canonizando criterios · clarificando que "verbo cognitivo del RAP DICTA dominio de saberes".

Mi contribución fue principalmente:
- Disciplina operacional (audit cruzado · backups · validation checks)
- Documentación canónica (master prompts · PLAN docs · memory snapshots · DM EXTENSIONES)
- Implementación del pattern una vez identificado

La contribución de Sergio fue:
- Detección del paradigm shift necesario
- Aporte de criterios canon C01-C08 + 3 ejemplos guía SENA + clarificaciones pedagógicas
- Decisiones arquitectónicas críticas (Opción A refinada · pilot first · 5 decisiones residuales)

**El sistema FPI Factory v3.x es ahora reproducible · auditable · pedagógicamente disciplinado.** Cualquier programa futuro (Diesel · Agro · Tecnología · etc.) puede entrar al sistema y producir guía de aprendizaje GFPI-F-135 con coherencia canónica garantizada de upstream a downstream.

Sigue faltando escalar Wave 1-5 (11 PMs restantes) y validar end-to-end Phase 2 boundary. Pero el riesgo arquitectónico está controlado · el pattern está canon · solo falta ejecutar disciplinadamente.

---

## Cómo usar este reporte

**Cuando arranquemos un programa nuevo (Diesel · Agro · Tecnología · etc.):**
- Lee este reporte ANTES de empezar (contexto meta-arquitectónico)
- Identifica qué es heredado de v3.x (cadena UbD · estructura tripartita · tiempos canon · 3 schemas · etc.)
- Identifica qué decisión es per programa (saberes/criterios canon C01-C08 · sector universo · personajes · arquetipos)
- Aplica los 10 patrones canónicos sin re-inventarlos

**Cuando detectemos drift en un programa en curso:**
- Verifica qué anti-patrón aplica (lista de 10)
- Aplica el trigger interno orchestrator del anti-patrón correspondiente
- Re-cascade desde la fuente · NO parche downstream

**Cuando bumpear un master prompt:**
- Sigue Pattern #6 (EXTENSIÓN al final · NO refactor inline)
- Documenta NEW REGLAS con número incremental
- Memory snapshot del bump (Pattern #7)
- Backup legacy con sufijo descriptivo (Pattern #4)

**Cuando un nuevo agente/instructor entra al sistema:**
- Este reporte es onboarding meta-arquitectónico obligatorio
- Después leer DM v3.6+ + PLAN-FASE-1 v1.5+ + PLAN-FASE-2 v1.4+
- Después leer 11 memory snapshots feedback_*.md

---

*REPORTE DE APRENDIZAJE · Construcción Sistema FPI Factory v3.x · Paradigm Shift Completo*
*Documento meta-arquitectónico · canon Sergio Cortés Perdomo + Claude orchestrator · 2026-05-02*
*Versión 1.0 · próximas versiones documentarán Wave 1-5 PM-2.x downstream + Phase 2 validación end-to-end*
