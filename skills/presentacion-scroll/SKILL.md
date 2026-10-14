---
name: presentacion-scroll
description: Crea presentaciones HTML de scroll inmersivo (portada con paralaje, secciones que se quedan fijas mientras bajas, cifras que cuentan solas, galerías horizontales, barras animadas) con la marca del agente inmobiliario, listas para enviar por WhatsApp o publicar gratis. Úsala cuando pida «presentación de scroll», «web de presentación», «landing inmersiva», «página que se va haciendo scroll», «preséntame a un propietario», «presentación para captar una exclusiva», «presenta mi servicio», «mi método de venta en una web», «presentación de un inmueble», «web del piso», «ficha del inmueble en web», «presentación para la visita», «lead magnet en HTML», «guía para vendedores en web», «informe de zona», «informe de mercado de mi barrio», «dossier de presentación», «algo más bonito que un PDF», «efecto parallax», «animaciones al hacer scroll». También «cambia mi estilo», «quiero otro estilo», «enséñame los estilos» o «configura el estilo de mis presentaciones».
---

# Presentación de scroll

Genera **una página web de una sola pieza** (un archivo `index.html`) que se recorre haciendo scroll: la portada se mueve con paralaje, las cifras cuentan solas, el método se queda fijo mientras cambian los pasos, la galería avanza de lado. Se abre en el móvil desde un enlace de WhatsApp y se publica gratis en un minuto.

Sirve para cinco cosas:

| Caso | Para qué | Secciones típicas |
|---|---|---|
| **Presentarte a un propietario** | Antes o después de la visita de captación | Portada · cifras · quién soy · método (fijo) · vendidas (galería) · comparativa · tu zona · opiniones · preguntas · contacto |
| **Presentar tu servicio** | Enlace en la bio, firma del email | Portada · problema · método (fijo) · qué incluye · opiniones · preguntas · contacto |
| **Presentar un inmueble** | Enviar a compradores, pedir visitas | Portada · cifras (m², dormitorios…) · galería · recorrido por estancias (fijo, con foto) · ficha y precio · barrio · agente · contacto |
| **Lead magnet** | «Guía para vender tu casa en 2026», «7 errores al vender» | Portada · capítulos (método fijo) · cifras · comparativa · contacto |
| **Informe de zona** | Captar propietarios con datos del barrio | Portada · cifras del mercado · barras de precios · evolución · qué significa para ti · contacto |

El agente no es técnico: háblale sin jerga, enséñale el resultado abierto en su navegador y haz tú todo lo demás.

---

## Paso 0 · Leer la marca y el estilo (SIEMPRE, antes de nada)

1. **`mi-estilo.md`** de esta carpeta de la skill. Si existe, ya está todo decidido: plantilla base, colores, fuentes y gustos. Úsalo y **no vuelvas a preguntar por el estilo**.
2. **`~/.claude/mi-marca-inmobiliaria.md`** (lo crea la skill `mi-marca`). Campos que te interesan:
   `nombre, agencia, telefono, whatsapp, email, zona, color_principal, color_secundario, color_acento, tipografia_titulos, tipografia_texto, logo, foto, tono, estilo, referencias`.
   - Si tiene `estilo` pero no existe `mi-estilo.md` (por ejemplo, porque se actualizó la skill), **reconstruye `mi-estilo.md` en silencio** a partir de la marca y sigue.
3. Si **no existe ninguno de los dos** → haz la **configuración de la primera vez** (abajo) y después la presentación.
4. Si existe la marca pero **sin `estilo`** → salta al paso C de la configuración: ya tienes colores, solo falta elegir la estructura visual (enséñale los 3 estilos pintados con **sus** colores).

Nunca inventes teléfono, email, cifras, opiniones ni datos de mercado. Si falta algo, pregúntalo o quita esa sección.

---

## Configuración de la primera vez

Saluda en una frase («Antes de la primera presentación vamos a dejar tu estilo configurado; solo se hace una vez») y pregunta **por bloques** (máximo 3-4 preguntas por mensaje):

**A. Datos básicos** — nombre, agencia (o «independiente»), zona, teléfono, WhatsApp, email, y si tiene logo y foto profesional (ruta del archivo). Tono: cercano, profesional o premium (si duda, profesional).

