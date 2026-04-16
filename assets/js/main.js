/* ============================================
   Qui'étude Travaux — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll shadow ---------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Dropdown navigation ---------- */
  const dropdowns = document.querySelectorAll('.nav__dropdown');
  const isMobile = () => window.innerWidth <= 768;

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav__dropdown-trigger');
    const menu = dropdown.querySelector('.nav__dropdown-menu');

    // Click to toggle (mobile + desktop fallback)
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = dropdown.classList.contains('open');
        // Close all other dropdowns
        dropdowns.forEach(d => d.classList.remove('open'));
        if (!wasOpen) dropdown.classList.add('open');
      });
    }

    // Desktop: hover open/close
    dropdown.addEventListener('mouseenter', () => {
      if (!isMobile()) dropdown.classList.add('open');
    });
    dropdown.addEventListener('mouseleave', () => {
      if (!isMobile()) dropdown.classList.remove('open');
    });

    // Prevent outer click from closing when interacting with menu
    dropdown.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('open'));
  });

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* ---------- Active nav link ---------- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (currentPath.endsWith(href) || (href === 'index.html' && (currentPath === '' || currentPath === '/' || currentPath.endsWith('/')))) {
      link.classList.add('active');
    }
  });

  /* ---------- Photo sliders ---------- */
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const track = slider.querySelector('.photo-slider__track');
    const slides = slider.querySelectorAll('.photo-slider__slide');
    const dotsContainer = slider.querySelector('.photo-slider__dots');
    const prevBtn = slider.querySelector('.photo-slider__btn--prev');
    const nextBtn = slider.querySelector('.photo-slider__btn--next');
    let current = 0;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'photo-slider__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Photo ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsContainer.querySelectorAll('.photo-slider__dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));
  });

  /* ---------- Contact form (basic) ---------- */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message envoyé !';
      btn.style.background = 'var(--green-dark)';
      setTimeout(() => {
        btn.textContent = 'Envoyer votre message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

});
