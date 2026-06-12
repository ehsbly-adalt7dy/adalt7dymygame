(function () {

  /* ══ CSS ══ */
  const CSS = `
    html { background: #a8d8ea !important; }

    body.__page-out {
      pointer-events: none;
      animation: __slideOut 0.44s cubic-bezier(0.4, 0, 1, 1) forwards;
    }
    body.__page-in {
      animation: __slideIn 0.56s cubic-bezier(0, 0, 0.2, 1) both;
    }
    body.__page-in-back {
      animation: __slideInBack 0.56s cubic-bezier(0, 0, 0.2, 1) both;
    }
    body.__page-out-back {
      pointer-events: none;
      animation: __slideOutBack 0.44s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes __slideOut {
      from { transform: translateX(0);    opacity: 1; }
      to   { transform: translateX(-30px); opacity: 0; }
    }
    @keyframes __slideIn {
      from { transform: translateX(40px); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes __slideInBack {
      from { transform: translateX(-40px); opacity: 0; }
      to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes __slideOutBack {
      from { transform: translateX(0);    opacity: 1; }
      to   { transform: translateX(30px); opacity: 0; }
    }

    /* يمنع الوميض الأسود لحظة تحميل الصفحة */
    body.__loading {
      opacity: 0;
    }
  `;

  function injectCSS() {
    if (document.getElementById('__tr-css')) return;
    const s = document.createElement('style');
    s.id = '__tr-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ══ الانتقال للأمام (دخول صفحة جديدة) ══ */
  window.goToPage = function (href) {
    injectCSS();
    sessionStorage.setItem('__nav_dir', 'forward');
    document.body.classList.add('__page-out');
    setTimeout(function () {
      window.location.href = href;
    }, 420);  // 210 × 2
  };

  /* ══ الرجوع للخلف ══ */
  window.goBack = function (href) {
    injectCSS();
    sessionStorage.setItem('__nav_dir', 'back');
    document.body.classList.add('__page-out-back');
    setTimeout(function () {
      window.location.href = href;
    }, 420);  // 210 × 2
  };

  /* ══ animation الدخول عند تحميل الصفحة الجديدة ══ */
  function onPageLoad() {
    injectCSS();
    const dir = sessionStorage.getItem('__nav_dir');
    sessionStorage.removeItem('__nav_dir');

    if (dir === 'forward') {
      document.body.classList.add('__page-in');
    } else if (dir === 'back') {
      document.body.classList.add('__page-in-back');
    } else {
      /* أول فتح للتطبيق — fade بسيط */
      document.body.style.opacity = '0';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.body.style.transition = 'opacity 0.4s ease';  // 0.2 × 2
          document.body.style.opacity    = '1';
        });
      });
    }
  }

  /* أخفِ الـ body فوراً لمنع لمعة الوميض الأسود */
  document.documentElement.style.background =
    'linear-gradient(135deg,#a8d8ea 0%,#aa96da 100%)';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageLoad);
  } else {
    onPageLoad();
  }

})();
