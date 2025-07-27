const speedSlider = document.getElementById("speedControl");
const ballSize = document.getElementById("ballSize");
const hexSize = document.getElementById("hexSize");
const ballColor = document.getElementById("ballColor");
const hexColor = document.getElementById("hexColor");
const hexagon = document.querySelector(".hexagon");
const ball = document.querySelector(".ball");
const tick = document.getElementById("spinSound");

function updateSpeed() {
  const speed = 100 / speedSlider.value;
  hexagon.style.animationDuration = `${speed}s`;
}

function updateSize() {
  hexagon.className = "hexagon";
  ball.className = "ball";
  hexagon.classList.add(`hex-${hexSize.value}`);
  ball.classList.add(`ball-${ballSize.value}`);
}

function updateColor() {
  hexagon.style.backgroundColor = hexColor.value;
  ball.style.backgroundColor = ballColor.value;
}

function tickSoundLoop() {
  let lastTime = performance.now();
  function loop(now) {
    const duration = parseFloat(getComputedStyle(hexagon).animationDuration) * 1000;
    if ((now - lastTime) > duration) {
      tick.currentTime = 0;
      tick.play();
      lastTime = now;
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

speedSlider.addEventListener("input", updateSpeed);
ballSize.addEventListener("change", updateSize);
hexSize.addEventListener("change", updateSize);
ballColor.addEventListener("input", updateColor);
hexColor.addEventListener("input", updateColor);

updateSpeed();
updateSize();
updateColor();
tickSoundLoop();
