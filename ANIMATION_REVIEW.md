# Animation review — The Shape of Inference

Reviewed the 28 existing registered variants against their surrounding paragraphs, their source dynamics, and four sampled stages of each exported clip. Added a dense spring demonstration and the existing Three.js terrain as a HAWF figure. The article uses seven selected figures; alternatives remain available during local development.

| Passage                      | Selected visual           | What it conveys and what changed                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Writing an essay             | Essay structure           | A later sentence changes the weight of earlier paragraphs. Two cross-branch springs now participate in the solver, showing that associations need not be spatial neighbors. Grain and internal marks have stronger contrast.                                                                                                                                                   |
| New context                  | Sheet                     | New observations deform an already changed surface. Prior constraints remain visible. The sheet is a metaphor for interdependence, not a model specification; the logbook alternative more specifically illustrates reinterpretation of fixed observations. Removed the long inactive tail.                                                                                    |
| Causal generation            | Token columns             | Separate token representations build through depth and read earlier positions. This is clearer than suggesting one global residual stream. Earlier cached states stay fixed during that generation pass. The stream, river, strata and crystal remain flow/growth metaphors.                                                                                                   |
| Dense revisiting             | Coupled blocks            | Six blocks share 15 springs; seven share 21; eight share 28. Every arrival adds long and short connections and contracts a long spring, moving earlier blocks through the solver. Shows the cause before the cost equation. The ledger alternative labels one new state versus all pairs revisited, avoiding a misleading claim that total autoregressive attention is linear. |
| Agent harness                | Workspace                 | Independent contexts work on saved artifacts, then return results for another attempt. This does not claim to depict weight updates or every component of SIA.                                                                                                                                                                                                                 |
| Messages versus shared state | Triangles and cross-links | Both sides receive the same nodes and edges. Removed artificial edge dropout. The contrast is delayed reconstruction versus coupled response. Three ochre nonlocal springs participate in the same solver and carry visible pulses across distant regions.                                                                                                                     |
| HAWF                         | Three.js field            | New evidence changes the landscape and the state responds. Paper background, blue geometry, ochre ball and impulses. A visual analogy for settling, not a measured simulation or a full account of the architecture's timescales.                                                                                                                                              |

## Alternatives

All original source pages and GIFs remain. Their replacement videos use the same paper background and a restrained blue/slate/ochre palette. Manuscript red remains an intentional edit mark. Some older alternatives are atmospheric rather than literal explanations: reeds suggest broadcast wind; copies and telegraph depict compressed or incomplete retellings; cloth has physically local weaving constraints. These are not the article's selected architectural explanation. The shared-state and dense-block figures carry the explicit long-range-association claim.

## Delivery and motion

- Render from canvas, not from a GIF palette. Most figures are 1280×800 at 24fps. The dense moving HAWF field uses 720×450 to keep its download reasonable.
- Advance capped physics at 60Hz between captured frames. The former low-frame-rate export under-advanced those simulations and sometimes ended before the main revision.
- Use known story durations where available; continuous studies have a short paper reset. Keep explanatory pacing legible rather than applying the teaser's rapid montage timing to every diagram.
- Import MP4s and posters through Vite. Production URLs carry content hashes and the Vercel adapter assigns immutable CDN caching. This is configured locally; deployment and actual cache hits have not been tested.
- Load only when a figure first enters view. Pause offscreen, preserve playback position, and show still posters for reduced-motion users. The 18-second film loads only when opened.

## Editorial note for the author's next revision

The article's “maximal upper bound” language is stronger than the dense-update example establishes. Cubic work here assumes a dense pair sweep per arrival; multiple sweeps could cost more and sparse schedules less. Also, the leading term of the sum of squares is n³/3. The animation distinguishes exact spring counts from schematic dense-update work. Article prose was left unchanged while the author edits in Obsidian; only figure markers were added/moved.

## Verification

- All 30 delivery MP4s decoded completely without ffmpeg errors; checked H.264, 24fps, yuv420p, expected dimensions, and matching posters.
- New dense spring figure: all 288 sampled frames have finite, in-frame coordinates and the correct pair count. All six original blocks move after the arrivals.
- Shared-state figure: three nonlocal springs; all three message contexts reconstruct all 14 nodes and the same 35 edges.
- Production browser checks passed at 320, 390, 768 and 1440 pixels, including SSR, redirects, seven figures, playback controls, offscreen continuity and reduced motion.
- Fresh article load requests no MP4 or GIF. Each selected figure loads a hashed immutable asset on entering view.
- A clean build excluding the archival directories passed; its Vercel static output is 154 MB. Typecheck reported zero errors and warnings. App source formatting passed; older experimental render sources retain their existing formatting.
