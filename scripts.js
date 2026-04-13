/* ============================================================
   BACK STREET 2000 FESTIVAL — scripts.js
   Concert Music Festival · Barcelona
   ============================================================ */

/* ============ STARS GENERATOR ============ */
function generateStars() {
  const starsEl = document.getElementById('stars');
  if (!starsEl) return;

  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size   = Math.random() > 0.9 ? 3 : Math.random() > 0.7 ? 2 : 1;
    const dur    = (2 + Math.random() * 4).toFixed(1) + 's';
    const delay  = (Math.random() * 4).toFixed(1) + 's';
    const opacity = (0.1 + Math.random() * 0.9).toFixed(2);

    star.style.cssText = `
      left:    ${(Math.random() * 100).toFixed(2)}%;
      top:     ${(Math.random() * 100).toFixed(2)}%;
      --d:     ${dur};
      --delay: ${delay};
      opacity: ${opacity};
      width:   ${size}px;
      height:  ${size}px;
    `;
    starsEl.appendChild(star);
  }
}

/* ============ PAGE NAVIGATION ============ */
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update active nav link
  document.querySelectorAll('.nav-links > li > a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active');

  // Close mobile menu if open
  closeMobileMenu();

  // Push to browser history for back button support
  history.pushState({ page: pageId }, '', '#' + pageId);
}

function showPost(postId) {
  showPage(postId);
}

/* ============ MOBILE MENU ============ */
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const toggle   = document.querySelector('.nav-toggle');
  if (!navLinks) return;

  const isOpen = navLinks.classList.contains('mobile-open');

  if (isOpen) {
    closeMobileMenu();
  } else {
    navLinks.classList.add('mobile-open');
    toggle && toggle.classList.add('active');
  }
}

function closeMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const toggle   = document.querySelector('.nav-toggle');
  navLinks && navLinks.classList.remove('mobile-open');
  toggle   && toggle.classList.remove('active');
}

/* ============ FAQ ACCORDION ============ */
function toggleFaq(el) {
  const item   = el.parentElement;
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}

/* ============ CONTACT FORM ============ */
function handleContactForm(e) {
  e.preventDefault();

  const btn = document.querySelector('.btn-submit');
  if (!btn) return;

  const originalText = btn.textContent;
  btn.textContent    = 'ENVIANDO...';
  btn.disabled       = true;

  // Simulate send (replace with real backend)
  setTimeout(() => {
    btn.textContent  = '✓ MENSAJE ENVIADO';
    btn.style.borderColor = '#00ffff';
    btn.style.color       = '#00ffff';

    setTimeout(() => {
      btn.textContent  = originalText;
      btn.disabled     = false;
      btn.style.borderColor = '';
      btn.style.color       = '';

      // Clear form
      document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.value = '';
      });
    }, 3000);
  }, 1200);
}

/* ============ NAV SCROLL EFFECT ============ */
function handleNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  if (window.scrollY > 20) {
    nav.style.background = 'rgba(2, 2, 10, 0.98)';
    nav.style.boxShadow  = '0 4px 30px rgba(0, 255, 255, 0.05)';
  } else {
    nav.style.background = 'rgba(2, 2, 10, 0.95)';
    nav.style.boxShadow  = 'none';
  }
}

/* ============ CARD ENTRANCE ANIMATION ============ */
function initCardAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .blog-card, .locker-card, .transport-card').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, border-color 0.3s`;
    observer.observe(el);
  });
}

/* ============ MOBILE NAV STYLES (injected) ============ */
function injectMobileStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Mobile nav open state */
    .nav-links.mobile-open {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      background: rgba(2, 2, 10, 0.98);
      border-bottom: 1px solid rgba(0, 255, 255, 0.2);
      padding: 16px 0;
      z-index: 999;
      max-height: calc(100vh - 64px);
      overflow-y: auto;
    }

    .nav-links.mobile-open > li > a {
      line-height: 1;
      padding: 14px 24px;
    }

    .nav-links.mobile-open .submenu {
      display: block;
      position: static;
      border: none;
      border-top: 1px solid rgba(0, 255, 255, 0.08);
      background: rgba(0, 255, 255, 0.03);
    }

    .nav-links.mobile-open .submenu li a {
      padding-left: 36px;
    }

    /* Toggle button animation */
    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `;
  document.head.appendChild(style);
}

/* ============ BROWSER BACK BUTTON ============ */
function handlePopState(e) {
  if (e.state && e.state.page) {
    // Show page without pushing to history again
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + e.state.page);
    if (target) target.classList.add('active');
    window.scrollTo(0, 0);
  }
}

/* ============ HASH ROUTING ON LOAD ============ */
function handleHashOnLoad() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const target = document.getElementById('page-' + hash);
    if (target) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      target.classList.add('active');
      history.replaceState({ page: hash }, '', '#' + hash);
    }
  }
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {

  // Stars
  generateStars();

  // Mobile styles
  injectMobileStyles();

  // Card animations
  initCardAnimations();

  // Hash routing
  handleHashOnLoad();

  // Scroll effect on nav
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Browser back/forward
  window.addEventListener('popstate', handlePopState);

  // Contact form
  const form = document.querySelector('.contact-form');
  if (form) {
    const btn = form.querySelector('.btn-submit');
    if (btn) btn.addEventListener('click', handleContactForm);
  }

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.nav-toggle');
    if (nav && nav.classList.contains('mobile-open')) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Set initial history state
  const currentPage = document.querySelector('.page.active');
  if (currentPage) {
    const pageId = currentPage.id.replace('page-', '');
    history.replaceState({ page: pageId }, '', '#' + pageId);
  }

  console.log('%c BS2000 FESTIVAL LOADED ', 'background:#00ffff;color:#000;font-weight:bold;padding:4px 8px;');
});
