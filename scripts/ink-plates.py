#!/usr/bin/env python3
"""Turn real plates into the essay's indigo ink illustrations.

Same look as static/blog/the_shape_of_inference_static.png: one ink on paper,
Floyd-Steinberg dither for the tonal work, paper grain, no photo gradients.

    python3 scripts/ink-plates.py static/teaser/plates/horn.jpg ...
writes <name>_ink.png next to each input, plus <name>_ink1.png and _ink2.png:
the same plate re-dithered with jittered tone so cycling them makes the stipple boil.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

PAPER = np.array([250, 250, 249], dtype=np.float32)
INK = np.array([31, 79, 143], dtype=np.float32)
SIZE = 1600

def ink(path: Path) -> list[Path]:
    im = Image.open(path).convert("L")
    im = ImageOps.exif_transpose(im)
    im = ImageOps.fit(im, (SIZE, SIZE), Image.LANCZOS)
    im = ImageOps.autocontrast(im, cutoff=1)
    # Lift midtones so the dither reads as line and wash, not a dark photo.
    lut = [int(255 * (i / 255) ** 0.72) for i in range(256)]
    base = np.asarray(im.point(lut), dtype=np.float32)
    out = []
    for k in range(3):
        rng = np.random.default_rng(731 + k)
        tone = np.clip(base + rng.normal(0, 14, base.shape), 0, 255).astype(np.uint8)
        bw = Image.fromarray(tone).convert("1", dither=Image.FLOYDSTEINBERG)
        mask = np.asarray(bw, dtype=np.float32)[..., None]  # 1 = paper
        rgb = mask * PAPER + (1 - mask) * INK
        grain = rng.normal(0, 3.5, rgb.shape[:2])[..., None]
        dst = path.with_name(path.stem + ("_ink.png" if k == 0 else f"_ink{k}.png"))
        Image.fromarray(np.clip(rgb + grain, 0, 255).astype(np.uint8)).save(dst)
        out.append(dst)
    return out


if __name__ == "__main__":
    for p in map(Path, sys.argv[1:]):
        print(*ink(p))
