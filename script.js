document.addEventListener('DOMContentLoaded', () => {

  /* Footer year */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  });
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const setActiveLink = () => {
    let current = sections[0].id;
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActiveLink);

  /* ---------- Scroll-reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Works carousel ---------- */
  const workImages = [
    'work-img-1.png','work-img-2.png','work-img-3.png','work-img-4.png',
    'work-img-5.png','work-img-6.png','work-img-7.png','work-img-8.png',
    'work-img-9.png','work-img-10.png'
  ];
  const track = document.getElementById('worksTrack');
  const currentEl = document.getElementById('worksCurrent');
  const totalEl = document.getElementById('worksTotal');
  const prevBtn = document.getElementById('worksPrev');
  const nextBtn = document.getElementById('worksNext');

  totalEl.textContent = String(workImages.length).padStart(2, '0');

  workImages.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'work-slide';
    slide.innerHTML = `<img src="assets/img/${src}" alt="Haircut and beard styling example ${i + 1}" loading="lazy">`;
    track.appendChild(slide);
  });

  let index = 0;
  const slidesVisible = () => (window.innerWidth <= 560 ? 1 : window.innerWidth <= 980 ? 2 : 3);
  const slideStep = () => {
    const slide = track.querySelector('.work-slide');
    if (!slide) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    return slide.offsetWidth + gap;
  };

  const updateCarousel = () => {
    const maxIndex = workImages.length - slidesVisible();
    index = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(${-index * slideStep()}px)`;
    currentEl.textContent = String(index + 1).padStart(2, '0');
  };

  nextBtn.addEventListener('click', () => { index++; updateCarousel(); });
  prevBtn.addEventListener('click', () => { index--; updateCarousel(); });
  window.addEventListener('resize', updateCarousel);


  setTimeout(updateCarousel, 100);


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
