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