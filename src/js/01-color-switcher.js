
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let color;

stop.disabled = true;

start.addEventListener('click', handleStart);
stop.addEventListener('click', handleStop);

function handleStart() {
  color = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.disabled = true;
  stop.disabled = false;
}

function handleStop() {
  clearInterval(color);
  stop.disabled = true;
  start.disabled = false;
}