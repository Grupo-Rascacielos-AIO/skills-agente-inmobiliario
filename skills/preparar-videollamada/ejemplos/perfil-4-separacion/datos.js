/* EJEMPLO FICTICIO · Perfil 4 · Separación.
   Agente, propietarios, dirección y testigos inventados. Fotos: Unsplash (licencia libre). */
window.DATOS = {
  marca: {
    nombre: 'Nuria Gil', agencia: 'Gil Hogares', telefono: '600 000 004', whatsapp: '34600000004',
    email: 'nuria@ejemplo.com', zona: 'Zaragoza',
    color_principal: '#2B2A33', color_secundario: '#F2F0F3', color_acento: '#7A6CF0',
    tipografia_titulos: 'DM Serif Display', tipografia_texto: 'DM Sans',
    logo: '', foto: '', tono: 'profesional', estilo: 'moderno',
  },
  cita: { fecha_texto: 'Lunes 23 de noviembre', fecha_corta: 'Lun 23 nov', hora: '20:00', canal: 'Google Meet', enlace: '', asistentes: 'Elena y Raúl, cada uno desde su casa' },
  propietarios: { nombres: 'Elena y Raúl', tratamiento: 'vosotros' },
  perfil: { numero: 4, nombre: 'Separación' },
  triaje: [
    { etiqueta: 'Por qué vendéis', texto: 'Os habéis separado y queréis cerrar esta etapa vendiendo el piso.' },
    { etiqueta: 'Para cuándo', texto: 'Cuanto antes, pero sin malvenderlo.' },
    { etiqueta: 'Quién decide', texto: 'Los dos. Elena vive ahora en el piso con los niños; Raúl, en otro.' },
    { etiqueta: 'Lo que os preocupa', texto: 'Que haya visitas sin control y que cada uno reciba información distinta.' },
  ],
  casa: {
    direccion: 'Calle de las Acacias, 22 · 2.º izda.', direccion_corta: 'Calle de las Acacias', barrio: 'Universidad', ciudad: 'Zaragoza',
    tipo: 'Piso', m2_construidos: 105, habitaciones: 4, banos: 2, planta: '2.ª', ascensor: true, exterior: true, anio: 2004,
    estado: 'Para entrar a vivir',
    extras: ['Plaza de garaje', 'Trastero', 'Calefacción central', 'Ascensor', 'Exterior'],
    descripcion: 'Un piso de 105 m² en un edificio de 2004, para entrar a vivir. Cuatro dormitorios, dos baños, plaza de garaje y trastero.',
    foto_portada: 'fotos/salon.jpg', foto_adelanto: 'fotos/salon.jpg',
    fotos: [
      { src: 'fotos/salon.jpg', pie: 'Salón' },
      { src: 'fotos/comedor.jpg', pie: 'Zona de comedor' },
      { src: 'fotos/estudio.jpg', pie: 'Cuarto de estudio' },
      { src: 'fotos/rincon.jpg', pie: 'Rincón de lectura' },
    ],
  },
  angulo: {
    tipo: 'tarjetas',
    kicker: 'El plan',
    titulo: 'Rápido, discreto y <em>sin roces</em>',
    entradilla: 'Lo que más os importa es que todo esté claro para los dos y que la casa no se llene de visitas. Así lo haríamos.',
    items: [
      { titulo: 'Los dos, con la misma información', texto: 'Un solo interlocutor y todo por escrito a los dos a la vez: visitas, ofertas y cada paso.' },
      { titulo: 'Visitas filtradas', texto: 'Solo compradores con la financiación comprobada, agrupadas en dos tardes por semana y avisadas con tiempo.' },
      { titulo: 'Todo claro antes de salir', texto: 'Precio, plazo y cómo os llega a cada uno el dinero, acordado por escrito antes de publicar.' },
    ],
  },
  // Sin plano: la sección del 3D no sale.
  plano: { activo: false },
  // Plan estándar salvo el pilar de las visitas (perfil 4): al escribir `pilares`, se sustituyen los seis.
  plan: {
    pilares: [
      { icono: 'camara', t: 'Fotos y vídeo que paran el scroll', d: 'Sesión con luz natural, gran angular y un vídeo corto en vertical para redes. La primera foto decide el clic.' },
      { icono: 'sofa', t: 'Decoración virtual', d: 'Las estancias vacías o anticuadas se decoran en digital para que quien la vea se imagine viviendo allí. Siempre avisado como «decoración virtual».' },
      { icono: 'megafono', t: 'Portales y redes, bien dirigidos', d: 'Anuncio destacado en los portales y campañas en redes para quien busca en la zona y en ese rango de precio.' },
      { icono: 'personas', t: 'Compradores filtrados', d: 'Cada contacto se llama el mismo día y se comprueba si puede comprar (financiación y plazos) antes de enseñarle la casa.' },
      { icono: 'puerta', t: 'Visitas filtradas y discretas', d: 'Solo compradores con financiación comprobada, con cita y sin puertas abiertas. Cada novedad, a los dos a la vez y por escrito.' },
      { icono: 'informe', t: 'Informe cada lunes', d: 'Cuánta gente la ha visto, cuántos han preguntado, quién la ha visitado y qué opinan. Sin tener que llamar para preguntar.' },
    ],
  },

  // Mockups: textos para COMPRADORES, con datos reales de la casa y sin precio.
  mockups: {
    portal: { titular: 'Piso de 4 dormitorios con garaje y trastero en Universidad' },
    post: { gancho: 'Cuatro dormitorios y plaza de garaje', texto: 'Edificio de 2004, para entrar a vivir: dos baños, ascensor, trastero y calefacción central. Visitas con cita previa.' },
    story: { texto: 'Cuatro dormitorios, para entrar a vivir' },
    portada: { detalle: '105 m², dos baños y garaje' },
  },

  zona: {
    titulo: 'Universidad, <em>visto por quien compra</em>',
    datos: [
      { titulo: 'Tranvía a 4 minutos', texto: 'El centro, a diez.' },
      { titulo: 'Colegios y universidad', texto: 'Demanda constante de familias.' },
      { titulo: 'Garaje incluido', texto: 'Muy buscado en el barrio.' },
      { titulo: 'Parques cerca', texto: 'Dos zonas verdes a cinco minutos.' },
    ],
  },
  metodo: [
    { titulo: 'Un precio con datos', texto: 'Sale de lo firmado en el barrio. Lo vemos los tres a la vez.' },
    { titulo: 'La casa, bien contada', texto: 'Fotos y vídeo un solo día, a la hora que diga Elena.' },
    { titulo: 'Compradores filtrados', texto: 'Antes de entrar, compruebo que pueden comprarla.' },
    { titulo: 'Un resumen semanal', texto: 'El mismo correo, a los dos, cada viernes.' },
  ],
  valoracion: {
    testigos: [
      { id: 'T1', direccion: 'C/ del Fresno', situacion: 'vendido', precio: 205000, m2: 100, dias: 45, coef: 1, nota: 'Parecido, con garaje' },
      { id: 'T2', direccion: 'C/ del Sauce', situacion: 'vendido', precio: 219000, m2: 110, dias: 60, coef: 1.02, nota: 'Sin plaza de garaje' },
      { id: 'T3', direccion: 'Av. de los Olmos', situacion: 'en_venta', precio: 215000, m2: 98, dias: 30, coef: 0.97, nota: 'Reformado en 2023' },
      { id: 'T4', direccion: 'C/ del Laurel', situacion: 'en_venta', precio: 249000, m2: 115, dias: 95, bajadas: 1, coef: 0.98, nota: 'Ático con terraza' },
      { id: 'T5', direccion: 'C/ del Almez', situacion: 'vendido', precio: 199000, m2: 102, dias: 38, coef: 1.04, nota: 'Primero sin ascensor' },
      { id: 'T6', direccion: 'C/ del Arce', situacion: 'en_venta', precio: 239000, m2: 108, dias: 20, coef: 1, nota: 'Parecido, recién publicado' },
    ],
    parametros: {},
  },
  siguientes: [
    { titulo: 'Hoy', texto: 'Vemos el plan y la valoración con los dos conectados.' },
    { titulo: 'Si os encaja', texto: 'Firmáis los dos el encargo y dejamos por escrito precio y plazo.' },
    { titulo: 'En diez días', texto: 'La casa sale a la venta, con las visitas ya organizadas.' },
  ],
  falta: ['Plano: sin plano, la presentación sale sin maqueta 3D.', 'Quién paga la hipoteca hasta la venta (lo decide su acuerdo, no la agencia).', 'Fotos de los baños y la cocina.', 'Horario en que Elena prefiere las visitas.'],
  adelanto: {
    etiqueta: 'Un plan claro para los dos',
    frase: 'Os he preparado un plan con visitas filtradas y la misma información para los dos.',
    detalle: 'Cuatro dormitorios con garaje: lo que más buscan las familias del barrio',
    fotos_extra: ['fotos/comedor.jpg', 'fotos/estudio.jpg', 'fotos/rincon.jpg'],
  },
  chuleta: {
    objetivo: 'Salir con los dos de acuerdo en el plan y con día y hora para firmar el encargo.',
    marco: '«Os cuento cómo lo hacemos: primero os pregunto a los dos, después os enseño el plan y la valoración, y al final decidís juntos. ¿Os parece bien?»',
    preguntas: [
      '¿Estáis los dos de acuerdo en vender?',
      'Elena, ¿qué horario de visitas te viene mejor con los niños?',
      '¿Cómo queréis que os informe: a los dos a la vez y por escrito?',
      '¿Hay un plazo que os marque el acuerdo?',
      '¿Hay hipoteca a nombre de los dos?',
    ],
    objeciones: [
      { dice: '«Él/ella no va a firmar.»', respondes: '«Sin los dos no se puede vender, así que lo primero es que los dos tengáis la misma información. Por eso esta llamada es con los dos».' },
      { dice: '«Queremos venderlo ya, aunque sea barato.»', respondes: '«Rápido sí, regalado no: con el precio bien puesto se vende en semanas sin perder dinero».' },
    ],
    antes: ['Los dos conectados antes de empezar; si falta uno, se espera cinco minutos.', 'Habla siempre a los dos; nunca tomes partido.', 'Presentación abierta y la valoración aún cerrada.', 'Encargo listo para compartir pantalla.', 'Anuncia 20-30 minutos al empezar.'],
  },
};
