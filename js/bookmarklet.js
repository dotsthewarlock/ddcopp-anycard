(function () {
  if (
    !document.body ||
    !["BonusCardRewards", "Walmart"].includes(document.body.dataset.project)
  ) {
    return;
  }

  const EMAIL_KEY = "bs_bonus_email";
  const CLIP_KEY = "bs_clip";
  const BG = "rgba(0,0,0,.5)";
  const RIGHT = "20px";
  const CREDIT = "courtesy of DotsTheWarlock";

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function serialInput() {
    return document.querySelector(
      "#target_codes > div > div > div.position-relative > div > div > div > div.serial-number_wrapper.flex-grow-1 > input"
    );
  }

  function nextButton() {
    return document.querySelector(".step_active div.text-center.mt-2 > input");
  }

  function positionStatus(el) {
    const wrap = document.getElementById("bs_email_wrap");
    const rect = wrap && wrap.getBoundingClientRect();

    Object.assign(el.style, {
      top: rect ? rect.bottom + 6 + "px" : "90px",
      right: RIGHT,
      width: rect ? rect.width + "px" : "300px",
      boxSizing: "border-box"
    });
  }

  function status(message = CREDIT) {
    let box = document.getElementById("bs");

    if (!box) {
      box = document.body.appendChild(
        Object.assign(document.createElement("div"), { id: "bs" })
      );
    }

    Object.assign(box.style, {
      position: "fixed",
      padding: "10px",
      borderRadius: "6px",
      zIndex: 900000,
      color: "#fff",
      font: "12px monospace",
      whiteSpace: "pre-wrap",
      boxShadow: "0 4px 12px rgba(0,0,0,.3)",
      background: BG,
      textAlign: "center"
    });

    positionStatus(box);
    box.textContent = message;

    clearTimeout(box._timer);

    if (message !== CREDIT) {
      box._timer = setTimeout(() => status(), 4000);
    }
  }

  async function readClipboardBarcode() {
    const clipBtn = document.getElementById("bs_clip_btn");

    if (clipBtn?.dataset.on !== "1" || !navigator.clipboard) {
      return "";
    }

    try {
      const text = (await navigator.clipboard.readText()) || "";
      return text.match(/\b\d{30}\b/)?.[0] || "";
    } catch (e) {
      status("Clipboard blocked");
      return "";
    }
  }

  async function pasteBarcodeOnce(barcode) {
    let field;
    let next;

    for (let i = 0; i < 20; i++) {
      field = serialInput();
      next = nextButton();

      if (field && next) break;

      await sleep(120);
    }

    if (!field || !next) {
      return false;
    }

    field.focus();
    field.value = barcode;

    ["input", "change"].forEach(eventName => {
      field.dispatchEvent(new Event(eventName, { bubbles: true }));
    });

    ["keydown", "keypress", "keyup"].forEach(eventName => {
      field.dispatchEvent(
        new KeyboardEvent(eventName, {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true
        })
      );
    });

    await sleep(300);

    if (!next.disabled) {
      next.click();
      status('Clicked "Next"');
      return true;
    }

    status('"Next" unavailable');
    return true;
  }

  async function runAction() {
    if (window._bsBusy) {
      status("Already running");
      return;
    }

    window._bsBusy = true;

    try {
      const emailInput = document.getElementById("bs_email_input");
      const email = emailInput && emailInput.value.trim();
      const activeStep = document.querySelector(".step_active");

      if (activeStep) {
        const getBonusBtn = activeStep.querySelector(
          'input.btn-primary[type="button"][value="Get My Bonus"]'
        );

        if (getBonusBtn) {
          const barcode = await readClipboardBarcode();

          getBonusBtn.click();
          status('Clicked "Get My Bonus"');

          if (barcode) {
            await pasteBarcodeOnce(barcode);
          }

          return;
        }

        const next = nextButton();

        if (next) {
          if (!next.disabled) {
            next.click();
            status('Clicked "Next"');
            return;
          }

          const existingBarcode =
            (serialInput()?.value || "").match(/\b\d{30}\b/)?.[0] || "";

          const barcode = existingBarcode || (await readClipboardBarcode());

          if (barcode && (await pasteBarcodeOnce(barcode))) {
            return;
          }

          status('"Next" unavailable");
          return;
        }
      }

      const tos = document.querySelector("#workflow_data_terms_of_service");

      if (tos && !tos.checked) {
        tos.checked = true;
        tos.dispatchEvent(new Event("change", { bubbles: true }));
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status("Enter valid email");
        return;
      }

      document.querySelectorAll('input[type="email"]').forEach(input => {
        if (input.value !== email) {
          input.value = email;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });

      const actionButton = [...document.querySelectorAll("button,a,input")].find(
        el => {
          const rect = el.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          if (
            !rect.width ||
            !rect.height ||
            x < 0 ||
            y < 0 ||
            x > innerWidth ||
            y > innerHeight
          ) {
            return false;
          }

          const topEl = document.elementFromPoint(x, y);
          const text = el.textContent.toUpperCase().trim();
          const value = (el.value || "").toUpperCase().trim();
          const name = el.name || "";

          return (
            topEl &&
            (el.contains(topEl) || topEl.contains(el)) &&
            (
              name === "commit" ||
              ["SHOW & EMAIL CODE", "NEXT", "GET MY BONUS"].includes(text) ||
              ["SHOW & EMAIL CODE", "NEXT"].includes(value) ||
              text.includes("CLAIM ANOTHER BONUS")
            )
          );
        }
      );

      if (!actionButton) {
        status("No action button found");
        return;
      }

      status("Submitting...");

      setTimeout(() => {
        actionButton.click();
        status("Clicked submit");
      }, 250);
    } finally {
      setTimeout(() => {
        window._bsBusy = false;
      }, 800);
    }
  }

  function setupControls() {
    let wrap = document.getElementById("bs_email_wrap");

    if (wrap) {
      return;
    }

    wrap = document.body.appendChild(
      Object.assign(document.createElement("div"), { id: "bs_email_wrap" })
    );

    Object.assign(wrap.style, {
      position: "fixed",
      top: "20px",
      right: RIGHT,
      zIndex: 900000,
      display: "flex",
      gap: "6px",
      alignItems: "stretch"
    });

    const emailBox = wrap.appendChild(
      Object.assign(document.createElement("div"), { id: "bs_email_box" })
    );

    Object.assign(emailBox.style, {
      padding: "10px",
      borderRadius: "6px",
      color: "#fff",
      font: "12px monospace",
      background: BG,
      boxShadow: "0 4px 12px rgba(0,0,0,.3)",
      textAlign: "right"
    });

    const input = emailBox.appendChild(
      Object.assign(document.createElement("input"), {
        id: "bs_email_input",
        type: "email",
        placeholder: "Email address",
        value: localStorage.getItem(EMAIL_KEY) || ""
      })
    );

    Object.assign(input.style, {
      width: "230px",
      font: "12px monospace",
      padding: "4px",
      border: "1px solid rgba(255,255,255,.45)",
      borderRadius: "4px",
      textAlign: "right",
      background: "rgba(255,255,255,.75)",
      color: "#111"
    });

    input.oninput = () => {
      localStorage.setItem(EMAIL_KEY, input.value.trim());
    };

    const clipBtn = wrap.appendChild(
      Object.assign(document.createElement("button"), {
        id: "bs_clip_btn",
        innerHTML:
          '📋<i style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;font-style:normal">🚫</i>',
        title: "Paste barcode from clipboard: OFF"
      })
    );

    const runBtn = wrap.appendChild(
      Object.assign(document.createElement("button"), {
        id: "bs_email_btn",
        textContent: "▶",
        title: "Click to run next action"
      })
    );

    [clipBtn, runBtn].forEach(button => {
      Object.assign(button.style, {
        position: "relative",
        border: 0,
        borderRadius: "6px",
        color: "#fff",
        font: "18px monospace",
        background: BG,
        boxShadow: "0 4px 12px rgba(0,0,0,.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "pointer"
      });
    });

    function setClipboardMode(on) {
      clipBtn.dataset.on = on ? 1 : 0;
      localStorage.setItem(CLIP_KEY, on ? 1 : 0);
      clipBtn.lastChild.style.display = on ? "none" : "flex";
      clipBtn.style.background = BG;
      clipBtn.title = "Paste barcode from clipboard: " + (on ? "ON" : "OFF");
    }

    clipBtn.onclick = () => {
      const on = clipBtn.dataset.on !== "1";
      setClipboardMode(on);
      status(on ? "Paste barcode ON" : "Paste barcode OFF");
    };

    setClipboardMode(localStorage.getItem(CLIP_KEY) === "1");

    runBtn.onclick = runAction;

    requestAnimationFrame(() => {
      const height = emailBox.offsetHeight;

      clipBtn.style.width = height + "px";
      clipBtn.style.height = height + "px";
      runBtn.style.width = height + "px";
      runBtn.style.height = height + "px";

      const statusBox = document.getElementById("bs");
      if (statusBox) positionStatus(statusBox);
    });
  }

  setupControls();
  runAction();
})();
