/* EJEMPLO FICTICIO · Perfil 3 · Herencia o varios titulares.
   Agente, propietarios, dirección y testigos inventados. Fotos: Unsplash (licencia libre). */
window.DATOS = {
  marca: {
    nombre: 'Álvaro Ruiz', agencia: 'Costa Ruiz Inmobiliaria', telefono: '600 000 003', whatsapp: '34600000003',
    email: 'alvaro@ejemplo.com', zona: 'Costa del Sol',
    color_principal: '#173B3A', color_secundario: '#F5F1E8', color_acento: '#D07A4F',
    tipografia_titulos: 'Cormorant Garamond', tipografia_texto: 'Hanken Grotesk',
    logo: '', foto: '', tono: 'cercano', estilo: 'calido',
  },
  cita: { fecha_texto: 'Viernes 20 de noviembre', fecha_corta: 'Vie 20 nov', hora: '18:30', canal: 'Google Meet', enlace: '', asistentes: 'Pilar, Andrés y Rosa' },
  propietarios: { nombres: 'Pilar, Andrés y Rosa', tratamiento: 'vosotros' },
  perfil: { numero: 3, nombre: 'Herencia o varios titulares' },
  triaje: [
    { etiqueta: 'Por qué vendéis', texto: 'Es el chalet de vuestros padres. Ninguno de los tres va a vivir allí y mantenerlo vacío os cuesta dinero.' },
    { etiqueta: 'Cómo estáis', texto: 'Pilar y Rosa quieren vender ya. Andrés lo ve bien, pero no a cualquier precio.' },
    { etiqueta: 'Los papeles', texto: 'Ya habéis estado con el notario, pero la aceptación de la herencia aún no está firmada.' },
    { etiqueta: 'Lo que os preocupa', texto: 'Discutir entre hermanos y que la venta se alargue años.' },
  ],
  casa: {
    direccion: 'Urbanización Los Pinares, calle Jazmín, 12', direccion_corta: 'Calle Jazmín', barrio: 'Mijas Costa', ciudad: 'Málaga',
    tipo: 'Chalet', m2_construidos: 210, parcela_m2: 600, habitaciones: 4, banos: 3, planta: '', ascensor: false, exterior: true, anio: 1995,
    estado: 'Bien conservado, cocina y baños a actualizar',
    extras: ['Parcela de 600 m²', 'Piscina', 'Garaje para dos coches', 'Orientación sur', 'Barbacoa'],
    descripcion: 'Un chalet de 210 m² en una parcela de 600 m², con piscina y orientación sur. Bien conservado: la cocina y los baños son de origen y se pueden actualizar a gusto del comprador.',
    foto_portada: 'fotos/chalet.jpg', foto_adelanto: 'fotos/chalet.jpg',
    fotos: [
      { src: 'fotos/chalet.jpg', pie: 'La casa desde el jardín' },
      { src: 'fotos/piscina.jpg', pie: 'Piscina orientada al sur' },
      { src: 'fotos/salon.jpg', pie: 'Salón con salida al porche' },
      { src: 'fotos/cocina.jpg', pie: 'Cocina' },
      { src: 'fotos/dormitorio.jpg', pie: 'Dormitorio principal' },
    ],
  },
  angulo: {
    tipo: 'pasos',
    kicker: 'El camino',
    titulo: 'Que los tres lo veáis <em>igual de claro</em>',
    entradilla: 'Vender una casa heredada no tiene por qué alargarse ni enfrentar a nadie. Estos son los pasos, en orden, para que todos sepáis en qué punto estáis.',
    items: [
      { titulo: 'Los papeles, al día', texto: 'La aceptación de la herencia la firmáis ante vuestro notario. Mientras tanto, preparamos la casa para no perder semanas.' },
      { titulo: 'Un acuerdo entre los tres, por escrito', texto: 'Precio mínimo y plazo decididos antes de salir. Así nadie tiene que decidir solo cuando llegue una oferta.' },
      { titulo: 'Un solo interlocutor', texto: 'Os informo a los tres a la vez y por escrito: visitas, ofertas y lo que dicen los compradores.' },
      { titulo: 'El reparto, en notaría', texto: 'El día de la firma cada uno recibe su parte. Sin adelantos ni cuentas pendientes entre vosotros.' },
    ],
    papeles: ['Escritura de la casa', 'Certificado de defunción y de últimas voluntades', 'Testamento o declaración de herederos', 'Aceptación de la herencia (cuando esté firmada)', 'Último recibo del IBI', 'Certificado energético'],
  },
  zona: {
    titulo: 'Mijas Costa, <em>visto por quien compra</em>',
    datos: [
      { titulo: 'Playa a 8 minutos', texto: 'En coche. Lo primero que pregunta quien viene de fuera.' },
      { titulo: 'Comprador extranjero', texto: 'Buena parte de los chalets de la urbanización los compran familias del norte de Europa.' },
      { titulo: 'Colegios internacionales', texto: 'Tres a menos de 15 minutos.' },
      { titulo: 'Aeropuerto a 25 minutos', texto: 'Clave para segunda residencia.' },
    ],
  },
  metodo: [
    { titulo: 'Un precio con datos', texto: 'Sale de lo firmado en la urbanización: así discutís sobre datos y no entre vosotros.' },
    { titulo: 'La casa, bien contada', texto: 'Fotos, vídeo con dron y un anuncio también en inglés y alemán.' },
    { titulo: 'Compradores filtrados', texto: 'Antes de entrar, compruebo que pueden comprarla.' },
    { titulo: 'Los tres, informados a la vez', texto: 'Un resumen por escrito cada semana.' },
  ],
  valoracion: {
    testigos: [
      { id: 'T1', direccion: 'Urb. Los Pinares', situacion: 'vendido', precio: 640000, m2: 220, dias: 90, coef: 1, nota: 'Parecido, con piscina' },
      { id: 'T2', direccion: 'Urb. El Olivar', situacion: 'vendido', precio: 520000, m2: 190, dias: 120, coef: 1.05, nota: 'Sin piscina' },
      { id: 'T3', direccion: 'Urb. Las Lomas', situacion: 'en_venta', precio: 735000, m2: 230, dias: 60, coef: 0.92, nota: 'Reformado entero' },
      { id: 'T4', direccion: 'Urb. Los Pinares', situacion: 'en_venta', precio: 590000, m2: 200, dias: 45, coef: 1, nota: 'Parecido' },
      { id: 'T5', direccion: 'Urb. Cerro Azul', situacion: 'vendido', precio: 575000, m2: 205, dias: 75, coef: 1.02, nota: 'Parcela más pequeña' },
      { id: 'T6', direccion: 'Urb. Mirador del Mar', situacion: 'en_venta', precio: 850000, m2: 250, dias: 210, bajadas: 2, coef: 0.93, nota: 'Vistas al mar; siete meses y dos bajadas' },
    ],
    parametros: {},
  },
  siguientes: [
    { titulo: 'Hoy', texto: 'Vemos los pasos, la valoración y vuestras dudas, con los tres.' },
    { titulo: 'Si os encaja', texto: 'Dejamos por escrito el precio mínimo y el plazo, y preparo la casa.' },
    { titulo: 'Con la herencia firmada', texto: 'La casa sale a la venta con todo listo.' },
  ],
  falta: ['Fecha prevista de la firma de la aceptación de la herencia.', 'Certificado energético (no lo tienen).', 'Gastos de comunidad de la urbanización.'],
  adelanto: {
    etiqueta: 'Los pasos para vender la casa entre los tres',
    frase: 'He preparado los pasos para que los tres lo veáis igual de claro.',
    detalle: 'Esa piscina orientada al sur es lo primero que van a mirar',
    fotos_extra: ['fotos/piscina.jpg', 'fotos/salon.jpg', 'fotos/cocina.jpg'],
  },
  chuleta: {
    objetivo: 'Salir con el acuerdo de los tres (precio mínimo y plazo) y día y hora para firmar el encargo.',
    marco: '«Os cuento cómo lo hacemos: primero os pregunto para entender bien vuestra situación, después os enseño los pasos y la valoración, y al final decidís los tres. ¿Os parece bien?»',
    preguntas: [
      '¿Quién de los tres lleva la voz con el notario?',
      '¿Cuándo está previsto firmar la aceptación de la herencia?',
      'Andrés, ¿qué tendría que pasar para que el precio te parezca justo?',
      '¿Os está costando dinero tenerla así (comunidad, IBI, suministros)?',
      '¿Qué haría falta para que los tres firmarais tranquilos?',
    ],
    objeciones: [
      { dice: '«Mi hermano no quiere venderla por ese precio.»', respondes: '«Por eso el precio sale de lo firmado en la urbanización y no de lo que cada uno cree: así discutís sobre datos y no entre vosotros».' },
      { dice: '«Primero tenemos que arreglar los papeles.»', respondes: '«Se hace a la vez: mientras el notario prepara la aceptación, preparamos la casa. Así no perdéis meses».' },
    ],
  },
};
