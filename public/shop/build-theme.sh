#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC="$ROOT/theme-src"
OUT="$ROOT/afonica-child-theme.zip"

cp "$ROOT/afonica-prestashop.css" "$SRC/assets/css/afonica-dark.css"

if [[ ! -f "$SRC/preview.png" ]]; then
  unzip -j -o "$OUT" preview.png -d "$SRC" 2>/dev/null || true
fi

rm -f "$OUT"
(
  cd "$SRC"
  zip -r "$OUT" . -x "*.DS_Store"
)

echo "Built $OUT ($(wc -c < "$OUT") bytes)"
echo "CSS: $(wc -c < "$SRC/assets/css/afonica-dark.css") bytes"
