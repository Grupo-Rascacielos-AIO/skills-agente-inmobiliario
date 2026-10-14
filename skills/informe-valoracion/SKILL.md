---
name: informe-valoracion
description: Úsala cuando un agente inmobiliario quiera valorar una vivienda con testigos (comparables) y entregar al propietario un informe de precio con su marca. Calcula €/m² medio, mediana y rango, homogeneiza los testigos con coeficientes explicados, descarta atípicos y saca precio de salida, objetivo de cierre y mínimo; genera un informe HTML imprimible a PDF con portada, ficha, mapa de testigos, gráfico, cálculo paso a paso, riesgo de sobrevalorar, estrategia de venta y siguiente paso. Disparadores - «informe de valoración», «valora este piso», «valoración de mercado», «estudio de mercado», «ACM», «análisis comparativo», «testigos», «comparables», «a cuánto lo pongo», «qué precio le pongo», «informe de precio para el propietario», «el propietario quiere más», «prepárame la valoración para la visita».
---

# Informe de valoración

Convierte los datos de una vivienda y sus **testigos** (comparables de Idealista, Fotocasa, ventas propias o notas) en un informe que el agente enseña al propietario: tres precios claros, el cálculo a la vista y un plan de venta. Con la marca del agente.

**Esto es una estimación orientativa de mercado, no una tasación oficial (ECO/805/2003).** Este aviso va siempre visible en el informe. Nunca lo llames «tasación».

Archivos de la skill:
- [plantilla/informe.html](plantilla/informe.html): el informe completo. Solo se rellena su bloque JSON; los números los calcula la propia página.
- [calculo.md](calculo.md): el método (testigos, coeficientes, atípicos, tres precios). **Léelo antes de calcular.**
- [ejemplo/](ejemplo/): un informe terminado con datos ficticios (`informe-valoracion-ejemplo.html`), sus datos (`datos-ejemplo.json`) y los testigos en CSV (`testigos-ejemplo.csv`).

## Paso 0: la marca

1. Lee `~/.claude/mi-marca-inmobiliaria.md`. Usa `nombre`, `agencia`, `telefono`, `whatsapp`, `email`, `zona`, `color_principal`, `color_secundario`, `color_acento`, `tipografia_titulos`, `tipografia_texto`, `logo`, `foto` y `tono` (y `estilo` o `referencias` si existen, como guía de redacción).
2. Si no existe, **lanza la skill `mi-marca`** («Antes del informe, configuremos tu marca: son dos minutos y el informe saldrá con tu nombre y tus colores»). Ofrece sus tres vías: colores a mano, elegir entre 3 muestras, o sacarlos de su Instagram o web.
3. Si el agente no tiene esa skill o dice «ahora no», pide lo mínimo en un solo mensaje: **nombre, agencia, teléfono, email y un color** (o una de estas paletas: azul `#1F3A5F` / `#F4F1EA` / `#C8A96A`, verde `#1F3D36` / `#EEF0EB` / `#C99A2E`, negro `#141414` / `#F7F5F0` / `#B08D57`). Tipografías por defecto: Newsreader + Hanken Grotesk. Nunca inventes sus datos de contacto.

Colores y fuentes van por variables CSS (`--c-principal`, `--c-secundario`, `--c-acento`, `--f-titulos`, `--f-texto`) que la plantilla rellena desde el JSON. El color principal debe ser oscuro (los textos sobre él van en blanco); si el agente tiene un principal claro, úsalo de acento y propón un oscuro de su gama.

## Paso 1: los datos (pregunta solo lo que falte)

**La vivienda**: dirección y barrio, ciudad, m² construidos y útiles, habitaciones, baños, planta y nº de plantas del edificio, ascensor, exterior/interior, orientación, estado, año, extras (terraza, garaje, trastero, piscina, aire…), nombre del propietario y fotos (opcional). Si el agente ya lo ha dado, no repreguntes.

**Los testigos**: el agente pega anuncios, notas o un CSV. Normalízalos a una tabla (ver [calculo.md](calculo.md), apartado 1) y **enséñasela para que la confirme** antes de calcular. Pide distancia aproximada y dirección para el mapa; si no las sabe, estímalas por la dirección y dilo, o deja el mapa sin esos testigos.

**Su conocimiento de la zona**: 3-4 datos concretos para la página de zona (colegio, metro, mercado, parque, a cuántos minutos). Si no los da, pregunta; no los inventes.

## Paso 2: el cálculo

