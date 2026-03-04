/* ══════════════════════════════════════
   Portfolio — JavaScript
   ══════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  // ── Éléments DOM ──
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const themeToggle = document.getElementById("theme-toggle");
  const scrollTopBtn = document.getElementById("scroll-top");
  const typedTextEl = document.getElementById("typed-text");
  const contactForm = document.getElementById("contact-form");

  // ══════════════════════════════════════
  // 1. NAVBAR : scroll effect + active link
  // ══════════════════════════════════════
  const sections = document.querySelectorAll(".section, .hero");

  function updateNavbar() {
    // Effet scrolled
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Scroll-top visibility
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }

    // Active nav link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateNavbar);
  updateNavbar();

  // ── Scroll to top ──
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ══════════════════════════════════════
  // 2. MOBILE NAV TOGGLE
  // ══════════════════════════════════════
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = navToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  // Fermer le menu quand on clique sur un lien
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const icon = navToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });

  // ══════════════════════════════════════
  // 3. DARK / LIGHT THEME
  // ══════════════════════════════════════
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const icon = themeToggle.querySelector("i");

    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    }
  });

  // ══════════════════════════════════════
  // 4. TYPED TEXT EFFECT
  // ══════════════════════════════════════
  const phrases = [
    "Développeur Front‑End",
    "Chef de Projet",
    "Créateur d'expériences web",
    "Passionné de technologie",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 2000; // pause
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // ══════════════════════════════════════
  // 5. SCROLL REVEAL (Intersection Observer)
  // ══════════════════════════════════════
  const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .detail-card, .contact-info, .contact-form, .timeline-item",
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // stagger delay for items in the same section
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ══════════════════════════════════════
  // 6. SKILL BARS ANIMATION
  // ══════════════════════════════════════
  const skillFills = document.querySelectorAll(".skill-fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width");
          entry.target.style.width = width + "%";
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  skillFills.forEach((bar) => skillObserver.observe(bar));

  // ══════════════════════════════════════
  // 7. COUNTER ANIMATION (About section)
  // ══════════════════════════════════════
  const counters = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute("data-target");
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = Math.floor(current);
          }, 40);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // ══════════════════════════════════════
  // 8. CONTACT FORM (EmailJS)
  // ══════════════════════════════════════
  (function() {
    try {
      emailjs.init({ publicKey: "DsECPV3AXDWk-kuv8" });
    } catch(err) {
      console.error("EmailJS init failed:", err);
    }
  })();

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector("button[type='submit']");
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi...';
    btn.disabled = true;

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      title: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_0wxucvh", "template_05ssg3g", params)
      .then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Envoyé !';
        btn.style.background = "#10b981";
        contactForm.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Erreur : " + JSON.stringify(error));
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Erreur !';
        btn.style.background = "#ef4444";
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      });
  });

  // ══════════════════════════════════════
  // 9. SMOOTH SCROLL pour les liens d'ancrage
  // ══════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
