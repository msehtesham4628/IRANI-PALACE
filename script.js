const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const revealEls = document.querySelectorAll('.reveal');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxTitle = lightbox?.querySelector('p');
const lightboxClose = document.querySelector('.lightbox-close');
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

document.body.classList.add('js-enabled');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealEls.forEach((element) => observer.observe(element));
} else {
  revealEls.forEach((element) => element.classList.add('visible'));
}

function openLightbox(item) {
  if (!lightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  const image = item.querySelector('img');

  if (!image) {
    return;
  }

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || item.dataset.title || 'Gallery preview';
  lightboxTitle.textContent = item.dataset.title || '';
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('active')) {
    closeLightbox();
  }
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!formStatus) {
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || 'Partner').trim() || 'Partner';
  formStatus.textContent = `Thank you, ${name}. Our franchise team will contact you shortly.`;
  contactForm.reset();
});
