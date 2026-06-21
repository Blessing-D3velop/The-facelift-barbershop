const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = 'auto';
});

document.querySelectorAll('.mobile-menu-content p').forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = 'auto';
    });
});

// ---------- Nav links: smooth scroll to section ----------
const navTargets = {
  home: '#home',
  about: '#about',
  services: '#services',
  gallery: '#gallery',
  contact: '#contact',
};

function wireNavGroup(selector, sectionId) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener('click', () => {
      const target = document.querySelector(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

wireNavGroup('.js-home', navTargets.home);
wireNavGroup('.js-about', navTargets.about);
wireNavGroup('.js-services', navTargets.services);
wireNavGroup('.js-gallery', navTargets.gallery);
wireNavGroup('.js-contact', navTargets.contact);

// ---------- "View Hairstyles" and "Book Now" buttons ----------
document.querySelectorAll('.js-view-hairstyles').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.js-book-now').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---------- Header scroll state (transparent -> dark -> white) ----------
const headerEl = document.querySelector('header');
const homeSection = document.querySelector('#home');

function updateHeaderState() {
  const scrollY = window.scrollY;
  const homeHeight = homeSection ? homeSection.offsetHeight : window.innerHeight;

  if (scrollY <= 0) {
    headerEl.classList.remove('is-scrolled', 'is-white');
  } else if (scrollY > 0 && scrollY < homeHeight) {
    headerEl.classList.add('is-scrolled');
    headerEl.classList.remove('is-white');
  } else {
    headerEl.classList.remove('is-scrolled');
    headerEl.classList.add('is-white');
  }
}

window.addEventListener('scroll', updateHeaderState);
updateHeaderState();