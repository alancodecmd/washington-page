var swiper = new Swiper(".slide-content", {
      autoplay: {
        delay: 5000,
      },
      slidesPerView: 1,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loop: true,
      centerSlide: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      },
    });

// Carousel auto-scroll for testimonials cards
const carousel = document.querySelector('.carousel');
const cards = [...carousel.querySelectorAll('.card-box')].slice(0, 5); // only the originals
const phone = window.matchMedia('(max-width: 425px)');
let lastTouch = 0;
let index = 0;

carousel.addEventListener('touchstart', () => lastTouch = Date.now(), { passive: true });

// Keep the index in sync if the user swipes manually
carousel.addEventListener('scrollend', () => {
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    index = cards.reduce((best, card, i) =>
        Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) <
        Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - center) ? i : best, 0);
});

setInterval(() => {
    if (!phone.matches || Date.now() - lastTouch < 6000) return;

    index = (index + 1) % cards.length; // after the last card, back to 0
    const card = cards[index];

    carousel.scrollTo({
        left: card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2,
        behavior: 'smooth'
    });
}, 4000);
// Carousel auto-scroll for testimonials cards