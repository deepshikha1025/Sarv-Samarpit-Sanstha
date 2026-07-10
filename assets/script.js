/* Sarv Samarpit Sanstha — shared interactions */
(function () {
  "use strict";

  /* Sticky header shadow */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu */
  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        burger.classList.remove("open");
      })
    );
  }

  /* Reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* Animated counters */
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const dur = 1800;
    const start = performance.now();
    const fmt = (n) =>
      decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-IN");
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* Donation amount picker */
  document.querySelectorAll(".amounts").forEach((group) => {
    const custom = group.parentElement.querySelector(".amount-custom");
    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((b) => b.classList.remove("sel"));
        btn.classList.add("sel");
        if (custom) custom.value = btn.dataset.amount || "";
      });
    });
    if (custom) {
      custom.addEventListener("input", () =>
        group.querySelectorAll("button").forEach((b) => b.classList.remove("sel"))
      );
    }
  });

  /* Toast helper */
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  let toastTimer;
  window.showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  };

  /* Demo form handling (no backend) */
  document.querySelectorAll("form[data-demo]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      window.showToast(form.dataset.demo);
      form.reset();
      form
        .querySelectorAll(".amounts button")
        .forEach((b) => b.classList.remove("sel"));
    });
  });

  /* Donate button inside donate card */
  document.querySelectorAll("[data-donate-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".donate-card");
      const custom = card ? card.querySelector(".amount-custom") : null;
      const sel = card ? card.querySelector(".amounts .sel") : null;
      const amount =
        (custom && custom.value) || (sel && sel.dataset.amount) || "";
      window.showToast(
        amount
          ? "Thank you! Redirecting to secure payment for ₹" + amount + "…"
          : "Please choose or enter a donation amount."
      );
    });
  });

  /* Active nav highlighting */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
})();

/* ===== Interactive donation flow (prototype) ===== */
(function () {
  "use strict";
  const fmt = (n) => Number(n).toLocaleString("en-IN");

  function buildModal() {
    const bd = document.createElement("div");
    bd.className = "modal-backdrop";
    bd.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="Donate">' +
      '<div class="modal-head"><h3 id="dm-title">Confirm your gift</h3>' +
      '<button class="modal-close" aria-label="Close">✕</button></div>' +
      '<p class="sub" id="dm-sub">A demo of the secure checkout — no real payment is made.</p>' +
      '<div class="modal-steps"><i class="done"></i><i id="dm-s2"></i><i id="dm-s3"></i></div>' +
      '<div id="dm-body"></div></div>';
    document.body.appendChild(bd);
    const close = () => bd.classList.remove("open");
    bd.addEventListener("click", (e) => { if (e.target === bd) close(); });
    bd.querySelector(".modal-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    return bd;
  }

  let modal = null;
  window.openDonateFlow = function (amount, campaign) {
    if (!modal) modal = buildModal();
    const body = modal.querySelector("#dm-body");
    const title = modal.querySelector("#dm-title");
    const s2 = modal.querySelector("#dm-s2");
    const s3 = modal.querySelector("#dm-s3");
    s2.classList.remove("done"); s3.classList.remove("done");
    title.textContent = campaign ? "Fund: " + campaign : "Confirm your gift";

    body.innerHTML =
      '<div class="modal-amount-display">₹' + fmt(amount) + "</div>" +
      '<div class="field"><label>Full name</label><input id="dm-name" type="text" placeholder="e.g. Priya Sharma" /></div>' +
      '<div class="field"><label>Email (for your receipt)</label><input id="dm-email" type="email" placeholder="you@example.com" /></div>' +
      '<button class="btn btn-gold" id="dm-pay">Pay securely →</button>';

    body.querySelector("#dm-pay").addEventListener("click", () => {
      const name = body.querySelector("#dm-name").value.trim() || "Friend";
      s2.classList.add("done");
      body.innerHTML =
        '<div class="modal-success"><div class="tick" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></svg></div>' +
        "<h3>Thank you, " + name + "!</h3>" +
        "<p>Your gift of <strong>₹" + fmt(amount) + "</strong>" +
        (campaign ? " to <strong>" + campaign + "</strong>" : "") +
        " has been received (demo). A receipt and a field report will follow by email.</p>" +
        '<button class="btn btn-primary" id="dm-done">Done</button></div>';
      s3.classList.add("done");
      body.querySelector("#dm-done").addEventListener("click", () => modal.classList.remove("open"));
    });

    modal.classList.add("open");
  };

  /* Wire donate buttons to the flow */
  document.querySelectorAll("[data-donate-btn]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const card = btn.closest(".donate-card");
      const custom = card ? card.querySelector(".amount-custom") : null;
      const sel = card ? card.querySelector(".amounts .sel") : null;
      const amount = (custom && custom.value) || (sel && sel.dataset.amount) || "";
      if (!amount || Number(amount) < 50) { window.showToast("Please choose or enter an amount (min ₹50)."); return; }
      window.openDonateFlow(amount, null);
    }, true);
  });

  /* Campaign buttons */
  document.querySelectorAll("[data-campaign]").forEach((btn) => {
    btn.addEventListener("click", () =>
      window.openDonateFlow(btn.dataset.amount || 1000, btn.dataset.campaign)
    );
  });

  /* Animated bars on the impact page */
  const bars = document.querySelectorAll(".bar i[data-w]");
  if ("IntersectionObserver" in window && bars.length) {
    const bio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.style.width = e.target.dataset.w + "%"; bio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => bio.observe(b));
  } else { bars.forEach((b) => (b.style.width = b.dataset.w + "%")); }
})();
