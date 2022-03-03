"use strict";
const bankEle = document.querySelector(".bank-value");
const betEle = document.querySelector(".bet-value");
const btnNewGame = document.querySelector(".btn-newgame");
const btnStartGame = document.querySelector(".btn-startgame");
const btnsGame = document.querySelectorAll(".btn-game");
const btnsBet = document.querySelectorAll(".btn-bet");
const btnBet1 = document.querySelector(".bet-1");
const btnBet5 = document.querySelector(".bet-5");
const btnBet25 = document.querySelector(".bet-25");
const btnBet50 = document.querySelector(".bet-50");
const btnBet100 = document.querySelector(".bet-100");
const btnBet500 = document.querySelector(".bet-500");
let cardsEle = document.getElementsByTagName("img");

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
//console.log(shuffle(deck));

// Initialbedingungen
let bank = 1000;
let bet = 0;
let dealer = {
  ID: 0,
  Score: 0,
  Hand: undefined,
};
let player = {
  ID: 1,
  Score: 0,
  Hand: undefined,
};

// button toggles

const toggleBtnsBet = function (toggle) {
  for (let i = 0; i < btnsBet.length; ++i) {
    btnsBet[i].classList[toggle]("hidden");
  }
};

const toggleBtnsGame = function (toggle) {
  for (let i = 0; i < btnsGame.length; ++i) {
    btnsGame[i].classList[toggle]("hidden");
  }
};

const newGame = function () {
  bank = 1000;
  bet = 0;
  bankEle.textContent = bank;
  betEle.textContent = bet;
  btnStartGame.classList.remove("hidden");
  toggleBtnsBet("remove");
  toggleBtnsGame("add");
  for (let el of cardsEle) {
    el.src = "";
  }
};

const addBet = function (betted) {
  if (bank >= betted) {
    bet += betted;
    betEle.textContent = bet;
    bank -= betted;
    bankEle.textContent = bank;
  }
};

const startGame = function () {
  if (bet > 0) {
    toggleBtnsBet("add");
    toggleBtnsGame("remove");
    btnStartGame.classList.add("hidden");
  }
};

//const subtractBet = function (bankSubtract) {
//if (bank >= bankSubtract) {
//bank -= bankSubtract;
//bankEle.textContent = bank;
//}
//};

btnNewGame.addEventListener("click", newGame);
btnStartGame.addEventListener("click", startGame);
btnBet1.addEventListener("click", function () {
  addBet(1);
});
btnBet5.addEventListener("click", function () {
  addBet(5);
});
btnBet25.addEventListener("click", function () {
  addBet(25);
});
btnBet50.addEventListener("click", function () {
  addBet(50);
});
btnBet100.addEventListener("click", function () {
  addBet(100);
});
btnBet500.addEventListener("click", function () {
  addBet(500);
});
