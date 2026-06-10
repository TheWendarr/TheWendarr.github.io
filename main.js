/* ============================================================
   WENDELL MCGOWAN — PORTFOLIO SCRIPT
   Sections:
     1. Hex cost-surface hero (canvas)
     2. Coordinate readout
     3. Layer-panel filters
     4. Feature grid rendering
     5. Project inspector (slide-over attribute panel)
     6. Lightbox
     7. Scroll reveal, nav toggle, footer year
   Requires: projects.js loaded BEFORE this file.
   ============================================================ */

"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------
 * 1. HEX COST-SURFACE HERO
 * A pointy-top hexagonal grid whose fill encodes a synthetic
 * "terrain cost" (value noise). The cursor acts as a survey
 * point, brightening cells within range — a nod to the
 * Hex Surface Model capstone.
 * ---------------------------------------------------------- */
(function hexHero() {
  const canvas = document.getElementById("hexfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const HEX_R = 26;                       // hex circumradius (px)
  let cells = [];
  let width = 0, height = 0, dpr = 1;
  let pointer = { x: -9999, y: -9999 };
  let t = 0;
  let rafId = null;

  // --- deterministic value noise -------------------------------
  function hash(ix, iy) {
    let h = ix * 374761393 + iy * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    return ((h ^ (h >> 16)) >>> 0) / 4294967295;
  }
  function smooth(a, b, f) { return a + (b - a) * (f * f * (3 - 2 * f)); }
  function noise(x, y) {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = x - ix, fy = y - iy;
    const top = smooth(hash(ix, iy), hash(ix + 1, iy), fx);
    const bot = smooth(hash(ix, iy + 1), hash(ix + 1, iy + 1), fx);
    return smooth(top, bot, fy);
  }
  function terrain(x, y) {
    // two octaves is enough for a soft relief look
    return 0.65 * noise(x * 0.012, y * 0.012) + 0.35 * noise(x * 0.03, y * 0.03);
  }

  // --- hypsometric ramp: moss -> ochre -> pale summit -----------
  function ramp(v) {
    const stops = [
      [0.00,  34,  52,  46],
      [0.45,  62,  82,  60],
      [0.75, 148, 110,  62],
      [1.00, 210, 190, 160],
    ];
    for (let i = 0; i < stops.length - 1; i++) {
      const [p0, r0, g0, b0] = stops[i];
      const [p1, r1, g1, b1] = stops[i + 1];
      if (v <= p1) {
        const f = (v - p0) / (p1 - p0);
        return [r0 + (r1 - r0) * f, g0 + (g1 - g0) * f, b0 + (b1 - b0) * f];
      }
    }
    return [210, 190, 160];
  }

  function buildGrid() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cells = [];
    const w = Math.sqrt(3) * HEX_R;   // horizontal spacing
    const h = 1.5 * HEX_R;            // vertical spacing
    for (let row = -1; row * h < height + HEX_R; row++) {
      const offset = row % 2 ? w / 2 : 0;
      for (let col = -1; col * w < width + w; col++) {
        const x = col * w + offset;
        const y = row * h;
        cells.push({ x, y, e: terrain(x, y) });
      }
    }
  }

  function hexPath(x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 3 * i + Math.PI / 6; // pointy-top
      const px = x + r * Math.cos(a);
      const py = y + r * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const RANGE = 190; // cursor influence radius

    for (const c of cells) {
      // gentle ambient drift unless reduced motion
      const drift = prefersReducedMotion ? 0 : 0.06 * Math.sin(t * 0.0006 + c.x * 0.01 + c.y * 0.013);
      const e = Math.min(1, Math.max(0, c.e + drift));

      const dx = c.x - pointer.x, dy = c.y - pointer.y;
      const d = Math.hypot(dx, dy);
      const glow = d < RANGE ? (1 - d / RANGE) : 0;

      const [r, g, b] = ramp(e);
      // keep fills translucent so the basemap reads through;
      // raise these if you ever remove the basemap
      const baseAlpha = 0.03 + e * 0.07;
      const alpha = Math.min(0.8, baseAlpha + glow * 0.5);

      hexPath(c.x, c.y, HEX_R - 1.5);
      ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
      ctx.fill();

      if (glow > 0.04) {
        ctx.strokeStyle = `rgba(224, 164, 88, ${glow * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function loop(now) {
    t = now;
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    buildGrid();
    if (prefersReducedMotion) {
      draw(); // single static render; redraw only on pointer move
    } else {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    }
  }

  const hero = canvas.parentElement;
  hero.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    if (prefersReducedMotion) draw();
    updateCoords(e.clientX - rect.left, e.clientY - rect.top, rect);
  });
  hero.addEventListener("pointerleave", () => {
    pointer.x = pointer.y = -9999;
    if (prefersReducedMotion) draw();
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 150);
  });

  start();
})();

/* ------------------------------------------------------------
 * 2. HERO BASEMAP (Leaflet) + COORDINATE READOUT
 * A non-interactive dark basemap sits under the hex canvas.
 * Tiles: CARTO Dark Matter (OSM data, dark restyle).
 * To use classic OSM street tiles instead, swap TILE_URL for
 *   https://tile.openstreetmap.org/{z}/{x}/{y}.png
 * and TILE_ATTRIB for '&copy; OpenStreetMap contributors'
 * (the CSS filter on #basemap will tone them down).
 * ---------------------------------------------------------- */
let heroMap = null;

function initBasemap() {
  const el = document.getElementById("basemap");
  if (!el || typeof L === "undefined") return; // graceful: hexes alone if Leaflet fails

  const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const TILE_ATTRIB =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

  heroMap = L.map(el, {
    center: [38.74, -104.72],   // Fountain / Colorado Springs
    zoom: 12,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false,
    tapHold: false,
  });

  L.tileLayer(TILE_URL, { attribution: TILE_ATTRIB, maxZoom: 19 }).addTo(heroMap);

  // keep tiles aligned after window resizes
  window.addEventListener("resize", () => heroMap.invalidateSize());
}
window.addEventListener("load", initBasemap);

function updateCoords(x, y, rect) {
  const el = document.getElementById("coord-readout");
  if (!el || !rect.width) return;

  if (heroMap) {
    // real projected coordinates from the basemap
    const ll = heroMap.containerPointToLatLng([x, y]);
    const ns = ll.lat >= 0 ? "N" : "S";
    const ew = ll.lng >= 0 ? "E" : "W";
    el.textContent = `${Math.abs(ll.lat).toFixed(4)}° ${ns}  ${Math.abs(ll.lng).toFixed(4)}° ${ew}  Z12`;
    return;
  }

  // fallback when no basemap: approximate window around Fountain, CO
  const lat = 38.85 - (y / rect.height) * 0.35;
  const lon = 104.95 - (x / rect.width) * 0.45;
  el.textContent = `${lat.toFixed(4)}° N  ${lon.toFixed(4)}° W`;
}

/* ------------------------------------------------------------
 * 3. LAYER-PANEL FILTERS
 * Categories behave like GIS layers: multiple can be on at
 * once; a feature shows if ANY of its categories is on.
 * ---------------------------------------------------------- */
const CATEGORY_LABELS = {
  "carto":        "Cartography",
  "data-science": "Data Science",
  "geo-analysis": "Geospatial Analysis",
  "programming":  "Programming",
  "remote":       "Remote Sensing",
  "web":          "Web Mapping",
  "school":       "School Work",
};

const activeLayers = new Set(); // empty set = all visible

function buildLayerPanel() {
  const list = document.getElementById("layer-list");
  if (!list || typeof projects === "undefined") return;

  // count features per category
  const counts = {};
  projects.forEach(p => (p.category || []).forEach(c => counts[c] = (counts[c] || 0) + 1));

  list.innerHTML = "";
  Object.keys(CATEGORY_LABELS).forEach(cat => {
    if (!counts[cat]) return; // skip empty layers
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "layer-row";
    btn.dataset.layer = cat;
    btn.innerHTML = `
      <span class="layer-swatch" aria-hidden="true"></span>
      ${CATEGORY_LABELS[cat]}
      <span class="layer-count">${String(counts[cat]).padStart(2, "0")}</span>
    `;
    btn.addEventListener("click", () => {
      activeLayers.has(cat) ? activeLayers.delete(cat) : activeLayers.add(cat);
      btn.classList.toggle("is-on", activeLayers.has(cat));
      applyLayers();
    });
    list.appendChild(btn);
  });

  const reset = document.getElementById("layers-reset");
  reset?.addEventListener("click", () => {
    activeLayers.clear();
    list.querySelectorAll(".layer-row").forEach(b => b.classList.remove("is-on"));
    applyLayers();
  });
}

function applyLayers() {
  document.querySelectorAll(".feature-card").forEach(card => {
    const cats = (card.dataset.category || "").split(" ");
    const show = activeLayers.size === 0 || cats.some(c => activeLayers.has(c));
    card.classList.toggle("is-hidden", !show);
  });
}

/* ------------------------------------------------------------
 * 4. FEATURE GRID
 * ---------------------------------------------------------- */
function sortProjects(arr) {
  return [...arr].sort((a, b) => {
    if (!!b.featured !== !!a.featured) return (b.featured === true) - (a.featured === true);
    return (b.year || 0) - (a.year || 0);
  });
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid || typeof projects === "undefined") return;

  grid.innerHTML = "";
  sortProjects(projects).forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "feature-card reveal";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open project: ${p.title}`);
    card.dataset.id = p.id;
    card.dataset.category = (p.category || []).join(" ");

    const thumb = p.hero?.src
      ? `<div class="feature-thumb">
           ${p.featured ? '<span class="feature-flag">FEATURED</span>' : ""}
           <img src="${p.hero.src}" alt="${p.title}" loading="lazy" />
         </div>`
      : `<div class="feature-thumb is-empty">
           ${p.featured ? '<span class="feature-flag">FEATURED</span>' : ""}
           <span>NO IMAGERY · CODE PROJECT</span>
         </div>`;

    const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join("");

    card.innerHTML = `
      ${thumb}
      <div class="feature-body">
        <p class="feature-id">FID ${String(i + 1).padStart(3, "0")} · ${p.year || "—"}</p>
        <h3 class="feature-title">${p.title}</h3>
        <p class="feature-desc">${p.description}</p>
        <div class="feature-tags">${tags}</div>
      </div>
    `;

    card.addEventListener("click", () => openInspector(p.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInspector(p.id); }
    });

    grid.appendChild(card);
  });
}

