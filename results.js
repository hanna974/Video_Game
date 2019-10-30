const url = new URLSearchParams(window.location.search);
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const replayBtn = document.getElementById("replay");
console.log("hello");

function displayResults() {
  const s = url.get("score");
  const t = url.get("time");
  console.log(s, t);

  scoreElement.textContent = s;
  timeElement.textContent = t;
}

function replay() {
  window.location.replace("/");
}

displayResults();

replayBtn.onclick = replay;
