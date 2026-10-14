---
name: edificio-interactivo
description: Convierte la foto o el render de un edificio de obra nueva en una web interactiva para promotoras y compradores. Cada planta de la fachada se puede pulsar; al hacerlo, la foto se acerca con una animación y se abre la vivienda en una maqueta 3D que se amuebla en 6 estilos (nórdico, moderno, japandi, art déco, mediterráneo o sin amueblar), con precios, disponibilidad por puerta y fotos realistas de cada estilo. Acepta cualquier foto (real, render del promotor o generada con IA), cualquier plano (imagen, PDF, captura) y cualquier foto o render de interiores. Úsala siempre que el agente diga «edificio interactivo», «torre interactiva», «promoción de obra nueva», «web para una promotora», «presentación para una promotora», «que se pueda pulsar cada planta», «selector de plantas», «selector de viviendas», «fachada interactiva», «disponibilidad de la promoción», «enseñar la promoción en 3D», «amueblar las viviendas de la promoción», «captar una promotora», «comercializar una obra nueva», o cuando tenga la foto de un edificio y los planos de sus viviendas.
---

# Edificio interactivo · de la foto de la fachada a la promoción en 3D

Resultado: **una web de una sola carpeta** (sin servidor, se publica gratis) con:
1. **La foto del edificio a pantalla completa.** Al pasar el ratón por cada planta se ilumina, sale su ficha (tipología,
   m², precio desde, disponibilidad de cada puerta) y un botón colorea toda la fachada por disponibilidad.
2. **Una transición de cine al pulsar una planta**: la foto se acerca a esa planta, un haz de luz cruza la pantalla y
   se abre la vivienda.
3. **La vivienda en 3D** (maqueta con paredes a media altura que se levantan solas) con su panel: m², dormitorios,
   baños, terraza, precio de cada puerta, **6 estilos de muebles** que cambian muebles, suelo y paredes, y **fotos
   realistas del estilo elegido** a pantalla completa. Flechas ↑ ↓ para cambiar de planta, Esc para volver.

Es la mejor pieza para **captar una promotora**: se la enseñas con su edificio y entiende en 30 segundos cómo vas a
vender su promoción.

## Archivos
| Archivo | Qué es |
|---|---|
| `plantilla/index.html` · `app.js` · `motor3d.js` | La web y el motor 3D. **No se tocan por edificio.** |
| `plantilla/config.js` | Ficha del edificio: textos, colores, foto, plantas (dónde está cada una en la foto), puertas, precios, estados y fotos por estilo. |
| `plantilla/tipos.js` | Los planos de cada tipología de vivienda (mismo trazado que la skill `plano-3d`). |
| `scripts/detectar-plantas.py` | Encuentra las plantas en la foto y dibuja la comprobación. |
| `ejemplo/` | Edificio **ficticio** completo (torre de 22 plantas, 3 tipologías, ático con piscina, 11 fotos de estilo): `config.js`, `tipos.js`, `img/` e `index.html`. Ábrelo para ver el resultado y cópialo como punto de partida. |

## Qué necesito del agente
1. **La foto del edificio** (lo más grande posible): foto real, render del promotor, imagen del folleto o, si aún no
   hay nada, una generada con IA (prompts abajo). Mejor **de frente** y con las plantas bien marcadas.
2. **Los planos de las viviendas**: uno por tipología (A, B, ático…), en imagen o PDF, con alguna medida escrita.
   Si solo hay superficies, se trazan a mano en centímetros.
3. **Qué tipología hay en cada planta**, puertas por planta, precios y estado (disponible, reservada, vendida).
   Si es una demo, se inventan y se avisa en el pie («precios orientativos»).
4. Opcional: **fotos de interiores** (reales, renders o IA) de cada estilo que quiera enseñar, y la **marca**
   (`~/.claude/mi-marca-inmobiliaria.md`) para el color de acento.

## Flujo (1-2 horas con 2-3 tipologías)

### 1 · Carpeta
Crear la carpeta del proyecto (sin datos personales en el nombre) y copiar: `ejemplo/index.html`,
`plantilla/app.js`, `plantilla/motor3d.js`, `plantilla/config.js`, `plantilla/tipos.js` y una carpeta `img/`.
En el `index.html` copiado, cambiar `../plantilla/motor3d.js` y `../plantilla/app.js` por `motor3d.js` y `app.js`.

