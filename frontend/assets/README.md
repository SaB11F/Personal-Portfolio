This folder now keeps only the web-ready images that are actually shipped.

Current structure:
- `fonts/space-grotesk/` for the self-hosted web font files embedded by the global stylesheet
- `gallery/ring/` for the curated photo-ring images and the ESA card image used in the orbit
- `orbital_cards/web/` for the optimized project card artwork shown in the hero orbit

Large source exports, unused duplicates, and temporary reference files should stay out of
this repo unless they are part of the live site.
