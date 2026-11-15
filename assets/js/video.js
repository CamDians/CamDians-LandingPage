/* ============================================================
   CamDiansRX — walkthrough video
   The 645 KB file is only requested after the visitor asks for it.
   Until then the page costs a 17 KB still image.
   ============================================================ */
(function () {
  'use strict';

  var frame = document.getElementById('videoFrame');
  var play  = document.getElementById('videoPlay');
  if (!frame || !play) return;

  play.addEventListener('click', function () {
    var v = document.createElement('video');
    v.controls = true;
    v.playsInline = true;
    v.autoplay = true;
    v.setAttribute('width', '1240');
    v.setAttribute('height', '698');

    var s = document.createElement('source');
    s.src = 'assets/video/camdiansrx-walkthrough.webm';
    s.type = 'video/webm';
    v.appendChild(s);

    // a browser that cannot decode WebM gets the poster and a plain link back
    function fallback() {
      frame.innerHTML =
        '<div class="map__still">' +
        '<span>' + (frame.getAttribute('data-err') || '이 브라우저에서 재생할 수 없습니다.') + '</span>' +
        '<a class="shopcard__link" href="assets/video/camdiansrx-walkthrough.webm" download>영상 파일 내려받기</a>' +
        '</div>';
    }
    s.addEventListener('error', fallback);
    v.addEventListener('error', fallback);

    frame.innerHTML = '';
    frame.appendChild(v);
    try { v.play(); } catch (e) {}
  });
})();
