---
name: mi-marca
description: Úsala cuando el agente inmobiliario quiera configurar, ver o cambiar su marca personal, o cuando otra skill necesite su marca y no exista ~/.claude/mi-marca-inmobiliaria.md. Disparadores - «configura mi marca», «mi marca», «es la primera vez», «empezamos», «mis colores», «cambia mis colores», «cambia mi tipografía», «cambia mi estilo», «cambia mi tono», «actualiza mis datos», «pon mi logo», «pon mi foto», «qué paleta me pega», «no sé qué colores usar», «enséñame opciones de diseño», «saca mi marca de mi Instagram», «copia el estilo de mi web», «enséñame mi marca», «branding», «identidad visual», «mi agencia», «mis datos de contacto».
---

# Mi marca

Configura **una sola vez** la marca personal del agente y la guarda en `~/.claude/mi-marca-inmobiliaria.md`. A partir de ahí, **todas** las skills de este repositorio leen ese archivo y todo sale con su nombre, sus colores, su tipografía, su estilo y su tono. Sin él, todo sale genérico.

Las demás skills, si no encuentran el archivo, lanzan este mismo flujo antes de empezar.

## Cuándo usarla

- Primera vez que el agente usa las skills (o el archivo no existe).
- Quiere cambiar algo: «cambia mis colores», «ahora trabajo en otra zona», «pon mi nuevo logo».
- Quiere ver cómo queda su marca: «enséñame mi marca».

**No la uses** para escribir textos (eso es `copywriter-inmobiliario`) ni para hacer una landing completa (`landing-propietario`).

## El archivo (formato EXACTO, no lo cambies)

Ruta: `~/.claude/mi-marca-inmobiliaria.md`. Otras skills lo leen campo a campo, así que respeta nombres, orden y comillas:

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

- Colores siempre en hex de 6 cifras y entre comillas: `"#1F3A5F"`.
- `logo` y `foto`: ruta absoluta a un archivo local (`/Users/ana/marca/logo.png`) o URL pública. Vacío si no tiene.
- `tono`: uno de `cercano`, `profesional` o `premium`.
- `estilo`: empieza SIEMPRE por una palabra clave que leen las plantillas (`elegante`, `moderno`, `minimalista` o `calido`), seguida de una frase. Ej.: `elegante — editorial, serifas grandes, mucho blanco, fotos protagonistas`. Equivalencias de los mockups: editorial → `elegante`, moderno minimal → `moderno`, cálido cercano → `calido`.
- `referencias` (opcional): de dónde salió la marca (su web, su Instagram, el mockup elegido). Ej.: `https://www.ejemplo.com, @usuario`.
- `whatsapp`: con prefijo internacional y sin espacios (`+34600111222`).
- Si un dato no lo tiene, déjalo vacío. Nunca inventes datos.

## Flujo: primera vez

1. **Comprueba** si existe el archivo (`cat ~/.claude/mi-marca-inmobiliaria.md`). Si existe, enséñale un resumen y pregunta qué quiere cambiar.
2. **Datos básicos**, en un mensaje corto: nombre, agencia (o «independiente»), zona donde trabaja, teléfono, WhatsApp (¿es el mismo?) y email. ¿Tiene logo? ¿Una foto profesional suya?
3. **Imagen de marca: ofrece las tres vías** y que elija:

   > Para tu imagen tenemos tres caminos, el que te resulte más cómodo:
   > **A)** Me dices tus colores y tu tipografía (si ya los tienes).
   > **B)** Te preparo 3 diseños de muestra con estilos distintos, los abres en el navegador y eliges el que más te guste.
   > **C)** Me pasas tu Instagram o tu web (o unas capturas) y saco de ahí tus colores, tu tipografía y tu tono.

