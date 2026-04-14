(function () {
  var header = document.querySelector("[data-header]");
  var nav = document.querySelector("[data-nav]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var yearEl = document.querySelector("[data-year]");
  var marquee = document.querySelector("[data-marquee]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setHeaderScrolled() {
    if (!header) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("is-scrolled", y > 16);
  }

  setHeaderScrolled();
  window.addEventListener("scroll", setHeaderScrolled, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.matchMedia("(min-width: 841px)").matches) {
          nav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      },
      { passive: true }
    );
  }

  if (marquee && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    marquee.style.animation = "none";
  }

  var revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -7% 0px", threshold: 0.06 }
  );

  revealEls.forEach(function (el) {
    io.observe(el);
  });
})();
