const inputs = document.querySelectorAll("input");
// Display Elements
const hourDisplay = document.querySelector("#hour-display");
const minuteDisplay = document.querySelector("#minute-display");
const secondDisplay = document.querySelector("#second-display");
// Buttons
const expandScreenButton = document.querySelector("#expand-button");
const editButton = document.querySelector("#edit-time-button");
const startButton = document.querySelector("#pause-play-button");
const stopButton = document.querySelector("#stop-button");

let isStarted = false;
let timerInterval = null;
let hour = 0;
let minute = 0;
let second = 0;

function pad(num) {
  return String(num).padStart(2, "0");
}

function updateDisplayFromSeconds(totalSeconds) {
  hour = Math.floor(totalSeconds / 3600);
  minute = Math.floor((totalSeconds % 3600) / 60);
  second = totalSeconds % 60;

  hourDisplay.value = pad(hour);
  minuteDisplay.value = pad(minute);
  secondDisplay.value = pad(second);
}

function playTimer() {
  let totalSeconds =
    (parseInt(hourDisplay.value) || 0) * 3600 +
    (parseInt(minuteDisplay.value) || 0) * 60 +
    (parseInt(secondDisplay.value) || 0);

  if (totalSeconds <= 0) {
    alert("Defina um tempo maior que zero!");
    return;
  }

  isStarted = true;
  startButton.innerHTML = `<i class="fa-solid fa-pause" style="color: rgb(254, 254, 254)"></i>`;

  inputs.forEach((input) => (input.disabled = true));
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: rgb(254, 254, 254)"></i>`;

  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplayFromSeconds(totalSeconds);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      isStarted = false;
      startButton.innerHTML = `<i class="fa-solid fa-play" style="color: rgb(254, 254, 254)"></i>`;
      alert("O tempo acabou!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isStarted = false;
  startButton.innerHTML = `<i class="fa-solid fa-play" style="color: rgb(254, 254, 254)"></i>`;
}

function updateHourDisplay(e) {
  if (isStarted) return;
  if (e.key === "Backspace") {
    e.preventDefault();
    let currentValue = hourDisplay.value;
    let updatedValue = "0" + currentValue.slice(0, -1);
    hourDisplay.value = updatedValue;
    hour = parseInt(updatedValue);
    return;
  }

  if (e.key < "0" || e.key > "9") return;
  e.preventDefault();

  let currentValue = hourDisplay.value;
  let newDigit = e.key;

  let updatedValue = currentValue.slice(1) + newDigit;
  hourDisplay.value = updatedValue;
  hour = parseInt(updatedValue);
}

function updateMinuteDisplay(e) {
  if (isStarted) return;
  if (e.key === "Backspace") {
    e.preventDefault();
    let currentValue = minuteDisplay.value;
    let updatedValue = "0" + currentValue.slice(0, -1);
    minuteDisplay.value = updatedValue;
    minute = parseInt(updatedValue);
    return;
  }

  if (e.key < "0" || e.key > "9") return;
  e.preventDefault();

  let currentValue = minuteDisplay.value;
  let newDigit = e.key;

  let updatedValue = currentValue.slice(1) + newDigit;
  minuteDisplay.value = updatedValue;
  minute = parseInt(updatedValue);
}

function updateSecondDisplay(e) {
  if (isStarted) return;
  if (e.key === "Backspace") {
    e.preventDefault();
    let currentValue = secondDisplay.value;
    let updatedValue = "0" + currentValue.slice(0, -1);
    secondDisplay.value = updatedValue;
    second = parseInt(updatedValue);
    return;
  }

  if (e.key < "0" || e.key > "9") return;
  e.preventDefault();

  let currentValue = secondDisplay.value;
  let newDigit = e.key;

  let updatedValue = currentValue.slice(1) + newDigit;
  secondDisplay.value = updatedValue;
  second = parseInt(updatedValue);
}

function expandExitScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }
  const appScreen = document.body;

  if (appScreen.requestFullscreen) {
    appScreen.requestFullscreen();
    return;
  }
  if (appScreen.webkitRequestFullscreen) {
    appScreen.webkitRequestFullscreen();
    return;
  }
  if (appScreen.msRequestFullscreen) {
    appScreen.msRequestFullscreen();
    return;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isStarted = false;

  hour = 0;
  minute = 0;
  second = 0;

  hourDisplay.value = "00";
  minuteDisplay.value = "00";
  secondDisplay.value = "00";

  startButton.innerHTML = `<i class="fa-solid fa-play" style="color: rgb(254, 254, 254)"></i>`;
  inputs.forEach((input) => (input.disabled = false));
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: rgb(254, 254, 254)"></i>`;
  inputs[0].focus();
}

document.onfullscreenchange = () => {
  if (!document.fullscreenElement) {
    expandScreenButton.innerHTML = `<i class="fa-solid fa-expand" style="color: rgb(254, 254, 254);"></i>`;
    return;
  }
  expandScreenButton.innerHTML = `<i class="fa-solid fa-minimize" style="color: rgb(254, 254, 254);"></i>`;
};

editButton.addEventListener("click", () => {
  if (isStarted) return;
  inputs.forEach((input) => {
    input.disabled = !input.disabled;
    if (!input.disabled) {
      editButton.innerHTML = `<i class="fa-solid fa-check" style="color: rgb(254, 254, 254);"></i>`;
      return;
    }
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: rgb(254, 254, 254)"></i>`;
  });
  inputs[0].focus();
});

hourDisplay.addEventListener("keydown", (e) => updateHourDisplay(e));
minuteDisplay.addEventListener("keydown", (e) => updateMinuteDisplay(e));
secondDisplay.addEventListener("keydown", (e) => updateSecondDisplay(e));

expandScreenButton.addEventListener("click", expandExitScreen);

startButton.addEventListener("click", () => {
  if (!isStarted) {
    playTimer();
  } else {
    pauseTimer();
  }
});

stopButton.addEventListener("click", stopTimer);
