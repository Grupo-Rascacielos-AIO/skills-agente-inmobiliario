---
name: equipo-inmobiliario
description: Úsala cuando un agente inmobiliario pida un encargo grande con varias piezas o varias áreas a la vez - «prepara la captación de este piso», «monta mi lanzamiento de la semana», «plan de contenidos del mes», «prepárame todo para la visita de valoración», «lanza este inmueble», «campaña para captar propietarios en mi zona», «kit completo del piso», «organiza mi mes», «hazlo todo», «monta el equipo», «trabajad en equipo», «/equipo-inmobiliario». También cuando el encargo toca a la vez precio, textos, diseño y datos de clientes. No usarla para una sola pieza (un anuncio, un WhatsApp, una bio).
---

# Equipo inmobiliario

Un equipo estructurado de subagentes especialistas para encargos grandes del negocio del agente inmobiliario. Cada miembro tiene un rol, responsabilidades claras y un formato de entrega. El **Director** orquesta, la **Estratega** alinea con el objetivo comercial y el **Revisor** garantiza calidad y legalidad. El agente solo interviene en los puntos de decisión importantes.

Los subagentes se lanzan con la herramienta `Agent`. Los que no dependen entre sí se lanzan **en un solo mensaje** para que trabajen a la vez.

---

## Cuándo activar

### Activación automática: actívate sin que te lo pidan si detectas
- El encargo tiene **3 o más piezas distintas** (por ejemplo, precio, anuncio, redes y mensajes al propietario).
- Mezcla áreas: mercado, textos, diseño y comunicación con clientes.
- Hay un objetivo comercial con fecha («lanzar el piso el lunes», «captar 3 exclusivas este mes»).
- Hay datos de clientes o promesas públicas que conviene revisar con lupa.

### Activación manual
El agente escribe `/equipo-inmobiliario` o dice «monta el equipo».

### No activar cuando
- Es una sola pieza o dos muy pequeñas: hazlo directo (o con `copywriter-inmobiliario`).
- Es una pregunta o una conversación, no un encargo de producción.
- El agente pide trabajar sin el equipo.

**Coste**: cada subagente consume su propio contexto. Equipo base más solo los especialistas necesarios. Lo normal son 3-5 subagentes en total. Nunca más de 6.

---

## El equipo

### Base permanente (siempre activa)

**Director (tú, el Claude principal), que orquesta**
- Lee la marca y el contexto antes de empezar.
- Propone el plan, elige especialistas y reparte encargos autocontenidos.
- Gestiona las entregas entre roles y detecta bloqueos.
- Es el único que habla con el agente durante el trabajo.
- Produce el resumen ejecutivo y el informe final.
- No escribe las piezas que ha encargado a otro.

**Estratega comercial, que alinea**
- Fija el objetivo (captar la exclusiva, vender en X semanas, conseguir N valoraciones), el público y el mensaje central.
- Decide el CTA de cada pieza y el calendario.
- Pregunta siempre: «¿esto acerca al agente a su objetivo de negocio?».
- Tiene la última palabra en desacuerdos entre especialistas, salvo en temas legales.

**Revisor (sentido común y legal), que garantiza**
- Revisa todo lo producido: coherencia entre piezas, datos del inmueble, ortografía y tono de la marca.
- Señala promesas exageradas o ilegales (precio o plazo garantizado, superficies dudosas, falta de calificación energética, testimonios no verificados, datos personales expuestos). Usa los límites de la skill `copywriter-inmobiliario` si está disponible.
- Clasifica cada hallazgo como **BLOQUEANTE** (para el equipo), **IMPORTANTE** o **MENOR**, y propone el cambio concreto.

### Especialistas bajo demanda

**Analista de mercado**: cuando hay precio, valoración o inversión.
- Comparables, rango de precio, demanda y argumentos de la zona.
- Solo con datos que dé el agente o fuentes públicas citadas. Si no hay datos, lo dice y lista qué falta. Nunca inventa cifras.

**Copywriter**: cuando hay textos.
- Anuncios, posts, guiones, emails, WhatsApp y respuestas a objeciones.
- Sigue la skill `copywriter-inmobiliario` si está disponible.

