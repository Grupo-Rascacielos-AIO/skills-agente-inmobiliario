// Datos del plano · EJEMPLO FICTICIO · Calle del Almendro, 7 · 3.º A (Benimaclet, Valencia)
// Piso de 92 m² construidos y ~80 útiles: 3 dormitorios, 2 baños (uno en suite), cocina independiente y terraza de 8 m².
// Trazado sobre plano.svg (1240 × 1100 px). Escala: 100 px = 1 m (el salón mide 5,70 m de ancho interior
// y ocupa 570 px, de x=70 a x=640). Margen de 50 px: la esquina exterior superior izquierda está en (50, 50).
window.PLANO_DATA = {
  el: 'maqueta',
  px: 100, cx: 620, cz: 540,
  alturaCorte: 1.15,

  // Paredes [x1, y1, x2, y2] en píxeles del plano. Los huecos de puertas, ventanas y la salida a la terraza NO llevan pared.
  paredes: [
    // Exterior norte, partido por las ventanas de los tres dormitorios
    [50, 50, 150, 70], [350, 50, 650, 70], [830, 50, 950, 70], [1110, 50, 1190, 70],
    // Exterior oeste y este (ventana de la cocina 550–750)
    [50, 70, 70, 830], [1170, 70, 1190, 550], [1170, 750, 1190, 830],
    // Exterior sur: salida a la terraza 150–450 (hueco) y puerta de entrada 800–890
    [50, 830, 150, 850], [450, 830, 800, 850], [890, 830, 1190, 850],
    // Interiores 10 px · dormitorios | pasillo (puertas D1 340–420, D2 790–870, D3 920–1000)
    [70, 410, 340, 420], [420, 410, 790, 420], [870, 410, 920, 420], [1000, 410, 1170, 420],
    // D1 | baño en suite (puerta 320–390) · baño | D2 · D2 | D3
    [440, 70, 450, 320], [440, 390, 450, 410], [580, 70, 590, 410], [890, 70, 900, 410],
    // Salón (zona comedor) | pasillo · fondo del pasillo | cocina
    [320, 420, 330, 510], [1010, 420, 1020, 520],
    // Pasillo | salón, baño 2, recibidor y cocina (puertas salón 530–620, baño 2 670–740, paso abierto al recibidor 790–900)
    [320, 510, 530, 520], [620, 510, 670, 520], [740, 510, 790, 520], [900, 510, 1020, 520],
    // Salón | baño 2 · baño 2 | recibidor · recibidor | cocina (puerta 590–670)
    [640, 520, 650, 830], [770, 520, 780, 830], [910, 520, 920, 590], [910, 670, 920, 830],
    // Barandilla de la terraza (10 px)
    [100, 850, 110, 1050], [100, 1040, 500, 1050], [490, 850, 500, 1050]
  ],

  // Ventanas: dormitorios (fachada norte) y cocina (fachada este)
  ventanas: [[150, 50, 350, 70], [650, 50, 830, 70], [950, 50, 1110, 70], [1170, 550, 1190, 750]],

  // Suelos [x1, y1, x2, y2, 'madera' | 'baldosa' | 'gres']
  suelos: [
    [70, 70, 440, 410, 'madera'],
    [450, 70, 580, 410, 'gres'],
    [590, 70, 890, 410, 'madera'],
    [900, 70, 1170, 410, 'madera'],
    [330, 420, 1010, 510, 'madera'],
    [70, 520, 640, 830, 'madera'],
    [70, 420, 320, 520, 'madera'],
    [650, 520, 770, 830, 'gres'],
    [780, 520, 910, 830, 'madera'],
    [920, 520, 1170, 830, 'baldosa'],
    [1020, 420, 1170, 520, 'baldosa'],
    [100, 850, 500, 1050, 'baldosa']
  ],

  // Etiquetas [nombre, m², x, y, destacada]
  etiquetas: [
    ['Dormitorio principal', '12,6 m²', 255, 250],
    ['Baño 1', '4,4 m²', 515, 175],
    ['Dormitorio 2', '10,2 m²', 740, 230],
    ['Dormitorio 3', '9,2 m²', 1035, 230],
    ['Pasillo', '6,1 m²', 640, 470],
    ['Salón-comedor', '20,0 m²', 440, 640, true],
    ['Baño 2', '3,7 m²', 710, 600],
    ['Recibidor', '4,0 m²', 845, 700],
    ['Cocina', '9,1 m²', 1030, 660],
    ['Terraza', '8,0 m²', 300, 960]
  ],

  // Muebles [tipo, x, y, giro, opciones]. Giro: 0 = el frente mira hacia abajo, 90 = derecha, -90 = izquierda, 180 = arriba
  muebles: [
    // Salón
    ['comedor', 195, 520, 0],
    ['sofa', 360, 700, 90, { w: 2.2 }],
    ['alfombra', 480, 700, 90, { w: 2.4, d: 1.8 }],
    ['mesaCentro', 480, 700, 0],
    ['muebleTV', 619, 700, -90, { w: 1.8 }],
    ['lamparaPie', 600, 800, 0],
    ['planta', 95, 805, 0, { h: 1.0 }],
    // Dormitorio principal
    ['cama', 179, 240, 90, { w: 1.6, l: 2.0 }],
    ['mesilla', 91, 125, 90],
    ['mesilla', 91, 355, 90],
    ['armario', 410, 190, -90, { w: 1.8 }],
    // Baño en suite
    ['ducha', 515, 118, 0, { w: 1.2, d: 0.95 }],
    ['inodoro', 550, 235, -90],
    ['lavabo', 557, 335, -90, { w: 0.6 }],
    // Dormitorio 2
    ['cama', 694, 300, 90, { w: 0.9, l: 1.9 }],
    ['escritorio', 740, 98, 0, { w: 1.2 }],
    ['armario', 860, 200, -90, { w: 1.2 }],
    // Dormitorio 3
    ['cama', 1066, 300, -90, { w: 0.9, l: 1.9 }],
    ['escritorio', 1030, 98, 0, { w: 1.2 }],
    // Baño 2
    ['ducha', 710, 787, 180, { w: 1.1, d: 0.85 }],
    ['lavabo', 673, 640, 90, { w: 0.6 }],
    ['inodoro', 740, 690, -90],
    // Recibidor
    ['aparador', 801, 640, 90, { w: 1.0 }],
    // Cocina
    ['cocinaLineal', 1139, 640, -90, { w: 3.0 }],
    // Terraza
    ['planta', 135, 880, 0, { h: 0.9 }],
    ['planta', 465, 880, 0, { h: 0.7 }]
  ]
};
