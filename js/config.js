/**
 * config.js
 * -----------------------------------------------------------------------
 * Central place to edit the personal details that drive the rest of the
 * site. Change the values below — nothing else in the codebase needs to
 * be touched to re-point the portfolio at a different GitHub account,
 * EmailJS project, or CountAPI namespace.
 * -----------------------------------------------------------------------
 */

const SITE_CONFIG = {
  // GitHub username used by js/github.js to pull repositories live.
  githubUsername: "sushilaradhye99-cmyk",

  // How many repositories to display, sorted by most recently updated.
  githubRepoCount: 6,

  // EmailJS credentials — see the setup instructions in README.md.
  // Leave the placeholders in place until you create your own EmailJS
  // account; contact.js will show a friendly message instead of failing
  // silently if these are not filled in.
  emailJS: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  },

  // CountAPI namespace + key. CountAPI keys are public by design (they are
  // just a hit counter), so it is safe to leave these as-is or rename the
  // namespace to something unique to avoid collisions with other users.
  countApi: {
    namespace: "sushil-aradhye-portfolio",
    key: "visits",
  },

  // Contact + social details rendered across the site.
  profile: {
    name: "Sushil Rajesh Aradhye",
    role: "Data Analyst | Power BI Developer | SQL Developer | Python Developer",
    email: "Sushilaradhye2@gmail.com",
    location: "Maharashtra, India",
    linkedin: "https://linkedin.com/in/sushil-aradhye-4160043b2",
    github: "https://github.com/sushilaradhye99-cmyk",
    resume: "assets/resume.pdf",
  },
};
