#!/usr/bin/env python3
"""Crea un ZIP por skill en zips/ para subirlas a la app de Claude.

La app exige description <= 200 caracteres, así que aquí va una versión corta;
en el repo (Claude Code) se queda la larga con todos los disparadores.
"""
import pathlib, re, zipfile

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CORTAS = {
    "mi-marca": "Configura tu marca de agente inmobiliario (colores, tipografía, estilo, datos) la primera vez y la usan todas las demás skills. Úsala con «configura mi marca» o «cambia mis colores».",
    "presentacion-scroll": "Crea presentaciones web de scroll inmersivo con tu marca: preséntate a un propietario, tu servicio, un inmueble o un informe de zona. «Hazme una presentación de scroll».",
    "landing-propietario": "Landing de captación para un propietario a partir del link del portal o de fotos y datos: fotos, plano 3D si hay plano y plan de marketing. «Hazme la landing de esta casa».",
    "plano-3d": "Convierte el plano 2D de una vivienda en una maqueta 3D interactiva para web, con muebles nórdicos o modernos. «Pasa este plano a 3D».",
    "copywriter-inmobiliario": "Copywriter para agentes inmobiliarios: anuncios de portal, posts, guiones de reel, WhatsApp y emails a propietarios, objeciones. «Escríbeme el anuncio de este piso».",
    "informe-valoracion": "Informe de valoración para el propietario a partir de testigos: €/m², homogeneización y 3 precios con estrategia. Orientativo, no tasación. «Valora este piso con estos testigos».",
    "edificio-interactivo": "Convierte la foto de un edificio de obra nueva en una web: cada planta se pulsa y abre su vivienda en 3D con 6 estilos, precios y fotos. Para promotoras. «Hazme el edificio interactivo».",
    "equipo-inmobiliario": "Organiza un equipo de especialistas (estratega, copy, diseño, mercado, revisor) para tareas grandes del negocio. «Prepara la captación de este piso con el equipo».",
}
FUERA = {".DS_Store", "_capturas", "node_modules"}

salida = RAIZ / "zips"
salida.mkdir(exist_ok=True)
for nombre, corta in CORTAS.items():
    assert len(corta) <= 200, (nombre, len(corta))
    carpeta = RAIZ / "skills" / nombre
    skill = (carpeta / "SKILL.md").read_text()
    skill = re.sub(r"^description:.*$", "description: " + corta, skill, count=1, flags=re.M)
    with zipfile.ZipFile(salida / f"{nombre}.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(carpeta.rglob("*")):
            if f.is_dir() or FUERA & set(f.relative_to(carpeta).parts):
                continue
            arc = f"{nombre}/{f.relative_to(carpeta)}"
            if f.name == "SKILL.md" and f.parent == carpeta:
                z.writestr(arc, skill)
            else:
                z.write(f, arc)
    print(f"{nombre}.zip  {(salida / f'{nombre}.zip').stat().st_size // 1024} KB")

# Pack con todos los ZIP dentro (para descargar de una vez)
with zipfile.ZipFile(salida / "todas-las-skills.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for nombre in CORTAS:
        z.write(salida / f"{nombre}.zip", f"{nombre}.zip")
print(f"todas-las-skills.zip  {(salida / 'todas-las-skills.zip').stat().st_size // 1024} KB")
