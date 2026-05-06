/* =============================================================
   MOTION JS — scroll reveals, counters, magnetic hover, FAQ, bento glow
   ============================================================= */

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var progressBar = document.querySelector('.scroll-progress');
  function updateProgress() {
    var scrolled = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? (scrolled / total) * 100 : 0;
    if (progressBar) progressBar.style.setProperty('--sp', pct + '%');
  }

  var nav = document.querySelector('.nav');
  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }

  var floatCta = document.querySelector('.float-cta');
  var hero = document.querySelector('.hero');
  function updateFloatCta() {
    if (!floatCta || !hero) return;
    var heroBottom = hero.getBoundingClientRect().bottom;
    var final = document.querySelector('.final');
    var finalTop = final ? final.getBoundingClientRect().top : 9999;
    if (heroBottom < 0 && finalTop > window.innerHeight) {
      floatCta.classList.add('show');
    } else {
      floatCta.classList.remove('show');
    }
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        updateNav();
        updateFloatCta();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  updateProgress(); updateNav(); updateFloatCta();

  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .prob, .real, .final').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal, .prob, .real, .final').forEach(function (el) {
      el.classList.add('in');
    });
  }

  setTimeout(function () {
    var h1 = document.querySelector('.hero-left h1');
    if (h1) h1.classList.add('mark-in');
  }, 450);

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1400;
    var start = performance.now();
    function step(now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = Math.floor(eased * target);
      el.textContent = prefix + val + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !prefersReduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });
  }

  if ('IntersectionObserver' in window) {
    var flowIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var section = entry.target.closest('.incl') || entry.target;
        if (entry.isIntersecting) {
          section.classList.add('playing');
          section.classList.remove('paused');
        } else if (section.classList.contains('playing')) {
          section.classList.add('paused');
        }
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('.incl-flow').forEach(function (el) { flowIO.observe(el); });
  } else {
    document.querySelectorAll('.incl').forEach(function (el) { el.classList.add('playing'); });
  }

  document.querySelectorAll('.qa').forEach(function (qa) {
    qa.addEventListener('click', function () {
      var wasOpen = qa.classList.contains('open');
      document.querySelectorAll('.qa.open').forEach(function (o) { o.classList.remove('open'); });
      if (!wasOpen) qa.classList.add('open');
    });
  });

  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn-magnet').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + x * 0.18 + 'px, ' + y * 0.25 + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.bi').forEach(function (bi) {
      bi.addEventListener('mousemove', function (e) {
        var rect = bi.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        bi.style.setProperty('--mx', x + '%');
        bi.style.setProperty('--my', y + '%');
      });
    });
  }

  if (!prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    var stage = document.querySelector('.hero-stage');
    if (stage) {
      stage.addEventListener('mousemove', function (e) {
        var rect = stage.getBoundingClientRect();
        var cx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        var cy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        stage.querySelectorAll('.fcard').forEach(function (card, i) {
          if (card.matches(':hover')) return;
          var depth = (i + 1) * 6;
          card.style.translate = (-cx * depth) + 'px ' + (-cy * depth) + 'px';
        });
      });
      stage.addEventListener('mouseleave', function () {
        stage.querySelectorAll('.fcard').forEach(function (card) {
          card.style.translate = '';
        });
      });
    }
  }

  var finalH2 = document.querySelector('.final h2');
  if (finalH2 && !finalH2.dataset.split) {
    var html = finalH2.innerHTML;
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    function walk(node, out) {
      node.childNodes.forEach(function (child) {
        if (child.nodeType === 3) {
          var words = child.nodeValue.split(/(\s+)/);
          words.forEach(function (w) {
            if (w.trim().length > 0) {
              var s = document.createElement('span');
              s.className = 'word';
              s.textContent = w;
              out.appendChild(s);
            } else if (w.length > 0) {
              out.appendChild(document.createTextNode(w));
            }
          });
        } else if (child.nodeType === 1) {
          var clone = child.cloneNode(false);
          clone.classList.add('word');
          walk(child, clone);
          out.appendChild(clone);
        }
      });
    }
    var container = document.createElement('span');
    walk(tmp, container);
    finalH2.innerHTML = container.innerHTML;
    finalH2.dataset.split = 'true';
  }
})();
