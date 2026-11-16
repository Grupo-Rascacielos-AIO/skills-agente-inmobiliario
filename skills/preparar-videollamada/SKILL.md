---
name: preparar-videollamada
description: Úsala cuando un agente inmobiliario haya cerrado una videollamada con un propietario (después del triaje) y quiera llegar con la casa preparada. Con las notas del triaje, el enlace del portal o la dirección, las fotos y los testigos, detecta el perfil del propietario (lleva meses sin vender, vende para comprar otra, herencia, separación, primera vez o inversor) y genera tres piezas con su marca - la presentación de scroll para la videollamada (con la valoración aparte, que solo se abre en la llamada), el adelanto para WhatsApp (imagen 1080×1350, mensaje y guion de vídeo) y la chuleta de la llamada (preguntas y objeciones del perfil). Disparadores - «prepara la videollamada», «tengo videollamada con un propietario», «prepárame la casa de…», «el adelanto para WhatsApp», «qué le mando antes de la videollamada», «chuleta de la llamada».
---

# Preparar la videollamada

Entre el triaje y la videollamada, el propietario tiene que ver que **te has currado su casa**, y tú tienes que llegar con todo preparado. Esta skill te deja, en una carpeta, lo de siempre y bien hecho, adaptado al tipo de propietario:

| Pieza | Para qué | Quién la ve |
|---|---|---|
| `presentacion.html` | La enseñas compartiendo pantalla en la videollamada. Scroll con su casa, el plan de su perfil, la zona, tu método y la valoración (cerrada hasta que la abres) | El propietario, **en la llamada** |
| `adelanto.png` + `mensajes.md` | La imagen para WhatsApp, el mensaje que la acompaña, el guion del vídeo de 30-45 s y los recordatorios | El propietario, **antes de la llamada** |
| `chuleta.html` | Una hoja A4: objetivo, el marco, 5 preguntas, 2 objeciones con respuesta, tus tres precios y lo que falta | **Solo tú** |

Archivos de la skill:
- [perfiles.md](perfiles.md): los 6 perfiles, con cómo se detectan, el ángulo, las preguntas y las objeciones. **Léelo antes de generar.**
- [plantilla/](plantilla/): `presentacion.html`, `adelanto.html`, `chuleta.html` y `comun.js`. No se tocan: todo sale de `datos.js`.
- [ejemplos/](ejemplos/): seis casos terminados con datos ficticios, uno por perfil (`perfil-1-…` a `perfil-6-…`), cada uno con sus tres piezas, `mensajes.md` y capturas. El `datos.js` del perfil que toque es el **modelo** que copias y rellenas.
- [scripts/capturar-adelanto.sh](scripts/capturar-adelanto.sh): convierte `adelanto.html` en `adelanto.png`.

## Reglas (no se negocian)

1. **Nunca inventes datos.** Ni metros, ni reformas, ni testigos, ni datos de la zona, ni opiniones. Lo que no tengas, lo preguntas o lo quitas, y va a «lo que falta».
2. **La valoración no sale antes de la llamada.** Si la ven antes y no les encaja, cancelan. Por eso va cerrada en la presentación y **nunca** en el adelanto. Es una regla tuya: **no se le dice al propietario**.
3. **Los textos para el propietario** (mensaje del adelanto, guion del vídeo, recordatorios, imagen) buscan que se presente sin fricción:
   - **Sí:** un detalle concreto de **su** casa, ganas de enseñarle lo preparado, «lo vemos juntos» y una pregunta fácil al final («¿os sigue viniendo bien a las 19:00?»). Cálidos y cortos.
   - **No:** decir lo que aún no le enseñas («el precio te lo enseño luego», «no te mando la valoración», «sin precio»), «para que veas que no soy un bot», reproches («no he recibido contestación tuya») ni excusas que no son verdad («he atendido a otro cliente»).