**B. ¿Cómo quieres decidir tu estilo?** Ofrécele las tres vías, tal cual:

> 1. **Ya tengo mis colores y mi tipografía** → me los dices y los aplico.
> 2. **Enséñame opciones** → te preparo la misma presentación en 3 estilos muy distintos, los abres y eliges.
> 3. **Sácalo de lo que ya tengo** → me pasas tu Instagram, tu web o unas capturas y extraigo tu paleta, tus letras y tu tono.

### Vía 1 · Sus colores

- Pide 2-3 colores. Vale «azul marino y dorado»: tú lo traduces a hex. Necesitas **principal** (oscuro: titulares y fondos fuertes), **secundario** (claro: fondo de página) y **acento** (botones y detalles).
- Tipografía: si no sabe, propón 3 parejas de Google Fonts acordes a su tono (p. ej. *Playfair Display + Inter*, *Space Grotesk + Inter*, *Fraunces + Nunito Sans*, *DM Serif Display + DM Sans*, *Cormorant Garamond + Manrope*).
- Elige la plantilla base cuyo carácter encaje (serif y aire → Editorial; sans y aristas → Minimal; redondeces y calidez → Cálido) y **enséñasela ya pintada** con sus colores para que la apruebe.

### Vía 2 · Tres mockups para elegir

1. Crea la carpeta `elige-tu-estilo/` en el directorio de trabajo y copia allí las 3 plantillas de [plantillas/](plantillas/).
2. En las tres, sustituye el nombre de ejemplo (Marta Vidal / Inmobiliaria Vidal / Centro y Ensanche / WhatsApp) por **sus datos**, y si tiene foto, ponla en «Quién soy». Si ya hay marca con colores, aplícalos también en las tres (cambia solo las variables de `:root`): así compara **estructuras**, no colores.
3. Ábrelas (`open elige-tu-estilo/*.html` en Mac, `start` en Windows) y explícale en una línea cada una:
   - **1 · Editorial elegante** — serif fina con cursiva, portada centrada a sangre, líneas finas, cero redondeces. Alto standing, obra nueva, clientela exigente.
   - **2 · Moderno minimal** — sans grande y apretada, portada partida texto-foto, azul eléctrico, esquinas suaves. Joven, digital, rápido.
   - **3 · Cálido cercano** — serif redondeada, palabras subrayadas a mano, tarjetas muy redondas, verde y mostaza. Barrio, familias, primera vivienda.
4. Que elija **una** (o «la 2 pero con los colores de la 3»: se puede). Ajusta lo que pida y confirma.

### Vía 3 · Extraer de su Instagram, web o capturas

- **Capturas** (lo más fiable): pídele 3-6 capturas de su perfil, sus publicaciones o su web. Míralas y saca 3 colores dominantes (si tienes Python con Pillow, cuantiza la imagen para afinar los hex), el tipo de letra (serif/sans, peso, si usa cursivas) y el tono de los textos.
- **Web**: descárgala y busca en su CSS los colores más repetidos y las `font-family` (o las fuentes de Google Fonts enlazadas).
- **Instagram**: suele pedir inicio de sesión y no se puede leer bien desde aquí; si no carga, pídele capturas. Nunca le pidas su contraseña.
- Propón la paleta y las fuentes resultantes **aplicadas a la plantilla que mejor case**, y que la apruebe.

### C. Guardar (para que no vuelva a preguntar)

1. **Marca** → `~/.claude/mi-marca-inmobiliaria.md`. Si no existía, créalo con este formato exacto (el que leen todas las skills; deja vacío lo que no tenga):
   ```
   ---
   nombre: 
   agencia: 
   telefono: 
   whatsapp: 
   email: 
   zona: 
   color_principal: "#"
   color_secundario: "#"
   color_acento: "#"
   tipografia_titulos: 
   tipografia_texto: 
   logo: 
   foto: 
   tono: 
   estilo: 
   referencias: 
   ---
   ```
   Si ya existía, **cambia solo** `estilo` (y `referencias` si vino por la vía 3: su Instagram o web) y los colores/fuentes si los ha cambiado. No toques el resto.
   - `estilo`: `editorial-elegante`, `moderno-minimal` o `calido-cercano` (+ « (personalizado)» si lo has modificado).
