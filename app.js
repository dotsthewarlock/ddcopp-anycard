const JS_VERSION = window.ANYCARD_JS_VERSION || "V1.01.07";

const ANYCARD_URL = "https://www.anycard.ca/swap/loadcard";
const PROCESSED_CARDS_KEY = "anycard.processedCards.v1";
const GENERATED_CARDS_KEY = "anycard.generatedCards.v1";
const RAW_DATA_KEY = "anycard.rawData.v1";

const BOOKMARKLET_CODE = `javascript:(async function(){try{if(location.origin+location.pathname!=="https://www.anycard.ca/swap/loadcard")return;var text=await navigator.clipboard.readText();var parts=text.trim().split(/\\s+/);if(parts.length<2)return;var cardInput=parts[0];var pinInput=parts[1];var cardField=document.querySelector('input[placeholder*="Card Number"]');var pinField=document.querySelector('input[placeholder*="Card PIN"]');if(!cardField||!pinField)return;cardField.value=cardInput.trim();pinField.value=pinInput.trim();cardField.dispatchEvent(new Event("input",{bubbles:true}));pinField.dispatchEvent(new Event("input",{bubbles:true}));setTimeout(function(){var btn=[...document.querySelectorAll("button,input[type='submit']")].find(function(el){return /submit card info/i.test(el.innerText||el.value||"")});if(btn)btn.click();},300);}catch(e){}})();`;

