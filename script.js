// Theme Management
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('mcm-theme') || 'light';

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

const toggleTheme = () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('mcm-theme', theme);
};

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    contactFormMessage.textContent = 'Sending message...';
    contactFormMessage.style.color = 'var(--accent-primary)';

    setTimeout(() => {
      contactFormMessage.textContent = 'Thank you! Your message has been sent successfully.';
      contactForm.reset();
    }, 1500);
  });
}

// Image Modal Logic
const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

// Select all vehicle images
const vehicleImages = document.querySelectorAll('.ebike-photo, .product-photo, .model-illustration img, .floating-3d-img');

vehicleImages.forEach(img => {
  img.classList.add('clickable-img');
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    imgModal.classList.add('active');
  });
});

const closeModal = () => imgModal.classList.remove('active');
modalClose.addEventListener('click', closeModal);
imgModal.addEventListener('click', (e) => { if (e.target === imgModal) closeModal(); });

const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');
const formMessage = document.getElementById('formMessage');
const ratingValue = document.getElementById('ratingValue');
const starButtons = [...document.querySelectorAll('.star-btn')];
const storageKey = 'mcm_reviews_v1';
const defaultReviews = [{ name: 'Arvin', rating: 5, comment: 'Great customer service and the EV feels reliable for daily routes.' }, { name: 'Mia', rating: 5, comment: 'The vehicle looks premium and the battery performance is impressive.' }, { name: 'Ric', rating: 4, comment: 'Solid purchase experience and very helpful staff. Highly recommended.' }];
function getStoredReviews() { try { const saved = JSON.parse(localStorage.getItem(storageKey)); return Array.isArray(saved) && saved.length ? saved : defaultReviews; } catch { return defaultReviews; }}
function saveReviews(reviews) { localStorage.setItem(storageKey, JSON.stringify(reviews)); }
function renderStars(value) { return '★'.repeat(value) + '☆'.repeat(5 - value); }
function renderReviews(){ const reviews = getStoredReviews(); reviewList.innerHTML=''; reviews.slice(0,6).forEach((entry) => { const item = document.createElement('article'); item.className='review-item'; item.innerHTML=`<div class="top"><h4>${entry.name}</h4><div class="review-meta" aria-label="${entry.rating} out of 5 stars">${renderStars(entry.rating)}</div></div><p>${entry.comment}</p>`; reviewList.appendChild(item); }); const total = reviews.reduce((sum, item) => sum + Number(item.rating), 0); const average = reviews.length ? (total / reviews.length).toFixed(1) : '0.0'; document.getElementById('averageValue').innerHTML = `${average} <small>out of 5</small>`; }
starButtons.forEach((button) => { button.addEventListener('click', () => { const value = Number(button.dataset.value); ratingValue.value = String(value); starButtons.forEach((star) => star.classList.toggle('active', Number(star.dataset.value) <= value)); }); });
reviewForm.addEventListener('submit', (event) => { event.preventDefault(); const name = document.getElementById('reviewName').value.trim(); const comment = document.getElementById('reviewComment').value.trim(); const score = Number(ratingValue.value); if (!name || !comment || !score) { formMessage.textContent = 'Please add your name, comment and rating.'; return; } const reviews = getStoredReviews(); reviews.unshift({ name, rating: score, comment }); saveReviews(reviews); renderReviews(); reviewForm.reset(); ratingValue.value = '0'; starButtons.forEach((star) => star.classList.remove('active')); formMessage.textContent = 'Thanks for the review.'; });
const vehicleWrap = document.getElementById('vehicleWrap');
const heroBike = document.querySelector('.ebike-stage');
const isMouseDrivenDevice = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 760;

if (heroBike && isMouseDrivenDevice) {
  const resetHeroBike = () => {
    heroBike.style.transform = 'rotateX(10deg) rotateY(-18deg) rotateZ(-2deg)';
  };
  heroBike.addEventListener('pointermove', (event) => {
    const rect = heroBike.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroBike.style.transform = `rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(x * 24).toFixed(2)}deg) rotateZ(-2deg) translateY(-8px)`;
  });
  heroBike.addEventListener('pointerleave', resetHeroBike);
} else if (heroBike) {
  heroBike.style.transform = 'none';
}
renderReviews();
