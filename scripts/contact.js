const EMAILJS_PUBLIC_KEY = 'x3ZwxjQ3lo-TUALFl';
const EMAILJS_SERVICE_ID = 'service_y1p82qd';
const EMAILJS_TEMPLATE_ID = 'template_r4shdc2';

emailjs.init(EMAILJS_PUBLIC_KEY);

const form = document.querySelector('.js-booking-form');
const submitBtn = document.querySelector('.js-submit-btn');
const statusEl = document.querySelector('.js-form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Booking...';
  statusEl.textContent = '';
  statusEl.className = 'form-status';

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      statusEl.textContent = 'Booking request sent! We\'ll confirm shortly.';
      statusEl.classList.add('success');
      form.reset();
    })
    .catch((error) => {
      statusEl.textContent = 'Something went wrong. Please try again or WhatsApp us.';
      statusEl.classList.add('error');
      console.error('EmailJS error:', error);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Book Now';
    });
});