// Tipologías de vivienda. Cada una se traza igual que en la skill plano-3d (paredes, ventanas, suelos, etiquetas, muebles).
// px = píxeles del plano por metro. Trazando a mano en centímetros: px = 100.
// Extra de esta skill: barandillas (terrazas, cristal bajo), suelo 'exterior' y muebles isla, piscina, tumbona y sillon.
(function () {
  const A = {
    px: 100,
    paredes: [],      // [x1, y1, x2, y2] — dejar los huecos de las puertas
    ventanas: [],     // tramos de muro exterior con ventana
    barandillas: [],  // bordes de terraza
    suelos: [],       // [x1, y1, x2, y2, 'madera' | 'baldosa' | 'gres' | 'exterior']
    etiquetas: [],    // [nombre, 'm²', x, y, destacada]
    muebles: []       // [tipo, x, y, giro, {opciones}] — giro 0 = el frente mira hacia abajo del plano
  };
  window.TIPOS = {
    A: { nombre: 'Vivienda tipo A', sub: '2 dormitorios · 2 baños', m2: 85, terraza: 12, dorm: 2, banos: 2, extra: 'orientación sur', data: A }
  };
})();
