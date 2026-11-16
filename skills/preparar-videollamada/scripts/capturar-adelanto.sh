#!/usr/bin/env bash
# Convierte adelanto.html en adelanto.png (1080×1350) con Chrome, Edge o Chromium sin abrir ventana.
# Uso: bash capturar-adelanto.sh /ruta/a/la/carpeta-de-la-videollamada
set -euo pipefail
DIR="$(cd "${1:-.}" && pwd)"
[ -f "$DIR/adelanto.html" ] || { echo "No encuentro $DIR/adelanto.html"; exit 1; }

NAV=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  "$(command -v google-chrome 2>/dev/null || true)" \
  "$(command -v chromium 2>/dev/null || true)" \
  "$(command -v chromium-browser 2>/dev/null || true)" \
  "$(command -v microsoft-edge 2>/dev/null || true)" \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"; do
  if [ -n "$c" ] && [ -x "$c" ]; then NAV="$c"; break; fi
done
[ -n "$NAV" ] || { echo "No hay Chrome, Edge ni Chromium. Abre adelanto.html en el navegador y haz una captura."; exit 2; }

"$NAV" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --virtual-time-budget=6000 --window-size=1080,1350 \
  --screenshot="$DIR/adelanto.png" "file://$DIR/adelanto.html" >/dev/null 2>&1
echo "Listo: $DIR/adelanto.png"
