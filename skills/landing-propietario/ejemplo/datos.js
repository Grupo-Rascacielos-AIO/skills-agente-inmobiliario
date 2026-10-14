// EJEMPLO con datos FICTICIOS (agente, agencia, vivienda y cifras inventados).
// Las «fotos» son ilustraciones: en una landing real van las fotos de la vivienda.
window.LANDING = {
  titulo: 'Propuesta para Marta · Piso en Ruzafa',

  // Copiado tal cual de ~/.claude/mi-marca-inmobiliaria.md (logo y foto copiados a la carpeta marca/)
  marca: {
    nombre: 'Lucía Ferrer',
    agencia: 'Casa Norte Inmobiliaria',
    telefono: '+34 600 000 000',
    whatsapp: '34600000000',
    email: 'hola@ejemplo.com',
    zona: 'Ruzafa y Ensanche, Valencia',
    color_principal: '#1F3A34',
    color_secundario: '#F3EDE3',
    color_acento: '#C8643B',
    tipografia_titulos: 'Fraunces',
    tipografia_texto: 'DM Sans',
    logo: 'marca/logo-claro.svg',
    foto: 'marca/foto-agente.svg',
    tono: 'cercano y profesional',
    estilo: 'elegante'
  },

  propietario: 'Marta',

  inmueble: {
    titulo: 'Tu piso en Ruzafa, presentado como se *merece*.',
    lema: 'Un plan concreto para venderlo en el mejor precio posible, en unos 60-90 días y sin que tengas que estar pendiente de nada.',
    zona: 'Ruzafa, Valencia',
    m2: 65, habitaciones: 2, banos: 1, planta: '3ª',
    precio: '245.000 €', precioNota: 'precio orientativo',
    extras: ['Ascensor', 'Balcón', 'Reformado'],
    descripcion: 'Piso exterior de 65 m² en una calle tranquila a dos minutos del mercado. Salón-comedor de casi 21 m² con ventanal, cocina independiente, dos dormitorios, baño con ducha y balcón a la calle. Reformado hace cinco años y listo para entrar a vivir.',
    portada: 'fotos/salon.svg',
    fotos: [
      { src: 'fotos/salon.svg', t: 'Salón-comedor' },
      { src: 'fotos/cocina.svg', t: 'Cocina' },
      { src: 'fotos/dormitorio.svg', t: 'Dormitorio principal' },
      { src: 'fotos/bano.svg', t: 'Baño' },
      { src: 'fotos/despacho.svg', t: 'Dormitorio 2 / despacho' },
      { src: 'fotos/balcon.svg', t: 'Balcón' }
    ],
    plano3d: true   // hay plano → sección 3D (plano-data.js + plano3d.js en esta carpeta)
  },

  puntosFuertes: [
    { t: 'Luz todo el día', d: 'Exterior y con ventanal en el salón: la primera foto del anuncio se vende sola.' },
    { t: 'Listo para entrar', d: 'Reformado hace cinco años. El comprador no tiene que sumar obra al precio.' },
    { t: 'La zona que buscan', d: 'Ruzafa es de lo más pedido por parejas jóvenes y teletrabajadores: comercio, ocio y transporte a pie.' },
    { t: 'Un segundo dormitorio flexible', d: 'Funciona como despacho o habitación de invitados: lo enseñaremos de las dos formas.' },
    { t: 'Balcón a la calle', d: 'Un espacio exterior pequeño pero muy valorado en el centro.' },
    { t: 'Ascensor y gastos bajos', d: 'Tercera planta con ascensor y comunidad económica: dos objeciones menos.' }
  ],

  plan: {
    titulo: 'Estar publicado no es *estar vendiendo*.',
    texto: 'Tu casa no va a ser un anuncio más. Este es el plan para que la vea quien la puede comprar, con la mejor imagen posible.',
    pilares: [
      { icono: 'camara', t: 'Fotos profesionales', d: 'Sesión con luz natural, gran angular y vídeo corto para redes. La foto decide el primer clic.' },
      { icono: 'sofa', t: 'Home staging virtual', d: 'Decoramos digitalmente las estancias que lo necesiten para que el comprador se imagine viviendo allí.' },
      { icono: 'cubo', t: 'Plano en 3D', d: 'Una maqueta interactiva que el comprador puede girar y amueblar antes de pedir la visita.' },
      { icono: 'megafono', t: 'Portales y redes', d: 'Anuncio destacado en los principales portales y campañas segmentadas en Instagram y Facebook por zona e intereses.' },
      { icono: 'personas', t: 'Base de compradores', d: 'Antes de publicar, se la enseño a los compradores que ya tengo buscando en la zona.' },
      { icono: 'puerta', t: 'Jornada de puertas abiertas', d: 'Concentramos visitas en una mañana para crear demanda y comparar ofertas con calma.' }
    ]
  },

  anuncio: {
    titulo: 'Así la va a ver *tu comprador*.',
    titular: 'Piso exterior con balcón en Ruzafa',
    gancho: 'Luz, balcón y listo para entrar. En Ruzafa.',
    copy: 'Tu próximo hogar a dos minutos del mercado. 2 dormitorios, ascensor y reformado. ¿Lo vemos esta semana?'
  },

  calendarioTitulo: '90 días, *paso a paso*.',
  calendario: [
    { dias: 'Días 1-30', t: 'Preparar y lanzar', items: ['Valoración con datos de ventas reales de la zona', 'Sesión de fotos, vídeo y plano 3D', 'Home staging virtual', 'Presentación a mi base de compradores', 'Publicación en portales y redes'] },
    { dias: 'Días 31-60', t: 'Visitas y ofertas', items: ['Visitas filtradas: solo compradores con financiación', 'Jornada de puertas abiertas', 'Ajuste del anuncio según lo que diga el mercado', 'Negociación de ofertas contigo'] },
    { dias: 'Días 61-90', t: 'Cerrar bien', items: ['Arras y revisión de documentación', 'Acompañamiento con banco y tasación', 'Coordinación con notaría', 'Firma y entrega de llaves'] }
  ],

  informe: {
    titulo: 'Siempre sabrás *qué está pasando*.',
    semana: 3,
    kpis: [['2.480', 'visualizaciones'], ['38', 'contactos'], ['9', 'visitas'], ['2', 'ofertas']],
    barras: [28, 41, 37, 60, 72, 86, 100],
    nota: 'Lo que dicen los compradores: les encanta la luz del salón; dos preguntan si el balcón admite toldo.'
  },

  agente: {
    titulo: 'Soy Lucía, y vendo *en tu barrio*.',
    bio: 'Llevo ocho años vendiendo viviendas en Ruzafa y el Ensanche. Trabajo con pocas casas a la vez para dedicar a cada una el tiempo que necesita, y te informo cada semana de todo lo que pasa.',
    cifras: [['8', 'años en la zona'], ['120+', 'viviendas vendidas'], ['47', 'días de media']],
    frase: 'Tu casa no es un anuncio más. Es tu siguiente etapa.'
  },

  cta: {
    titulo: 'Solo falta *tu sí*, Marta.',
    texto: 'Escríbeme o llámame y lo vemos juntas, sin compromiso. Si te encaja, empezamos esta misma semana.',
    mensajeWhatsApp: 'Hola Lucía, he visto la propuesta para mi piso y me gustaría hablarlo.'
  },

  aviso: 'Ejemplo con datos ficticios. Propuesta privada para la propietaria.'
};
