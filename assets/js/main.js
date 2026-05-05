/* Tahrin's Portfolio — interactions */
(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    primaryNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ── Gallery filter chips ── */
  const chips = document.querySelectorAll('.chip');
  const polaroids = document.querySelectorAll('.polaroid');
  const slides = document.querySelectorAll('.slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const sliderCurrent = document.querySelector('.slider-current');
  const sliderTotal = document.querySelector('.slider-total');
  const sliderTitle = document.querySelector('.slider-title-text');
  const sliderEvent = document.querySelector('.slider-event-text');
  const sliderSummary = document.querySelector('.slider-summary-text');
  const sliderPrev = document.querySelector('.slider-prev');
  const sliderNext = document.querySelector('.slider-next');

  const getVisibleSlides = () => Array.from(slides).filter(slide => slide.style.display !== 'none');

  const updateSlider = (index = 0) => {
    const visibleSlides = getVisibleSlides();
    if (!visibleSlides.length) return;

    let activeSlide = slides[index] && slides[index].style.display !== 'none'
      ? slides[index]
      : visibleSlides[0];

    const activeIndex = Array.from(slides).indexOf(activeSlide);
    const activePosition = visibleSlides.indexOf(activeSlide) + 1;

    slides.forEach((slide, idx) => slide.classList.toggle('is-active', idx === activeIndex));
    sliderDots.forEach((dot, idx) => {
      const isVisible = slides[idx].style.display !== 'none';
      dot.style.display = isVisible ? '' : 'none';
      dot.classList.toggle('is-active', idx === activeIndex);
    });

    sliderCurrent.textContent = String(activePosition);
    sliderTotal.textContent = String(visibleSlides.length);
    sliderTitle.textContent = activeSlide.dataset.title || '';
    sliderEvent.textContent = activeSlide.dataset.event || '';
    sliderSummary.textContent = activeSlide.dataset.summary || '';
  };

  const stepSlide = (direction) => {
    const visibleSlides = getVisibleSlides();
    if (!visibleSlides.length) return;

    const currentSlide = document.querySelector('.slide.is-active');
    const currentIndex = visibleSlides.indexOf(currentSlide);
    const nextIndex = (currentIndex + direction + visibleSlides.length) % visibleSlides.length;

    const targetSlide = visibleSlides[nextIndex];
    updateSlider(Array.from(slides).indexOf(targetSlide));
  };

  const applySlideFilter = (filter) => {
    slides.forEach((slide) => {
      const cats = (slide.dataset.categories || '').toLowerCase();
      const match = filter === 'all' || cats.includes(filter);
      slide.style.display = match ? '' : 'none';
    });

    updateSlider();
  };

  if (sliderPrev) {
    sliderPrev.addEventListener('click', () => stepSlide(-1));
  }

  if (sliderNext) {
    sliderNext.addEventListener('click', () => stepSlide(1));
  }

  sliderDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (slides[idx].style.display === 'none') return;
      updateSlider(idx);
    });
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;

      if (slides.length) {
        applySlideFilter(filter);
        return;
      }

      polaroids.forEach((p, i) => {
        const cats = (p.dataset.categories || '').toLowerCase();
        const match = filter === 'all' || cats.includes(filter);
        if (match) {
          p.classList.remove('is-hidden');
          p.style.animation = 'none';
          /* trigger reflow */
          void p.offsetWidth;
          p.style.animation = `polaroid-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s backwards`;
        } else {
          p.classList.add('is-hidden');
        }
      });
    });
  });

  if (slides.length) {
    updateSlider(0);
  }

  /* ── Reveal-on-scroll for cards ── */
  const revealTargets = document.querySelectorAll('.about-card, .cert-card, .polaroid, .slide');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => io.observe(el));
  }

  /* ── Sparkle trail on click (extra delight) ── */
  const sparkleChars = ['✦', '✧', '⋆', '♡'];
  const colors = ['#ec4899', '#f472b6', '#c084fc', '#fbbf24'];

  document.addEventListener('click', (e) => {
    /* Skip on form / link clicks to keep things clean */
    if (e.target.closest('a, button, input, textarea')) return;

    for (let i = 0; i < 5; i++) {
      const s = document.createElement('span');
      s.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
      s.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: ${14 + Math.random() * 14}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 9999;
        text-shadow: 0 0 6px currentColor;
        transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
        opacity: 1;
      `;
      document.body.appendChild(s);
      const dx = (Math.random() - 0.5) * 120;
      const dy = (Math.random() - 0.5) * 120 - 30;
      requestAnimationFrame(() => {
        s.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 1000);
    }
  });

  /* ── Subtle parallax on hero portrait ── */
  const portrait = document.querySelector('.portrait-frame');
  if (portrait && window.matchMedia('(min-width: 900px)').matches) {
    const hero = document.querySelector('.hero');
    hero?.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      portrait.style.transform = `rotate(-3deg) translate(${x * 12}px, ${y * 12}px)`;
    });
    hero?.addEventListener('mouseleave', () => {
      portrait.style.transform = '';
    });
  }
})();
