---
name: preparar-videollamada
description: Úsala cuando un agente inmobiliario haya cerrado una videollamada (o una visita de captación) con un propietario y quiera llegar con su casa preparada. Con el link del portal o las fotos, el plano si lo hay, las notas del triaje y los testigos, detecta el perfil del propietario (lleva meses sin vender, vende para comprar otra, herencia, separación, primera vez o inversor) y genera con su marca - una presentación de scroll para compartir pantalla con las fotos, el plano 3D amueblable si hay plano, el plan de marketing explicado con diagramas (pilares, embudo de compradores y calendario de 90 días), cómo se vería su casa en el portal y en redes, la zona y la valoración (precio de salida, mapa 3D de testigos, regla de precios y notaría); el adelanto para WhatsApp (imagen 1080×1350, mensaje y guion de vídeo) y la chuleta de la llamada (preguntas y objeciones del perfil). Disparadores - «prepara la videollamada», «tengo videollamada con un propietario», «prepárame la casa de…», «el adelanto para WhatsApp», «qué le mando antes de la videollamada», «chuleta de la llamada», «landing para el propietario», «presentación para el propietario», «propuesta de venta para el propietario», «plan de marketing de esta casa», «quiero conseguir la exclusiva de este piso», «hazme algo para la visita de captación», «con este link de Idealista», «convierte este anuncio en una web», «plano 3D en la presentación», o un link de un portal pidiendo algo para el propietario.
---

# Preparar la videollamada

**Le das:** el link del portal (o fotos) + el plano si lo hay + tus notas del triaje y los testigos.
**Te devuelve:** una carpeta con la presentación (fotos, plano 3D, plan de marketing con diagramas, mockups y valoración con mapa 3D de testigos), el adelanto + los mensajes y la chuleta.
**Cuándo:** después del triaje, antes de la videollamada.

Entre el triaje y la videollamada, el propietario tiene que ver que **te has currado su casa**, y tú tienes que llegar con todo preparado. Esta skill te deja en una carpeta estas tres piezas, adaptadas al tipo de propietario:

| Pieza | Para qué | Quién la ve |
|---|---|---|
| `presentacion.html` | La enseñas compartiendo pantalla en la videollamada. Una sola página de scroll: su casa y sus fotos, el plano 3D (si hay plano), el ángulo de su perfil, el plan de marketing con diagramas, cómo se verá su casa en el portal y en redes, la zona, tu método y la valoración: precio de salida, mapa 3D de los testigos, regla de precios y notaría | El propietario, **en la llamada** |
| `adelanto.png` + `mensajes.md` | La imagen para WhatsApp, el mensaje que la acompaña, el guion del vídeo de 30-45 s y los recordatorios | El propietario, **antes de la llamada** |
| `chuleta.html` | Una hoja A4: objetivo, el marco, 5 preguntas, 2 objeciones con respuesta, tus tres precios y lo que falta | **Solo tú** |

No hay una «landing» aparte: la presentación es la propuesta completa. Si después de la llamada quieres mandarla por enlace, sigue [referencia/publicar.md](referencia/publicar.md).

Archivos de la skill:
- [perfiles.md](perfiles.md): los 6 perfiles, con cómo se detectan, el ángulo, el ajuste del plan, las preguntas y las objeciones. **Léelo antes de generar.**
- [plantilla/](plantilla/): `presentacion.html`, `adelanto.html`, `chuleta.html`, `comun.js`, `valoracion.js`, `premium.css`, `acabado.js`, `plan-vistas.html` y `plano3d.js` (no se tocan: todo sale de `datos.js`) y `datos.js`, la ficha de referencia con todos los campos comentados.
- [ejemplos/casa-ejemplo/](ejemplos/casa-ejemplo/): la casa de ejemplo completa, con fotos, plano 3D y una valoración con datos reales. Ábrela para ver cómo queda todo.
- [ejemplos/](ejemplos/): seis casos terminados con datos ficticios, uno por perfil (`perfil-1-…` a `perfil-6-…`), cada uno con sus tres piezas y `mensajes.md`. El `datos.js` del perfil que toque es el **modelo** que copias y rellenas.
- [referencia/desde-un-portal.md](referencia/desde-un-portal.md): cómo sacar datos, fotos y plano de un link de Idealista u otro portal.
- [referencia/publicar.md](referencia/publicar.md): verla en local y publicarla gratis **después** de la llamada.
- [scripts/capturar-adelanto.sh](scripts/capturar-adelanto.sh): convierte `adelanto.html` en `adelanto.png`.

