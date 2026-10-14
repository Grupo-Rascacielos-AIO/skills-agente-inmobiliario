---
name: landing-propietario
description: Crea una landing de una sola página, premium y adaptada al móvil, para presentar a un PROPIETARIO cómo vas a vender su casa: portada con la vivienda, galería de fotos, plano 3D amueblable si hay plano, puntos fuertes, plan de marketing (fotos profesionales, home staging virtual, portales y redes, base de compradores, jornada de puertas abiertas), calendario de 90 días, informe semanal, quién es el agente y botones de WhatsApp y llamada. Parte del link de Idealista, Fotocasa u otro portal, o de las fotos y datos de la vivienda, y usa la marca del agente (colores, tipografía, logo, foto). Úsala siempre que el agente diga «landing para el propietario», «hazme una landing de esta casa», «web para captar esta vivienda», «propuesta de venta para el propietario», «presentación para el propietario», «plan de marketing de esta casa», «quiero conseguir la exclusiva de este piso», «página para enseñarle al dueño», «hazme algo para la visita de captación», «landing con este link de Idealista», «convierte este anuncio en una web», o pase un link de un portal pidiendo algo para el propietario.
---

# Landing para el propietario

Una página web que el agente envía (o enseña en la visita de captación) para que el propietario vea, con su propia
casa, lo bien que se va a presentar y cómo se va a vender. Una sola página, ligera, sin servidor, que se publica
gratis en un minuto.

## Archivos
| Archivo | Qué es |
|---|---|
| `plantilla/index.html` | La página (diseño, estilos y montaje). **No se edita por vivienda.** |
| `plantilla/datos.js` | Todo lo que cambia: marca, vivienda, textos. **Es lo único que se rellena.** |
| `plantilla/plano3d.css` | Estilos de la sección 3D (solo se usa si hay plano). |
| `ejemplo/` | Landing completa con datos **ficticios** (las «fotos» son ilustraciones). Abrir para ver el resultado. |
| `referencia/marca-primera-vez.md` | Preguntas de marca, paletas y tipografías para la primera vez. |
| `referencia/desde-un-portal.md` | Cómo sacar datos y fotos de un link de Idealista u otro portal. |
| `referencia/publicar.md` | Verla en el ordenador y publicarla gratis (Vercel o Netlify), paso a paso. |

## Paso 0 · La marca del agente (solo la primera vez)
Leer `~/.claude/mi-marca-inmobiliaria.md`.
- **Si existe**: usarlo tal cual y no volver a preguntar. Solo se cambia si el agente lo pide («cambia mis colores»,
  «nueva foto», «cambia la tipografía»).
- **Si no existe**: ejecutar el flujo de la skill **`mi-marca`** (está en esta misma colección) y seguir cuando el
  fichero exista. Si `mi-marca` no está instalada, seguir `referencia/marca-primera-vez.md`, que resume las tres vías
  (a mano, eligiendo entre 3 mockups o sacándola de su Instagram o web) y guarda el fichero con el mismo formato.

El campo `estilo` del fichero elige la variante visual de la página: `elegante` (por defecto), `moderno`,
`minimalista` o `calido`. Si trae otro valor, usar el más parecido de esos cuatro.

## Paso 1 · Datos de la vivienda
Con lo que dé el agente:
- **Link de un portal**: seguir `referencia/desde-un-portal.md` (datos, fotos y plano si lo hay).
- **Fotos + datos**: pedir las fotos (carpeta o arrastradas al chat) y lo básico: zona, m², dormitorios, baños,
  planta, extras, precio orientativo (opcional) y nombre del propietario.
Preguntar solo lo que falte, todo en un mensaje. Lo que no se sepa se deja vacío y no sale en la página.

> **Aviso sobre las fotos del portal**: suelen tener derechos del anunciante. Se usan **solo para enseñárselas al
> propietario** en esta propuesta privada (la página lleva `noindex`). Para los anuncios reales, fotos propias.
> Decírselo al agente cuando las uses.

## Paso 2 · Montar la carpeta
```
<carpeta de trabajo>/landing-<calle-o-zona>/
  index.html        ← copia de plantilla/index.html
  datos.js          ← copia de plantilla/datos.js, rellenada
  fotos/            ← 01.jpg, 02.jpg… (la más luminosa primero; ideal 1600-2000 px de ancho)
  marca/            ← logo y foto del agente copiados desde las rutas del fichero de marca
  (si hay plano) plano3d.css, plano3d.js, plano-data.js
```
- Fotos muy pesadas (más de 1 MB): reducirlas con `sips -Z 2000 foto.jpg` (Mac) antes de usarlas.
- El nombre de la carpeta no debe llevar datos del propietario si se va a publicar.

