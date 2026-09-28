// Chicken Nation — interactions

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile nav when a link is clicked
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "☰";
  });
});

// Highlight the nav link for the section in view
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const highlightNav = () => {
  let currentId = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      currentId = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};
window.addEventListener("scroll", highlightNav, { passive: true });
highlightNav();

// Reveal cards and sections as they scroll into view
const revealTargets = document.querySelectorAll(".card, .review, .contact-card, .stat, .extra");
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));

// Current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();
