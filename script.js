/* =====================================================
   SC FINITION
   SCRIPT.JS
===================================================== */

/* =====================================================
   HEADER — SCROLL
===================================================== */

const header = document.getElementById("header");

function updateHeader() {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();

/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");

const navigation = document.getElementById("navigation");

const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

/* Fermer le menu après clic */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  observer.observe(element);
});

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    const sectionHeight = section.offsetHeight;

    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`,
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);

/* =====================================================
   CURRENT YEAR
===================================================== */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* =====================================================
   CLOSE MENU WITH ESCAPE
===================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
  }
});

/* =========================================
   CARROUSEL AVIS CLIENTS
========================================= */

const reviewsCarousel = document.getElementById("reviewsCarousel");

if (reviewsCarousel) {
  const slides = [...reviewsCarousel.querySelectorAll(".review-slide")];

  const dotsContainer = document.getElementById("reviewDots");
  const prevButton = document.getElementById("reviewPrev");
  const nextButton = document.getElementById("reviewNext");
  const counter = document.getElementById("reviewCounter");

  let currentReview = 0;

  // Création automatique des petits points
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "review-dot";
    dot.setAttribute("aria-label", `Afficher l'avis ${index + 1}`);

    dot.addEventListener("click", () => {
      showReview(index);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = [...dotsContainer.querySelectorAll(".review-dot")];

  function showReview(index) {
    currentReview = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const isActive = i === currentReview;

      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.inert = !isActive;

      dots[i].classList.toggle("active", isActive);

      if (isActive) {
        dots[i].setAttribute("aria-current", "true");
      } else {
        dots[i].removeAttribute("aria-current");
      }
    });

    counter.textContent =
      `${String(currentReview + 1).padStart(2, "0")} / ` +
      `${String(slides.length).padStart(2, "0")}`;
  }

  prevButton.addEventListener("click", () => {
    showReview(currentReview - 1);
  });

  nextButton.addEventListener("click", () => {
    showReview(currentReview + 1);
  });

  // Navigation avec les flèches du clavier
  reviewsCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showReview(currentReview - 1);
    }

    if (event.key === "ArrowRight") {
      showReview(currentReview + 1);
    }
  });

  showReview(0);
}
