# Skills para agentes inmobiliarios

**Claude Code trabajando para tu inmobiliaria.** Un paquete de *skills* (habilidades) que convierten a Claude en tu copywriter, tu diseñador y tu equipo de marketing, con **tu** marca, **tus** colores y **tu** forma de hablar.

No hace falta saber programar. Le hablas a Claude como a un compañero de oficina y él hace el trabajo.

---

## Qué hay dentro

| Skill | Qué hace | Dile a Claude… |
|---|---|---|
| **mi-marca** | Configura tu marca una sola vez y todo lo demás sale «tuyo». Tres caminos: das tus colores y tipografía, eliges entre 3 diseños de muestra o la saca de tu Instagram o tu web. | «Configura mi marca» · «Saca mi marca de mi Instagram» · «Cambia mis colores» |
| **presentacion-scroll** | Una presentación web de las que se recorren haciendo scroll, con tu marca. | «Hazme una presentación en scroll de [tema]» |
| **landing-propietario** | Una página web para captar propietarios que quieren vender, con tu marca. | «Hazme una landing para captar propietarios en mi zona» |
| **plano-3d** | Convierte el plano de un inmueble en una vista 3D para tus anuncios y presentaciones. | «Pásame este plano a 3D» |
| **copywriter-inmobiliario** | Anuncios de portal, posts y carruseles de Instagram, guiones de reel listos para teleprompter, WhatsApp y emails a propietarios, respuestas a objeciones, tu bio y el texto de tu landing. | «Hazme el anuncio de Idealista de este piso: 3 dormitorios, 85 m²…» · «Un propietario me dice que mi comisión es muy alta, ¿qué le contesto?» |
| **informe-valoracion** | El informe de valoración que entregas al propietario, con tu marca. | «Prepárame el informe de valoración de este piso» |
| **equipo-inmobiliario** | Para encargos grandes: Claude dirige un equipo (estratega, revisor y los especialistas que hagan falta: analista de mercado, copywriter, diseñador, community manager, captación…) que trabaja en paralelo, te consulta solo lo importante y te entrega todo en una carpeta con un informe. | «Prepara la captación de este piso» · «Monta mi plan de contenidos del mes» |

<!-- TODO presentacion-scroll: revisar descripción y frase de ejemplo cuando el otro agente termine la skill -->
<!-- TODO landing-propietario: revisar descripción y frase de ejemplo cuando el otro agente termine la skill -->
<!-- TODO plano-3d: revisar descripción y frase de ejemplo cuando el otro agente termine la skill -->
<!-- TODO informe-valoracion: revisar descripción y frase de ejemplo cuando el otro agente termine la skill -->

---

## Instalación en 3 pasos

