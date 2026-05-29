const ANYCARD_URL = "https://www.anycard.ca/swap/loadcard";

const BOOKMARKLET_CODE = `javascript:(async function(){try{var text=await navigator.clipboard.readText();var parts=text.trim().split(/\\s+/);if(parts.length<2)return;var cardInput=parts[0];var pinInput=parts[1];var cardField=document.querySelector('input[placeholder*="Card Number"]');var pinField=document.querySelector('input[placeholder*="Card PIN"]');if(!cardField||!pinField)return;cardField.value=cardInput.trim();pinField.value=pinInput.trim();cardField.dispatchEvent(new Event("input",{bubbles:true}));pinField.dispatchEvent(new Event("input",{bubbles:true}));setTimeout(function(){var btn=[...document.querySelectorAll("button,input[type='submit']")].find(function(el){return /submit card info/i.test(el.innerText||el.value||"")});if(btn)btn.click();},300);}catch(e){}})();`;

document.getElementById("bookmarkletCode").value = BOOKMARKLET_CODE;

document.getElementById("copyBookmarkletBtn").addEventListener("click", async function () {
  const status = document.getElementById("status");

  try {
    await navigator.clipboard.writeText(BOOKMARKLET_CODE);
    status.textContent = "Bookmarklet code copied.";
  } catch (err) {
    status.textContent = "Copy failed. Select the bookmarklet text and copy manually.";
  }
});

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
    div.innerHTML =
      "<strong>" + code + "</strong><br>" +
      "PIN: " + pin + "<br>" +
      "<span class='small'>Click to copy + open AnyCard</span>";

    div.addEventListener("click", async function () {
      document.querySelectorAll(".card").forEach(card => card.classList.remove("clicked"));
      div.classList.add("clicked");

      try {
        await navigator.clipboard.writeText(copyText);
        status.innerHTML = "<span class='ok'>Copied:</span> " + copyText + "<br>Opening AnyCard popup...";
      } catch (err) {
        status.textContent = "Copy failed. Manually copy this: " + copyText;
      }

      const popupWidth = Math.floor(screen.width * 0.58);
      const popupHeight = Math.floor(screen.height * 0.92);
      const popupLeft = Math.floor(screen.width * 0.40);
      const popupTop = 20;

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
