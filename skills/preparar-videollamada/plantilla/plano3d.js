/* Plano 3D · motor
   Lee window.PLANO_DATA (paredes, ventanas, suelos, etiquetas y muebles en píxeles del plano)
   y pinta una maqueta 3D con paredes cortadas, materiales realistas, luz de entorno y muebles por estilo.
   Necesita three.js r128 + OrbitControls + RoomEnvironment + RoundedBoxGeometry (ver plantilla/seccion.html).
   No se toca por vivienda: todo lo propio de cada casa va en plano-data.js.
   Opcional en PLANO_DATA: colores: { pared: '#f4efe8', base: '#24201c', canto: '#1a1714' } */
(function () {
  const D = window.PLANO_DATA;
  const host = D && document.getElementById(D.el || 'maqueta');
  if (!host || !window.THREE) return;
  const PX = D.px, CX = D.cx, CZ = D.cz, T = D.alturaCorte || 1.15;
  const X = p => (p - CX) / PX, Z = p => (p - CZ) / PX;
  const RB = THREE.RoundedBoxGeometry;

  // ---------- Render ----------
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.physicallyCorrectLights = true;
  host.appendChild(renderer.domElement);

  if (THREE.RoomEnvironment) {
    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(new THREE.RoomEnvironment(), 0.04).texture;
  }

  const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  const VISTAS = { maqueta: [6.5, 13, 9], aerea: [0, 17, 0.01], baja: [9, 3.8, 7.5] };
  cam.position.set(...VISTAS.maqueta);
  const ctr = new THREE.OrbitControls(cam, renderer.domElement);
  ctr.target.set(0, 0, 0.3);
  ctr.enableDamping = true; ctr.dampingFactor = 0.06;
  ctr.minDistance = 3; ctr.maxDistance = 30;
  ctr.maxPolarAngle = Math.PI * 0.47;
  ctr.autoRotate = true; ctr.autoRotateSpeed = 0.5;
  ctr.enablePan = false;

  // Luz: sol cálido de tarde (sombras) + cielo suave + entorno
  scene.add(new THREE.HemisphereLight(0xfff6ec, 0x3a3029, 0.6));
  const sun = new THREE.DirectionalLight(0xffe7cf, 3.2);
  sun.position.set(-6, 12, -4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 1, far: 40 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; sun.shadow.radius = 5;
  scene.add(sun);

  // ---------- Texturas procedurales ----------
  function lienzo(n, draw) { const c = document.createElement('canvas'); c.width = c.height = n; draw(c.getContext('2d'), n); return c; }
  function tex(c, rx, ry, color = true) {
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry || rx);
    if (color) t.encoding = THREE.sRGBEncoding; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
  }
  const rnd = (a, b) => a + Math.random() * (b - a);
  function parquet(h, s, l) {
    return lienzo(1024, (g, n) => {
      const filas = 8, alto = n / filas;
      for (let i = 0; i < filas; i++) {
        let x = -rnd(0, n / 2);
        while (x < n) {
          const largo = rnd(n * 0.45, n * 0.9), L = l + rnd(-5, 5);
          g.fillStyle = `hsl(${h + rnd(-3, 3)},${s}%,${L}%)`; g.fillRect(x, i * alto, largo, alto);
          for (let k = 0; k < 26; k++) {
            g.strokeStyle = `hsla(${h - 6},${s + 10}%,${L - 18}%,${rnd(.04, .14)})`; g.lineWidth = rnd(.6, 1.6);
            const y = i * alto + rnd(2, alto - 2); g.beginPath(); g.moveTo(x, y);
            g.bezierCurveTo(x + largo * .3, y + rnd(-3, 3), x + largo * .6, y + rnd(-3, 3), x + largo, y + rnd(-2, 2)); g.stroke();
          }
          if (Math.random() < .35) { g.fillStyle = `hsla(${h - 8},40%,${L - 22}%,.25)`; g.beginPath(); g.ellipse(x + rnd(20, largo - 20), i * alto + alto / 2, rnd(4, 9), rnd(2, 4), 0, 0, 7); g.fill(); }
          g.fillStyle = 'rgba(40,25,15,.45)'; g.fillRect(x, i * alto, 1.5, alto);
          x += largo;
        }
        g.fillStyle = 'rgba(40,25,15,.4)'; g.fillRect(0, i * alto, n, 1.5);
      }
    });
  }
  function rugosidad(base, ruido) {
    return lienzo(256, (g, n) => { const d = g.createImageData(n, n); for (let i = 0; i < d.data.length; i += 4) { const v = base + (Math.random() - .5) * ruido; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; } g.putImageData(d, 0, 0); });
  }
  function baldosas(cols, filas, hsl, junta) {
    return lienzo(1024, (g, n) => {
      g.fillStyle = junta; g.fillRect(0, 0, n, n);
      const w = n / cols, h = n / filas;
      for (let x = 0; x < cols; x++) for (let y = 0; y < filas; y++) {
        const [H, S, L] = hsl; g.fillStyle = `hsl(${H},${S}%,${L + rnd(-2.5, 2.5)}%)`; g.fillRect(x * w + 3, y * h + 3, w - 6, h - 6);
        for (let k = 0; k < 120; k++) { g.fillStyle = `hsla(${H},${S}%,${L + rnd(-10, 10)}%,.25)`; g.fillRect(x * w + rnd(3, w - 6), y * h + rnd(3, h - 6), rnd(1, 4), rnd(1, 4)); }
      }
    });
  }
  function tejido(hex) {
    return lienzo(256, (g, n) => {
      g.fillStyle = hex; g.fillRect(0, 0, n, n);
      for (let y = 0; y < n; y += 2) { g.fillStyle = `rgba(0,0,0,${rnd(.02, .07)})`; g.fillRect(0, y, n, 1); }
      for (let x = 0; x < n; x += 2) { g.fillStyle = `rgba(255,255,255,${rnd(.02, .06)})`; g.fillRect(x, 0, 1, n); }
    });
  }

  const T_ROBLE = parquet(32, 42, 66), T_NOGAL = parquet(24, 38, 34), T_SUELO = parquet(30, 40, 60);
  const R_MADERA = rugosidad(150, 70);

  function M(o) { return new THREE.MeshStandardMaterial(Object.assign({ envMapIntensity: 0.9 }, o)); }
  function madera(c, rep = 1) { return M({ map: tex(c, rep), roughnessMap: tex(R_MADERA, rep, rep, false), roughness: .62 }); }
  function tela(hex, rep = 3) { return M({ map: tex(tejido(hex), rep), roughness: 1, envMapIntensity: .5 }); }

  const COL = Object.assign({ pared: '#f4efe8', base: '#24201c', canto: '#1a1714' }, D.colores || {});
  const MAT = {
    pared: M({ color: new THREE.Color(COL.pared), roughness: .95 }),
    canto: M({ color: new THREE.Color(COL.canto), roughness: .55 }),
    losa: M({ color: new THREE.Color(COL.base), roughness: .8 }),
    cristal: new THREE.MeshPhysicalMaterial({ color: 0xdff1ff, transparent: true, opacity: .28, roughness: .03, metalness: 0, envMapIntensity: 1.6 }),
    sueloMadera: T_SUELO, sueloBaldosa: baldosas(4, 4, [30, 10, 82], '#b9b0a6'), sueloGres: baldosas(2, 4, [30, 3, 46], '#3b3835'),
    porcelana: new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .12, clearcoat: 1, clearcoatRoughness: .08, envMapIntensity: 1.2 }),
    cromo: M({ color: 0xdddddd, metalness: 1, roughness: .12, envMapIntensity: 1.4 }),
    agua: new THREE.MeshPhysicalMaterial({ color: 0x9fd8e4, roughness: .02, transparent: true, opacity: .75, envMapIntensity: 1.5 }),
    cristalDucha: new THREE.MeshPhysicalMaterial({ color: 0xeaf6ff, transparent: true, opacity: .22, roughness: .02, envMapIntensity: 1.5 }),
    pantalla: M({ color: 0x0b0b0c, roughness: .18, metalness: .2 }),
    hojas: M({ color: 0x4f6b3d, roughness: .75 }),
    hojas2: M({ color: 0x6d8a52, roughness: .75 })
  };

  // Estilos de mobiliario
  const ESTILOS = {
    nordico: {
      madera: madera(T_ROBLE, 1.2), lacado: M({ color: 0xf3f0ea, roughness: .45 }), metal: M({ color: 0x1d1d1d, metalness: .6, roughness: .45 }),
      sofa: tela('#d8d2c8'), cojin1: tela('#9aab94'), cojin2: tela('#d6a84a'), alfombra: tela('#ece5d8', 6),
      ropaCama: tela('#f7f5f1'), manta: tela('#a9b8a2'), cabecero: tela('#cfc6b8'), maceta: M({ color: 0xe9e3da, roughness: .6 }),
      encimera: M({ color: 0xf2efe9, roughness: .25 }), frente: M({ color: 0xeeeae3, roughness: .4 }), pantalla: M({ color: 0xfff1d6, emissive: 0xffe2b0, emissiveIntensity: .6, roughness: .9 })
    },
    moderno: {
      madera: madera(T_NOGAL, 1.2), lacado: M({ color: 0x2a2826, roughness: .35 }), metal: M({ color: 0xb48b55, metalness: 1, roughness: .28 }),
      sofa: tela('#55534f'), cojin1: tela('#a5643c'), cojin2: tela('#d9d2c6'), alfombra: tela('#8f8a84', 6),
      ropaCama: tela('#e9e6e1'), manta: tela('#a5643c'), cabecero: tela('#4c4a47'), maceta: M({ color: 0x2b2927, roughness: .5 }),
      encimera: M({ color: 0x1e1d1c, roughness: .2 }), frente: M({ color: 0x3a3632, roughness: .35 }), pantalla: M({ color: 0xfff1d6, emissive: 0xffd9a0, emissiveIntensity: .6, roughness: .9 })
    }
  };

  // ---------- Casa ----------
  const casa = new THREE.Group(); scene.add(casa);
  const paredes = new THREE.Group(); casa.add(paredes);
  let muebles = new THREE.Group(); casa.add(muebles);

  const xs = D.paredes.flatMap(p => [p[0], p[2]]), zs = D.paredes.flatMap(p => [p[1], p[3]]);
  const [x0, x1, z0, z1] = [Math.min(...xs), Math.max(...xs), Math.min(...zs), Math.max(...zs)];
  const base = new THREE.Mesh(new RB((x1 - x0) / PX + .7, .28, (z1 - z0) / PX + .7, 2, .04), MAT.losa);
  base.position.set(X((x0 + x1) / 2), -.15, Z((z0 + z1) / 2)); base.receiveShadow = true; casa.add(base);

  D.suelos.forEach(([a, b, c, d, t]) => {
    const w = (c - a) / PX + .16, dd = (d - b) / PX + .16;
    const src = { madera: MAT.sueloMadera, baldosa: MAT.sueloBaldosa, gres: MAT.sueloGres }[t];
    const rep = { madera: .45, baldosa: .75, gres: .9 }[t];
    const m = M({ map: tex(src, w * rep, dd * rep), roughnessMap: tex(R_MADERA, w, dd, false), roughness: t === 'madera' ? .55 : .35 });
    const f = new THREE.Mesh(new THREE.BoxGeometry(w, .04, dd), m);
    f.position.set(X((a + c) / 2), 0, Z((b + d) / 2)); f.receiveShadow = true; casa.add(f);
  });

  function caja(a, b, c, d, y0, h, mat, grupo, sombra = true) {
    const g = new THREE.BoxGeometry(Math.max((c - a) / PX, .12), h, Math.max((d - b) / PX, .12)); g.translate(0, h / 2, 0);
    const m = new THREE.Mesh(g, mat); m.position.set(X((a + c) / 2), y0, Z((b + d) / 2));
    m.castShadow = sombra; m.receiveShadow = true; grupo.add(m); return m;
  }
  D.paredes.forEach(w => { caja(...w, .02, T, MAT.pared, paredes); caja(...w, T + .02, .022, MAT.canto, paredes); });
  (D.ventanas || []).forEach(v => {
    caja(...v, .02, .55, MAT.pared, paredes);
    caja(...v, .57, T - .55, MAT.cristal, paredes, false);
    caja(...v, T + .02, .022, MAT.canto, paredes);
  });

  // ---------- Catálogo de muebles (metros; origen en el suelo; el frente mira a +z) ----------
  function pieza(g, geo, mat, x, y, z) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; g.add(m); return m; }
  const bx = (g, w, h, d, x, y, z, mat, r = .012) => pieza(g, r > 0 ? new RB(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)) : new THREE.BoxGeometry(w, h, d), mat, x, y + h / 2, z);
  const cil = (g, rt, rb, h, x, y, z, mat, seg = 28) => pieza(g, new THREE.CylinderGeometry(rt, rb, h, seg), mat, x, y + h / 2, z);
  function patas(g, w, d, h, mat, inset = .06, r = .018) {
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([i, j]) => cil(g, r, r * .7, h, i * (w / 2 - inset), 0, j * (d / 2 - inset), mat, 12));
  }

  const CAT = {
    alfombra(g, S, o) { bx(g, o.w || 2.4, .014, o.d || 1.6, 0, .02, 0, S.alfombra, .006); },
    sofa(g, S, o) {
      const w = o.w || 2.2, d = .95;
      patas(g, w - .1, d - .1, .1, S.metal, .05, .015);
      bx(g, w, .2, d, 0, .1, 0, S.sofa, .04);
      bx(g, w, .44, .2, 0, .3, -d / 2 + .1, S.sofa, .06);
      [-1, 1].forEach(i => bx(g, .18, .32, d, i * (w / 2 - .09), .3, 0, S.sofa, .06));
      const n = 3, cw = (w - .4) / n;
      for (let k = 0; k < n; k++) {
        const cx = -w / 2 + .2 + cw / 2 + k * cw;
        bx(g, cw - .015, .14, d - .26, cx, .3, .06, S.sofa, .05);
        bx(g, cw - .03, .4, .16, cx, .42, -d / 2 + .28, S.sofa, .07);
      }
      bx(g, .42, .4, .12, -w / 2 + .45, .44, -d / 2 + .38, S.cojin1, .06).rotation.z = .12;
      bx(g, .4, .38, .12, w / 2 - .45, .44, -d / 2 + .38, S.cojin2, .06).rotation.z = -.1;
      bx(g, .6, .02, .5, w / 2 - .5, .45, .05, S.manta, .01);
    },
    mesaCentro(g, S) {
      cil(g, .42, .42, .035, 0, .36, 0, S.madera, 48);
      cil(g, .3, .3, .02, 0, .14, 0, S.madera, 48);
      [0, 1, 2].forEach(k => { const a = k * 2.094; cil(g, .014, .014, .38, Math.cos(a) * .3, 0, Math.sin(a) * .3, S.metal, 10); });
      cil(g, .06, .05, .12, .1, .395, -.05, MAT.porcelana, 24);
      bx(g, .22, .03, .16, -.12, .395, .08, S.lacado, .008);
    },
    muebleTV(g, S, o) {
      const w = o.w || 1.8;
      patas(g, w - .1, .38, .14, S.metal, .04, .012);
      bx(g, w, .42, .42, 0, .14, 0, S.madera, .015);
      for (let k = 0; k < 3; k++) bx(g, w / 3 - .02, .38, .01, -w / 3 + k * w / 3, .16, .21, S.frente, .004);
      bx(g, 1.23, .72, .035, 0, .6, -.08, MAT.pantalla, .01);
      bx(g, .3, .02, .18, 0, .56, -.05, S.metal, .005);
      cil(g, .06, .07, .16, w / 2 - .2, .56, 0, S.maceta, 20);
      pieza(g, new THREE.IcosahedronGeometry(.13, 1), MAT.hojas, w / 2 - .2, .82, 0);
    },
    lamparaPie(g, S) {
      cil(g, .14, .15, .025, 0, 0, 0, S.metal, 32);
      cil(g, .012, .012, 1.0, 0, .02, 0, S.metal, 10);
      cil(g, .14, .22, .26, 0, .86, 0, S.pantalla, 36);
      const l = new THREE.PointLight(0xffd9a6, 1.6, 3.2, 2); l.position.set(0, .9, 0); g.add(l);
    },
    planta(g, S, o) {
      const h = o.h || .9;
      cil(g, .16, .12, .3, 0, 0, 0, S.maceta, 28);
      const n = 7 + Math.round(h * 6);
      for (let k = 0; k < n; k++) {
        const a = Math.random() * 6.28, rr = Math.random() * .16, y = .35 + Math.random() * (h - .45);
        const s = .1 + Math.random() * .1;
        const m = pieza(g, new THREE.IcosahedronGeometry(s, 0), k % 2 ? MAT.hojas : MAT.hojas2, Math.cos(a) * rr, y, Math.sin(a) * rr);
        m.rotation.set(Math.random() * 3, Math.random() * 3, 0); m.scale.set(1, 1.6, .5);
      }
      cil(g, .012, .012, h - .3, 0, .3, 0, S.madera, 6);
    },
    comedor(g, S) {
      const w = 1.6, d = .9;
      bx(g, w, .04, d, 0, .72, 0, S.madera, .02);
      patas(g, w, d, .72, S.madera, .1, .025);
      [[-.45, -1], [.45, -1], [-.45, 1], [.45, 1]].forEach(([x, s]) => {
        const c = new THREE.Group(); c.position.set(x, 0, s * (d / 2 + .12)); c.rotation.y = s > 0 ? Math.PI : 0; g.add(c);
        patas(c, .42, .42, .45, S.madera, .03, .014);
        bx(c, .45, .045, .44, 0, .45, 0, S.madera, .02);
        bx(c, .45, .3, .03, 0, .5, -.21, S.madera, .015).rotation.x = -.08;
      });
      cil(g, .1, .08, .14, 0, .76, 0, MAT.porcelana, 24);
      pieza(g, new THREE.IcosahedronGeometry(.1, 1), MAT.hojas2, 0, .95, 0).scale.set(1.2, .6, 1.2);
    },
    aparador(g, S, o) {
      const w = o.w || 1.2;
      patas(g, w - .08, .38, .16, S.metal, .04, .012);
      bx(g, w, .62, .42, 0, .16, 0, S.madera, .015);
      for (let k = 0; k < 2; k++) bx(g, w / 2 - .02, .56, .01, -w / 4 + k * w / 2, .19, .21, S.frente, .004);
      cil(g, .07, .05, .3, -w / 3, .78, 0, MAT.porcelana, 24);
      bx(g, .3, .04, .22, w / 4, .78, 0, S.lacado, .01);
    },
    cocinaLineal(g, S, o) {
      const w = o.w || 3.6, d = .62, nev = .62, resto = w - nev;
      bx(g, resto, .1, d - .06, -nev / 2, 0, -.03, MAT.canto, 0);
      bx(g, resto, .76, d, -nev / 2, .1, 0, S.lacado, .006);
      const nP = Math.max(3, Math.round(resto / .6)), pw = resto / nP;
      for (let k = 0; k < nP; k++) {
        const x = -w / 2 + pw / 2 + k * pw;
        bx(g, pw - .012, .72, .02, x, .12, d / 2, S.frente, .006);
        bx(g, pw * .5, .012, .02, x, .78, d / 2 + .015, S.metal, .004);
      }
      bx(g, resto + .02, .04, d + .02, -nev / 2, .86, 0, S.encimera, .005);
      bx(g, .7, .012, .45, -w / 2 + resto * .62, .897, -.03, MAT.pantalla, .01);
      bx(g, .5, .02, .4, -w / 2 + resto * .28, .885, -.03, MAT.cromo, .02);
      cil(g, .012, .012, .28, -w / 2 + resto * .28, .9, -.24, MAT.cromo, 10);
      bx(g, nev, T - .06, d, w / 2 - nev / 2, 0, 0, S.frente, .008);
      bx(g, .02, .45, .02, w / 2 - nev + .06, .45, d / 2 + .01, S.metal, .005);
      bx(g, .4, .16, .3, -w / 2 + resto * .82, .9, -.1, MAT.porcelana, .02);
    },
    ducha(g, S, o) {
      const w = o.w || .9, d = o.d || 1.2;
      bx(g, w, .04, d, 0, .02, 0, MAT.porcelana, .01);
      bx(g, .01, .9, d * .7, w / 2, .06, d * .15, MAT.cristalDucha, 0).castShadow = false;
      cil(g, .1, .1, .01, -w / 2 + .15, .95, -d / 2 + .15, MAT.cromo, 24);
      cil(g, .01, .01, .9, -w / 2 + .05, .06, -d / 2 + .05, MAT.cromo, 8);
    },
    lavabo(g, S, o) {
      const w = o.w || .8;
      bx(g, w, .46, .46, 0, .38, 0, S.madera, .012);
      bx(g, w + .02, .03, .48, 0, .84, 0, S.encimera, .006);
      bx(g, w * .55, .12, .36, 0, .87, .02, MAT.porcelana, .05);
      cil(g, .012, .012, .18, 0, .87, -.2, MAT.cromo, 10);
      bx(g, w * .9, .26, .02, 0, .96, -.23, M({ color: 0xcfe3ea, metalness: .9, roughness: .05 }), .01);
    },
    inodoro(g) {
      bx(g, .38, .4, .55, 0, 0, .04, MAT.porcelana, .14);
      bx(g, .38, .03, .5, 0, .4, .06, MAT.porcelana, .05);
      bx(g, .4, .32, .16, 0, .38, -.2, MAT.porcelana, .05);
    },
    banera(g, S, o) {
      const w = o.w || 1.7, d = o.d || .8;
      bx(g, w, .55, d, 0, 0, 0, MAT.porcelana, .08);
      bx(g, w - .16, .02, d - .16, 0, .5, 0, MAT.agua, .05);
      [[-.4, .25], [.2, -.25], [.5, .2]].forEach(([x, z]) => cil(g, .02, .02, .01, x, .555, z, MAT.cromo, 16));
      cil(g, .015, .015, .2, w / 2 - .12, .55, -d / 2 + .08, MAT.cromo, 10);
      bx(g, .32, .1, .2, -w / 2 + .3, .56, 0, S.ropaCama, .04);
    },
    cama(g, S, o) {
      const w = o.w || 1.6, l = o.l || 2.0;
      bx(g, w + .06, .26, l, 0, .06, 0, S.madera, .03);
      patas(g, w, l, .06, S.madera, .08, .025);
      bx(g, w + .1, .95, .08, 0, .06, -l / 2 - .04, S.cabecero, .04);
      bx(g, w - .04, .22, l - .06, 0, .32, .01, S.ropaCama, .06);
      bx(g, w + .02, .07, l * .62, 0, .52, l * .19, S.ropaCama, .035);
      bx(g, w + .04, .03, .55, 0, .58, l / 2 - .32, S.manta, .015);
      const np = w > 1.3 ? 2 : 1;
      for (let k = 0; k < np; k++) {
        const x = np === 1 ? 0 : (k ? 1 : -1) * w / 4;
        bx(g, np === 1 ? w * .7 : w / 2 - .08, .14, .38, x, .54, -l / 2 + .28, S.ropaCama, .07).rotation.x = -.25;
      }
      bx(g, w * .35, .2, .1, 0, .58, -l / 2 + .42, S.cojin1, .05).rotation.x = -.3;
    },
    mesilla(g, S) {
      patas(g, .4, .36, .16, S.metal, .03, .01);
      bx(g, .42, .3, .38, 0, .16, 0, S.madera, .015);
      bx(g, .38, .12, .01, 0, .3, .19, S.frente, .004);
      cil(g, .07, .08, .02, 0, .46, 0, S.metal, 24);
      cil(g, .01, .01, .22, 0, .48, 0, S.metal, 8);
      cil(g, .08, .11, .14, 0, .66, 0, S.pantalla, 28);
    },
    escritorio(g, S, o) {
      const w = o.w || 1.1;
      bx(g, w, .03, .55, 0, .73, 0, S.madera, .01);
      patas(g, w, .55, .73, S.metal, .04, .012);
      bx(g, .5, .32, .015, .1, .78, -.2, MAT.pantalla, .008).rotation.x = -.15;
      cil(g, .06, .07, .1, -w / 2 + .14, .76, -.1, S.maceta, 20);
      pieza(g, new THREE.IcosahedronGeometry(.09, 1), MAT.hojas, -w / 2 + .14, .92, -.1);
      const s = new THREE.Group(); s.position.set(0, 0, .48); s.rotation.y = Math.PI; g.add(s);
      patas(s, .42, .42, .45, S.metal, .03, .012); bx(s, .45, .05, .44, 0, .45, 0, S.sofa, .02); bx(s, .45, .32, .04, 0, .52, -.2, S.sofa, .02);
    },
    armario(g, S, o) {
      const w = o.w || 2.0, h = T - .05;
      bx(g, w, h, .6, 0, 0, 0, S.lacado, .008);
      const n = Math.round(w / .5), pw = w / n;
      for (let k = 0; k < n; k++) {
        const x = -w / 2 + pw / 2 + k * pw;
        bx(g, pw - .01, h - .04, .015, x, .02, .3, S.frente, .004);
        bx(g, .015, .35, .02, x + (k % 2 ? -1 : 1) * (pw / 2 - .05), h * .4, .31, S.metal, .004);
      }
    }
  };

  let estiloActual = 'vacio', tPop = 0;
  function amueblar(estilo) {
    casa.remove(muebles);
    muebles.traverse(o => { if (o.geometry) o.geometry.dispose(); });
    muebles = new THREE.Group(); casa.add(muebles);
    estiloActual = estilo;
    if (estilo === 'vacio' || !ESTILOS[estilo]) return;
    const S = ESTILOS[estilo];
    (D.muebles || []).forEach(([tipo, x, y, rot, o], i) => {
      if (!CAT[tipo]) return;
      const g = new THREE.Group();
      CAT[tipo](g, S, o || {});
      g.position.set(X(x), .02, Z(y)); g.rotation.y = (rot || 0) * Math.PI / 180;
      g.userData.retardo = i * 45; g.scale.setScalar(.001);
      muebles.add(g);
    });
    tPop = performance.now();
  }

  // ---------- Etiquetas ----------
  const capa = document.createElement('div'); capa.className = 'm3-labels'; host.appendChild(capa);
  const etiquetas = (D.etiquetas || []).map(([n, m2, x, y, on]) => {
    const e = document.createElement('div'); e.className = 'm3-lb' + (on ? ' on' : '');
    e.innerHTML = `<b>${n}</b><span>${m2}</span>`; capa.appendChild(e);
    return { e, v: new THREE.Vector3(X(x), T + .35, Z(y)) };
  });

  // ---------- Animaciones y controles ----------
  const ease = t => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  const back = t => { t = Math.min(1, Math.max(0, t)); const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  const raiz = host.closest('section') || document;
  function pulsar(estilo) {
    raiz.querySelectorAll('[data-muebles]').forEach(x => x.classList.toggle('on', x.dataset.muebles === estilo));
    amueblar(estilo);
  }
  let t0 = null, visto = false;
  paredes.scale.y = .001; capa.style.opacity = 0;
  new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && !visto) { visto = true; t0 = performance.now(); if (D.estiloInicial) setTimeout(() => { if (estiloActual === 'vacio') pulsar(D.estiloInicial); }, 1900); }
  }), { threshold: .35 }).observe(host);

  function factor() { return Math.max(1, 1.35 / (host.clientWidth / host.clientHeight)); }
  function size() {
    renderer.setSize(host.clientWidth, host.clientHeight); cam.aspect = host.clientWidth / host.clientHeight; cam.updateProjectionMatrix();
    cam.position.setLength(new THREE.Vector3(...VISTAS.maqueta).length() * factor());
  }
  addEventListener('resize', size); size();

  raiz.querySelectorAll('[data-vista]').forEach(b => b.addEventListener('click', () => {
    raiz.querySelectorAll('[data-vista]').forEach(x => x.classList.remove('on')); b.classList.add('on');
    const de = cam.position.clone(), a = new THREE.Vector3(...VISTAS[b.dataset.vista]).multiplyScalar(factor()), s = performance.now();
    (function mov() { const k = Math.min(1, (performance.now() - s) / 900); cam.position.lerpVectors(de, a, ease(k)); if (k < 1) requestAnimationFrame(mov); })();
  }));
  raiz.querySelectorAll('[data-muebles]').forEach(b => b.addEventListener('click', () => pulsar(b.dataset.muebles)));
  const giro = raiz.querySelector('[data-giro]');
  if (giro) giro.addEventListener('click', () => { ctr.autoRotate = !ctr.autoRotate; giro.classList.toggle('on', ctr.autoRotate); });
  // La rueda solo acerca después de tocar la maqueta (así no secuestra el scroll de la página)
  ctr.enableZoom = false;
  renderer.domElement.addEventListener('pointerdown', () => { ctr.autoRotate = false; ctr.enableZoom = true; giro && giro.classList.remove('on'); });
  renderer.domElement.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') ctr.enableZoom = false; });

  const v = new THREE.Vector3();
  (function loop(now) {
    requestAnimationFrame(loop);
    if (t0) {
      paredes.scale.y = Math.max(.001, ease((now - t0) / 1800));
      capa.style.opacity = Math.min(1, Math.max(0, (now - t0 - 1500) / 600));
    }
    if (tPop) muebles.children.forEach(g => g.scale.setScalar(Math.max(.001, back((now - tPop - g.userData.retardo) / 550))));
    ctr.update();
    renderer.render(scene, cam);
    const w = host.clientWidth, h = host.clientHeight;
    etiquetas.forEach(({ e, v: p }) => { v.copy(p).project(cam); e.style.transform = `translate(-50%,-100%) translate(${(v.x + 1) / 2 * w}px,${(1 - v.y) / 2 * h}px)`; });
  })();
})();
