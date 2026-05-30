const JS_VERSION = window.ANYCARD_JS_VERSION || "V1.01.03";

const ANYCARD_URL = "https://www.anycard.ca/swap/loadcard";
const PROCESSED_CARDS_KEY = "anycard.processedCards.v1";

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
  document.getElementById("generateBtn").addEventListener("click", function () {
    const raw = document.getElementById("rawData").value.trim();
    const box = document.getElementById("linksContainer");
    const status = document.getElementById("status");

    box.innerHTML = "";

    if (!raw) {
      box.textContent = "No data pasted.";
      status.textContent = "Paste card/PIN data first.";
      return;
    }

    const lines = raw.split(/\n+/);
    let count = 0;

    lines.forEach(function(line) {
      const parts = line.trim().split(/\s+/);
      if (parts.length < 2) return;

      const code = parts[0];
      const pin = parts[1];
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
      count++;
    });

    status.textContent = count ? count + " cards generated." : "No valid card/PIN lines found.";
  });
}

updateVersionDisplay();
setupBookmarkletTools();
setupGenerator();