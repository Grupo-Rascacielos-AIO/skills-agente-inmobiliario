/* Ficha de datos · presentacion.html + adelanto.html + chuleta.html
   Todo lo que cambia por propietario va aquí. Las plantillas no se tocan.
   NUNCA inventes: lo que no tengas, vacío y apuntado en `falta`. */
window.DATOS = {
  // muestra: true,                       // presentación genérica: sin tu nombre ni contactos y con los importes tapados

  /* ---------- Marca (de ~/.claude/mi-marca-inmobiliaria.md) ---------- */
  marca: {
    nombre: '[Nombre del agente]',          // string · obligatorio
    agencia: '[Agencia]',                   // string · opcional
    telefono: '[600 000 000]',              // string · opcional (botón «llamar»)
    whatsapp: '[34600000000]',              // string, solo números con prefijo · opcional (botón WhatsApp)
    email: '[email]',                       // string · opcional
    zona: '[Zona de trabajo]',              // string · opcional (firma)
    color_principal: '#1F2A33',             // hex OSCURO (encima va texto blanco) · defecto '#1F2A33'
    color_secundario: '#F4EFE8',            // hex claro (fondo) · defecto '#F4EFE8'
    color_acento: '#B5653A',                // hex (botones, cursivas, barras) · defecto '#B5653A'
    tipografia_titulos: 'Newsreader',       // Google Fonts · defecto 'Newsreader'
    tipografia_texto: 'Hanken Grotesk',     // Google Fonts · defecto 'Hanken Grotesk'
    logo: '',                               // ruta relativa · opcional
    foto: '',                               // ruta relativa · opcional (si no, iniciales)
    usuario_redes: '',                      // string · opcional · el @ de los mockups sin «@».
                                            //   Defecto: agencia (o nombre) en minúsculas y sin espacios
    tono: 'cercano',                        // string · lo usa la skill al escribir
    estilo: 'elegante',                     // string · lo usa la skill al escribir
  },

  /* ---------- La cita ---------- */
  cita: {
    fecha_texto: '[Martes 24 de noviembre]',  // string · obligatorio
    fecha_corta: '[Mar 24 nov]',              // string · opcional (cabecera y adelanto)
    hora: '[19:00]',                          // string · obligatorio
    canal: '[Google Meet]',                   // string · chuleta
    enlace: '',                               // string · solo mensajes.md
    asistentes: '[Quién se conecta]',         // string · chuleta
  },

  propietarios: { nombres: '[Clara y Andrés]', tratamiento: 'vosotros' },  // tratamiento: 'tu' | 'vosotros' (defecto)
  perfil: { numero: 5, nombre: '[Primera vez, aún sin publicar]' },        // 1-6, ver perfiles.md

  triaje: [                                   // 2-4 citas con sus palabras
    { etiqueta: 'Por qué vendéis', texto: '[…]' },
  ],

  /* ---------- La casa ---------- */
  casa: {
    direccion: '[Calle …, 14 · 3.º B]',     // string · obligatorio (portada y chuleta)
    direccion_corta: '[Calle …]',           // string · obligatorio (título)
    articulo: '',                           // 'de la' | 'del' | 'de' · opcional (fuerza el artículo)
    barrio: '[Barrio]', ciudad: '[Ciudad]',
    tipo: 'Piso',                           // decide «Vuestro piso», «Tu ático», «Vuestra casa»
    palabra: '',                            // opcional · fuerza la palabra del título
    m2_construidos: 0, m2_utiles: 0,        // m2_utiles: opcional (solo chuleta y cifras si no hay construidos)
    habitaciones: 0, banos: 0,
    planta: '', ascensor: false, exterior: false, anio: 0,
    parcela_m2: 0,                          // chalets
    estado: '',                             // p. ej. 'Reformado en 2019'
    extras: [],                             // chips
    descripcion: '',                        // 2-3 frases, solo datos reales
    foto_portada: 'fotos/salon.jpg',        // la más luminosa
    foto_adelanto: 'fotos/salon.jpg',       // defecto: foto_portada
    fotos: [                                // 4-10 · { src, pie } · el orden es el de la galería
      { src: 'fotos/salon.jpg', pie: 'Salón' },
    ],
    portal: { url: '', publicado_desde: '', precio_publicado: 0 },  // opcional · SOLO chuleta
                                            //   (nunca se pinta en la presentación ni en el adelanto)
  },

  /* ---------- Plano 3D ----------
     activo:true exige en la carpeta plano-data.js (trazado con la skill plano-3d) y plano3d.js
     (copia de plantilla/plano3d.js). Sin plano: activo:false y la sección no existe. */
  plano: {
    activo: false,                                  // bool · defecto false
    titulo: 'Entra antes de <em>entrar</em>',       // defecto
    texto: 'Así entiende la distribución quien la vea antes de pedir la visita. Gírala, acércate y amuéblala con un toque.',  // defecto
    estilo_inicial: '',                             // '' | 'nordico' | 'moderno' · defecto '' (sin muebles)
    nota: 'Maqueta hecha a partir del plano. Medidas aproximadas y mobiliario orientativo.',  // defecto
  },

  /* ---------- Ángulo del perfil ---------- */
  angulo: {
    tipo: 'tarjetas',                       // 'tarjetas' | 'linea' | 'pasos' | 'partidas'
    kicker: '', titulo: '', entradilla: '',
    items: [ { titulo: '', texto: '', cuando: '' /* solo linea */, total: false /* solo partidas */ } ],
    papeles: [],                            // solo 'pasos'
    nota: '',                               // 'pasos' y 'partidas' ponen su aviso fiscal si va vacío
  },

  /* ---------- Plan de marketing ----------
     ESTÁNDAR: si omites `plan`, sale todo lo de abajo tal cual (vive en comun.js como PLAN_ESTANDAR).
     Cada subclave que escribas SUSTITUYE a la estándar entera. `plan: false` oculta #plan y #calendario.
     Los textos estándar son impersonales (valen para tú y vosotros), salvo el carril «Contigo/Con vosotros». */
  plan: {
    kicker: 'El plan',
    titulo: 'Estar publicado no es <em>estar vendiendo</em>',
    entradilla: 'La casa no va a ser un anuncio más. Este es el plan para que la vea quien la puede comprar, con la mejor imagen posible.',

    // Iconos: camara · sofa · cubo · megafono · personas · puerta · informe · precio
    // Si plano.activo y no has escrito plan.pilares, comun.js cambia el pilar 'sofa' por el de 'cubo' (abajo).
    pilares: [
      { icono: 'camara',   t: 'Fotos y vídeo que paran el scroll', d: 'Sesión con luz natural, gran angular y un vídeo corto en vertical para redes. La primera foto decide el clic.' },
      { icono: 'sofa',     t: 'Decoración virtual', d: 'Las estancias vacías o anticuadas se decoran en digital para que quien la vea se imagine viviendo allí. Siempre avisado como «decoración virtual».' },
      { icono: 'megafono', t: 'Portales y redes, bien dirigidos', d: 'Anuncio destacado en los portales y campañas en redes para quien busca en la zona y en ese rango de precio.' },
      { icono: 'personas', t: 'Compradores filtrados', d: 'Cada contacto se llama el mismo día y se comprueba si puede comprar (financiación y plazos) antes de enseñarle la casa.' },
      { icono: 'puerta',   t: 'Visitas agrupadas', d: 'Las visitas se concentran en pocos días, o en una jornada de puertas abiertas, para crear interés y comparar ofertas con calma.' },
      { icono: 'informe',  t: 'Informe cada lunes', d: 'Cuánta gente la ha visto, cuántos han preguntado, quién la ha visitado y qué opinan. Sin tener que llamar para preguntar.' },
    ],
    pilar_plano: { icono: 'cubo', t: 'Plano 3D y decoración virtual', d: 'Una maqueta que se gira y se amuebla antes de pedir la visita, y las estancias vacías decoradas en digital.' },

    // Opcional · defecto [] (no sale). Solo si el agente sabe quién compra en la zona (zona.datos): NUNCA inventado.
    compradores: [ /* { t: 'Parejas que vienen de alquiler', d: '…', argumento: 'Terraza y 3 dormitorios' } */ ],

    embudo: {
      titulo: '',                           // defecto: `De ${pasos[0].n} personas a <em>un</em> comprador`
      texto: 'Para vender una casa basta con una persona. Pero hay que encontrarla entre miles y filtrar a las demás antes de que entren en el salón.',
      de_ejemplo: true,                     // bool · defecto true → etiqueta «Cifras de ejemplo» + nota. Solo false con datos reales del agente
      nota: 'Cifras de ejemplo: cada casa tiene las suyas. Las reales las verás cada lunes en el informe.',
      pasos: [                              // 5-8 · n es string (admite '2–3') · el último lleva final:true
        { n: '20.000', t: 'Ven el anuncio',             d: 'En portales y redes, en la zona y en su rango de precio' },
        { n: '1.500',  t: 'Abren la ficha y el vídeo',  d: 'Interés real en la casa' },
        { n: '80',     t: 'Piden información',          d: 'Se les llama el mismo día' },
        { n: '30',     t: 'Pasan el filtro',            d: 'Presupuesto y financiación comprobados' },
        { n: '12',     t: 'Visitan la casa',            d: 'Solo quien puede comprar' },
        { n: '2–3',    t: 'Hacen oferta',               d: 'Por escrito' },
        { n: '1',      t: 'Compra',                     d: 'Al mejor precio y en las mejores condiciones', final: true },
      ],
    },

    gantt: {
      kicker: 'El calendario',
      titulo: '90 días, <em>semana a semana</em>',
      texto: 'Sabrás en cada momento qué toca y qué está hecho.',
      semanas: 13,                          // columnas S0…S12 · desde/hasta son índices INCLUSIVOS 0-12
      fases: [
        { t: 'Preparar',          desde: 0, hasta: 1 },
        { t: 'Lanzar',            desde: 2, hasta: 4 },
        { t: 'Visitas',           desde: 5, hasta: 8 },
        { t: 'Negociar y cerrar', desde: 9, hasta: 12 },
      ],
      // tono: 'principal' (fondo --c-principal, texto claro) · 'acento' (fondo --c-acento, texto blanco)
      //       'suave' (acento 16 % sobre papel) · 'claro' (blanco con borde --linea)
      carriles: [
        { t: 'La casa',     sub: 'Imagen',            barras: [ { desde: 0, hasta: 1,  t: 'Fotos, vídeo, decoración virtual y plano', tono: 'principal' },
                                                                 { desde: 2, hasta: 12, t: 'Anuncio vivo: se ajusta con lo que preguntan', tono: 'claro' } ] },
        { t: 'Redes',       sub: 'Anuncios',          barras: [ { desde: 1, hasta: 3,  t: 'Lanzamiento', tono: 'acento' },
                                                                 { desde: 4, hasta: 8,  t: 'Se queda el anuncio que mejor funciona', tono: 'suave' },
                                                                 { desde: 9, hasta: 12, t: 'Recordatorio a quien ya la vio', tono: 'claro' } ] },
        { t: 'Portales',    sub: 'Ficha destacada',   barras: [ { desde: 2, hasta: 12, t: 'Ficha destacada en los portales', tono: 'suave' } ] },
        { t: 'Compradores', sub: 'Llamada y filtro',  barras: [ { desde: 2, hasta: 4,  t: 'Llamada el mismo día y filtro de financiación', tono: 'acento' },
                                                                 { desde: 5, hasta: 8,  t: 'Visitas agrupadas', tono: 'suave' } ] },
        { t: 'Ofertas',     sub: 'Y cierre',          barras: [ { desde: 8, hasta: 10, t: 'Ofertas por escrito y negociación', tono: 'acento' },
                                                                 { desde: 11, hasta: 12, t: 'Arras, banco y notaría', tono: 'principal' } ] },
        { t: '{Contigo}',   sub: 'Informe y decisiones', barras: [ { desde: 0, hasta: 0, t: 'Encargo', tono: 'principal' },
                                                                    { desde: 4, hasta: 4, t: 'Revisión con datos', tono: 'acento' } ],
          hitos: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12] },   // un punto por semana = informe del lunes
        // '{Contigo}' lo cambia comun.js por 'Contigo' o 'Con vosotros' según el tratamiento
      ],
    },
  },

  /* ---------- Mockups de su casa ----------
     Los textos los escribe la skill (son para COMPRADORES, no para el propietario): solo datos reales de la casa,
     sin precio, sin promesas de plazo. Si falta un texto, el mockup sale con el texto por defecto indicado.
     `mockups: false` oculta la sección. */
  mockups: {
    kicker: 'Así la verán',
    titulo: 'Así la va a ver <em>quien la compre</em>',
    texto: 'Un adelanto del diseño. Las piezas de verdad salen de la sesión de fotos.',
    portal: {                               // ficha de portal en un móvil (portal genérico, sin logos de portales reales)
      titular: '',                          // ≤ 70 car. · tipo + lo mejor + zona. Defecto: `${casa.tipo} en ${casa.barrio}`
      texto: '',                            // ≤ 110 car. Defecto: casa.descripcion recortada
      foto: '',                             // defecto: casa.foto_portada
    },                                      // precio: «Lo vemos juntos» hasta abrir la valoración → salida recomendada
    post: {                                 // publicación 4:5 de red social (interfaz genérica, sin logos)
      foto: '',                             // defecto: casa.fotos[1] (o la portada)
      gancho: '',                           // 6-9 palabras sobre la foto. Defecto: casa.extras[0] o casa.tipo
      texto: '',                            // 1-2 frases + llamada a pedir visita. Defecto: ''
    },
    story: {                                // story / reel 9:16
      foto: '',                             // defecto: casa.fotos[2] (o la portada)
      posicion: 'center',                   // background-position para el recorte vertical
      texto: '',                            // ≤ 8 palabras, grande. Defecto: mockups.post.gancho
      boton: 'Pide tu visita',              // pegatina de enlace · defecto
    },
    portada: {                              // portada del vídeo de la casa (9:16, con botón de play)
      foto: '',                             // defecto: casa.foto_adelanto
      etiqueta: 'En venta',                 // etiqueta de arriba (+ « · barrio») · defecto 'En venta'
      titulo: '',                           // ≤ 5 palabras. Defecto: `${casa.tipo} en ${casa.barrio}`
      detalle: '',                          // defecto: adelanto.detalle
    },
  },

  /* ---------- Zona, método, valoración, siguientes ---------- */
  zona: { titulo: '', datos: [ { titulo: '', texto: '' } ] },          // 3-4 datos REALES del agente
  metodo: [ { titulo: '', texto: '' } ],                                 // 4-5 pasos
  valoracion: {
    // Testigos: pisos parecidos (vendidos o a la venta). x/y = metros al este/norte de la casa, aproximados
    // (sin número de portal); si no los tienes, pon solo dist y se reparten alrededor en el mapa.
    testigos: [ { id: 'T1', direccion: '', situacion: 'vendido' /* | 'en_venta' */, precio: 0, m2: 0, dist: 0, x: null, y: null, dias: 0, bajadas: 0, coef: 1, nota: '', descartar: '' } ],
    parametros: {},                         // ver valorar() en comun.js
    // Opcional. Si la valoración ya viene hecha (de informe-valoracion o de tu herramienta), pon sus cifras y mandan sobre el cálculo:
    // resultado: { precio: 0 /* salida */, valor: 0 /* de mercado */, min: 0, max: 0, pedido: 0 /* €/m² medio que piden */ },
    // Opcional. Precio firmado en notaría en la zona; si no lo tienes, la sección de notaría no sale:
    // notaria: { ventas: 0, eurm2: 0, radio: 1000, meses: [ { mes: "ene '26", v: 0 } ] },
    // Opcional: m2 de la casa si no es casa.m2_construidos, y una etiqueta junto al título (p. ej. «Datos de notaría y portales»):
    // m2: 0, origen: '',
  },
  siguientes: [ { titulo: 'Hoy', texto: '' } ],                         // 3

  /* ---------- Solo chuleta ---------- */
  falta: [],                                // lo que no tienes o has supuesto (también: «sin plano» si no hay)

  /* ---------- Adelanto ---------- */
  adelanto: { etiqueta: '', frase: '', detalle: '', fotos_extra: [], foto_posicion: '' },

  /* ---------- Chuleta ---------- */
  chuleta: { objetivo: '', marco: '', preguntas: [], objeciones: [ { dice: '', respondes: '' } ] },
};
