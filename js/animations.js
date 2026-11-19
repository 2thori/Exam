

gsap.registerPlugin(ScrollTrigger);


export function animatePageLoad() {
  const tl = gsap.timeline();
  tl.from('.topbar', { y: -60, opacity: 0, duration: 0.6, ease: 'power2.out' })
    .from('.sidebar', { x: -80, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
}


export function animateHero() {
  gsap.from(['.hero__title', '.hero__desc', '.hero__buttons'], {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
    delay: 0.2,
  });
}


export function animateCards(cards) {
  if (!cards || !cards.length) return;
  gsap.from(cards, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.06,
    ease: 'power2.out',
  });
}


export function animateSectionOnScroll(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    });
  });
}


export function openModal(el) {
  el.classList.add('modal-overlay--open');
  const box = el.querySelector('.modal');
  gsap.fromTo(box, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
}

export function closeModal(el) {
  const box = el.querySelector('.modal');
  gsap.to(box, {
    opacity: 0,
    scale: 0.92,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => el.classList.remove('modal-overlay--open'),
  });
}


export function animateMovieDetails() {
  gsap.from('.movie-details__poster-wrap', { x: -60, opacity: 0, duration: 0.7, ease: 'power2.out' });
  gsap.from('.movie-details__info', { x: 60, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 });
}