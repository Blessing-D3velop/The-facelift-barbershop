// Replace with your actual image paths
import { galleryImages } from './data/gallery-data.js';

const BATCH_SIZE = 8;
let visibleCount = BATCH_SIZE;
let currentIndex = 0;

const grid = document.querySelector('.js-gallery-grid');
const viewMoreBtn = document.querySelector('.js-view-more');
const viewLessBtn = document.querySelector('.js-view-less');

const modal = document.querySelector('.js-gallery-modal');
const modalImage = document.querySelector('.js-modal-image');
const modalCounter = document.querySelector('.js-modal-counter');
const modalClose = document.querySelector('.js-modal-close');
const modalPrev = document.querySelector('.js-modal-prev');
const modalNext = document.querySelector('.js-modal-next');
const modalBackdrop = document.querySelector('.js-modal-backdrop');

function renderGrid() {
  grid.innerHTML = '';

  galleryImages.slice(0, visibleCount).forEach((src, index) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    item.style.animationDelay = `${(index % BATCH_SIZE) * 0.06}s`;

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Facelift Barbershop work ${index + 1}`;
    img.loading = 'lazy';

    item.appendChild(img);
    item.addEventListener('click', () => openModal(index));

    grid.appendChild(item);
  });

  viewMoreBtn.hidden = visibleCount >= galleryImages.length;
  viewLessBtn.hidden = visibleCount <= BATCH_SIZE;
}

viewMoreBtn.addEventListener('click', () => {
  visibleCount = Math.min(visibleCount + BATCH_SIZE, galleryImages.length);
  renderGrid();
});

viewLessBtn.addEventListener('click', () => {
  visibleCount = BATCH_SIZE;
  renderGrid();
  document.querySelector('.js-gallery-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function openModal(index) {
  currentIndex = index;
  updateModalImage();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function updateModalImage() {
  modalImage.src = galleryImages[currentIndex];
  modalImage.alt = `Facelift Barbershop work ${currentIndex + 1}`;
  modalCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;

  // restart the pop-in animation
  modalImage.style.animation = 'none';
  requestAnimationFrame(() => {
    modalImage.style.animation = '';
  });
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateModalImage();
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateModalImage();
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
modalPrev.addEventListener('click', showPrev);
modalNext.addEventListener('click', showNext);

document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

renderGrid();