const GENERATED_LINKS_VERSION = "V1.00.01";
const GENERATED_LINKS_KEY = "anycard.generatedLinks.v1";

function getStoredGeneratedLinks() {
  try {
    const raw = localStorage.getItem(GENERATED_LINKS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveGeneratedLinks(items) {
  try {
    localStorage.setItem(GENERATED_LINKS_KEY, JSON.stringify(items));
  } catch (err) {
    // Keep the page usable if storage is unavailable or full.
  }
}

function readGeneratedLinksFromDom() {
  return Array.from(document.querySelectorAll("#linksContainer .card-line"))
    .map(function (line) {
      const code = line.querySelector(".card-code")?.textContent || "";
      const pin = line.querySelector(".card-pin")?.textContent || "";
      return { code: code, pin: pin };
    })
    .filter(function (item) {
      return item.code && item.pin;
    });
}

function restoreGeneratedLinks() {
  const rawDataEl = document.getElementById("rawData");
  const generateBtn = document.getElementById("generateBtn");
  const storedItems = getStoredGeneratedLinks();

  if (!rawDataEl || !generateBtn || !storedItems.length || rawDataEl.value.trim()) {
    return;
  }

  rawDataEl.value = storedItems
    .map(function (item) {
      return item.code + " " + item.pin;
    })
    .join("\n");

  generateBtn.click();
  rawDataEl.value = "";
}

function setupGeneratedLinksPersistence() {
  const generateBtn = document.getElementById("generateBtn");

  if (!generateBtn) return;

  generateBtn.addEventListener("click", function () {
    setTimeout(function () {
      const items = readGeneratedLinksFromDom();
      if (items.length) {
        saveGeneratedLinks(items);
      }
    }, 0);
  });

  restoreGeneratedLinks();
}

setupGeneratedLinksPersistence();