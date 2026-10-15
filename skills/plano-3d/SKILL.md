---
name: plano-3d
description: Convierte el plano 2D de una vivienda (foto, PDF, captura de un portal como Idealista o Fotocasa, plano de Matterport o de catastro) en una maqueta 3D interactiva para web, con paredes que se levantan, suelos de madera, baldosa y gres, etiquetas con los m² de cada estancia y un botón para amueblarla en estilo nórdico o moderno. Úsala siempre que el agente diga «plano 3D», «pasa el plano a 3D», «hazme el plano en 3D», «maqueta 3D», «maqueta de la casa», «distribución en 3D», «amuebla el plano», «decoración virtual del plano», «home staging del plano», «quiero que el comprador vea la casa en 3D», «pon el plano en la web», «plano interactivo», «vista 3D del piso», o cuando una landing, ficha, dossier o presentación de un inmueble tenga plano y se pueda enseñar en 3D. Solo hace la maqueta (una sección HTML que se pega en cualquier página); la landing completa para el propietario la hace la skill landing-propietario.
---

# Plano 3D · del plano plano a una maqueta que se puede girar

Resultado: una sección web con la vivienda en 3D vista como una maqueta de arquitecto (paredes cortadas a media
altura), que gira sola, se acerca con la rueda o con dos dedos y se amuebla con un toque (nórdico o moderno).
Funciona en ordenador y en móvil, sin instalar nada y sin pagar nada: usa three.js desde un CDN con versión fija.

> **¿Un edificio de obra nueva con varias viviendas?** Usa la skill `edificio-interactivo`: la fachada con cada planta clicable, varias tipologías y 6 estilos de muebles (nórdico, moderno, japandi, art déco, mediterráneo) con su mismo formato de trazado. Su motor (`plantilla/motor3d.js`) sirve también para una casa suelta si quieres esos estilos o la piscina, la isla de cocina o las tumbonas.

## Archivos
| Archivo | Qué es |
|---|---|
| `motor/plano3d.js` | El motor. **No se toca por vivienda.** |
| `plantilla/seccion.html` | CSS + HTML de la sección + los `<script>` en orden. Se pega en la página. |
| `plantilla/plano-data.js` | Ficha vacía para trazar una vivienda nueva. |
| `ejemplo/` | Piso **ficticio** de 65 m²: `plano.svg` (el plano 2D), `plano-data.js` (el trazado) e `index.html` (la maqueta funcionando). |
| `herramientas/comprobar-trazado.html` | Pinta lo trazado encima del plano para ver si cuadra, y dice las coordenadas de cualquier punto al hacer clic. |

## Qué necesito del agente
1. **El plano**, lo más grande y nítido posible (imagen o PDF). Si solo tiene el link del portal, abrirlo con el
   navegador integrado y buscar la imagen del plano. Si el anuncio no tiene plano: pedírselo al propietario
   (escrituras, plano de obra, catastro) o hacer la landing solo con fotos.
2. **Una medida real** de alguna estancia (viene escrita en muchos planos: «Salón 5,20 × 4,00»). Si no hay ninguna,
   usar una puerta (≈ 0,80 m de hueco) o la superficie total del anuncio.
3. Opcional: la **marca** del agente (`~/.claude/mi-marca-inmobiliaria.md`) para que la sección use sus colores.

## Flujo (20-30 minutos por vivienda)

### 1 · Preparar la carpeta
Crear una carpeta para la vivienda (o usar la de la landing) y copiar dentro:
`motor/plano3d.js`, `plantilla/plano-data.js` y la imagen del plano (`plano.jpg` o `plano.png`).
Mirar el plano a tamaño completo con `Read` antes de trazar. Anotar su ancho y alto en píxeles
(`sips -g pixelWidth -g pixelHeight plano.jpg` en Mac, o `file plano.png`).

### 2 · Calibrar la escala
- Elegir una estancia con medida escrita, medir su ancho interior **en píxeles** y dividir:
  `px = píxeles ÷ metros`. Ejemplo: el salón mide 5,20 m y ocupa 520 px → `px: 100`.
- `cx`, `cz` = centro aproximado del dibujo en píxeles (la mitad del ancho y del alto de la zona con paredes).
- Comprobación rápida: ancho total en píxeles ÷ `px` ≈ ancho real de la vivienda. Si da 30 m para un piso, algo falla.

### 3 · Trazar en `plano-data.js` (todo en píxeles del plano: x a la derecha, y hacia abajo)
- **`paredes`**: rectángulos `[x1, y1, x2, y2]` sobre el grosor negro de cada muro. **Dejar los huecos de las
  puertas** (las líneas finas y los arcos son puertas, no muro). Un muro con una puerta = dos rectángulos.
- **`ventanas`**: los tramos de muro exterior que son ventana. Ese tramo NO va también en `paredes`.
- **`suelos`**: un rectángulo por estancia con `'madera'`, `'baldosa'` (cocina, galería, terraza) o `'gres'`
  (baños). Una estancia en L = dos rectángulos.
