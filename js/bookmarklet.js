(() => {
  if (!document.body || !["BonusCardRewards", "Walmart"].includes(document.body.dataset.project)) return;

  const K = "bs_bonus_email",
    CL = "bs_clip",
    BG = "rgba(0,0,0,.5)",
    C = "courtesy of DotsTheWarlock",
    W = 400,
    CD = 1200,
    q = s => document.querySelector(s),
    qa = s => [...document.querySelectorAll(s)],
    D = m => new Promise(r => setTimeout(r, m)),
    bar = s => (s || "").match(/\b\d{30}\b/)?.[0] || "",
    Q = () => q("#target_codes > div > div > div.position-relative > div > div > div > div.serial-number_wrapper.flex-grow-1 > input"),
    N = () => q(".step_active div.text-center.mt-2>input"),
    F = (e, ...a) => a.forEach(x => e.dispatchEvent(new Event(x, { bubbles: 1 }))),
    Ent = e => ["keydown", "keypress", "keyup"].forEach(x =>
      e.dispatchEvent(new KeyboardEvent(x, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: 1
      }))
    ),
    X = () => qa('iframe[src*="recaptcha"],iframe[src*="captcha"],.g-recaptcha,[class*="captcha"]').find(e => {
      let r = e.getBoundingClientRect(),
        s = getComputedStyle(e),
        u = e.src || "",
        t = (e.title || "").toLowerCase(),
        v = r.width &&
          r.height &&
          r.bottom > 0 &&
          r.right > 0 &&
          r.top < innerHeight &&
          r.left < innerWidth &&
          s.display !== "none" &&
          s.visibility !== "hidden" &&
          s.opacity !== "0";

      return v && (
        r.width > 250 && r.height > 120 ||
        u.includes("bframe") ||
        t.includes("challenge")
      );
    }),

    U = o => {
      let b = q("#bsa");

      if (b) {
        b.textContent = o ? "⏸" : "▶";
        b.title = o ? "Stop running action" : "Click to run next action";
      }
    },

    S = (m = C) => {
      let b = q("#bst");

      b && (
        b.textContent = m,
        clearTimeout(b._t),
        m !== C && (b._t = setTimeout(() => S(), 4e3))
      );
    },

    T = () => {
      window._bsStop = 1;
      window._bsBusy = 0;
      window._bsCool = 1;
      U(0);
      S("Stopped");
      setTimeout(() => window._bsCool = 0, CD);
    },

    G = async () => {
      if (window._bsStop || q("#bsc")?.dataset.on !== "1" || !navigator.clipboard) return "";

      try {
        return bar(await navigator.clipboard.readText());
      } catch (e) {
        S("Clipboard blocked");
        return "";
      }
    },

    J = async sn => {
      let c, n;

      for (let k = 0; k < 20 && !window._bsStop; k++) {
        c = Q();
        n = N();

        if (c && n) break;

        await D(120);
      }

      if (window._bsStop || !(c && n)) return 0;

      c.focus();
      c.value = sn;
      F(c, "input", "change");
      Ent(c);

      await D(W);

      if (window._bsStop) return 0;
      if (!n.disabled) return n.click(), S('Clicked "Next"'), 1;

      S('"Next" unavailable');
      return 1;
    },

    A = async () => {
      if (window._bsBusy || window._bsCool) return S("Please wait");
      if (X()) return S("Try again later");

      window._bsBusy = 1;
      window._bsStop = 0;
      U(1);

      try {
        let em = q("#bsi")?.value.trim(),
          a = q(".step_active");

        if (a) {
          let g = a.querySelector('input.btn-primary[type="button"][value="Get My Bonus"]');

          if (g) {
            let sn = await G();

            if (window._bsStop) return;

            g.click();
            S('Clicked "Get My Bonus"');

            if (sn) await J(sn);
            return;
          }

          let n = N();

          if (n) {
            if (!n.disabled) return n.click(), S('Clicked "Next"');

            let sn = bar(Q()?.value) || await G();

            if (window._bsStop) return;
            if (sn && await J(sn)) return;

            return S('"Next" unavailable');
          }
        }

        let t = q("#workflow_data_terms_of_service");

        if (t && !t.checked) {
          t.checked = 1;
          F(t, "change");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return S("Enter valid email");

        qa('input[type="email"]').forEach(i => {
          if (i.value !== em) {
            i.value = em;
            F(i, "input", "change");
          }
        });

        let btn = qa("button,a,input").find(e => {
          let r = e.getBoundingClientRect(),
            x = r.left + r.width / 2,
            y = r.top + r.height / 2;

          if (!r.width || !r.height || x < 0 || y < 0 || x > innerWidth || y > innerHeight) return 0;

          let top = document.elementFromPoint(x, y),
            txt = e.textContent.toUpperCase().trim(),
            v = (e.value || "").toUpperCase().trim(),
            nm = e.name || "";

          return top &&
            (e.contains(top) || top.contains(e)) &&
            (
              nm === "commit" ||
              ["SHOW & EMAIL CODE", "NEXT", "GET MY BONUS"].includes(txt) ||
              ["SHOW & EMAIL CODE", "NEXT"].includes(v) ||
              txt.includes("CLAIM ANOTHER BONUS")
            );
        });

        if (!btn) return S("No action button found");

        S("Submitting...");

        setTimeout(() => {
          if (!window._bsStop) {
            btn.click();
            S("Clicked submit");
          }
        }, W);
      } finally {
        setTimeout(() => {
          window._bsBusy = 0;
          window._bsCool = 1;
          U(0);
          setTimeout(() => window._bsCool = 0, CD);
        }, CD);
      }
    },

    E = () => {
      q("#bs_email_wrap")?.remove();

      let p = q("#bsp");
      if (p && !p.querySelector("#bst")) p.remove();

      let old = q("#bs");
      if (old && !old.closest("#bsp")) old.remove();

      q("#bss")?.remove();

      document.body.appendChild(Object.assign(document.createElement("style"), {
        id: "bss",
        textContent: `
#bsp{--bg:${BG};position:fixed;top:20px;right:20px;width:360px;z-index:900000}
#bsw{display:flex;gap:6px;align-items:stretch}
#bsb,#bst,#bsc,#bsa{background:var(--bg)!important;box-shadow:0 4px 12px #0005;border-radius:6px}
#bsb{padding:10px;flex:1}
#bsi{width:100%;box-sizing:border-box;font:12px monospace;padding:4px;border:1px solid rgba(255,255,255,.45);border-radius:4px;text-align:right;background:rgba(255,255,255,.75);color:#111}
#bsc,#bsa{position:relative;width:44px;height:44px;flex:0 0 44px;color:#fff;font:18px monospace;display:flex;align-items:center;justify-content:center;user-select:none;cursor:pointer;background:var(--bg)!important;outline:none!important;border:0!important;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
#bsc:hover,#bsc:active,#bsc:focus,#bsa:hover,#bsa:active,#bsa:focus{background:var(--bg)!important;outline:none!important;box-shadow:0 4px 12px #0005!important}
#bsc i{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;font-style:normal}
#bst{margin-top:6px;width:100%;box-sizing:border-box;padding:10px;color:#fff;font:12px monospace;white-space:pre-wrap;text-align:center}
`
      }));

      if (!q("#bsp")) {
        document.body.insertAdjacentHTML("beforeend", '<div id="bsp"><div id="bsw"><div id="bsb"><input id="bsi" type="email" placeholder="Email address"></div><div id="bsc" title="Paste barcode from clipboard: OFF">📋<i>🚫</i></div><div id="bsa" title="Click to run next action">▶</div></div><div id="bst">courtesy of DotsTheWarlock</div></div>');
      }

      let i = q("#bsi"),
        cb = q("#bsc"),
        run = q("#bsa");

      if (!i._bs) {
        i.value = localStorage.getItem(K) || "";
        i.oninput = () => localStorage.setItem(K, i.value.trim());
        i._bs = 1;
      }

      let set = o => {
        cb.dataset.on = o ? 1 : 0;
        localStorage.setItem(CL, o ? 1 : 0);
        q("#bsc i").style.display = o ? "none" : "flex";
        cb.title = "Paste barcode from clipboard: " + (o ? "ON" : "OFF");
      };

      cb.onclick = () => {
        if (window._bsBusy || window._bsCool) return S("Please wait");

        let on = cb.dataset.on !== "1";
        set(on);
        S(on ? "Paste barcode ON" : "Paste barcode OFF");
      };

      set(localStorage.getItem(CL) === "1");

      run.onclick = () => window._bsBusy ? T() : A();

      U(!!window._bsBusy);
    };

  E();
  A();
})();
