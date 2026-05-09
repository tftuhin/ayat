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

  /* ── Background clipart: random rotation & hover ── */
  document.querySelectorAll('.clipart').forEach(clipart => {
    const randomRotation = (Math.random() - 0.5) * 40 - 15;
    clipart.style.setProperty('--base-rotate', `${randomRotation}deg`);
    clipart.style.transform = `rotate(${randomRotation}deg)`;
  });

  /* ── Gallery: 3D Coverflow ── */
  const chips = document.querySelectorAll('.chip');
  const slides = document.querySelectorAll('.slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const sliderCurrent = document.querySelector('.slider-current');
  const sliderTotal = document.querySelector('.slider-total');

  const CF_POSITIONS = ['pos-far-prev', 'pos-prev', 'pos-center', 'pos-next', 'pos-far-next'];

  /* Random tilt per slide (±1.5–3.5°) — set once, reused on every activation */
  const tiltMap = new Map();
  slides.forEach((_, idx) => {
    const sign = Math.random() > 0.5 ? 1 : -1;
    tiltMap.set(idx, sign * (1.5 + Math.random() * 2));
  });

  const getVisibleSlides = () => Array.from(slides).filter(s => s.style.display !== 'none');

  const updateSlider = (index = 0) => {
    const visibleSlides = getVisibleSlides();
    if (!visibleSlides.length) return;

    let activeSlide = (slides[index] && slides[index].style.display !== 'none')
      ? slides[index] : visibleSlides[0];

    const realIdx  = Array.from(slides).indexOf(activeSlide);
    const visIdx   = visibleSlides.indexOf(activeSlide);
    const n        = visibleSlides.length;

    /* Pause any playing video before moving away */
    slides.forEach(s => {
      const v = s.querySelector('video');
      if (v && !v.paused) {
        v.pause();
        const iconPlay  = s.querySelector('.vid-icon-play');
        const iconPause = s.querySelector('.vid-icon-pause');
        if (iconPlay)  iconPlay.style.display  = '';
        if (iconPause) iconPause.style.display = 'none';
      }
    });

    /* Clear all position classes */
    slides.forEach(s => s.classList.remove(...CF_POSITIONS, 'is-active'));

    /* Assign the 5 positions around the active slide */
    CF_POSITIONS.forEach((pos, i) => {
      const offset = i - 2; // -2 -1 0 +1 +2
      const vTarget = (visIdx + offset + n) % n;
      visibleSlides[vTarget].classList.add(pos);
    });
    activeSlide.classList.add('is-active');

    /* Apply tilt to center card */
    activeSlide.style.setProperty('--tilt', `${tiltMap.get(realIdx) || 0}deg`);

    /* Dots */
    sliderDots.forEach((dot, idx) => {
      const isVisible = slides[idx] && slides[idx].style.display !== 'none';
      dot.style.display = isVisible ? '' : 'none';
      dot.classList.toggle('is-active', idx === realIdx);
    });

    if (sliderCurrent) sliderCurrent.textContent = String(visIdx + 1);
    if (sliderTotal)   sliderTotal.textContent   = String(n);
  };

  const stepSlide = (direction) => {
    const visibleSlides = getVisibleSlides();
    if (!visibleSlides.length) return;
    const current  = document.querySelector('.slide.pos-center') || visibleSlides[0];
    const visIdx   = visibleSlides.indexOf(current);
    const nextVIdx = (visIdx + direction + visibleSlides.length) % visibleSlides.length;
    updateSlider(Array.from(slides).indexOf(visibleSlides[nextVIdx]));
  };

  const applySlideFilter = (filter) => {
    slides.forEach(slide => {
      const cats = (slide.dataset.categories || '').toLowerCase();
      slide.style.display = (filter === 'all' || cats.includes(filter)) ? '' : 'none';
    });
    updateSlider();
  };

  /* Click on side cards to navigate, center card to open modal */
  slides.forEach(slide => {
    slide.addEventListener('click', (e) => {
      if (slide.classList.contains('pos-center')) {
        e.stopPropagation();
        const data = {
          title: slide.dataset.title,
          event: slide.dataset.event,
          summary: slide.dataset.summary,
          image: slide.querySelector('.slide-img')?.src,
          video: slide.querySelector('.slide-video')?.src
        };
        openModal(data);
      } else if (slide.classList.contains('pos-prev') || slide.classList.contains('pos-far-prev')) {
        const steps = slide.classList.contains('pos-far-prev') ? -2 : -1;
        stepSlide(steps);
      } else if (slide.classList.contains('pos-next') || slide.classList.contains('pos-far-next')) {
        const steps = slide.classList.contains('pos-far-next') ? 2 : 1;
        stepSlide(steps);
      }
    });
  });

  const sliderPrevBtn = document.querySelector('.slider-btn.slider-prev');
  const sliderNextBtn = document.querySelector('.slider-btn.slider-next');
  if (sliderPrevBtn) sliderPrevBtn.addEventListener('click', () => stepSlide(-1));
  if (sliderNextBtn) sliderNextBtn.addEventListener('click', () => stepSlide(1));

  sliderDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (slides[idx] && slides[idx].style.display !== 'none') updateSlider(idx);
    });
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;

      applySlideFilter(filter);
    });
  });

  if (slides.length) {
    updateSlider(0);
  }

  /* ── Reveal-on-scroll for cards ── */
  const revealTargets = document.querySelectorAll('.about-card, .cert-card');

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

  /* ── Video controls (play / pause / fullscreen) ── */
  document.querySelectorAll('.slide-vid-controls').forEach(controls => {
    const video = controls.closest('.slide-media')?.querySelector('video');
    if (!video) return;
    const playBtn  = controls.querySelector('.vid-play-btn');
    const fsBtn    = controls.querySelector('.vid-fullscreen-btn');
    const iconPlay  = playBtn?.querySelector('.vid-icon-play');
    const iconPause = playBtn?.querySelector('.vid-icon-pause');

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.paused ? video.play() : video.pause();
      });
      video.addEventListener('play',  () => { iconPlay.style.display = 'none'; iconPause.style.display = ''; });
      video.addEventListener('pause', () => { iconPlay.style.display = '';     iconPause.style.display = 'none'; });
      video.addEventListener('ended', () => { iconPlay.style.display = '';     iconPause.style.display = 'none'; });
    }

    if (fsBtn) {
      fsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = video;
        (target.requestFullscreen || target.webkitRequestFullscreen || target.mozRequestFullScreen)?.call(target);
      });
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

  /* ── Gallery & Award Modal / Popup ── */
  const modal = document.getElementById('media-modal');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalClose = document.querySelector('.modal-close');
  const modalArrowPrev = document.querySelector('.modal-arrow-prev');
  const modalArrowNext = document.querySelector('.modal-arrow-next');
  const modalImage = document.getElementById('modal-image');
  const modalVideo = document.getElementById('modal-video');
  const modalInfo = document.getElementById('modal-info');
  const modalTitle = document.getElementById('modal-title');
  const modalEvent = document.getElementById('modal-event');
  const modalSummary = document.getElementById('modal-summary');

  let currentItems = [];
  let currentIndex = 0;
  let currentType = null; // 'slide' or 'cert'

  const openModal = (data, items = [], index = 0, type = null) => {
    currentItems = items;
    currentIndex = index;
    currentType = type;

    modalImage.style.display = 'none';
    modalVideo.style.display = 'none';
    if (data.image) {
      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalImage.style.display = 'block';
    } else if (data.video) {
      modalVideo.src = data.video;
      modalVideo.style.display = 'block';
    }
    modalTitle.textContent = data.title;
    modalEvent.textContent = data.event || '';
    modalSummary.textContent = data.summary || '';

    // Show/hide navigation arrows
    if (items.length > 1) {
      modalArrowPrev.style.display = 'flex';
      modalArrowNext.style.display = 'flex';
    } else {
      modalArrowPrev.style.display = 'none';
      modalArrowNext.style.display = 'none';
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (modalVideo) modalVideo.pause();
  };

  const navigateModal = (direction) => {
    if (!currentItems.length) return;
    currentIndex = (currentIndex + direction + currentItems.length) % currentItems.length;
    const item = currentItems[currentIndex];
    openModal(item, currentItems, currentIndex, currentType);
  };

  // Gallery slides
  const allSlides = document.querySelectorAll('.slide');
  const visibleSlides = () => Array.from(allSlides).filter(s => s.style.display !== 'none');

  allSlides.forEach(slide => {
    slide.addEventListener('click', (e) => {
      if (slide.classList.contains('pos-center')) {
        e.stopPropagation();
        const visible = visibleSlides();
        const index = visible.indexOf(slide);
        const data = {
          title: slide.dataset.title,
          event: slide.dataset.event,
          summary: slide.dataset.summary,
          image: slide.querySelector('.slide-img')?.src,
          video: slide.querySelector('.slide-video')?.src
        };
        const items = visible.map(s => ({
          title: s.dataset.title,
          event: s.dataset.event,
          summary: s.dataset.summary,
          image: s.querySelector('.slide-img')?.src,
          video: s.querySelector('.slide-video')?.src
        }));
        openModal(data, items, index, 'slide');
      }
    });
  });

  // Certificate cards
  document.querySelectorAll('.cert-card').forEach((card, cardIndex) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = card.querySelector('h3')?.textContent;
      const meta = card.querySelector('.cert-meta')?.textContent;
      const desc = card.querySelector('.cert-desc')?.textContent;
      const img = card.querySelector('img');
      const data = {
        title: title || 'Award',
        event: meta || '',
        summary: desc || '',
        image: img?.src
      };
      const items = Array.from(document.querySelectorAll('.cert-card')).map(c => ({
        title: c.querySelector('h3')?.textContent || 'Award',
        event: c.querySelector('.cert-meta')?.textContent || '',
        summary: c.querySelector('.cert-desc')?.textContent || '',
        image: c.querySelector('img')?.src
      }));
      openModal(data, items, cardIndex, 'cert');
    });
  });

  // Navigation arrows
  modalArrowPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateModal(-1);
  });

  modalArrowNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateModal(1);
  });

  // Close modal
  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('is-open')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    }
  });

})();

