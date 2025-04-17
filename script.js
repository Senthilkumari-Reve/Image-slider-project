const slides = document.querySelectorAll('.slide');
const captions = [
  "Image 1 Description",
  "Image 2 Description",
  "Image 3 Description",
  "Image 4 Description"
];
const captionEl = document.getElementById('caption');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsEl = document.getElementById('dots');
const thumbnails = document.querySelectorAll('.thumbnails img');
const fullscreenBtn = document.getElementById('fullscreen');
const autoplayBtn = document.getElementById('toggle-autoplay');

let currentIndex = 0;
let autoSlide = true;
let interval = setInterval(nextSlide, 5000);

// Create Dots
captions.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.dataset.index = i;
  dot.addEventListener('click', () => showSlide(i));
  dotsEl.appendChild(dot);
});

function updateDots() {
  dotsEl.querySelectorAll('span').forEach(dot => dot.classList.remove('active'));
  dotsEl.querySelectorAll('span')[currentIndex].classList.add('active');
}

function updateThumbnails() {
  thumbnails.forEach(img => img.classList.remove('active-thumb'));
  thumbnails[currentIndex].classList.add('active-thumb');
}

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  captionEl.textContent = captions[index];
  currentIndex = index;
  updateDots();
  updateThumbnails();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

thumbnails.forEach(img => {
  img.addEventListener('click', () => {
    const index = parseInt(img.dataset.index);
    showSlide(index);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

fullscreenBtn.addEventListener('click', () => {
  document.querySelector('.slider-container').requestFullscreen();
});

autoplayBtn.addEventListener('click', () => {
  autoSlide = !autoSlide;
  autoplayBtn.textContent = autoSlide ? '⏸ Pause' : '▶️ Play';
  if (autoSlide) {
    interval = setInterval(nextSlide, 5000);
  } else {
    clearInterval(interval);
  }
});

showSlide(currentIndex);
