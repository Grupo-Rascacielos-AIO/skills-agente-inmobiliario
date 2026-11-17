/* Sección de valoración: escáner 3D de testigos, regla de precios, testigos uno a uno y notaría.
   Todo sale de VR (valoración real de ejemplo) y de los colores de la marca (datos.js → variables CSS).
   No llama a ningún servicio: los datos van aquí dentro. */
(function () {
  'use strict';

  /* Datos de la valoración, desde datos.js (window.DATOS.valoracion):
     - testigos: [{ direccion | calle, situacion: 'vendido' | 'en_venta', precio, m2, dist?, x?, y?, ... }]
       x/y = metros al este/norte de la casa (aproximados). Si faltan, se reparten alrededor según dist.
     - resultado (opcional): { precio, valor, min, max } si ya viene de un informe; si no, se calcula con valorar().
     - notaria (opcional): { ventas, eurm2, radio, meses: [{ mes, v }] } · origen (opcional): texto de la etiqueta. */
  function construir() {
    const D = window.DATOS || {}, V = D.valoracion || {}, C = D.casa || {};
    const crudos = (V.testigos || []).filter((t) => t && t.precio > 0 && t.m2 > 0 && !t.descartar);
    if (!crudos.length) return null;
    const R = V.resultado || {}, calc = window.UT && window.UT.valorar ? window.UT.valorar() : null;
    const m2 = Number(V.m2 || C.m2_construidos || C.m2_utiles) || 0;
    const precio = R.precio || (calc && calc.salida) || 0;
    if (!m2 || !precio) return null;
    const valor = R.valor || (calc && calc.cierre) || precio;
    const min = R.min || (calc && calc.minimo) || Math.round(Math.min(precio, valor) * 0.93);
    const max = R.max || Math.round(Math.max(precio, valor) * 1.08);
    const oro = 2.39996; // reparto en espiral cuando no hay coordenadas
    const testigos = crudos.map((t, i) => {
      const dist = t.dist != null ? +t.dist : t.x != null ? Math.round(Math.hypot(t.x, t.y)) : 60 + i * 22;
      const a = i * oro;
      const x = t.x != null ? +t.x : Math.round(dist * Math.sin(a));
      const y = t.y != null ? +t.y : Math.round(dist * Math.cos(a));
      return { precio: +t.precio, m2: +t.m2, eurm2: Math.round(t.precio / t.m2), dist, x, y, calle: t.calle || t.direccion || 'Piso ' + (i + 1), vendido: t.situacion === 'vendido' };
    });
    const eurm2 = Math.round(precio / m2);
    const enVenta = testigos.filter((t) => !t.vendido);
    const base = enVenta.length ? enVenta : testigos;
    const pedido = R.pedido || Math.round(base.reduce((s, t) => s + t.eurm2, 0) / base.length);
    const masCaros = base.filter((t) => t.eurm2 > eurm2).length;
    const N = V.notaria && V.notaria.eurm2 ? V.notaria : null;
    return { precio, valor, min, max, m2, testigos, eurm2, pedido, masCaros, base: base.length, soloVenta: !!enVenta.length && enVenta.length === testigos.length, notaria: N, origen: V.origen || '' };
  }
  let VR = null;

  /* ---------- utilidades ---------- */
  const TAU = Math.PI * 2, RAD = Math.PI / 180;
  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const eOut = (t) => 1 - Math.pow(1 - t, 3);
  const mix = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  const rgb = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
  const angN = (x, z) => { const a = Math.atan2(x, z); return a < 0 ? a + TAU : a; };
  // Modo muestra (datos.muestra = true): enlace genérico para enseñar a cualquiera, sin importes a la vista.
  const MUESTRA = !!(window.DATOS || {}).muestra;
  const nm = (n) => (MUESTRA ? (Math.abs(n) >= 100000 ? '•••.•••' : '•.•••') : String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  const eu = (n) => nm(n) + ' €';
  function prng(s) {
    return () => {
      s |= 0; s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  /* Color de una variable CSS como [r,g,b] */
  function colorVar(nombre) {
    const s = document.createElement('span');
    s.style.color = `var(${nombre})`;
    document.body.appendChild(s);
    const m = getComputedStyle(s).color.match(/[\d.]+/g);
    s.remove();
    return m ? [+m[0], +m[1], +m[2]] : [128, 128, 128];
  }

  /* ---------- escáner 3D (canvas 2D con perspectiva) ---------- */
  const T_ESCANEO = 2.4, OM = TAU / 2.4, B = 74, U = 1.55; // U = unidades por metro

  function paleta() {
    const pri = colorVar('--c-principal'), cr = colorVar('--c-secundario'), co = colorVar('--c-acento');
    const bg = mix(pri, [6, 6, 6], 0.58);
    return { BG: bg, CR: cr, CO: co, PE: mix(co, [255, 255, 255], 0.5) };
  }

  function ciudad(NB, C, testigos) {
    const rnd = prng(11), L = NB * B, blds = [];
    const hgt = () => { const r = rnd(); return 8 + Math.pow(r, 2.4) * 40 + (r > 0.965 ? 46 : 0); };
    const bld = (x0, x1, z0, z1, h, casa) => {
      const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, d = Math.hypot(cx, cz);
      const f = clamp((d - 0.5 * L) / (0.55 * L)) * 0.92;
      blds.push({
        x0, x1, z0, z1, h, cx, cz, d, a: angN(cx, cz), casa: !!casa, fog: f, zr: 0,
        ft: rgb(mix(mix(C.BG, C.CR, 0.15), C.BG, f)), f1: rgb(mix(mix(C.BG, C.CR, 0.08), C.BG, f)), f2: rgb(mix(mix(C.BG, C.CR, 0.04), C.BG, f)),
        ed: rgb(C.CR, 0.07 * (1 - f)),
      });
    };
    for (let i = -NB; i <= NB; i++)
      for (let j = -NB; j <= NB; j++) {
        const cx = i * B, cz = j * B;
        if (Math.hypot(cx, cz) > L + B * 0.2) continue;
        const hb = B / 2 - 8;
        if (!i && !j) { bld(cx - hb + 5, cx + hb - 5, cz - hb + 5, cz + hb - 5, 27, true); continue; }
        if (rnd() < 0.5) {
          const md = cx + (rnd() - 0.5) * 12;
          bld(cx - hb + rnd() * 4, md - 3, cz - hb + rnd() * 4, cz + hb - rnd() * 4, hgt());
          bld(md + 3, cx + hb - rnd() * 4, cz - hb + rnd() * 4, cz + hb - rnd() * 4, hgt());
        } else bld(cx - hb + rnd() * 5, cx + hb - rnd() * 5, cz - hb + rnd() * 5, cz + hb - rnd() * 5, hgt());
      }
    const cols = [];
    const tf = (a) => { let da = a % TAU; if (da < 0) da += TAU; return T_ESCANEO + da / OM; };
    // Ventas de notaría: ambiente, sin cifras y con posición ilustrativa
    for (let k = 0; k < 26; k++) {
      const a = rnd() * TAU, d = 150 + Math.sqrt(rnd()) * L * 0.8;
      cols.push({ x: d * Math.sin(a), z: d * Math.cos(a), d, a, hp: 26 + rnd() * 46, tes: -1, tf: tf(a) });
    }
    // Testigos reales: la altura de la columna es su precio por metro
    const em = testigos.map((t) => t.eurm2), emin = Math.min(...em), emax = Math.max(...em);
    const grupos = {};
    testigos.forEach((t, i) => { const k = t.x + ',' + t.y; (grupos[k] = grupos[k] || []).push(i); });
    testigos.forEach((t, i) => {
      const g = grupos[t.x + ',' + t.y], k = g.indexOf(i);
      // Los que comparten punto (situación aproximada) se abren en abanico para que se vean todos
      const sep = g.length > 1 ? 30 : 0, an = 0.6 + (k * TAU) / g.length;
      const x = (t.x + sep * Math.sin(an)) * U, z = (t.y + sep * Math.cos(an)) * U, a = angN(x, z);
      cols.push({ x, z, d: Math.hypot(x, z), a, hp: 70 + 130 * ((t.eurm2 - emin) / (emax - emin || 1)), tes: i, tf: tf(a), sx: -99, sy: -99 });
    });
    return { blds, cols, L };
  }

  function proyeccion(yaw, pitch, R, F, cx, cy) {
    const cy_ = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const P = (x, y, z) => {
      const xr = x * cy_ - z * sy, zr = x * sy + z * cy_;
      const d = -y * sp + zr * cp + R;
      if (d < 10) return null;
      const s = F / d;
      return [cx + xr * s, cy - (y * cp + zr * sp) * s, d, s];
    };
    return { P, camX: -R * cp * sy, camZ: -R * cp * cy_, zr: (x, z) => x * sy + z * cy_ };
  }

  function escaner(cv, opc) {
    const ctx = cv.getContext('2d');
    if (!ctx) return null;
    const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let C = paleta();
    let sprites = new Map();
    const sprite = (c) => {
      const k = c.map((v) => v | 0).join();
      const ya = sprites.get(k);
      if (ya) return ya;
      const s = document.createElement('canvas');
      s.width = s.height = 64;
      const g = s.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(0.12, rgb(mix(c, [255, 255, 255], 0.5)));
      gr.addColorStop(0.35, rgb(c, 0.45));
      gr.addColorStop(1, rgb(c, 0));
      g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
      sprites.set(k, s);
      return s;
    };
    let W = 1, H = 1, dpr = 1, movil = cv.clientWidth < 700;
    let mundo = ciudad(movil ? 7 : 8, C, VR.testigos);
    const ajustar = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = Math.max(1, (cv.clientWidth * dpr) | 0);
      H = cv.height = Math.max(1, (cv.clientHeight * dpr) | 0);
      const m = cv.clientWidth < 700;
      if (m !== movil) { movil = m; mundo = ciudad(m ? 7 : 8, C, VR.testigos); }
      if (reducido || !visible) pinta();
    };
    let t = reducido ? 9 : 0, tSel = reducido ? 5 : -1, yawAcc = 0, vista = 0, vk = 0, sel = -1, visible = false, raf = 0, antes = 0;
    const fuente = getComputedStyle(document.body).fontFamily || 'system-ui, sans-serif';

    const anillo = (P, x, z, r, n = 44) => {
      ctx.beginPath();
      let f = true;
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * TAU, p = P(x + r * Math.sin(a), 0, z + r * Math.cos(a));
        if (!p) { f = true; continue; }
        if (f) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
        f = false;
      }
    };

    function pinta() {
      const { blds, cols, L } = mundo, m = movil, { BG, CR, CO, PE } = C;
      if (tSel < 0 && t > T_ESCANEO + 2.7) tSel = t;
      const e1 = ease(clamp(t / T_ESCANEO));
      const f4 = tSel > 0 ? ease(clamp((t - tSel) / 1.2)) : 0;
      const pitch = lerp(lerp(84, 50, e1) - 3 * f4, 89, vk);
      const R = lerp(lerp(m ? 3600 : 3000, m ? 1850 : 1300, e1) + (m ? 260 : 240) * f4, m ? 2500 : 1750, vk);
      const yaw = (-38 + 46 * e1) * RAD + yawAcc;
      const F = m ? Math.min(H * 0.95, W * 2.1) : Math.min(H * 1.1, W * 1.55);
      const cx = m ? W * 0.5 : W * 0.66, cy = m ? H * 0.47 : H * 0.5;
      const { P, camX, camZ, zr } = proyeccion(yaw, pitch * RAD, R, F, cx, cy);

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = rgb(BG);
      ctx.fillRect(0, 0, W, H);
      const hc = P(0, 0, 0);
      if (hc) {
        const g = ctx.createRadialGradient(hc[0], hc[1], 0, hc[0], hc[1], hc[3] * L * 1.15);
        g.addColorStop(0, rgb(CO, 0.16)); g.addColorStop(0.45, rgb(CO, 0.04)); g.addColorStop(1, rgb(BG, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      // calles
      const NB = Math.round(L / B);
      ctx.lineWidth = dpr;
      ctx.beginPath();
      for (let i = -NB; i <= NB + 1; i++) {
        const o = i * B - B / 2;
        for (const [x0, z0, x1, z1] of [[o, -L, o, L], [-L, o, L, o]]) {
          const a = P(x0, 0, z0), b = P(x1, 0, z1);
          if (a && b) { ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); }
        }
      }
      ctx.strokeStyle = rgb(CR, 0.045);
      ctx.stroke();

      // barrido
      const scan = t >= T_ESCANEO, om = (t - T_ESCANEO) * OM, Rs = L * 1.02;
      if (scan) {
        ctx.globalCompositeOperation = 'lighter';
        const p0 = P(0, 0, 0);
        for (let k = 0; k < 16; k++) {
          const a1 = om - k * 0.045, a0 = om - (k + 1) * 0.045, am = (a0 + a1) / 2;
          const p1 = P(Rs * Math.sin(a0), 0, Rs * Math.cos(a0)), pm = P(Rs * Math.sin(am), 0, Rs * Math.cos(am)), p2 = P(Rs * Math.sin(a1), 0, Rs * Math.cos(a1));
          if (!(p0 && p1 && p2 && pm)) continue;
          ctx.fillStyle = rgb(CO, 0.2 * Math.pow(1 - k / 16, 1.7));
          ctx.beginPath();
          ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]); ctx.lineTo(pm[0], pm[1]); ctx.lineTo(p2[0], p2[1]);
          ctx.closePath(); ctx.fill();
        }
        const pe = P(Rs * Math.sin(om), 0, Rs * Math.cos(om));
        if (pe && p0) {
          const g = ctx.createLinearGradient(p0[0], p0[1], pe[0], pe[1]);
          g.addColorStop(0, rgb(PE, 0.95)); g.addColorStop(1, rgb(CO, 0));
          ctx.strokeStyle = g; ctx.lineWidth = 2.2 * dpr;
          ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(pe[0], pe[1]); ctx.stroke();
        }
        for (let k = 0; k < 2; k++) {
          const q = ((t - T_ESCANEO) / 1.9 + k * 0.5) % 1;
          anillo(P, 0, 0, q * Rs, 72);
          ctx.strokeStyle = rgb(CO, 0.4 * (1 - q)); ctx.lineWidth = 1.5 * dpr; ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';
      }
      // anillos de distancia (se ven sobre todo desde arriba)
      ctx.font = `600 ${10.5 * dpr}px ${fuente}`;
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      for (const mt of [100, 200, 300]) {
        anillo(P, 0, 0, mt * U, 72);
        ctx.setLineDash([3 * dpr, 6 * dpr]);
        ctx.strokeStyle = rgb(CR, 0.1 + 0.2 * vk); ctx.lineWidth = dpr; ctx.stroke();
        ctx.setLineDash([]);
        if (vk > 0.3) {
          const p = P(mt * U * 0.707, 0, mt * U * 0.707);
          if (p) { ctx.fillStyle = rgb(CR, 0.6 * vk); ctx.fillText(`${mt} m`, p[0] + 5 * dpr, p[1] - 6 * dpr); }
        }
      }

      // edificios, de lejos a cerca
      for (const b of blds) b.zr = zr(b.cx, b.cz);
      blds.sort((a, b) => b.zr - a.zr);
      const tejado = mix(BG, CR, 0.15), cara1 = mix(BG, CR, 0.08), cara2 = mix(BG, CR, 0.04);
      for (const b of blds) {
        let gl = 0;
        if (scan && !reducido) {
          let da = (om - b.a) % TAU;
          if (da < 0) da += TAU;
          if (da < 0.85) gl = Math.pow(1 - da / 0.85, 2) * (1 - b.fog);
        }
        const lo = [], hi = [];
        let ok = true;
        for (const [x, z] of [[b.x0, b.z0], [b.x1, b.z0], [b.x1, b.z1], [b.x0, b.z1]]) {
          const a = P(x, 0, z), c = P(x, b.h, z);
          if (!a || !c) { ok = false; break; }
          lo.push(a); hi.push(c);
        }
        if (!ok) continue;
        const vis = [camZ < b.z0, camX > b.x1, camZ > b.z1, camX < b.x0];
        for (let k = 0; k < 4; k++) {
          if (!vis[k]) continue;
          const k2 = (k + 1) % 4, base = k % 2 ? cara1 : cara2;
          ctx.fillStyle = b.casa ? rgb(mix(base, CO, 0.45)) : gl > 0.02 ? rgb(mix(base, CO, gl * 0.35)) : k % 2 ? b.f1 : b.f2;
          ctx.beginPath();
          ctx.moveTo(lo[k][0], lo[k][1]); ctx.lineTo(lo[k2][0], lo[k2][1]); ctx.lineTo(hi[k2][0], hi[k2][1]); ctx.lineTo(hi[k][0], hi[k][1]);
          ctx.closePath(); ctx.fill();
        }
        ctx.beginPath();
        ctx.moveTo(hi[0][0], hi[0][1]);
        for (let k = 1; k < 4; k++) ctx.lineTo(hi[k][0], hi[k][1]);
        ctx.closePath();
        ctx.fillStyle = b.casa ? rgb(mix(tejado, CO, 0.8)) : gl > 0.02 ? rgb(mix(tejado, mix(CO, PE, 0.3), gl * 0.6)) : b.ft;
        ctx.fill();
        ctx.strokeStyle = gl > 0.02 ? rgb(PE, gl * 0.8) : b.ed;
        ctx.lineWidth = dpr;
        ctx.stroke();
      }

      // columnas de luz
      ctx.globalCompositeOperation = 'lighter';
      const tops = [];
      for (const c of cols) {
        if (t < c.tf) { if (c.tes >= 0) c.sx = c.sy = -99; continue; }
        const es = c.tes >= 0, activo = es && c.tes === sel;
        const hp = c.hp * eOut(clamp((t - c.tf) / 0.75));
        const al = es ? 1 : lerp(0.55, 0.2, f4);
        const col = activo ? PE : es && f4 > 0.5 ? CO : CR;
        const a = P(c.x, 0, c.z), b = P(c.x, hp, c.z);
        if (!a || !b) continue;
        const gr = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
        gr.addColorStop(0, rgb(col, 0.9 * al)); gr.addColorStop(1, rgb(col, 0.12 * al));
        ctx.strokeStyle = gr;
        ctx.lineWidth = (activo ? 3 : es ? 1.9 : 1.2) * dpr;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        ctx.lineWidth = (activo ? 12 : 7) * dpr;
        ctx.globalAlpha = 0.13 * al;
        ctx.stroke();
        ctx.globalAlpha = al;
        const r = (es ? 8 + 3 * f4 + (activo ? 5 : 0) : 5) * dpr * clamp((b[3] * 900) / F, 0.6, 1.5);
        ctx.drawImage(sprite(col), b[0] - r * 1.6, b[1] - r * 1.6, r * 3.2, r * 3.2);
        ctx.globalAlpha = 1;
        const dt = t - c.tf;
        if (dt < 0.9 && !reducido) {
          anillo(P, c.x, c.z, 10 + dt * 70, 28);
          ctx.strokeStyle = rgb(col, 0.8 * (1 - dt / 0.9)); ctx.lineWidth = 1.4 * dpr; ctx.stroke();
        }
        if (es) { c.sx = b[0] / dpr; c.sy = b[1] / dpr; tops.push([c, b, activo]); }
      }
      // arcos de los testigos a la casa
      if (f4 > 0) {
        let i = 0;
        for (const c of cols) {
          if (c.tes < 0 || t < c.tf) continue;
          i++;
          const c1 = [c.x / 2, Math.max(c.hp, 40) + c.d * 0.3, c.z / 2];
          const bz = (u) => { const v = 1 - u; return [v * v * c.x + 2 * v * u * c1[0], v * v * c.hp + 2 * v * u * c1[1] + u * u * 27, v * v * c.z + 2 * v * u * c1[2]]; };
          const lim = ease(clamp((t - tSel - i * 0.05) / 0.9));
          ctx.beginPath();
          let first = true;
          for (let k = 0; k <= 24 * lim; k++) {
            const q = bz(k / 24), s = P(q[0], q[1], q[2]);
            if (!s) continue;
            if (first) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
            first = false;
          }
          ctx.strokeStyle = rgb(c.tes === sel ? PE : CO, c.tes === sel ? 0.9 : 0.38);
          ctx.lineWidth = (c.tes === sel ? 2 : 1.2) * dpr;
          ctx.stroke();
          if (lim >= 1 && !reducido) {
            const q = bz((t * 0.55 + i * 0.17) % 1), s = P(q[0], q[1], q[2]);
            if (s) { const r = 5 * dpr; ctx.drawImage(sprite(PE), s[0] - r * 1.5, s[1] - r * 1.5, r * 3, r * 3); }
          }
        }
      }
      // la casa
      const bh = ease(clamp((t - 0.5) / 1.1)), hb = P(0, 27, 0), ht = P(0, 27 + 200 * bh * (1 - 0.6 * vk), 0);
      if (hb && ht && bh > 0) {
        const gr = ctx.createLinearGradient(hb[0], hb[1], ht[0], ht[1]);
        gr.addColorStop(0, rgb(CO, 1)); gr.addColorStop(1, rgb(CO, 0));
        ctx.strokeStyle = gr; ctx.lineWidth = 3 * dpr;
        ctx.beginPath(); ctx.moveTo(hb[0], hb[1]); ctx.lineTo(ht[0], ht[1]); ctx.stroke();
        ctx.lineWidth = 12 * dpr; ctx.globalAlpha = 0.18; ctx.stroke(); ctx.globalAlpha = 1;
        const r = (14 + Math.sin(t * 5) * 2) * dpr;
        ctx.drawImage(sprite(CO), hb[0] - r * 1.6, hb[1] - r * 1.6, r * 3.2, r * 3.2);
      }
      for (let k = 0; k < 3; k++) {
        const q = (t * 0.55 + k / 3) % 1;
        anillo(P, 0, 0, 20 + q * 95, 40);
        ctx.strokeStyle = rgb(CO, 0.55 * (1 - q) * bh); ctx.lineWidth = 1.4 * dpr; ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      // número de cada testigo, sobre su columna
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const [c, b, activo] of tops) {
        const k = eOut(clamp((t - c.tf - 0.35) / 0.4));
        if (k <= 0) continue;
        const r = (activo ? 12.5 : 10) * dpr * k, enAcento = f4 > 0.5 && !activo;
        ctx.globalAlpha = k;
        ctx.beginPath(); ctx.arc(b[0], b[1], r, 0, TAU);
        ctx.fillStyle = activo ? rgb(CR) : enAcento ? rgb(CO) : rgb(mix(BG, CR, 0.9));
        ctx.fill();
        ctx.lineWidth = 1.5 * dpr; ctx.strokeStyle = rgb(BG, 0.85); ctx.stroke();
        ctx.fillStyle = enAcento ? '#fff' : rgb(BG);
        ctx.font = `700 ${(activo ? 12 : 10.5) * dpr * k}px ${fuente}`;
        ctx.fillText(String(c.tes + 1), b[0], b[1] + 0.5 * dpr);
        ctx.globalAlpha = 1;
      }
      if (ht && bh > 0.6) {
        const txt = '★ ' + opc.etiqueta;
        ctx.font = `700 ${11.5 * dpr}px ${fuente}`;
        const w = ctx.measureText(txt).width + 18 * dpr, h = 24 * dpr, r = 8 * dpr, X = ht[0] - w / 2, Y = ht[1] - 6 * dpr - h;
        ctx.globalAlpha = clamp((bh - 0.6) / 0.4);
        ctx.beginPath();
        ctx.moveTo(X + r, Y);
        ctx.arcTo(X + w, Y, X + w, Y + h, r); ctx.arcTo(X + w, Y + h, X, Y + h, r); ctx.arcTo(X, Y + h, X, Y, r); ctx.arcTo(X, Y, X + w, Y, r);
        ctx.closePath();
        ctx.fillStyle = rgb(CR); ctx.fill();
        ctx.fillStyle = rgb(BG);
        ctx.fillText(txt, ht[0], Y + h / 2 + 0.5 * dpr);
        ctx.globalAlpha = 1;
      }
      const v = 1 - clamp(t / 0.6);
      if (v > 0) { ctx.fillStyle = rgb(BG, v); ctx.fillRect(0, 0, W, H); }
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - antes) / 1000);
      antes = now;
      if (document.hidden) return;
      t += dt;
      vk += (vista - vk) * Math.min(1, dt * 5);
      if (t > T_ESCANEO) yawAcc += dt * 4.5 * RAD * (1 - vk);
      pinta();
    };
    const arrancar = () => { if (raf || reducido) return; antes = performance.now(); raf = requestAnimationFrame(frame); };
    const parar = () => { cancelAnimationFrame(raf); raf = 0; };
    new ResizeObserver(ajustar).observe(cv);
    new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible) { arrancar(); if (opc.alEntrar) { opc.alEntrar(); opc.alEntrar = null; } } else parar();
    }, { threshold: 0.12 }).observe(cv);
    ajustar();
    pinta();

    return {
      seleccionar(i) { sel = i == null ? -1 : i; if (!raf) pinta(); },
      vista(v) { vista = v; if (reducido) { vk = v; pinta(); } },
      recolorear() { C = paleta(); sprites = new Map(); mundo = ciudad(movil ? 7 : 8, C, VR.testigos); if (!raf) pinta(); },
      cerca(x, y, radio) {
        let mejor = -1, dm = radio;
        for (const c of mundo.cols) { if (c.tes < 0) continue; const d = Math.hypot(c.sx - x, c.sy - y); if (d < dm) { dm = d; mejor = c.tes; } }
        return mejor;
      },
      punto(i) { const c = mundo.cols.find((k) => k.tes === i); return c ? [c.sx, c.sy] : null; },
    };
  }

  /* ---------- la sección ---------- */
  window.montarValoracion = function (o) {
    const { T, esc } = o, sec = document.getElementById('valoracion');
    if (!sec) return;
    VR = construir();
    if (!VR) { sec.remove(); return; }
    const vos = T('vuestra', 'tu'), Vos = T('Vuestra', 'Tu'), os = T('os', 'te');
    const N = VR.notaria, ts = VR.testigos, n = ts.length, ms = (N && N.meses && N.meses.length > 1) ? N.meses : null;
    const radio = Math.ceil(Math.max(...ts.map((t) => t.dist)) / 50) * 50;
    const em = ts.map((t) => t.eurm2), emin = Math.min(...em), emax = Math.max(...em);
    const sobre = N ? Math.round((VR.pedido / N.eurm2 - 1) * 100) : 0, subida = ms ? Math.round((ms.at(-1).v / ms[0].v - 1) * 100) : 0;
    const radioN = N && N.radio ? (N.radio >= 1000 ? `${String(N.radio / 1000).replace('.', ',')} km` : `${N.radio} m`) : '';
    const sit = (t) => (t.vendido ? 'vendido' : 'a la venta'), parecidos = VR.soloVenta ? 'pisos parecidos a la venta' : 'pisos parecidos';

    // regla en euros
    const lo = VR.min * 0.97, hi = VR.max * 1.03, pos = (v) => (((v - lo) / (hi - lo)) * 100).toFixed(1);
    const regla = `<div class="vx-rg" style="--p:${pos(VR.precio)}%">
        <div class="ln"></div><div class="bd" style="left:${pos(VR.min)}%;width:${(pos(VR.max) - pos(VR.min)).toFixed(1)}%"></div>
        <i class="tk" style="left:${pos(VR.min)}%"></i><em class="dn ext" style="left:${pos(VR.min)}%">${nm(VR.min)}</em>
        <i class="tk" style="left:${pos(VR.max)}%"></i><em class="dn ext der" style="left:${pos(VR.max)}%">${nm(VR.max)}</em>
        <i class="tk" style="left:${pos(VR.valor)}%"></i><em class="dn c" style="left:${pos(VR.valor)}%">Valor de mercado</em>
        <i class="tk rec"></i><em class="up rec">Salida · ${eu(VR.precio)}</em>
      </div>
      <div class="vx-pasos">
        <div><span>Parte baja</span><b>${eu(VR.min)}</b><i>del rango</i></div>
        <div class="rec"><span>Salida</span><b>${eu(VR.precio)}</b><i>${nm(VR.eurm2)} €/m²</i></div>
        <div><span>Valor de mercado</span><b>${eu(VR.valor)}</b><i>${nm(VR.valor / VR.m2)} €/m²</i></div>
        <div><span>Parte alta</span><b>${eu(VR.max)}</b><i>del rango</i></div>
      </div>`;

    // regla por metro: cada testigo es un punto
    const lim = [emin, emax, VR.eurm2, VR.pedido].concat(N ? [N.eurm2] : []), lmin = Math.min(...lim), lmax = Math.max(...lim);
    const e0 = Math.floor((lmin - 250) / 500) * 500, e1 = Math.ceil((lmax + 250) / 500) * 500, pe = (v) => (((v - e0) / (e1 - e0)) * 100).toFixed(2);
    const ejes = []; for (let v = Math.ceil(e0 / 1000) * 1000; v <= e1; v += 1000) ejes.push(v);
    const enjambre = `<div class="vx-enj" id="vxEnj">
        ${N ? `<i class="mk nota-ria" style="left:${pe(N.eurm2)}%"></i>` : ''}<i class="mk tu" style="left:${pe(VR.eurm2)}%"></i><i class="mk pide" style="left:${pe(VR.pedido)}%"></i>
        ${ts.map((t, i) => `<button type="button" class="pt" data-i="${i}" data-x="${pe(t.eurm2)}" style="left:${pe(t.eurm2)}%" aria-label="Testigo ${i + 1}: ${esc(t.calle)}, ${nm(t.eurm2)} euros por metro">${i + 1}</button>`).join('')}
        <div class="eje">${ejes.map((v) => `<span style="left:${pe(v)}%">${nm(v)}</span>`).join('')}</div>
      </div>`;

    // testigos uno a uno, de menos a más por metro
    const filas = ts.map((t, i) => ({ t, i })).sort((a, b) => a.t.eurm2 - b.t.eurm2);
    const ancho = (v) => (18 + 82 * ((v - emin) / (emax - emin || 1))).toFixed(1);
    const tuFila = `<li class="tu"><span class="n">★</span><span class="c"><b>${Vos} casa</b><small>${VR.m2} m² · precio de salida</small></span><span class="e">${nm(VR.eurm2)} €/m²<small>${eu(VR.precio)}</small></span><span class="b"><i style="width:${ancho(VR.eurm2)}%"></i></span></li>`;
    let puesta = false;
    const lista = filas.map(({ t, i }) => {
      let h = '';
      if (!puesta && t.eurm2 > VR.eurm2) { h = tuFila; puesta = true; }
      return h + `<li data-i="${i}" tabindex="0"><span class="n">${i + 1}</span><span class="c"><b>${esc(t.calle)}</b><small>${t.m2} m² · a ${t.dist} m${VR.soloVenta ? '' : ' · ' + sit(t)}</small></span><span class="e">${nm(t.eurm2)} €/m²<small>${eu(t.precio)}</small></span><span class="b"><i style="width:${ancho(t.eurm2)}%"></i></span></li>`;
    }).join('') + (puesta ? '' : tuFila);

    // notaría: evolución (opcional)
    const mesLargo = { ene: 'enero', feb: 'febrero', mar: 'marzo', abr: 'abril', may: 'mayo', jun: 'junio', jul: 'julio', ago: 'agosto', sep: 'septiembre', oct: 'octubre', nov: 'noviembre', dic: 'diciembre' }[String((ms || [{ mes: '' }]).at(-1).mes).split(' ')[0]] || '';
    let notaria = '';
    if (N) {
    const mm = ms || [{ v: 1 }, { v: 2 }];
    const vmin = Math.min(...mm.map((m) => m.v)) * 0.96, vmax = Math.max(...mm.map((m) => m.v)) * 1.03, W = 440, Hh = 170;
    const px = (i) => ((i / (mm.length - 1)) * W).toFixed(1), py = (v) => (Hh - ((v - vmin) / (vmax - vmin)) * Hh).toFixed(1);
    const camino = mm.map((m, i) => `${i ? 'L' : 'M'}${px(i)} ${py(m.v)}`).join(' ');
    const linea = ms ? `<div class="vx-linea">
          <div class="vx-k">Lo firmado, mes a mes</div>
          <h3>${subida >= 0 ? 'Y sigue subiendo' : 'Y así ha ido'}: <em>${subida >= 0 ? '+' : ''}${subida} %</em> en ${ms.length - 1} meses</h3>
          <svg viewBox="-14 -26 ${W + 30} ${Hh + 54}" role="img" aria-label="Precio por metro firmado en notaría, por meses: de ${nm(ms[0].v)} a ${nm(ms.at(-1).v)} euros por metro">
            <defs><linearGradient id="vxArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--c-acento)" stop-opacity=".34"/><stop offset="1" stop-color="var(--c-acento)" stop-opacity="0"/></linearGradient></defs>
            <path class="area" d="${camino} L${W} ${Hh} L0 ${Hh} Z" fill="url(#vxArea)"/>
            <path class="trazo" pathLength="1" d="${camino}"/>
            ${ms.map((m, i) => `<circle class="${i === ms.length - 1 ? 'fin' : ''}" cx="${px(i)}" cy="${py(m.v)}" r="${i === ms.length - 1 ? 6 : 3.5}"/><text class="eje" x="${px(i)}" y="${Hh + 22}" text-anchor="${i ? (i === ms.length - 1 ? 'end' : 'middle') : 'start'}">${esc(m.mes)}</text>`).join('')}
            <text class="vt" x="0" y="${+py(ms[0].v) - 14}" text-anchor="start">${nm(ms[0].v)} €/m²</text>
            <text class="vt" x="${W}" y="${+py(ms.at(-1).v) - 16}" text-anchor="end">${nm(ms.at(-1).v)} €/m²</text>
          </svg>
        </div>` : '';
    notaria = `<div class="vx-caja vx-not rv${ms ? '' : ' sola'}" id="vxNot">
        <div>
          <div class="vx-k">Notaría</div>
          <h3>${VR.pedido > N.eurm2 ? 'Se pide más de lo que se firma' : 'Lo que se pide y lo que se firma'}</h3>
          <div class="vx-pf">
            <div><span>Se pide</span><strong>${nm(VR.pedido)}<small>€/m²</small></strong><i><u data-w="${((VR.pedido / Math.max(VR.pedido, N.eurm2)) * 100).toFixed(1)}"></u></i><em>Anuncios de pisos parecidos</em></div>
            <div class="ok"><span>Se firma</span><strong>${nm(N.eurm2)}<small>€/m²</small></strong><i><u data-w="${((N.eurm2 / Math.max(VR.pedido, N.eurm2)) * 100).toFixed(1)}"></u></i><em>${N.ventas ? nm(N.ventas) + ' escrituras' : 'Escrituras'}${radioN ? ' · a ' + radioN : ''} · último año</em></div>
          </div>
          <p class="vx-nota">${sobre > 0 ? `Lo pedido va un <b>${sobre} % por encima</b> de lo que se firma.` : 'Lo pedido y lo firmado van casi a la par.'} El precio de salida, ${nm(VR.eurm2)} €/m², ${VR.eurm2 <= Math.max(VR.pedido, N.eurm2) && VR.eurm2 >= Math.min(VR.pedido, N.eurm2) ? 'queda entre los dos' : 'está calculado con los dos'}.</p>
        </div>
        ${linea}
      </div>`;
    }

    sec.innerHTML = `
    <div class="vx-escena" id="vxEscena">
      <canvas id="vxCanvas" aria-hidden="true"></canvas>
      <div class="vx-velo"></div>
      <div class="wrap vx-capa">
        <div class="vx-cab">
          <div class="kicker">La valoración</div>
          <h2>${T('Lo que vale <em>vuestra casa</em>', 'Lo que vale <em>tu casa</em>')}</h2>
          ${VR.origen ? `<span class="vx-origen">${esc(VR.origen)}</span>` : ''}
        </div>
        <div class="vx-pie">
          <div class="vx-seg" role="group" aria-label="Vista del mapa de testigos">
            <button type="button" data-vista="0" class="on" aria-pressed="true">Ciudad 3D</button><button type="button" data-vista="1" aria-pressed="false">Desde arriba</button>
          </div>
          <div class="vx-precio">
            <div class="vx-k">Precio de salida que ${os} propongo</div>
            <strong class="vx-num"><span id="vxNum">${nm(VR.precio)}</span><small>€</small></strong>
            <p class="vx-sub"><b>${nm(VR.eurm2)} €/m²</b> · ${VR.m2} m² · dentro del rango del mercado</p>
            <div class="vx-datos"><span><b>${n}</b> ${parecidos} a menos de ${radio} m</span>${N && N.ventas ? `<span><b>${nm(N.ventas)}</b> ventas en notaría</span>` : ''}</div>
          </div>
        </div>
      </div>
      <div class="vx-ficha" id="vxFicha" hidden></div>
    </div>
    <div class="wrap vx-cuerpo">
      <p class="vx-ley"><span class="l-tes"><i></i>${VR.soloVenta ? 'Pisos parecidos a la venta' : 'Pisos parecidos'}: cuanto más alta la columna, más caro el metro</span><span class="l-not"><i></i>${N ? 'Ventas en notaría' : 'Otras ventas de la zona'} (posición ilustrativa)</span><span class="l-casa"><i></i>${Vos} casa</span></p>

      <div class="vx-caja vx-regla rv">
        <div class="vx-k">Regla de precios</div>
        <h3>Dónde cae el precio de salida dentro del rango</h3>
        ${regla}
        <p class="vx-nota">${VR.precio < VR.valor ? 'Salimos un poco por debajo del valor de mercado a propósito' : VR.precio > VR.valor ? 'Salimos un poco por encima del valor de mercado para dejar margen a la negociación' : 'Salimos en el valor de mercado'}: por metro, ${vos} casa queda más barata que <b>${VR.masCaros} de los ${VR.base}</b> pisos parecidos que hay ahora a la venta.</p>
      </div>

      <div class="vx-caja vx-metro rv">
          <div class="vx-k">Por metro cuadrado</div>
          <h3>Los ${n} ${parecidos}, en una sola línea</h3>
          <div class="vx-leyenda">
            ${N ? `<span class="l-firma"><i></i>Se firma en notaría<b>${nm(N.eurm2)} €/m²</b></span>` : ''}
            <span class="l-tu"><i></i>${Vos} casa<b>${nm(VR.eurm2)} €/m²</b></span>
            <span class="l-pide"><i></i>Piden de media<b>${nm(VR.pedido)} €/m²</b></span>
          </div>
          ${enjambre}
          <p class="vx-nota">Cada número es un piso. Toca uno para verlo en el mapa.</p>
      </div>
      <div class="vx-caja vx-esc rv">
          <div class="vx-k">Uno a uno</div>
          <h3>${VR.soloVenta ? 'Lo que piden' : 'Pisos parecidos'}, de menos a más por metro</h3>
          <ol class="vx-lista" id="vxLista">${lista}</ol>
      </div>

      ${notaria}

      <div class="vx-raz">
        ${[
          [`${n}`, `${parecidos}, muy cerca`, `De ${Math.min(...ts.map((t) => t.m2))} a ${Math.max(...ts.map((t) => t.m2))} m² y a menos de ${radio} m. Piden de media ${nm(VR.pedido)} €/m².`],
          N ? [`${nm(N.eurm2)} €`, 'por metro, firmado en notaría', `${N.ventas ? `Son ${nm(N.ventas)} ventas reales del último año${radioN ? ' a ' + radioN : ''}.` : 'Ventas reales del último año en la zona.'}${ms && mesLargo ? ` Y en ${mesLargo} ya se firmó a ${nm(ms.at(-1).v)} €/m².` : ''}`] : null,
          [`${VR.masCaros} de ${VR.base}`, 'anuncios parecidos piden más por metro', VR.masCaros * 2 >= VR.base ? `Salir a ${eu(VR.precio)} pone ${vos} casa la primera en la lista de quien busca en la zona, sin regalarla.` : `Salir a ${eu(VR.precio)} deja ${vos} casa en la parte alta de la zona: el plan y la imagen tienen que justificarlo.`],
        ].filter(Boolean).map((a, i) => `<div class="rv" style="transition-delay:${i * 110}ms"><span class="n">0${i + 1}</span><strong>${a[0]}</strong><b>${a[1]}</b><p>${a[2]}</p></div>`).join('')}
      </div>
      <p class="vx-aviso">Estimación orientativa de mercado con ${n} testigos${N ? ' y precios de notaría' : ''}. Situación de los testigos aproximada (unos 100 m), sin número de portal. No es una tasación oficial.</p>
    </div>`;

    // los mockups enseñan ya el precio de salida
    document.querySelectorAll('[data-precio-salida]').forEach((el) => { el.textContent = eu(VR.precio); el.classList.remove('vacio'); });

    /* --- escáner y enlaces entre mapa, puntos y lista --- */
    const cv = document.getElementById('vxCanvas'), escena = document.getElementById('vxEscena'), ficha = document.getElementById('vxFicha');
    const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cuenta = () => {
      if (reducido || MUESTRA) return;
      const el = document.getElementById('vxNum'), desde = VR.precio * 0.86, t0 = performance.now();
      const f = (t) => { const k = Math.min(1, (t - t0) / 2200), e = 1 - Math.pow(1 - k, 4); el.textContent = nm(Math.round((desde + (VR.precio - desde) * e) / 500) * 500); if (k < 1) requestAnimationFrame(f); else el.textContent = nm(VR.precio); };
      requestAnimationFrame(f);
    };
    const E = escaner(cv, { etiqueta: `${Vos} casa`, alEntrar: cuenta });
    let fijo = null;
    const enlazados = () => sec.querySelectorAll('.pt,.vx-lista li[data-i]');
    function marcar(i, desdeMapa) {
      enlazados().forEach((e) => e.classList.toggle('on', +e.dataset.i === i));
      if (E) E.seleccionar(i);
      if (i == null) { ficha.hidden = true; return; }
      const t = ts[i];
      ficha.innerHTML = `<b>${i + 1}</b><span>${esc(t.calle)} · ${t.m2} m² · a ${t.dist} m</span><strong>${eu(t.precio)}</strong><em>${nm(t.eurm2)} €/m²</em>`;
      ficha.hidden = false;
      const p = E && E.punto(i), a = escena.clientWidth;
      const fx = p && p[0] > 0 ? p[0] : a / 2, fy = p && p[1] > 0 ? p[1] : escena.clientHeight * 0.3;
      ficha.style.left = clamp(fx, 150, a - 150) + 'px';
      ficha.style.top = Math.max(84, fy - 26) + 'px';
      if (!desdeMapa && !reducido) { /* el mapa sigue girando: la ficha acompaña a su columna */ }
    }
    // la ficha sigue a su columna mientras gira
    (function sigue() {
      requestAnimationFrame(sigue);
      if (ficha.hidden || !E) return;
      const i = +(sec.querySelector('.pt.on') || {}).dataset?.i;
      if (isNaN(i)) return;
      const p = E.punto(i);
      if (!p || p[0] < 0) return;
      ficha.style.left = clamp(p[0], 150, escena.clientWidth - 150) + 'px';
      ficha.style.top = Math.max(84, p[1] - 26) + 'px';
    })();
    const rel = (ev) => { const b = cv.getBoundingClientRect(); return [ev.clientX - b.left, ev.clientY - b.top]; };
    cv.addEventListener('pointermove', (ev) => {
      if (ev.pointerType === 'touch' || !E) return;
      const [x, y] = rel(ev), i = E.cerca(x, y, 26);
      cv.style.cursor = i >= 0 ? 'pointer' : '';
      if (i >= 0) marcar(i, true); else if (fijo == null) marcar(null); else marcar(fijo, true);
    });
    cv.addEventListener('pointerleave', () => marcar(fijo));
    cv.addEventListener('click', (ev) => {
      if (!E) return;
      const [x, y] = rel(ev), i = E.cerca(x, y, 34);
      fijo = i >= 0 && i !== fijo ? i : null;
      marcar(fijo, true);
    });
    enlazados().forEach((e) => {
      const i = +e.dataset.i;
      e.addEventListener('mouseenter', () => marcar(i));
      e.addEventListener('mouseleave', () => marcar(fijo));
      e.addEventListener('focus', () => marcar(i));
      e.addEventListener('click', () => { fijo = fijo === i ? null : i; marcar(fijo); });
      e.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); e.click(); } });
    });
    sec.querySelectorAll('[data-vista]').forEach((b) => b.addEventListener('click', () => {
      sec.querySelectorAll('[data-vista]').forEach((x) => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
      if (E) E.vista(+b.dataset.vista);
    }));

    /* --- los puntos de la regla por metro no se pisan: se apilan por filas --- */
    const enj = document.getElementById('vxEnj');
    function apilar() {
      const a = enj.clientWidth, paso = 27, filasX = [];
      let alto = 0;
      [...enj.querySelectorAll('.pt')].sort((p, q) => p.dataset.x - q.dataset.x).forEach((p) => {
        const x = (p.dataset.x / 100) * a;
        let f = 0;
        while (filasX[f] != null && x - filasX[f] < paso) f++;
        filasX[f] = x;
        p.style.bottom = 34 + f * paso + 'px';
        alto = Math.max(alto, f);
      });
      enj.style.height = 34 + (alto + 1) * paso + 22 + 'px';
    }
    new ResizeObserver(apilar).observe(enj);
    apilar();

    /* --- barras y trazo al entrar --- */
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      e.target.classList.add('vivo');
      e.target.querySelectorAll('[data-w]').forEach((u) => (u.style.width = u.dataset.w + '%'));
    }), { threshold: 0.25 });
    sec.querySelectorAll('.vx-not,.vx-regla,.vx-esc').forEach((e) => io.observe(e));
  };
})();