## Reglas (no se negocian)

1. **Nunca inventes datos.** Ni metros, ni reformas, ni testigos, ni datos de la zona, ni quién compra en ella, ni opiniones. Lo que no tengas, lo preguntas o lo quitas, y va a «lo que falta».
2. **La valoración no sale antes de la llamada.** Si la ven antes y no les encaja, cancelan. Por eso la presentación **no se manda antes**: la enseñas compartiendo pantalla y ahí la valoración va a la vista, con su precio y su justificación (nada de «lo vemos juntos» en pantalla). El precio **nunca** va en el adelanto. Es una regla tuya: **no se le dice al propietario**.
3. **Los textos para el propietario** (mensaje del adelanto, guion del vídeo, recordatorios, imagen) buscan que se presente sin fricción:
   - **Sí:** un detalle concreto de **su** casa, ganas de enseñarle lo preparado, «lo vemos juntos» y una pregunta fácil al final («¿os sigue viniendo bien a las 19:00?»). Cálidos y cortos.
   - **No:** decir lo que aún no le enseñas («el precio te lo enseño luego», «no te mando la valoración», «sin precio»), «para que veas que no soy un bot», reproches («no he recibido contestación tuya») ni excusas que no son verdad («he atendido a otro cliente»).
4. **Es una estimación orientativa de mercado, no una tasación.** Nunca la llames «tasación».
5. **Las fotos son las del propietario** (o las de su anuncio). Usa solo lo que te ha mandado. Las del portal tienen derechos del anunciante: sirven para enseñárselas al propietario en esta propuesta privada (la página lleva `noindex`), no para anunciar. Díselo al agente al entregar.
6. **No prometas** precio de venta ni plazo garantizado. Las cifras del embudo son de ejemplo y la página lo dice.

## Paso 0 · La marca

1. Lee `~/.claude/mi-marca-inmobiliaria.md` y pasa sus campos a `marca` en `datos.js`: `nombre`, `agencia`, `telefono`, `whatsapp`, `email`, `zona`, `color_*`, `tipografia_*`, `logo`, `foto`, `tono` y `estilo`. Si tiene usuario de Instagram, va a `usuario_redes` (sin «@»): sale en los mockups de redes.
2. Si no existe, **lanza la skill `mi-marca`** («Antes, configuremos tu marca: son dos minutos y todo saldrá con tu nombre y tus colores»).
3. Si dice «ahora no», pide lo mínimo en un mensaje: nombre, agencia, teléfono, email y un color. Sin tipografías elegidas: Newsreader + Hanken Grotesk. El color principal tiene que ser oscuro (encima van textos en blanco).
4. **El color de acento lleva texto blanco encima** (botones, barras del calendario, último paso del embudo). Tiene que contrastar al menos 4,5:1 con el blanco; la plantilla ya lo oscurece un poco en esos sitios, pero si el acento es muy claro (amarillos, pasteles), propón al agente uno más oscuro.

## Paso 1 · Los datos (pregunta solo lo que falte, en un único mensaje)

La entrada es una de estas dos, más el triaje:
- **El link del portal**, si la casa está anunciada: sigue [referencia/desde-un-portal.md](referencia/desde-un-portal.md). Del anuncio salen las fotos, el plano, la descripción, los metros, el precio publicado y desde cuándo está publicado (estos dos van a `casa.portal` y solo salen en la chuleta). Los portales suelen bloquear la lectura automática: si no puedes abrirlo, **pide capturas o que pegue el texto del anuncio** (y las fotos).
- **Las fotos**, si no hay anuncio: cada estancia, la fachada y las vistas; el plano si lo tiene; qué se ha reformado y cuándo. Si te manda vídeos, saca 4-6 fotogramas buenos (`ffmpeg -i video.mp4 -vf fps=1/4 f%02d.jpg` si lo tienes, o pídele capturas).

**Siempre:** la dirección exacta (calle, número, planta y puerta). El portal no la da y hace falta para el catastro y la valoración.

**Del triaje**, con sus palabras:
- Por qué vende, para cuándo, quién decide, qué le preocupa.
- Nombres de los propietarios y si se les habla de tú o de vosotros.
- Día, hora y canal de la videollamada, y quién se conecta.

