const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".navbar");

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

const storyData = [
  { img: "./images/st-1.png", name: "Eleanor Pena", role: "Lana Member" },
  { img: "./images/st-2.png", name: "Robert Fox", role: "Event Organizer" },
  { img: "./images/st-3.png", name: "Jenny Wilson", role: "Lana Member" },
  { img: "./images/st-4.png", name: "Theresa Webb", role: "Premium Member" },
  { img: "./images/st-2.png", name: "Jerome Bell", role: "Frequent Attendee" },
];

const storyGrid = document.getElementById("storyGrid");
storyGrid.innerHTML = storyData
  .map(
    (story, index) => `
  <div class="story-card" data-index="${index}">
    <img src="${story.img}" alt="Story ${index + 1}" />
    <div class="story-play-icon"><i class="fa-solid fa-play"></i></div>
    <div class="story-info">
      <p class="story-name">${story.name}</p>
      <p class="story-role">${story.role}</p>
    </div>
  </div>
`
  )
  .join("");

const storyModal = document.getElementById("storyModal");
const storyImage = document.getElementById("storyImage");
const storyProgress = document.getElementById("storyProgress");
const closeStoryBtn = document.getElementById("closeStoryBtn");
const storyModalContent = document.querySelector(".story-modal-content");

let stories = storyData.map((s) => s.img);
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

