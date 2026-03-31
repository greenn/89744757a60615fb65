const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const revealElements = Array.from(document.querySelectorAll('.reveal'));
const form = document.querySelector('.contact-form');
const formNote = document.querySelector('.form-note');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealElements.forEach((element) => observer.observe(element));

if (form && formNote) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();

    if (!form.checkValidity()) {
      formNote.textContent = 'Пожалуйста, заполните все поля корректно.';
      return;
    }

    form.reset();
    formNote.textContent = `Спасибо, ${name || 'друг'}! Я свяжусь с вами в ближайшее время.`;
  });
}