### 2 · La foto del edificio
- Guardarla como `img/edificio.jpg` a unos **1800 px de ancho** (más pesa mucho; menos se ve borrosa al acercar) y
  una copia pequeña, `img/edificio-fondo.jpg` (600 px), para el fondo desenfocado. Anotar ancho y alto en `foto`.
- **Si hay que generarla con IA** (Nano Banana, ChatGPT, Midjourney, Higgsfield…), formato vertical 3:4 y este
  prompt, cambiando ciudad, altura y materiales:
  > Hyper-realistic architectural photograph of a brand new residential building of [N] floors in [ciudad y zona],
  > surrounded by the real local architecture. Shot from a distant elevated viewpoint, centered, perfectly frontal
  > facade with tilt-shift corrected vertical lines, the full height from ground to roof visible. Each floor clearly
  > marked by slab edges and balconies, regular rhythm. [Golden hour / blue hour with warm lights inside]. Magazine
  > quality, photorealistic. No text, no logos.

  Pedir 2-3 variantes y elegir la que mejor marque las plantas. Si es una promoción real, avisar de que es una
  **recreación** y no usarla en publicidad sin el visto bueno del promotor.

### 3 · Encontrar las plantas
Mirar la foto con `Read` y anotar los bordes izquierdo y derecho de la fachada (`x0`, `x1`) y, aproximadamente,
dónde empiezan y acaban las viviendas (`--arriba`, `--abajo`). Después:
```bash
python3 scripts/detectar-plantas.py img/edificio.jpg --x0 650 --x1 1147 --arriba 400 --abajo 2085
```
Crea `edificio-plantas.jpg` (rectángulos numerados) y `plantas.json`. **Mirar siempre la imagen**: cada rectángulo
debe ir de un forjado al siguiente. Si se salta plantas, repetir con `--separacion <px>` (alto de una planta).
- **Foto en perspectiva** o plantas que no se distinguen: usar las 4 esquinas de la zona de viviendas y el número de
  plantas: `--esquinas 640,210 1150,215 660,2080 1140,2075 --num 12` (sale `poly` en vez de `y1`/`y2`).
- Quitar las bandas que no son viviendas (bajos comerciales, coronación) o dejar el ático como planta propia, como en
  el ejemplo. Pegar el resultado en `config.js` → `plantas`, de abajo arriba, con `nombre`, `tipo` y `puertas`.
- Sin Python (app de Claude): medir a ojo sobre la foto con `Read`, o pedir al agente que marque dos forjados.

### 4 · Trazar las tipologías (`tipos.js`)
Cada tipología se traza **igual que en la skill `plano-3d`** (léela si está instalada; si no, el ejemplo
`ejemplo/tipos.js` tiene tres viviendas completas como guía):
- `px` = píxeles del plano por metro (con una medida escrita: píxeles ÷ metros). Trazando a mano en centímetros, `px: 100`.
- `paredes` dejando los huecos de las puertas · `ventanas` · `suelos` (`madera`, `baldosa`, `gres`, `exterior`) ·
  `etiquetas` con los m² (destacar la estancia que más vende) · `muebles`.
- **Novedades de esta skill**: `barandillas` (borde de terrazas, cristal bajo), suelo `exterior` y los muebles
  `isla {w}` (isla de cocina con taburetes), `piscina {w,d}`, `tumbona` y `sillon`.
- Catálogo completo: `sofa {w}` · `sillon` · `mesaCentro` · `alfombra {w,d}` · `muebleTV {w}` · `lamparaPie` ·
  `planta {h}` · `comedor` · `aparador {w}` · `cocinaLineal {w}` · `isla {w}` · `ducha {w,d}` · `lavabo {w}` ·
  `inodoro` · `banera {w,d}` · `cama {w,l}` · `mesilla` · `escritorio {w}` · `armario {w}` · `piscina {w,d}` · `tumbona`.
- Giro: **0 = el frente mira hacia abajo del plano, 90 = derecha, -90 = izquierda, 180 = arriba**. La espalda del
  mueble va contra la pared; posición = cara interior de la pared ± la mitad del fondo del mueble.
- En `window.TIPOS` cada tipología lleva `nombre`, `sub` (dormitorios y baños), `m2`, `terraza`, `dorm`, `banos`,
  `extra` (orientación, vistas) y `data`. Los m² y dormitorios **deben cuadrar con la memoria de calidades o el
  folleto**; si no cuadran, avisar al agente.

