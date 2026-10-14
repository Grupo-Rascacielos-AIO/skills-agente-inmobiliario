#!/usr/bin/env python3
"""Encuentra las plantas de un edificio en una foto y dibuja la comprobación.

Modo 1 · fachada frontal (líneas de forjado horizontales):
  python3 detectar-plantas.py edificio.jpg --x0 650 --x1 1147 [--arriba 200] [--abajo 2100]
  Mide el brillo fila a fila entre x0 y x1, busca el ritmo que se repite (un forjado por planta)
  y devuelve las líneas. --separacion 79 fuerza la distancia entre plantas si la detección duda.

Modo 2 · foto en perspectiva o líneas poco marcadas (se reparte a partes iguales):
  python3 detectar-plantas.py edificio.jpg --esquinas 640,210 1150,215 660,2080 1140,2075 --num 12
  Esquinas de la zona de viviendas: arriba-izquierda, arriba-derecha, abajo-izquierda, abajo-derecha.

Salida: <foto>-plantas.jpg (líneas numeradas para revisarlas a ojo) y plantas.json, con las plantas
de abajo arriba listas para pegar en config.js (y1/y2 o poly). Necesita Pillow y numpy.
"""
import argparse, json, pathlib
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ap = argparse.ArgumentParser()
ap.add_argument('foto')
ap.add_argument('--x0', type=float); ap.add_argument('--x1', type=float)
ap.add_argument('--arriba', type=float); ap.add_argument('--abajo', type=float)
ap.add_argument('--separacion', type=float, help='píxeles entre plantas, si se conoce')
ap.add_argument('--esquinas', nargs=4, help='x,y x,y x,y x,y (arriba-izq, arriba-der, abajo-izq, abajo-der)')
ap.add_argument('--num', type=int, help='número de plantas (modo esquinas)')
ap.add_argument('--primera', type=int, default=1, help='número de la planta más baja')
a = ap.parse_args()

foto = pathlib.Path(a.foto)
im = Image.open(foto).convert('RGB')
W, H = im.size
plantas = []

if a.esquinas:
    if not a.num: raise SystemExit('Con --esquinas hace falta --num (número de plantas).')
    tl, tr, bl, br = [tuple(map(float, e.split(','))) for e in a.esquinas]
    lerp = lambda p, q, t: (p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t)
    for i in range(a.num):                      # i = 0 → planta más baja
        t_bajo, t_alto = 1 - i / a.num, 1 - (i + 1) / a.num
        izq_b, der_b = lerp(tl, bl, t_bajo), lerp(tr, br, t_bajo)
        izq_a, der_a = lerp(tl, bl, t_alto), lerp(tr, br, t_alto)
        poly = [[round(v, 1) for v in p] for p in (izq_a, der_a, der_b, izq_b)]
        plantas.append({'n': a.primera + i, 'poly': poly})
    lineas = []
else:
    if a.x0 is None or a.x1 is None: raise SystemExit('Indica --x0 y --x1 (bordes izquierdo y derecho de la fachada, en píxeles).')
    g = np.asarray(im.convert('L'), dtype=float)
    m = (a.x1 - a.x0) * .1
    perfil = g[:, int(a.x0 + m):int(a.x1 - m)].mean(1)
    perfil = np.convolve(perfil, np.ones(5) / 5, 'same')
    top = int(a.arriba if a.arriba is not None else H * .05)
    bot = int(a.abajo if a.abajo is not None else H * .95)
    seg = perfil[top:bot]
    ventana = max(15, int(len(seg) / 12)) | 1
    det = seg - np.convolve(seg, np.ones(ventana) / ventana, 'same')
    if a.separacion:
        per = a.separacion
    else:
        ac = np.correlate(det, det, 'full')[len(det) - 1:]
        lo, hi = max(8, int(len(seg) / 80)), max(12, int(len(seg) / 3))
        per = lo + int(np.argmax(ac[lo:hi]))
        # afinar con interpolación parabólica
        if 0 < per < len(ac) - 1:
            y0, y1_, y2 = ac[per - 1], ac[per], ac[per + 1]
            d = (y0 - y2) / (2 * (y0 - 2 * y1_ + y2)) if (y0 - 2 * y1_ + y2) else 0
            per = per + d
    # fase: la que más brillo acumula en las líneas
    fases = np.arange(0, per, .5)
    puntu = [det[np.clip((f + np.arange(0, len(det), per)).astype(int), 0, len(det) - 1)].sum() for f in fases]
    fase = fases[int(np.argmax(puntu))]
    lineas = []
    y = top + fase
    while y <= bot:
        r = max(2, int(per * .18))
        a0, b0 = int(max(top, y - r)), int(min(bot, y + r))
        lineas.append(round(float(a0 + np.argmax(perfil[a0:b0 + 1])), 1) if b0 > a0 else round(y, 1))
        y += per
    lineas = sorted(set(lineas))
    bandas = list(zip(lineas[:-1], lineas[1:]))[::-1]   # de abajo arriba
    for i, (y1, y2) in enumerate(bandas):
        plantas.append({'n': a.primera + i, 'y1': y1, 'y2': y2})
    print(f'Separación entre plantas ≈ {per:.1f} px · {len(lineas)} líneas · {len(plantas)} plantas')

# Comprobación visual
d = ImageDraw.Draw(im)
try: fuente = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', max(14, W // 60))
except Exception: fuente = ImageFont.load_default()
grosor = max(2, W // 600)
for p in plantas:
    if 'poly' in p:
        d.polygon([tuple(q) for q in p['poly']], outline=(255, 40, 90), width=grosor)
        cx = sum(q[0] for q in p['poly']) / 4; cy = sum(q[1] for q in p['poly']) / 4
    else:
        d.rectangle([a.x0, p['y1'], a.x1, p['y2']], outline=(255, 40, 90), width=grosor)
        cx, cy = a.x1 + W * .01, (p['y1'] + p['y2']) / 2
    d.text((cx, cy), str(p['n']), fill=(255, 230, 0), font=fuente, anchor='lm' if 'y1' in p else 'mm')
salida = foto.with_name(foto.stem + '-plantas.jpg')
esc = min(1, 1600 / H)
im.resize((int(W * esc), int(H * esc))).save(salida, quality=85)
json.dump({'foto': {'ancho': W, 'alto': H}, 'fachada': {'x0': a.x0, 'x1': a.x1} if a.x0 is not None else None,
           'lineas': lineas, 'plantas': plantas}, open(foto.with_name('plantas.json'), 'w'), indent=1, ensure_ascii=False)
print(f'Comprobación: {salida}\nDatos: {foto.with_name("plantas.json")}')
print('Revisa la imagen: cada rectángulo debe ir de forjado a forjado. Quita a mano las bandas que no sean viviendas (bajo, coronación) y renumera si hace falta.')
