# Animation review — The Shape of Inference

The article uses eight figures. The author’s revised prose is incorporated with light copyediting. Original sources and GIFs remain; delivery uses viewport-loaded MP4s and still posters.

| Passage           | Selected visual            | Purpose                                                                                                                                                                                                                                                                                                                           |
| ----------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Writing an essay  | Essay hierarchy            | A later sentence changes the weight of earlier paragraphs. Cross-branch springs participate in the solver. The hierarchical layout distinguishes thesis, paragraphs and sentences.                                                                                                                                                |
| New context       | Sheet                      | A new observation deforms an already connected surface. A visual metaphor for interdependence, not a model specification.                                                                                                                                                                                                         |
| Causal generation | Original stream            | Restored the author’s preferred stream below the words, explicitly selected as `catsat/confluence`. Earlier tokens contribute to the current representation. This is a flow metaphor, not a diagram of one global residual stream.                                                                                                |
| Dense revisiting  | Coupled blocks             | Six blocks share 15 springs; seven share 21; eight share 28. New arrivals add connections across the whole structure. Placed after the broad-intuition paragraph. No separate matrix or unexplained cell vocabulary.                                                                                                              |
| Total computation | Ledger                     | One new state versus all pairs revisited. Selected separately after the large cost number, to explain repeated work rather than repeat co-construction.                                                                                                                                                                           |
| Agent harness     | Workspace                  | Independent contexts work on saved artifacts and return results for another attempt. It does not claim to depict weight updates or every component of SIA.                                                                                                                                                                        |
| Passing notes     | Original triangular meshes | Preserve the approved three-agent composition and granular mesh. Messages trigger reconstruction in separate contexts; the cached coordinates do not move. The larger shared structure deforms continuously. Three strong blue cross-connections participate in the solver; each discovery originates at a long-range connection. |
| HAWF              | Original Three.js helpers  | Three stacked wireframe fields, displacement vectors and nine moving balls. Replaces the unrelated terrain flythrough. Paper background and blue/ochre geometry. An illustration of settling, not a literal HAWF simulation.                                                                                                      |

## Visual references

- [Extropic: From One to One Billion](https://extropic.ai/writing/from-one-to-one-billion/) — inspected the factor-graph clip in motion and at sampled stages. Keep a stable, simple composition and reveal activity selectively. Preserve this website’s palette, typography and granular ink texture.
- [Distill: A Gentle Introduction to Graph Neural Networks](https://distill.pub/2021/gnn-intro/) — distinguish geometric proximity from actual connectivity; follow effects along explicit relationships. Explanation reference only, not an assertion that HAWF is a GNN.
- [Distill: Communicating with Interactive Articles](https://distill.pub/2020/communicating-with-interactive-articles/) — animation for causality and state transitions, with readable pacing and limited information density.

The author rejected the clustered-node redesign and the separate relationship-cell grid. Retain the original visual vocabulary and distinguish each figure’s role through its motion and surrounding prose.

## Delivery

- Most videos: 1280×800, 24fps, H.264. The original Three.js field: 960×600, 24fps, about 4 MB. Render canvases directly, without a GIF palette conversion.
- Physics advances at 60Hz between captured frames. Three.js has a deterministic capture mode that also works when its browser tab is backgrounded.
- Vite imports produce hashed immutable media URLs. The Vercel adapter configures CDN caching; deployment and actual cache hits have not been tested.
- Lazy-load on entering view, pause offscreen without resetting time, and show posters under reduced motion. The optional 18-second teaser loads only when opened.
- All original experimental variants remain available in development; public pages show only the author’s selected variants.

## Editorial source

The new sidenote links [How Language Model Hallucinations Can Snowball](https://arxiv.org/abs/2305.13534). “No-correction trap” could not be verified as an established term. The sourced wording describes early errors prompting further false justifications, without claiming that correction is impossible or that this paper establishes a specific residual-stream mechanism.

The existing “maximal upper bound” language is stronger than the dense-update example establishes. Cubic work assumes a dense pair sweep per arrival; multiple sweeps can cost more and sparse schedules less. The leading term of the sum of squares is n³/3. These technical claims have not been silently rewritten during copyediting.

## Verification

- Production layout checked at 320, 390, 768 and 1440 pixels, including publication, redirects, eight figures, pause/resume, offscreen continuity and reduced motion.
- Explicit figure variants and placement after the broad-intuition paragraph have browser assertions.
- Revised MP4s fully decoded with ffmpeg; dimensions, frame counts, codec and pixel format checked. Sampled contact sheets and mobile screenshots reviewed.
- Isolated production build excluding archival sources passed. Static output is approximately 149 MB; typecheck and formatting checks passed.
