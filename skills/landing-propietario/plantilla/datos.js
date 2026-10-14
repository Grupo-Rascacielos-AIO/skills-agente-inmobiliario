// DATOS DE LA LANDING · lo único que se rellena por cada vivienda.
// - marca: copiar los campos de ~/.claude/mi-marca-inmobiliaria.md. Logo y foto: copiar los archivos a marca/ y poner aquí la ruta relativa.
// - Texto entre *asteriscos* = palabra destacada (cursiva y color de acento).
// - Sin plano → plano3d: false (la landing queda solo con fotos).
// - Lo que esté entre [corchetes] hay que sustituirlo. Si un dato no se sabe, se deja vacío ('' o 0) y no sale.
// - No inventar cifras del agente (años, ventas, días): si el agente no las da, dejar cifras: [].
window.LANDING = {
  titulo: 'Propuesta para [Propietario] · [Tipo de vivienda] en [Zona]',

  marca: {
    nombre: '[Nombre del agente]',
    agencia: '[Agencia]',
    telefono: '[+34 600 000 000]',
    whatsapp: '[34600000000]',          // solo números, con prefijo de país
    email: '[email]',
    zona: '[Zona de trabajo]',
    color_principal: '#1F3A34',         // oscuro: fondos de secciones y textos
    color_secundario: '#F3EDE3',        // claro: fondo general
    color_acento: '#C8643B',            // botones y detalles
    tipografia_titulos: 'Fraunces',     // nombre exacto de Google Fonts
    tipografia_texto: 'DM Sans',
    logo: 'marca/logo.png',             // mejor en versión clara: va sobre la foto de portada
    foto: 'marca/foto.jpg',
    tono: 'cercano y profesional',
    estilo: 'elegante'                  // elegante | moderno | minimalista | calido
  },

  propietario: '[Nombre del propietario]',

  inmueble: {
    titulo: 'Tu [piso/casa] en [zona], presentado como se *merece*.',
    lema: 'Un plan concreto para venderlo en el mejor precio posible y sin que tengas que estar pendiente de nada.',
    zona: '[Barrio, ciudad]',
    m2: 0, habitaciones: 0, banos: 0, planta: '',
    precio: '', precioNota: 'precio orientativo',
    extras: ['[Extra 1]', '[Extra 2]', '[Extra 3]'],   // ascensor, terraza, garaje, piscina…
    descripcion: '[2-4 frases: qué es, dónde está, lo mejor que tiene y en qué estado está]',
    portada: 'fotos/01.jpg',            // la foto más luminosa (normalmente el salón)
    fotos: [                            // 4-7 fotos; la primera sale grande
      { src: 'fotos/01.jpg', t: '[Salón]' },
      { src: 'fotos/02.jpg', t: '[Cocina]' },
      { src: 'fotos/03.jpg', t: '[Dormitorio]' },
      { src: 'fotos/04.jpg', t: '[Baño]' }
    ],
    plano3d: false                      // true si hay plano: poner plano-data.js y plano3d.js en esta carpeta
  },

  puntosFuertes: [                      // 3 o 6 (se ven en filas de 3)
    { t: '[Punto fuerte 1]', d: '[Por qué le importa al comprador]' },
    { t: '[Punto fuerte 2]', d: '[...]' },
    { t: '[Punto fuerte 3]', d: '[...]' }
  ],

  plan: {
    titulo: 'Estar publicado no es *estar vendiendo*.',
    texto: 'Tu casa no va a ser un anuncio más. Este es el plan para que la vea quien la puede comprar, con la mejor imagen posible.',
    // iconos disponibles: camara, sofa, cubo, megafono, personas, puerta, informe, precio
    pilares: [
      { icono: 'camara', t: 'Fotos profesionales', d: 'Sesión con luz natural, gran angular y vídeo corto para redes. La foto decide el primer clic.' },
      { icono: 'sofa', t: 'Home staging virtual', d: 'Decoramos digitalmente las estancias que lo necesiten para que el comprador se imagine viviendo allí.' },
      { icono: 'megafono', t: 'Portales y redes', d: 'Anuncio destacado en los principales portales y campañas segmentadas en redes por zona e intereses.' },
      { icono: 'personas', t: 'Base de compradores', d: 'Antes de publicar, se la enseño a los compradores que ya tengo buscando en la zona.' },
      { icono: 'puerta', t: 'Jornada de puertas abiertas', d: 'Concentramos visitas en una mañana para crear demanda y comparar ofertas con calma.' },
      { icono: 'informe', t: 'Informe semanal', d: 'Cada semana sabrás cuánta gente la ha visto, cuántos han preguntado y qué opinan.' }
      // si hay plano 3D, cambiar uno por: { icono: 'cubo', t: 'Plano en 3D', d: 'Una maqueta interactiva que el comprador puede girar y amueblar antes de pedir la visita.' }
    ]
  },

  anuncio: {
    titulo: 'Así la va a ver *tu comprador*.',
    titular: '[Titular del anuncio en el portal: tipo + lo mejor + zona]',
    gancho: '[Frase corta para la foto de redes, 6-9 palabras]',
    copy: '[Texto del anuncio en redes, 1-2 frases con llamada a la visita]'
  },

  calendarioTitulo: '90 días, *paso a paso*.',
  calendario: [
    { dias: 'Días 1-30', t: 'Preparar y lanzar', items: ['Valoración con datos de ventas reales de la zona', 'Sesión de fotos y vídeo', 'Home staging virtual', 'Presentación a mi base de compradores', 'Publicación en portales y redes'] },
    { dias: 'Días 31-60', t: 'Visitas y ofertas', items: ['Visitas filtradas: solo compradores con financiación', 'Jornada de puertas abiertas', 'Ajuste del anuncio según lo que diga el mercado', 'Negociación de ofertas contigo'] },
    { dias: 'Días 61-90', t: 'Cerrar bien', items: ['Arras y revisión de documentación', 'Acompañamiento con banco y tasación', 'Coordinación con notaría', 'Firma y entrega de llaves'] }
  ],

  informe: {
    titulo: 'Siempre sabrás *qué está pasando*.',
    semana: 3,
    kpis: [['2.480', 'visualizaciones'], ['38', 'contactos'], ['9', 'visitas'], ['2', 'ofertas']],   // ilustrativas (la página dice «Datos de ejemplo»)
    barras: [28, 41, 37, 60, 72, 86, 100],
    nota: 'Lo que dicen los compradores: [comentario de ejemplo sobre la vivienda].'
  },

  agente: {
    titulo: 'Soy [Nombre], y vendo *en tu barrio*.',
    bio: '[2-3 frases: experiencia en la zona, cómo trabaja y qué gana el propietario con ello]',
    cifras: [],                         // p. ej. [['8', 'años en la zona'], ['120+', 'viviendas vendidas']] SOLO si son reales
    frase: ''                           // opcional
  },

  cta: {
    titulo: 'Solo falta *tu sí*, [Propietario].',
    texto: 'Escríbeme o llámame y lo hablamos con calma, sin compromiso.',
    mensajeWhatsApp: 'Hola [Agente], he visto la propuesta para mi casa y me gustaría hablarlo.'
  },

  aviso: 'Propuesta privada para el propietario. Las fotos se usan solo en esta presentación.'
};
