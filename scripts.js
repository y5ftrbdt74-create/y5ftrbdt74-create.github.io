/* ============================================================
   BACK STREET 2000 FESTIVAL — scripts.js
   ============================================================ */

/* ============ STARS (solo home) ============ */
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

/* ============ MOBILE MENU ============ */
function toggleMobileMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.nav-toggle');
  if (!nav) return;
  const open = nav.classList.contains('mobile-open');
  if (open) {
    nav.classList.remove('mobile-open');
    btn && btn.classList.remove('active');
  } else {
    nav.classList.add('mobile-open');
    btn && btn.classList.add('active');
  }
}

/* ============ FAQ ============ */
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ============ CONTACT FORM ============ */
function initContactForm() {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;
  btn.addEventListener('click', function(e) {
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

/* ============ CARD ENTRANCE ANIMATIONS ============ */
function initCardAnimations() {
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
  document.querySelectorAll('.card, .blog-card, .locker-card, .transport-card, .stat-block').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s, border-color 0.3s`;
    obs.observe(el);
  });
}

/* ============ CLOSE MENU ON OUTSIDE CLICK ============ */
function initOutsideClick() {
  document.addEventListener('click', e => {
    const nav = document.getElementById('navLinks');
    const btn = document.querySelector('.nav-toggle');
    if (nav && nav.classList.contains('mobile-open') && btn &&
        !nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('mobile-open');
      btn.classList.remove('active');
    }
  });
}

/* ============ BLOG POST NAVIGATION (solo blog.html) ============ */
function showPost(postId) {
  document.querySelectorAll('.blog-post-full').forEach(p => p.style.display = 'none');
  document.getElementById('blog-list') && (document.getElementById('blog-list').style.display = 'none');
  const post = document.getElementById(postId);
  if (post) post.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToBlog() {
  document.querySelectorAll('.blog-post-full').forEach(p => p.style.display = 'none');
  const list = document.getElementById('blog-list');
  if (list) list.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  initScrollNav();
  initCardAnimations();
  initContactForm();
  initOutsideClick();
  console.log('%c BS2000 ◆ FESTIVAL LOADED ', 'background:#00ffff;color:#000;font-weight:bold;padding:4px 10px;');
});
