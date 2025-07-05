// === Carousel ===
const carouselCards = document.querySelectorAll('.carousel-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let current = 0;

function updateCarousel() {
  carouselCards.forEach(card => {
    card.classList.remove('active', 'left', 'right');
  });
  const prev = (current - 1 + carouselCards.length) % carouselCards.length;
  const next = (current + 1) % carouselCards.length;

  carouselCards[prev].classList.add('left');
  carouselCards[current].classList.add('active');
  carouselCards[next].classList.add('right');
}

prevBtn.addEventListener('click', () => {
  current = (current - 1 + carouselCards.length) % carouselCards.length;
  updateCarousel();
  resetInterval();
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % carouselCards.length;
  updateCarousel();
  resetInterval();
});

let autoRotate = setInterval(() => {
  current = (current + 1) % carouselCards.length;
  updateCarousel();
}, 5000);

function resetInterval() {
  clearInterval(autoRotate);
  autoRotate = setInterval(() => {
    current = (current + 1) % carouselCards.length;
    updateCarousel();
  }, 5000);
}

updateCarousel();

// === Projects Filter + Search + Load More ===
const filter = document.getElementById('filter');
const search = document.getElementById('search');
const projectCards = document.querySelectorAll('.project-card');
const loadMoreBtn = document.querySelector('.load-more');

const cardsPerRow = 4;
let visibleCount = cardsPerRow;

function updateProjects() {
  const filterVal = filter.value.toLowerCase();
  const searchVal = search.value.toLowerCase();
  let shown = 0;

  const matchingCards = Array.from(projectCards).filter(card => {
    const domains = card.dataset.domains.toLowerCase();
    const text = card.innerText.toLowerCase();
    return (filterVal === 'all' || domains.includes(filterVal)) && text.includes(searchVal);
  });

  projectCards.forEach(card => {
    card.style.display = 'none';
  });

  matchingCards.slice(0, visibleCount).forEach(card => {
    card.style.display = 'block';
    shown++;
  });

  if (shown >= matchingCards.length) {
    loadMoreBtn.textContent = 'Show Less';
  } else {
    loadMoreBtn.textContent = 'Load More';
  }

  loadMoreBtn.style.display = matchingCards.length > cardsPerRow ? 'block' : 'none';
}

filter.addEventListener('change', () => {
  visibleCount = cardsPerRow;
  updateProjects();
});
search.addEventListener('input', () => {
  visibleCount = cardsPerRow;
  updateProjects();
});

loadMoreBtn.addEventListener('click', () => {
  const filterVal = filter.value.toLowerCase();
  const searchVal = search.value.toLowerCase();
  const matchingCards = Array.from(projectCards).filter(card => {
    const domains = card.dataset.domains.toLowerCase();
    const text = card.innerText.toLowerCase();
    return (filterVal === 'all' || domains.includes(filterVal)) && text.includes(searchVal);
  });

  if (visibleCount >= matchingCards.length) {
    visibleCount = cardsPerRow;
  } else {
    visibleCount += cardsPerRow;
  }
  updateProjects();
});

updateProjects();

// === Project Documentary Slider ===
const docuCards = document.querySelectorAll('.docu-card');
const docuPrevBtn = document.querySelector('.docu-carousel-btn.prev');
const docuNextBtn = document.querySelector('.docu-carousel-btn.next');

let docuCurrent = 0;

function updateDocuCarousel() {
  docuCards.forEach(card => {
    card.classList.remove('active', 'left', 'right');
  });

  const docuPrev = (docuCurrent - 1 + docuCards.length) % docuCards.length;
  const docuNext = (docuCurrent + 1) % docuCards.length;

  docuCards[docuPrev].classList.add('left');
  docuCards[docuCurrent].classList.add('active');
  docuCards[docuNext].classList.add('right');
}

docuPrevBtn.addEventListener('click', () => {
  docuCurrent = (docuCurrent - 1 + docuCards.length) % docuCards.length;
  updateDocuCarousel();
  resetDocuInterval();
});

docuNextBtn.addEventListener('click', () => {
  docuCurrent = (docuCurrent + 1) % docuCards.length;
  updateDocuCarousel();
  resetDocuInterval();
});

let docuAutoRotate = setInterval(() => {
  docuCurrent = (docuCurrent + 1) % docuCards.length;
  updateDocuCarousel();
}, 7000);

function resetDocuInterval() {
  clearInterval(docuAutoRotate);
  docuAutoRotate = setInterval(() => {
    docuCurrent = (docuCurrent + 1) % docuCards.length;
    updateDocuCarousel();
  }, 7000);
}

updateDocuCarousel();

const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  const response = await fetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const result = await response.json();

  if (result.success) {
    alert('Message sent!');
    form.reset();
  } else {
    alert('Something went wrong.');
  }
});
