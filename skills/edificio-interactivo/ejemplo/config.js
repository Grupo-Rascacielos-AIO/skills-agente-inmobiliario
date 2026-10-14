// Ejemplo: Torre Áurea · edificio, imágenes y precios FICTICIOS (foto y fotos de interiores generadas con IA).
window.EDIFICIO = {
  nombre: 'Torre Áurea',
  titulo: 'Torre<br><em>Áurea</em>',                 // admite <br> y <em> (la parte en <em> sale en color de acento)
  antetitulo: 'Madrid · Centro · Entrega 2028',
  texto: '22 plantas sobre los tejados de Madrid. Elige tu planta, entra en tu casa en 3D y amuéblala a tu gusto antes de que exista.',
  pie: 'Demo interactiva · edificio, imágenes y precios ficticios',
  colores: { acento: '#e2c08a' },
  foto: { src: 'img/edificio.jpg', fondo: 'img/edificio-fondo.jpg', ancho: 1792, alto: 2400,
          alt: 'Torre Áurea, rascacielos residencial en el centro de Madrid al anochecer' },
  // Cifras grandes del panel: [número, etiqueta, sufijo]
  cifras: [[22, 'Plantas'], [43, 'Residencias'], [77, 'Terraza ático', ' m²'], [890, 'Desde €', 'k']],
  // Zona clicable de cada planta en píxeles de la foto (sale de scripts/detectar-plantas.py).
  // x0/x1 = bordes de la fachada. Para fotos en perspectiva, cada planta puede llevar poly: [[x,y],…] en vez de y1/y2.
  fachada: { x0: 650, x1: 1147.5 },
  plantas: [
    { n: 1, nombre: 'Planta 1', y1: 1991.4, y2: 2070.5, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 890000, estado: 'ok' }, { p: 'Puerta B', precio: 915000, estado: 'ven' }] },
    { n: 2, nombre: 'Planta 2', y1: 1912.2, y2: 1991.4, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 905000, estado: 'ok' }, { p: 'Puerta B', precio: 930000, estado: 'res' }] },
    { n: 3, nombre: 'Planta 3', y1: 1833.1, y2: 1912.2, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 920000, estado: 'res' }, { p: 'Puerta B', precio: 950000, estado: 'res' }] },
    { n: 4, nombre: 'Planta 4', y1: 1753.9, y2: 1833.1, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 940000, estado: 'ven' }, { p: 'Puerta B', precio: 970000, estado: 'ok' }] },
    { n: 5, nombre: 'Planta 5', y1: 1674.8, y2: 1753.9, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 955000, estado: 'ok' }, { p: 'Puerta B', precio: 985000, estado: 'ok' }] },
    { n: 6, nombre: 'Planta 6', y1: 1595.6, y2: 1674.8, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 970000, estado: 'ok' }, { p: 'Puerta B', precio: 1000000, estado: 'ok' }] },
    { n: 7, nombre: 'Planta 7', y1: 1516.5, y2: 1595.6, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 985000, estado: 'ok' }, { p: 'Puerta B', precio: 1015000, estado: 'ok' }] },
    { n: 8, nombre: 'Planta 8', y1: 1437.3, y2: 1516.5, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 1000000, estado: 'ok' }, { p: 'Puerta B', precio: 1030000, estado: 'ok' }] },
    { n: 9, nombre: 'Planta 9', y1: 1358.2, y2: 1437.3, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 1020000, estado: 'ok' }, { p: 'Puerta B', precio: 1050000, estado: 'ok' }] },
    { n: 10, nombre: 'Planta 10', y1: 1279.0, y2: 1358.2, tipo: 'A', puertas: [{ p: 'Puerta A', precio: 1035000, estado: 'ven' }, { p: 'Puerta B', precio: 1065000, estado: 'res' }] },
    { n: 11, nombre: 'Planta 11', y1: 1199.8, y2: 1279.0, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1340000, estado: 'ok' }, { p: 'Puerta B', precio: 1380000, estado: 'ok' }] },
    { n: 12, nombre: 'Planta 12', y1: 1120.7, y2: 1199.8, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1365000, estado: 'ok' }, { p: 'Puerta B', precio: 1405000, estado: 'ok' }] },
    { n: 13, nombre: 'Planta 13', y1: 1041.6, y2: 1120.7, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1390000, estado: 'res' }, { p: 'Puerta B', precio: 1430000, estado: 'ven' }] },
    { n: 14, nombre: 'Planta 14', y1: 962.4, y2: 1041.6, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1410000, estado: 'ok' }, { p: 'Puerta B', precio: 1450000, estado: 'ok' }] },
    { n: 15, nombre: 'Planta 15', y1: 883.2, y2: 962.4, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1435000, estado: 'res' }, { p: 'Puerta B', precio: 1480000, estado: 'ok' }] },
    { n: 16, nombre: 'Planta 16', y1: 804.1, y2: 883.2, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1460000, estado: 'res' }, { p: 'Puerta B', precio: 1505000, estado: 'ok' }] },
    { n: 17, nombre: 'Planta 17', y1: 725.0, y2: 804.1, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1485000, estado: 'ven' }, { p: 'Puerta B', precio: 1530000, estado: 'res' }] },
    { n: 18, nombre: 'Planta 18', y1: 645.8, y2: 725.0, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1510000, estado: 'ok' }, { p: 'Puerta B', precio: 1555000, estado: 'ok' }] },
    { n: 19, nombre: 'Planta 19', y1: 566.6, y2: 645.8, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1535000, estado: 'ok' }, { p: 'Puerta B', precio: 1580000, estado: 'ok' }] },
    { n: 20, nombre: 'Planta 20', y1: 487.5, y2: 566.6, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1555000, estado: 'ok' }, { p: 'Puerta B', precio: 1600000, estado: 'ok' }] },
    { n: 21, nombre: 'Planta 21', y1: 408.4, y2: 487.5, tipo: 'B', puertas: [{ p: 'Puerta A', precio: 1580000, estado: 'ok' }, { p: 'Puerta B', precio: 1625000, estado: 'ok' }] },
    { n: 22, nombre: 'Ático', y1: 106, y2: 408.4, tipo: 'C', puertas: [{ p: 'Sky Villa', precio: 4650000, estado: 'ok' }] }
  ],
  estiloInicial: 'nordico',
  // Fotos «Así se vive» por estilo (reales, renders o IA). porTipo = fotos extra solo para una tipología.
  fotos: {
    nordico: [{ src: 'img/salon_nordico.jpg', t: 'Salón-comedor' }, { src: 'img/dorm_nordico.jpg', t: 'Dormitorio principal' }],
    moderno: [{ src: 'img/salon_moderno.jpg', t: 'Salón-comedor' }, { src: 'img/dorm_moderno.jpg', t: 'Dormitorio principal' }],
    japandi: [{ src: 'img/salon_japandi.jpg', t: 'Salón-comedor' }, { src: 'img/dorm_japandi.jpg', t: 'Dormitorio principal' }],
    deco: [{ src: 'img/salon_deco.jpg', t: 'Salón-comedor' }, { src: 'img/dorm_deco.jpg', t: 'Dormitorio principal' }],
    mediterraneo: [{ src: 'img/salon_mediterraneo.jpg', t: 'Salón-comedor' }, { src: 'img/dorm_mediterraneo.jpg', t: 'Dormitorio principal' }],
    porTipo: { C: [{ src: 'img/atico.jpg', t: 'Terraza con piscina privada' }] }
  },
  notaFotos: 'Imágenes generadas con IA a partir del estilo elegido. Orientativas.'
};