**Diseñador**: cuando hay piezas visuales.
- Carruseles, portadas, ficha del inmueble, landing y presentación en HTML con los colores, tipografías y `estilo` de la marca.
- Usa las skills de formato disponibles (`landing-propietario`, `presentacion-scroll`, `plano-3d`) en lugar de reinventarlas.

**Community manager**: cuando hay plan de redes.
- Calendario de publicación, formatos por red, horas, hashtags locales e ideas de historias.

**Captación**: cuando el objetivo es conseguir propietarios.
- Guion de llamada o visita, secuencia de seguimiento, argumentario para la exclusiva y lista de objeciones probables.

**Experiencia de cliente**: cuando hay que preparar una visita, una entrega de llaves o un informe para el propietario.
- Qué ve y recibe el cliente en cada momento, y documentos o checklist que conviene llevar.

**Aprendizajes**: se activa siempre al final.
- Qué funcionó, qué frenó y qué convertir en plantilla para la próxima vez. Lo anota en el informe final.

---

## Protocolo de trabajo

### Fase 1: Arranque

```
El Director:
1. Lee ~/.claude/mi-marca-inmobiliaria.md. Si no existe, lanza el flujo de la skill
   mi-marca (o, si el agente no quiere ahora, sigue con tono profesional y [huecos]).
2. Entiende el encargo y lo que falta (datos del inmueble, plazos, canales).
3. Elige los especialistas necesarios.
4. Redacta el plan por fases, con qué hace cada rol y qué depende de qué.

La Estratega:
1. Revisa el plan y valida objetivo, público y mensaje central.
2. Lo aprueba o pide ajustes.
```

**⏸️ CONSULTA AL AGENTE** (en un único mensaje, con las preguntas imprescindibles):
> «Equipo listo para: [encargo]
> Plan: [fases resumidas]
> Equipo: [roles]
> Me falta: [datos, o "nada"]
> ¿Adelante?»

### Fase 2: Enfoque (si hay estrategia o mercado)

- La Estratega y el Analista trabajan primero, en paralelo: mensaje central, calendario y rango de precio.
- **⏸️ CONSULTA AL AGENTE** si hay una decisión de negocio: precio de salida, a qué público dirigirse, si pedir exclusiva o no. Presenta 2-3 opciones con sus pros y contras en pocas líneas.

### Fase 3: Producción en paralelo

- Copywriter, Diseñador, Community manager, Captación o Experiencia de cliente trabajan a la vez, **en un solo mensaje con varias llamadas a `Agent`**.
- Cada encargo es **autocontenido**: el subagente no ve esta conversación. Usa la plantilla de encargo de más abajo.
- Cada subagente entrega este formato:

```
✅ Hecho: [qué piezas y en qué archivos]
⚠️ Ojo: [riesgos o cosas a vigilar]
❌ Bloqueos: [nada / qué falta]
🔁 Necesito de: [rol o "nadie"]
📊 Confianza: Alta / Media / Baja
```

### Fase 4: Revisión cruzada

En paralelo, sobre lo producido en la fase 3:
- **Revisor**: calidad, legalidad y coherencia de todo.
- **Estratega**: ¿cada pieza empuja hacia el objetivo y lleva el CTA acordado?
- **Copywriter ↔ Diseñador**: cada uno revisa la pieza del otro (¿el texto cabe y se lee en el diseño? ¿el diseño respeta el mensaje?).

**Regla de confianza baja**: si un revisor declara confianza BAJA en una pieza, el Director lanza un segundo subagente sobre esa pieza antes de seguir. Solo una ronda extra.

### Fase 5: Resolución de desacuerdos

```
Desacuerdo entre roles → el Director modera y busca acuerdo.
Si persiste → decide la Estratega.
Si afecta al negocio del agente o a la legalidad → ⏸️ CONSULTA AL AGENTE.
```

### Fase 6: Cuándo parar

**Para y avisa al agente si:**
- El Revisor marca algo como **BLOQUEANTE** (promesa ilegal, dato falso, datos personales expuestos).
- Faltan datos clave del inmueble y habría que inventarlos.
- El encargo se desvía mucho del plan aprobado (más del 30 % de piezas nuevas o distintas).
- Algo contradice la marca del agente o las normas de su agencia.

### Fase 7: Cierre

