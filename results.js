const url = new URLSearchParams(window.location.search);
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const replayBtn = document.getElementById("replay");

const audioObject = new Audio(
  "/NOMELODY_2019-10-13_-_The_Biggest_Smile_-_David_Fesliyan.mp3"
);
audioObject.play();

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