4. **Es una estimación orientativa de mercado, no una tasación.** Nunca la llames «tasación».
5. **Las fotos son las del propietario** (o las de su anuncio). Usa solo lo que te ha mandado.

## Paso 0 · La marca

1. Lee `~/.claude/mi-marca-inmobiliaria.md` y pasa sus campos a `marca` en `datos.js`: `nombre`, `agencia`, `telefono`, `whatsapp`, `email`, `zona`, `color_*`, `tipografia_*`, `logo`, `foto`, `tono` y `estilo`.
2. Si no existe, **lanza la skill `mi-marca`** («Antes, configuremos tu marca: son dos minutos y todo saldrá con tu nombre y tus colores»).
3. Si dice «ahora no», pide lo mínimo en un mensaje: nombre, agencia, teléfono, email y un color. Sin tipografías elegidas: Newsreader + Hanken Grotesk. El color principal tiene que ser oscuro (encima van textos en blanco).

## Paso 1 · Los datos (pregunta solo lo que falte, en un único mensaje)

**Del triaje**, con sus palabras:
- Por qué vende, para cuándo, quién decide, qué le preocupa.
- Nombres de los propietarios y si se les habla de tú o de vosotros.
- Día, hora y canal de la videollamada, y quién se conecta.

**De la casa:**
- **Si tiene anuncio en un portal:** el enlace. Intenta leerlo. Los portales suelen bloquear la lectura automática: si no puedes abrirlo, **pide capturas de pantalla o que pegue el texto del anuncio** (y las fotos). Del anuncio salen las fotos, el plano, la descripción, los metros y desde cuándo está publicado.
- **Siempre:** la dirección exacta (calle, número, planta y puerta). El portal no la da y hace falta para el catastro y la valoración.
- **Si no hay anuncio:** las fotos de cada estancia, la fachada y las vistas; el plano si lo tiene; qué se ha reformado y cuándo.
- **Si te manda vídeos:** saca 4-6 fotogramas buenos (con `ffmpeg -i video.mp4 -vf fps=1/4 f%02d.jpg` si lo tienes, o pídele capturas) y úsalos como fotos.

**Los testigos** (para la valoración): entre 6 y 10, mejor vendidos que en venta, con precio, m², situación, días publicados y bajadas. Si el agente tiene la skill `informe-valoracion`, el método es el mismo (`calculo.md`): úsalo para elegir el `coef` de cada testigo. Enséñale la tabla de testigos para que la confirme. Sin testigos, la presentación sale con la valoración vacía y la chuleta lo avisa.

**De la zona:** 3-4 datos concretos que sepa el agente (transporte, colegios, servicios, quién compra ahí). Si no los da, pregunta: no los inventes.

**Su método:** 4-5 pasos de cómo trabaja. Si no los tiene, propón unos genéricos y que los confirme.

## Paso 2 · El perfil

Con el motivo de venta, propón uno de los 6 perfiles de [perfiles.md](perfiles.md) y **confírmalo con el agente** antes de seguir: «Por lo que me cuentas, lo trato como perfil 2, vende para comprar otra. ¿Te encaja?». Si encaja en dos, manda el que más le duele.

Del perfil salen `angulo` (tipo de sección y contenido), `adelanto.etiqueta` y `adelanto.frase`, y `chuleta.preguntas` y `chuleta.objeciones`. Adapta los textos del perfil al caso concreto (nombres, la casa nueva, la fecha que manda): nunca los pegues tal cual.

## Paso 3 · Generar la carpeta

