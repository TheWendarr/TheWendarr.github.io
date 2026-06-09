/******************************
 * FOOTER DYNAMIC YEAR
 ******************************/

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


/******************************
 * HERO ANIMATED TEXT
 ******************************/

(function runTyped() {
  const el = document.getElementById("typed");
  if (!el) return;

  const messages = [
    "Geospatial Intelligence & Analysis student @ DSU",
    "Building geospatial tools in Python and Rust",
    "ArcGIS Pro • Flask • Linux • Cartography"
  ];

  let m = 0, i = 0, deleting = false;

  function type() {
    const text = messages[m];
    el.textContent = text.slice(0, i);

    // Typing Forward
    if (!deleting && i < text.length) {
      i++;
      setTimeout(type, 50);
      return;
    }

    // Pause at the end of a full string
    if (!deleting && i === text.length) {
      deleting = true;
      setTimeout(type, 1200);
      return;
    }

    // Backspacing
    if (deleting && i > 0) {
      i--;
      setTimeout(type, 28);
      return;
    }

    // Begin typing next string
    if (deleting && i === 0) {
      deleting = false;
      m = (m + 1) % messages.length;
      setTimeout(type, 140);
      return;
    }
  }

  type();
})();


/******************************
 * PPROJECT CARD SORTING
 ******************************/

const projectGrid = document.getElementById("project-grid");

function getSortedProjects(projectArray) {
  return [...projectArray].sort((a, b) => {
    
    // Featured project first in project card grid
    if (!!b.featured !== !!a.featured) {
      return (b.featured === true) - (a.featured === true);
    }

    // Sort via chronological order
    return (b.year || 0) - (a.year || 0);
  });
}


/******************************
 * RENDER PROJECTS
 ******************************/

function renderProjects(projectArray) {
  if (!projectGrid) return;

  // Clear existing content before rendering
  projectGrid.innerHTML = "";

  // Create tag badges
  projectArray.forEach(project => {
    const tagBadges = (project.tags || [])
      .map(
        tag => `<span class="badge bg-secondary me-1">${tag}</span>`
      )
      .join("");

    // Prepare category string for the data-category filter attribute
    const categoryString = (project.category || []).join(" ");

    // HTML for Project Card
    const card = `
      <div
        class="col-md-6 col-lg-4 project-card"
        data-category="${categoryString}"
        data-featured="${project.featured ? "true" : "false"}"
        data-year="${project.year || ""}"
      >

        <div class="card h-100 border-0 shadow-sm">

          <img
            src="${project.hero.src || "assets/images/header_map.png"}"
            class="card-img-top"
            alt="${project.title}"
            loading="lazy"
          />

          <div class="card-body d-flex flex-column text-center">

            <h5 class="card-title mb-2">
              ${project.title}
            </h5>

            <p class="text-secondary small mb-3">
              ${project.description}
            </p>

            <div class="mb-3">
              ${tagBadges}
            </div>

            <div class="d-flex gap-2 justify-content-center mt-auto">

              <a
                class="btn btn-sm btn-primary"
                href="templates/project_page.html?id=${project.id}"
              >
                View Project
              </a>

              ${project.githubLink ? `
                <a
                  class = "btn btn-sm btn-outline-dark"
                  href = "${project.githubLink}"
                  target = "_blank"
                  rel = "noopener noreferrer"
                >
                  GitHub
                </a>
              ` : ""}

            </div>

          </div>
        </div>
      </div>
    `;

    projectGrid.innerHTML += card;
  });
}


/******************************
 * INITIAL PROJECT LOAD
 ******************************/

// Requires projects.js loaded BEFORE main.js
if (typeof projects !== "undefined") {
  const sorted = getSortedProjects(projects);
  renderProjects(sorted);
}


/******************************
 * FILTER SYSTEM
 ******************************/

(function setupFilters() {
  const filterBtns = document.querySelectorAll(".btn-filter");
  if (!filterBtns.length) return;

  function applyFilter(filter) {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {
      const categories = (card.dataset.category || "").split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.style.display = show ? "" : "none";
    });
  }

  // Toggles the active class and filters grid
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });

  applyFilter("all");
})();


/******************************
 * CLICKABLE CARDS (delegated)
 ******************************/

document.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (!card) return;

  if (e.target.closest("a, button")) return;

  // Redirect to primary link in card
  const link = card.querySelector("a[href]");
  if (link?.href) {
    window.location.href = link.getAttribute("href");
  }
});
