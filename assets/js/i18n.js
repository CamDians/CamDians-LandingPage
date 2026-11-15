/* ============================================================
   CamDiansRX — language switch
   Korean is what the HTML already says, so a reader whose browser
   blocks this file still gets a complete page.
   Order of precedence: ?lang= → last choice → browser → Korean.
   ============================================================ */
(function () {
  'use strict';

  var SUPPORTED = ['ko', 'en', 'km'];
  var KEY = 'camdians-lang';

  function apply(lang) {
    var dict = window.I18N && window.I18N[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-alt')];
      if (v !== undefined) el.setAttribute('alt', strip(v));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-aria')];
      if (v !== undefined) el.setAttribute('aria-label', strip(v));
    });
    // the comparison table shows the column name on narrow screens
    document.querySelectorAll('[data-i18n-c]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-c')];
      if (v !== undefined) el.setAttribute('data-c', strip(v));
    });
    document.querySelectorAll('[data-i18n-err]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-err')];
      if (v !== undefined) el.setAttribute('data-err', strip(v));
    });

    document.documentElement.lang = lang;
    if (window.TITLES && window.TITLES[lang]) document.title = window.TITLES[lang];

    document.querySelectorAll('.lang').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    try { localStorage.setItem(KEY, lang); } catch (e) {}
    try {
      var u = new URL(window.location.href);
      if (u.searchParams.get('lang') !== lang) {
        u.searchParams.set('lang', lang);
        history.replaceState(null, '', u);
      }
    } catch (e) {}
  }

  // alt / aria / data-* attributes take plain text, not markup
  function strip(s) {
    var d = document.createElement('div');
    d.innerHTML = s;
    return d.textContent;
  }

  function pick() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q && SUPPORTED.indexOf(q) > -1) return q;
    } catch (e) {}
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && SUPPORTED.indexOf(saved) > -1) return saved;
    } catch (e) {}
    try {
      var navs = navigator.languages || [navigator.language || ''];
      for (var i = 0; i < navs.length; i++) {
        var two = String(navs[i]).slice(0, 2).toLowerCase();
        if (two === 'km') return 'km';
        if (two === 'ko') return 'ko';
        if (two === 'en') return 'en';
      }
    } catch (e) {}
    return 'ko';
  }

  document.querySelectorAll('.lang').forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
  });

  apply(pick());
  window.applyLang = apply;
})();
