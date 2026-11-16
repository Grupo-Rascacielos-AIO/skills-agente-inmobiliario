/* EJEMPLO FICTICIO. Agente, propietarios, dirección y testigos inventados.
   Fotos: Unsplash (licencia libre). Es el caso de la carpeta ejemplo/. */
window.DATOS = {
  marca: {
    nombre: 'Marta Ibáñez',
    agencia: 'Ibáñez Casas',
    telefono: '600 000 000',
    whatsapp: '34600000000',
    email: 'hola@ejemplo.com',
    zona: 'Valencia norte',
    color_principal: '#1F2A33',
    color_secundario: '#F4EFE8',
    color_acento: '#B5653A',
    tipografia_titulos: 'Fraunces',
    tipografia_texto: 'Hanken Grotesk',
    logo: '',
    foto: '',
    tono: 'cercano',
    estilo: 'elegante',
  },

  cita: {
    fecha_texto: 'Martes 17 de noviembre',
    fecha_corta: 'Mar 17 nov',
    hora: '19:00',
    canal: 'Google Meet',
    enlace: '',
    asistentes: 'Carmen y Luis',
  },

  propietarios: { nombres: 'Carmen y Luis', tratamiento: 'vosotros' }, // 'vosotros' o 'tu'

  perfil: { numero: 2, nombre: 'Vende para comprar otra' },

  // Lo que dijeron en el triaje, con sus palabras. Nada inventado.
  triaje: [
    { etiqueta: 'Por qué vendéis', texto: 'Esperáis un bebé en junio y la casa se os queda pequeña. Buscáis una habitación más, cerca de los abuelos, en Alboraia.' },
    { etiqueta: 'Para cuándo', texto: 'Os gustaría estar ya en la casa nueva antes del verano.' },
    { etiqueta: 'Quién decide', texto: 'Sois titulares los dos y os conectáis los dos. Luis sale tarde de trabajar.' },
    { etiqueta: 'Lo que os preocupa', texto: 'Vender y quedaros sin casa. O encontrar la nueva y no poder comprarla.' },
  ],

  casa: {
    direccion: 'Calle de los Tilos, 18 · 3.º B',
    direccion_corta: 'Calle de los Tilos',
    barrio: 'Benimaclet',
    ciudad: 'Valencia',
    tipo: 'Piso',
    m2_construidos: 92,
    habitaciones: 3,
    banos: 2,
    planta: '3.ª',
    ascensor: true,
    exterior: true,
    anio: 1998,
    estado: 'Cocina reformada en 2021',
    extras: ['Exterior y orientación sur', 'Terraza de 6 m²', 'Trastero', 'Ascensor', 'Cocina reformada (2021)'],
    descripcion: 'Un tercero con ascensor, luminoso y para entrar a vivir. La cocina está reformada, los dos baños completos y el salón da a la calle.',
    foto_portada: 'fotos/salon.jpg',
    foto_adelanto: 'fotos/salon.jpg',
    fotos: [
      { src: 'fotos/salon.jpg', pie: 'Salón · luz de sur toda la tarde' },
      { src: 'fotos/comedor.jpg', pie: 'Comedor abierto al salón' },
      { src: 'fotos/cocina.jpg', pie: 'Cocina reformada en 2021' },
      { src: 'fotos/dormitorio.jpg', pie: 'Dormitorio principal' },
      { src: 'fotos/bano.jpg', pie: 'Baño principal' },
      { src: 'fotos/fachada.jpg', pie: 'El edificio' },
    ],
  },

  // La sección central cambia según el perfil (ver perfiles.md).
  angulo: {
    tipo: 'linea',
    kicker: 'El plan',
    titulo: 'Vender y comprar <em>sin quedaros en medio</em>',
    entradilla: 'Lo que más os preocupa tiene solución: se vende con un plazo de entrega que os deje comprar la nueva con calma. Este sería el calendario.',
    items: [
      { cuando: 'Semana 0', titulo: 'Preparar y salir', texto: 'Fotos y vídeo, el plano y un precio que entre en los filtros de búsqueda de quien compra en Benimaclet.' },
      { cuando: 'Semanas 1-4', titulo: 'Visitas filtradas', texto: 'Solo compradores con la financiación comprobada. Las agrupo por las tardes, para que no tengáis la casa patas arriba cada día.' },
      { cuando: 'Semanas 4-6', titulo: 'Arras con plazo largo', texto: 'Se firman las arras con la entrega a tres o cuatro meses. La venta queda atada y ganáis tiempo para la vuestra.' },
      { cuando: 'Mientras tanto', titulo: 'Vuestra casa nueva', texto: 'Negociáis la de Alboraia con la venta ya firmada: compráis con seguridad y con más fuerza para negociar.' },
      { cuando: 'Mes 4', titulo: 'Las dos notarías, coordinadas', texto: 'Vendéis y compráis el mismo día o con pocos días de diferencia. Sin pagar dos casas a la vez.' },
      { cuando: 'Antes de junio', titulo: 'En casa nueva antes del bebé', texto: 'La fecha que manda es la vuestra. Todo el calendario se cuenta hacia atrás desde aquí.' },
    ],
    nota: 'Las semanas son una estimación. Las fijamos juntos en la videollamada.',
  },

  zona: {
    titulo: 'Benimaclet, <em>visto por quien compra</em>',
    datos: [
      { titulo: 'Metro a 5 minutos', texto: 'A pie hasta la parada. El centro, a un cuarto de hora.' },
      { titulo: 'Universidades cerca', texto: 'Demanda constante de parejas jóvenes y de profesores.' },
      { titulo: 'Huerta y carril bici', texto: 'A dos calles. Es lo primero que preguntan las familias.' },
      { titulo: 'Vida de barrio', texto: 'Mercado, plaza y comercio de toda la vida.' },
    ],
  },

  metodo: [
    { titulo: 'Un precio con datos', texto: 'Sale de lo que se ha firmado cerca, no de lo que se pide en los portales.' },
    { titulo: 'La casa, bien contada', texto: 'Fotos y vídeo profesionales, plano y un anuncio que se lee hasta el final.' },
    { titulo: 'Compradores filtrados', texto: 'Antes de entrar en vuestra casa, compruebo que pueden comprarla.' },
    { titulo: 'Os informo de cada visita', texto: 'Qué han dicho, qué les frena y qué haría falta. Por escrito, a los dos.' },
    { titulo: 'Hasta la notaría', texto: 'Arras, papeles, banco del comprador y firma. Una sola persona responsable.' },
  ],

  // Testigos de la zona (ficticios). coef: corrección por diferencias (mejor que la vuestra → < 1).
  valoracion: {
    testigos: [
      { id: 'T1', direccion: 'C/ del Almendro', situacion: 'vendido', precio: 228000, m2: 90, habitaciones: 3, dias: 48, coef: 1, nota: 'Muy parecido: tercero con ascensor' },
      { id: 'T2', direccion: 'Av. de la Huerta', situacion: 'en_venta', precio: 259000, m2: 95, habitaciones: 3, dias: 40, coef: 0.96, nota: 'Reformado entero hace un año' },
      { id: 'T3', direccion: 'C/ del Olivo', situacion: 'vendido', precio: 209000, m2: 85, habitaciones: 3, dias: 62, coef: 1.05, nota: 'Segundo sin ascensor' },
      { id: 'T4', direccion: 'C/ de la Acequia', situacion: 'en_venta', precio: 265000, m2: 100, habitaciones: 3, dias: 118, bajadas: 1, coef: 0.96, nota: 'Terraza de 15 m²' },
      { id: 'T5', direccion: 'C/ del Molino', situacion: 'en_venta', precio: 236000, m2: 88, habitaciones: 3, dias: 21, coef: 1, nota: 'Parecido, recién publicado' },
      { id: 'T6', direccion: 'C/ de la Barraca', situacion: 'vendido', precio: 238000, m2: 96, habitaciones: 3, dias: 35, coef: 1.02, nota: 'Interior' },
      { id: 'T7', direccion: 'Pl. del Mercado', situacion: 'en_venta', precio: 309000, m2: 110, habitaciones: 4, dias: 164, bajadas: 2, coef: 0.95, nota: 'Salió caro: 164 días y dos bajadas' },
    ],
    parametros: {},
  },

  siguientes: [
    { titulo: 'Hoy', texto: 'Repasamos el calendario y la valoración, y resolvemos vuestras dudas.' },
    { titulo: 'Si os encaja', texto: 'Firmamos el encargo y en 48 horas hago las fotos y el vídeo.' },
    { titulo: 'La semana que viene', texto: 'La casa sale a la venta con el plan en marcha.' },
  ],

  // Lo que falta: se enseña en la chuleta, nunca al propietario.
  falta: [
    'Plano: los 92 m² son los que me dijisteis. Los compruebo con el catastro antes de la llamada.',
    'Fotos de la terraza y del trastero.',
    'Gastos de comunidad e IBI.',
  ],

  adelanto: {
    etiqueta: 'Vender y comprar sin quedaros en medio',
    frase: 'Os he preparado el calendario para que vendáis y compréis sin pagar dos casas a la vez.',
    detalle: 'Ese salón con luz de sur toda la tarde',
    fotos_extra: ['fotos/cocina.jpg', 'fotos/dormitorio.jpg', 'fotos/comedor.jpg'],
  },

  chuleta: {
    objetivo: 'Salir con el encargo firmado o con día y hora para firmarlo, con los dos.',
    marco: '«Os cuento cómo lo hacemos: primero os pregunto yo para entender bien vuestro caso, después os enseño el plan y la valoración, y al final decidís. ¿Os parece bien?»',
    preguntas: [
      '¿Ya tenéis vista la casa de Alboraia o estáis buscando?',
      '¿Necesitáis el dinero de esta para comprar la otra?',
      '¿Qué fecha os marca el cambio? ¿Junio es firme?',
      '¿Queda hipoteca en esta casa?',
      'Si vendéis antes de encontrar la otra, ¿dónde viviríais esos meses?',
    ],
    objeciones: [
      { dice: '«Primero queremos encontrar la otra.»', respondes: '«Tiene sentido. El riesgo es encontrarla y no poder comprarla por no haber vendido. Por eso se sale con unas arras de plazo largo y una entrega que os encaje: así no os quedáis en medio».' },
      { dice: '«No tenemos prisa, si sale bien y si no, nada.»', respondes: '«Podéis. Pero cada mes de más es un mes en que la otra casa puede irse. Con un plan os doy una fecha realista y decidís con ella».' },
    ],
  },
};
