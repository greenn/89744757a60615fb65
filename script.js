const tabs = Array.from(document.querySelectorAll('.tab'));
const featuredImage = document.getElementById('featuredImage');
const imageFrame = document.querySelector('.image-frame');
const levitateToggle = document.getElementById('levitateToggle');
const floatingCard = document.querySelector('.floating-card');
const labelText = document.querySelector('.label-text');

const images = {
  city: {
    alt: 'Ночной город с подсвеченными улицами',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%"><stop stop-color="%2312335e" offset="0"/><stop stop-color="%23050f22" offset="1"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop stop-color="%2358c2ff" offset="0"/><stop stop-color="%231a3358" offset="1"/></linearGradient></defs><rect width="800" height="600" fill="url(%23a)"/><rect x="40" y="260" width="120" height="240" fill="url(%23b)" rx="8"/><rect x="210" y="210" width="140" height="290" fill="url(%23b)" rx="8"/><rect x="380" y="180" width="160" height="320" fill="url(%23b)" rx="10"/><rect x="570" y="230" width="130" height="270" fill="url(%23b)" rx="8"/><g fill="%23ffe66d"><rect x="70" y="280" width="15" height="15"/><rect x="100" y="310" width="15" height="15"/><rect x="250" y="240" width="18" height="18"/><rect x="430" y="220" width="18" height="18"/><rect x="610" y="260" width="16" height="16"/><rect x="640" y="290" width="16" height="16"/><rect x="460" y="260" width="18" height="18"/><rect x="220" y="320" width="18" height="18"/></g><path d="M0 420 C200 360 300 430 520 380 C680 340 800 400 800 400 L800 600 L0 600 Z" fill="rgba(90,140,255,0.35)"/></svg>'
  },
  lake: {
    alt: 'Горное озеро с отражением неба',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop stop-color="%230f2027" offset="0"/><stop stop-color="%23103f52" offset="1"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="1" y2="0"><stop stop-color="%232da0d1" offset="0"/><stop stop-color="%23165c9c" offset="1"/></linearGradient></defs><rect width="800" height="600" fill="url(%23c)"/><path d="M0 340 Q200 260 400 320 T800 300 L800 600 L0 600 Z" fill="url(%23d)"/><path d="M0 340 Q200 420 400 370 T800 380 L800 600 L0 600 Z" fill="rgba(255,255,255,0.16)"/><g fill="rgba(255,255,255,0.65)"><circle cx="500" cy="120" r="45"/><circle cx="535" cy="130" r="18"/></g><path d="M100 370 C170 280 250 260 320 330 C420 430 540 410 660 300 C720 240 780 260 800 270 L800 600 L0 600 Z" fill="rgba(18,52,85,0.45)"/></svg>'
  },
  desert: {
    alt: 'Тёплая пустыня с барханами и закатом',
    src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="e" x1="0" y1="0" x2="0" y2="1"><stop stop-color="%23ffb347" offset="0"/><stop stop-color="%23ffcc33" offset="0.6"/><stop stop-color="%23f06b25" offset="1"/></linearGradient><linearGradient id="f" x1="0" y1="0" x2="1" y2="0"><stop stop-color="%23f8a33b" offset="0"/><stop stop-color="%23d46b1c" offset="1"/></linearGradient></defs><rect width="800" height="600" fill="url(%23e)"/><circle cx="640" cy="140" r="70" fill="rgba(255,255,255,0.65)"/><path d="M0 360 Q120 330 250 360 T520 330 Q650 310 800 340 L800 600 L0 600 Z" fill="url(%23f)"/><path d="M0 420 Q120 380 260 430 T560 400 Q690 390 800 420 L800 600 L0 600 Z" fill="rgba(240,171,85,0.6)"/><path d="M0 470 Q140 440 300 470 T620 460 Q730 455 800 475 L800 600 L0 600 Z" fill="rgba(170,83,12,0.45)"/></svg>'
  }
};

function updateImage(key, tab) {
  const payload = images[key];
  if (!payload) return;

  featuredImage.src = payload.src;
  featuredImage.alt = payload.alt;
  imageFrame.setAttribute('aria-labelledby', tab.id);

  tabs.forEach((btn) => {
    const isActive = btn === tab;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
    btn.tabIndex = isActive ? 0 : -1;
  });
}

function updateLevitation() {
  const isOn = levitateToggle.checked;
  floatingCard.classList.toggle('levitating', isOn);
  labelText.textContent = isOn ? 'Левитация включена' : 'Левитация выключена';
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => updateImage(tab.dataset.image, tab));
  tab.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      updateImage(tab.dataset.image, tab);
    }
  });
});

levitateToggle.addEventListener('change', updateLevitation);

// Initial state
updateImage('city', tabs[0]);
updateLevitation();
