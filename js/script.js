 const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navbar');

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // 

const storyCards = document.querySelectorAll('.story-card');
const storyModal = document.getElementById('storyModal');
const storyImage = document.getElementById('storyImage');
const storyProgress = document.getElementById('storyProgress');
const closeStoryBtn = document.getElementById('closeStoryBtn');
const storyModalContent = document.querySelector('.story-modal-content');

let stories = [
  './images/st-1.png',
  './images/st-2.png',
  './images/st-3.png',
  './images/st-4.png',
];

let currentStoryIndex = 0;
let progressInterval;
let isHolding = false;

function showStory(index) {
  currentStoryIndex = index;
  storyModal.style.display = 'flex';
  storyImage.src = stories[index];
  startProgressBar();
}

function startProgressBar() {
  let width = 0;
  clearInterval(progressInterval);
  storyProgress.style.width = '0%';
  progressInterval = setInterval(() => {
    if (!isHolding) {
      width += 1;
      storyProgress.style.width = width + '%';
      if (width >= 100) {
        nextStory();
      }
    }
  }, 50); // 5 seconds
}

function nextStory() {
  if (currentStoryIndex + 1 < stories.length) {
    showStory(currentStoryIndex + 1);
  } else {
    closeStory();
  }
}

function closeStory() {
  storyModal.style.display = 'none';
  clearInterval(progressInterval);
  storyProgress.style.width = '0%';
}

// Card click to open story
storyCards.forEach((card, index) => {
  card.addEventListener('click', () => showStory(index));
});

// Cross button close
closeStoryBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent from bubbling to outer click
  closeStory();
});

// Press and hold logic
storyModal.addEventListener('mousedown', () => {
  isHolding = true;
});
storyModal.addEventListener('mouseup', () => {
  isHolding = false;
});

// Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeStory();
});

// Click anywhere inside modal content to go to next story
storyModalContent.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent bubbling up to modal
  nextStory();
});

// Click outside modal content to close
storyModal.addEventListener('click', (e) => {
  if (!storyModalContent.contains(e.target)) {
    closeStory();
  }
});
