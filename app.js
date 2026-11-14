(function () {
  'use strict';
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* большая бирка качается за курсором, как на нитке */
  var tag = document.getElementById('bigtag');
  if (tag && !calm && window.matchMedia('(pointer: fine)').matches) {
    var hero = tag.closest('.hero'), raf = null, target = 0, cur = 0;
    hero.addEventListener('mousemove', function (e) {
      var r = tag.getBoundingClientRect();
      target = Math.max(-7, Math.min(7, (e.clientX - (r.left + r.width / 2)) / 40));
      if (!raf) raf = requestAnimationFrame(step);
    });
    hero.addEventListener('mouseleave', function () { target = 0; if (!raf) raf = requestAnimationFrame(step); });
    function step() {
      cur += (target - cur) * 0.08;
      tag.style.setProperty('--sw', cur.toFixed(2) + 'deg');
      raf = Math.abs(target - cur) > 0.02 ? requestAnimationFrame(step) : null;
    }
  }
  /* на тач-экранах вещь поворачивается по нажатию */
  document.querySelectorAll('.lk-ph').forEach(function (p) {
    p.addEventListener('click', function () { p.classList.toggle('turn'); });
  });
})();
