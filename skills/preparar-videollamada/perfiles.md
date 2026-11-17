# Los 6 perfiles del propietario

Cada perfil cambia **el ángulo**: lo que enseñas en el adelanto, la sección central de la presentación, las preguntas y las objeciones que vas a oír. La casa, la zona y la valoración son las mismas.

**Cómo elegir:** manda el **motivo de venta** (la respuesta a «¿y es porque te mudas, o qué ha pasado?»). Si encaja en dos, elige el que más le duele y dilo: «Lo trato como perfil 2, con un toque del 1». Siempre lo confirmas con el agente antes de generar.

**El plan de marketing** (pilares, embudo y calendario de 13 semanas) es el mismo para todos y vive en `comun.js`: si `datos.js` no trae `plan`, sale entero. La línea «Plan» de cada perfil dice si hay que tocar algo. Cada subclave que escribas en `plan` (`pilares`, `embudo`, `gantt`…) sustituye a la estándar entera.

En `datos.js`, el ángulo va en `angulo` y su `tipo` decide cómo se pinta:

| `tipo` | Cómo se ve | Perfiles |
|---|---|---|
| `tarjetas` | Tres tarjetas numeradas, grandes | 1, 4, 5 |
| `linea` | Una línea de tiempo que se enciende al hacer scroll | 2 |
| `pasos` | Pasos numerados + lista de papeles con casillas | 3 |
| `partidas` | Una cuenta de arriba abajo: precio, lo que se resta y lo que queda (sin cifras hasta la llamada) | 6 |

---

## Perfil 1 · Lleva meses publicado y no vende

- **Cómo lo detectas:** «Lo tengo en el portal desde marzo», «lo llevan dos o tres agencias», «han venido a verlo pero nadie hace oferta».
- **Ángulo:** «Por qué no se vende (y qué cambiaría)».
- **`tipo`:** `tarjetas`. Tres cosas concretas de **su** anuncio, cada una con lo que ves y lo que harías: la foto de portada, el título y la descripción, y en qué filtros de búsqueda aparece (sin decir la cifra). Usa sus fotos y su texto reales; nunca critiques a otra agencia por su nombre.
- **Plan:** el estándar. Si quieres que hable de su anuncio, en el calendario el carril «La casa» puede decir «Fotos nuevas y anuncio rehecho» (escribe `plan.gantt.carriles` entero).
- **Frase del adelanto:** «He mirado tu anuncio con lupa. Hay tres cosas que explican por qué lleva [X] meses; esta tarde te las enseño».
- **Preguntas de descubrimiento:**
  1. ¿Cuántas visitas habéis tenido y qué decían al salir?
  2. ¿Os ha llegado alguna oferta, aunque fuera baja?
  3. ¿De dónde salió el precio que tenéis publicado?
  4. Si dentro de tres meses sigue sin venderse, ¿qué pasa?
  5. ¿Qué os ha faltado hasta ahora: visitas, información o confianza?
- **Objeciones:**
  - *«Ya la tengo con varias agencias.»* → «Por eso lleva [X] meses: cuando la llevan cinco, no la lleva nadie. Te propongo una sola persona responsable, con un plan y fechas, y si no cumplo, tienes salida por escrito».
  - *«No pienso bajar el precio.»* → «Hoy no te voy a pedir que lo bajes. Te enseño lo que se ha firmado en tu zona y decides tú con datos».

## Perfil 2 · Vende para comprar otra

- **Cómo lo detectas:** «Nos mudamos», «la familia crece», «queremos algo más grande», «nos vamos a otra ciudad».
- **Ángulo:** «Vender y comprar sin quedaros en medio».
- **`tipo`:** `linea`. Las etapas con sus semanas: preparar y salir, visitas filtradas, arras con un plazo que les deje comprar, notarías coordinadas y mudanza. Si te contaron una fecha que manda (un bebé, el cole, un trabajo), ponla al final de la línea.
- **Plan:** el estándar.
- **Frase del adelanto:** «Os he preparado el calendario para que vendáis y compréis sin pagar dos casas a la vez».
- **Preguntas de descubrimiento:**
  1. ¿Ya tenéis vista la casa nueva o estáis buscando?
  2. ¿Necesitáis el dinero de esta para comprar la otra?
  3. ¿Qué fecha os marca el cambio?
  4. ¿Queda hipoteca en esta casa?
  5. Si vendéis antes de encontrar la otra, ¿dónde viviríais esos meses?
