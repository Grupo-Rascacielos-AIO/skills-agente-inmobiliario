/* Funciones compartidas por presentacion.html, adelanto.html y chuleta.html.
   No hace falta tocar este archivo: todo sale de datos.js (window.DATOS). */
(function () {
  const D = window.DATOS || {};
  const M = D.marca || {};

  const eur = (n) =>
    n == null || isNaN(n) ? '—' : Math.round(n).toLocaleString('es-ES') + ' €';
  const num = (n, dec = 0) =>
    n == null || isNaN(n) ? '—' : n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const esc = (s) =>
    String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const iniciales = (s) =>
    String(s || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0].toUpperCase())
      .join('');

  /* Marca: colores y tipografías por variables CSS */
  function aplicarMarca() {
    const r = document.documentElement.style;
    r.setProperty('--c-principal', M.color_principal || '#1F2A33');
    r.setProperty('--c-secundario', M.color_secundario || '#F4EFE8');
    r.setProperty('--c-acento', M.color_acento || '#B5653A');
    const ft = M.tipografia_titulos || 'Newsreader';
    const fx = M.tipografia_texto || 'Hanken Grotesk';
    r.setProperty('--f-titulos', `'${ft}', Georgia, serif`);
    r.setProperty('--f-texto', `'${fx}', system-ui, sans-serif`);
    const fam = (f, pesos) => `family=${encodeURIComponent(f).replace(/%20/g, '+')}:${pesos}`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?' +
      fam(ft, 'ital,wght@0,400;0,500;0,600;1,400;1,500') +
      '&' +
      fam(fx, 'wght@400;500;600;700') +
      '&display=swap';
    document.head.appendChild(link);
    if (D.casa && D.casa.direccion_corta) document.title = document.title.replace('{casa}', D.casa.direccion_corta);
  }

  /* Valoración: mismo método que la skill informe-valoracion (resumido).
     €/m² corregido = precio / m² × coef × negociación; vendidos pesan doble. */
  function valorar() {
    const V = D.valoracion;
    if (!V || !Array.isArray(V.testigos) || !V.testigos.length) return null;
    const P = Object.assign(
      {
        negociacion_en_venta: 0.95,
        negociacion_largo: 0.92,
        dias_largo: 90,
        peso_vendido: 2,
        ajuste_maximo: 0.25,
        desviacion_maxima: 0.15,
        margen_salida: 0.05,
        margen_minimo: 0.05,
      },
      V.parametros || {}
    );
    const m2 = Number(D.casa && D.casa.m2_construidos);
    const ts = V.testigos.map((t, i) => {
      const vendido = t.situacion === 'vendido';
      const bruto = t.precio / t.m2;
      const coef = t.coef == null ? 1 : Number(t.coef);
      const neg = vendido ? 1 : t.dias >= P.dias_largo || (t.bajadas || 0) > 0 ? P.negociacion_largo : P.negociacion_en_venta;
      return Object.assign({}, t, { id: t.id || 'T' + (i + 1), vendido, bruto, coef, neg, corr: bruto * coef * neg, motivo: t.descartar || null });
    });
    ts.forEach((t) => {
      if (!t.motivo && Math.abs(t.coef - 1) > P.ajuste_maximo) t.motivo = 'Es otro tipo de vivienda: habría que corregirla más de un 25 %';
    });
    const mediana = (a) => {
      const s = a.slice().sort((x, y) => x - y);
      const k = Math.floor(s.length / 2);
      return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2;
    };
    ts.forEach((t) => {
      if (t.motivo) return;
      const otros = ts.filter((o) => o !== t && !o.motivo).map((o) => o.corr);
      if (otros.length >= 3) {
        const md = mediana(otros);
        if (Math.abs(t.corr - md) / md > P.desviacion_maxima) t.motivo = 'Se aleja más de un 15 % del resto de la zona';
      }
    });
    const ok = ts.filter((t) => !t.motivo);
    if (!ok.length || !m2) return { testigos: ts, validos: [], debil: true };
    let sw = 0, s = 0;
    ok.forEach((t) => {
      const w = t.vendido ? P.peso_vendido : 1;
      sw += w;
      s += t.corr * w;
    });
    const eurm2 = s / sw;
    const cierre = P.precio_objetivo || Math.round((eurm2 * m2) / 1000) * 1000;
    let salida = P.precio_salida;
    if (!salida) {
      const x = cierre * (1 + P.margen_salida);
      const base = Math.floor(x / 10000) * 10000 + 9000;
      salida = [base - 10000, base, base + 10000].reduce((a, b) => (Math.abs(b - x) < Math.abs(a - x) ? b : a));
    }
    const minimo = P.precio_minimo || Math.round((cierre * (1 - P.margen_minimo)) / 1000) * 1000;
    const brutos = ts.map((t) => t.bruto);
    const vend = ok.filter((t) => t.vendido && t.dias != null);
    // El «dato real»: el anuncio que más tiempo lleva o más ha bajado
    const largos = ts.filter((t) => !t.vendido).sort((a, b) => (b.bajadas || 0) * 100 + (b.dias || 0) - ((a.bajadas || 0) * 100 + (a.dias || 0)));
    return {
      testigos: ts,
      validos: ok,
      debil: ok.length < 4,
      eurm2,
      cierre,
      salida,
      minimo,
      min: Math.min(...brutos),
      max: Math.max(...brutos),
      dias_vendidos: vend.length ? Math.round(vend.reduce((a, t) => a + t.dias, 0) / vend.length) : null,
      dato_real: largos[0] || null,
    };
  }

  /* «de la Calle…», «del Paseo…». Se puede forzar con casa.articulo ('de la', 'del', 'de'). */
  function deLa(calle) {
    const C = D.casa || {};
    if (C.articulo) return C.articulo;
    return /^(paseo|camino|pasaje|callejón|bulevar|carrer|barrio|polígono)\b/i.test(String(calle || '').trim()) ? 'del' : 'de la';
  }

  /* «Vuestra casa», «Tu ático», «Vuestro chalet»: según casa.tipo (o casa.palabra si se quiere forzar). */
  function suCasa() {
    const C = D.casa || {};
    const vos = (D.propietarios || {}).tratamiento !== 'tu';
    const w = String(C.palabra || C.tipo || 'casa').toLowerCase();
    const fem = /^(casa|vivienda|villa|finca|planta baja|masía|masia|cabaña)/.test(w);
    return (vos ? (fem ? 'Vuestra' : 'Vuestro') : 'Tu') + ' ' + w;
  }

  /* Plan de marketing estándar. Si datos.js no trae `plan`, sale entero.
     Cada subclave de D.plan sustituye a la de aquí; `plan: false` oculta el plan y el calendario. */
  const PLAN_ESTANDAR = {
    kicker: 'El plan',
    titulo: 'Estar publicado no es <em>estar vendiendo</em>',
    entradilla: 'La casa no va a ser un anuncio más. Este es el plan para que la vea quien la puede comprar, con la mejor imagen posible.',
    pilares: [
      { icono: 'camara', t: 'Fotos y vídeo que paran el scroll', d: 'Sesión con luz natural, gran angular y un vídeo corto en vertical para redes. La primera foto decide el clic.' },
      { icono: 'sofa', t: 'Decoración virtual', d: 'Las estancias vacías o anticuadas se decoran en digital para que quien la vea se imagine viviendo allí. Siempre avisado como «decoración virtual».' },
      { icono: 'megafono', t: 'Portales y redes, bien dirigidos', d: 'Anuncio destacado en los portales y campañas en redes para quien busca en la zona y en ese rango de precio.' },
      { icono: 'personas', t: 'Compradores filtrados', d: 'Cada contacto se llama el mismo día y se comprueba si puede comprar (financiación y plazos) antes de enseñarle la casa.' },
      { icono: 'puerta', t: 'Visitas agrupadas', d: 'Las visitas se concentran en pocos días, o en una jornada de puertas abiertas, para crear interés y comparar ofertas con calma.' },
      { icono: 'informe', t: 'Informe cada lunes', d: 'Cuánta gente la ha visto, cuántos han preguntado, quién la ha visitado y qué opinan. Sin tener que llamar para preguntar.' },
    ],
    pilar_plano: { icono: 'cubo', t: 'Plano 3D y decoración virtual', d: 'Una maqueta que se gira y se amuebla antes de pedir la visita, y las estancias vacías decoradas en digital.' },
    compradores: [],
    embudo: {
      titulo: '',
      texto: 'Para vender una casa basta con una persona. Pero hay que encontrarla entre miles y filtrar a las demás antes de que entren en el salón.',
      de_ejemplo: true,
      nota: 'Cifras de ejemplo: cada casa tiene las suyas. Las reales las verás cada lunes en el informe.',
      pasos: [
        { n: '20.000', t: 'Ven el anuncio', d: 'En portales y redes, en la zona y en su rango de precio' },
        { n: '1.500', t: 'Abren la ficha y el vídeo', d: 'Interés real en la casa' },
        { n: '80', t: 'Piden información', d: 'Se les llama el mismo día' },
        { n: '30', t: 'Pasan el filtro', d: 'Presupuesto y financiación comprobados' },
        { n: '12', t: 'Visitan la casa', d: 'Solo quien puede comprar' },
        { n: '2–3', t: 'Hacen oferta', d: 'Por escrito' },
        { n: '1', t: 'Compra', d: 'Al mejor precio y en las mejores condiciones', final: true },
      ],
    },
    gantt: {
      kicker: 'El calendario',
      titulo: '90 días, <em>semana a semana</em>',
      texto: 'Sabrás en cada momento qué toca y qué está hecho.',
      semanas: 13,
      fases: [
        { t: 'Preparar', desde: 0, hasta: 1 },
        { t: 'Lanzar', desde: 2, hasta: 4 },
        { t: 'Visitas', desde: 5, hasta: 8 },
        { t: 'Negociar y cerrar', desde: 9, hasta: 12 },
      ],
      carriles: [
        { t: 'La casa', sub: 'Imagen', barras: [{ desde: 0, hasta: 1, t: 'Fotos, vídeo, decoración virtual y plano', tono: 'principal' }, { desde: 2, hasta: 12, t: 'Anuncio vivo: se ajusta con lo que preguntan', tono: 'claro' }] },
        { t: 'Redes', sub: 'Anuncios', barras: [{ desde: 1, hasta: 3, t: 'Lanzamiento', tono: 'acento' }, { desde: 4, hasta: 8, t: 'Se queda el anuncio que mejor funciona', tono: 'suave' }, { desde: 9, hasta: 12, t: 'Recordatorio a quien ya la vio', tono: 'claro' }] },
        { t: 'Portales', sub: 'Ficha destacada', barras: [{ desde: 2, hasta: 12, t: 'Ficha destacada en los portales', tono: 'suave' }] },
        { t: 'Compradores', sub: 'Llamada y filtro', barras: [{ desde: 2, hasta: 4, t: 'Llamada el mismo día y filtro de financiación', tono: 'acento' }, { desde: 5, hasta: 8, t: 'Visitas agrupadas', tono: 'suave' }] },
        { t: 'Ofertas', sub: 'Y cierre', barras: [{ desde: 8, hasta: 10, t: 'Ofertas por escrito y negociación', tono: 'acento' }, { desde: 11, hasta: 12, t: 'Arras, banco y notaría', tono: 'principal' }] },
        { t: '{Contigo}', sub: 'Informe y decisiones', barras: [{ desde: 0, hasta: 0, t: 'Encargo', tono: 'principal' }, { desde: 4, hasta: 4, t: 'Revisión con datos', tono: 'acento' }], hitos: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12] },
      ],
    },
  };

  /* Textos por defecto de los mockups (lo demás sale de casa, marca y adelanto) */
  const MOCKUPS_ESTANDAR = {
    kicker: 'Así la verán',
    titulo: 'Así la va a ver <em>quien la compre</em>',
    texto: 'Un adelanto del diseño. Las piezas de verdad salen de la sesión de fotos.',
    portada: { etiqueta: 'En venta' },
    story: { posicion: 'center', boton: 'Pide tu visita' },
  };

  const copia = (o) => JSON.parse(JSON.stringify(o));

  /* Plan final: estándar + lo que traiga datos.js (cada subclave sustituye a la estándar) */
  function plan() {
    if (D.plan === false) return null;
    const U = D.plan || {};
    const P = Object.assign(copia(PLAN_ESTANDAR), copia(U));
    P.embudo = Object.assign(copia(PLAN_ESTANDAR.embudo), copia(U.embudo || {}));
    P.gantt = Object.assign(copia(PLAN_ESTANDAR.gantt), copia(U.gantt || {}));
    if (D.plano && D.plano.activo && !U.pilares) P.pilares = P.pilares.map((p) => (p.icono === 'sofa' ? P.pilar_plano : p));
    // Sin plano, el carril estándar «La casa» no promete plano
    if (!(D.plano && D.plano.activo) && !(U.gantt && U.gantt.carriles))
      P.gantt.carriles.forEach((c) => (c.barras || []).forEach((b) => { b.t = String(b.t).replace('Fotos, vídeo, decoración virtual y plano', 'Fotos, vídeo y decoración virtual'); }));
    const vos = (D.propietarios || {}).tratamiento !== 'tu';
    (P.gantt.carriles || []).forEach((c) => { c.t = String(c.t || '').replace('{Contigo}', vos ? 'Con vosotros' : 'Contigo'); });
    const pasos = P.embudo.pasos || [];
    if (!P.embudo.titulo && pasos.length) P.embudo.titulo = `De ${esc(pasos[0].n)} personas a <em>un</em> comprador`;
    return P;
  }

  /* El @ de los mockups: marca.usuario_redes o la agencia (o el nombre) sin tildes ni espacios */
  function usuario() {
    if (M.usuario_redes) return String(M.usuario_redes).replace(/^@/, '');
    return String(M.agencia || M.nombre || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9._]/g, '');
  }

  /* Mockups con sus defectos rellenos a partir de la casa */
  function mockups() {
    if (D.mockups === false) return null;
    const U = D.mockups || {}, C = D.casa || {}, A = D.adelanto || {};
    const fotos = (C.fotos || []).map((f) => f.src);
    const portada = C.foto_portada || fotos[0] || '';
    const tipoBarrio = `${C.tipo || 'Vivienda'} en ${C.barrio || C.ciudad || ''}`.trim();
    const recorta = (s, n) => { s = String(s || ''); return s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…'; };
    const P = U.portal || {}, Po = U.post || {}, S = U.story || {}, V = U.portada || {};
    const gancho = Po.gancho || (C.extras && C.extras[0]) || C.tipo || '';
    return {
      kicker: U.kicker || MOCKUPS_ESTANDAR.kicker,
      titulo: U.titulo || MOCKUPS_ESTANDAR.titulo,
      texto: U.texto == null ? MOCKUPS_ESTANDAR.texto : U.texto,
      portal: { titular: P.titular || tipoBarrio, texto: P.texto || recorta(C.descripcion, 110), foto: P.foto || portada },
      post: { foto: Po.foto || fotos[1] || portada, gancho, texto: Po.texto || '' },
      story: { foto: S.foto || fotos[2] || portada, posicion: S.posicion || MOCKUPS_ESTANDAR.story.posicion, texto: S.texto || gancho, boton: S.boton || MOCKUPS_ESTANDAR.story.boton },
      portada: { foto: V.foto || C.foto_adelanto || portada, etiqueta: V.etiqueta == null ? MOCKUPS_ESTANDAR.portada.etiqueta : V.etiqueta, titulo: V.titulo || tipoBarrio, detalle: V.detalle || A.detalle || '' },
    };
  }

  window.UT = { D, M, eur, num, esc, iniciales, aplicarMarca, valorar, deLa, suCasa, PLAN_ESTANDAR, MOCKUPS_ESTANDAR, plan, mockups, usuario };
})();
