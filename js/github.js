/**
 * github.js — pulls public repositories for SITE_CONFIG.githubUsername
 * from the GitHub REST API and renders them into #repo-grid. No token is
 * required for public read access, but the API is rate-limited (60
 * requests/hour per IP for unauthenticated calls), so results are cached
 * in sessionStorage for the duration of the tab.
 */
(function () {
  const grid = document.getElementById("repo-grid");
  if (!grid) return;

  const CACHE_KEY = "sa-github-cache-" + SITE_CONFIG.githubUsername;

  const langColors = {
    JavaScript: "#f1e05a", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c",
    TypeScript: "#3178c6", Jupyter: "#DA5B0B", SQL: "#e38c00", default: "#00d4ff",
  };

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  }

  function renderRepos(repos) {
    if (!repos.length) {
      grid.innerHTML = `<p class="github-state">No public repositories found yet — check back soon.</p>`;
      return;
    }
    grid.innerHTML = repos
      .map((repo) => {
        const lang = repo.language || "—";
        const color = langColors[lang] || langColors.default;
        return `
        <article class="repo-card glass" data-reveal>
          <div class="repo-name">${repo.name}</div>
          <p class="repo-desc">${repo.description ? repo.description : "No description provided."}</p>
          <div class="repo-meta">
            <span><span class="repo-lang-dot" style="background:${color}"></span>${lang}</span>
            <span>★ ${repo.stargazers_count}</span>
            <span>⑂ ${repo.forks_count}</span>
            <span>Updated ${formatDate(repo.updated_at)}</span>
          </div>
          <a class="btn btn-ghost btn-sm" href="${repo.html_url}" target="_blank" rel="noopener">View Repository</a>
        </article>`;
      })
      .join("");
  }

  async function loadRepos() {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      renderRepos(JSON.parse(cached));
      return;
    }

    grid.innerHTML = `<p class="github-state">Fetching latest repositories…</p>`;

    try {
      const res = await fetch(
        `https://api.github.com/users/${SITE_CONFIG.githubUsername}/repos?sort=updated&per_page=${SITE_CONFIG.githubRepoCount}`
      );
      if (!res.ok) throw new Error("GitHub API request failed: " + res.status);
      const repos = await res.json();
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos));
      renderRepos(repos);
    } catch (err) {
      grid.innerHTML = `<p class="github-state">Couldn't load GitHub repositories right now. Visit the
        <a href="https://github.com/${SITE_CONFIG.githubUsername}" target="_blank" rel="noopener">GitHub profile</a> directly.</p>`;
      console.error(err);
    }
  }

  loadRepos();
})();
