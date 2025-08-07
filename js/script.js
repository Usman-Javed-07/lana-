const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".navbar");

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

const storyCards = document.querySelectorAll(".story-card");
const storyModal = document.getElementById("storyModal");
const storyImage = document.getElementById("storyImage");
const storyProgress = document.getElementById("storyProgress");
const closeStoryBtn = document.getElementById("closeStoryBtn");
const storyModalContent = document.querySelector(".story-modal-content");

let stories = [
  "./images/st-1.png",
  "./images/st-2.png",
  "./images/st-3.png",
  "./images/st-4.png",
  "./images/st-2.png",
];

let currentStoryIndex = 0;
let progressInterval;
let isHolding = false;

function showStory(index) {
  currentStoryIndex = index;
  storyModal.style.display = "flex";
  storyImage.src = stories[index];
  startProgressBar();
}

function startProgressBar() {
  let width = 0;
  clearInterval(progressInterval);
  storyProgress.style.width = "0%";
  progressInterval = setInterval(() => {
    if (!isHolding) {
      width += 1;
      storyProgress.style.width = width + "%";
      if (width >= 100) {
        nextStory();
      }
    }
  }, 50);
}

function nextStory() {
  if (currentStoryIndex + 1 < stories.length) {
    showStory(currentStoryIndex + 1);
  } else {
    closeStory();
  }
}

function closeStory() {
  storyModal.style.display = "none";
  clearInterval(progressInterval);
  storyProgress.style.width = "0%";
}

storyCards.forEach((card, index) => {
  card.addEventListener("click", () => showStory(index));
});

closeStoryBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeStory();
});

storyModal.addEventListener("mousedown", () => {
  isHolding = true;
});
storyModal.addEventListener("mouseup", () => {
  isHolding = false;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeStory();
});

storyModalContent.addEventListener("click", (e) => {
  e.stopPropagation();
  nextStory();
});

storyModal.addEventListener("click", (e) => {
  if (!storyModalContent.contains(e.target)) {
    closeStory();
  }
});