- **`etiquetas`**: `[nombre, 'm²', x, y, destacada]`. Destacar (`true`) solo la estancia que más vende.
- **`muebles`**: `[tipo, x, y, giro, {opciones}]`. Giro en grados: **0 = el frente mira hacia abajo del plano,
  90 = derecha, -90 = izquierda, 180 = arriba**. Camas, sofás, armarios, cocina y muebles de TV apoyan la espalda
  en la pared contraria a la que miran.
- Opcional: `estiloInicial: 'nordico'` (se amuebla sola al verla) y `colores: { pared, base, canto }`.

**Catálogo de muebles** (medidas reales en metros):
`sofa {w}` · `mesaCentro` · `alfombra {w,d}` · `muebleTV {w}` · `lamparaPie` · `planta {h}` · `comedor` (mesa de
1,6 m y 4 sillas) · `aparador {w}` · `cocinaLineal {w}` (placa, fregadero y columna de nevera) · `ducha {w,d}` ·
`lavabo {w}` · `inodoro` · `banera {w,d}` · `cama {w,l}` (1,6 = matrimonio; 0,9 = individual) · `mesilla` ·
`escritorio {w}` (con silla) · `armario {w}`.
Para colocar una pieza junto a una pared: posición = cara interior de la pared ± la mitad del fondo del mueble
(sofá 0,95 m · cama = largo `l` · armario 0,6 · cocina 0,62 · mueble TV 0,42 · lavabo 0,46), pasado a píxeles con `px`.

### 4 · Comprobar el trazado (siempre)
Servir la carpeta en local y abrir la herramienta con el plano y los datos de la vivienda:
```
npx serve <carpeta-de-la-skill>        # o la carpeta donde estén las tres cosas
http://localhost:3000/herramientas/comprobar-trazado.html?plano=<ruta al plano>&datos=<ruta a plano-data.js>
```
Rojo = paredes, azul = ventanas, verde = suelos, naranja = muebles con una flecha hacia donde miran.
Todo lo rojo tiene que caer encima de los muros negros, y ninguna flecha naranja debe apuntar a una pared.
Hacer clic en el plano da las coordenadas exactas de ese punto: así se corrigen los rectángulos que no cuadran.

### 5 · Montar la sección
Pegar `plantilla/seccion.html` en la página: el `<style>` en el `<head>`, la `<section>` donde vaya, y los
`<script>` antes de `</body>` **en el mismo orden**. Si la página define `--color-principal`, `--color-secundario`,
`--color-acento`, `--font-titulos` y `--font-texto` (los colores de la marca del agente), la sección los usa.
Un solo plano por página (el contenedor es `#maqueta`).

### 6 · Revisar en el navegador (antes de enseñárselo a nadie)
Abrir la página servida en local a tamaño de ordenador y a 375 px de ancho:
1. Bajar hasta la maqueta: las paredes se levantan y aparecen las etiquetas.
2. Pulsar **Nórdico** y **Moderno**; mirar **Desde arriba** y **A ras de suelo**: ningún mueble atraviesa una pared,
   tapa una puerta o mira a la pared.
3. Consola sin errores.
4. **Los m² y los dormitorios del plano tienen que cuadrar con el anuncio.** Si no cuadran, avisar al agente antes
   de publicar (a veces el plano del portal es de otra planta o de otra vivienda).

## Errores que ya se han cometido (no repetir)
- **Paredes a altura real (2,5 m) tapan el interior.** Se dejan a 1,15 m con canto oscuro (`alturaCorte`).
- **Muebles más altos que el corte** sobresalen de la maqueta: el armario ya se ajusta solo; no subir `alturaCorte` de 1,3.
- **Giro con el signo cambiado** = camas y sofás mirando a la pared. Comprobar siempre con las flechas de la herramienta.
- **Paredes encima de las ventanas**: un tramo es pared o ventana, nunca las dos cosas.
- **Caché**: al cambiar `plano-data.js` o el motor ya publicados, subir el número de `?v=1` en los `<script>`.
- **La rueda del ratón no hace zoom hasta hacer clic en la maqueta** (a propósito, para no bloquear el scroll de la página).

## Ideas para más adelante
Puertas con su arco · más estilos (industrial, mediterráneo) · vídeo de 10 s girando para redes.

## En la app de Claude (sin terminal)

Si no existe `~/.claude/mi-marca-inmobiliaria.md` (por ejemplo, en la app de Claude), busca un archivo `mi-marca-inmobiliaria.md` en el conocimiento del Proyecto o adjunto al chat y úsalo igual. Si tampoco está, lanza `mi-marca`. Entrega siempre el resultado como archivos para **descargar** (HTML, imágenes) y, para publicar, explica Netlify Drop: entrar en app.netlify.com/drop y arrastrar la carpeta. Si no puedes abrir un enlace de un portal, pide las fotos y que pegue el texto del anuncio.
