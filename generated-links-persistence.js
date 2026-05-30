const GENERATED_LINKS_VERSION = "V1.00.02";
const GENERATED_LINKS_KEY = "anycard.generatedLinks.v1";
const RAW_INPUT_KEY = "anycard.rawInput.v1";

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

function getStoredRawInput() {
  try {
    return localStorage.getItem(RAW_INPUT_KEY) || "";
  } catch (err) {
    return "";
  }
}

function saveRawInput(value) {
  try {
    localStorage.setItem(RAW_INPUT_KEY, value);
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
  const storedRawInput = getStoredRawInput();
  const storedItems = getStoredGeneratedLinks();

  if (!rawDataEl || !generateBtn || rawDataEl.value.trim()) {
    return;
  }

  if (storedRawInput) {
    rawDataEl.value = storedRawInput;
    generateBtn.click();
    return;
  }

  if (!storedItems.length) {
    return;
  }

  rawDataEl.value = storedItems
    .map(function (item) {
      return item.code + " " + item.pin;
    })
    .join("\n");

  generateBtn.click();
}

function setupGeneratedLinksPersistence() {
  const rawDataEl = document.getElementById("rawData");
  const generateBtn = document.getElementById("generateBtn");

  if (!rawDataEl || !generateBtn) return;

  rawDataEl.addEventListener("input", function () {
    saveRawInput(rawDataEl.value);
  });

  generateBtn.addEventListener("click", function () {
    saveRawInput(rawDataEl.value);

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