// ball.js

document.addEventListener('DOMContentLoaded', () => {
  const ball = document.getElementById('ball');
  const kickSound = document.getElementById('kickSound');

  if (!ball) return; // إذا لم يوجد عنصر الكرة، لا نفعل شيء

  let moveInterval;

  function getRandomPosition() {
    const maxX = window.innerWidth - ball.offsetWidth;
    const maxY = window.innerHeight - ball.offsetHeight;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    };
  }

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
    ball.style.transition = "left 0.2s ease, top 0.2s ease, transform 0.2s ease";
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ball.style.transform = "scale(1.3) rotate(15deg)";

    if (kickSound && kickSound.paused) {
      kickSound.currentTime = 0;
      kickSound.play().catch(err => console.warn("Sound play error:", err));
    }

    setTimeout(() => {
      ball.style.transform = "scale(1) rotate(0deg)";
      ball.style.transition = "left 0.5s ease, top 0.5s ease, transform 0.2s ease";
      startMoving();
    }, 150);
  }

  window.addEventListener('resize', moveBall);

  // إعداد الحركة
  ball.style.position = "absolute";
  ball.style.transition = "left 0.5s ease, top 0.5s ease, transform 0.2s ease";

  startMoving();
  ball.addEventListener('mouseenter', kickBall);
  ball.addEventListener('click', kickBall);
});
