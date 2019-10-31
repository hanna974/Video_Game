import Timer from "./Timer.js";

var minDec = document.getElementById("minDec");
var minUni = document.getElementById("minUni");
var secDec = document.getElementById("secDec");
var secUni = document.getElementById("secUni");

let customerArr = [
  "Customer 1",
  "Customer 2",
  "Customer 3",
  "Customer 4",
  "Customer 5"
];
let iconArr = [
  "fas fa-coffee",
  "fas fa-cookie",
  "fas fa-ice-cream",
  "fas fa-beer",
  "fas fa-hamburger"
];
let totalOrder = [];
let orderList = document.getElementById("order-list");
let interval;
let delay = 10000;
let propositionArr = [];
let counter = 0;
let life = [1, 2, 3];
let timer = new Timer();

/** ??? */
let classCustomer = document.getElementsByClassName("customer");
let imgAreas = document.querySelectorAll("area");
let itemList = document.getElementById("item-list").children;
let classIcon1 = document.getElementsByClassName("icon-1");
let classIcon2 = document.getElementsByClassName("icon-2");
let classIcon3 = document.getElementsByClassName("icon-3");
/** ??? */

const audioObject = new Audio(
  "/NOMELODY_2019-10-13_-_The_Biggest_Smile_-_David_Fesliyan.mp3"
);
audioObject.play();
audioObject.loop = true;

function printMinutes() {
  let minutes = timer.getMinutes();
  let twoDigitsMinute = timer.twoDigitsNumber(minutes);
  minDec.innerHTML = twoDigitsMinute[0];
  minUni.innerHTML = twoDigitsMinute[1];
}

function printSeconds() {
  let secondes = timer.getSeconds();
  let twoDigitsSeconde = timer.twoDigitsNumber(secondes);
  secDec.innerHTML = twoDigitsSeconde[0];
  secUni.innerHTML = twoDigitsSeconde[1];
}

function stopTimer() {
  timer.stopClick();
  timer.resetClick();
}

function startTimer() {
  timer.startClick(function() {
    printMinutes();
    printSeconds();
  });
}

function setTimeCount() {
  interval = setInterval(createOrder, delay);
}

function clearTimeCount() {
  clearInterval(interval);
}

function startGame() {
  createOrder();
  startTimer();
  setTimeCount();
}

function stopGame() {
  orderList.innerHTML = "";
  clearInterval(interval);
  const finalTime = timer.getMinutes() + ":" + timer.getSeconds();
  stopTimer();
  window.location.replace(`/results.html?score=${counter}&time=${finalTime}`);
  // const res = prompt("game over ! play again (y/n");
  // if (res === "y") return startGame();
  // else return;
}

function isGameFinished() {
  return orderList.querySelectorAll(".order").length >= 10 || life.length == 0;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomLength(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createOrder() {
  let result = randomLength(2, 4);
  const order = [];
  if (result === 2) {
    order.push(random(customerArr), random(iconArr));
  }
  if (result === 3) {
    order.push(random(customerArr), random(iconArr), random(iconArr));
  }
  if (result === 4) {
    order.push(
      random(customerArr),
      random(iconArr),
      random(iconArr),
      random(iconArr)
    );
  }
  totalOrder.push(order);
  if (!isGameFinished()) displayOrder();
  else stopGame();
}

function displayOrder() {
  const currentOrder = totalOrder[totalOrder.length - 1];
  let li = '<li class="order">';
  li += `<span class="customer">${currentOrder[0]}</span>`;
  for (let i = 1; i < currentOrder.length; i++) {
    li += `<span class="${currentOrder[i]}"></span>`;
  }
  li += "</li>";
  orderList.innerHTML += li;
}

function areaClick(evt) {
  evt.preventDefault();
  const clickedCustomer = evt.target.title;
  document.getElementById("proposition").innerHTML = "";
  propositionArr = [];
  propositionArr.push(`${clickedCustomer}`);
  document.getElementById(
    "proposition"
  ).innerHTML += `<span>${clickedCustomer}</span>`;
}

imgAreas.forEach(area => (area.onclick = areaClick));

function iconClick(evt) {
  const clickedIcon = evt.target.classList.value;
  propositionArr.push(clickedIcon);
  document.getElementById(
    "proposition"
  ).innerHTML += `<span class="${clickedIcon}"></span>`;
}

for (let i = 0; i < itemList.length; i++) {
  itemList[i].addEventListener("click", iconClick);
}

function deleteProposition() {
  propositionArr.pop();
  document.getElementById("proposition").lastChild.remove();
}

document
  .getElementById("btn-delete")
  .addEventListener("click", deleteProposition);

function loseLife() {
  life.pop();
  document
    .getElementsByClassName("life")
    [2 - life.length].classList.add("fa-heart-broken");
}

function check() {
  let goodAnswer = false;
  for (let i = 0; i < totalOrder.length; i++) {
    if (
      (JSON.stringify(propositionArr) == JSON.stringify(totalOrder[i])) ==
      true
    ) {
      totalOrder.splice(i, 1);
      orderList.removeChild(orderList.childNodes[i + 1]);
      counter++;
      document.getElementById("proposition").innerHTML = "";

      const currentS = timer.getSeconds();
      const currentmInS = timer.getMinutes() * 60;
      const currentMillis = (currentS + currentmInS) * 1000;
      const remainingMillis = delay - currentMillis;

      document.getElementById("counter").innerHTML = counter;
      goodAnswer = true;

      setTimeout(() => {
        delay = delay - 1000 >= 3000 ? delay - 1000 : delay;
        clearTimeCount();
        setTimeCount();
      }, remainingMillis);

      if (totalOrder.length == 0) {
        clearTimeout();
        createOrder();
      }
      return;
    }
  }
  if (!goodAnswer) loseLife();
  if (isGameFinished()) stopGame();
}

document.getElementById("btn-serve").addEventListener("click", check);

startGame();

// A faire  :
// Ajouter audio
