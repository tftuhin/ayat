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

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;

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

  /* ── Reveal-on-scroll for cards ── */
  const revealTargets = document.querySelectorAll('.about-card, .cert-card, .polaroid');

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