function getProcessedCards() {
  try {
    const raw = localStorage.getItem(PROCESSED_CARDS_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (err) {
    return {};
  }
}

function saveProcessedCards(processedCards) {
  try {
    localStorage.setItem(PROCESSED_CARDS_KEY, JSON.stringify(processedCards));
  } catch (err) {
    // Keep the workflow usable if localStorage is unavailable or full.
  }
}

function markCardProcessed(cardCode) {
  const processedCards = getProcessedCards();
  processedCards[cardCode] = {
    processedAt: new Date().toISOString()
  };
  saveProcessedCards(processedCards);
}

function isCardProcessed(cardCode) {
  const processedCards = getProcessedCards();
  return Boolean(processedCards[cardCode]);
}

function getGeneratedCards() {
  try {
    const raw = localStorage.getItem(GENERATED_CARDS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveGeneratedCards(cards) {
  try {
    localStorage.setItem(GENERATED_CARDS_KEY, JSON.stringify(cards));
  } catch (err) {
    // Keep the workflow usable if localStorage is unavailable or full.
  }
}

function clearGeneratedCards() {
  try {
    localStorage.removeItem(GENERATED_CARDS_KEY);
  } catch (err) {
    // Keep the workflow usable if localStorage is unavailable.
  }
}

function getRawData() {
  try {
    return localStorage.getItem(RAW_DATA_KEY) || "";
  } catch (err) {
    return "";
  }
}

function saveRawData(rawData) {
  try {
    localStorage.setItem(RAW_DATA_KEY, rawData);
  } catch (err) {
    // Keep the workflow usable if localStorage is unavailable or full.
  }
}

function clearRawData() {
  try {
    localStorage.removeItem(RAW_DATA_KEY);
  } catch (err) {
    // Keep the workflow usable if localStorage is unavailable.
  }
}

function parseCardLines(raw) {
  return raw
    .split(/\n+/)
    .map(function(line) {
      const parts = line.trim().split(/\s+/);
      if (parts.length < 2) return null;

      return {
        code: parts[0],
        pin: parts[1]
      };
    })
    .filter(Boolean);
}

function renderGeneratedCard(card, box, status) {
  const code = card.code;
  const pin = card.pin;
  const copyText = code + " " + pin;

  const div = document.createElement("div");
  div.className = "card";
  if (isCardProcessed(code)) {
    div.classList.add("clicked");
  }

  const cardLine = document.createElement("div");
  cardLine.className = "card-line";

  const cardCode = document.createElement("span");
  cardCode.className = "card-code";
  cardCode.textContent = code;

  const cardPin = document.createElement("span");
  cardPin.className = "card-pin";
  cardPin.textContent = pin;

  cardLine.appendChild(cardCode);
  cardLine.appendChild(cardPin);
  div.appendChild(cardLine);

  div.addEventListener("click", async function () {
    markCardProcessed(code);
    div.classList.add("clicked");

    try {
      await navigator.clipboard.writeText(copyText);
      status.innerHTML = "<span class='ok'>Copied:</span> " + copyText + "<br>Opening AnyCard popup...";
    } catch (err) {
      status.textContent = "Copy failed. Manually copy this: " + copyText;
    }

    const parentWidth = window.outerWidth || screen.availWidth;
    const parentHeight = window.outerHeight || screen.availHeight;
    const parentLeft = window.screenX || window.screenLeft || 0;
    const parentTop = window.screenY || window.screenTop || 0;

    const popupWidth = Math.max(420, Math.floor(parentWidth * 0.58));
    const popupHeight = Math.max(640, Math.floor(parentHeight * 0.92));
    const popupLeft = Math.max(0, Math.floor(parentLeft + parentWidth * 0.40));
    const popupTop = Math.max(0, Math.floor(parentTop + 20));

    window.open(
      ANYCARD_URL,
      "anycardLoadWindow",
      "width=" + popupWidth +
      ",height=" + popupHeight +
      ",left=" + popupLeft +
      ",top=" + popupTop +
      ",resizable=yes,scrollbars=yes"
    );
  });

  box.appendChild(div);
}

function renderGeneratedCards(cards, box, status) {
  box.innerHTML = "";

  cards.forEach(function(card) {
    renderGeneratedCard(card, box, status);
  });
}

function restoreGeneratedCards(box, status) {
  const cards = getGeneratedCards();
  if (!cards.length) return;

  renderGeneratedCards(cards, box, status);
  status.textContent = cards.length + " cards restored.";
}

function restoreRawData(rawDataEl) {
  const rawData = getRawData();

  if (rawData) {
    rawDataEl.value = rawData;
  }
}

function updateVersionDisplay() {
  const jsVersionEl = document.getElementById("jsVersion");
  const cssVersionEl = document.getElementById("cssVersion");

  if (jsVersionEl) {
    jsVersionEl.textContent = JS_VERSION;
  }

  if (cssVersionEl) {
    const cssVersion = getComputedStyle(document.documentElement)
      .getPropertyValue("--css-version")
      .replaceAll('"', "")
      .trim();

    cssVersionEl.textContent = cssVersion || "not found";
  }
}

function setupBookmarkletTools() {
  const bookmarkletCodeBox = document.getElementById("bookmarkletCode");
  const bookmarkletDragLink = document.getElementById("bookmarkletDragLink");
  const copyBookmarkletBtn = document.getElementById("copyBookmarkletBtn");

  bookmarkletCodeBox.value = BOOKMARKLET_CODE;
  bookmarkletDragLink.href = BOOKMARKLET_CODE;

  copyBookmarkletBtn.addEventListener("click", async function () {
    const status = document.getElementById("status");

    try {
      await navigator.clipboard.writeText(BOOKMARKLET_CODE);
      status.textContent = "Bookmarklet code copied.";
    } catch (err) {
      status.textContent = "Copy failed. Select the bookmarklet text and copy manually.";
    }
  });
}

function setupGenerator() {
  const rawDataEl = document.getElementById("rawData");
  const box = document.getElementById("linksContainer");
  const status = document.getElementById("status");
  const clearRawDataBtn = document.getElementById("clearRawDataBtn");
  const clearGeneratedLinksBtn = document.getElementById("clearGeneratedLinksBtn");

  restoreRawData(rawDataEl);
  restoreGeneratedCards(box, status);

  rawDataEl.addEventListener("input", function () {
    saveRawData(rawDataEl.value);
  });

  document.getElementById("generateBtn").addEventListener("click", function () {
    const raw = rawDataEl.value.trim();

    saveRawData(rawDataEl.value);
    box.innerHTML = "";

    if (!raw) {
      box.textContent = "No data pasted.";
      status.textContent = "Paste card/PIN data first.";
      return;
    }

    const cards = parseCardLines(raw);

    if (!cards.length) {
      status.textContent = "No valid card/PIN lines found.";
      return;
    }

    renderGeneratedCards(cards, box, status);
    saveGeneratedCards(cards);
    status.textContent = cards.length + " cards generated.";
  });

  clearRawDataBtn.addEventListener("click", function () {
    rawDataEl.value = "";
    clearRawData();
    status.textContent = "Raw data cleared.";
  });

  clearGeneratedLinksBtn.addEventListener("click", function () {
    clearGeneratedCards();
    box.textContent = "No cards generated yet.";
    status.textContent = "Generated links cleared. Completed card tracking was preserved.";
  });
}

updateVersionDisplay();
setupBookmarkletTools();
setupGenerator();