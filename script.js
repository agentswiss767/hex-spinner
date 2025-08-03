// Get all the DOM elements you'll need
const speedSlider = document.getElementById("speedControl");
const ballSizeSelect = document.getElementById("ballSize");
const hexSizeSelect = document.getElementById("hexSize");
const ballColorInput = document.getElementById("ballColor");
const hexColorInput = document.getElementById("hexColor");
const hexagon = document.querySelector(".hexagon");
const ball = document.querySelector(".ball");
const spinSound = document.getElementById("spinSound");

// Function to update the animation speed
function updateSpeed() {
  // A higher slider value should mean a faster animation.
  const minSpeed = 0.5; // seconds
  const maxSpeed = 2; // seconds
  const speed = minSpeed + (maxSpeed - minSpeed) * (1 - (speedSlider.value - 10) / 90);
  
  hexagon.style.animationDuration = `${speed * 4}s`; // Hexagon spins slower
  ball.style.animationDuration = `${speed}s`; // Ball follows the path faster
}

// Function to update the size of the hexagon and ball
function updateSize() {
  // Clear existing size classes and apply the new ones
  hexagon.className = "hexagon";
  ball.className = "ball";
  
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
  
  // The animationiteration event is on the ball element now
  ball.addEventListener('animationiteration', () => {
    const now = Date.now();
    // Use a debounce to prevent rapid re-triggering of the sound
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
