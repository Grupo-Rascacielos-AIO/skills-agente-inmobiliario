/* EJEMPLO FICTICIO · Perfil 5 · Primera vez, aún sin publicar.
   Agente, propietaria, dirección y testigos inventados. Fotos: Unsplash (licencia libre). */
window.DATOS = {
  marca: {
    nombre: 'Iker Etxeberria', agencia: 'Etxe Bilbao', telefono: '600 000 005', whatsapp: '34600000005',
    email: 'iker@ejemplo.com', zona: 'Bilbao',
    color_principal: '#1E3A2F', color_secundario: '#F4F2EC', color_acento: '#E0A43B',
    tipografia_titulos: 'Fraunces', tipografia_texto: 'Manrope',
    logo: '', foto: '', tono: 'cercano', estilo: 'moderno',
  },
  cita: { fecha_texto: 'Martes 24 de noviembre', fecha_corta: 'Mar 24 nov', hora: '17:00', canal: 'Videollamada de WhatsApp', enlace: '', asistentes: 'Itziar' },
  propietarios: { nombres: 'Itziar', tratamiento: 'tu' },
  perfil: { numero: 5, nombre: 'Primera vez, aún sin publicar' },
  triaje: [
    { etiqueta: 'Por qué vendes', texto: 'Te vas a vivir con tu pareja a Getxo y el piso se queda vacío.' },
    { etiqueta: 'Para cuándo', texto: 'Sin prisa, pero te gustaría tenerlo vendido en primavera.' },
    { etiqueta: 'Quién decide', texto: 'Tú. Eres la única titular.' },
    { etiqueta: 'Lo que te preocupa', texto: 'No saber cuánto vale y equivocarte con el precio.' },
  ],
  casa: {
    direccion: 'Calle del Roble, 31 · 4.º dcha.', direccion_corta: 'Calle del Roble', barrio: 'Indautxu', ciudad: 'Bilbao',
    tipo: 'Piso', m2_construidos: 85, habitaciones: 3, banos: 1, planta: '4.ª', ascensor: true, exterior: true, anio: 1965,
    estado: 'Reformado en 2019',
    extras: ['Reformado (2019)', 'Ascensor', 'Exterior', 'Calefacción individual', 'Balcón'],
    descripcion: 'Un cuarto con ascensor, reformado en 2019, exterior y con balcón. Tres dormitorios y salón-comedor muy luminoso.',
    foto_portada: 'fotos/salon.jpg', foto_adelanto: 'fotos/comedor.jpg',
    fotos: [
      { src: 'fotos/salon.jpg', pie: 'Salón' },
      { src: 'fotos/comedor.jpg', pie: 'Salón-comedor' },
      { src: 'fotos/sala.jpg', pie: 'Sala de estar' },
      { src: 'fotos/rincon.jpg', pie: 'Rincón de lectura' },
    ],
  },
  angulo: {
    tipo: 'tarjetas',
    kicker: 'El día 1',
    titulo: 'Así saldría <em>tu casa</em>',
    entradilla: 'Las dos primeras semanas son las que más gente ve tu casa. Así es como la prepararía para que salga bien desde el principio.',
    items: [
      { titulo: 'Las fotos, en orden', texto: 'Portada con el salón y su luz, después el balcón y los dormitorios. Fotos profesionales y un vídeo de un minuto.' },
      { titulo: 'Un precio que se encuentre', texto: 'Ajustado a lo firmado en Indautxu y a los filtros que usan quienes buscan aquí.' },
      { titulo: 'Las dos primeras semanas', texto: 'Aviso a mis compradores en búsqueda antes de publicar y agrupo las visitas en dos tardes.' },
    ],
  },
  zona: {
    titulo: 'Indautxu, <em>visto por quien compra</em>',
    datos: [
      { titulo: 'Metro a 2 minutos', texto: 'Y la Gran Vía a cinco andando.' },
      { titulo: 'Comprador tipo', texto: 'Parejas jóvenes y profesionales.' },
      { titulo: 'Comercio de barrio', texto: 'Mercado, plazas y terrazas.' },
      { titulo: 'Reformados, pocos', texto: 'La mayoría de pisos del barrio están por reformar.' },
    ],
  },
  metodo: [
    { titulo: 'Un precio con datos', texto: 'Sale de lo firmado en el barrio, no de lo que se pide.' },
    { titulo: 'La casa, bien contada', texto: 'Fotos, vídeo, plano y un anuncio que se lee hasta el final.' },
    { titulo: 'Compradores filtrados', texto: 'Antes de entrar, compruebo que pueden comprarla.' },
    { titulo: 'Te cuento cada visita', texto: 'Qué han dicho y qué les frena, por escrito.' },
  ],
  valoracion: {
    testigos: [
      { id: 'T1', direccion: 'C/ del Haya', situacion: 'vendido', precio: 372000, m2: 80, dias: 30, coef: 1, nota: 'Parecido, reformado' },
      { id: 'T2', direccion: 'C/ del Tilo', situacion: 'vendido', precio: 405000, m2: 90, dias: 45, coef: 1.03, nota: 'Baño sin reformar' },
      { id: 'T3', direccion: 'Pl. del Castaño', situacion: 'en_venta', precio: 409000, m2: 82, dias: 25, coef: 0.96, nota: 'Reformado entero en 2023' },
      { id: 'T4', direccion: 'C/ del Avellano', situacion: 'en_venta', precio: 399000, m2: 88, dias: 60, coef: 1, nota: 'Parecido' },
      { id: 'T5', direccion: 'C/ del Nogal', situacion: 'vendido', precio: 349000, m2: 78, dias: 50, coef: 1.04, nota: 'Interior' },
      { id: 'T6', direccion: 'C/ del Abedul', situacion: 'en_venta', precio: 479000, m2: 95, dias: 130, bajadas: 1, coef: 0.97, nota: 'Cuatro meses y una bajada' },
    ],
    parametros: {},
  },
  siguientes: [
    { titulo: 'Hoy', texto: 'Vemos cómo saldría tu casa y lo que vale.' },
    { titulo: 'Si te encaja', texto: 'Firmamos y en una semana hago fotos y vídeo.' },
    { titulo: 'En diez días', texto: 'Tu casa sale a la venta, con mis compradores ya avisados.' },
  ],
  falta: ['Plano (no lo tiene; lo dibujo con las medidas).', 'Certificado energético.', 'Si quedan muebles al vender.'],
  adelanto: {
    etiqueta: 'Así saldría tu casa el día 1',
    frase: 'Mira cómo quedaría tu casa el día que salga a la venta.',
    detalle: 'Ese salón tan luminoso va a ser la portada',
    fotos_extra: ['fotos/comedor.jpg', 'fotos/sala.jpg', 'fotos/rincon.jpg'],
  },
  chuleta: {
    objetivo: 'Salir con el encargo firmado o con día y hora para firmarlo.',
    marco: '«Te cuento cómo lo hacemos: primero te pregunto yo para entender bien qué buscas, después te enseño cómo saldría tu casa y lo que vale, y al final decides. ¿Te parece bien?»',
    preguntas: [
      '¿Por qué ahora?',
      '¿Qué tendría que pasar para que digas «la venta ha ido bien»?',
      '¿Has hablado con otras agencias?',
      '¿Qué plazo tienes en mente?',
      '¿Qué es lo que más te preocupa de vender?',
    ],
    objeciones: [
      { dice: '«Primero voy a probar yo por mi cuenta.»', respondes: '«Puedes. Las dos primeras semanas son cuando más gente la ve: si sale mal, se quema. Te enseño cómo saldría conmigo y decides».' },
      { dice: '«¿Por qué en exclusiva?»', respondes: '«Porque así hay una sola persona responsable, con un plan y fechas. Y si no cumplo, tienes salida por escrito».' },
    ],
  },
};
