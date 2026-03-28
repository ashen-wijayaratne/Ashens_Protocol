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

// Sidebar active link highlighting
const sections = document.querySelectorAll("section[id]");
const tocLinks = document.querySelectorAll(".toc a");

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