2. **Su estilo dentro de esta skill** → crea o reescribe **`mi-estilo.md`** en esta misma carpeta (junto a este SKILL.md):
   ```markdown
   ---
   estilo_base: moderno-minimal
   plantilla: plantillas/estilo-2-moderno-minimal.html
   via: mockups            # sus-colores | mockups | extraido
   actualizado: 2026-10-14
   ---
   # Mi estilo

   ## Variables (copiar tal cual en :root)
   --color-principal: #111418;
   --color-secundario: #F5F6F7;
   --color-acento: #2F6BFF;
   --color-acento-texto: #2458D6;
   --sobre-acento: #FFFFFF;
   --fuente-titulos: 'Space Grotesk', system-ui, sans-serif;
   --fuente-texto: 'Inter', system-ui, sans-serif;

   ## Enlace de Google Fonts
   https://fonts.googleapis.com/css2?family=...

   ## Gustos y vetos
   - Le gustó: la portada partida, las cifras grandes.
   - No quiere: cursivas, fondos muy oscuros.
   ```
   Desde ese momento **todas** las presentaciones salen con ese estilo sin preguntar.
3. Confírmaselo en una frase: «Listo, tu estilo queda guardado. Si algún día quieres cambiarlo, dime **"cambia mi estilo"**».

> Si la skill está instalada como plugin, una actualización puede borrar `mi-estilo.md`. No pasa nada: el campo `estilo` de su archivo de marca lo reconstruye (Paso 0).

### «Cambia mi estilo»

Repite solo la parte B (las tres vías) partiendo de lo que ya tiene, guarda de nuevo los dos archivos y ofrécele regenerar su última presentación con el estilo nuevo. Para cambios pequeños («el botón más oscuro», «otra letra para los títulos») no hace falta repetir nada: edita `mi-estilo.md` y la marca.

---

## Flujo de cada presentación

1. **Paso 0** (marca + estilo).
2. **Pregunta qué es y para quién** si no lo ha dicho: ¿propietario, servicio, inmueble, lead magnet o informe de zona? ¿Se la vas a mandar a alguien concreto (nombre del propietario, dirección del piso)?
3. **Recoge el contenido real**. Pide lo que falte en un solo mensaje corto: cifras (años, ventas, días medios, % del precio), 3 pasos de su método o los que tenga, fotos (carpeta), opiniones reales con nombre o iniciales, datos de zona con su fuente. Si no tiene algo, **quita la sección** en lugar de inventarla.
4. **Escribe el guion** con su tono (cercano, profesional, premium). Titulares cortos con una palabra destacada (`<span class="destacado">`). Si está instalada la skill `copywriter-inmobiliario`, úsala para los textos.
5. **Monta el HTML**: copia la plantilla de `mi-estilo.md` a una carpeta nueva con nombre claro (`presentacion-propietario-calle-mayor/index.html`), pon sus variables en `:root` y su enlace de fuentes, y sustituye/duplica/borra secciones. Para un inmueble, parte de [ejemplo/index.html](ejemplo/index.html) (ya trae ficha, recorrido con fotos y barrio) y aplícale sus variables.
6. **Fotos**: cópialas a `fotos/` junto al `index.html` y redúcelas a 1600 px de lado largo (`sips -Z 1600 fotos/*.jpg` en Mac). Rutas relativas (`fotos/salon.jpg`). La primera foto de la portada es la más importante: luminosa y horizontal.
7. **Comprueba** (ver «Verificación») a 1440 px y a 375 px.
8. **Ábresela** (`open index.html`) y pregúntale qué cambiaría.
9. **Ofrécele publicarla** (ver «Publicar gratis»).

---

## Componentes disponibles (todos en las plantillas)

Cada sección es un bloque `<section>` independiente: se pueden duplicar, reordenar o borrar sin romper nada. El script los detecta solos.

