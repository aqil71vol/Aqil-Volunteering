// ball.js

const ball = document.getElementById('ball');
const kickSound = document.getElementById('kickSound');

function getRandomPosition() {
  const maxX = window.innerWidth - ball.offsetWidth;
  const maxY = window.innerHeight - ball.offsetHeight;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

let moveInterval;

function moveBall() {
  const { x, y } = getRandomPosition();
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
}

function startMoving() {
  moveBall();
  moveInterval = setInterval(moveBall, 2000);
}

function stopMoving() {
  clearInterval(moveInterval);
}

function kickBall() {
  stopMoving();

  const { x, y } = getRandomPosition();

  ball.style.transition = "left 0.15s ease, top 0.15s ease, transform 0.15s ease";
  ball.style.left = x + "px";
  ball.style.top = y + "px";
  ball.style.transform = "scale(1.3) rotate(15deg)";

  kickSound.currentTime = 0;
  kickSound.play();

  setTimeout(() => {
    ball.style.transform = "scale(1) rotate(0deg)";
    ball.style.transition = "left 0.5s ease, top 0.5s ease, transform 0.2s ease";
    startMoving();
  }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
  startMoving();
  ball.addEventListener('mouseenter', kickBall);
  ball.addEventListener('click', kickBall);
});
