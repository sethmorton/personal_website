#!/usr/bin/env bash
# Capture frozen frames of an anim page at given cycle times, no dependencies.
#   static/anim/lib/frames.sh static/anim/catsat/river.html 1.5 4 7 9.5
# Pages must honour `?t=<seconds>`: draw that instant once and skip the rAF loop.
# Writes /tmp/anim-frames/<group>-<name>-<t>.png at 2x (1280x800) and prints the paths.
set -euo pipefail
CHROME=$(ls -d "$HOME"/.cache/puppeteer/chrome-headless-shell/*/chrome-headless-shell-mac-arm64/chrome-headless-shell | tail -1)
file=$(cd "$(dirname "$1")" && pwd)/$(basename "$1"); shift
name=$(basename "$file" .html); group=$(basename "$(dirname "$file")")
mkdir -p /tmp/anim-frames
for t in "$@"; do
  out="/tmp/anim-frames/$group-$name-$t.png"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=640,400 --force-device-scale-factor=2 \
    --virtual-time-budget=1500 --screenshot="$out" "file://$file?t=$t" 2>/dev/null
  echo "$out"
done