**Los testigos** (para la valoración): entre 6 y 10, mejor vendidos que en venta, con precio, m², situación, días publicados, bajadas y a cuántos metros están (`dist`). Si sabes hacia dónde caen, añade `x`/`y` (metros al este/norte, aproximados, sin número de portal) y el mapa 3D los pone en su sitio; si no, los reparte alrededor según la distancia. Si la valoración ya viene hecha (de `informe-valoracion` o de tu herramienta), pon sus cifras en `valoracion.resultado` y, si tienes precios de notaría de la zona, en `valoracion.notaria` (ver `plantilla/datos.js`); sin notaría, ese bloque no sale. Si el agente tiene la skill `informe-valoracion`, el método es el mismo (`calculo.md`): úsalo para elegir el `coef` de cada testigo. Enséñale la tabla de testigos para que la confirme. Sin testigos, la presentación sale con la valoración vacía y la chuleta lo avisa.

**De la zona:** 3-4 datos concretos que sepa el agente (transporte, colegios, servicios, quién compra ahí). Si no los da, pregunta: no los inventes.

**Su método:** 4-5 pasos de cómo trabaja. Si no los tiene, propón unos genéricos y que los confirme.

## Paso 2 · El perfil

Con el motivo de venta, propón uno de los 6 perfiles de [perfiles.md](perfiles.md) y **confírmalo con el agente** antes de seguir: «Por lo que me cuentas, lo trato como perfil 2, vende para comprar otra. ¿Te encaja?». Si encaja en dos, manda el que más le duele.

Del perfil salen `angulo` (tipo de sección y contenido), el ajuste del `plan` si lo hay, `adelanto.etiqueta` y `adelanto.frase`, y `chuleta.preguntas` y `chuleta.objeciones`. Adapta los textos del perfil al caso concreto (nombres, la casa nueva, la fecha que manda): nunca los pegues tal cual.

## Paso 3 · Generar la carpeta

1. Crea una carpeta junto a donde trabaja el agente: `videollamada-<calle>-<aaaa-mm-dd>/`.
2. Copia dentro `presentacion.html`, `adelanto.html`, `chuleta.html`, `comun.js`, `valoracion.js`, `premium.css`, `acabado.js` y `plan-vistas.html` de `plantilla/`, y una carpeta `fotos/` con las fotos (nombres sencillos: `salon.jpg`, `cocina.jpg`…). Fotos de más de 1 MB: redúcelas antes (`sips -Z 2000 foto.jpg` en Mac).
3. Escribe `datos.js` tomando como modelo el `datos.js` de `ejemplos/perfil-<N>-…/` del mismo perfil, campo a campo (la lista completa de campos, comentada, está en `plantilla/datos.js`):
   - `casa.foto_portada`: la foto más luminosa y amplia (normalmente el salón). `casa.foto_adelanto`: la misma u otra con mucha luz. `adelanto.fotos_extra`: tres miniaturas distintas de la portada.
   - `adelanto.detalle`: **un detalle concreto de su casa**, corto («Ese salón con luz de sur toda la tarde»). Sale en la imagen.
   - `angulo.titulo` admite `<em>…</em>` para la parte en cursiva.
   - `falta`: todo lo que no tienes o has supuesto (también «sin plano» si no hay). Solo sale en la chuleta.
   - `casa.tipo` decide el título: «Tu ático», «Vuestro chalet», «Vuestra casa». Si quieres otra palabra, `casa.palabra`. La calle va con «de la» o «del» según empiece (Calle, Paseo…); se fuerza con `casa.articulo`.
   - Chalets y casas: `casa.parcela_m2` añade la parcela a las cifras y a la chuleta.
   - `adelanto.foto_posicion` (p. ej. `'center 70%'`) mueve el encuadre de la foto del adelanto si corta lo importante.
   - Perfiles 3 y 6: la presentación añade sola el aviso «orientativo, confírmalo con tu notario o gestor». No lo quites ni des cifras fiscales exactas; en el perfil 6 cada partida dice «En la llamada» u «Orientativo · tu gestor».
4. Escribe `mensajes.md` con la estructura del `mensajes.md` de ese ejemplo: el adelanto, el guion del vídeo, el mensaje de mediodía si no contesta, el de una hora antes, el de diez minutos antes y qué hacer si no se conecta. Todo con la regla 3.

## Paso 4 · Plano 3D (si hay plano)

