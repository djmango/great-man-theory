# Story scene art — TODO

Current slides use AI-generated illustrated tableaus (`scripts/story-scene-visuals.ts`). That is a stand-in until we can source better primary material.

## Replace with real sources where possible

- **Modern figures** (founders, 20th–21st century): use **real photographs** when a suitable image exists — keynote moments, portraits, archival press photos, etc.
- **Historical figures** (ancient through 19th century): use **real historical paintings, engravings, or period artwork** when one depicts the scene (or close enough to crop/frame as a single moment).

## Pipeline implications

- Drop assets into `images/story/source/` (or a new `images/story/reference/` folder) with the usual `{slug}-scene` naming, then run `upscale.sh` as today.
- Track provenance and license per asset (public domain, Wikimedia, museum open access, purchased rights).
- Keep the single-moment rule: no montages, no collage — one photograph or one painting crop per slide.
- Update `scripts/story-image-manifest.ts` / gallery when swapping from generated to reference art.

## Still TBD

- [ ] Curate photo vs. painting per figure and per slide
- [ ] Document license + attribution (maybe in gallery metadata or a `images/story/attribution.json`)
- [ ] Regenerate scenes where the subject was wrong — prompts now require the figure's full name (`buildScenePrompt` in `scripts/story-scene-visuals.ts`)