- **Objeciones:**
  - *«Primero queremos encontrar la otra.»* → «Tiene sentido. El riesgo es encontrarla y no poder comprarla por no haber vendido. Por eso se sale a la venta con unas arras de plazo largo y una entrega que os encaje: así no os quedáis en medio».
  - *«No tenemos prisa, si sale bien y si no, nada.»* → «Podéis. Pero cada mes de más es un mes en que la otra casa puede irse. Con un plan os doy una fecha realista y decidís con ella».

## Perfil 3 · Herencia o varios titulares

- **Cómo lo detectas:** «Era de mis padres», «somos tres hermanos», «está a nombre de varios».
- **Ángulo:** «Que todos lo veáis igual de claro».
- **`tipo`:** `pasos`. Cuatro pasos (papeles al día, acuerdo de todos en precio y plazo, venta con un solo interlocutor, reparto en notaría) y la lista de papeles con casillas. Añade siempre: «Los impuestos de la herencia y de la venta os los confirma vuestro gestor o notario».
- **Plan:** el estándar.
- **Frase del adelanto:** «He preparado los pasos para que los [tres] lo veáis igual de claro. Si podéis estar todos esta tarde, mejor».
- **Preguntas de descubrimiento:**
  1. ¿Cuántos sois y quién lleva la voz?
  2. ¿Está ya aceptada la herencia?
  3. ¿Estáis todos de acuerdo en vender? ¿Alguno quiere quedársela?
  4. ¿Os está costando dinero tenerla así (comunidad, IBI, suministros)?
  5. ¿Qué haría falta para que todos firmarais tranquilos?
- **Objeciones:**
  - *«Mi hermano no quiere venderla por ese precio.»* → «Por eso el precio sale de lo firmado en la zona y no de lo que cada uno cree: así discutís sobre datos y no entre vosotros».
  - *«Primero tenemos que arreglar los papeles.»* → «Se hace a la vez: mientras el notario prepara los papeles, preparamos la casa. Así no perdéis meses».

## Perfil 4 · Separación

- **Cómo lo detectas:** «Nos estamos separando», «lo vendemos entre los dos», tono tenso o prisa.
- **Ángulo:** «Rápido, discreto y sin roces».
- **`tipo`:** `tarjetas`. Un solo interlocutor y todo por escrito a los dos a la vez; visitas solo con compradores con financiación comprobada; precio, plazo y reparto claros antes de salir.
- **Plan:** el estándar, cambiando el pilar `puerta` por «Visitas filtradas y discretas: solo compradores con financiación comprobada, con cita, sin puertas abiertas» (escribe `plan.pilares` con los seis).
- **Frase del adelanto:** «Te he preparado un plan con visitas filtradas, sin meter en casa a nadie que no pueda comprar».
- **Preguntas de descubrimiento:**
  1. ¿Estáis los dos de acuerdo en vender?
  2. ¿Quién vive ahora en la casa?
  3. ¿Cómo queréis que os informe: a los dos a la vez y por escrito?
  4. ¿Hay un plazo que os marque el acuerdo?
  5. ¿Hay hipoteca a nombre de los dos?
- **Objeciones:**
  - *«Mi ex no va a firmar.»* → «Sin los dos no se puede vender, así que lo primero es que los dos tengáis la misma información. Os propongo una llamada corta con ambos».
  - *«Queremos venderla ya, aunque sea barata.»* → «Rápido sí, regalada no: con el precio bien puesto se vende en semanas sin perder dinero».

## Perfil 5 · Primera vez, aún sin publicar

