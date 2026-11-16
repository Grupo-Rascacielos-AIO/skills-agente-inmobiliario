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

  window.UT = { D, M, eur, num, esc, iniciales, aplicarMarca, valorar };
})();