/* ------------------------------------------------------------
 * 5. PROJECT INSPECTOR
 * Slide-over panel populated from the project object. Deep
 * links supported via #p=project-id.
 * ---------------------------------------------------------- */
const inspector = document.getElementById("inspector");
const inspectorBody = document.getElementById("inspector-body");
const backdrop = document.getElementById("inspector-backdrop");

function openInspector(id) {
  const p = (projects || []).find(x => x.id === id);
  if (!p || !inspector) return;

  const meta = [
    ["TIMELINE", p.time],
    ["ROLE", p.role],
    ["DELIVERABLE", p.deliverable],
    ["YEAR", p.year],
  ].filter(([, v]) => v);

  const metaHTML = meta.length
    ? `<dl class="insp-meta">${meta.map(([k, v]) =>
        `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>`
    : "";

  const methodHTML = (p.method || []).length
    ? `<div class="insp-section"><h4>Method</h4>
         <ol>${p.method.map(m => `<li>${m}</li>`).join("")}</ol></div>`
    : "";

  const galleryHTML = (p.gallery || []).length
    ? `<div class="insp-section"><h4>Gallery</h4>
         <div class="insp-gallery">${p.gallery.map(g => `
           <figure>
             <img src="${g.src}" alt="${g.caption || p.title}" loading="lazy"
                  data-caption="${g.caption || ""}" />
             ${g.caption ? `<figcaption>${g.caption}</figcaption>` : ""}
           </figure>`).join("")}
         </div></div>`
    : "";

  const sourcesHTML = (p.sources || []).length
    ? `<div class="insp-section"><h4>Data Sources</h4>
         <ul class="insp-sources">${p.sources.map(s => `<li>${s}</li>`).join("")}</ul></div>`
    : "";

  const links = [...(p.links || [])];
  if (p.githubLink && !links.some(l => l.url === p.githubLink)) {
    links.unshift({ label: "GitHub Repository ↗", url: p.githubLink });
  }
  const linksHTML = links.length
    ? `<div class="insp-links">${links.map(l =>
        `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join("")}</div>`
    : "";

  inspectorBody.innerHTML = `
    ${p.hero?.src ? `<img class="insp-hero" src="${p.hero.src}" alt="${p.hero.caption || p.title}" data-caption="${p.hero.caption || ""}" />` : ""}
    <h3 id="inspector-title">${p.title}</h3>
    <p class="insp-desc">${p.summary || p.description}</p>
    ${metaHTML}
    ${p.objective ? `<div class="insp-section"><h4>Objective</h4><p>${p.objective}</p></div>` : ""}
    ${methodHTML}
    ${galleryHTML}
    ${sourcesHTML}
    ${linksHTML}
  `;

  inspector.hidden = false;
  backdrop.hidden = false;
  requestAnimationFrame(() => inspector.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", `#p=${p.id}`);
  inspector.querySelector(".inspector-close")?.focus();
}

function closeInspector() {
  if (!inspector || inspector.hidden) return;
  inspector.classList.remove("is-open");
  document.body.style.overflow = "";
  history.replaceState(null, "", window.location.pathname);
  setTimeout(() => { inspector.hidden = true; backdrop.hidden = true; }, prefersReducedMotion ? 0 : 280);
}

document.getElementById("inspector-close")?.addEventListener("click", closeInspector);
backdrop?.addEventListener("click", closeInspector);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLightbox(); closeInspector(); }
});

/* ------------------------------------------------------------
 * 6. LIGHTBOX (zoom any inspector image)
 * ---------------------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCap = document.getElementById("lightbox-caption");

document.addEventListener("click", (e) => {
  const img = e.target.closest(".insp-hero, .insp-gallery img");
  if (!img || !lightbox) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || "";
  lightboxCap.textContent = img.dataset.caption || "";
  lightbox.hidden = false;
});

function closeLightbox() {
  if (lightbox && !lightbox.hidden) lightbox.hidden = true;
}
lightbox?.addEventListener("click", closeLightbox);

/* ------------------------------------------------------------
 * 7. MISC — scroll reveal, mobile nav, footer year, deep link
 * ---------------------------------------------------------- */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  items.forEach(el => io.observe(el));
}

(function navToggle() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".topnav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("is-open"))
  );
})();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ------- boot ------- */
buildLayerPanel();
renderProjects();
setupReveal();

// deep link: index.html#p=hex-surface-model
// also honors old links: templates/project_page.html?id=x -> handled by redirect stub
const hashMatch = window.location.hash.match(/^#p=(.+)$/);
if (hashMatch) openInspector(decodeURIComponent(hashMatch[1]));
