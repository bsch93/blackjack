"use strict";
const bankEle = document.getElementsByClassName("bank--value");
const betEle = document.getElementsByClassName("einsatz--value");
const newGame = document.querySelector(".newgame");
const overlay = document.querySelector(".overlay--newgame");
const btnNewGame = document.querySelector(".btn--newgame");
const btnCloseNewGame = document.querySelector(".close--newgame");
const btnBet1 = document.querySelector(".bet--1");
const btnBet5 = document.querySelector(".bet--5");
const btnBet25 = document.querySelector(".bet--25");
const btnBet50 = document.querySelector(".bet--50");
const btnBet100 = document.querySelector(".bet--100");
const btnBet500 = document.querySelector(".bet--500");
const startGame = document.querySelector(".btn--start");

// Initialbedingungen
let bank = 1000;
let bet = 0;

const openNewGame = function () {
  bank = 1000;
  bet = 0;
  for (let el of betEle) {
    el.textContent = bet;
  }
  for (let el of bankEle) {
    el.textContent = bank;
  }
  newGame.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeNewGame = function () {
  newGame.classList.add("hidden");
  overlay.classList.add("hidden");
};
console.log(bet);
const subtractBet = function (betSubtract) {
  bank -= betSubtract;
  for (let el of bankEle) {
    el.textContent = bank;
  }
  console.log(bet);
};
const addBet = function (betAdd) {
  bet += betAdd;
  for (let el of betEle) {
    el.textContent = bet;
  }
};

btnNewGame.addEventListener("click", openNewGame);
btnBet1.addEventListener("click", function () {
  subtractBet(1);
  addBet(1);
});
btnBet5.addEventListener("click", function () {
  subtractBet(5);
  addBet(5);
});
btnBet25.addEventListener("click", function () {
  subtractBet(25);
  addBet(25);
});
btnBet50.addEventListener("click", function () {
  subtractBet(50);
  addBet(50);
});
btnBet100.addEventListener("click", function () {
  subtractBet(100);
  addBet(100);
});
btnBet500.addEventListener("click", function () {
  subtractBet(500);
  addBet(500);
});
btnCloseNewGame.addEventListener("click", closeNewGame);
overlay.addEventListener("click", closeNewGame);
startGame.addEventListener("click", closeNewGame);

// Erstellt das Deck aus 52 Karten

const farbe = ["Kreuz", "Pik", "Herz", "Karo"];
// prettier-ignore
const nummer = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K"];
const cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
function createDeck() {
  let deck = new Array();
  for (let i = 0; i < farbe.length; i++) {
    for (let x = 0; x < nummer.length; x++) {
      let karte = {
        Nummer: nummer[x],
        Farbe: farbe[i],
        img: `${nummer[x]}_of_${farbe[i]}.png`,
        Value: cardValue[x],
      };
      deck.push(karte);
    }
  }
  return deck;
}
let deck = createDeck();

// Deck mischen

function shuffle(deck) {
  for (let i = 0; i < 10000; i++) {
    let karte0 = Math.floor(Math.random() * deck.length);
    let karte1 = Math.floor(Math.random() * deck.length);
    let x = deck[karte0];

    deck[karte0] = deck[karte1];
    deck[karte1] = x;
  }
  return deck;
}
console.log(shuffle(deck));
