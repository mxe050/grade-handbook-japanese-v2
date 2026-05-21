(function () {
  function parseCaption(text) {
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    const items = [];
    let current = null;

    lines.forEach((line) => {
      const header = line.match(/^\[(.+?)\]\s+(\d{2}:\d{2}:\d{2})\s*$/);
      if (header) {
        if (current && current.text.trim()) items.push(current);
        current = { speaker: header[1], time: header[2], text: "" };
        return;
      }

      if (!current) return;
      if (line.trim() === "") return;
      current.text += (current.text ? "\n" : "") + line.trim();
    });

    if (current && current.text.trim()) items.push(current);
    return items;
  }

  function renderCaption(root, text) {
    const items = parseCaption(text);
    root.innerHTML = "";

    const meta = document.createElement("div");
    meta.className = "esi-transcript-meta";
    meta.textContent = `全文字幕: ${items.length}件`;
    root.appendChild(meta);

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "esi-caption-card";

      const head = document.createElement("div");
      head.className = "esi-caption-head";

      const speaker = document.createElement("span");
      speaker.className = "esi-speaker";
      speaker.textContent = item.speaker;

      const time = document.createElement("span");
      time.className = "esi-time";
      time.textContent = item.time;

      const body = document.createElement("div");
      body.className = "esi-caption-text";
      body.textContent = item.text;

      head.appendChild(speaker);
      head.appendChild(time);
      card.appendChild(head);
      card.appendChild(body);
      root.appendChild(card);
    });
  }

  function initEsiTranscripts() {
    document.querySelectorAll("[data-src].esi-transcript").forEach((root) => {
      const src = root.getAttribute("data-src");
      if (!src) return;

      fetch(src)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then((text) => renderCaption(root, text))
        .catch((error) => {
          root.innerHTML = "";
          const message = document.createElement("div");
          message.className = "esi-transcript-meta";
          message.textContent = `原稿を読み込めませんでした: ${error.message}`;
          root.appendChild(message);
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEsiTranscripts);
  } else {
    initEsiTranscripts();
  }
})();
