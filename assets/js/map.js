/* ============================================================
   CamDiansRX — partner pharmacy map
   MapLibre GL + OpenFreeMap vector tiles, loaded only when the
   section scrolls into view. If the library or the tile host cannot
   be reached, the address card beside it already carries everything
   a visitor needs, so nothing is lost.
   ============================================================ */
(function () {
  'use strict';

  var MLV   = '5.24.0';
  var CDN   = 'https://cdn.jsdelivr.net/npm/maplibre-gl@' + MLV + '/dist/maplibre-gl';
  var TILES = 'https://tiles.openfreemap.org/styles/positron';

  var SHOP = {
    name: 'Pharmacie Pisith',
    lng: 104.8960571,
    lat: 11.5668069,
    url: 'https://maps.app.goo.gl/CAmahnpHYeqYDYxVA'
  };

  var host = document.getElementById('map');
  var sec  = document.getElementById('proof');
  if (!host || !sec) return;

  var started = false;

  function fail() {
    host.setAttribute('data-state', 'off');   // CSS swaps in the still image
  }

  function build() {
    if (!window.maplibregl) return fail();
    var map;
    try {
      map = new maplibregl.Map({
        container: host,
        style: TILES,
        center: [SHOP.lng, SHOP.lat],
        zoom: 15.4,
        minZoom: 10,
        maxZoom: 18,
        attributionControl: { compact: true },
        cooperativeGestures: true   // one finger scrolls the page, two move the map
      });
    } catch (e) { return fail(); }

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    var pin = document.createElement('a');
    pin.className = 'map-pin';
    pin.href = SHOP.url;
    pin.target = '_blank';
    pin.rel = 'noopener';
    pin.innerHTML =
      '<span class="map-pin__dot" aria-hidden="true"></span>' +
      '<span class="map-pin__name"></span>';
    pin.querySelector('.map-pin__name').textContent = SHOP.name;
    new maplibregl.Marker({ element: pin, anchor: 'left' })
      .setLngLat([SHOP.lng, SHOP.lat]).addTo(map);

    map.on('load', function () { host.setAttribute('data-state', 'on'); });
    map.on('error', function () { if (host.getAttribute('data-state') !== 'on') fail(); });
    setTimeout(function () { if (host.getAttribute('data-state') !== 'on') fail(); }, 12000);
  }

  function load() {
    if (started) return;
    started = true;
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = CDN + '.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = CDN + '.js';
    js.async = true;
    js.onload = build;
    js.onerror = fail;
    document.head.appendChild(js);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); load(); } });
    }, { rootMargin: '400px' });
    io.observe(sec);
  } else {
    load();
  }
})();
