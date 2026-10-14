// Datos del plano · [DIRECCIÓN O NOMBRE DE LA VIVIENDA]
// Trazado sobre [nombre del archivo del plano] ([ancho] × [alto] px).
// Escala: [estancia] mide [X,XX] m y ocupa [N] px → px = N / X,XX.
// Todo va en PÍXELES DEL PLANO (x hacia la derecha, y hacia abajo), igual que al mirar la imagen.
window.PLANO_DATA = {
  el: 'maqueta',          // id del contenedor
  px: 100,                // píxeles del plano que hay en 1 metro (calibración)
  cx: 500, cz: 400,       // centro aproximado del dibujo, en píxeles
  alturaCorte: 1.15,      // altura de las paredes cortadas, en metros (no subir de 1,3)
  // estiloInicial: 'nordico',   // descomentar para que se amueble sola al verla
  // colores: { pared: '#f4efe8', base: '#24201c', canto: '#1a1714' },

  // Paredes [x1, y1, x2, y2]: rectángulos sobre el grosor negro del muro. Dejar libres los huecos de puertas.
  paredes: [
  ],

  // Ventanas [x1, y1, x2, y2]: los tramos de muro exterior que son ventana (no repetirlos en paredes)
  ventanas: [
  ],

  // Suelos [x1, y1, x2, y2, 'madera' | 'baldosa' | 'gres']: uno o varios rectángulos por estancia
  suelos: [
  ],

  // Etiquetas [nombre, 'm²', x, y, destacada (true/false)]
  etiquetas: [
  ],

  // Muebles [tipo, x, y, giro, {opciones}]  · giro: 0 = mira abajo, 90 = derecha, -90 = izquierda, 180 = arriba
  muebles: [
  ]
};