4. **Tono** (si no ha salido ya en la vía C): cercano, profesional o premium.
5. **Resume** todo en una tabla y pide un «sí».
6. **Guarda** el archivo con el formato exacto.
7. **Genera la muestra** final de su marca (ver abajo) y ábrela.
8. Cierra con: «Listo. A partir de ahora todo lo que te prepare sale con tu marca».

Tono amable y sin tecnicismos: el agente no es técnico. Si pregunta qué es un «hex», explícale que es el código del color y que tú te encargas.

### Vía A — Me das tus colores y tipografía

- Acepta lo que traiga: códigos hex, nombres («azul marino y dorado»), un archivo del manual de marca o el logo. Si da nombres, conviértelos a hex y enséñaselos.
- Necesitas 3 colores (principal, secundario, acento) y 2 tipografías (títulos y texto). Si le falta algo, complétalo con las tablas de abajo y díselo.
- Si su tipografía no está en Google Fonts, propón la más parecida que sí esté.
- `estilo`: deduce uno de la tabla de estilos y confírmalo con él.

### Vía B — 3 diseños de muestra para elegir

1. Pregunta solo una cosa antes: «¿Qué tipo de inmuebles trabajas más: barrio y primera vivienda, obra nueva y familias, o alto standing?». Sirve para ajustar los tres estilos.
2. Genera **3 archivos** en `./mi-marca-opciones/` a partir de [plantilla-muestra.html](plantilla-muestra.html), uno por estilo de la tabla siguiente (cambia los 3 que mejor encajen si trabaja un nicho muy concreto): `opcion-1-editorial.html`, `opcion-2-moderno.html`, `opcion-3-calido.html`. Usa su nombre, su agencia y su zona, no datos de ejemplo.
3. Ábrelos (`open` en Mac, `start` en Windows) y pide que elija por número. Acepta mezclas: «el 2 pero con los colores del 3».
4. Del elegido salen `color_*`, `tipografia_*`, `estilo` y `referencias: mockup opción N`.

| Estilo | Paleta (principal · secundario · acento) | Tipografías | Para quién |
|---|---|---|---|
| **Editorial elegante** — serifas grandes, mucho blanco, fotos protagonistas | `#141414` · `#F7F5F0` · `#B08D57` | Playfair Display + Inter | Alto standing, obra nueva premium |
| **Moderno minimal** — sans serif, líneas limpias, bloques de color | `#2B2D42` · `#EDF2F4` · `#EF6F3C` | Montserrat + Open Sans | Agente joven, digital, ciudad |
| **Cálido cercano** — tonos tierra, esquinas redondeadas, fotos de barrio | `#2F5D50` · `#F5F3EE` · `#E07A5F` | DM Serif Display + DM Sans | Barrio, familias, primera vivienda |

### Vía C — Desde su Instagram, su web o capturas

1. **Web**: descárgala (herramienta de lectura web o `curl`) y busca en el HTML y el CSS los colores (`color`, `background`, variables `--`), las fuentes (`font-family`, enlaces a Google Fonts) y el logo.
2. **Instagram**: suele bloquear la lectura automática. Pide **2-3 capturas** de su perfil y de sus publicaciones (arrastrarlas al chat basta). Mira las imágenes y extrae los colores dominantes como hex aproximado.
3. **Tono**: lee 3-5 textos suyos (bio, publicaciones, «sobre mí») y clasifícalo como cercano, profesional o premium. Enséñale una frase suya como ejemplo de por qué.
4. Si los colores que salen son muchos o poco coherentes, quédate con los 3 más repetidos y propón el reparto (principal, secundario, acento).
5. Enséñale lo extraído en una tabla y la muestra HTML **antes** de guardar. `referencias:` con la URL o el usuario de Instagram.

## Tablas de apoyo (si falta algo o no sabe)

**5 paletas para el sector**

