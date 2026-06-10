# Wendell McGowan — Portfolio

Personal portfolio showcasing geospatial intelligence, software engineering, and cartography projects.

**Design language: "terrain console."** A night-mode geospatial workstation — interactive H3-style hex cost surface in the hero (a nod to the Hex Surface Model capstone), map-sheet marginalia, GIS layer-control filters, and a slide-over feature attribute panel for project details.

Built with vanilla HTML, CSS, and JS. No frameworks, no trackers. Hosted on GitHub Pages.

## Structure
- `index.html` — single-page site (hero, projects, capabilities, about, contact)
- `styles.css` — design tokens and all styling
- `main.js` — hex canvas, layer filters, project inspector, lightbox
- `projects.js` — project data (add new projects here; schema unchanged, template at bottom of file)
- `templates/project_page.html` — redirect stub for old deep links (`?id=x` → `index.html#p=x`)

## Adding a project
Copy the commented template at the bottom of `projects.js`, fill it in, done. The grid, filters, and inspector all render from that one object.