Sigue [calculo.md](calculo.md):
1. Asigna los coeficientes de cada testigo con la tabla orientativa y escribe en `nota` la diferencia principal («Terraza de 12 m² y garaje incluido»).
2. Antes de generar, enseña al agente en el chat un resumen corto: €/m² en bruto (media, mediana, rango), qué testigos se descartan y por qué, €/m² final y los tres precios. Puedes adelantarlos con la misma fórmula que usa la plantilla; si el agente corrige un coeficiente, cámbialo.
3. Si hay menos de 4 testigos válidos, avisa: la valoración es débil.

## Paso 3: generar el informe

1. Copia `plantilla/informe.html` en la carpeta de trabajo del agente como `informe-valoracion-<calle>-<numero>.html`.
2. Sustituye **solo** el contenido de `<script type="application/json" id="datos">` por el JSON completo (misma estructura que `ejemplo/datos-ejemplo.json`): `marca`, `informe`, `vivienda`, `zona`, `testigos`, `parametros`, `textos`.
3. En los textos usa los marcadores y la página pone las cifras exactas: `{salida}`, `{cierre}`, `{minimo}`, `{valor_m2}`, `{n_testigos}`, `{n_validos}`, `{dias_vendidos}`, `{m2}`. Así nunca hay un número distinto entre el resumen y el cálculo.
4. Fotos, logo y foto del agente: ruta absoluta local o URL. Sin foto de portada, la portada dibuja el edificio y marca su planta. Sin `imagen_mapa`, se dibuja el mapa de testigos alrededor de la vivienda (sin APIs ni servicios de pago). Si el agente tiene una captura de mapa propia, ponla en `zona.imagen_mapa`.
5. Ábrelo (`open archivo.html` en Mac, `start archivo.html` en Windows) y revisa: que se vean las 7 páginas, los tres precios y el aviso legal.

### Los textos (en el tono de la marca)

- `resumen`: una sola frase para el propietario con el valor y el precio de salida.
- `explica_salida`, `explica_cierre`, `explica_minimo`: una línea cada uno, sin tecnicismos.
- `riesgo_intro` + 3 `escenarios` (precio recomendado, +8 %, +15 %) con plazo estimado y `calor` (0 a 1 = interés de compradores).
- `dato_real`: el testigo de la zona que salió caro y sigue sin venderse, o los días medios de los vendidos. Es lo que más convence.
- `estrategia`: 4-6 pasos con cuándo, qué y una revisión de precio pactada (día 30).
- `siguiente`: dos opciones: firmar el encargo y una reunión para dudas.
- Tono `cercano` tutea y es directo; `profesional` claro y con datos; `premium` sobrio, sin urgencias. Nunca prometas un precio ni un plazo exactos.

## Paso 4: PDF

Dile al agente: «Abre el informe en Chrome, pulsa **Guardar en PDF** (arriba a la derecha) o Cmd/Ctrl + P, elige **Guardar como PDF**, tamaño **A4**, márgenes **Predeterminados** y activa **Gráficos de fondo**». Sale un PDF de unas 10-11 páginas listo para enviar por WhatsApp o email. En Safari funciona igual, pero Chrome respeta mejor los colores.

## Reglas

- **Nada inventado**: ni testigos, ni datos de la vivienda, ni testimonios, ni datos de contacto. Si falta algo, pregunta o deja el campo vacío (la plantilla oculta lo vacío).
- **Nunca «tasación»**: es una estimación de mercado. El aviso ECO/805/2003 no se quita.
- Datos personales: el informe lleva el nombre del propietario; no lo publiques en ninguna web.
- No cambies el motor de cálculo para cuadrar un precio que quiere el propietario. Si el agente quiere fijar un precio, usa `precio_salida` en `parametros` y que el texto lo justifique.

## Errores comunes

- Mezclar m² útiles y construidos entre testigos → el €/m² sale falso.
- Poner coeficientes al revés (testigo reformado con 1,08) → recuerda: testigo mejor = menor que 1.
- Usar solo anuncios: el precio pedido no es precio de venta. Busca al menos 2 vendidos.
- Escribir cifras a mano en los textos en lugar de `{salida}` → acaban sin cuadrar.
- Imprimir sin «Gráficos de fondo» → la portada y los precios salen en blanco.

## En la app de Claude (sin terminal)

Si no existe `~/.claude/mi-marca-inmobiliaria.md` (por ejemplo, en la app de Claude), busca un archivo `mi-marca-inmobiliaria.md` en el conocimiento del Proyecto o adjunto al chat y úsalo igual. Si tampoco está, lanza `mi-marca`. Entrega siempre el resultado como archivos para **descargar** (HTML, imágenes) y, para publicar, explica Netlify Drop: entrar en app.netlify.com/drop y arrastrar la carpeta. Si no puedes abrir un enlace de un portal, pide las fotos y que pegue el texto del anuncio.