### 5 · Fotos por estilo (opcional pero es lo que más impresiona)
- Reales o renders del promotor: una o dos por estilo en `fotos`. Si solo hay un estilo, poner
  `estilos: ['vacio', 'nordico']` (o el que sea) para no ofrecer estilos sin foto.
- Con IA, 16:9, un salón y un dormitorio por estilo (10 imágenes para los 5 estilos):
  > Hyper-realistic interior photograph, real estate magazine quality, 20mm lens at eye level, natural light.
  > [Living and dining room | Master bedroom] of a new apartment in [ciudad], floor-to-ceiling windows with a view
  > over [vistas reales]. [ESTILO]. No text, no logos, no people.

  Estilos: **nórdico** «light oak floor, white walls, linen sofa, sage and mustard cushions, wool rug, paper lamp,
  plants» · **moderno** «dark walnut, charcoal sofa, cognac leather armchair, black and brass details, stone coffee
  table» · **japandi** «natural ash wood, beige and greige, low linen sofa, rice paper lamps, minimal ceramics» ·
  **art déco** «marble, emerald velvet curved sofa, polished brass, fluted walnut, geometric parquet, chandelier» ·
  **mediterráneo** «white lime walls, terracotta floor, linen sofa, rattan furniture, olive tree in a pot».
- Guardarlas a 1600-2400 px de ancho en JPG (≈ 300-450 KB cada una). Marcar siempre que son **orientativas**.

### 6 · Textos, marca y cifras
En `config.js`: `nombre`, `titulo` (con `<em>` para la palabra en color), `antetitulo`, `texto`, `cifras` (3-4
números grandes), `pie` (aviso legal o «datos orientativos») y `colores.acento` (el color principal de la marca
del agente o de la promotora; la web es oscura, así que mejor un tono claro o metálico).

### 7 · Revisar (siempre, antes de enseñarlo)
Abrir la web con un servidor local (`python3 -m http.server` dentro de la carpeta y abrir `http://localhost:8000`)
a 1440×900 y en móvil:
1. La entrada anima y las cifras cuentan. Al pasar el ratón, **cada planta ilumina su franja exacta** de la fachada.
2. Pulsar la planta más baja, una intermedia y la última: se acerca a la planta correcta y abre su tipología.
3. En cada tipología: pulsar todos los estilos y la vista «A ras de suelo». Ningún mueble atraviesa paredes, tapa
   puertas o mira a la pared. Las etiquetas no se pisan.
4. Abrir las fotos, cambiar de planta con ↑ ↓ y volver con «← Edificio».
5. Precios, estados y m² cuadran con lo que ha dado el agente. Sin datos personales de compradores.

### 8 · Publicar
La carpeta entera es la web. Gratis: **Netlify Drop** (app.netlify.com/drop, arrastrar la carpeta) o **Vercel**
(`vercel deploy --prod` dentro de la carpeta). Mandar el enlace y recomendar abrirlo en ordenador a pantalla
completa para la reunión con la promotora.

## Errores que ya cometimos (no repetir)
- **Toda animación limitada a [0, 1]**: si no, los muebles crecen sin parar.
- **El cierre de la foto a pantalla completa no debe tragarse clics**: la capa lleva `pointer-events:none` cuando no
  está abierta (ya en la plantilla).
- **Foto torcida = plantas descuadradas**: con verticales inclinadas usar el modo `--esquinas` o pedir otra foto.
- **La foto en vertical no debe pisar el panel** en pantallas estrechas (ya resuelto en el CSS de la plantilla).
- **Caché**: al cambiar `config.js` o `tipos.js` en una web ya publicada, subir el `?v=N` de los `<script>`.
- Muebles **por debajo de 1,15 m** (altura de corte de las paredes) para que no sobresalgan.

## En la app de Claude (sin terminal)
Si no existe `~/.claude/mi-marca-inmobiliaria.md`, buscar `mi-marca-inmobiliaria.md` en el conocimiento del
Proyecto; si no está, usar el acento dorado del ejemplo. Si no se puede ejecutar Python, medir las plantas a ojo
sobre la foto. Entregar la carpeta completa como ZIP para descargar y explicar Netlify Drop.
