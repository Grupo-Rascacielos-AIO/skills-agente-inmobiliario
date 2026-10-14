/* Edificio interactivo · fachada clicable, transición animada y vista de cada planta en 3D.
   No se toca por edificio: todo lo propio va en config.js (window.EDIFICIO) y tipos.js (window.TIPOS). */
(function () {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const SVGNS = 'http://www.w3.org/2000/svg';
  const E = window.EDIFICIO, TIPOS = window.TIPOS;
  const W = E.foto.ancho, H = E.foto.alto, FX0 = E.fachada.x0, FX1 = E.fachada.x1;
  const eur = n => n.toLocaleString('es-ES') + ' €';
  const TXT = { ok: 'Disponible', res: 'Reservada', ven: 'Vendida' };

  // ---------- Textos, colores y foto desde config.js ----------
  document.title = E.nombre;
  $$('[data-c]').forEach(el => { const v = E[el.dataset.c]; if (v == null) return; if (el.dataset.c === 'titulo') el.innerHTML = v; else el.textContent = v; });
  if (E.colores && E.colores.acento) document.documentElement.style.setProperty('--oro', E.colores.acento);
  const img = $('#stage img'); img.alt = E.foto.alt || E.nombre; img.src = E.foto.src;
  $('.bg').style.backgroundImage = `url(${E.foto.fondo || E.foto.src})`;
  $('#stage').style.aspectRatio = `${W}/${H}`;
  $('#pisos').setAttribute('viewBox', `0 0 ${W} ${H}`);
  const cifras = E.cifras || [];
  $('.stats').style.setProperty('--n', Math.max(1, cifras.length));
  $('.stats').innerHTML = cifras.map(([v, l, suf]) => `<div><b data-count="${v}" data-suf="${suf || ''}">0</b><span>${l}</span></div>`).join('');
  $('#pv-back').textContent = '← ' + (E.volver || 'Edificio');

  // ---------- Plantas ----------
  const PISOS = {}, ORDEN = E.plantas.map(p => p.n).sort((a, b) => a - b);
  E.plantas.forEach(p => { p.puertas.forEach(x => x.e = x.estado || 'ok'); PISOS[p.n] = p; });
  const estadoPlanta = p => p.puertas.some(x => x.e === 'ok') ? 'ok' : p.puertas.some(x => x.e === 'res') ? 'res' : 'ven';
  const centro = p => {
    if (p.poly) { const xs = p.poly.map(q => q[0]), ys = p.poly.map(q => q[1]); return [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2]; }
    return [(FX0 + FX1) / 2, (p.y1 + p.y2) / 2];
  };
  const caja = p => p.poly ? [Math.min(...p.poly.map(q => q[0])), Math.max(...p.poly.map(q => q[0])), Math.min(...p.poly.map(q => q[1])), Math.max(...p.poly.map(q => q[1]))] : [FX0, FX1, p.y1, p.y2];

  const ESTILOS = [
    { id: 'vacio', n: 'Sin amueblar', d: 'Obra terminada', sw: ['#f4efe8', '#c9b79c', '#8d857c'] },
    { id: 'nordico', n: 'Nórdico', d: 'Roble claro y lino', sw: ['#f6f3ee', '#d8c3a0', '#9aab94'] },
    { id: 'moderno', n: 'Moderno', d: 'Nogal, grafito, latón', sw: ['#2a2826', '#6b4a33', '#b48b55'] },
    { id: 'japandi', n: 'Japandi', d: 'Fresno y calma', sw: ['#efe8de', '#cdbfa9', '#5b4f43'] },
    { id: 'deco', n: 'Art Déco', d: 'Mármol y terciopelo', sw: ['#1f5a4a', '#d4a849', '#f4f1ec'] },
    { id: 'mediterraneo', n: 'Mediterráneo', d: 'Cal, barro y ratán', sw: ['#fbf8f2', '#c96f4a', '#3f6f8f'] }
  ].filter(e => !E.estilos || E.estilos.includes(e.id));
  const NOMBRE = Object.fromEntries(ESTILOS.map(e => [e.id, e.n]));
  const FOTOS = E.fotos || {};
  const conFotos = Object.keys(FOTOS).filter(k => k !== 'porTipo');
  const fotosDe = (estilo, tipo) => {
    const e = FOTOS[estilo] ? estilo : conFotos[0];
    const f = (FOTOS[e] || []).map(x => Object.assign({ e }, x));
    const extra = (FOTOS.porTipo && FOTOS.porTipo[tipo]) || [];
    return extra.map(x => Object.assign({ e: '' }, x)).concat(f);
  };

  // ---------- Zonas clicables sobre la fachada ----------
  const svg = $('#pisos'), tag = $('#tag'), card = $('#hover-card');
  ORDEN.forEach(n => {
    const p = PISOS[n];
    let r;
    if (p.poly) { r = document.createElementNS(SVGNS, 'polygon'); r.setAttribute('points', p.poly.map(q => q.join(',')).join(' ')); }
    else {
      const m = Math.min(4, (p.y2 - p.y1) * .03);
      r = document.createElementNS(SVGNS, 'rect');
      r.setAttribute('x', FX0); r.setAttribute('width', FX1 - FX0);
      r.setAttribute('y', p.y1 + m); r.setAttribute('height', p.y2 - p.y1 - 2 * m); r.setAttribute('rx', (FX1 - FX0) * .01);
    }
    r.classList.add('f', 'd-' + estadoPlanta(p)); r.dataset.n = n; r.style.strokeWidth = (FX1 - FX0) * .005;
    svg.appendChild(r); p.el = r;
  });
  const scan = document.createElementNS(SVGNS, 'rect'); scan.classList.add('scan');
  ['x', 'y', 'height'].forEach(a => scan.setAttribute(a, 0)); scan.setAttribute('width', (FX1 - FX0) * .26); svg.appendChild(scan);
  const barrido = (p, opts) => { const [a, b, y1, y2] = caja(p), w = (b - a) * .26; return gsap.fromTo(scan, { attr: { x: a - w, y: y1, height: y2 - y1, width: w }, opacity: .9 }, Object.assign({ attr: { x: b }, opacity: .3, duration: .55, ease: 'power2.out' }, opts)); };
  $('#tag').style.left = (FX1 / W * 100) + '%';

  function pintarCard(p) {
    const T = TIPOS[p.tipo];
    card.innerHTML = `<div class="hc-top"><b>${p.nombre}</b><span>${T.nombre}</span></div>
      <div class="hc-sub">${T.sub} · ${T.m2} m²${T.terraza ? ` + ${T.terraza} m² de terraza` : ''} · desde ${eur(Math.min(...p.puertas.map(x => x.precio)))}</div>
      <div class="hc-doors">${p.puertas.map(x => `<span class="door"><i class="dot ${x.e}"></i>${x.p} · ${TXT[x.e]}</span>`).join('')}</div>`;
  }
  const vacio = '<div class="hc-empty"><div class="pulse"></div>Pasa el ratón por la fachada y pulsa una planta para entrar</div>';
  card.innerHTML = vacio;
  let hoverN = 0, leaveT;
  svg.addEventListener('pointerover', e => {
    const n = +e.target.dataset.n; if (!n || n === hoverN) return;
    clearTimeout(leaveT); hoverN = n; const p = PISOS[n];
    $$('#pisos .f').forEach(r => r.classList.toggle('hov', r === p.el));
    tag.style.top = (centro(p)[1] / H * 100) + '%';
    tag.querySelector('b').textContent = p.nombre;
    tag.classList.add('on'); pintarCard(p); barrido(p);
    gsap.fromTo(card, { y: 6, opacity: .4 }, { y: 0, opacity: 1, duration: .3 });
  });
  svg.addEventListener('pointerleave', () => {
    leaveT = setTimeout(() => { hoverN = 0; tag.classList.remove('on'); $$('#pisos .f').forEach(r => r.classList.remove('hov')); card.innerHTML = vacio; }, 350);
  });
  svg.addEventListener('click', e => { const n = +e.target.dataset.n; if (n) abrir(n); });

  $('#btn-disp').addEventListener('click', e => {
    const on = svg.classList.toggle('disp'); e.currentTarget.classList.toggle('on', on); $('#legend').hidden = !on;
    if (on) gsap.from('#pisos .f', { opacity: 0, duration: .4, stagger: { each: .025, from: 'end' } });
  });

  // ---------- Intro ----------
  gsap.ticker.lagSmoothing(0);
  let arrancado = false;
  const prog = { v: 0 };
  gsap.to(prog, { v: 85, duration: 1.4, ease: 'power1.out', onUpdate: pintaProg });
  function pintaProg() { $('#loader .l-bar i').style.transform = `scaleX(${prog.v / 100})`; $('#loader .l-n').textContent = String(Math.round(prog.v)).padStart(3, '0'); }
  function arrancar() {
    if (arrancado) return; arrancado = true;
    gsap.timeline()
      .to(prog, { v: 100, duration: .4, onUpdate: pintaProg })
      .to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'power4.inOut' })
      .set('#loader', { display: 'none' })
      .from('#stage', { scale: 1.15, opacity: 0, duration: 1.6, ease: 'power3.out' }, '-=.6')
      .from('.bg', { opacity: 0, duration: 1.2 }, '<')
      .from('#panel > *', { y: 40, opacity: 0, duration: .9, stagger: .09, ease: 'power3.out' }, '-=1.1')
      .add(() => {
        $$('.stats b').forEach(b => {
          const o = { v: 0 }, fin = +b.dataset.count, suf = b.dataset.suf || '';
          gsap.to(o, { v: fin, duration: 1.4, ease: 'power2.out', onUpdate: () => b.textContent = Math.round(o.v).toLocaleString('es-ES') + suf });
        });
      }, '-=.6')
      .fromTo($$('#pisos .f'), { fillOpacity: 0 }, { fillOpacity: .5, strokeOpacity: .9, duration: .18, stagger: .05, yoyo: true, repeat: 1, ease: 'sine.inOut', clearProps: 'fillOpacity,strokeOpacity' }, '-=.8');
  }
  if (img.complete && img.naturalWidth) setTimeout(arrancar, 900); else { img.addEventListener('load', arrancar); img.addEventListener('error', arrancar); }
  setTimeout(arrancar, 4000);

  // ---------- Vista de planta ----------
  P3D.montar($('#pv-3d'));
  P3D.onStopGiro = () => $('[data-giro]').classList.remove('on');
  let actual = 0, estiloSel = E.estiloInicial || 'nordico', abierto = false, tFurn;

  function pintarLado(p) {
    const T = TIPOS[p.tipo], i = ORDEN.indexOf(p.n);
    $('#sd-k').textContent = p.nombre + ' · Tipo ' + p.tipo;
    const [a, ...b] = T.nombre.split(' ');
    $('#sd-t').innerHTML = b.length ? `${a} <em>${b.join(' ')}</em>` : `<em>${a}</em>`;
    $('#sd-s').textContent = T.sub + (T.extra ? ' · ' + T.extra : '');
    const specs = [[T.m2, 'm² útiles'], [T.dorm, 'Dorm.'], [T.banos, 'Baños']];
    if (T.terraza) specs.push([T.terraza, 'm² terraza']);
    $('#specs').style.gridTemplateColumns = `repeat(${specs.length},1fr)`;
    $('#specs').innerHTML = specs.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
    $('#precio').innerHTML = p.puertas.map(x => `<div class="pr"><div>${x.p}<em><i class="dot ${x.e}"></i>${TXT[x.e]}</em></div><strong>${eur(x.precio)}</strong></div>`).join('');
    const corto = p.nombre.replace(/^Planta\s+/i, '');
    $('.pv-big .k').textContent = /^Planta/i.test(p.nombre) ? 'Planta' : '';
    $('#pv-num').textContent = corto;
    $('#pv-tipo').textContent = T.nombre + ' · ' + T.sub.split(' · ')[0];
    $('#pv-floor').textContent = `${p.nombre} · ${i + 1}/${ORDEN.length}`;
    $('#pv-down').disabled = i === 0; $('#pv-up').disabled = i === ORDEN.length - 1;
    pintarFotos();
  }

  const est = $('#estilos');
  est.innerHTML = ESTILOS.map(e => `<button class="est${e.id === estiloSel ? ' on' : ''}" data-e="${e.id}"><div class="sw">${e.sw.map(c => `<i style="background:${c}"></i>`).join('')}</div><b>${e.n}</b><span>${e.d}</span></button>`).join('');
  est.addEventListener('click', e => { const b = e.target.closest('.est'); if (b) elegirEstilo(b.dataset.e); });

  function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1800); }
  function elegirEstilo(id, silencioso) {
    estiloSel = id;
    $$('.est').forEach(b => b.classList.toggle('on', b.dataset.e === id));
    P3D.amueblar(id);
    if (!silencioso) toast(id === 'vacio' ? 'Vivienda sin amueblar' : 'Amueblando · estilo ' + NOMBRE[id]);
    pintarFotos();
  }

  let LISTA = [];
  function pintarFotos() {
    const p = PISOS[actual]; if (!p) return;
    LISTA = fotosDe(estiloSel, p.tipo);
    const bloque = $('#fotos').parentElement; bloque.hidden = !LISTA.length; if (!LISTA.length) return;
    const e = FOTOS[estiloSel] ? estiloSel : conFotos[0];
    $('#fotos-t').textContent = 'Así se vive' + (NOMBRE[e] ? ' · ' + NOMBRE[e] : '');
    $('#fotos').innerHTML = LISTA.map((f, i) => `<button class="${LISTA.length % 2 && i === 0 ? 'wide' : ''}" data-i="${i}"><img src="${f.src}" alt="${f.t}" loading="lazy"><span>${f.t}</span></button>`).join('');
    gsap.from('#fotos button', { opacity: 0, y: 12, duration: .5, stagger: .07 });
  }
  $('#fotos').addEventListener('click', e => { const b = e.target.closest('button'); if (b) abrirLB(+b.dataset.i); });

  function cargarPlanta(p, conRetardo) {
    P3D.cargar(TIPOS[p.tipo].data);
    $$('.pv-bottom [data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === 'maqueta'));
    $('[data-giro]').classList.add('on'); $('[data-et]').classList.add('on');
    clearTimeout(tFurn);
    tFurn = setTimeout(() => elegirEstilo(estiloSel), conRetardo ? 2300 : 1700);
  }

  function encuadrar(p) {
    const st = $('#stage'); gsap.set(st, { scale: 1, x: 0, y: 0 });
    const r = st.getBoundingClientRect(), [cx, cy] = centro(p), ox = cx / W, oy = cy / H;
    const [a, b] = caja(p), esc = Math.min(6, Math.max(2, innerWidth * .5 / ((b - a) / W * r.width)));
    return { ox, oy, esc, x: innerWidth / 2 - (r.left + ox * r.width), y: innerHeight / 2 - (r.top + oy * r.height) };
  }

  function abrir(n) {
    if (abierto) return; abierto = true; actual = n;
    const p = PISOS[n], st = $('#stage'), k = encuadrar(p);
    pintarLado(p);
    $('#beam').style.top = (innerHeight / 2) + 'px';
    p.el.classList.add('hov');
    gsap.timeline()
      .add(barrido(p, { duration: .45, ease: 'power2.in', opacity: 1 }), 0)
      .to(p.el, { fillOpacity: .75, duration: .25 }, 0)
      .to('#panel', { opacity: 0, x: 60, duration: .5, ease: 'power2.in' }, 0)
      .to('.foot', { opacity: 0, duration: .3 }, 0)
      .set(st, { transformOrigin: `${k.ox * 100}% ${k.oy * 100}%` }, 0)
      .to(st, { scale: k.esc, x: k.x, y: k.y, duration: 1.15, ease: 'power3.inOut' }, .15)
      .to('.bg', { opacity: .2, duration: 1 }, .15)
      .to('#beam', { opacity: 1, scaleX: 1, duration: .55, ease: 'power3.out' }, .95)
      .add(() => {
        const pv = $('#planta-view'); pv.style.visibility = 'visible'; pv.setAttribute('aria-hidden', 'false');
        P3D.activar(true); cargarPlanta(p, true);
      }, 1.3)
      .to('#planta-view', { clipPath: 'inset(0% 0 0% 0)', duration: 1, ease: 'power4.inOut' }, 1.3)
      .to('#beam', { opacity: 0, duration: .5 }, 1.8)
      .from('#pv-side > *', { x: 40, opacity: 0, duration: .7, stagger: .07, ease: 'power3.out' }, 1.7)
      .from('.pv-big > *', { y: 60, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out' }, 1.8)
      .from('.pv-top, .pv-bottom', { opacity: 0, y: -10, duration: .6 }, 2);
  }

  function cerrar() {
    if (!abierto) return;
    cerrarLB();
    const p = PISOS[actual], st = $('#stage');
    gsap.timeline()
      .to('#planta-view', { clipPath: 'inset(50% 0 50% 0)', duration: .8, ease: 'power4.inOut' })
      .add(() => { const pv = $('#planta-view'); pv.style.visibility = 'hidden'; pv.setAttribute('aria-hidden', 'true'); P3D.activar(false); clearTimeout(tFurn); })
      .to(st, { scale: 1, x: 0, y: 0, duration: 1.1, ease: 'power3.inOut' }, .5)
      .to('.bg', { opacity: 1, duration: 1 }, .5)
      .to('#panel', { opacity: 1, x: 0, duration: .7, ease: 'power3.out' }, 1.1)
      .to('.foot', { opacity: 1, duration: .5 }, 1.2)
      .add(() => { p.el.classList.remove('hov'); gsap.set(p.el, { clearProps: 'fillOpacity' }); abierto = false; pintarCard(p); });
  }

  function irA(paso) {
    const i = ORDEN.indexOf(actual) + paso; if (i < 0 || i >= ORDEN.length) return;
    actual = ORDEN[i]; const p = PISOS[actual];
    gsap.timeline()
      .to('.pv-big', { y: paso * 50, opacity: 0, duration: .3, ease: 'power2.in' })
      .add(() => { pintarLado(p); cargarPlanta(p, false); })
      .fromTo('.pv-big', { y: -paso * 50, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'power3.out' })
      .from('#pv-side > *', { opacity: 0, x: 20, duration: .4, stagger: .04 }, '<');
    $$('#pisos .f').forEach(r => r.classList.remove('hov')); p.el.classList.add('hov');
    const k = encuadrar(p);
    gsap.set('#stage', { transformOrigin: `${k.ox * 100}% ${k.oy * 100}%`, scale: k.esc, x: k.x, y: k.y });
  }

  $('#pv-back').addEventListener('click', cerrar);
  $('#pv-up').addEventListener('click', () => irA(1));
  $('#pv-down').addEventListener('click', () => irA(-1));
  $$('.pv-bottom [data-v]').forEach(b => b.addEventListener('click', () => {
    $$('.pv-bottom [data-v]').forEach(x => x.classList.toggle('on', x === b)); P3D.vista(b.dataset.v);
  }));
  $('[data-giro]').addEventListener('click', e => { const on = e.currentTarget.classList.toggle('on'); P3D.girar(on); });
  $('[data-et]').addEventListener('click', e => { const on = e.currentTarget.classList.toggle('on'); P3D.etiquetas(on); });
  $('#btn-pres').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(() => {});
  });

  // ---------- Fotos a pantalla completa ----------
  const lb = $('#lb'), lbImg = lb.querySelector('img'); let lbI = 0;
  function pintarLB() {
    const f = LISTA[lbI];
    lbImg.classList.remove('kb'); lbImg.style.opacity = 0;
    const im = new Image(); im.onload = () => { lbImg.src = f.src; void lbImg.offsetWidth; lbImg.classList.add('kb'); lbImg.style.opacity = 1; }; im.src = f.src;
    lb.querySelector('.lb-cap b').textContent = f.t;
    lb.querySelector('.lb-cap span').textContent = (NOMBRE[f.e] ? 'Estilo ' + NOMBRE[f.e] + ' · ' : '') + `${lbI + 1}/${LISTA.length}`;
  }
  function abrirLB(i) { lbI = i; lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false'); pintarLB(); }
  function cerrarLB() { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); }
  lb.querySelector('.lb-x').addEventListener('click', cerrarLB);
  lb.querySelector('.lb-p').addEventListener('click', () => { lbI = (lbI - 1 + LISTA.length) % LISTA.length; pintarLB(); });
  lb.querySelector('.lb-n').addEventListener('click', () => { lbI = (lbI + 1) % LISTA.length; pintarLB(); });
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-img')) cerrarLB(); });
  if (E.badgeFotos === false) lb.querySelector('.lb-badge').hidden = true; else if (E.badgeFotos) lb.querySelector('.lb-badge').textContent = E.badgeFotos;

  addEventListener('keydown', e => {
    if (lb.classList.contains('on')) {
      if (e.key === 'Escape') cerrarLB();
      if (e.key === 'ArrowRight') lb.querySelector('.lb-n').click();
      if (e.key === 'ArrowLeft') lb.querySelector('.lb-p').click();
      return;
    }
    if (!abierto) return;
    if (e.key === 'Escape') cerrar();
    if (e.key === 'ArrowUp') { e.preventDefault(); irA(1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); irA(-1); }
  });
})();
