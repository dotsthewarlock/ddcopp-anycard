(function () {
  if (!document.body || document.body.getAttribute('data-project') !== 'BonusCardRewards') {
    return;
  }

  const EMAIL_KEY = 'bs_bonus_email';
  const BG = 'rgba(0,0,0,0.7)';
  const RIGHT = '20px';

  function getEmailInput() {
    let box = document.getElementById('bs_email_box');

    if (!box) {
      box = document.createElement('div');
      box.id = 'bs_email_box';

      Object.assign(box.style, {
        position: 'fixed',
        top: '20px',
        right: RIGHT,
        padding: '10px',
        borderRadius: '6px',
        zIndex: 900000,
        color: '#fff',
        font: '12px monospace',
        background: BG,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        maxWidth: '260px',
        textAlign: 'right'
      });

      const label = document.createElement('div');
      label.textContent = 'Email for bonus:';
      label.style.marginBottom = '4px';

      const input = document.createElement('input');
      input.id = 'bs_email_input';
      input.type = 'email';
      input.placeholder = 'email@example.com';
      input.value = localStorage.getItem(EMAIL_KEY) || '';

      Object.assign(input.style, {
        width: '230px',
        font: '12px monospace',
        padding: '4px',
        border: '1px solid #aaa',
        borderRadius: '4px',
        textAlign: 'right'
      });

      input.addEventListener('input', () => {
        localStorage.setItem(EMAIL_KEY, input.value.trim());
      });

      box.append(label, input);
      document.body.append(box);
    }

    return box.querySelector('#bs_email_input');
  }

  function status(message) {
    let box = document.getElementById('bs');

    if (!box) {
      box = document.createElement('div');
      box.id = 'bs';
      document.body.append(box);
    }

    Object.assign(box.style, {
      position: 'fixed',
      top: '90px',
      right: RIGHT,
      padding: '10px',
      borderRadius: '6px',
      zIndex: 900000,
      color: '#fff',
      font: '12px monospace',
      whiteSpace: 'pre-wrap',
      maxWidth: '260px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      background: BG,
      textAlign: 'right'
    });

    box.textContent = message;

    clearTimeout(box._bsTimer);
    box._bsTimer = setTimeout(() => box.remove(), 4000);
  }

  const emailInput = getEmailInput();
  const email = emailInput.value.trim();

  const activeStep = document.querySelector('.step.py-3.px-2.step_active');

  if (activeStep) {
    const primaryBtn = activeStep.querySelector('input[type="button"][value="Get My Bonus"]');

    if (primaryBtn) {
      const r = primaryBtn.getBoundingClientRect();

      if (r.width > 0 && r.height > 0) {
        primaryBtn.click();
        status('Found & Clicked Primary inside Active Step:\n<input type="button" value="Get My Bonus">');
        return;
      }
    }

    const nextContainer = activeStep.querySelector('div.text-center.mt-2');

    if (nextContainer) {
      const nextBtn = nextContainer.querySelector('input[type="button"][value="Next"]');

      if (nextBtn) {
        const r = nextBtn.getBoundingClientRect();

        if (r.width > 0 && r.height > 0) {
          nextBtn.click();
          status('Clicked "Next" inside text-center container');
          return;
        }
      }
    }
  }

  const tos = document.querySelector('input#workflow_data_terms_of_service');

  if (tos && !tos.checked) {
    tos.checked = true;
    tos.dispatchEvent(new Event('change', { bubbles: true }));
  }

  if (!email) {
    status('Enter email in the floating box, then run again');
    return;
  }

  document.querySelectorAll('input[type="email"]').forEach((input) => {
    if (input.value !== email) {
      input.value = email;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  const buttons = [...document.querySelectorAll('button, a, input')].filter((el) => {
    const r = el.getBoundingClientRect();

    if (r.width === 0 || r.height === 0) return false;

    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    if (cx < 0 || cy < 0 || cx > window.innerWidth || cy > window.innerHeight) return false;

    const topEl = document.elementFromPoint(cx, cy);

    if (!topEl || (!el.contains(topEl) && !topEl.contains(el))) return false;

    const txt = el.textContent.toUpperCase().trim();
    const val = (el.value || '').toUpperCase().trim();
    const name = el.getAttribute('name') || '';

    return (
      name === 'commit' ||
      txt === 'SHOW & EMAIL CODE' ||
      val === 'SHOW & EMAIL CODE' ||
      txt === 'NEXT' ||
      val === 'NEXT' ||
      txt === 'GET MY BONUS' ||
      txt.includes('CLAIM ANOTHER BONUS')
    );
  });

  const button = buttons[0];

  if (!button) {
    status('No Visible Buttons Found');
    return;
  }

  const tag = button.tagName.toLowerCase();
  const cls = button.className ? '.' + [...button.classList].join('.') : '';
  const txt = button.textContent.trim() || button.value || button.getAttribute('name') || 'No Text';

  button.click();

  status(`Filled Email, TOS, & Clicked:\n<${tag}${cls}>\nText/Name: "${txt}"`);
})();
