# Motion direction research — The Shape of Inference

Research date: 7 September 2026. This is a synthesis of studio process pages, a working animator's production breakdown, and practitioner interviews/tutorials. The prescriptions for this teaser below are our application of those sources, not claims that every studio follows one identical workflow.

## What practitioners actually do

1. **Establish the message and design before polishing motion.** Ordinary Folk describes a message → design → animation → audio process, with sketches and storyboards during design and audio considered throughout. Style frames establish the appearance of key moments; the motion between them still needs to be worked out. [Ordinary Folk: Process](https://www.ordinaryfolk.co/process).

2. **Test the entire sequence as a rough animatic.** School of Motion's production guide lays out boards on a timeline, times them against audio, and gives only the important elements rough movement. Its rough-animation stage resolves interactions before secondary elements and finish. The point is to expose problems with order, duration, and causality while changing them is cheap. [Guide to completing a motion design project](https://schoolofmotion.com/blog/guide-completing-motion-design-project).

3. **Think across the whole film when designing a transition.** Asked specifically about smooth transitions, Sander van Dijk says he considers the frames as moments in a continuous performance, looks for each composition's natural direction, and finds a common rhythm. He describes fast rough animatics as a way of thinking through alternatives. A transition should follow from the sequence, not function as an isolated effect. [Sander van Dijk interview, passage beginning “what is your process for thinking up and creating a smooth transition”](https://schoolofmotion.com/blog/sander-van-dijk-podcast).

4. **Preserve a perceptual connection across the handoff.** A match cut can preserve composition, shape, action, or movement. School of Motion's example continues a move across an edit instead of restarting it. Eye trace uses movement, framing, contrast and color to lead attention to the next important element. Centering the canvas alone is insufficient if its important subject changes position. [Match cuts](https://schoolofmotion.com/blog/match-cuts), [Eye tracing](https://schoolofmotion.com/blog/eye-tracing-animation).

5. **Stage attention so the idea is clear.** Animation Mentor describes using composition, lines of focus, contrast and consistent screen direction to communicate a story point. For this piece, that suggests one readable interaction at a time, with quieter surrounding motion. “Continuous movement” does not require every element to compete equally. [Staging](https://www.animationmentor.com/blog/staging-the-12-basic-principles-of-animation/).

6. **Build controllable motion and revise it against the message.** In Jordan Bergren's first-person account of the Ordinary Folk Webflow project, he starts from three design frames and movement direction from Jorge Canedo. His page shows the main composition and value graph. An elaborate exploding-spheres effect was removed because it did not fit the message. This is a particularly relevant example of discarding attractive motion that creates the wrong meaning. [Production breakdown](https://jordanbruce.tv/project/ordinary-folk-webflow).

Ordinary Folk also shares actual After Effects and Cinema 4D project files and small rigs: a wave rig, path warping, delayed parent motion, and distance-based delays. These are useful examples of authorable relationships rather than independent decorative movement. I read the descriptions; I did not open the native AE/C4D projects. [Play project files](https://www.ordinaryfolk.co/play-old).

## Diagnosis of our previous cut

- **Archive → horn:** fifteen separate cards appeared around the horn at once. Their starting positions did not inherit the preceding montage's movement. The horn stopped being the clear subject.
- **Horn → geometry:** the push changed scale, luminance, background, depth convention and subject identity in a short interval. A common center did not preserve enough continuity.
- **Fragments → sculpture:** seven similar flared surfaces appeared while their source fragments shrank and faded. The result was attractive but its relationship to those fragments was difficult to read. It did not depict a specific working scientific instrument; it was an abstract metaphor whose meaning needed stronger construction on screen.

## Revised transition treatment

| Handoff | Element the eye follows | What persists | What changes |
| --- | --- | --- | --- |
| Archive → horn | One central archival subject per cut | Indigo grain, paper, framing | Last image resolves into the horn; no simultaneous card collage |
| Horn → possibilities | Traced edges of the photographed horn | Screen position, ink, line identity | Photograph's ink fades while the structural strokes unfold into trajectories |
| Possibility → interaction | A curve and waveform approaching one another | Distinct silhouettes and trajectories | Their meeting creates the sheet; later the passing photograph deforms it |
| Discovery → revision | Gold returning pulse | The earlier branch remains visible | Its earlier fork changes after the pulse arrives |
| Paths → shared form | The original branch curves and their fragments | Color, identity, location along the structure | Ribs expand directly from those curves; the original objects remain legible |

The ending stands for an idea constructed through interaction. It should earn that meaning through remembered parts and visible changes, not rely on a caption to explain an arbitrary sculpture.

## Verification for this revision

- Inspect the horn handoff as a short motion study, then in the whole 20-second sequence.
- Compare adjacent frames for jumps in object position and camera velocity.
- Keep a consistent paper background; no blank/dark reset between scenes.
- Inspect at playback size, not just full-resolution stills, so thin lines and source fragments remain readable.
- Check the square framing as well as wide; the final fragments must not overlap the title.
- Confirm deterministic seeking, all assets loaded, finite geometry, continuous camera motion, and a clean encoded-video decode.

## Direction refined after review: the horn itself transforms

The previous edge-to-branch treatment still created an arbitrary visual relationship. The user selected a continuous transformation of the horn itself. The updated film preserves a connected shell and its support hoop from the photographic trace into the final form. The shell's faces unfold with shared seams; the hoop becomes the rim; a change travels back along the existing seams and alters the original throat. Floating photographs, words, and radial idea connectors have been removed. See `storyboard.md` for the current treatment and `frame-review.md` for the inspection.