/* ── Scroll Fuse & Rocket Launch ──────────────────────────────────── */
(function fuseAndRockets() {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  let launched = false;
  let ticking  = false;

  function mkPath(svg, d, stroke, width, dasharray) {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', stroke);
    p.setAttribute('stroke-width', width);
    p.setAttribute('stroke-linecap', 'round');
    if (dasharray) p.setAttribute('stroke-dasharray', dasharray);
    svg.appendChild(p);
    return p;
  }

  function buildD(pts) {
    let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1], [cx, cy] = pts[i];
      const my = ((py + cy) / 2).toFixed(1);
      d += ` C ${px.toFixed(1)},${my} ${cx.toFixed(1)},${my} ${cx.toFixed(1)},${cy.toFixed(1)}`;
    }
    return d;
  }

  function fireworks(vx, vy) {
    const COLS = ['#ec4899','#f472b6','#c084fc','#fbbf24','#67e8f9','#a78bfa','#ff80b5','#fde68a'];
    const cvs  = document.createElement('canvas');
    cvs.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(cvs);
    cvs.width = window.innerWidth; cvs.height = window.innerHeight;
    const ctx = cvs.getContext('2d');
    const pts = Array.from({ length: 160 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 160 + (Math.random() - 0.5) * 0.4;
      const s = 2.5 + Math.random() * 10;
      return { x: vx, y: vy, vx: Math.cos(a)*s, vy: Math.sin(a)*s,
               r: 3 + Math.random()*5, opacity: 1,
               color: COLS[Math.floor(Math.random()*COLS.length)] };
    });
    (function draw() {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      let alive = 0;
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.14; p.vx *= 0.97; p.opacity -= 0.012;
        if (p.opacity <= 0) continue;
        alive++;
        ctx.save(); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
      alive > 0 ? requestAnimationFrame(draw) : cvs.remove();
    }());
  }

  function launch(rockets, flames) {
    if (launched) return;
    launched = true;
    flames.forEach(f => { f.style.opacity = '0'; });
    rockets.forEach(({ el, rx }, i) => {
      let n = 0;
      const id = setInterval(() => {
        el.style.transform = `translateX(calc(-50% + ${(Math.random()-.5)*14}px))`;
        if (++n >= 10) {
          clearInterval(id);
          el.style.transition = 'transform 1.5s cubic-bezier(0.2,0.9,0.3,1), opacity 0.5s 1s';
          el.style.transform = `translateX(calc(-50% + ${i===0?-50:50}px)) translateY(-210vh)`;
          el.style.opacity = '0';
          setTimeout(() => fireworks(rx, window.innerHeight * 0.45), 1000 + i * 280);
        }
      }, 75);
    });
  }

  function init() {
    const docW = document.documentElement.scrollWidth;
    const docH = document.documentElement.scrollHeight;

    /* Waypoints: fuse weaves from top → bottom of page (x, y as fraction) */
    const rawLeft  = [[.11,.02],[.37,.13],[.08,.26],[.39,.39],[.09,.52],[.38,.65],[.08,.78],[.13,.96]];
    const rawRight = [[.89,.02],[.63,.13],[.92,.26],[.61,.39],[.91,.52],[.62,.65],[.92,.78],[.87,.96]];
    const toAbs = pts => pts.map(([fx,fy]) => [fx * docW, fy * docH]);

    const wpLeft  = toAbs(rawLeft);
    const wpRight = toAbs(rawRight);

    /* SVG overlay */
    const svg = document.createElementNS(NS, 'svg');
    svg.style.cssText = `position:absolute;top:0;left:0;width:${docW}px;height:${docH}px;pointer-events:none;z-index:2;overflow:visible;`;
    document.body.style.position = 'relative';
    document.body.appendChild(svg);

    const fuseData = [wpLeft, wpRight].map(pts => {
      const d = buildD(pts);
      mkPath(svg, d, 'rgba(146,64,14,0.2)', '3', '10 7'); /* ghost: always visible, dim */
      const rope = mkPath(svg, d, '#92400e', '4', null);
      const glow = mkPath(svg, d, 'rgba(251,146,60,0.55)', '2', null);
      return { rope, glow };
    });

    /* Flame emoji elements (fixed-position, follow burn point) */
    const flames = fuseData.map(() => {
      const el = document.createElement('div');
      el.textContent = '🔥';
      el.style.cssText = 'position:fixed;font-size:28px;line-height:1;pointer-events:none;z-index:9997;transform:translate(-50%,-60%);filter:drop-shadow(0 0 10px orange);transition:opacity .3s;';
      document.body.appendChild(el);
      return el;
    });

    /* Rockets at end of each fuse path */
    const rocketEls = [wpLeft, wpRight].map((pts, i) => {
      const [rx, ry] = pts.at(-1);
      const el = document.createElement('div');
      el.textContent = '🚀';
      el.style.cssText = `position:absolute;left:${rx}px;top:${ry - 30}px;font-size:54px;line-height:1;pointer-events:none;z-index:3;transform:translateX(-50%);filter:drop-shadow(0 6px 18px rgba(0,0,0,.3));`;
      document.body.appendChild(el);
      return { el, rx: rx, ry: window.innerHeight * 0.45 };
    });

    /* Reference path elements for getTotalLength / getPointAtLength */
    const pathEls = fuseData.map(f => f.rope);

    function update() {
      ticking = false;
      if (launched) return;
      const scrollY   = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress  = Math.min(scrollY / maxScroll, 1);

      pathEls.forEach((pathEl, i) => {
        const total  = pathEl.getTotalLength();
        const burned = progress * total;
        const remain = Math.max(0, total - burned);

        /* Show only unburned portion (from burn-point to rocket) */
        const da = `0.001 ${burned.toFixed(1)} ${remain.toFixed(1)} ${(total + 10).toFixed(1)}`;
        fuseData[i].rope.setAttribute('stroke-dasharray', da);
        fuseData[i].glow.setAttribute('stroke-dasharray', da);

        /* Position flame at the burn tip */
        if (progress < 0.99 && burned < total - 15) {
          const pt = pathEl.getPointAtLength(burned);
          flames[i].style.left    = `${pt.x}px`;
          flames[i].style.top     = `${pt.y - scrollY}px`;
          flames[i].style.opacity = '1';
        } else {
          flames[i].style.opacity = '0';
        }
      });

      if (progress >= 0.98) launch(rocketEls, flames);
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    update();
  }

  /* init after full layout so scrollHeight / dimensions are correct */
  window.addEventListener('load', init);
}());
