// =================================================================================
// DOM Element Selection
// =================================================================================

const cube = document.getElementById("rubiks-cube");
const animateBtn = document.getElementById("animate-btn");
const animationCountButtons = document.querySelectorAll(".animation-count");
const cubeContainer = document.getElementById("cube-container");
const hoverText = document.getElementById("hover-text");
const messageElements = [
  document.getElementById("i-message"),
  document.getElementById("love-message"),
  document.getElementById("you-message"),
  document.getElementById("credits-text"),
];
const themeToggle = document.getElementById("theme-toggle");
const speedSlider = document.getElementById("speed-slider");
const textInputs = document.querySelectorAll(".text-inputs input");
const colorPaletteContainer = document.getElementById("color-palette");

// =================================================================================
// Event Listeners for Controls
// =================================================================================

// --- Theme Toggle ---
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLightMode = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLightMode ? "🌙" : "☀️";
});

// --- Animation Speed Slider ---
speedSlider.addEventListener("input", (e) => {
  const speedValue = e.target.value;
  // Invert the value so that a higher slider value means faster animation
  const animationDuration = 21 - speedValue;
  document.documentElement.style.setProperty(
    "--animation-duration",
    `${animationDuration}s`
  );
});

// --- Text Customization ---
textInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    const targetId = e.target.dataset.target;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.textContent = e.target.value;
    }
  });
});

// --- Color Palette ---
const colors = [
  "#ff2208", "#ff9d02", "#0084e3", "#01dd25",
  "#eeff01", "#ffffff", "#000000", "#800080",
];
const faceColorVariables = [
  "--front-face-color", "--back-face-color", "--left-face-color",
  "--right-face-color", "--top-face-color", "--bottom-face-color",
];

let selectedFaceIndex = 0; // Default to front face

// Create face selector buttons
faceColorVariables.forEach((_, index) => {
  const faceSelector = document.createElement("div");
  faceSelector.classList.add("face-selector");
  faceSelector.textContent = `Face ${index + 1}`;
  faceSelector.dataset.faceIndex = index;
  if (index === 0) {
    faceSelector.classList.add("selected");
  }
  faceSelector.addEventListener("click", () => {
    document.querySelectorAll(".face-selector").forEach((sel) => sel.classList.remove("selected"));
    faceSelector.classList.add("selected");
    selectedFaceIndex = index;
  });
  colorPaletteContainer.appendChild(faceSelector);
});

// Create color picker boxes
colors.forEach((color) => {
  const colorBox = document.createElement("div");
  colorBox.classList.add("color-box");
  colorBox.style.backgroundColor = color;
  colorBox.dataset.color = color;
  colorBox.addEventListener("click", () => {
    document.documentElement.style.setProperty(faceColorVariables[selectedFaceIndex], color);
  });
  colorPaletteContainer.appendChild(colorBox);
});

// =================================================================================
// Animation Logic
// =================================================================================

/**
 * Toggles a class on a list of elements.
 * @param {Element[]} elements - The array of DOM elements.
 * @param {string} className - The class name to toggle.
 * @param {boolean} [force] - Optional boolean to force add or remove the class.
 */
const toggleClassOnElements = (elements, className, force) => {
  elements.forEach((element) => {
    element.classList.toggle(className, force);
  });
};

/**
 * Manages the animation state of the cube and text.
 * @param {'playing' | 'paused' | 'stopped'} state - The desired animation state.
 */
const manageAnimation = (state) => {
  const isPlaying = state === "playing";
  const isPaused = state === "paused";

  // Toggle classes for cube rotation and button state
  cube.classList.toggle("rotate", isPlaying);
  cube.classList.toggle("paused", isPaused || !isPlaying);
  animateBtn.classList.toggle("active", isPlaying);
  hoverText.style.opacity = isPlaying ? "0" : "1";

  // Toggle paused state for text animations
  toggleClassOnElements(messageElements, "paused", isPaused || !isPlaying);

  // Add or remove text animation classes based on the state
  const shouldPlayText = state === "playing";
  toggleClassOnElements(messageElements, "i-play", shouldPlayText);
  toggleClassOnElements(messageElements, "love-play", shouldPlayText);
  toggleClassOnElements(messageElements, "you-play", shouldPlayText);
  toggleClassOnElements(messageElements, "credits-play", shouldPlayText);
};

// =================================================================================
// Event Listeners for Animation Triggers
// =================================================================================

// --- Animation Button ---
animateBtn.addEventListener("click", () => {
  const isPlaying = animateBtn.classList.contains("active");
  manageAnimation(isPlaying ? "paused" : "playing");
});

// --- Iteration Count Buttons ---
animationCountButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!btn.classList.contains("active")) {
      animationCountButtons.forEach((otherBtn) => otherBtn.classList.remove("active"));
      btn.classList.add("active");
      cube.style.animationIterationCount = btn.value;
      // Restart animation to apply new iteration count
      manageAnimation("stopped");
      setTimeout(() => manageAnimation("playing"), 10);
    }
  });
});

// --- Hover Animation ---
cubeContainer.addEventListener("mouseenter", () => {
  if (!animateBtn.classList.contains("active")) {
    manageAnimation("playing");
  }
});

cubeContainer.addEventListener("mouseleave", () => {
  if (!animateBtn.classList.contains("active")) {
    manageAnimation("paused");
  }
});

// --- Animation End ---
cube.addEventListener("animationend", () => {
  // Only stop if not set to infinite
  if (cube.style.animationIterationCount !== "infinite") {
    manageAnimation("stopped");
  }
});
