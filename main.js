const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("mClose");
const form = document.getElementById("form");
const heroTyped = document.getElementById("heroTyped");

const projects = {
  solar: {
    cat: "Renewables EPC",
    title: "Solar EPC for Primary Healthcare Centres",
    desc: "Kawai delivered turnkey solar installations for Primary Healthcare Centres under World Bank-backed programmes, covering design, procurement, installation, and commissioning as one composed package.",
    tags: ["NPHCDA", "REA", "World Bank", "Solar EPC"]
  },
  glass: {
    cat: "Facade Systems",
    title: "Premium Glass Supply for Commercial Facades",
    desc: "AGC Belgium and Pilkington UK glass supplied for institutional and commercial projects where facade performance and specification fidelity had to hold from source to site.",
    tags: ["AGC", "Pilkington", "NNPC", "Providus Bank"]
  },
  interiors: {
    cat: "Interiors and Fit-Out",
    title: "Interior Packages, Appliances, and Finish Systems",
    desc: "Kawai assembles interior and fit-out categories as one considered package, covering appliances, hardware, surfaces, and related procurement logic.",
    tags: ["Hafele", "Bosch", "Siemens", "NEFF", "Surfaces"]
  },
  jbn: {
    cat: "Procurement and Project Supply",
    title: "Julius Berger Nigeria Multi-Category Supply",
    desc: "An ongoing relationship covering seating, hardware, timber, tiles, access control, appliances, and granite across major project packages.",
    tags: ["Julius Berger", "Procurement", "Multi-origin", "Logistics"]
  },
  appliances: {
    cat: "Industrial Supply Continuity",
    title: "Champion Breweries Uyo Supply Chain Support",
    desc: "Since acquisition from Heineken, Kawai has remained a trusted supplier helping Champion Breweries maintain a consistent and resilient supply chain to support continuous brewery operations.",
    tags: ["Champion Breweries", "Uyo", "Supply Chain", "24/7/365"]
  },
  totalenergies: {
    cat: "Project Management and Service Delivery",
    title: "Total Energies Headquarters and Regional Office Support",
    desc: "Kawai supports Total Energies with project management and service delivery across headquarters and regional office environments where responsiveness and control matter.",
    tags: ["Total Energies", "Headquarters", "Regional Offices", "Service Delivery"]
  },
  stone: {
    cat: "Architectural Surfaces",
    title: "Granite and Finish Packages for Premium Projects",
    desc: "Granite, travertine, and finish materials sourced for residential and commercial projects where quality, consistency, and project fit all matter at once.",
    tags: ["Granite", "Travertine", "Surfaces", "Finish Packages"]
  }
};

function setNavState() {
  nav.classList.toggle("scrolled", window.scrollY > 24);
}

function setupHeroTyping() {
  if (!heroTyped) {
    return;
  }

  const words = ["Ideas", "Knowledge", "Expertise"];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentWord = words[wordIndex];
    heroTyped.textContent = currentWord.slice(0, charIndex);

    if (!deleting && charIndex < currentWord.length) {
      charIndex += 1;
      window.setTimeout(tick, 115);
      return;
    }

    if (!deleting && charIndex === currentWord.length) {
      deleting = true;
      window.setTimeout(tick, 1100);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(tick, 55);
      return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    window.setTimeout(tick, 180);
  }

  tick();
}

function toggleMenu(forceOpen) {
  const open = typeof forceOpen === "boolean" ? forceOpen : !navLinks.classList.contains("open");
  navLinks.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

function openModal(key) {
  const project = projects[key];
  if (!project) {
    return;
  }

  document.getElementById("mCat").textContent = project.cat;
  document.getElementById("mTitle").textContent = project.title;
  document.getElementById("mDesc").textContent = project.desc;
  document.getElementById("mTags").innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function setupReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealItems.forEach((item) => observer.observe(item));
}

window.addEventListener("scroll", setNavState, { passive: true });
setNavState();
setupReveal();
setupHeroTyping();

burger.addEventListener("click", () => toggleMenu());

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

document.querySelectorAll(".work-card").forEach((item) => {
  item.addEventListener("click", () => openModal(item.dataset.project));
});

closeButton.addEventListener("click", closeModal);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleMenu(false);
    closeModal();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const message = encodeURIComponent(
    `Hello Kawai Technologies,\n\nName: ${data.get("name")}` +
    (data.get("company") ? `\nCompany: ${data.get("company")}` : "") +
    `\nEmail: ${data.get("email")}` +
    (data.get("service") ? `\nPrimary need: ${data.get("service")}` : "") +
    `\n\nProject brief:\n${data.get("message")}`
  );

  window.open(`https://wa.me/2348027725561?text=${message}`, "_blank", "noopener");

  const submitButton = form.querySelector('button[type="submit"]');
  const originalLabel = submitButton.textContent;
  submitButton.textContent = "Opened WhatsApp";

  window.setTimeout(() => {
    submitButton.textContent = originalLabel;
  }, 2200);
});
