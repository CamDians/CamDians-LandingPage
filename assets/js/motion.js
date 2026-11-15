/* ============================================================
   CamDiansRX — motion
   Two scripted movements (scroll reveal, counting numbers).
   The other three are pure CSS: button lift, card lift, live dot.
   Everything here is additive: with this file blocked, the page
   still shows every word and every number.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The .js class is set in the head, before the first paint, so nothing
  // flashes in and out. A reader without JS never meets a hidden paragraph.

  /* ---- 1. scroll reveal (0.55s) ---- */
  function reveal() {
    var items = [].slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- 2. counting numbers (0.6s) ---- */
  function counters() {
    var nums = [].slice.call(document.querySelectorAll('.count'));
    if (!nums.length || reduced || !('IntersectionObserver' in window)) return;

    function run(el) {
      var to = parseFloat(el.getAttribute('data-to'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      if (isNaN(to)) return;
      var dur = 600, t0 = null;
      function frame(t) {
        if (t0 === null) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = to.toFixed(dec);
      }
      requestAnimationFrame(frame);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
  }

  function start() { reveal(); counters(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
