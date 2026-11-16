/* EJEMPLO FICTICIO · Perfil 6 · Inversor (piso alquilado).
   Agente, propietario, dirección y testigos inventados. Fotos: Unsplash (licencia libre). */
window.DATOS = {
  marca: {
    nombre: 'Carlos Medina', agencia: 'Medina Patrimonio', telefono: '600 000 006', whatsapp: '34600000006',
    email: 'carlos@ejemplo.com', zona: 'Sevilla',
    color_principal: '#101820', color_secundario: '#F1EEE7', color_acento: '#B8873B',
    tipografia_titulos: 'Libre Caslon Text', tipografia_texto: 'Inter',
    logo: '', foto: '', tono: 'profesional', estilo: 'elegante',
  },
  cita: { fecha_texto: 'Miércoles 25 de noviembre', fecha_corta: 'Mié 25 nov', hora: '10:00', canal: 'Google Meet', enlace: '', asistentes: 'Tomás' },
  propietarios: { nombres: 'Tomás', tratamiento: 'tu' },
  perfil: { numero: 6, nombre: 'Inversor, o piso vacío o alquilado' },
  triaje: [
    { etiqueta: 'Por qué vendes', texto: 'Quieres pasar el dinero a otra inversión con más rentabilidad.' },
    { etiqueta: 'Cómo está', texto: 'Alquilado por 950 € al mes, con contrato hasta junio de 2027.' },
    { etiqueta: 'Quién decide', texto: 'Tú. Lo compraste solo en 2012.' },
    { etiqueta: 'Lo que te preocupa', texto: 'Cuánto te queda de verdad después de impuestos y si vender con inquilino te hace perder.' },
  ],
  casa: {
    direccion: 'Calle Naranjo, 9 · 3.º A', direccion_corta: 'Calle Naranjo', barrio: 'Nervión', ciudad: 'Sevilla',
    tipo: 'Piso', m2_construidos: 90, habitaciones: 3, banos: 2, planta: '3.ª', ascensor: true, exterior: true, anio: 1988,
    estado: 'Buen estado, alquilado',
    extras: ['Alquilado hasta junio de 2027', 'Ascensor', 'Aire acondicionado', 'Exterior', 'Trastero'],
    descripcion: 'Un tercero con ascensor en Nervión, en buen estado y alquilado hasta junio de 2027. Tres dormitorios, dos baños y trastero.',
    foto_portada: 'fotos/salon.jpg', foto_adelanto: 'fotos/salon.jpg',
    fotos: [
      { src: 'fotos/salon.jpg', pie: 'Salón' },
      { src: 'fotos/comedor.jpg', pie: 'Comedor' },
      { src: 'fotos/estar.jpg', pie: 'Zona de estar' },
      { src: 'fotos/edificio.jpg', pie: 'El edificio' },
    ],
  },
  angulo: {
    tipo: 'partidas',
    kicker: 'Tus números',
    titulo: 'Lo que te queda <em>limpio</em>',
    entradilla: 'Lo que importa no es el precio de venta, sino lo que te queda después. Estas son las partidas; las cifras las vemos juntos en la llamada.',
    items: [
      { titulo: 'Precio de cierre', texto: 'En la llamada' },
      { titulo: 'Honorarios de la agencia', texto: 'En la llamada' },
      { titulo: 'Plusvalía municipal', texto: 'Orientativo · tu gestor' },
      { titulo: 'Cancelación de la hipoteca, si queda', texto: 'En la llamada' },
      { titulo: 'IRPF por la ganancia', texto: 'Orientativo · tu gestor' },
      { titulo: 'Lo que te queda limpio', texto: 'Orientativo', total: true },
    ],
  },
  zona: {
    titulo: 'Nervión, <em>visto por quien compra</em>',
    datos: [
      { titulo: 'Metro a 5 minutos', texto: 'Y el centro comercial a diez.' },
      { titulo: 'Dos compradores', texto: 'Inversores que lo quieren con inquilino y familias que lo quieren vacío.' },
      { titulo: 'Alquiler estable', texto: 'Mucha demanda de alquiler de larga duración.' },
      { titulo: 'Hospital y universidad', texto: 'A menos de 15 minutos.' },
    ],
  },
  metodo: [
    { titulo: 'Los números primero', texto: 'Precio, gastos y rentabilidad para quien compre con inquilino.' },
    { titulo: 'Al comprador que toca', texto: 'A inversores con inquilino, o vacío en junio de 2027 si te compensa esperar.' },
    { titulo: 'Inquilino tranquilo', texto: 'Visitas pactadas con él y con aviso.' },
    { titulo: 'Hasta la notaría', texto: 'Arras, papeles y firma. Una sola persona responsable.' },
  ],
  valoracion: {
    testigos: [
      { id: 'T1', direccion: 'C/ Limonero', situacion: 'vendido', precio: 245000, m2: 88, dias: 50, coef: 1, nota: 'Parecido' },
      { id: 'T2', direccion: 'C/ Azahar', situacion: 'vendido', precio: 262000, m2: 95, dias: 65, coef: 1, nota: 'Parecido, vacío' },
      { id: 'T3', direccion: 'Av. de la Palmera Baja', situacion: 'en_venta', precio: 279000, m2: 92, dias: 30, coef: 0.96, nota: 'Reformado' },
      { id: 'T4', direccion: 'C/ Granado', situacion: 'en_venta', precio: 229000, m2: 85, dias: 110, bajadas: 1, coef: 1.02, nota: 'Sin trastero' },
      { id: 'T5', direccion: 'C/ Albahaca', situacion: 'vendido', precio: 236000, m2: 90, dias: 40, coef: 1.03, nota: 'Vendido con inquilino' },
      { id: 'T6', direccion: 'C/ Jacaranda', situacion: 'en_venta', precio: 299000, m2: 100, dias: 25, coef: 0.98, nota: 'Más grande' },
    ],
    parametros: {},
  },
  siguientes: [
    { titulo: 'Hoy', texto: 'Vemos las partidas con números y las dos opciones: con inquilino o vacío.' },
    { titulo: 'Esta semana', texto: 'Confirmas los impuestos con tu gestor con las cifras que te paso.' },
    { titulo: 'Si te encaja', texto: 'Firmamos el encargo y hablo con el inquilino para las visitas.' },
  ],
  falta: ['Precio de compra de 2012 y gastos de entonces (para la ganancia).', 'Hipoteca pendiente, si queda.', 'Contrato de alquiler (duración y fianza).'],
  adelanto: {
    etiqueta: 'Lo que te quedaría limpio al vender',
    frase: 'Te he preparado lo que te quedaría limpio después de gastos.',
    detalle: 'Alquilado y en Nervión: interesa a inversores y a familias',
    fotos_extra: ['fotos/comedor.jpg', 'fotos/estar.jpg', 'fotos/edificio.jpg'],
  },
  chuleta: {
    objetivo: 'Salir con la decisión de vender con inquilino o esperar, y día y hora para firmar el encargo.',
    marco: '«Te cuento cómo lo hacemos: primero te pregunto para entender bien qué buscas con la venta, después vemos los números, y al final decides. ¿Te parece bien?»',
    preguntas: [
      '¿Qué vas a hacer con el dinero?',
      '¿Cuánto te deja limpio al año ahora?',
      '¿Te importa vender con el inquilino dentro?',
      '¿Queda hipoteca?',
      '¿Qué rentabilidad buscas en la siguiente inversión?',
    ],
    objeciones: [
      { dice: '«Solo vendo si me pagan [cifra].»', respondes: '«Te enseño qué ha firmado un inversor en Nervión y qué rentabilidad le deja. Si no cuadra con tu cifra, lo sabrás hoy, sin perder meses».' },
      { dice: '«Prefiero esperar a junio de 2027, cuando quede vacío.»', respondes: '«Puede tener sentido. Te enseño lo que ganas y lo que dejas de cobrar esperando, y decides con los dos números».' },
    ],
  },
};
