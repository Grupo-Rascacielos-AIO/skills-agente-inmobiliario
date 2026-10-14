// Datos del plano · EJEMPLO FICTICIO (piso inventado de 65 m², 2 dormitorios y 1 baño)
// Trazado sobre ejemplo/plano.svg (1100 × 800 px).
// Escala: el salón mide 5,20 m de ancho interior y ocupa 520 px (de x=70 a x=590) → 100 px = 1 m.
// Centro del dibujo: x = 550, y = 400.
window.PLANO_DATA = {
  el: 'maqueta',
  px: 100, cx: 550, cz: 400,
  alturaCorte: 1.15,

  // Paredes [x1, y1, x2, y2] en píxeles del plano. Los huecos de puertas y ventanas NO llevan pared.
  paredes: [
    // Exterior (20 px de grosor), partido donde hay ventanas o la puerta de entrada
    [50, 50, 150, 70], [450, 50, 720, 70], [940, 50, 1050, 70],          // arriba
    [50, 70, 70, 540], [50, 680, 70, 750],                                  // izquierda
    [1030, 70, 1050, 560], [1030, 680, 1050, 750],                          // derecha
    [50, 730, 420, 750], [510, 730, 650, 750], [740, 730, 1050, 750],       // abajo (puerta de entrada 420–510)
    // Interiores (12 px)
    [590, 70, 602, 392], [590, 470, 602, 730],                              // salón | dormitorios (paso al pasillo 392–470)
    [70, 470, 140, 482], [300, 470, 400, 482], [560, 470, 590, 482],        // salón | cocina y recibidor
    [330, 482, 342, 730],                                                   // cocina | recibidor
    [602, 380, 650, 392], [740, 380, 1030, 392],                            // dormitorio principal | pasillo
    [602, 490, 640, 502], [720, 490, 880, 502], [960, 490, 1030, 502],      // pasillo | baño y dormitorio 2
    [790, 502, 802, 730]                                                    // baño | dormitorio 2
  ],

  // Ventanas: tramos de muro exterior con ventana (el motor pone antepecho y cristal)
  ventanas: [[150, 50, 450, 70], [720, 50, 940, 70], [50, 540, 70, 680], [1030, 560, 1050, 680], [650, 730, 740, 750]],

  // Suelos [x1, y1, x2, y2, 'madera' | 'baldosa' | 'gres']
  suelos: [
    [70, 70, 590, 470, 'madera'],     // salón-comedor
    [70, 482, 330, 730, 'baldosa'],   // cocina
    [342, 482, 590, 730, 'madera'],   // recibidor
    [602, 70, 1030, 380, 'madera'],   // dormitorio principal
    [602, 392, 1030, 490, 'madera'],  // pasillo
    [602, 502, 790, 730, 'gres'],     // baño
    [802, 502, 1030, 730, 'madera']   // dormitorio 2
  ],

  // Etiquetas [nombre, m², x, y, destacada]
  etiquetas: [
    ['Salón-comedor', '20,8 m²', 330, 270, true],
    ['Cocina', '6,4 m²', 200, 600],
    ['Recibidor', '6,2 m²', 466, 600],
    ['Dormitorio principal', '13,3 m²', 816, 225],
    ['Baño', '4,3 m²', 696, 600],
    ['Dormitorio 2', '5,2 m²', 916, 600]
  ],

  // Muebles [tipo, x, y, giro, opciones]. Giro: 0 = el frente mira hacia abajo, 90 = derecha, -90 = izquierda, 180 = arriba
  muebles: [
    // Salón
    ['muebleTV', 91, 210, 90, { w: 1.8 }],
    ['alfombra', 420, 230, 90, { w: 2.4, d: 1.8 }],
    ['sofa', 542, 230, -90, { w: 2.2 }],
    ['mesaCentro', 420, 230, 0],
    ['lamparaPie', 555, 100, 0],
    ['comedor', 220, 380, 0],
    ['planta', 105, 440, 0, { h: 1.0 }],
    // Cocina
    ['cocinaLineal', 200, 699, 180, { w: 2.4 }],
    // Recibidor
    ['aparador', 569, 610, -90, { w: 1.0 }],
    ['planta', 372, 700, 0, { h: 0.8 }],
    // Dormitorio principal
    ['cama', 926, 225, -90, { w: 1.6, l: 2.0 }],
    ['mesilla', 1008, 116, -90],
    ['mesilla', 1008, 334, -90],
    ['armario', 632, 225, 90, { w: 2.0 }],
    // Baño
    ['ducha', 650, 670, 0, { w: 0.9, d: 1.2 }],
    ['lavabo', 767, 560, -90, { w: 0.8 }],
    ['inodoro', 762, 668, -90],
    // Dormitorio 2
    ['cama', 960, 631, 180, { w: 0.9, l: 1.9 }],
    ['escritorio', 830, 620, 90, { w: 1.0 }]
  ]
};
