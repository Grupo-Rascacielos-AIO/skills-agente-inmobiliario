/* EJEMPLO FICTICIO · Caso completo · Perfil 5 · Primera vez, aún sin publicar · con plano 3D y mockups.
   Agente, propietarios, dirección y testigos inventados. Plano dibujado para el ejemplo (plano.svg + plano-data.js).
   Fotos: imágenes generadas con IA de una casa ficticia (ver fotos/CREDITOS.md). */
window.DATOS = {

  /* ---------- Marca ---------- */
  marca: {
    nombre: 'Marta Ibáñez', agencia: 'Ibáñez Casas', telefono: '600 000 007', whatsapp: '34600000007',
    email: 'marta@ejemplo.com', zona: 'Valencia norte',
    color_principal: '#14271F', color_secundario: '#F3EEE3', color_acento: '#BF6A3A',
    tipografia_titulos: 'Fraunces', tipografia_texto: 'DM Sans',
    logo: '', foto: '', usuario_redes: 'ibanezcasas', tono: 'cercano', estilo: 'elegante',
  },

  /* ---------- La cita ---------- */
  cita: { fecha_texto: 'Martes 24 de noviembre', fecha_corta: 'Mar 24 nov', hora: '19:00', canal: 'Google Meet', enlace: '', asistentes: 'Clara y Andrés' },

  propietarios: { nombres: 'Clara y Andrés', tratamiento: 'vosotros' },
  perfil: { numero: 5, nombre: 'Primera vez, aún sin publicar' },

  triaje: [
    { etiqueta: 'Por qué vendéis', texto: 'Esperáis el segundo hijo y buscáis algo más grande cerca de los abuelos, en Alboraya.' },
    { etiqueta: 'Para cuándo', texto: 'Os gustaría estar ya en la casa nueva antes del verano.' },
    { etiqueta: 'Quién decide', texto: 'Los dos. El piso está a nombre de ambos.' },
    { etiqueta: 'Lo que os preocupa', texto: 'Es la primera vez que vendéis y no sabéis por dónde empezar ni cuánto pedir.' },
  ],

  /* ---------- La casa ---------- */
  casa: {
    direccion: 'Calle del Almendro, 7 · 3.º A', direccion_corta: 'Calle del Almendro', barrio: 'Benimaclet', ciudad: 'Valencia',
    tipo: 'Piso', m2_construidos: 92, m2_utiles: 80, habitaciones: 3, banos: 2,
    planta: '3.ª', ascensor: true, exterior: true, anio: 1998,
    estado: '',
    extras: ['Terraza de 8 m²', 'Ascensor', 'Exterior', 'Baño en suite', 'Cocina independiente'],
    descripcion: 'Un tercero con ascensor en Benimaclet, exterior y con una terraza de 8 m² que sale del salón. Tres dormitorios, dos baños (uno en suite) y cocina independiente.',
    foto_portada: 'fotos/salon.jpg', foto_adelanto: 'fotos/salon.jpg',
    fotos: [
      { src: 'fotos/salon.jpg', pie: 'Salón-comedor' },
      { src: 'fotos/salon-terraza.jpg', pie: 'Salida a la terraza' },
      { src: 'fotos/terraza.jpg', pie: 'Terraza de 8 m²' },
      { src: 'fotos/cocina.jpg', pie: 'Cocina' },
      { src: 'fotos/dormitorio-principal.jpg', pie: 'Dormitorio principal' },
      { src: 'fotos/bano-suite.jpg', pie: 'Baño en suite' },
      { src: 'fotos/dormitorio-2.jpg', pie: 'Dormitorio 2' },
      { src: 'fotos/dormitorio-3.jpg', pie: 'Dormitorio 3, ahora despacho' },
      { src: 'fotos/bano-2.jpg', pie: 'Baño 2' },
      { src: 'fotos/fachada.jpg', pie: 'El edificio' },
    ],
    portal: { url: '', publicado_desde: '', precio_publicado: 0 },  // aún sin publicar
  },

  /* ---------- Plano 3D ---------- */
  plano: {
    activo: true,
    estilo_inicial: 'nordico',
  },

  /* ---------- Ángulo del perfil ---------- */
  angulo: {
    tipo: 'tarjetas',
    kicker: 'El día 1',
    titulo: 'Así saldría <em>vuestra casa</em>',
    entradilla: 'Las primeras semanas son las que más gente ve vuestro piso. Así lo prepararía para que salga bien desde el principio.',
    items: [
      { titulo: 'La terraza, en la portada', texto: 'El salón con la corredera abierta y la terraza al fondo es la foto que hace clic. Después, la cocina, los dormitorios y los dos baños.' },
      { titulo: 'Que salga en cada búsqueda', texto: 'Tres dormitorios, dos baños, ascensor y terraza: son los filtros que marca quien busca en Benimaclet. Bien puestos, aparece en todas.' },
      { titulo: 'Primero, quien ya busca', texto: 'Antes de publicar, aviso a quien ya me ha pedido un piso así en la zona, para que lo vean los primeros.' },
    ],
  },

  /* plan: omitido a propósito → sale el plan estándar entero (con el pilar del plano 3D, porque plano.activo). */

  /* ---------- Mockups de su casa ---------- */
  mockups: {
    portal: {
      titular: 'Piso con terraza de 8 m² y ascensor en Benimaclet',
      texto: 'Tres dormitorios, dos baños (uno en suite), cocina independiente y un salón de 20 m² que sale a la terraza. Tercero exterior con ascensor.',
    },
    post: {
      foto: 'fotos/salon-terraza.jpg',
      gancho: 'Un salón que se abre a la terraza',
      texto: 'Tres dormitorios, dos baños y terraza en pleno Benimaclet. Escríbeme y te enseño la casa.',
    },
    story: {
      foto: 'fotos/terraza.jpg',
      posicion: 'center',
      texto: 'Tu terraza en Benimaclet',
      boton: 'Pide tu visita',
    },
    portada: {
      foto: 'fotos/salon.jpg',
      titulo: 'Piso con terraza en Benimaclet',
      detalle: '3 dormitorios · 2 baños · terraza',
    },
  },

  /* ---------- Zona, método, valoración, siguientes ---------- */
  zona: {
    titulo: 'Benimaclet, <em>visto por quien compra</em>',
    datos: [
      { titulo: 'Metro a cinco minutos', texto: 'Y las universidades a un paseo.' },
      { titulo: 'Comprador tipo', texto: 'Parejas jóvenes y familias que vienen de alquiler.' },
      { titulo: 'Vida de barrio', texto: 'Plaza, mercado y la huerta a dos calles.' },
      { titulo: 'Con terraza, pocos', texto: 'La mayoría de pisos de la zona solo tienen balcón.' },
    ],
  },
  metodo: [
    { titulo: 'Un precio con datos', texto: 'Sale de lo firmado en el barrio, no de lo que se pide.' },
    { titulo: 'La casa, bien contada', texto: 'Fotos, vídeo, plano en 3D y un anuncio que se lee hasta el final.' },
    { titulo: 'Compradores filtrados', texto: 'Antes de entrar, compruebo que pueden comprarla.' },
    { titulo: 'Os cuento cada visita', texto: 'Qué han dicho y qué les frena, por escrito.' },
  ],
  valoracion: {
    /* Ejemplo con una valoración real (testigos sin número de portal). Cada alumno pone aquí la suya. */
    origen: 'Valoración de ejemplo con datos reales · piso en Chamberí, Madrid',
    m2: 110,
    resultado: { precio: 1050000, valor: 1068750, min: 962500, max: 1155973, pedido: 10538 },
    testigos: [
      { calle: "Chamberí", situacion: 'en_venta', precio: 1125000, m2: 110, dist: 45, x: -59, y: 96 },
      { calle: "Plaza Chamberi", situacion: 'en_venta', precio: 1350000, m2: 104, dist: 61, x: -59, y: 96 },
      { calle: "Calle de Manuel Cortina", situacion: 'en_venta', precio: 1195000, m2: 110, dist: 116, x: 110, y: 96 },
      { calle: "Chamberí", situacion: 'en_venta', precio: 1099000, m2: 109, dist: 125, x: 110, y: -127 },
      { calle: "Calle del Cardenal Cisneros", situacion: 'en_venta', precio: 975000, m2: 110, dist: 132, x: -144, y: -15 },
      { calle: "Chamberí", situacion: 'en_venta', precio: 1400000, m2: 113, dist: 134, x: 110, y: 96 },
      { calle: "Calle de Manuel Cortina", situacion: 'en_venta', precio: 1050000, m2: 114, dist: 163, x: 195, y: 96 },
      { calle: "Calle de Covarrubias", situacion: 'en_venta', precio: 1180000, m2: 106, dist: 203, x: 195, y: 96 },
      { calle: "Calle de Manuel Cortina", situacion: 'en_venta', precio: 1250000, m2: 113, dist: 215, x: 195, y: -127 },
      { calle: "Calle Santa Engracia", situacion: 'en_venta', precio: 1150000, m2: 106, dist: 250, x: 26, y: 207 },
      { calle: "Calle de Santa Engracia", situacion: 'en_venta', precio: 949000, m2: 111, dist: 276, x: 280, y: 96 },
      { calle: "Calle de Ruiz", situacion: 'en_venta', precio: 819000, m2: 109, dist: 321, x: -313, y: -127 },
    ],
    notaria: { ventas: 834, eurm2: 8513, radio: 1000, meses: [{ mes: "nov '25", v: 7876 }, { mes: "dic", v: 8445 }, { mes: "ene '26", v: 8226 }, { mes: "feb", v: 8439 }, { mes: "mar", v: 8595 }, { mes: "abr", v: 8559 }, { mes: "may", v: 9248 }] },
    parametros: {},
  },
  siguientes: [
    { titulo: 'Hoy', texto: 'Vemos juntos cómo saldría vuestra casa y lo que vale.' },
    { titulo: 'Si os encaja', texto: 'Firmamos y en una semana hago fotos, vídeo y el plano en 3D.' },
    { titulo: 'En diez días', texto: 'Vuestra casa sale a la venta, con quien ya busca en la zona avisado.' },
  ],

  /* ---------- Solo chuleta ---------- */
  falta: ['Certificado energético.', 'Nota simple actualizada.', 'Si se queda algún mueble al vender.'],

  /* ---------- Adelanto ---------- */
  adelanto: {
    etiqueta: 'Así saldría vuestra casa el día 1',
    frase: 'Mirad cómo quedaría vuestra casa el día que salga a la venta.',
    detalle: 'Ese salón con terraza va a ser la portada',
    fotos_extra: ['fotos/terraza.jpg', 'fotos/cocina.jpg', 'fotos/dormitorio-principal.jpg'],
  },

  /* ---------- Chuleta ---------- */
  chuleta: {
    objetivo: 'Salir con el encargo firmado o con día y hora para firmarlo los dos.',
    marco: '«Os cuento cómo lo hacemos: primero os pregunto yo para entender bien qué buscáis, después os enseño cómo saldría vuestra casa y lo que vale, y al final decidís. ¿Os parece bien?»',
    preguntas: [
      '¿Por qué ahora? ¿Ya tenéis vista la casa nueva?',
      '¿Necesitáis vender para poder comprar, o podéis hacerlo a la vez?',
      '¿Qué tendría que pasar para que digáis «la venta ha ido bien»?',
      '¿Habéis hablado con otras agencias?',
      '¿Qué es lo que más os preocupa de vender?',
    ],
    objeciones: [
      { dice: '«Primero vamos a probar nosotros por nuestra cuenta.»', respondes: '«Podéis. Las primeras semanas son cuando más gente lo ve: si sale mal, se quema. Os enseño cómo saldría conmigo y decidís».' },
      { dice: '«¿Por qué en exclusiva?»', respondes: '«Porque así hay una sola persona responsable, con un plan y fechas. Y si no cumplo, tenéis salida por escrito».' },
      { dice: '«Nos lo tenemos que pensar.»', respondes: '«Claro. ¿Qué os gustaría tener más claro? Si es el precio, lo repasamos ahora con los testigos».' },
    ],
  },
};
