// Ficha del edificio. Rellenar con los datos de la promoción (ver ejemplo/config.js, completo).
window.EDIFICIO = {
  nombre: 'Nombre de la promoción',
  titulo: 'Residencial<br><em>Nombre</em>',        // <em> = color de acento
  antetitulo: 'Ciudad · Zona · Entrega 2027',
  texto: 'Elige tu planta, entra en tu casa en 3D y amuéblala a tu gusto antes de que exista.',
  pie: '',                                         // p. ej. 'Imágenes orientativas. Precios sin IVA.'
  colores: { acento: '#e2c08a' },                  // el color principal de la marca del agente o de la promotora
  foto: { src: 'img/edificio.jpg', fondo: 'img/edificio-fondo.jpg', ancho: 1792, alto: 2400, alt: 'Fachada del edificio' },
  cifras: [[12, 'Plantas'], [24, 'Viviendas'], [3, 'Tipologías']],   // [número, etiqueta, sufijo opcional]
  fachada: { x0: 0, x1: 0 },                       // bordes de la fachada en píxeles de la foto (scripts/detectar-plantas.py)
  plantas: [
    // De abajo arriba. y1 = línea de arriba de la planta, y2 = la de abajo (o poly: [[x,y],…] si la foto está en perspectiva).
    // estado: 'ok' (disponible) · 'res' (reservada) · 'ven' (vendida)
    { n: 1, nombre: 'Planta 1', y1: 0, y2: 0, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 250000, estado: 'ok' }, { p: 'Puerta B', precio: 255000, estado: 'res' }] }
  ],
  estiloInicial: 'nordico',                        // vacio · nordico · moderno · japandi · deco · mediterraneo
  // estilos: ['vacio', 'nordico', 'moderno'],     // opcional: limitar los estilos que se ofrecen
  fotos: {                                         // fotos reales, renders del promotor o imágenes de IA, por estilo
    nordico: [{ src: 'img/salon_nordico.jpg', t: 'Salón-comedor' }, { src: 'img/dorm_nordico.jpg', t: 'Dormitorio principal' }],
    porTipo: {}                                    // p. ej. { C: [{ src: 'img/atico.jpg', t: 'Terraza del ático' }] }
  },
  notaFotos: 'Imágenes orientativas.',
  badgeFotos: 'Render orientativo'                 // etiqueta de las fotos a pantalla completa (false para quitarla)
};
