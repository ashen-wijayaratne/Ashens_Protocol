// Smooth scroll with offset (fixes navbar overlap)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    // If the target section is collapsible and collapsed → open it
    if (
      target.classList.contains("collapsible") &&
      target.classList.contains("collapsed")
    ) {
      target.classList.remove("collapsed");

      const icon = target.querySelector(".collapse-icon");
      if (icon) icon.textContent = "−";
    }

    // Scroll after opening
    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  });
});

// Collapsible sections
const collapsibleSections = document.querySelectorAll(".collapsible");
collapsibleSections.forEach((section) => {
  const toggle = section.querySelector(".collapse-toggle");

  toggle.addEventListener("click", () => {
    section.classList.toggle("collapsed");

    const icon = toggle.querySelector(".collapse-icon");

    if (section.classList.contains("collapsed")) {
      icon.textContent = "+";
    } else {
      icon.textContent = "−";
    }
  });
});

// Sidebar + mobile drawer: active link highlighting
const sections = document.querySelectorAll("section[id]");
const tocLinks = document.querySelectorAll(".toc a, .toc-drawer-links a");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 120 && rect.bottom >= 120) {
      currentSection = section.id;
    }
  });

  tocLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Reading progress bar
const readProgress = document.querySelector(".read-progress");

function updateReadProgress() {
  if (!readProgress) return;
  const el = document.documentElement;
  const scrollable = el.scrollHeight - el.clientHeight;
  const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
  readProgress.style.width = `${pct}%`;
  readProgress.setAttribute("aria-valuenow", String(Math.round(pct)));
}

window.addEventListener("scroll", updateReadProgress, { passive: true });
window.addEventListener("resize", updateReadProgress);
updateReadProgress();

// Mobile contents drawer
const tocToggle = document.querySelector(".toc-toggle");
const tocDrawer = document.getElementById("tocDrawer");
const tocDrawerOverlay = document.getElementById("tocDrawerOverlay");
const tocClose = document.querySelector(".toc-close");

function setTocDrawerOpen(open) {
  if (!tocDrawer || !tocToggle) return;
  tocDrawer.classList.toggle("is-open", open);
  if (tocDrawerOverlay) {
    tocDrawerOverlay.classList.toggle("is-open", open);
    tocDrawerOverlay.setAttribute("aria-hidden", open ? "false" : "true");
  }
  tocDrawer.setAttribute("aria-hidden", open ? "false" : "true");
  tocToggle.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.classList.toggle("toc-drawer-open", open);
}

if (tocToggle && tocDrawer) {
  tocToggle.addEventListener("click", () => {
    const next = !tocDrawer.classList.contains("is-open");
    setTocDrawerOpen(next);
  });
}

if (tocClose) {
  tocClose.addEventListener("click", () => setTocDrawerOpen(false));
}

if (tocDrawerOverlay) {
  tocDrawerOverlay.addEventListener("click", () => setTocDrawerOpen(false));
}

document.querySelectorAll(".toc-drawer-links a").forEach((link) => {
  link.addEventListener("click", () => setTocDrawerOpen(false));
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (tocDrawer?.classList.contains("is-open")) {
    setTocDrawerOpen(false);
  }
});

// Relax Mode Modal
const modal = document.getElementById("relax-modal");
const btn = document.getElementById("relax-modal-btn");
const close = document.querySelector(".close-btn");

// Open modal
btn.onclick = function (e) {
  e.preventDefault(); // prevent link from scrolling
  modal.style.display = "block";
};

// Close modal
close.onclick = function () {
  modal.style.display = "none";
};

// Close if user clicks outside modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
