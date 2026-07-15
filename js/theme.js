/**
 * theme.js — dark / light mode switch, persisted across visits.
 */
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = "sa-portfolio-theme";
  const toggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (toggleBtn) toggleBtn.setAttribute("aria-pressed", theme === "light");
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(saved || (prefersLight ? "light" : "dark"));

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }
})();