1. Usa la skill **`plano-3d`** (en esta misma colección) para trazar `plano-data.js` a partir del plano del anuncio o del que te mande el propietario. Comprueba el trazado con su herramienta (`comprobar-trazado.html`): sin errores de giro ni muebles que atraviesen paredes.
2. Copia `plantilla/plano3d.js` a la carpeta y pon `plano: { activo: true }` en `datos.js`. Si quieres que se amueble sola al verla, `estilo_inicial: 'nordico'` (o `'moderno'`).
3. Al estar activo, el plan cambia solo el pilar de decoración virtual por «Plano 3D y decoración virtual». **Ojo:** si escribes tus propios `plan.pilares` (perfiles 4 y 6), ese cambio no se hace solo: pon tú el pilar `cubo` en lugar del `sofa`.
4. **Sin plano** (o sin la skill `plano-3d` instalada): `plano: { activo: false }`, «sin plano» en `falta` y listo. La sección del 3D no sale y no se carga nada. **No inventes un plano.**
5. Si los m² o los dormitorios del plano no cuadran con el anuncio, avisa al agente.

## Paso 5 · Plan y mockups

- **El plan de marketing es estándar** (vive en `comun.js`): seis pilares, el embudo «de 20.000 personas a un comprador» con cifras de ejemplo y el calendario de 13 semanas en cuatro fases. No escribas `plan` en `datos.js` salvo el ajuste de su perfil (línea «Plan» de [perfiles.md](perfiles.md)). Cada subclave que escribas (`pilares`, `embudo`, `gantt`…) sustituye a la estándar entera; `plan: false` oculta el plan y el calendario.
- **Confirma con el agente qué pilares hace de verdad** (reglas 1 y 6): si no hace decoración virtual, ni campañas en redes, ni informe cada lunes, quita o cambia esos pilares en `plan.pilares` (y la barra correspondiente del calendario en `plan.gantt.carriles`). La presentación solo promete lo que va a hacer.
- **Quién compra:** `plan.compradores` solo si el agente sabe quién compra en esa zona (sus `zona.datos`). Si no, se queda vacío y no sale.
- **Los mockups** (ficha de portal, post, story y portada del vídeo) los ven los **compradores**, no el propietario. Escribe tú, con datos reales de la casa, sin precio y sin prometer plazos:
  - `mockups.portal.titular` (≤ 70 caracteres): tipo + lo mejor + zona. «Ático con terraza de 14 m² y vistas en Chamberí».
  - `mockups.portal.texto` (≤ 110 caracteres), opcional: si no lo escribes, sale la descripción de la casa recortada.
  - `mockups.post.gancho` (6-9 palabras, va sobre la foto) y `mockups.post.texto` (1-2 frases + pedir visita).
  - `mockups.story.texto` (≤ 8 palabras, grande).
  - `mockups.portada.etiqueta`: la etiqueta de arriba de la portada del vídeo (por defecto «En venta»).
  - `mockups.portada.detalle`: si `adelanto.detalle` le habla al propietario («va a ser la portada»), escribe uno para compradores («Tres dormitorios, dos baños y terraza»).
  - Las fotos de cada pieza salen solas de `casa.fotos` (post = 2.ª, story = 3.ª, portada = la del adelanto); cámbialas con `post.foto`, `story.foto`… si encaja mejor otra. `story.posicion` mueve el recorte vertical.
- La ficha del portal del mockup enseña el precio de salida de la valoración.
- El plan sale en un marco con 5 vistas que se eligen arriba (portal vs. tú, radar, camino del comprador, embudo y 90 días). Usa las fotos de la casa y tu agencia: no hay que tocar nada.
- El marco del plan se carga como `src="plan-vistas.html"`, **sin `#` detrás**: con `plan-vistas.html#A` el navegador baja solo hasta el plan al abrir la presentación y el propietario no ve la portada. Para cambiar de vista ya están los botones.

## Paso 6 · La imagen del adelanto

```bash
bash <ruta-de-la-skill>/scripts/capturar-adelanto.sh videollamada-<calle>-<fecha>
```

Genera `adelanto.png` (1080×1350) con Chrome, Edge o Chromium sin abrir ventana. Si no hay ninguno, abre `adelanto.html` en el navegador a 1080 de ancho y haz una captura.

**Mira la imagen antes de darla por buena:** que el texto se lea sobre la foto (si la foto es muy clara arriba, elige otra), que el título no se corte y que no aparezca ninguna cifra de precio.

