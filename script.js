const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const backToTop = document.getElementById("backToTop");
const glow = document.querySelector(".cursor-glow");

navToggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

window.addEventListener("mousemove", (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active navigation state
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".site-nav a")];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.remove("active"));
    const current = links.find(link => link.getAttribute("href") === `#${entry.target.id}`);
    current?.classList.add("active");
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(section => sectionObserver.observe(section));