| Componente | Clase / atributo | Qué hace | Notas |
|---|---|---|---|
| Barra de progreso | `.progreso` | Línea fina arriba que se llena al bajar | Automática |
| Navegación fija | `.nav` | Nombre + botón de WhatsApp; se vuelve opaca al bajar | Enlace `https://wa.me/34XXXXXXXXX?text=...` |
| Portada con paralaje | `.hero` + `data-paralaje="0.18"` en la imagen | Foto a pantalla completa que se mueve más lenta que el texto | Cada estilo la compone distinto (centrada, partida, enmarcada) |
| Revelado al hacer scroll | `.revelar` (+ `data-retraso="1..3"`) | Aparece subiendo y con fundido | Con redes de seguridad: nunca se queda nada invisible |
| Cifras que cuentan | `data-hasta="186"` · `data-decimales="1"` · `data-sufijo=" días"` | Cuenta desde 0 con formato español (1.234,5) | Sufijo en pequeño. Solo cifras reales |
| Quién soy | `.sobre` + `.sobre-foto` + `.firma` + `.sellos` | Foto con paralaje suave, texto y sellos | |
| Método / pasos fijos | `.metodo` > `.metodo-pin` > `.metodo-lista li` + `.paso` | La sección se queda fija y los pasos cambian al bajar | Añade o quita pasos: un `<li>` y un `.paso` por paso, la altura se calcula sola |
| Paso con foto | `.paso.con-foto` + `<img>` dentro | Igual, con foto: recorrido por estancias | Fotos horizontales |
| Galería horizontal | `.galeria` > `.galeria-pista` > `.galeria-item` | En escritorio se fija y avanza de lado; en móvil se desliza con el dedo | Clic en una foto → visor a pantalla completa (Esc para cerrar) |
| Comparativa | `.comparativa` > `.columna` / `.columna.buena` | «Por tu cuenta ✕» frente a «Conmigo ✓» | |
| Barras animadas | `.barras` > `.barra-fila` (`.resaltada`) + `<i style="--valor:75%">` | Crecen al entrar en pantalla | Precios por zona, minutos a pie, plazos. Pon la fuente en `.nota` |
| Ficha técnica | `.precio` + `dl.ficha` | Precio grande y datos en rejilla | Para inmuebles |
| Opiniones | `.opiniones` > `.opinion` | Tarjetas con estrellas, cita y nombre | Solo opiniones reales y con permiso |
| Preguntas frecuentes | `.preguntas details` | Acordeón accesible, sin JavaScript | |
| Cierre | `.seccion.oscura.cierre` | Titular, botones de WhatsApp y llamada, datos de contacto | |
| Fondos | `.seccion` · `.seccion.alt` · `.seccion.oscura` | Claro, claro alternativo, oscuro | Alterna para dar ritmo |

### Variables de marca (lo único que cambia entre estilos y alumnos)

```css
--color-principal      /* oscuro: titulares y fondos fuertes */
--color-secundario     /* claro: fondo de la página */
--color-acento         /* botones, cifras, detalles */
--color-acento-texto   /* el acento oscurecido para leerse sobre fondo claro (contraste 4,5:1) */
--sobre-acento         /* texto encima del botón: #fff o un oscuro, el que más contraste */
--fuente-titulos / --fuente-texto   /* + cambiar el <link> de Google Fonts */
--peso-titulo · --tracking-titulo · --tracking-etiqueta · --radio · --radio-boton · --nav-color-inicial
```

El resto de colores (texto, líneas, fondos alternos) se derivan solos con `color-mix()`. Si su color principal es **claro** (pastel), no sirve como principal: usa su color más oscuro como principal y el claro como acento.

---

## Reglas técnicas (para que no se rompa)

- **Un solo `index.html`** con CSS y JS dentro; sin librerías. Solo carga Google Fonts y las fotos.
- **Nunca `overflow:hidden` en un `section` ni en sus padres**: rompe las secciones fijas (`position: sticky`). Para recortar sin romperlas, `overflow-x: clip` (ya está puesto).
- **Sin scroll lateral a 375 px**: nada de anchos fijos mayores que la pantalla; imágenes con `max-width:100%`.
- **Movimiento reducido**: con `prefers-reduced-motion` todo aparece visible, sin paralaje y la galería pasa a deslizable. Ya está en las plantillas: no lo quites.
- **Contraste**: texto sobre foto siempre con el velo (`.hero-velo`); texto de acento sobre fondo claro con `--color-acento-texto`.
- **Fotos**: solo del agente, del inmueble (con permiso del propietario) o de bancos con licencia libre. Las de las plantillas son de Unsplash y están para sustituirse.
- **Datos personales**: nada de direcciones exactas del inmueble (calle y número) ni datos del propietario si no lo autoriza.

---

## Verificación (antes de entregar)

