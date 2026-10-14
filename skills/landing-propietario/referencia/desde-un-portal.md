# Datos y fotos desde un link de portal (Idealista, Fotocasa, Habitaclia, pisos.com…)

1. **Abrir el link con el navegador integrado** (no con descargas a ciegas). Si el portal muestra un CAPTCHA o
   bloquea la visita, **no intentar saltárselo**: pedir al agente que copie y pegue el texto del anuncio en el chat
   y que guarde las fotos (o capturas) en una carpeta.
2. **Sacar los datos** del texto de la página: tipo de vivienda, zona/barrio, m² construidos (y útiles si aparecen),
   dormitorios, baños, planta, ascensor, exterior/interior, extras (terraza, garaje, trastero, piscina…), estado,
   año, certificado energético y precio publicado.
3. **Fotos**: con la página abierta, listar las URLs de las imágenes de la galería (leer la página o su HTML) y
   bajar las de mayor tamaño a `fotos/` numeradas (`01.jpg`, `02.jpg`…), poniendo primero la más luminosa.
   Elegir 5-7: salón, cocina, dormitorio principal, baño, exterior/terraza y la mejor vista.
4. **Plano**: si la galería trae plano, bajarlo en el tamaño más grande que ofrezca y pasar a la skill `plano-3d`.
   Si no hay, la landing va solo con fotos.
5. **Comprobar** que los datos del plano (m², dormitorios) cuadran con el anuncio. Si no, avisar al agente.

## Derechos de las fotos
Las fotos de un anuncio publicado por otra persona o agencia tienen sus derechos. En esta landing se usan **solo
para enseñárselas al propietario** en una propuesta privada (la página no se indexa en buscadores). Para anunciar la
vivienda de verdad, el agente necesita sus propias fotos (que es justo uno de los puntos del plan).
Recordárselo al agente al entregar la landing.

## Datos personales
No copiar a la landing el nombre del anunciante, teléfonos ni referencias internas del portal. El nombre del
propietario solo si el agente lo da y quiere que aparezca.