**Necesitas**: [Claude Code](https://claude.com/claude-code) instalado y una cuenta de Claude.

**1. Abre Claude Code** (en la terminal escribe `claude` y pulsa Enter, o abre la app de escritorio).

**2. Añade este catálogo de skills.** Copia y pega:

```
/plugin marketplace add Grupo-Rascacielos-AIO/skills-agente-inmobiliario
```

**3. Instala el pack completo.** Copia y pega:

```
/plugin install agente-inmobiliario@skills-agente-inmobiliario
```

Se abrirá el panel de plugins: confirma la instalación. Si te lo pide, ejecuta `/reload-plugins` o cierra y vuelve a abrir Claude Code. Listo.

> **¿Solo quieres una skill?** Instala por separado `mi-marca`, `presentacion-scroll`, `landing-propietario`, `plano-3d`, `copywriter-inmobiliario`, `informe-valoracion` o `equipo-inmobiliario`, por ejemplo:
> `/plugin install copywriter-inmobiliario@skills-agente-inmobiliario`
> (No instales a la vez el pack completo y skills sueltas: las tendrías repetidas.)

### Actualizar

Cuando haya novedades: escribe `/plugin`, entra en **Marketplaces**, elige `skills-agente-inmobiliario` y actualiza.

### Instalación manual (sin plugins)

Si prefieres no usar el sistema de plugins:

1. Descarga este repositorio (botón verde **Code → Download ZIP**) y descomprímelo.
2. Copia las carpetas que quieras de `skills/` dentro de la carpeta de skills de Claude:
   - Mac / Linux: `~/.claude/skills/`
   - Windows: `C:\Users\TU_USUARIO\.claude\skills\`
3. Debe quedar así: `~/.claude/skills/mi-marca/SKILL.md`, `~/.claude/skills/copywriter-inmobiliario/SKILL.md`, etc.
4. Reinicia Claude Code.

En terminal (Mac / Linux):

```bash
git clone https://github.com/Grupo-Rascacielos-AIO/skills-agente-inmobiliario.git
mkdir -p ~/.claude/skills
cp -R skills-agente-inmobiliario/skills/* ~/.claude/skills/
```

---

## La primera vez: configura tu marca

Antes de nada, dile a Claude:

> **Configura mi marca**

Te pedirá tus datos (nombre, agencia, zona, teléfono, email) y después elegirás cómo crear tu imagen:

- **A) Ya tengo marca**: le dices tus colores y tu tipografía.
- **B) Enséñame opciones**: te prepara 3 diseños de muestra con estilos distintos (editorial elegante, moderno minimal, cálido cercano), los abres en el navegador y eliges el que más te guste.
- **C) Sácala de lo que ya tengo**: le pasas tu Instagram, tu web o unas capturas y extrae tus colores, tu tipografía y tu tono.

Se guarda en tu ordenador, en `~/.claude/mi-marca-inmobiliaria.md`. A partir de ahí, todo lo que hagas sale con tu marca, sin repetírselo. Si te saltas este paso, la primera skill que uses te lo propondrá. Puedes cambiarla cuando quieras: «cambia mis colores», «ahora trabajo también en otra zona».

---

## Ejemplos para empezar

- «Escríbeme el anuncio para Fotocasa de este piso: [pega los datos].»
- «Dame 3 ganchos para un reel sobre por qué no conviene bajar el precio cada mes.»
- «Hazme un guion de reel de 40 segundos para captar propietarios en mi barrio, listo para teleprompter.»
- «Acabo de hacer una valoración a un propietario. Escríbeme el WhatsApp de hoy y los seguimientos.»
- «Me dice que lo vende él solo. ¿Qué le respondo?»
- «Prepara la captación de este ático: precio, anuncio, post, reel y mensaje al propietario.»

---

## Preguntas frecuentes

**¿Cuesta dinero?**
Las skills son gratis. Necesitas tu propia suscripción a Claude para usar Claude Code.

**¿Mis datos se suben a algún sitio?**
Tu marca se guarda en un archivo de tu ordenador. Las skills no envían nada a terceros. Lo que escribes a Claude se procesa como cualquier conversación con Claude.

**¿Lo que escribe Claude se puede publicar tal cual?**
Revísalo siempre. Comprueba que los datos del inmueble son correctos y que no promete nada que no puedas cumplir. La skill de copywriting incluye una guía básica de publicidad inmobiliaria en España, pero no sustituye a un abogado.

**¿Funciona si trabajo para una franquicia o una agencia?**
Sí. En «mi marca» pones el nombre de tu agencia y sus colores. Respeta siempre las normas de marca de tu agencia.

**No me aparecen las skills.**
Escribe `/plugin` y comprueba que `agente-inmobiliario` está instalado y activado. Después reinicia Claude Code.

**¿Puedo modificar las skills?**
Sí, son archivos de texto (`SKILL.md`). Licencia MIT: úsalas, cámbialas y compártelas.

---

## Para quien quiera curiosear

```
.claude-plugin/marketplace.json   ← catálogo de plugins
skills/<nombre>/SKILL.md          ← cada skill (instrucciones para Claude)
```

Licencia [MIT](LICENSE).
