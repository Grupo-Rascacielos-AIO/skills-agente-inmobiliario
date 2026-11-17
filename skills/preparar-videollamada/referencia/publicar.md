# Ver la presentación y, después de la llamada, publicarla (para quien no es técnico)

> **Solo después de la videollamada.** Antes de la llamada no se manda nada más que el adelanto. Si después quieres
> mandar la presentación por enlace, sigue estos pasos.

## Verla en tu ordenador
La página carga archivos de su carpeta (fotos, datos y, si hay, el plano 3D), así que se ve mejor con un mini
servidor:
1. Abre la app **Terminal** (Mac) o **PowerShell** (Windows).
2. Escribe `npx serve ` (con un espacio al final), arrastra la carpeta de la videollamada a la ventana y pulsa Intro.
   La primera vez puede preguntar «Ok to proceed?»: escribe `y` e Intro.
3. Abre en el navegador la dirección que aparece (normalmente `http://localhost:3000`) y entra en
   `presentacion.html`.
4. Para pararlo: `Ctrl + C` en esa ventana.

Si no tienes `npx`, instala **Node.js** (versión LTS) desde nodejs.org: es gratis y es un instalador normal.
Si se lo pides a Claude, lo hace él: «ábreme la presentación en local».

## Antes de publicar
- La página ya lleva `noindex`: no sale en buscadores.
- **Sin datos del propietario en la dirección web**: ni su nombre ni la calle con número en el nombre del proyecto.
  Usa algo como `piso-benimaclet`.
- Deja en la carpeta solo lo que se ve: `presentacion.html`, `comun.js`, `datos.js`, `fotos/` y, si hay plano,
  `plano-data.js` y `plano3d.js`. **Quita `chuleta.html`, `mensajes.md` y el PDF de la chuleta**: son solo para ti.
- **Limpia `datos.js`**: borra los bloques `chuleta` y `falta`, `casa.portal` y `cita.enlace`. Son notas tuyas (preguntas, objeciones, lo que falta, el precio del portal) y, aunque no se pinten, cualquiera podría leerlas en el archivo publicado.
- Renombra `presentacion.html` a `index.html` para que el enlace abra directamente la presentación.

## Publicarla gratis · opción A: Netlify Drop (sin instalar nada)
1. Entra en **app.netlify.com/drop** (pide crear una cuenta gratuita la primera vez).
2. Arrastra **la carpeta entera** a la página.
3. En unos segundos te da un enlace tipo `https://nombre-raro-123.netlify.app`. Ese es el que envías.
4. Puedes cambiar el nombre en *Site configuration → Change site name* (sin datos del propietario).

## Publicarla gratis · opción B: Vercel (desde la Terminal)
1. En la Terminal, entra en la carpeta: escribe `cd `, arrastra la carpeta e Intro.
2. Escribe `npx vercel` e Intro. La primera vez te pide iniciar sesión (se abre el navegador; cuenta gratuita).
3. Responde a las preguntas pulsando Intro (valen las opciones por defecto). Ponle un nombre de proyecto sin datos
   del propietario, p. ej. `piso-benimaclet`.
4. Para la versión definitiva: `npx vercel --prod`. Te da el enlace definitivo.
5. Si cambias algo, repite `npx vercel --prod` y se actualiza en el mismo enlace.

## Antes de enviarla
- Ábrela desde el móvil con el enlace publicado.
- Prueba el botón de WhatsApp y el de llamar.
- Si hay plano 3D, comprueba que se mueve y que los muebles aparecen.
- Envíala con una frase corta y sin fricción: «Os dejo la presentación de la llamada para que la tengáis a mano.
  ¿Os viene bien que hablemos el jueves?».
