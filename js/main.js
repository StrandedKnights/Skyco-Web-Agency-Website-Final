// === SKYCO WEB AGENCY — MAIN JS ===
document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL ───
  const navbar = document.querySelector('nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('shadow-2xl', window.scrollY > 20);
    });
  }

  // ─── MOBILE MENU ───
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  // ─── SCROLL REVEAL ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ─── TYPEWRITER ───
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const wordsEN = ['Digital Dominance', 'Next-Gen Systems', 'AI-Driven Growth', 'Enterprise Scale'];
    const wordsNL = ['Digitale Dominantie', 'Next-Gen Systemen', 'AI-Gedreven Groei', 'Enterprise Schaalbaarheid'];
    let i = 0, j = 0, deleting = false;
    function type() {
      const lang = localStorage.getItem('skyco-lang') || 'en';
      const words = lang === 'nl' ? wordsNL : wordsEN;
      const word = words[i % words.length];
      if (deleting) {
        typeEl.textContent = word.substring(0, j--);
        if (j < 0) { deleting = false; i++; j = 0; }
        setTimeout(type, 40);
      } else {
        typeEl.textContent = word.substring(0, j++);
        if (j > word.length) { deleting = true; setTimeout(type, 1800); return; }
        setTimeout(type, 70);
      }
    }
    type();
  }

  // ─── COUNTER ANIMATION ───
  document.querySelectorAll('[data-count]').forEach(el => {
    const cObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur + suffix;
          if (cur >= target) clearInterval(timer);
        }, 30);
        cObs.unobserve(el);
      }
    }, { threshold: 0.5 });
    cObs.observe(el);
  });

  // ─── FORM HANDLER ───
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span>';
      btn.disabled = true;
      await new Promise(r => setTimeout(r, 1500));
      const lang = localStorage.getItem('skyco-lang') || 'en';
      btn.innerHTML = `<span class="material-symbols-outlined text-green-500">check_circle</span> ${lang === 'nl' ? 'Succesvol verzonden!' : 'Successfully sent!'}`;
      btn.classList.add('!bg-green-600/20', '!border-green-500/50');
      form.reset();
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.disabled = false;
        btn.classList.remove('!bg-green-600/20', '!border-green-500/50');
      }, 3000);
    });
  });

  // ─── TIMELINE / SCOPE RADIO STYLING ───
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const name = radio.getAttribute('name');
      document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
        const wrapper = r.closest('label');
        if (wrapper) {
          wrapper.classList.toggle('!border-primary', r.checked);
          wrapper.classList.toggle('!bg-primary/10', r.checked);
        }
      });
    });
    // Init
    if (radio.checked) {
      const wrapper = radio.closest('label');
      if (wrapper) {
        wrapper.classList.add('!border-primary', '!bg-primary/10');
      }
    }
  });

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
