// Select DOM elements
const heroSection = document.getElementById('hero');
const destinationSelector = document.getElementById('destinationSelector');

// Function to change the background dynamically
function changeHeroBackground() {
  const selectedImage = destinationSelector.value; // Get selected image path
  heroSection.style.backgroundImage = `url(${selectedImage})`; // Set as background
}

// Add event listener for dropdown change
destinationSelector.addEventListener('change', changeHeroBackground);

// Set default background when the page loads
window.addEventListener('DOMContentLoaded', () => {
  changeHeroBackground(); // Ensure the default is applied initially
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const destinations = document.querySelectorAll(".destination");
  const numClones = destinations.length; // Clone same number of elements

  // Clone each destination card and append it to the track
  destinations.forEach((destination) => {
    const clone = destination.cloneNode(true);
    track.appendChild(clone);
  });

  // Adjust animation dynamically
  const totalCards = destinations.length + numClones;
  const cardWidth = destinations[0].offsetWidth + 20; // Include margin
  const trackWidth = cardWidth * totalCards;

  // Apply dynamic width to track for smooth animation
  track.style.width = `${trackWidth}px`;

  // Restart animation once it finishes (to avoid blank gaps)
  let scrollPosition = 0;

  setInterval(() => {
    scrollPosition -= cardWidth;

    if (Math.abs(scrollPosition) >= cardWidth * destinations.length) {
      scrollPosition = 0;
      track.style.transition = "none"; // Instantly reset
      track.style.transform = `translateX(${scrollPosition}px)`;
    } else {
      track.style.transition = "transform 1s ease"; // Smooth animation
      track.style.transform = `translateX(${scrollPosition}px)`;
    }
  }, 3000); // Wait 3 seconds between transitions
});

window.addEventListener('scroll', function() {
  const destinations = document.querySelector('.destinations');
  const scrollPosition = window.scrollY; // Get the scroll position of the window

  // Calculate the translation based on scroll position (up to the height of the hero section)
  const destinationOffset = Math.min(scrollPosition, window.innerHeight); // Limit it to the screen height

  // Apply the transform property to move destinations up
  destinations.style.transform = `translateY(${Math.max(100 - destinationOffset, 0)}vh)`;
});
