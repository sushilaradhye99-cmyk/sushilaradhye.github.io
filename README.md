# Sushil Rajesh Aradhye — Data Analyst Portfolio

A premium, dark/light, glassmorphism portfolio built with plain HTML5, CSS3,
and vanilla JavaScript — no frameworks, no build step. Open `index.html` and
it runs.

## Folder structure

```
portfolio/
├── index.html
├── style/
│   ├── style.css        → components & layout
│   ├── responsive.css   → breakpoints
│   └── themes.css       → dark/light CSS variables
├── js/
│   ├── config.js          → your name/links/API keys — edit this first
│   ├── theme.js            → dark/light toggle
│   ├── github.js           → live GitHub repositories (REST API)
│   ├── contact.js          → EmailJS contact form
│   ├── animations.js       → preloader, cursor, scroll effects, typing, tilt
│   ├── three-background.js → Three.js ambient data-node scene
│   ├── particles-config.js → Particles.js interactive background
│   └── main.js              → project data/cards, modal, chatbot, visitor counter
├── assets/
│   ├── images/projects/  → project thumbnails (SVG placeholders — swap in real screenshots any time)
│   ├── icons/favicon.svg
│   └── resume.pdf         → placeholder resume — replace with your real PDF
├── robots.txt
├── sitemap.xml
└── manifest.json
```

## 1. Personalize

Everything editable lives in **`js/config.js`**: GitHub username, EmailJS
keys, CountAPI namespace, and your contact details. Project content (titles,
tech stack, features, images) lives in the `PROJECTS` array at the top of
**`js/main.js`**.

## 2. Set up the contact form (EmailJS — no backend needed)

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an **Email Service** (e.g. Gmail) — copy the **Service ID**.
3. Create an **Email Template** with `{{user_name}}`, `{{user_email}}`,
   `{{subject}}`, and `{{message}}` variables — copy the **Template ID**.
4. Go to **Account → API Keys** and copy your **Public Key**.
5. Paste all three into `js/config.js` under `emailJS`.

Until these are filled in, the form will show a friendly message instead of
silently failing.

## 3. GitHub repositories

`js/github.js` calls the public GitHub REST API
(`api.github.com/users/<username>/repos`) — no token required for public
repos. Just set `githubUsername` in `js/config.js`.

## 4. Visitor counter

Uses [CountAPI](https://countapi.xyz/) — a free, keyless hit counter. Change
`countApi.namespace` in `js/config.js` to something unique if you want a
private counter.

## 5. Resume & images

- Replace `assets/resume.pdf` with your real resume (same filename, or update
  the path in `index.html`).
- Dashboard screenshots have been added to `assets/images/projects/`:
  - `Amazon-dashboard.png.png` → Amazon Sales Analytics Dashboard
  - `Crime-analysis dashboard.png.png` → Crime Analysis Dashboard
  - `Tradingbot-png.png` → Trading Bot Analytics
  - `Coffee shop sales dashboard.png.png` → Coffee Shop Sales Dashboard
- To add or replace project images, update the `image` field per project in `js/main.js`.

## Tech stack

HTML5 · CSS3 · Vanilla JavaScript · Three.js · Particles.js · GSAP ·
ScrollReveal · EmailJS · GitHub REST API · CountAPI — all loaded via CDN in
`index.html`, so there's no `npm install` step.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The custom cursor
and glow are automatically disabled on touch devices; reduced-motion
preferences are respected throughout.
