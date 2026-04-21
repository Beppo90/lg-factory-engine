# REVIEW TEMPLATE — DIESEL-2026-04-19
## Human-in-the-Loop Checklist por Módulo

---

## INSTRUCCIONES DE USO

Para cada módulo, Claude genera el output y presenta el checklist correspondiente.
Sergio revisa y responde con uno de:
- **✅ APROBADO** — seguir al siguiente módulo
- **⚠️ APROBAR CON NOTA** — seguir, pero registrar observación en CHANGELOG
- **🔁 ITERAR** — regenerar con instrucción específica

---

## CHECKLIST TIPO A — PM Fundacionales (PM-1.1, PM-1.2)

```
[ ] programa correcto: "Mantenimiento de Motores Diesel"
[ ] tipo_programa = "Técnico" (NO Tecnológico)
[ ] ficha: 2977749
[ ] RAP: 220501096 presente
[ ] CEFR: A1.1→A1.2
[ ] macrotema / tema correcto: "The Workshop Specialist"
[ ] vocabulario técnico diesel (no genérico)
[ ] universo narrativo: The Diesel Workshop, Bay 1/2/3
[ ] personajes: Carlos Mendoza, Valentina Cruz, Santiago Ríos
[ ] 5 guías (técnico = 5 bloques)
```

---

## CHECKLIST TIPO B — PM-2.x (Worksheets de Habilidades)

```
[ ] Nivel CEFR respetado (A1.1→A1.2 — nada de B1+)
[ ] Vocabulario: exactamente los 20 términos Toolbelt
[ ] Universo narrativo consistente (personajes, bay, workshop)
[ ] Gramática dentro de los targets (imperativo, there is/are, preposiciones)
[ ] GFPI markers presentes si aplica
[ ] Answer key completo
[ ] Diferenciación: fast finishers + more support
[ ] Zero meta-talk pedagógico
```

---

## CHECKLIST TIPO C — PM-3.1 (Playbook Outline)

```
[ ] 8 sesiones (S1–S8), 360 min cada una
[ ] Evidencias en secuencia: E1→E2→E3→E4→E5→E6→Final Mission
[ ] 5 Language Functions (F1–F5) consistentes
[ ] Trabajo autónomo total: ≤ 6.0h
[ ] S6 autonomous_work = 0h (sesión evaluación)
[ ] momento_sena progression: 3.1→3.2→3.3→3.4
[ ] Universo narrativo consistente
[ ] Toolbelt 20 términos cubiertos
```

---

## CHECKLIST TIPO D — PM-3.2 Session JSON (x8 sesiones)

```
METADATA:
[ ] pm_id = "PM-3.2-S{n}" (formato con número de sesión)
[ ] session_number correcto
[ ] session_title correcto
[ ] modelo registrado
[ ] generated_at presente

TIMING:
[ ] SET-UP + todos los WHILE + BREAK + WRAP-UP = 360 min exactos

PM0_PROTOCOL (5 subsistemas):
[ ] grammar_groups presente y correcto para la sesión
[ ] feedback.mode correcto (FLUENCY/ACCURACY/COACHING según sesión)
[ ] l1_management.l1_percentage decreciente sesión a sesión
[ ] stress_pronunciation con términos diesel específicos
[ ] success_vocabulary: términos del dominio diesel (NO deadline, crash, etc.)

AUTONOMOUS_WORK:
[ ] schema correcto: { "duracion_h": X, "actividades": [...] }
[ ] NO usar "hours" o "activities"
[ ] S6: duracion_h = 0, actividades = []
[ ] Total acumulado ≤ 6.0h

FASE/MOMENTO:
[ ] fase_sena con acento correcto
[ ] momento_sena consistente con la fase del run
[ ] S6: fase_sena = "Apropiación" (evaluación formativa, no "Evaluacion")

CONTENIDO:
[ ] Evidencia correcta para la sesión (E1, E2, etc.)
[ ] Language Functions consistentes con F1–F5 globales
[ ] Universo narrativo correcto
[ ] Sin contradicciones con sesiones anteriores
```

---

## CHECKLIST TIPO E — PM-4.1 / PM-4.2 (Evaluación)

```
[ ] tipo_programa = "Técnico"
[ ] RAP code = 220501096 en todos los instrumentos
[ ] 6 instrumentos en PM-4.1 (INST-1 a INST-6)
[ ] Puntajes: 5 pts por instrumento formativo, holístico en Final Mission
[ ] PM-4.2: 25 ítems, 5 secciones × 5 ítems × 1 pt
[ ] Answer key completo
[ ] Respuestas no copiadas del cuestionario S6 (reorden anti-memorización)
[ ] Universo diesel consistente
```

---

## CHECKLIST TIPO F — PM-3.6 (GFPI-F-135)

```
[ ] 5 secciones presentes: identificacion, presentacion, actividades,
    evaluacion, glosario
[ ] Datos institucionales correctos
[ ] RAP code = 220501096
[ ] Glosario: 20 términos Toolbelt con definición técnica en inglés
[ ] Coherencia con PM-4.1 / PM-4.2
```

---

## LEYENDA DE STATUS EN CHANGELOG

| Símbolo | Significado |
|---------|-------------|
| ⬜ | Pendiente — no generado |
| 🔄 | En generación |
| ✅ | Aprobado |
| ⚠️ | Aprobado con nota |
| 🔁 | En iteración |
| ❌ | Rechazado (no avanzar) |

---

## TABLA DE COMPARACIÓN RÁPIDA vs DIESEL-2026-04-15

Usar al aprobar cada módulo:

| Campo | 04-15 | 04-19 | Δ |
|-------|-------|-------|---|
| (llenar en vivo) | | | |