document.querySelectorAll(".story-card").forEach((card) => {
  card.addEventListener("click", () => {
    const index = parseInt(card.dataset.index);
    showStory(index);
  });
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

// Drink card data
const drinks = [
  {
    img: "./images/image.png",
    cardBg: "",
    imageBg: "card-image1",
    rankImg: "./images/logo.svg",
    rank: "#01",
    trending: true,
    title: "Trailblazer Hoppy Helles",
    rating: 4.8,
    reviews: 382,
    taste: "taste",
    health: "health",
    value: "value",
    price: "$4.99",
    aos: "fade-right",
  },
  {
    img: "./images/image-1.png",
    cardBg: "card-image-bg2",
    imageBg: "card-image1 card-image2",
    rankImg: null,
    rank: null,
    trending: true,
    title: "Citrus Spark Cooler",
    rating: 4.6,
    reviews: 290,
    taste: "taste",
    health: "health",
    value: "value",
    price: "$5.99",
    aos: "fade-up",
  },
  {
    img: "./images/image-2.png",
    cardBg: "card-image-bg3",
    imageBg: "card-image1 card-image3",
    rankImg: "./images/logo.svg",
    rank: "#03",
    trending: false,
    title: "Minty Fresh Ale",
    rating: 4.7,
    reviews: 320,
    taste: "taste",
    health: "health",
    value: "value",
    price: "$4.49",
    aos: "fade-down",
  },
  {
    img: "./images/image-3.png",
    cardBg: "card-image-bg4",
    imageBg: "card-image1 card-image4",
    rankImg: null,
    rank: null,
    trending: true,
    title: "Berry Blast Tonic",
    rating: 4.9,
    reviews: 410,
    taste: "taste",
    health: "health",
    value: "value",
    price: "$6.99",
    aos: "fade-left",
  },
];

const cardGrid = document.getElementById("cardGrid");

cardGrid.innerHTML = drinks
  .map(
    (drink) => `
    <div class="drink-card" data-aos="${drink.aos}">
        <div class="card-image ${drink.cardBg}">
            <div class="${drink.imageBg}">
                <img src="${drink.img}" alt="card image">
            </div>
            ${
              drink.rankImg
                ? `
                <div class="rank">
                    <img src="${drink.rankImg}" alt="rank logo">
                    <span>${drink.rank}</span>
                </div>`
                : ""
            }
            ${
              drink.trending
                ? `<div class="badge trending"><i class="fa-sharp fa-solid fa-arrow-trend-up"></i> Trending</div>`
                : ""
            }
        </div>
        <div class="card-body">
            <h3>${drink.title}</h3>
            <p class="rating"> 
                <i class="fa-solid fa-star star"></i> 
                <span class="drink-rating">${drink.rating}</span>
                <span>(${drink.reviews} Reviews)</span>
            </p>
            <div class="bar-group">
                <div class="bar-row">
                    <div class="bar-label">Taste</div>
                    <div class="bar"><div class="fill ${
                      drink.taste
                    }"></div></div>
                </div>
                <div class="bar-row">
                    <div class="bar-label">Health</div>
                    <div class="bar"><div class="fill ${
                      drink.health
                    }"></div></div>
                </div>
                <div class="bar-row">
                    <div class="bar-label">Value</div>
                    <div class="bar"><div class="fill ${
                      drink.value
                    }"></div></div>
                </div>
            </div>
            <div class="price-add">
                <span class="price">${drink.price}</span>
                <button class="add-btn">
                    <img src="./images/shopping-bag-02.png" alt="shopping bag"> Add to Bag
                </button>
            </div>
        </div>
    </div>
`
  )
  .join("");

// event card section

const events = [
  {
    img: "./images/image 7-1.png",
    friends: [
      "./images/review-image1.png",
      "./images/explore1.png",
      "./images/explore2.png",
      "./images/explore3.png",
      "./images/Avatar.svg",
    ],
    requestText: "Friends are Going",
    tags: [
      {
        text: "Trending",
        icon: "./images/bar-line-chart.svg",
        class: "event--trending",
      },
      { text: "Sales end soon", class: "event-alert" },
    ],
    title: "Boston’s Hottest Kickback (1 Drink...)",
    dateIcon: "./images/Calendar.svg",
    dateText: "Tue, Jan 9, 5:00 PM",
    locationIcon: "./images/Map Point Wave.svg",
    locationText: "Theory bar lounge",
    price: "From US$57.09",
    aos: "fade-right",
  },
  {
    img: "./images/image-10.png",
    friends: [
      "./images/review-image1.png",
      "./images/explore1.png",
      "./images/explore2.png",
      "./images/explore3.png",
      "./images/Avatar.svg",
    ],
    requestText: "Friends are Going",
    tags: [
      {
        text: "Trending",
        icon: "./images/bar-line-chart.svg",
        class: "event--trending",
      },
      { text: "Going Fast", class: "event-warning" },
    ],
    title: "Speed Dating in Cambridge",
    dateIcon: "./images/Calendar.svg",
    dateText: "Tue, Jan 9, 5:00 PM",
    locationIcon: "./images/Map Point Wave.svg",
    locationText: "Theory bar lounge",
    price: "From US$57.09",
    aos: "fade-up",
  },
  {
    img: "./images/image 8.png",
    friends: [
      "./images/review-image1.png",
      "./images/explore1.png",
      "./images/explore2.png",
      "./images/explore3.png",
      "./images/Avatar.svg",
    ],
    requestText: "Friends are Going",
    tags: [
      {
        text: "Trending",
        icon: "./images/bar-line-chart.svg",
        class: "event--trending",
      },
      { text: "Almost Full", class: "event-pink" },
    ],
    title: "Italian Wine And Dating",
    dateIcon: "./images/Calendar.svg",
    dateText: "Tue, Jan 9, 5:00 PM",
    locationIcon: "./images/Map Point Wave.svg",
    locationText: "Theory bar lounge",
    price: "From US$57.09",
    aos: "fade-down",
  },
  {
    img: "./images/image-11.png",
    friends: [
      "./images/review-image1.png",
      "./images/explore1.png",
      "./images/explore2.png",
      "./images/explore3.png",
      "./images/Avatar.svg",
    ],
    requestText: "Friends are Going",
    tags: [
      {
        text: "Trending",
        icon: "./images/bar-line-chart.svg",
        class: "event--trending",
      },
      { text: "Grab Now", class: "event-blue" },
    ],
    title: "Speed Dating in Cambridge",
    dateIcon: "./images/Calendar.svg",
    dateText: "Tue, Jan 9, 5:00 PM",
    locationIcon: "./images/Map Point Wave.svg",
    locationText: "Theory bar lounge",
    price: "From US$57.09",
    aos: "fade-left",
  },
];

const eventGrid = document.getElementById("eventGrid");

eventGrid.innerHTML = events
  .map(
    (event) => `
    <div class="event-card" data-aos="${event.aos}">
        <div class="event-card--image">
            <img src="${event.img}" alt="event image">
            <div class="event-notifications">
                ${event.friends
                  .map((f) => `<img src="${f}" alt="event image">`)
                  .join("")}
                <p class="event-request">${event.requestText}</p>
            </div>
        </div>
        <div class="event-card--tags">
            ${event.tags
              .map(
                (tag) => `
                <span class="event-tag ${tag.class}">
                    ${tag.icon ? `<img src="${tag.icon}" alt="">` : ""} ${
                  tag.text
                }
                </span>
            `
              )
              .join("")}
        </div>
        <h3>${event.title}</h3>
        <div class="event-card-info"> 
            <img class="event-time" src="${event.dateIcon}" alt="calendar">${
      event.dateText
    }
        </div>
        <div class="event-card-info"> 
            <img class="event-location" src="${event.locationIcon}" alt="map">${
      event.locationText
    }
        </div>
        <p class="event-price"><strong>${event.price}</strong></p>
    </div>
`
  )
  .join("");