1. Crea una carpeta junto a donde trabaja el agente: `videollamada-<calle>-<aaaa-mm-dd>/`.
2. Copia dentro los cuatro archivos de `plantilla/` y una carpeta `fotos/` con las fotos (nombres sencillos: `salon.jpg`, `cocina.jpg`…).
3. Escribe `datos.js` tomando como modelo el `datos.js` de `ejemplos/perfil-<N>-…/` del mismo perfil, campo a campo:
   - `casa.foto_portada`: la foto más luminosa y amplia (normalmente el salón). `casa.foto_adelanto`: la misma u otra con mucha luz. `adelanto.fotos_extra`: tres miniaturas distintas de la portada.
   - `adelanto.detalle`: **un detalle concreto de su casa**, corto («Ese salón con luz de sur toda la tarde»). Sale en la imagen.
   - `angulo.titulo` admite `<em>…</em>` para la parte en cursiva.
   - `falta`: todo lo que no tienes o has supuesto. Solo sale en la chuleta.
   - `casa.tipo` decide el título: «Tu ático», «Vuestro chalet», «Vuestra casa». Si quieres otra palabra, `casa.palabra`. La calle va con «de la» o «del» según empiece (Calle, Paseo…); se fuerza con `casa.articulo`.
   - Chalets y casas: `casa.parcela_m2` añade la parcela a las cifras y a la chuleta.
   - `adelanto.foto_posicion` (p. ej. `'center 70%'`) mueve el encuadre de la foto del adelanto si corta lo importante.
   - Perfiles 3 y 6: la presentación añade sola el aviso «orientativo, confírmalo con tu notario o gestor». No lo quites ni des cifras fiscales exactas; en el perfil 6 cada partida dice «En la llamada» u «Orientativo · tu gestor».
4. Escribe `mensajes.md` con la estructura del `mensajes.md` de ese ejemplo: el adelanto, el guion del vídeo, el mensaje de mediodía si no contesta, el de una hora antes, el de diez minutos antes y qué hacer si no se conecta. Todo con la regla 3.

## Paso 4 · La imagen del adelanto

```bash
bash <ruta-de-la-skill>/scripts/capturar-adelanto.sh videollamada-<calle>-<fecha>
```

Genera `adelanto.png` (1080×1350) con Chrome, Edge o Chromium sin abrir ventana. Si no hay ninguno, abre `adelanto.html` en el navegador a 1080 de ancho y haz una captura.

**Mira la imagen antes de darla por buena:** que el texto se lea sobre la foto (si la foto es muy clara arriba, elige otra), que el título no se corte y que no aparezca ninguna cifra de precio.

## Paso 5 · Revisar y entregar

1. Abre `presentacion.html` y recórrela entera (escritorio y móvil): portada, «lo que me contasteis», la casa, la galería, el plan, la zona, el método, la valoración (pulsa «Abrir la valoración») y los siguientes pasos.
2. Si hay testigos, revisa con el agente los tres precios de la chuleta: si el cierre está por encima del vendido más caro sin explicación, revisa los `coef`.
3. Entrégale, en este orden:
   - **Para mandar ya:** `adelanto.png` (o el vídeo) + el mensaje 1 de `mensajes.md`.
   - **Para la llamada:** `presentacion.html` (la abre y comparte pantalla) y `chuleta.html` (la imprime o la tiene al lado).
   - **Lo que falta**, en una lista corta.
4. Recuérdale: **la carpeta no se manda antes de la llamada**, solo el adelanto. Después de la llamada puede mandar la presentación si quiere.

## Modo app de Claude (sin terminal)

No puedes ejecutar el script ni copiar carpetas. Genera los tres HTML con los datos ya metidos dentro (sustituye `<script src="datos.js">` y `<script src="comun.js">` por su contenido) y las fotos como URL públicas o adjuntas. Para la imagen, el agente abre `adelanto.html` y hace una captura de pantalla.

## Comprobaciones antes de entregar

- [ ] Perfil confirmado por el agente.
- [ ] Ningún dato inventado; lo supuesto, en `falta`.
- [ ] El adelanto: sin cifras de precio, con un detalle de su casa y la fecha y hora bien puestas.
- [ ] `mensajes.md` cumple la regla 3: ni reproches, ni excusas, ni «lo que no te enseño».
- [ ] La valoración se abre y dice «estimación orientativa, no tasación».
- [ ] Se ve bien en el móvil (sin desbordes laterales).
