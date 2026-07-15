/**
 * main.js — project data + rendering, project modal, footer year,
 * visitor counter (CountAPI), and the floating AI chatbot widget.
 * Runs after config.js in the load order.
 */

/* ----------------------------- project data ----------------------------- */
const PROJECTS = [
  {
    id: "coffee-dashboard",
    title: "Coffee Shop Sales Dashboard",
    tag: "Business Intelligence",
    stack: ["Power BI", "Excel", "SQL"],
    image: "assets/images/projects/coffee-dashboard.svg",
    summary:
      "An end-to-end Power BI dashboard tracking sales performance across a multi-location coffee shop chain, built to give store managers a same-day read on revenue and footfall.",
    features: [
      "Total sales overview with day/week/month drill-down",
      "Footfall analysis by store and time of day",
      "Revenue analysis across product categories",
      "Category performance leaderboard",
      "KPI dashboard for target tracking",
      "Trend analysis with period-over-period comparisons",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "ai-news-bot",
    title: "AI News Automation Bot",
    tag: "Automation",
    stack: ["Python", "Telegram API", "News API"],
    image: "assets/images/projects/ai-news-bot.svg",
    summary:
      "A Python bot that monitors trending news, filters it by keyword relevance, and pushes categorized alerts straight to Telegram — removing the need to manually scan multiple sources.",
    features: [
      "Trending news monitoring across configurable sources",
      "Keyword filtering to cut out noise",
      "Fully automated polling and delivery pipeline",
      "Push notifications via Telegram",
      "AI-based categorization of incoming stories",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "sql-analytics",
    title: "SQL Data Analytics Project",
    tag: "Data Analysis",
    stack: ["SQL", "PostgreSQL"],
    image: "assets/images/projects/sql-project.svg",
    summary:
      "A collection of business-driven SQL queries against a relational PostgreSQL dataset, covering everything from multi-table joins to window-function-based ranking reports.",
    features: [
      "Multi-table JOINs across normalized schemas",
      "CTEs for readable, layered query logic",
      "Window functions for running totals and ranks",
      "Correlated and nested subqueries",
      "Business-focused reporting queries",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "excel-dashboard",
    title: "Excel Business Dashboard",
    tag: "Reporting",
    stack: ["Excel", "Power Query"],
    image: "assets/images/projects/excel-dashboard.svg",
    summary:
      "A self-refreshing Excel dashboard built with Power Query, giving small-business stakeholders a single sheet to review performance without touching the raw data.",
    features: [
      "Pivot tables summarizing key business metrics",
      "Interactive charts tied to slicers",
      "Conditional formatting to flag outliers",
      "XLOOKUP-driven lookups across sheets",
      "One-click refreshable dashboard reporting",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "amazon-dashboard",
    title: "Amazon Sales Analytics Dashboard",
    tag: "Business Intelligence",
    stack: ["Power BI", "SQL", "Excel"],
    image: "assets/images/projects/Amazon-dashboard.png.png",
    summary:
      "Comprehensive Amazon sales analytics dashboard tracking revenue, order trends, and product performance across multiple regions with real-time insights.",
    features: [
      "Revenue tracking by product category",
      "Order volume and fulfillment analysis",
      "Regional sales performance comparison",
      "Customer review and rating analytics",
      "Inventory turnover optimization metrics",
      "Seasonal trend forecasting",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "crime-analysis",
    title: "Crime Analysis Dashboard",
    tag: "Data Analysis",
    stack: ["Power BI", "SQL", "Python"],
    image: "assets/images/projects/Crime-analysis dashboard.png.png",
    summary:
      "Crime data analytics dashboard providing law enforcement and community stakeholders with actionable insights on crime patterns, hotspots, and temporal trends.",
    features: [
      "Crime type distribution and trends",
      "Geospatial hotspot mapping",
      "Temporal analysis by day and hour",
      "Victim and suspect demographics",
      "Case resolution rate tracking",
      "Predictive crime pattern analysis",
    ],
    github: "#",
    demo: "#",
  },
  {
    id: "trading-bot",
    title: "Trading Bot Analytics",
    tag: "Automation",
    stack: ["Python", "SQL", "Data Science"],
    image: "assets/images/projects/Tradingbot-png.png",
    summary:
      "Automated trading bot with real-time market analysis, trade execution logging, and performance analytics dashboard for strategy validation.",
    features: [
      "Real-time market data ingestion",
      "Algorithmic trade execution",
      "Performance tracking and P&L analysis",
      "Risk management and portfolio metrics",
      "Backtesting capabilities",
      "Alert and notification system",
    ],
    github: "#",
    demo: "#",
  },
];

/* ----------------------------- render project cards ----------------------------- */
(function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(
    (p) => `
    <div class="project-card" data-reveal>
      <article class="project-card-inner glass">
        <div class="project-thumb">
          <span class="project-tag">${p.tag}</span>
          <img src="${p.image}" alt="${p.title} preview" loading="lazy" width="480" height="300" />
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <div class="project-stack">
            ${p.stack.map((s) => `<span class="chip">${s}</span>`).join("")}
          </div>
          <p>${p.summary.slice(0, 92)}…</p>
          <div class="project-actions">
            <button class="btn btn-primary btn-sm" data-open-modal="${p.id}">View Details</button>
            <a class="btn btn-ghost btn-sm" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </article>
    </div>`
  ).join("");

  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => openProjectModal(btn.dataset.openModal));
  });

  // re-apply tilt + reveal to freshly injected cards
  document.dispatchEvent(new CustomEvent("projects:rendered"));
})();

/* ----------------------------- project modal ----------------------------- */
function openProjectModal(id) {
  const project = PROJECTS.find((p) => p.id === id);
  const overlay = document.getElementById("project-modal");
  if (!project || !overlay) return;

  overlay.querySelector(".modal-thumb").src = project.image;
  overlay.querySelector(".modal-title").textContent = project.title;
  overlay.querySelector(".modal-summary").textContent = project.summary;
  overlay.querySelector(".modal-stack").innerHTML = project.stack
    .map((s) => `<span class="chip">${s}</span>`)
    .join("");
  overlay.querySelector(".modal-features").innerHTML = project.features
    .map((f) => `<li>${f}</li>`)
    .join("");
  overlay.querySelector(".modal-github").href = project.github;
  overlay.querySelector(".modal-demo").href = project.demo;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

(function modalWiring() {
  const overlay = document.getElementById("project-modal");
  if (!overlay) return;

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector(".modal-close").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

/* ----------------------------- footer year ----------------------------- */
(function footerYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ----------------------------- visitor counter (CountAPI) ----------------------------- */
(function visitorCounter() {
  const el = document.getElementById("visitor-count");
  if (!el) return;
  const { namespace, key } = SITE_CONFIG.countApi;

  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then((res) => res.json())
    .then((data) => {
      el.textContent = data.value.toLocaleString();
    })
    .catch(() => {
      el.textContent = "—";
    });
})();

/* ----------------------------- AI chatbot widget ----------------------------- */
(function chatbot() {
  const toggle = document.getElementById("chatbot-toggle");
  const win = document.getElementById("chatbot-window");
  const body = document.getElementById("chat-body");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");
  const quickWrap = document.getElementById("chat-quick");
  if (!toggle || !win) return;

  const profile = SITE_CONFIG.profile;

  const KNOWLEDGE = [
    {
      test: /skill|tech|stack|tool|language/i,
      reply:
        "Sushil works across SQL, Python, and JavaScript, with deep hands-on experience in Power BI, PostgreSQL, Excel, and Power Query — plus the fundamentals of data cleaning, transformation, EDA, and dashboard/KPI reporting.",
    },
    {
      test: /project/i,
      reply:
        "Featured projects include a Coffee Shop Sales Dashboard (Power BI), an AI News Automation Bot (Python + Telegram), a SQL Data Analytics project (joins, CTEs, window functions), and an Excel Business Dashboard. Scroll to the Projects section for details on each.",
    },
    {
      test: /experience|work|job|intern/i,
      reply:
        "Sushil spent 4 months at ARC Technology and Training Institute working on data cleaning, transformation and modeling, SQL query development (joins, subqueries, GROUP BY, aggregates), PostgreSQL reporting, and dashboard development.",
    },
    {
      test: /contact|email|reach|hire/i,
      reply: `You can reach Sushil directly at ${profile.email}, connect on LinkedIn, or just use the contact form near the bottom of this page.`,
    },
    {
      test: /education|study|college|school|degree/i,
      reply:
        "Education timeline: SSC (2019) at Bhikamchand Khandelwal School, HSC (2021) at Shree Renukadevi College, and B.Com (2026) at S.R.D College — see the Education & Experience timeline section for the full picture.",
    },
    {
      test: /certificat/i,
      reply:
        "Certifications include Data Analytics Training, SQL Fundamentals, PostgreSQL Fundamentals, and Power BI Dashboard Development — all listed in the Certifications section.",
    },
    {
      test: /resume|cv/i,
      reply: "You can grab the full resume any time using the 'Download Resume' button in the navbar or hero section.",
    },
  ];

  const QUICK_QUESTIONS = ["What are your skills?", "Tell me about your projects", "How can I contact you?"];

  function addMessage(text, from) {
    const div = document.createElement("div");
    div.className = `msg ${from}`;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function botReply(userText) {
    const hit = KNOWLEDGE.find((k) => k.test.test(userText));
    const reply = hit
      ? hit.reply
      : `I can share details about ${profile.name.split(" ")[0]}'s skills, projects, experience, education, or how to get in touch — what would you like to know?`;
    setTimeout(() => addMessage(reply, "bot"), 500);
  }

  function handleSend(text) {
    const value = (text || input.value).trim();
    if (!value) return;
    addMessage(value, "user");
    input.value = "";
    botReply(value);
  }

  toggle.addEventListener("click", () => {
    win.classList.toggle("open");
    if (win.classList.contains("open") && !body.dataset.greeted) {
      body.dataset.greeted = "true";
      addMessage(
        `Hi! I'm Sushil's portfolio assistant. Ask me about his skills, projects, experience, or how to get in touch.`,
        "bot"
      );
    }
  });

  if (quickWrap) {
    quickWrap.innerHTML = QUICK_QUESTIONS.map((q) => `<button type="button">${q}</button>`).join("");
    quickWrap.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => handleSend(btn.textContent));
    });
  }

  sendBtn.addEventListener("click", () => handleSend());
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
})();
