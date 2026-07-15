/**
 * contact.js — sends the contact form via EmailJS. No backend required.
 * Fill in SITE_CONFIG.emailJS (js/config.js) with your own EmailJS
 * public key, service ID, and template ID — see README.md for the
 * three-step setup.
 */
(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const note = document.getElementById("form-note");
  const submitBtn = document.getElementById("contact-submit");
  const { publicKey, serviceId, templateId } = SITE_CONFIG.emailJS;
  const configured = ![publicKey, serviceId, templateId].some((v) => v.startsWith("YOUR_"));

  if (configured && typeof emailjs !== "undefined") {
    emailjs.init({ publicKey });
  }

  function showNote(kind, message) {
    note.textContent = message;
    note.className = `form-note show ${kind}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      showNote("error", "Please fill in every field before sending.");
      return;
    }

    if (!configured) {
      showNote(
        "error",
        "Contact form isn't fully configured yet — add your EmailJS keys in js/config.js (see README.md)."
      );
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    try {
      await emailjs.sendForm(serviceId, templateId, form);
      showNote("success", "Message sent — thanks for reaching out! I'll reply soon.");
      form.reset();
    } catch (err) {
      console.error(err);
      showNote("error", "Something went wrong sending your message. Please try emailing directly instead.");
    } finally {
      submitBtn.textContent = originalLabel;
      submitBtn.disabled = false;
    }
  });
})();
