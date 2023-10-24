const body = document.querySelector("body");
const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let isGenerating = true;

startButton.addEventListener("click", () => {
  if (isGenerating) {
    timerId = setInterval(() => {
      const color = getRandomColor();
      body.style.backgroundColor = color;
    }, 1000);
    startButton.disabled = true;
  }
});
stopButton.addEventListener("click", () => {
  clearInterval(timerId);
  startButton.disabled = false;
});
