# Los 2 Estilos Canónicos de PMs Creativos — Fase 2

Documentación operacional de los 2 estilos legítimos para implementar PMs creativos (PM-2.1, PM-2.2, PM-2.3, PM-2.4, PM-2.5, PM-2.6, PM-2.8, PM-2.9, PM-2.10).

**Origen canónico:** PLAN-FASE-2-ARQUITECTURA.md v1.3 §4.5.2-§4.5.3 + DM v2.12 §11. Ambos estilos derivan de la **misma directiva del instructor** ("Quiero todos los arquetipos para todos los PM") aplicada con interpretaciones operacionales distintas.

---

## Resumen ejecutivo

| Estilo | Cómo se ve | Cuándo usarlo | Ref operacional |
|---|---|---|---|
| **`diesel_secuencia_encadenada`** | `archetype_used: [N]` + `archetype_mode: "secuencia encadenada"` | Cuando se quiere rotar N arquetipos como momentos secuenciales en UNA sesión | DIESEL-2026-04-15/18/19 — TODOS los pm-2-*.json |
| **`mgv_compendio_metodologico`** | `integration_all_archetypes_policy.archetypes_integrated: [N]` + `bloom_ceiling` | Cuando se quiere documentar TODOS los arquetipos como menú · instructor elige flow en aula con flexibilidad por cohorte | MGV-2026-04-20 — TODOS los pm-2-*.json |

---

## Estilo 1 — `diesel_secuencia_encadenada`

### Definición

El instructor selecciona **N arquetipos del catálogo del PM** y los aplica como **momentos secuenciales** dentro de la sesión. Cada momento ejecuta UN arquetipo distinto. Los N arquetipos forman un flujo encadenado.

### Schema canónico (extraído de DIESEL pm-2-1.json:9-12)

```json
{
  "archetype_used": [
    "A — Visual/Infografía",
    "B — Story/Narrativa",
    "C — News/Noticia técnica",
    "D — Debate/Encuesta"
  ],
  "archetype_mode": "secuencia encadenada — 4 momentos en S1"
}
```

### Estructura de output esperada

```yaml
activity_card:
  activities:
    - number: 1
      archetype: "C — News"      # cada actividad tiene SU arquetipo específico
      type: "cognitiva"
      duration_min: 20
      statement: "..."
    - number: 2
      archetype: "A — Visual"
      duration_min: 25
      statement: "..."
    - number: 3
      archetype: "B — Story"
      duration_min: 30
      statement: "..."
    - number: 4
      archetype: "D — Debate"
      duration_min: 25
      statement: "..."
  
  momentos:                       # array paralelo a activities[]
    - momento_name: "..."
      archetype: "C — News"
    - momento_name: "..."
      archetype: "A — Visual"
    # etc.
```

### Cuándo usarlo

- Cohortes participativas que se benefician de variedad
- Sesiones largas donde mantener atención requiere rotación
- Programas técnicos largos (Tecnológico) con tiempo suficiente para múltiples arquetipos
- Cuando el instructor quiere que TODOS los arquetipos del catálogo se ejecuten en aula (no solo se documenten)

### Evidencia canónica

**TODOS los pm-2-*.json de los 3 runs DIESEL** (PM-2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.9, 2.10) usan este estilo uniformemente. Ejemplos:

| Run | PM | archetype_used (literal) |
|---|---|---|
| DIESEL-2026-04-19 | pm-2-1.json | A Visual + B Story + C News + D Debate |
| DIESEL-2026-04-19 | pm-2-3.json | A Visual Prediction + D Cooperative Jigsaw + B Comprehension Strategies |
| DIESEL-2026-04-19 | pm-2-9.json | A Function Map + B Function Drills + C Integrated Simulation |

---

## Estilo 2 — `mgv_compendio_metodologico`

### Definición

El instructor selecciona **N arquetipos del catálogo del PM** y los documenta TODOS con **frases fijas + Language Bank + Micro-Cápsulas**. El output es un **compendio metodológico**: el instructor luego elige FLOW en aula según contexto de cohorte (flexibilidad pedagógica diferida).

### Schema canónico (extraído de MGV pm-2-9.json:60-64)

```json
{
  "integration_all_archetypes_policy": {
    "directive": "Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor.",
    "archetypes_integrated": ["A", "B", "C", "D", "E"],
    "rationale_a11": "Los 5 arquetipos existen como OPCIONES del instructor. A1.1 requiere andamiaje alto, por lo que cada arquetipo se presenta con frases fijas + Language Bank + Micro-Cápsulas, en lugar de producción libre.",
    "bloom_ceiling_a11": "L3 Apply máximo — ningún arquetipo exige analizar/evaluar/crear sin soporte."
  }
}
```

### Estructura de output esperada

