// Project Cards
 
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid || !window.projects) return;
 
  projects.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.style.animationDelay = `${i * 0.1}s`;
 
    card.innerHTML = `
      <div class="card-category">${p.category}</div>
      <h3 class="card-title">${p.title}</h3>
      <p class="card-desc">${p.description}</p>
      <div class="card-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <a class="card-link" href="${p.link}" target="_blank" rel="noopener">
        View Project <span class="arrow">→</span>
      </a>
    `;
    grid.appendChild(card);
  });
}
 
// Sticky Nav
 
function initNav() {
  const nav = document.getElementById("main-nav");
  const links = nav.querySelectorAll("a[href^='#']");
 
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });
 
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}
 
// Active Nav on Scroll
 
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#main-nav a[href^='#']");
 
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );
 
  sections.forEach(s => observer.observe(s));
}
 
// Scroll Reveal
 
function initReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
 
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}
 
// Skill Bars
 
function initSkillBars() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".bar-fill").forEach(bar => {
            bar.style.width = bar.dataset.level;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
 
  const skillSection = document.getElementById("skills");
  if (skillSection) observer.observe(skillSection);
}
 
// Mobile Menu
 
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
 
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("open");
  });
 
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
    });
  });
}
 
// Init
 
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initNav();
  initScrollSpy();
  initReveal();
  initSkillBars();
  initMobileMenu();
});
