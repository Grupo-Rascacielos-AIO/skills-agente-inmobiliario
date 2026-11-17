/* Acabado de la página: capítulos numerados y datos de la casa en la portada. */
(function () {
  'use strict';
  const D = window.DATOS || {}, C = D.casa || {};
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // capítulos: 01, 02, 03… delante de cada rótulo de sección
  let n = 0;
  document.querySelectorAll('section:not(.hero)').forEach((s) => {
    const k = s.querySelector('.kicker, .m3-eyebrow');
    if (!k || k.closest('[hidden]')) return;
    n++;
    k.insertAdjacentHTML('afterbegin', `<span class="cap">${String(n).padStart(2, '0')}</span>`);
  });

  // portada: la casa en cuatro datos
  const dir = document.getElementById('heroDir');
  if (dir) {
    const d = [];
    if (C.m2_construidos || C.m2_utiles) d.push([C.m2_construidos || C.m2_utiles, 'm²']);
    if (C.habitaciones) d.push([C.habitaciones, C.habitaciones == 1 ? 'habitación' : 'habitaciones']);
    if (C.banos) d.push([C.banos, C.banos == 1 ? 'baño' : 'baños']);
    if (C.extras && C.extras[0]) d.push(['', C.extras[0]]);
    if (d.length) dir.insertAdjacentHTML('afterend', `<div class="hero-datos">${d.map((x) => `<span>${x[0] !== '' ? `<b>${esc(x[0])}</b>` : ''}${esc(x[1])}</span>`).join('')}</div>`);
  }

})();
