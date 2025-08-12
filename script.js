const cube = document.getElementById("rubiks-cube");
const aniBtn = document.getElementById("animate-btn");

cube.addEventListener("animationend", () => {
  cube.classList.remove("rotate");
  aniBtn.classList.remove("active");
  cube.classList.remove("paused");
  removeAni(iMessage, loveMessage, youMessage, creditsText);
  runAni(iMessage, loveMessage, youMessage, creditsText);
});

aniBtn.addEventListener("click", () => {
  if (aniBtn.classList.contains("active")) {
    aniBtn.classList.remove("active");
    cube.classList.add("paused");
    pauseAni(iMessage, loveMessage, youMessage, creditsText);
    hoverText.style.opacity = "1";
  } else {
    cube.classList.remove("paused");
    aniBtn.classList.add("active");
    cube.classList.add("rotate");
    runAni(iMessage, loveMessage, youMessage, creditsText);
    playAni(iMessage, loveMessage, youMessage, creditsText);
    hoverText.style.opacity = "0";
  }
});

const aniCount = document.querySelectorAll("#animation-count");

aniCount.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!btn.classList.contains("active")) {
      aniCount.forEach((otherBtn) => {
        otherBtn.classList.remove("active");
      });
      btn.classList.add("active");
      cube.style.animationIterationCount = btn.value;
      console.log(
        `ANIMATION-ITERATION-COUNT: ${cube.style.animationIterationCount}`
      );
      cube.classList.add("rotate");
      playAni(iMessage, loveMessage, youMessage, creditsText);
    }
  });
});

const container = document.getElementById("cube-container");
const hoverText = document.getElementById("hover-text");

container.addEventListener("mouseenter", () => {
  if (!aniBtn.classList.contains("active")) {
    cube.classList.add("rotate");
    cube.classList.remove("paused");
    playAni(iMessage, loveMessage, youMessage, creditsText);
    runAni(iMessage, loveMessage, youMessage, creditsText);
    hoverText.style.opacity = "0";
  }
});

container.addEventListener("mouseleave", () => {
  if (!aniBtn.classList.contains("active")) {
    cube.classList.add("paused");
    pauseAni(iMessage, loveMessage, youMessage, creditsText);
    hoverText.style.opacity = "1";
  }
});

const iMessage = document.getElementById("i-message");
const loveMessage = document.getElementById("love-message");
const youMessage = document.getElementById("you-message");
const creditsText = document.getElementById("credits-text");

function playAni(first, second, third, fourt) {
  first.classList.add("i-play");
  second.classList.add("love-play");
  third.classList.add("you-play");
  fourt.classList.add("credits-play");
}

function removeAni(first, second, third, fourt) {
  first.classList.remove("i-play");
  second.classList.remove("love-play");
  third.classList.remove("you-play");
  fourt.classList.remove("credits-play");
}

function pauseAni(first, second, third, fourt) {
  first.classList.add("paused");
  second.classList.add("paused");
  third.classList.add("paused");
  fourt.classList.add("paused");
}

function runAni(first, second, third, fourt) {
  first.classList.remove("paused");
  second.classList.remove("paused");
  third.classList.remove("paused");
  fourt.classList.remove("paused");
}
