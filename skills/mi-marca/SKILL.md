---
name: mi-marca
description: Úsala cuando el agente inmobiliario quiera configurar, ver o cambiar su marca personal, o cuando otra skill necesite su marca y no exista ~/.claude/mi-marca-inmobiliaria.md. Disparadores - «configura mi marca», «mi marca», «es la primera vez», «empezamos», «mis colores», «cambia mis colores», «cambia mi tipografía», «cambia mi tono», «cambia mi teléfono», «actualiza mis datos», «pon mi logo», «pon mi foto», «qué paleta me pega», «no sé qué colores usar», «enséñame mi marca», «muestra de mi marca», «branding», «identidad visual», «mi agencia», «mis datos de contacto».
---

# Mi marca

Configura **una sola vez** la marca personal del agente y la guarda en `~/.claude/mi-marca-inmobiliaria.md`. Todas las demás skills de este repositorio leen ese archivo para escribir con su tono y diseñar con sus colores. Sin él, todo sale genérico.

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
---
```

- Colores siempre en hex de 6 cifras y entre comillas: `"#1F3A5F"`.
- `logo` y `foto`: ruta absoluta a un archivo local (`/Users/ana/marca/logo.png`) o URL pública. Vacío si no tiene.
- `tono`: uno de `cercano`, `profesional` o `premium`.
- `whatsapp`: con prefijo internacional y sin espacios (`+34600111222`).
- Si un dato no lo tiene, déjalo vacío. Nunca inventes datos.

## Flujo: primera vez

1. **Comprueba** si existe el archivo (`cat ~/.claude/mi-marca-inmobiliaria.md`). Si existe, enséñale un resumen y pregunta qué quiere cambiar.
2. **Saluda corto y pregunta por bloques**, no todo a la vez. Máximo 3-4 preguntas por mensaje:
   - Bloque 1 — Quién eres: nombre, agencia (o «independiente»), zona donde trabajas (barrio, ciudad o comarca).
   - Bloque 2 — Contacto: teléfono, WhatsApp (¿es el mismo?), email.
   - Bloque 3 — Imagen: ¿tienes colores de marca? ¿logo? ¿una foto tuya profesional?
   - Bloque 4 — Tono: ¿cómo hablas con tus clientes? (ver abajo).
3. **Si no sabe de colores**, propón las 5 paletas. **Si no sabe de tipografía**, las 5 combinaciones. Que elija por número.
4. **Resume** todo en una tabla y pide un «sí».
5. **Guarda** el archivo con el formato exacto.
6. **Ofrece la muestra** HTML para que la vea (ver abajo).

Tono amable y sin tecnicismos: el agente no es técnico. Si pregunta qué es un «hex», explícale que es el código del color y que tú te encargas.

## 5 paletas para el sector

| # | Nombre | Principal | Secundario | Acento | Transmite |
|---|---|---|---|---|---|
| 1 | Azul confianza | `#1F3A5F` | `#F4F1EA` | `#C8A96A` | Seriedad, solvencia, clásico que no falla |
| 2 | Verde hogar | `#2F5D50` | `#F5F3EE` | `#E07A5F` | Calidez, barrio, familias |
| 3 | Negro premium | `#141414` | `#F7F5F0` | `#B08D57` | Lujo, obra nueva, inmuebles de alto valor |
| 4 | Terracota mediterráneo | `#B5532F` | `#FAF6F0` | `#2E4A62` | Costa, luz, segunda residencia |
| 5 | Grafito moderno | `#2B2D42` | `#EDF2F4` | `#EF6F3C` | Joven, digital, rápido |

Regla: el **principal** para titulares y fondos fuertes, el **secundario** para fondos claros, el **acento** solo para botones y detalles (poco). Si el agente ya tiene logo, saca los colores del logo y propón esa paleta como opción 0.

## 5 combinaciones tipográficas (Google Fonts, gratis)

| # | Títulos | Texto | Sensación |
|---|---|---|---|
| 1 | Playfair Display | Inter | Elegante y muy legible |
| 2 | Montserrat | Open Sans | Moderna y neutra |
| 3 | DM Serif Display | DM Sans | Premium pero cercana |
| 4 | Poppins | Lato | Amable, redes sociales |
| 5 | Cormorant Garamond | Manrope | Lujo, alto standing |

## Tono

- **cercano**: tutea, frases cortas, habla de «tu casa», alguna expresión coloquial. Ideal barrio y primera vivienda.
- **profesional**: tutea o usa usted según el cliente, datos y proceso claros, sin coloquialismos. El más versátil.
- **premium**: frases cuidadas, menos palabras, cero urgencia, foco en exclusividad y discreción. Alto standing.

Si duda, recomienda **profesional**.

## «Cambia mis colores» (y otros cambios)

1. Lee el archivo actual.
2. Cambia **solo** los campos que pide. No toques el resto.
3. Si pide «algo más moderno» o similar sin dar colores, propón 3 alternativas de la tabla (o variaciones) y que elija.
4. Guarda y ofrece regenerar la muestra.

## Muestra HTML de la marca

Cuando la pida o al terminar la configuración, genera `mi-marca-muestra.html` en la carpeta actual a partir de [plantilla-muestra.html](plantilla-muestra.html): sustituye cada `{{campo}}` por el valor del archivo de marca (`{{whatsapp_sin_mas}}` es el WhatsApp sin el `+`; en la URL de Google Fonts, los espacios del nombre de la fuente van como `+`). Si `logo` o `foto` están vacíos, quita ese bloque. Después ábrela (`open mi-marca-muestra.html` en Mac, `start` en Windows) y pregunta si le gusta.

## Errores comunes

- Cambiar nombres de campos o añadir campos nuevos → rompe las demás skills. Formato exacto siempre.
- Inventar teléfono, email o zona para «rellenar» → nunca. Vacío es mejor.
- Hacer 14 preguntas en un mensaje → abruma. Por bloques.
- Guardar colores sin `#` o sin comillas.
