"use strict";
const newGame = document.querySelector(".newgame");
const overlay = document.querySelector(".overlay--newgame");
const btnNewGame = document.querySelector(".btn--newgame");
const btnCloseNewGame = document.querySelector(".close--newgame");

const openNewGame = function () {
  newGame.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeNewGame = function () {
  newGame.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnNewGame.addEventListener("click", openNewGame);
btnCloseNewGame.addEventListener("click", closeNewGame);
overlay.addEventListener("click", closeNewGame);

// Initialbedingungen
let bank = "1000";
let bet = "0";

// Erstellt das Deck aus 52 Karten

const farbe = ["Kreuz", "Pik", "Herz", "Karo"];
// prettier-ignore
const nummer = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K"];

function createDeck() {
  let deck = new Array();
  for (let i = 0; i < farbe.length; i++) {
    for (let x = 0; x < nummer.length; x++) {
      let karte = {
        Nummer: nummer[x],
        Farbe: farbe[i],
        img: `${nummer[x]}_of_${farbe[i]}.png`,
      };
      deck.push(karte);
    }
  }
  return deck;
}

let deck = createDeck();

// Deck mischen
console.log(Math.floor(Math.random() * deck.length));

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