| # | Nombre | Principal | Secundario | Acento | Transmite |
|---|---|---|---|---|---|
| 1 | Azul confianza | `#1F3A5F` | `#F4F1EA` | `#C8A96A` | Seriedad, solvencia, clásico que no falla |
| 2 | Verde hogar | `#2F5D50` | `#F5F3EE` | `#E07A5F` | Calidez, barrio, familias |
| 3 | Negro premium | `#141414` | `#F7F5F0` | `#B08D57` | Lujo, obra nueva, inmuebles de alto valor |
| 4 | Terracota mediterráneo | `#B5532F` | `#FAF6F0` | `#2E4A62` | Costa, luz, segunda residencia |
| 5 | Grafito moderno | `#2B2D42` | `#EDF2F4` | `#EF6F3C` | Joven, digital, rápido |

Regla: el **principal** para titulares y fondos fuertes, el **secundario** para fondos claros y el **acento** solo para botones y detalles (poco).

**5 combinaciones tipográficas (Google Fonts, gratis)**

| # | Títulos | Texto | Sensación |
|---|---|---|---|
| 1 | Playfair Display | Inter | Elegante y muy legible |
| 2 | Montserrat | Open Sans | Moderna y neutra |
| 3 | DM Serif Display | DM Sans | Premium pero cercana |
| 4 | Poppins | Lato | Amable, redes sociales |
| 5 | Cormorant Garamond | Manrope | Lujo, alto standing |

**Tono**

- **cercano**: tutea, frases cortas, habla de «tu casa», alguna expresión coloquial. Ideal para barrio y primera vivienda.
- **profesional**: tutea o usa usted según el cliente, datos y proceso claros, sin coloquialismos. El más versátil.
- **premium**: frases cuidadas, menos palabras, cero urgencia, foco en exclusividad y discreción. Alto standing.

Si duda, recomienda **profesional**.

## «Cambia mis colores» (y otros cambios)

1. Lee el archivo actual.
2. Cambia **solo** los campos que pide. No toques el resto.
3. Si pide «algo más moderno» o similar sin dar colores, ofrécele la vía B con 3 alternativas.
4. Guarda y regenera la muestra.

## Muestra HTML de la marca

Genera `mi-marca-muestra.html` en la carpeta actual a partir de [plantilla-muestra.html](plantilla-muestra.html): sustituye cada `{{campo}}` por el valor del archivo de marca. `{{whatsapp_sin_mas}}` es el WhatsApp sin el `+`. En la URL de Google Fonts, los espacios del nombre de la fuente van como `+`. Si `logo` o `foto` están vacíos, quita ese bloque. Ajusta el CSS al `estilo` (por ejemplo, esquinas redondeadas en cálido y rectas en editorial). Después ábrela y pregunta si le gusta.

## Errores comunes

- Cambiar nombres de campos o añadir campos nuevos rompe las demás skills. Formato exacto siempre.
- Inventar teléfono, email o zona para «rellenar»: nunca. Vacío es mejor.
- Hacer 14 preguntas en un mensaje abruma. Por bloques.
- Guardar colores sin `#` o sin comillas.
- En la vía B, enseñar los 3 diseños con «Nombre Apellido»: usa sus datos reales para que se vea a sí mismo.
- En la vía C, copiar logotipos o fotos de terceros: solo se usa material del propio agente.

## Si usas la app de Claude (sin Claude Code)

En la app de Claude (web, escritorio o móvil) no se puede escribir en `~/.claude/`. Entonces:

1. Haz el mismo flujo (A, B o C). Los mockups de la vía B se entregan como archivos HTML para descargar y abrir.
2. Al final, genera el archivo `mi-marca-inmobiliaria.md` con el formato exacto de arriba y entrégalo para **descargar**.
3. Dile al agente: «Crea un Proyecto en Claude llamado *Mi negocio inmobiliario*, sube este archivo a su conocimiento y trabaja siempre dentro de ese Proyecto. Así no tendrás que repetir tu marca». Si no usa Proyectos, que adjunte el archivo al empezar cada chat.
4. Logo y foto: en la app no hay rutas locales; pídele que los adjunte al chat o que dé una URL pública.
