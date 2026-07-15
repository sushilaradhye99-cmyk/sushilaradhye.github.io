/**
 * animations.js — all scroll/interaction chrome that isn't page content:
 * preloader, custom cursor, scroll progress bar, nav behavior, hero typing
 * effect + query console reveal, ScrollReveal wiring, skill ring + counter
 * animations, project card tilt, and button ripples.
 */

/* ----------------------------- preloader ----------------------------- */
(function preloader() {
  const el = document.getElementById("preloader");
  const bar = document.querySelector(".preloader-bar span");
  const pctLabel = document.querySelector(".preloader-pct");
  if (!el) return;

  let pct = 0;
  const tick = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) {
      pct = 100;
      clearInterval(tick);
      setTimeout(() => el.classList.add("loaded"), 350);
    }
    if (bar) bar.style.width = pct + "%";
    if (pctLabel) pctLabel.textContent = Math.floor(pct) + "%";
  }, 140);

  // safety net — never let the preloader trap a slow connection
  window.addEventListener("load", () => {
    setTimeout(() => el.classList.add("loaded"), 900);
  });
})();

/* ----------------------------- custom cursor ----------------------------- */
(function cursor() {
  if (window.matchMedia("(hover: none)").matches) return;
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const glow = document.getElementById("mouse-glow");
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX; targetY = e.clientY;
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    if (glow) { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }
  });

  function raf() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(raf);
  }
  raf();

  document.querySelectorAll("a, button, .tab-btn, input, textarea").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("active"));
  });
})();

/* ----------------------------- scroll progress + nav ----------------------------- */
(function scrollChrome() {
  const progress = document.getElementById("scroll-progress");
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function onScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
    if (navbar) navbar.classList.toggle("scrolled", scrollTop > 40);

    let currentId = "";
    sections.forEach((sec) => {
      if (scrollTop >= sec.offsetTop - 140) currentId = sec.id;
    });
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + currentId));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navToggle = document.getElementById("nav-toggle");
  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => {
      navbar.classList.toggle("mobile-open");
      navToggle.classList.toggle("open");
    });
    navLinks.forEach((a) =>
      a.addEventListener("click", () => {
        navbar.classList.remove("mobile-open");
        navToggle.classList.remove("open");
      })
    );
  }

  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
})();

/* ----------------------------- hero typed roles ----------------------------- */
(function typedRoles() {
  const el = document.getElementById("typed-role");
  if (!el) return;
  const roles = ["Data Analyst", "Power BI Developer", "SQL Developer", "Python Developer", "AI Enthusiast"];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const word = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }
  tick();
})();

/* ----------------------------- query console signature ----------------------------- */
(function queryConsole() {
  const body = document.getElementById("console-typing");
  const result = document.getElementById("console-result");
  if (!body) return;

  const query =
    "SELECT role, impact\nFROM career\nWHERE name = 'Sushil Aradhye'\nORDER BY impact DESC;";

  let i = 0;
  function typeChar() {
    if (i <= query.length) {
      body.textContent = query.slice(0, i);
      i++;
      setTimeout(typeChar, 22);
    } else if (result) {
      setTimeout(() => result.classList.add("show"), 400);
    }
  }
  setTimeout(typeChar, 1600);
})();

/* ----------------------------- ScrollReveal ----------------------------- */
(function reveal() {
  if (typeof ScrollReveal === "undefined") {
    document.querySelectorAll("[data-reveal]").forEach((el) => (el.style.opacity = 1));
    return;
  }
  const sr = ScrollReveal({
    distance: "36px",
    duration: 800,
    easing: "cubic-bezier(0.16,1,0.3,1)",
    origin: "bottom",
    reset: false,
    mobile: true,
  });
  sr.reveal("[data-reveal]", { interval: 70 });
})();

/* ----------------------------- GSAP hero entrance ----------------------------- */
(function heroEntrance() {
  if (typeof gsap === "undefined") return;
  gsap.from(".hero-greeting, .hero-name, .hero-typed-row, .hero-tagline, .hero-actions, .hero-foot", {
    y: 26,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.1,
    delay: 0.3,
  });
  gsap.from(".query-console", {
    x: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5,
  });
})();

/* ----------------------------- skill tabs + rings ----------------------------- */
(function skills() {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".skill-panel");
  if (!tabs.length) return;

  function activate(name) {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.group === name));
    panels.forEach((p) => p.classList.toggle("active", p.dataset.group === name));
    animateRings(document.querySelector(`.skill-panel[data-group="${name}"]`));
  }

  function animateRings(scope) {
    if (!scope) return;
    scope.querySelectorAll(".skill-ring .fill").forEach((circle) => {
      const level = parseFloat(circle.dataset.level || "0");
      const r = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * r;
      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;
      requestAnimationFrame(() => {
        circle.style.strokeDashoffset = circumference * (1 - level / 100);
      });
    });
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.group)));
  activate(tabs[0].dataset.group);
})();

/* ----------------------------- animated counters ----------------------------- */
(function counters() {
  const nums = document.querySelectorAll(".achieve-num[data-count]");
  if (!nums.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 24);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => observer.observe(n));
})();

/* ----------------------------- project tilt effect ----------------------------- */
(function tilt() {
  document.querySelectorAll(".project-card").forEach((card) => {
    const inner = card.querySelector(".project-card-inner");
    if (!inner) return;
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      inner.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
    });
    card.addEventListener("mouseleave", () => {
      inner.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  });
})();

/* ----------------------------- ripple buttons ----------------------------- */
(function ripple() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      circle.className = "ripple";
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
})();
