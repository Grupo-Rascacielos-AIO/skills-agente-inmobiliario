# Marca del agente · primera vez (resumen por si `mi-marca` no está instalada)

Lo normal es usar la skill **`mi-marca`**, que hace esto mismo con más detalle. Este resumen es el plan B.
El resultado siempre es el fichero `~/.claude/mi-marca-inmobiliaria.md` con el formato de abajo.
Se hace **una vez**; después todas las skills lo leen sin volver a preguntar.

## Las tres vías (ofrecerlas al agente y que elija)
1. **A mano**: el agente dice sus colores y su tipografía (o elige de las propuestas de abajo).
2. **Elegir entre 3 mockups**: generar 3 portadas de prueba (mismo contenido, tres combinaciones distintas de
   paleta + tipografía + estilo), enseñarlas y guardar la que elija.
3. **Desde su Instagram o su web**: abrir el link con el navegador integrado, mirar logo, colores dominantes y tipo
   de letra, y proponer una marca basada en eso para que la confirme.

## Datos que hay que pedir (en un solo mensaje, o de uno en uno si el agente lo prefiere)
1. Nombre y apellidos, y nombre de la agencia (si tiene).
2. Teléfono y WhatsApp (con prefijo, p. ej. +34 600 000 000), email.
3. Zona en la que trabaja.
4. Logo: ruta del archivo en su ordenador (PNG con fondo transparente si lo tiene; mejor también una versión clara).
5. Foto suya: ruta del archivo (vertical, buena luz).
6. Colores (2-3) o elegir una paleta · tipografía o elegir una combinación · tono (cercano, elegante, directo…).

## Paletas para proponer (principal oscuro · secundario claro · acento)
| Nombre | Principal | Secundario | Acento | Sensación |
|---|---|---|---|---|
| Bosque y terracota | `#1F3A34` | `#F3EDE3` | `#C8643B` | Cálida, de barrio, cercana |
| Marino clásico | `#14213D` | `#F5F3EE` | `#C9A227` | Seria, de confianza, premium |
| Grafito y lima | `#1C1C1E` | `#F4F4F2` | `#9BC53D` | Moderna, joven, tecnológica |
| Mediterráneo | `#1D4E5F` | `#FAF6EF` | `#E07A5F` | Luminosa, costa, vacaciones |
| Burdeos y arena | `#3D1F2B` | `#F2ECE4` | `#B08D57` | Elegante, lujo discreto |

## Tipografías (Google Fonts, gratis) · títulos + texto
| Combinación | Títulos | Texto | Va bien con |
|---|---|---|---|
| Editorial cálida | Fraunces | DM Sans | estilo elegante o cálido |
| Lujo clásico | Playfair Display | Lato | estilo elegante |
| Moderna limpia | Manrope | Inter | estilo moderno o minimalista |
| Geométrica con carácter | Space Grotesk | Work Sans | estilo moderno |
| Suave y cercana | Lora | Nunito Sans | estilo cálido |

## Formato del fichero (exacto)
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
- `estilo`: `elegante`, `moderno`, `minimalista` o `calido` (la landing tiene una variante para cada uno).
- `referencias`: links o notas de webs/cuentas que le gustan (opcional).
- `logo` y `foto`: rutas absolutas en su ordenador. Al montar una landing, se **copian** a su carpeta `marca/`.
