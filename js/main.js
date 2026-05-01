/* ============================
   KAIF MUSIC — Main JS
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Nav on Scroll ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Mobile Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── Active Nav Link on Scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.dataset.section === entry.target.id ? '#fff' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => activeObserver.observe(sec));

  /* ── Subtle Cursor Glow ── */
  const glow = document.querySelector('.cursor-glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

  /* ── Smooth Scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Year in footer ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── YouTube video thumbnail loader ── */
  // Using YouTube thumbnail URLs for video previews
  const videoCards = document.querySelectorAll('[data-yt-id]');
  videoCards.forEach(card => {
    const id = card.dataset.ytId;
    const img = card.querySelector('img');
    if (img) {
      img.src = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      img.onerror = () => {
        img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      };
    }
    card.addEventListener('click', () => {
      window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
    });
  });

});