Ábrela en el navegador integrado o con Playwright, a **1440 px** y a **375 px**, recorre la página entera y comprueba:

1. Consola sin errores.
2. `document.documentElement.scrollWidth === innerWidth` en todo el recorrido (sin scroll lateral).
3. Tras bajar hasta el final, `document.querySelectorAll('.revelar:not(.visible)').length === 0`.
4. Las cifras terminan en su valor final con formato español.
5. El método cambia de paso al bajar y la galería avanza (escritorio) o se desliza (móvil).
6. Mira las capturas: nada tapado, nada cortado, titulares legibles sobre la foto.

Nota: en algunos paneles de navegador embebido la ventana mide 0 px de alto y nada se revela; si pasa, verifica con Playwright.

---

## Publicar gratis (explicado para el agente)

Antes de publicar: la carpeta debe tener `index.html` y, si hay, `fotos/`. Esa carpeta entera es «la web».

**Opción A · Netlify Drop (sin instalar nada, la más fácil)**
1. Entra en **app.netlify.com/drop**.
2. Arrastra la **carpeta** de la presentación a la página.
3. En segundos te da un enlace tipo `algo-raro-123.netlify.app`. Para que no caduque, crea una cuenta gratuita (con tu email o Google) y pulsa «guardar/reclamar» el sitio; ahí mismo puedes cambiarle el nombre (`marta-vidal-vende.netlify.app`).

**Opción B · Vercel (desde Claude, con un comando)**
1. Necesita Node.js instalado (nodejs.org, botón LTS). Claude puede comprobarlo con `node -v`.
2. Claude ejecuta, dentro de la carpeta: `npx vercel --prod`.
3. La primera vez se abre el navegador para que **tú** inicies sesión o crees la cuenta gratuita (con GitHub, Google o email). Después Claude termina solo y te da el enlace `nombre.vercel.app`.
4. Para actualizarla, Claude repite el mismo comando. Ojo: el plan gratuito de Vercel está pensado para uso personal; para la web de tu negocio, Netlify es la opción gratuita más clara.

**Compartir**: pega el enlace en WhatsApp; se verá con el título de la página (`<title>`) y la descripción. Para cambiar ese texto, edita `<title>` y `<meta name="description">`.

---

## Archivos de esta skill

- [plantillas/estilo-1-editorial-elegante.html](plantillas/estilo-1-editorial-elegante.html) · [estilo-2-moderno-minimal.html](plantillas/estilo-2-moderno-minimal.html) · [estilo-3-calido-cercano.html](plantillas/estilo-3-calido-cercano.html) — la misma presentación a un propietario en los 3 estilos base. Todo color y fuente sale de `:root`.
- [ejemplo/index.html](ejemplo/index.html) — presentación de un inmueble de un agente **ficticio** (Javier Robles, Robles Hogar), estilo Editorial elegante: portada, cifras, galería, recorrido por estancias con fotos, ficha y precio, barrio, agente y contacto.
- `mi-estilo.md` — no viene de serie: se crea la primera vez con el estilo del agente.

## Errores comunes

- Inventar cifras u opiniones para «rellenar» → quita la sección.
- Cambiar colores sueltos en el CSS en vez de las variables de `:root` → se pierde la coherencia y el «cambia mi estilo» deja de funcionar.
- Poner `overflow:hidden` a una sección para arreglar un desborde → mata el método fijo y la galería.
- Fotos de 8 MB sin reducir → la página tarda en abrir en el móvil.
- Olvidar cambiar el número de WhatsApp de ejemplo (`34600000000`) y el email `ejemplo.com`.
- Preguntar otra vez el estilo cuando ya existe `mi-estilo.md`.

## En la app de Claude (sin terminal)

Si no existe `~/.claude/mi-marca-inmobiliaria.md` (por ejemplo, en la app de Claude), busca un archivo `mi-marca-inmobiliaria.md` en el conocimiento del Proyecto o adjunto al chat y úsalo igual. Si tampoco está, lanza `mi-marca`. En la app no se puede guardar `mi-estilo.md` dentro de la skill: el estilo queda en el campo `estilo` de ese archivo. Entrega siempre el resultado como archivos para **descargar** y, para publicar, explica Netlify Drop: entrar en app.netlify.com/drop y arrastrar la carpeta.
