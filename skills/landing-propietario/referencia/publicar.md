# Ver la landing y publicarla gratis (para quien no es técnico)

## Verla en tu ordenador
La página carga archivos de su carpeta (fotos, datos, plano), así que se ve mejor con un mini servidor:
1. Abre la app **Terminal** (Mac) o **PowerShell** (Windows).
2. Escribe `npx serve ` (con un espacio al final), arrastra la carpeta de la landing a la ventana y pulsa Intro.
   La primera vez puede preguntar «Ok to proceed?»: escribe `y` e Intro.
3. Abre en el navegador la dirección que aparece (normalmente `http://localhost:3000`).
4. Para pararlo: `Ctrl + C` en esa ventana.

Si no tienes `npx`, instala **Node.js** (versión LTS) desde nodejs.org: es gratis y es un instalador normal.
Si se lo pides a Claude, lo hace él: «ábreme la landing en local».

## Publicarla gratis · opción A: Netlify Drop (sin instalar nada)
1. Entra en **app.netlify.com/drop** (pide crear una cuenta gratuita la primera vez).
2. Arrastra **la carpeta entera** de la landing a la página.
3. En unos segundos te da un enlace tipo `https://nombre-raro-123.netlify.app`. Ese es el que envías.
4. Puedes cambiar el nombre en *Site configuration → Change site name* (sin el nombre del propietario).

## Publicarla gratis · opción B: Vercel (desde la Terminal)
1. En la Terminal, entra en la carpeta: escribe `cd `, arrastra la carpeta e Intro.
2. Escribe `npx vercel` e Intro. La primera vez te pide iniciar sesión (se abre el navegador; cuenta gratuita).
3. Responde a las preguntas pulsando Intro (valen las opciones por defecto). Ponle un nombre de proyecto sin datos
   del propietario, p. ej. `piso-ruzafa`.
4. Para la versión definitiva: `npx vercel --prod`. Te da el enlace `https://piso-ruzafa.vercel.app`.
5. Si cambias algo, repite `npx vercel --prod` y se actualiza en el mismo enlace.

## Antes de enviarla
- Ábrela desde el móvil con el enlace publicado.
- Prueba el botón de WhatsApp y el de llamar.
- Si hay plano 3D, comprueba que se mueve y que los muebles aparecen.
- Envíala por WhatsApp con una frase corta: «Te he preparado cómo presentaríamos tu casa, échale un ojo y lo hablamos».