## Paso 3 · Plano 3D (solo si hay plano)
Usar la skill **`plano-3d`** (en esta misma colección) para trazar `plano-data.js`. Copiar a la carpeta
`plano-3d/motor/plano3d.js` y `plantilla/plano3d.css`, y poner `plano3d: true` en `datos.js`.
Añadir un pilar `{ icono: 'cubo', t: 'Plano en 3D', … }` al plan. **Sin plano, la landing queda completa solo con
fotos**: no inventar un plano.

## Paso 4 · Escribir los textos en `datos.js`
Tono: el campo `tono` de la marca. Hablarle al propietario de tú, con frases cortas y concretas sobre SU casa.
- **Titular**: la vivienda + una promesa clara. Ej.: «Tu piso en Ruzafa, presentado como se *merece*.»
- **Puntos fuertes** (3 o 6): lo que el comprador va a valorar (luz, estado, zona, distribución, extras), cada uno
  con el porqué.
- **Plan**: los pilares de la plantilla valen como base; adaptarlos a la casa (p. ej. home staging solo en las
  estancias vacías o anticuadas).
- **Anuncio en el móvil**: titular de portal, gancho para redes y un copy corto con llamada a la visita.
- **Calendario 30-60-90** e **informe semanal**: ajustar a cómo trabaja el agente. Las cifras del informe son
  ilustrativas y la página lo indica («Datos de ejemplo»).
- **Agente**: bio real. **Nunca inventar** años, ventas, valoraciones ni premios: si el agente no los da, `cifras: []`.
- **No prometer** precio de venta ni plazo garantizado. El precio, si va, es «orientativo».

## Paso 5 · Renders con IA (opcional)
Solo si el agente ya tiene su propia herramienta de IA para decorar fotos. Se añaden como fotos más en la galería
con el texto «Decoración virtual (orientativa)». La landing está pensada para quedar perfecta sin ellos.

## Paso 6 · Revisar (siempre, antes de entregarla)
Servir la carpeta (`npx serve <carpeta>`) y abrirla en el navegador integrado:
1. A tamaño de ordenador y a **375 px** de ancho: nada se sale por los lados (sin scroll horizontal), los textos se
   leen sobre la foto de portada y la barra de WhatsApp/Llamar aparece abajo en el móvil al bajar.
2. Galería: cada foto se abre en grande y se pasa con las flechas.
3. Si hay plano: la maqueta carga, se levantan las paredes y **Nórdico** y **Moderno** amueblan.
4. Botón de WhatsApp: abre `wa.me` con el número del agente y el mensaje. Botón de llamar: `tel:` correcto.
5. Consola sin errores. Ningún texto entre [corchetes] olvidado.
Luego explicar al agente cómo verla y publicarla (`referencia/publicar.md`) con palabras sencillas.

## Errores que no hay que repetir
- **Logo oscuro sobre la portada**: el menú va encima de la foto; usar la versión clara del logo (o sin logo, el nombre).
- **Colores de marca sin contraste**: `color_principal` debe ser oscuro y `color_secundario` claro. Si el agente los
  tiene al revés, la página corrige el color del texto, pero conviene proponer intercambiarlos.
- **Datos que no cuadran**: si los m² o los dormitorios del plano no coinciden con el anuncio, avisar al agente.
- **Datos personales en la URL**: el nombre del propietario va dentro de la página, nunca en el nombre del proyecto
  publicado.

## En la app de Claude (sin terminal)

Si no existe `~/.claude/mi-marca-inmobiliaria.md` (por ejemplo, en la app de Claude), busca un archivo `mi-marca-inmobiliaria.md` en el conocimiento del Proyecto o adjunto al chat y úsalo igual. Si tampoco está, lanza `mi-marca`. Entrega siempre el resultado como archivos para **descargar** (HTML, imágenes) y, para publicar, explica Netlify Drop: entrar en app.netlify.com/drop y arrastrar la carpeta. Si no puedes abrir un enlace de un portal, pide las fotos y que pegue el texto del anuncio.
