(function () {
  if (!document.body || !["BonusCardRewards", "Walmart"].includes(document.body.dataset.project)) return;

  const K = "bs_bonus_email",
    CL = "bs_clip",
    BG = "rgba(0,0,0,.5)",
    R = "20px",
    C = "courtesy of DotsTheWarlock",
    W = 400,
    CD = 1200,
    D = m => new Promise(r => setTimeout(r, m)),
    Q = () => document.querySelector("#target_codes > div > div > div.position-relative > div > div > div > div.serial-number_wrapper.flex-grow-1 > input"),
    N = () => document.querySelector(".step_active div.text-center.mt-2>input"),
    X = () => [...document.querySelectorAll('iframe[src*="recaptcha"],iframe[src*="captcha"],.g-recaptcha,[class*="captcha"]')].find(e => {
      let r = e.getBoundingClientRect(),
        s = getComputedStyle(e),
        src = e.src || "",
        t = (e.title || "").toLowerCase(),
        vis = r.width && r.height && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth && s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0",
        big = r.width > 250 && r.height > 120;
      return vis && (big || src.includes("bframe") || t.includes("challenge"));
    }),
    U = o => {
      let b = document.getElementById("bs_email_btn"),
        c = document.getElementById("bs_clip_btn");
      if (b) {
        b.textContent = o ? "⏸" : "▶";
        b.title = o ? "Stop running action" : "Click to run next action";
        b.disabled = false;
        b.style.opacity = o ? ".85" : "1";
      }
      if (c) {
        c.disabled = !!o;
        c.style.opacity = o ? ".5" : "1";
      }
    },
    P = s => {
      let w = document.getElementById("bs_email_wrap"),
        q = w && w.getBoundingClientRect();
      Object.assign(s.style, {
        top: q ? q.bottom + 6 + "px" : "90px",
        right: R,
        width: q ? q.width + "px" : "300px",
        boxSizing: "border-box"
      });
    },
    S = (m = C) => {
      let b = document.getElementById("bs") || document.body.appendChild(Object.assign(document.createElement("div"), { id: "bs" }));
      Object.assign(b.style, {
        position: "fixed",
        padding: "10px",
        borderRadius: "6px",
        zIndex: 9e5,
        color: "#fff",
        font: "12px monospace",
        whiteSpace: "pre-wrap",
        boxShadow: "0 4px 12px rgba(0,0,0,.3)",
        background: BG,
        textAlign: "center"
      });
      P(b);
      b.textContent = m;
      clearTimeout(b._t);
      if (m !== C) b._t = setTimeout(() => S(), 4000);
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
      if (window._bsStop || document.getElementById("bs_clip_btn")?.dataset.on !== "1" || !navigator.clipboard) return "";
      try {
        return ((await navigator.clipboard.readText()) || "").match(/\b\d{30}\b/)?.[0] || "";
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
      ["input", "change"].forEach(e => c.dispatchEvent(new Event(e, { bubbles: true })));
      ["keydown", "keypress", "keyup"].forEach(e =>
        c.dispatchEvent(new KeyboardEvent(e, {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true
        }))
      );

      await D(W);
      if (window._bsStop) return 0;
      if (!n.disabled) return n.click(), S('Clicked "Next"'), 1;

      S('"Next" unavailable');
      return 1;
    },
    A = async () => {
      if (window._bsBusy) return S("Already running");
      if (window._bsCool) return S("Please wait");
      if (X()) return S("Try again later");

      window._bsBusy = 1;
      window._bsStop = 0;
      U(1);

      try {
        let ei = document.getElementById("bs_email_input"),
          em = ei && ei.value.trim(),
          a = document.querySelector(".step_active");

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

            let c = Q(),
              sn = (c && ((c.value || "").match(/\b\d{30}\b/) || [])[0]) || await G();

            if (window._bsStop) return;
            if (sn && await J(sn)) return;
            return S('"Next" unavailable');
          }
        }

        let t = document.querySelector("#workflow_data_terms_of_service");
        if (t && !t.checked) {
          t.checked = true;
          t.dispatchEvent(new Event("change", { bubbles: true }));
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return S("Enter valid email");

        document.querySelectorAll('input[type="email"]').forEach(i => {
          if (i.value !== em) {
            i.value = em;
            i.dispatchEvent(new Event("input", { bubbles: true }));
            i.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });

        let btn = [...document.querySelectorAll("button,a,input")].find(e => {
          let r = e.getBoundingClientRect(),
            x = r.left + r.width / 2,
            y = r.top + r.height / 2;

          if (!r.width || !r.height || x < 0 || y < 0 || x > innerWidth || y > innerHeight) return false;

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
      let w = document.getElementById("bs_email_wrap");

      if (!w) {
        w = document.body.appendChild(Object.assign(document.createElement("div"), { id: "bs_email_wrap" }));
        Object.assign(w.style, {
          position: "fixed",
          top: "20px",
          right: R,
          zIndex: 9e5,
          display: "flex",
          gap: "6px",
          alignItems: "stretch"
        });

        let b = w.appendChild(Object.assign(document.createElement("div"), { id: "bs_email_box" }));
        Object.assign(b.style, {
          padding: "10px",
          borderRadius: "6px",
          color: "#fff",
          font: "12px monospace",
          background: BG,
          boxShadow: "0 4px 12px rgba(0,0,0,.3)",
          textAlign: "right"
        });

        let i = b.appendChild(Object.assign(document.createElement("input"), {
          id: "bs_email_input",
          type: "email",
          placeholder: "Email address",
          value: localStorage.getItem(K) || ""
        }));

        Object.assign(i.style, {
          width: "230px",
          font: "12px monospace",
          padding: "4px",
          border: "1px solid rgba(255,255,255,.45)",
          borderRadius: "4px",
          textAlign: "right",
          background: "rgba(255,255,255,.75)",
          color: "#111"
        });

        i.oninput = () => localStorage.setItem(K, i.value.trim());

        let cb = w.appendChild(Object.assign(document.createElement("button"), {
            id: "bs_clip_btn",
            innerHTML: '📋<i style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;font-style:normal">🚫</i>',
            title: "Paste barcode from clipboard: OFF"
          })),
          run = w.appendChild(Object.assign(document.createElement("button"), {
            id: "bs_email_btn",
            textContent: "▶",
            title: "Click to run next action"
          }));

        [cb, run].forEach(x => Object.assign(x.style, {
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
        }));

        let set = o => {
          cb.dataset.on = o ? 1 : 0;
          localStorage.setItem(CL, o ? 1 : 0);
          cb.lastChild.style.display = o ? "none" : "flex";
          cb.style.background = BG;
          cb.title = "Paste barcode from clipboard: " + (o ? "ON" : "OFF");
        };

        cb.onclick = () => {
          if (window._bsBusy || window._bsCool) return S("Already running");
          let on = cb.dataset.on !== "1";
          set(on);
          S(on ? "Paste barcode ON" : "Paste barcode OFF");
        };

        set(localStorage.getItem(CL) === "1");
        run.onclick = () => window._bsBusy ? T() : A();

        requestAnimationFrame(() => {
          let h = b.offsetHeight;
          cb.style.width = cb.style.height = run.style.width = run.style.height = h + "px";
          let s = document.getElementById("bs");
          s && P(s);
        });
      }
    };

  E();
  A();
})();
