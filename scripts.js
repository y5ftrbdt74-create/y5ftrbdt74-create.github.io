/* ============================================================
   BACK STREET 2000 FESTIVAL — scripts.js
   Concert Music Festival · Barcelona
   ============================================================ */

/* ============ STARS ============ */
function generateStars() {
  const el = document.getElementById('stars');
  if (!el) return;
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() > 0.9 ? 3 : Math.random() > 0.7 ? 2 : 1;
    s.style.cssText = `left:${(Math.random()*100).toFixed(1)}%;top:${(Math.random()*100).toFixed(1)}%;--d:${(2+Math.random()*4).toFixed(1)}s;--delay:${(Math.random()*4).toFixed(1)}s;opacity:${(0.1+Math.random()*0.9).toFixed(2)};width:${size}px;height:${size}px`;
    el.appendChild(s);
  }
}

/* ============ PAGE NAVIGATION ============ */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    animatePageCards(target);
  }
  document.querySelectorAll('.nav-links > li > a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + pageId);
  if (navEl) navEl.classList.add('active');
  closeMobileMenu();
  history.pushState({ page: pageId }, '', '#' + pageId);
}

function showPost(postId) { showPage(postId); }

/* ============ MOBILE MENU ============ */
function toggleMobileMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.nav-toggle');
  if (!nav) return;
  const open = nav.classList.contains('mobile-open');
  open ? closeMobileMenu() : (nav.classList.add('mobile-open'), btn && btn.classList.add('active'));
}
function closeMobileMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.nav-toggle');
  nav && nav.classList.remove('mobile-open');
  btn && btn.classList.remove('active');
}

/* ============ FAQ ============ */
function toggleFaq(el) {
  const item = el.parentElement;
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!open) item.classList.add('open');
}

/* ============ CONTACT FORM ============ */
function initContactForm() {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const orig = btn.textContent;
    btn.textContent = 'ENVIANDO...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ MENSAJE ENVIADO';
      btn.style.borderColor = '#00ffff';
      btn.style.color = '#00ffff';
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.borderColor = '';
        btn.style.color = '';
        document.querySelectorAll('.form-input, .form-textarea').forEach(i => i.value = '');
      }, 3000);
    }, 1200);
  });
}

/* ============ SCROLL NAV ============ */
function initScrollNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20 ? 'rgba(2,2,10,0.99)' : 'rgba(2,2,10,0.95)';
  }, { passive: true });
}

/* ============ CARD ANIMATIONS ============ */
// Solo anima cards de la página activa para no bloquear las ocultas
function animatePageCards(pageEl) {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  pageEl.querySelectorAll('.card, .blog-card, .locker-card, .transport-card, .stat-block').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s, border-color 0.3s`;
    obs.observe(el);
  });
}

/* ============ HASH ROUTING ============ */
function handleHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const t = document.getElementById('page-' + hash);
    if (t) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      t.classList.add('active');
      history.replaceState({ page: hash }, '', '#' + hash);
    }
  }
}

/* ============ LAZY IMAGE FADE-IN ============ */
// Sin IntersectionObserver para imágenes — fade simple al cargar
function initLazyImages() {
  document.querySelectorAll('img').forEach(img => {
    img.style.transition = 'opacity 0.4s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.addEventListener('load', () => { img.style.opacity = '1'; });
      img.addEventListener('error', () => { img.style.opacity = '1'; });
    }
  });
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  initContactForm();
  initScrollNav();
  initLazyImages();
  handleHash();

  // Anima las cards de la página activa al cargar
  const activePage = document.querySelector('.page.active');
  if (activePage) animatePageCards(activePage);

  window.addEventListener('popstate', e => {
    if (e.state && e.state.page) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const t = document.getElementById('page-' + e.state.page);
      if (t) {
        t.classList.add('active');
        window.scrollTo(0, 0);
        animatePageCards(t);
      }
    }
  });

  document.addEventListener('click', e => {
    const nav = document.getElementById('navLinks');
    const btn = document.querySelector('.nav-toggle');
    if (nav && nav.classList.contains('mobile-open') && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  const cur = document.querySelector('.page.active');
  if (cur) history.replaceState({ page: cur.id.replace('page-', '') }, '', '#' + cur.id.replace('page-', ''));

  console.log('%c BS2000 ◆ FESTIVAL LOADED ', 'background:#00ffff;color:#000;font-weight:bold;padding:4px 10px;');
});
