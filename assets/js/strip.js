/* ============================================================
   CamDiansRX — field photo strip
   Drag the bar under the photographs to move along them.
   Swiping the photographs themselves works too; the bar is for
   people on a mouse, who have nothing to swipe with.
   ============================================================ */
(function () {
  'use strict';

  var track = document.getElementById('stripTrack');
  var bar   = document.getElementById('stripBar');
  var thumb = document.getElementById('stripThumb');
  if (!track || !bar || !thumb) return;

  var dragging = false;

  function maxScroll() { return Math.max(0, track.scrollWidth - track.clientWidth); }

  function sync() {
    var bw = bar.clientWidth;
    if (!bw || !track.scrollWidth) return;
    var frac = Math.min(1, track.clientWidth / track.scrollWidth);
    var tw = Math.max(44, Math.round(bw * frac));
    thumb.style.width = tw + 'px';
    var max = maxScroll();
    var x = max > 0 ? (track.scrollLeft / max) * (bw - tw) : 0;
    thumb.style.transform = 'translateX(' + Math.round(x) + 'px)';
    bar.style.visibility = frac >= 1 ? 'hidden' : 'visible';
    bar.setAttribute('aria-valuenow', max > 0 ? Math.round(track.scrollLeft / max * 100) : 0);
  }

  // put the middle of the thumb under the pointer
  function seek(clientX) {
    var r = bar.getBoundingClientRect();
    var tw = thumb.offsetWidth;
    var span = r.width - tw;
    if (span <= 0) return;
    var f = (clientX - r.left - tw / 2) / span;
    f = Math.min(1, Math.max(0, f));
    track.scrollLeft = f * maxScroll();
  }

  thumb.addEventListener('pointerdown', function (e) {
    dragging = true;
    try { thumb.setPointerCapture(e.pointerId); } catch (err) {}
    bar.classList.add('is-drag');
    e.preventDefault(); e.stopPropagation();
  });
  thumb.addEventListener('pointermove', function (e) {
    if (dragging) { e.preventDefault(); seek(e.clientX); }
  });
  function release(e) {
    if (!dragging) return;
    dragging = false;
    try { thumb.releasePointerCapture(e.pointerId); } catch (err) {}
    bar.classList.remove('is-drag');
  }
  thumb.addEventListener('pointerup', release);
  thumb.addEventListener('pointercancel', release);

  bar.addEventListener('pointerdown', function (e) { if (e.target !== thumb) seek(e.clientX); });
  bar.addEventListener('keydown', function (e) {
    var step = track.clientWidth * 0.8;
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollLeft += step; }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); track.scrollLeft -= step; }
  });

  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  sync(); setTimeout(sync, 150); setTimeout(sync, 700);
})();
