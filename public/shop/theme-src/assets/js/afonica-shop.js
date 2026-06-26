(function () {
  'use strict';

  function fixCardLayout() {
    document.querySelectorAll('.afonica-card__media').forEach(function (media) {
      if (getComputedStyle(media).position !== 'static') return;

      media.style.cssText =
        'position:relative;width:100%;aspect-ratio:1/1;overflow:hidden;background:#0f0f0f;';

      media.querySelectorAll('.afonica-card__img').forEach(function (img) {
        img.style.cssText =
          'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;max-width:none;margin:0;padding:0.75rem;border:0;';
        if (img.classList.contains('afonica-card__img--back')) {
          img.style.opacity = '0';
        }
      });
    });

    document.querySelectorAll('.page-home .featured-products .js-product.product').forEach(function (item) {
      item.style.cssText = 'flex:0 0 100%;max-width:100%;width:100%;padding:0;float:none;';
      if (window.matchMedia('(min-width: 576px)').matches) {
        item.style.flex = '0 0 calc(50% - 0.5rem)';
        item.style.maxWidth = 'calc(50% - 0.5rem)';
      }
      if (window.matchMedia('(min-width: 992px)').matches) {
        item.style.flex = '0 0 calc(25% - 0.9375rem)';
        item.style.maxWidth = 'calc(25% - 0.9375rem)';
      }
    });

    var rows = document.querySelectorAll('.page-home .featured-products .products, .page-home .featured-products > .row');
    rows.forEach(function (row) {
      row.style.cssText =
        'display:flex;flex-wrap:wrap;gap:1rem;max-width:80rem;margin:0 auto;';
    });
  }

  function initFlipCard(card) {
    var media = card.querySelector('.afonica-card__media');
    var dots = card.querySelectorAll('.afonica-card__dot');
    if (!media || !card.querySelector('.afonica-card__img--back')) return;

    var flipped = false;
    var timer = null;
    var paused = false;

    var front = card.querySelector('.afonica-card__img--front');
    var back = card.querySelector('.afonica-card__img--back');

    function setFlipped(next) {
      flipped = next;
      media.classList.toggle('is-flipped', flipped);
      if (front) front.style.opacity = flipped ? '0' : '1';
      if (back) back.style.opacity = flipped ? '1' : '0';
      if (dots.length === 2) {
        dots[0].classList.toggle('is-active', !flipped);
        dots[1].classList.toggle('is-active', flipped);
      }
    }

    function startAutoFlip() {
      stopAutoFlip();
      timer = window.setInterval(function () {
        if (!paused) setFlipped(!flipped);
      }, 3000);
    }

    function stopAutoFlip() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    setFlipped(false);
    startAutoFlip();

    card.addEventListener('mouseenter', function () {
      paused = true;
    });
    card.addEventListener('mouseleave', function () {
      paused = false;
    });

    var hoverTarget = card.querySelector('.afonica-card__media-link') || media;
    hoverTarget.addEventListener('touchstart', function () {
      paused = true;
    }, { passive: true });
    hoverTarget.addEventListener('touchend', function () {
      paused = false;
    });
  }

  function enrichBackImage(card) {
    if (card.querySelector('.afonica-card__img--back')) {
      return Promise.resolve();
    }

    var link = card.querySelector('.afonica-card__media-link, .afonica-card__title a, .afonica-card__link');
    var front = card.querySelector('.afonica-card__img--front');
    if (!link || !front) return Promise.resolve();

    return fetch(link.href, { credentials: 'same-origin' })
      .then(function (response) {
        return response.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var urls = [];
        doc.querySelectorAll('img[src*="home_default"]').forEach(function (img) {
          var src = img.getAttribute('src');
          if (src && urls.indexOf(src) === -1) urls.push(src);
        });

        var backUrl = urls.find(function (url) {
          return url !== front.getAttribute('src');
        });

        if (!backUrl) return;

        var media = card.querySelector('.afonica-card__media');
        if (!media) return;

        var back = document.createElement('img');
        back.className = 'afonica-card__img afonica-card__img--back';
        back.src = backUrl;
        back.alt = front.alt + ' — trasera';
        back.loading = 'lazy';
        media.appendChild(back);

        var dots = document.createElement('div');
        dots.className = 'afonica-card__dots';
        dots.setAttribute('aria-hidden', 'true');
        dots.innerHTML = '<span class="afonica-card__dot"></span><span class="afonica-card__dot"></span>';
        media.appendChild(dots);

        card.classList.add('js-afonica-flip-card');
        initFlipCard(card);
      })
      .catch(function () {
        /* no flip without second image */
      });
  }

  function init() {
    fixCardLayout();
    document.querySelectorAll('.js-afonica-flip-card').forEach(initFlipCard);

    var pending = [];
    document.querySelectorAll('.afonica-card').forEach(function (card) {
      if (!card.querySelector('.afonica-card__img--back')) {
        pending.push(enrichBackImage(card));
      }
    });

    Promise.all(pending).catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
