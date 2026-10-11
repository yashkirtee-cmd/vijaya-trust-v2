// Sticky nav
const nav = document.getElementById('nav');
if (nav && !nav.classList.contains('scrolled')) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Form submissions → emailed via Web3Forms (https://web3forms.com)
// Get a free access key at web3forms.com using the inbox that should receive messages.
const WEB3FORMS_KEY = 'e453d181-e0a3-4e42-b048-37f6fb979e2f';

function wireForm(formId, subject, successId, errorId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const success = document.getElementById(successId);
  const error = document.getElementById(errorId);
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    success.style.display = 'none';
    error.style.display = 'none';
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: 'Vijaya Trust Website',
          ...Object.fromEntries(new FormData(form))
        })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      success.style.display = 'block';
      form.reset();
    } catch (err) {
      console.error('Form submission failed:', err);
      error.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}

wireForm('volunteerForm', 'New volunteer sign-up — Vijaya Trust', 'formSuccess', 'formError');
wireForm('contactForm', 'New contact message — Vijaya Trust', 'contactSuccess', 'contactError');

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.program-card, .snap-card, .impact__card, .value-card, .project-card, .highlight-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
