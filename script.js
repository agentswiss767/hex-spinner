// Get all the DOM elements you'll need
const speedSlider = document.getElementById("speedControl");
const ballSizeSelect = document.getElementById("ballSize");
const hexSizeSelect = document.getElementById("hexSize");
const ballColorInput = document.getElementById("ballColor");
const hexColorInput = document.getElementById("hexColor");
const hexagon = document.querySelector(".hexagon");
const ball = document.querySelector(".ball");
const ballWrapper = document.querySelector(".ball-wrapper");
const spinSound = document.getElementById("spinSound");

// Function to update the animation speed
function updateSpeed() {
  // A higher slider value should mean a faster animation.
  // The original code was inverted.
  // We'll map the 10-100 range to a desired duration range (e.g., 2s to 0.5s).
  const minSpeed = 0.5; // seconds
  const maxSpeed = 2; // seconds
  const speed = minSpeed + (maxSpeed - minSpeed) * (1 - (speedSlider.value - 10) / 90);
  
  // Apply the new animation durations
  hexagon.style.animationDuration = `${speed * 4}s`; // Hexagon spins slower
  ballWrapper.style.animationDuration = `${speed}s`; // Ball spins faster
}

// Function to update the size of the hexagon and ball
function updateSize() {
  // Clear existing size classes and apply the new ones
  hexagon.className = "hexagon";
  ball.className = "ball";
  
  // Note: Your CSS needs to have classes like `ball-small`, `ball-medium`, etc.
  // The original HTML and CSS used `small`, `medium`, `big`.
  // I've adjusted the code to use the same class names as your CSS.
  hexagon.classList.add(hexSizeSelect.value);
  ball.classList.add(ballSizeSelect.value);
}

// Function to update the colors
function updateColor() {
  hexagon.style.backgroundColor = hexColorInput.value;
  ball.style.backgroundColor = ballColorInput.value;
}

// Function to play a sound at the end of each ball rotation
function setupSoundLoop() {
  let lastPlayedTime = 0;
  
  // Using an animation event is more reliable than a manual time-based loop
  // as it's directly tied to the animation.
  ballWrapper.addEventListener('animationiteration', () => {
    // Only play if enough time has passed to prevent rapid re-triggering
    const now = Date.now();
    if (now - lastPlayedTime > 100) {
      spinSound.currentTime = 0;
      spinSound.play();
      lastPlayedTime = now;
    }
  });
}

// Add event listeners
speedSlider.addEventListener("input", updateSpeed);
ballSizeSelect.addEventListener("change", updateSize);
hexSizeSelect.addEventListener("change", updateSize);
ballColorInput.addEventListener("input", updateColor);
hexColorInput.addEventListener("input", updateColor);

// Initial setup on page load
document.addEventListener('DOMContentLoaded', () => {
  updateSpeed();
  updateSize();
  updateColor();
  setupSoundLoop();
});