- **Cómo lo detectas:** «Me lo estoy planteando», «aún no la he anunciado», «quería ver cuánto vale».
- **Ángulo:** «Así saldría tu casa el día 1».
- **`tipo`:** `tarjetas`. Las fotos ordenadas y la de portada; el precio que entra en los filtros de búsqueda (sin la cifra); las dos primeras semanas (a quién se avisa y cómo se agrupan las visitas).
- **Plan:** el estándar, y es el perfil en el que más luce. Que las tarjetas del ángulo hablen de **su** casa (sus fotos, su portada, sus primeras semanas) y no repitan los pilares, que hablan del método.
- **Frase del adelanto:** «Mira cómo quedaría tu casa el día que salga a la venta».
- **Preguntas de descubrimiento:**
  1. ¿Por qué ahora?
  2. ¿Qué tendría que pasar para que digas «la venta ha ido bien»?
  3. ¿Has hablado con otras agencias?
  4. ¿Qué plazo tienes en mente?
  5. ¿Qué es lo que más te preocupa de vender?
- **Objeciones:**
  - *«Primero voy a probar yo por mi cuenta.»* → «Puedes. Las dos primeras semanas son cuando más gente la ve: si sale mal, se quema. Te enseño cómo saldría conmigo y decides».
  - *«¿Por qué en exclusiva?»* → «Porque así hay una sola persona responsable, con un plan y fechas. Y si no cumplo, tienes salida por escrito».

## Perfil 6 · Inversor, o piso vacío o alquilado

- **Cómo lo detectas:** «Lo tengo alquilado», «es una inversión», «está vacío desde hace años».
- **Ángulo:** «Lo que te queda limpio».
- **`tipo`:** `partidas`. De arriba abajo: precio de cierre, lo que se resta (honorarios, plusvalía municipal, cancelación de hipoteca si hay, impuesto sobre la ganancia) y lo que queda. **Sin cifras en el adelanto ni en la presentación antes de la llamada**: cada partida dice «lo vemos en la llamada». Los impuestos, siempre «a confirmar con tu asesor fiscal».
- **Plan:** el estándar. Si está alquilado, cambia el pilar `puerta` por «Visitas pactadas con el inquilino» (escribe `plan.pilares` con los seis).
- **Frase del adelanto:** «Te he preparado lo que te quedaría limpio después de gastos; esta tarde lo vemos con números».
- **Preguntas de descubrimiento:**
  1. ¿Está alquilado ahora? ¿Hasta cuándo es el contrato?
  2. ¿Qué vas a hacer con el dinero?
  3. ¿Cuánto te deja limpio al año?
  4. ¿Te importa vender con el inquilino dentro?
  5. ¿Qué rentabilidad buscas en la siguiente inversión?
- **Objeciones:**
  - *«Solo vendo si me pagan [cifra].»* → «Te enseño qué ha firmado un inversor en tu zona y qué rentabilidad le deja. Si no cuadra con tu cifra, lo sabrás hoy, sin perder meses».
  - *«Prefiero esperar a que suba.»* → «Puede subir. Te enseño cuánto ha subido en tu zona y cuánto te cuesta esperar; decides con los dos números». (Solo con datos que tengas; si no los tienes, no uses esta respuesta).

---

## Guion del vídeo del adelanto (30-45 s, igual para los 6)

1. **Cara (5 s):** «[Nombre], soy [tu nombre]. Ya tengo preparado lo de vuestra casa y tengo ganas de enseñároslo».
2. **Pantalla (20-30 s):** la portada con su foto y la sección del ángulo. Un detalle concreto de **su** casa («ese salón con luz de sur toda la tarde») y la frase del perfil, en tus palabras.
3. **Cara (10 s):** «Lo vemos juntos a las [hora]. ¿Os sigue viniendo bien?».

Grábalo con el móvil en vertical, con luz de frente, y la pantalla con la grabación del ordenador. Si no te da tiempo, manda la imagen del adelanto con el mensaje: también funciona.

**En lo que le escribes o le dices al propietario, nunca:** lo que todavía no le enseñas («el precio te lo enseño luego», «no te mando la valoración»), «para que veas que no soy un bot», reproches («no he recibido contestación tuya») ni excusas que no son verdad («he atendido a otro cliente»). Que no mandas la valoración antes es una regla tuya: él no tiene por qué saberla.
