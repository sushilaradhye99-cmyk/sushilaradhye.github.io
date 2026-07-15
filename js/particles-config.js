/**
 * particles-config.js — Particles.js interactive background.
 * Connected particle "data universe" in blue / white / cyan with a
 * hover-repulsion interaction, layered underneath the Three.js scene's
 * discrete node cluster for extra depth.
 */
(function () {
  if (typeof particlesJS === "undefined") return;

  particlesJS("particles-js", {
    particles: {
      number: { value: 70, density: { enable: true, value_area: 900 } },
      color: { value: ["#00d4ff", "#ffffff", "#00ffff"] },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true },
      size: { value: 2.4, random: true },
      line_linked: {
        enable: true,
        distance: 130,
        color: "#00d4ff",
        opacity: 0.18,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 90, duration: 0.4 },
        push: { particles_nb: 3 },
      },
    },
    retina_detect: true,
  });
})();
