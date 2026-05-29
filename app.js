const ANYCARD_URL = "https://www.anycard.ca/swap/loadcard";

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

  if (count === 0) {
    box.textContent = "No valid card/PIN lines found.";
    status.textContent = "Expected format: cardnumber PIN";
  } else {
    status.textContent = count + " cards generated.";
  }
});
