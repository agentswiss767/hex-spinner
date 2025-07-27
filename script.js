const speedInput = document.getElementById("speedControl");
const ballSize = document.getElementById("ballSize");
const hexSize = document.getElementById("hexSize");
const ballColorInput = document.getElementById("ballColor");
const hexColorInput = document.getElementById("hexColor");
const hexagon = document.querySelector(".hexagon");
const ball = document.querySelector(".ball");
const spinSound = document.getElementById("spinSound");

let lastAngle = 0, isDragging = false, startX=0, currentAngle=0;

function updateSpeed() {
  const dur = 100 / speedInput.value;
  hexagon.style.animationDuration = `${dur}s`;
}

function updateSizes() {
  hexagon.className = "hexagon";
  ball.className = "ball";
  hexagon.classList.add(`hex-${hexSize.value}`);
  ball.classList.add(`ball-${ballSize.value}`);
}

function updateColors() {
  ball.style.backgroundColor = ballColorInput.value;
  hexagon.style.backgroundColor = hexColorInput.value;
}

function playTick() { spinSound.currentTime = 0; spinSound.play(); }

function startSoundTracker() {
  let prev = performance.now();
  function tickLoop(now) {
    const dur = parseFloat(hexagon.style.animationDuration) * 1000;
    const progress = (now - prev) % dur;
    if (progress < 20) playTick();
    requestAnimationFrame(tickLoop);
  }
  requestAnimationFrame(tickLoop);
}

// Drag-to-spin handlers
hexagon.addEventListener("mousedown", e => {
  isDragging=true; startX=e.pageX;
  hexagon.style.animation = 'none';
});
window.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const dx = e.pageX - startX;
  currentAngle = lastAngle + dx;
  hexagon.style.transform = `rotate(${currentAngle}deg)`;
});
window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false; lastAngle = currentAngle;
    updateSpeed();
    hexagon.style.animation = '';
  }
});

speedInput.addEventListener("input", updateSpeed);
ballSize.addEventListener("change", updateSizes);
hexSize.addEventListener("change", updateSizes);
ballColorInput.addEventListener("input", updateColors);
hexColorInput.addEventListener("input", updateColors);

// Initialize
updateSpeed();
updateSizes();
updateColors();
startSoundTracker();