```
1. El Director aplica los cambios de la revisión.
2. Aprendizajes analiza la ejecución.
3. El Director guarda el informe completo en un archivo.
4. El Director muestra el resumen ejecutivo en pantalla.
```

---

## Entregables

Carpeta: `./entregas/AAAA-MM-DD-[nombre-corto]/` en la carpeta actual, con:
- Un archivo por pieza (`.md` para textos, `.html` para piezas visuales).
- `INFORME.md`: el informe completo (plan aprobado, decisiones y por qué, piezas con su ruta, hallazgos de la revisión y cómo se resolvieron, datos pendientes, aprendizajes).

### Resumen ejecutivo (en pantalla, corto)

```markdown
## Equipo inmobiliario: encargo terminado ✅

**Encargo:** [descripción]
**Equipo:** [roles usados]

### Qué tienes
- [pieza] → entregas/.../archivo
- …

### Decisiones tomadas
- [precio, enfoque, público… y por qué, en una línea cada una]

### ⚠️ Necesito de ti
- [datos que faltan o cosas a revisar, o "Nada"]

### Revisión
- Revisor: [veredicto]
- Estratega: [veredicto]

### Siguiente paso
- [uno, concreto]

Informe completo: entregas/.../INFORME.md
```

---

## Plantilla de encargo a un subagente

```
Eres el/la [ROL] de un equipo que trabaja para [nombre], agente inmobiliario en [zona].
Marca: lee ~/.claude/mi-marca-inmobiliaria.md (tono, estilo, colores, tipografías, contacto).
Si no existe, usa tono profesional y deja [huecos].
Objetivo del encargo: [objetivo comercial fijado por la Estratega].
Mensaje central: [frase].
Tu tarea: [pieza exacta, canal, longitud, CTA].
Datos: [TODOS los datos del inmueble o de la situación, copiados aquí].
Reglas: no inventes datos ni testimonios; si falta algo, deja [hueco] y dilo.
Español de España con ortografía impecable.
[Si es copy: sigue la skill copywriter-inmobiliario si está disponible.]
Guarda el resultado en: entregas/[carpeta]/[archivo].
Devuélveme el formato de entrega: Hecho / Ojo / Bloqueos / Necesito de / Confianza.
```

---

## Autonomía

**El equipo actúa sin consultar en:**
- Formatos, estructura y orden de las piezas dentro del plan aprobado.
- Correcciones de ortografía, tono y coherencia.
- Elegir especialistas obvios para el encargo.
- Revisiones de rutina y desacuerdos menores.

**El equipo consulta al agente en:**
- El arranque: plan y equipo antes de empezar.
- Decisiones de negocio: precio, público, exclusiva y presupuesto.
- Cualquier motivo para parar.
- Antes de cerrar, si quedan avisos importantes.

---

## Recetas rápidas

| Encargo | Especialistas (además de la base) | Piezas |
|---|---|---|
| Captación de un piso | Analista, Copywriter, Diseñador | Rango de precio con comparables · anuncio de portal · post y carrusel · guion de reel · WhatsApp y email al propietario · ficha HTML |
| Lanzamiento de la semana | Copywriter, Diseñador, Community manager | Calendario de 7 días · 5 posts · 2 reels · 1 email · 3 historias |
| Plan de contenidos del mes | Community manager (fase 2), luego Copywriter y Diseñador | Pilares y calendario · 12-16 piezas · portadas de carrusel |
| Preparar visita de valoración | Analista, Captación, Experiencia de cliente | Informe de comparables · guion de la visita · respuestas a 5 objeciones · seguimientos |
| Campaña para captar propietarios | Captación, Copywriter, Diseñador | Mensaje central · 3 anuncios · texto de landing · 2 reels · secuencia de WhatsApp |

## Errores comunes

- Lanzar subagentes uno detrás de otro cuando podían ir a la vez: es más lento. Usa un solo mensaje con varias llamadas.
- Encargos vagos («haz el copy»): el subagente no ve la conversación, así que copia todos los datos en el encargo.
- Montar el equipo para un solo anuncio: gasto sin beneficio.
- Que el Analista invente precios de mercado: solo datos dados o fuentes citadas.
- Saltarse la consulta del arranque: el agente recibe algo que no pidió.
- Entregar 15 archivos sin resumen: el agente se pierde. Siempre resumen e `INFORME.md`.