```yaml
activity_card:
  archetypes_policy: "TODOS LOS N ARQUETIPOS INTEGRADOS — decisión del instructor"
  
  content:
    archetype_A_TBLT_CYCLE:
      archetype_id: "A"
      name_en: "TBLT CYCLE — Task-Based Reading"
      name_es: "CICLO TBLT — Lectura Basada en Tareas"
      actua_como: "Senior ESP Task Designer"
      pre: { ... }
      while: { ... }
      post: { ... }
      language_bank: [...]
      micro_capsulas: [...]
    
    archetype_B_COMPREHENSION_STRATEGIES:
      archetype_id: "B"
      # mismo schema
    
    # ... (1 sub-objeto por arquetipo)
  
  integration_all_archetypes_policy:
    applicable_to_this_pm: true
    bloom_ceiling_a11: "L3 Apply máximo"
```

### Cuándo usarlo

- Cohortes con perfil heterogéneo (un arquetipo puede no funcionar para todos)
- Programas multi-guía donde la repetición del PM en sesiones diferentes admite rotación
- Cuando el instructor quiere autonomía pedagógica en aula (decidir flow real sin re-generar el JSON)
- Para documentar TODOS los arquetipos como menú accesible en producción real

### Evidencia canónica

**TODOS los pm-2-*.json de MGV-2026-04-20** usan este estilo. Ejemplos:

| PM | Arquetipos integrados | Política declarada |
|---|---|---|
| pm-2-3.json | A + B + C + D + E + F (6 de 6) | "TODOS LOS 6 ARQUETIPOS INTEGRADOS" |
| pm-2-5.json | A + B + C + D + E (5 de 5) | "TODOS LOS 5 ARQUETIPOS INTEGRADOS" |
| pm-2-9.json | A + B + C + D + E (5 de 5) | "compendio metodológico del instructor" |

### Nota especial sobre PM-2.1 y PM-2.2 en MGV

MGV pm-2-1.json y pm-2-2.json marcaron `applicable_to_this_pm: false` — interpretación conservadora que respetó el master prompt v2.0 ("DETONANTE/DIAGNÓSTICO ÚNICO"). Con la canonización 2026-04-28 (Opción A), esta interpretación queda como **válida pero no obligatoria**. Si se ejecuta Fase 2 sobre MGV en producción, se puede regenerar pm-2-1/pm-2-2 con `applicable_to_this_pm: true` aplicando los 4 arquetipos canonizados de PM-2.1/PM-2.2 v3.0.

---

## Cómo el instructor declara el estilo en `arquetipos-elegidos.json`

### Ejemplo Estilo DIESEL para PM-2.1

```json
{
  "elecciones": [
    {
      "pm": "PM-2.1",
      "estilo": "diesel_secuencia_encadenada",
      "archetype_used": [
        "A — Visual/Infografía",
        "B — Story/Narrativa",
        "C — News/Noticia técnica",
        "D — Debate/Encuesta"
      ],
      "archetype_mode": "secuencia encadenada — 4 momentos en S1",
      "rationale": "Cohorte participativa · directiva del instructor de aplicar todos los arquetipos"
    }
  ]
}
```

### Ejemplo Estilo MGV para PM-2.3

```json
{
  "elecciones": [
    {
      "pm": "PM-2.3",
      "estilo": "mgv_compendio_metodologico",
      "integration_all_archetypes_policy": {
        "applicable_to_this_pm": true,
        "directive": "Quiero todos los arquetipos para todos los PM — compendio metodológico del instructor",
        "archetypes_integrated": ["A", "B", "C", "D", "E", "F"],
        "rationale_a11": "Los 6 arquetipos existen como OPCIONES del instructor. Cada uno presentado con frases fijas + Language Bank + Micro-Cápsulas. Instructor elige FLOW de rotación en aula.",
        "bloom_ceiling_a11": "L3 Apply máximo — ningún arquetipo exige analizar/evaluar/crear sin soporte"
      }
    }
  ]
}
```

---

## Criterio de elección rápido

```
¿El instructor quiere FLUJO PRE-DEFINIDO de rotación de arquetipos en la sesión?
   → estilo `diesel_secuencia_encadenada`

¿El instructor quiere MENÚ COMPLETO documentado para elegir flow en aula?
   → estilo `mgv_compendio_metodologico`

¿No está declarado y el run es nuevo?
   → preguntar al instructor · NO asumir uno por defecto
```

---

## Lo que NO hacer (anti-patrón)

NO inventar enums alternativos como `DETONANTE_UNICO_FORZADO`, `SINGLE_ARCHETYPE`, `SELECCION_PARCIAL`, `TODOS_INTEGRADOS`, `MULTIPLE_SECUENCIA_ENCADENADA`. Estos eran terminología inventada en PLAN-FASE-2 v1.1 (eliminada en v1.2). Los nombres reales operacionales son SOLO los 2 documentados arriba.

NO inventar campos como `flow_rotation_suggestion` o `policy: "TODOS_INTEGRADOS"`. Si necesitas un campo nuevo: primero ejecutar REGLA 20 (5 vectores grep) para confirmar que NO existe ya con otro nombre. Si confirmas que es nuevo: documentar como propuesta con explicación canónica.