## Paso 7 · Revisar y entregar

1. Sirve la carpeta (`npx serve <carpeta>` o `python3 -m http.server`) y recorre `presentacion.html` entera, en escritorio y a **375 px** de ancho: portada, «lo que me contasteis», la casa, la galería, el plano 3D, el ángulo, el plan, el calendario, los mockups, la zona, el método, la valoración y los siguientes pasos.
   - **Galería:** visor con miniaturas, todas a la vista (sin scroll lateral).
   - **Valoración:** el mapa 3D carga, salen los números de los testigos y al tocar uno se ilumina en el mapa, en la regla y en la lista.
   - **Plano 3D:** la maqueta carga, las paredes suben y **Nórdico** y **Moderno** amueblan.
   - **Embudo:** las barras se estrechan de arriba abajo, la última va en el color de acento y se ve la etiqueta «Cifras de ejemplo».
   - **Calendario:** a 375 px se desliza **dentro** de su caja; la página no se mueve de lado.
   - **Mockups:** la ficha del portal enseña el precio de salida.
   - Nada se sale por los lados, la consola no tiene errores y no queda ningún texto entre [corchetes].
2. Si hay testigos, revisa con el agente los tres precios de la chuleta: si el cierre está por encima del vendido más caro sin explicación, revisa los `coef`.
3. Entrégale, en este orden:
   - **Para mandar ya:** `adelanto.png` (o el vídeo) + el mensaje 1 de `mensajes.md`.
   - **Para la llamada:** `presentacion.html` (la abre y comparte pantalla) y `chuleta.html` (la imprime o la tiene al lado).
   - **Lo que falta**, en una lista corta.
   - Si has usado fotos del portal, el aviso de sus derechos (regla 5).
4. Recuérdale: **la carpeta no se manda antes de la llamada**, solo el adelanto.
5. **Presentación de muestra** (para enseñar cómo trabajas sin una casa concreta): `muestra: true` en `datos.js` quita la barra con tu nombre, la firma y los contactos del final y tapa todos los importes de la valoración (se ve el mapa, la regla y los testigos, sin cifras). Después de la llamada puede mandar la presentación si quiere ([referencia/publicar.md](referencia/publicar.md)).

## Modo app de Claude (sin terminal)

No puedes ejecutar el script ni copiar carpetas. Si no existe `~/.claude/mi-marca-inmobiliaria.md`, busca un archivo `mi-marca-inmobiliaria.md` en el conocimiento del Proyecto o adjunto al chat y úsalo igual; si tampoco está, lanza `mi-marca`. Genera los HTML con todo metido dentro: sustituye `<script src="datos.js">`, `<script src="comun.js">`, `<script src="valoracion.js">`, `<script src="acabado.js">` y `<link href="premium.css">` por su contenido (`plan-vistas.html` va aparte, en la misma carpeta, con `datos.js` metido dentro igual) y, si hay plano, mete también el contenido de `plano-data.js` y `plano3d.js` en dos `<script>` antes de `</body>` (three.js se sigue cargando de su CDN). Las fotos, como URL públicas o adjuntas. Entrégalo como archivos para descargar. Para la imagen, el agente abre `adelanto.html` y hace una captura de pantalla. Si no puedes abrir un enlace de un portal, pide las fotos y que pegue el texto del anuncio.

## Comprobaciones antes de entregar

- [ ] Perfil confirmado por el agente.
- [ ] Ningún dato inventado; lo supuesto, en `falta` (también «sin plano»).
- [ ] El adelanto: sin cifras de precio, con un detalle de su casa y la fecha y hora bien puestas.
- [ ] `mensajes.md` cumple la regla 3: ni reproches, ni excusas, ni «lo que no te enseño».
- [ ] Plano 3D: si hay plano, carga y amuebla; si no, la sección no sale.
- [ ] Plan: estándar salvo el ajuste del perfil; el embudo dice «Cifras de ejemplo».
- [ ] Mockups: textos para compradores, con datos reales.
- [ ] La valoración se ve entera (mapa 3D, regla, testigos) y dice «estimación orientativa, no tasación».
- [ ] Se ve bien en el móvil (sin desbordes laterales; el calendario y los mockups se deslizan dentro de su caja).
- [ ] Al abrirla se queda en la portada (no baja sola hasta el plan).
- [ ] Si las fotos son del portal, el agente sabe que son solo para esta propuesta.
