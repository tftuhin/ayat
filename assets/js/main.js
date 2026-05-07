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
  const previewPrev = document.querySelector('.slider-preview-prev .preview-card');
  const previewNext = document.querySelector('.slider-preview-next .preview-card');

  /* Generate random tilt for slides (±2 to ±5 degrees) */
  const generateTilt = () => {
    const sign = Math.random() > 0.5 ? 1 : -1;
    return sign * (2 + Math.random() * 3);
  };

  const tiltMap = new Map();
  slides.forEach((slide, idx) => {
    tiltMap.set(idx, generateTilt());
  });

  const getVisibleSlides = () => Array.from(slides).filter(slide => slide.style.display !== 'none');

  const renderPreviewCard = (card, slideIndex) => {
    if (!card) return;
    while (card.firstChild) card.removeChild(card.firstChild);

    if (slideIndex < 0 || slideIndex >= slides.length) return;

    const slide = slides[slideIndex];
    if (slide.style.display === 'none') return;

    const mediaDiv = slide.querySelector('.slide-media');
    if (!mediaDiv) return;

    /* Build polaroid frame: media area + caption */
    const mediaWrap = document.createElement('div');
    mediaWrap.className = 'preview-card-media';

    const video = mediaDiv.querySelector('video');
    const img = mediaDiv.querySelector('img');
    const placeholder = mediaDiv.querySelector('.slide-placeholder');

    if (video && video.src) {
      const videoClone = document.createElement('video');
      videoClone.src = video.src;
      videoClone.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      if (video.poster) videoClone.poster = video.poster;
      mediaWrap.appendChild(videoClone);
    } else if (img && img.src) {
      const imgClone = document.createElement('img');
      imgClone.src = img.src;
      imgClone.alt = img.alt;
      imgClone.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      mediaWrap.appendChild(imgClone);
    } else if (placeholder) {
      const div = document.createElement('div');
      div.style.cssText = placeholder.style.cssText + ';width:100%;height:100%;';
      div.innerHTML = placeholder.innerHTML;
      mediaWrap.appendChild(div);
    }

    const captionWrap = document.createElement('div');
    captionWrap.className = 'preview-card-caption';

    const cats = (slide.dataset.categories || '').trim().split(' ').filter(Boolean);
    if (cats.length) {
      const catEl = document.createElement('span');
      catEl.className = 'preview-card-category';
      catEl.textContent = cats[0].toUpperCase();
      captionWrap.appendChild(catEl);
    }

    const titleEl = document.createElement('span');
    titleEl.className = 'preview-card-title';
    titleEl.textContent = slide.dataset.title || '';
    captionWrap.appendChild(titleEl);

    card.appendChild(mediaWrap);
    card.appendChild(captionWrap);
  };

  const updateSlider = (index = 0) => {
    const visibleSlides = getVisibleSlides();
    if (!visibleSlides.length) return;

    let activeSlide = slides[index] && slides[index].style.display !== 'none'
      ? slides[index]
      : visibleSlides[0];

    const activeIndex = Array.from(slides).indexOf(activeSlide);
    const activePosition = visibleSlides.indexOf(activeSlide) + 1;

    slides.forEach((slide, idx) => {
      const isActive = idx === activeIndex;
      slide.classList.toggle('is-active', isActive);
      if (isActive) {
        const tilt = tiltMap.get(idx);
        slide.style.setProperty('--tilt', `${tilt}deg`);
      }
    });

    sliderDots.forEach((dot, idx) => {
      const isVisible = slides[idx].style.display !== 'none';
      dot.style.display = isVisible ? '' : 'none';
      dot.classList.toggle('is-active', idx === activeIndex);
    });

    sliderCurrent.textContent = String(activePosition);
    sliderTotal.textContent = String(visibleSlides.length);

    /* Update preview cards */
    const prevIdx = (activeIndex - 1 + slides.length) % slides.length;
    const nextIdx = (activeIndex + 1) % slides.length;
    renderPreviewCard(previewPrev, prevIdx);
    renderPreviewCard(previewNext, nextIdx);
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

  if (previewPrev) {
    previewPrev.addEventListener('click', () => stepSlide(-1));
  }

  if (previewNext) {
    previewNext.addEventListener('click', () => stepSlide(1));
  }

  const sliderPrevBtn = document.querySelector('.slider-btn.slider-prev');
  const sliderNextBtn = document.querySelector('.slider-btn.slider-next');

  if (sliderPrevBtn) {
    sliderPrevBtn.addEventListener('click', () => stepSlide(-1));
  }

  if (sliderNextBtn) {
    sliderNextBtn.addEventListener('click', () => stepSlide(1));
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
})();
