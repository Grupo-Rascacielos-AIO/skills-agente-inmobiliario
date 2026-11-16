/* EJEMPLO FICTICIO · Perfil 1 · Lleva meses publicado y no vende.
   Agente, propietario, dirección y testigos inventados. Fotos: Unsplash (licencia libre). */
window.DATOS = {
  marca: {
    nombre: 'Lucía Pardo', agencia: 'Pardo Real Estate', telefono: '600 000 001', whatsapp: '34600000001',
    email: 'lucia@ejemplo.com', zona: 'Madrid centro',
    color_principal: '#15233B', color_secundario: '#F3F1EC', color_acento: '#C49A3A',
    tipografia_titulos: 'Playfair Display', tipografia_texto: 'Inter',
    logo: '', foto: '', tono: 'profesional', estilo: 'elegante',
  },
  cita: { fecha_texto: 'Jueves 19 de noviembre', fecha_corta: 'Jue 19 nov', hora: '13:30', canal: 'Google Meet', enlace: '', asistentes: 'Javier' },
  propietarios: { nombres: 'Javier', tratamiento: 'tu' },
  perfil: { numero: 1, nombre: 'Lleva meses publicado y no vende' },
  triaje: [
    { etiqueta: 'Por qué vendes', texto: 'Te vas a vivir a Valencia por trabajo y quieres cerrar la venta antes de marzo.' },
    { etiqueta: 'Cómo va', texto: 'Lleva siete meses publicado con dos agencias. Han venido doce visitas y ninguna oferta.' },
    { etiqueta: 'Quién decide', texto: 'Tú solo. Eres el único titular.' },
    { etiqueta: 'Lo que te preocupa', texto: 'Que se queme y acabar malvendiéndolo con prisas.' },
  ],
  casa: {
    direccion: 'Calle del Olmo Alto, 7 · 6.º ático', direccion_corta: 'Calle del Olmo Alto', barrio: 'Chamberí', ciudad: 'Madrid',
    tipo: 'Ático', m2_construidos: 78, habitaciones: 2, banos: 1, planta: '6.ª', ascensor: true, exterior: true, anio: 1972,
    estado: 'Reformado en 2018',
    extras: ['Terraza de 14 m²', 'Vistas despejadas', 'Ascensor', 'Reformado (2018)', 'Aire acondicionado'],
    descripcion: 'Un ático luminoso con terraza de 14 m² y vistas despejadas, reformado en 2018. Dos dormitorios, cocina abierta y ascensor hasta la puerta.',
    foto_portada: 'fotos/salon.jpg', foto_adelanto: 'fotos/salon.jpg',
    fotos: [
      { src: 'fotos/salon.jpg', pie: 'Salón abierto a la terraza' },
      { src: 'fotos/terraza-salon.jpg', pie: 'La luz de la tarde' },
      { src: 'fotos/cocina.jpg', pie: 'Cocina abierta' },
      { src: 'fotos/dormitorio.jpg', pie: 'Dormitorio principal' },
      { src: 'fotos/edificio.jpg', pie: 'El edificio' },
    ],
  },
  angulo: {
    tipo: 'tarjetas',
    kicker: 'Tu anuncio, con lupa',
    titulo: 'Por qué no se vende <em>(y qué cambiaría)</em>',
    entradilla: 'Doce visitas en siete meses dicen que la casa gusta. Lo que falla es cómo llega a quien busca. Estas son las tres cosas que cambiaría mañana.',
    items: [
      { titulo: 'La portada no enseña la terraza', texto: 'Lo primero que se ve es el dormitorio. Quien busca ático en Chamberí busca terraza: tiene que ser la primera foto, con luz de tarde.' },
      { titulo: 'El título no dice lo que es', texto: '«Piso en venta en Chamberí» se pierde entre cientos. «Ático con terraza de 14 m² y vistas» es lo que se escribe en el buscador.' },
      { titulo: 'Aparece en la búsqueda equivocada', texto: 'Hoy compite con pisos más grandes y a su lado pierde. Con el posicionamiento correcto aparece donde es el mejor de la lista.' },
    ],
  },
  zona: {
    titulo: 'Chamberí, <em>visto por quien compra</em>',
    datos: [
      { titulo: 'Metro a 3 minutos', texto: 'Dos líneas a pie. Sol, a un cuarto de hora.' },
      { titulo: 'Áticos, pocos', texto: 'Con terraza y ascensor salen muy pocos al año en el barrio.' },
      { titulo: 'Comprador tipo', texto: 'Parejas y profesionales que vienen de alquiler en la zona.' },
      { titulo: 'Mercado y plazas', texto: 'Vida de barrio a dos calles.' },
    ],
  },
  metodo: [
    { titulo: 'Rehacer el anuncio', texto: 'Fotos nuevas con la terraza delante, título y descripción pensados para el buscador.' },
    { titulo: 'Un precio con datos', texto: 'Sale de lo firmado en Chamberí, no de lo que se pide en los portales.' },
    { titulo: 'Una sola agencia', texto: 'Una persona responsable, con un plan y fechas. Sin anuncios duplicados.' },
    { titulo: 'Te cuento cada visita', texto: 'Qué han dicho y qué les frena, por escrito.' },
  ],
  valoracion: {
    testigos: [
      { id: 'T1', direccion: 'C/ de los Castaños', situacion: 'vendido', precio: 585000, m2: 82, dias: 55, coef: 1, nota: 'Ático parecido, terraza de 10 m²' },
      { id: 'T2', direccion: 'C/ del Pez Volador', situacion: 'vendido', precio: 552000, m2: 75, dias: 40, coef: 0.97, nota: 'Reformado entero en 2024' },
      { id: 'T3', direccion: 'C/ de la Alameda Vieja', situacion: 'en_venta', precio: 619000, m2: 80, dias: 35, coef: 0.96, nota: 'Terraza de 25 m²' },
      { id: 'T4', direccion: 'C/ del Arco', situacion: 'en_venta', precio: 499000, m2: 72, dias: 28, coef: 1.04, nota: 'Sin terraza' },
      { id: 'T5', direccion: 'C/ de las Moreras', situacion: 'vendido', precio: 590000, m2: 85, dias: 70, coef: 1.02, nota: 'Interior' },
      { id: 'T6', direccion: 'Pl. del Reloj', situacion: 'en_venta', precio: 695000, m2: 90, dias: 150, bajadas: 2, coef: 0.98, nota: 'Cinco meses y dos bajadas' },
    ],
    parametros: {},
  },
  siguientes: [
    { titulo: 'Hoy', texto: 'Vemos las tres cosas, la valoración y si te encaja el plan.' },
    { titulo: 'Si te encaja', texto: 'Firmamos el encargo y en 48 horas hago fotos nuevas.' },
    { titulo: 'En una semana', texto: 'El anuncio nuevo sale con la terraza delante.' },
  ],
  falta: ['Fecha de fin de los encargos con las otras dos agencias.', 'Certificado energético.', 'Gastos de comunidad.'],
  adelanto: {
    etiqueta: 'Tres cambios para que tu ático se venda',
    frase: 'He mirado tu anuncio con lupa y hay tres cosas que explican estos siete meses.',
    detalle: 'Esa terraza de 14 m² merece ser la primera foto',
    fotos_extra: ['fotos/terraza-salon.jpg', 'fotos/cocina.jpg', 'fotos/dormitorio.jpg'],
  },
  chuleta: {
    objetivo: 'Salir con el encargo en exclusiva firmado o con día y hora para firmarlo.',
    marco: '«Te cuento cómo lo hacemos: primero te pregunto yo para entender bien qué ha pasado estos meses, después te enseño las tres cosas y la valoración, y al final decides. ¿Te parece bien?»',
    preguntas: [
      '¿Qué decían las visitas al salir?',
      '¿Te ha llegado alguna oferta, aunque fuera baja?',
      '¿De dónde salió el precio que tienes publicado?',
      'Si en marzo sigue sin venderse, ¿qué pasa?',
      '¿Qué te ha faltado hasta ahora: visitas, información o confianza?',
    ],
    objeciones: [
      { dice: '«Ya lo tengo con dos agencias.»', respondes: '«Por eso lleva siete meses: cuando la llevan varias, no la lleva nadie. Te propongo una sola persona responsable, con un plan y fechas, y si no cumplo, tienes salida por escrito».' },
      { dice: '«No pienso bajar el precio.»', respondes: '«Hoy no te voy a pedir que lo bajes. Te enseño lo que se ha firmado en Chamberí y decides tú con datos».' },
    ],
  },
};
