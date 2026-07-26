(() => {
  const progress = document.getElementById("readingProgress");
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
  };
  addEventListener("scroll", updateProgress, { passive: true });
  addEventListener("resize", updateProgress);
  updateProgress();

  const switchButtons = [...document.querySelectorAll("[data-view]")];
  const panels = [...document.querySelectorAll("[data-panel]")];
  const showPanel = (name, updateHash = true) => {
    if (!panels.length) return;
    panels.forEach(panel => {
      const active = panel.dataset.panel === name;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
    switchButtons.forEach(button => {
      button.setAttribute("aria-selected", String(button.dataset.view === name));
    });
    if (updateHash) history.replaceState(null, "", name === "slides" ? "#slides" : "#explanation");
    scrollTo({ top: document.querySelector(".view-switcher").offsetTop - 18, behavior: "smooth" });
  };
  switchButtons.forEach(button => button.addEventListener("click", () => showPanel(button.dataset.view)));
  if (panels.length && location.hash === "#slides") showPanel("slides", false);

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const image = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".lightbox-caption");
    let items = [];
    let current = 0;
    const openAt = index => {
      current = (index + items.length) % items.length;
      const button = items[current];
      image.src = button.dataset.lightbox;
      const figcaption = button.closest("figure")?.querySelector("figcaption");
      caption.textContent = figcaption?.textContent?.trim() || image.alt || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox-close").focus();
    };
    const close = () => {
      lightbox.hidden = true;
      image.src = "";
      document.body.style.overflow = "";
    };
    document.addEventListener("click", event => {
      const button = event.target.closest("[data-lightbox]");
      if (!button) return;
      items = [...document.querySelectorAll("[data-lightbox]")].filter(item => item.offsetParent !== null);
      openAt(items.indexOf(button));
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => openAt(current - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => openAt(current + 1));
    lightbox.addEventListener("click", event => { if (event.target === lightbox) close(); });
    addEventListener("keydown", event => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") openAt(current - 1);
      if (event.key === "ArrowRight") openAt(current + 1);
    });
  }

  const module = document.body.dataset.module;
  const completeButton = document.getElementById("markComplete");
  if (module && completeButton) {
    const key = `inguide-level1-module-${module}-complete`;
    const paint = () => {
      const done = localStorage.getItem(key) === "true";
      completeButton.classList.toggle("done", done);
      completeButton.textContent = done ? "完了済み ✓（解除する）" : "このモジュールを完了にする";
    };
    completeButton.addEventListener("click", () => {
      localStorage.setItem(key, String(localStorage.getItem(key) !== "true"));
      paint();
    });
    paint();
  }

  document.querySelectorAll("[data-module-card]").forEach(card => {
    const key = `inguide-level1-module-${card.dataset.moduleCard}-complete`;
    const done = localStorage.getItem(key) === "true";
    card.classList.toggle("completed", done);
    const status = card.querySelector(".completion-status");
    if (status) status.textContent = done ? "復習完了 ✓" : "未完了";
  });

  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    addEventListener("scroll", () => backToTop.classList.toggle("visible", scrollY > 700), { passive: true });
    backToTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
  }

  const tocLinks = [...document.querySelectorAll(".page-toc a")];
  if (tocLinks.length && "IntersectionObserver" in window) {
    const linkById = new Map(tocLinks.map(link => [link.hash.slice(1), link]));
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => {
        tocLinks.forEach(link => link.classList.remove("current"));
        linkById.get(entry.target.id)?.classList.add("current");
      });
    }, { rootMargin: "-15% 0px -75% 0px" });
    linkById.forEach((_, id) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });
  }
})();
