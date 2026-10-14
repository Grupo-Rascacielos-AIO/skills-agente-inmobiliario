---
name: equipo-inmobiliario
description: Úsala cuando un agente inmobiliario pida un encargo grande con varias piezas a la vez que se pueden hacer en paralelo - «prepara la captación de este piso», «monta mi lanzamiento de la semana», «plan de contenidos del mes», «prepárame todo para la visita de valoración», «lanza este inmueble», «campaña para captar propietarios en mi zona», «kit completo del piso», «hazlo todo», «monta el equipo», «trabajad en equipo», «/equipo-inmobiliario». No usarla para una sola pieza (un anuncio, un WhatsApp, una bio).
---

# Equipo inmobiliario

Para encargos grandes, Claude actúa como **director** y reparte el trabajo entre varios **subagentes especialistas** que trabajan a la vez (herramienta `Agent`). Luego revisa, une y entrega un resumen corto con los archivos.

## Cuándo sí y cuándo no

**Úsalo cuando** el encargo tiene **3 o más piezas distintas** que no dependen unas de otras, por ejemplo:
- «Prepara la captación de este piso» → estudio de precio + anuncio de portal + post y reel + WhatsApp al propietario.
- «Monta mi lanzamiento de la semana» → calendario + 5 posts + 2 guiones de reel + email a la base de datos.
- «Plan de contenidos del mes» → estrategia + 12-16 piezas + calendario.

**No lo uses cuando**:
- Es una sola pieza o dos muy pequeñas → hazlo directo (o con `copywriter-inmobiliario`).
- Las piezas dependen en cadena (no se puede escribir el anuncio sin el precio) y no hay nada que paralelizar.
- El agente quiere conversar o decidir algo; el equipo es para producir.

Cada subagente consume tokens propios. **Equipo pequeño**: 2-4 subagentes suele bastar. Nunca más de 5.

## Los roles

| Rol | Hace | No hace |
|---|---|---|
| **Director** (tú, el Claude principal) | Entiende el encargo, reparte, revisa, une, entrega | No escribe piezas que ya ha encargado |
| **Estratega comercial** | Objetivo, público, mensaje central, plan y calendario, CTA de cada pieza | Copys finales |
| **Copywriter** | Textos finales siguiendo la skill `copywriter-inmobiliario` | Inventar datos del inmueble |
| **Diseñador** | Piezas visuales en HTML (carruseles, portadas, fichas, landing) con los colores y tipografías de la marca | Textos nuevos: usa los del copywriter o los marca como provisionales |
| **Analista de mercado** | Comparables, rango de precio, demanda y argumentos de la zona con los datos que dé el agente o fuentes públicas citadas | Inventar cifras. Si no hay datos, lo dice y lista qué falta |
| **Revisor (sentido común y legal)** | Revisa todo al final: coherencia, ortografía, promesas exageradas, límites de publicidad inmobiliaria | Reescribir todo. Señala y propone el cambio concreto |

Activa solo los roles que el encargo necesita. El revisor va casi siempre.

## Flujo

### 1. Brief (un solo mensaje)

Lee `~/.claude/mi-marca-inmobiliaria.md` si existe (si no, sugiere la skill `mi-marca` pero no bloquees). Pregunta **solo** lo imprescindible que falte, en un único mensaje:
- Datos del inmueble o del objetivo (dirección aproximada, metros, precio, fotos disponibles…).
- Para cuándo y dónde se va a publicar.

### 2. Plan (y un «sí» del agente)

Muestra en 5-8 líneas: qué piezas vas a entregar, qué rol hace cada una y qué depende de qué. Pide confirmación. Si el agente dice «adelante» o similar de entrada, sigue.

### 3. Fase en paralelo

Lanza en **un solo mensaje** varias llamadas a `Agent` (así trabajan a la vez). Si una pieza depende de otra (el anuncio necesita el precio del analista), lánzala en una segunda ronda.

Cada encargo a un subagente debe ser **autocontenido** (no ve esta conversación). Plantilla:

```
Eres el [ROL] de un equipo que trabaja para [nombre], agente inmobiliario en [zona].
Marca: lee ~/.claude/mi-marca-inmobiliaria.md (tono, colores, tipografías, contacto). Si no existe, usa tono profesional y deja [huecos].
Encargo: [qué pieza exactamente, para qué canal, longitud].
Datos: [todos los datos del inmueble o del objetivo, copiados aquí].
Reglas: no inventes datos ni testimonios; si falta algo, deja [hueco] y dilo. Español de España con ortografía impecable.
[Si es copy: sigue la skill copywriter-inmobiliario si está disponible.]
Guarda el resultado en: [carpeta]/[archivo].
Devuélveme en 5 líneas: qué has hecho, archivos creados, dudas o datos que faltan.
```

### 4. Revisión

Cuando terminen, lanza al **Revisor** con la lista de archivos. Aplica tú los cambios que señale (o pídeselo al rol que corresponda si es mucho). Una sola ronda de revisión; no entres en bucles.

### 5. Entrega

Carpeta de entrega: `./entregas/AAAA-MM-DD-[nombre-corto]/` dentro de la carpeta actual, con un archivo por pieza (`.md` para textos, `.html` para piezas visuales) y un `LEEME.md` con el índice.

Resumen en pantalla, corto:

```
Listo: [encargo]
Equipo: [roles usados]

Piezas
- [pieza] → entregas/.../archivo
- …

Necesito de ti
- [datos que faltan o decisiones, o «nada»]

Siguiente paso sugerido
- [uno, concreto]
```

## Recetas rápidas

| Encargo | Equipo | Piezas |
|---|---|---|
| Captación de un piso | Analista + Copywriter + Diseñador + Revisor | Rango de precio con comparables · anuncio de portal · post + carrusel · guion de reel · WhatsApp y email al propietario · ficha HTML del inmueble |
| Lanzamiento de la semana | Estratega + Copywriter + Diseñador + Revisor | Calendario de 7 días · 5 posts · 2 reels · 1 email · 3 historias |
| Plan de contenidos del mes | Estratega (ronda 1) → Copywriter + Diseñador (ronda 2) + Revisor | Pilares y calendario · 12-16 piezas · portadas de carrusel |
| Preparar visita de valoración | Analista + Copywriter + Revisor | Informe de comparables · guion de la visita · respuestas a 5 objeciones · mensajes de seguimiento |
| Campaña para captar propietarios | Estratega + Copywriter + Diseñador + Revisor | Mensaje central · 3 anuncios · texto de landing · 2 reels · secuencia de WhatsApp |

## Errores comunes

- Lanzar subagentes uno detrás de otro cuando podían ir a la vez → más lento. Un solo mensaje con varias llamadas.
- Encargos vagos («haz el copy») → el subagente no ve la conversación; copia todos los datos en el encargo.
- Montar equipo para un solo anuncio → gasto sin beneficio.
- Que el analista invente precios de mercado → solo datos dados por el agente o fuentes públicas citadas; si no hay, lo dice.
- Entregar 15 archivos sin resumen → el agente se pierde. Siempre `LEEME.md` y resumen corto.
