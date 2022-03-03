"use strict";
const bankEle = document.querySelector(".bank-value");
const betEle = document.querySelector(".bet-value");
const dealerEle = document.querySelector(".score-dealer");
const playerEle = document.querySelector(".score-player");
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
const btnDraw = document.querySelector(".btn-draw");
const btnHold = document.querySelector(".btn-hold");
const btnSurrender = document.querySelector(".btn-surrender");
const btnDouble = document.querySelector(".btn-double");
// prettier-ignore
let cardsDealer = document.getElementById("cards-dealer").querySelectorAll("img");
// prettier-ignore
let cardsPlayer = document.getElementById("cards-player").querySelectorAll("img");

// Erstellt das Deck aus 52 Karten

const farbe = ["Kreuz", "Pik", "Herz", "Karo"];
// prettier-ignore
const nummer = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "D", "K", "A"];
const cardValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
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
deck = shuffle(deck);
let bank = 1000;
let bet = 0;
let dealer = {
  ID: 0,
  Score: 0,
  Hand: [],
};
let player = {
  ID: 1,
  Score: 0,
  Hand: [],
};

const resetPlayers = function () {
  dealer = {
    ID: 0,
    Score: 0,
    Hand: [],
  };
  player = {
    ID: 1,
    Score: 0,
    Hand: [],
  };
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
  deck = createDeck();
  deck = shuffle(deck);
  bankEle.textContent = bank;
  betEle.textContent = bet;
  btnStartGame.classList.remove("hidden");
  toggleBtnsBet("remove");
  toggleBtnsGame("add");
  resetPlayers();
  for (let el of cardsDealer) {
    el.src = "";
  }
  for (let el of cardsPlayer) {
    el.src = "";
  }
  dealerEle.textContent = 0;
  playerEle.textContent = 0;
};

const checkWinner = function () {
  if (playerEle.textContent == 21) {
    console.log("Player won!");
  } else if (dealerEle.textContent == 21) {
    console.log("Dealer won!");
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

const displayCards = function () {
  for (let i = 0; i < dealer.Hand.length; i++) {
    if (dealer.Hand.length == 2 && i == 0) {
      cardsDealer[i].src = `/Karten/Kartenrücken.png`;
    } else {
      cardsDealer[i].src = `/Karten/${dealer.Hand[i].img}`;
    }
  }
  for (let i = 0; i < player.Hand.length; i++) {
    cardsPlayer[i].src = `/Karten/${player.Hand[i].img}`;
  }
};

const dealHands = function () {
  for (let i = 0; i < 2; i++) {
    let card = deck.pop();
    dealer.Hand.push(card);
    card = deck.pop();
    player.Hand.push(card);
    displayCards();
  }
};

const dealCard = function (id) {
  let card = deck.pop();
  id.Hand.push(card);
  displayCards();
};

const addScores = function () {
  let dealerTotal = dealer.Hand.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.Value;
  }, 0);
  if (dealer.Hand.length < 3) dealerTotal -= dealer.Hand[0].Value;
  dealerEle.textContent = dealerTotal;

  let playerTotal = player.Hand.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.Value;
  }, 0);
  playerEle.textContent = playerTotal;
};

const startGame = function () {
  if (bet > 0) {
    toggleBtnsBet("add");
    toggleBtnsGame("remove");
    btnStartGame.classList.add("hidden");
    dealHands();
    displayCards();
    addScores();
    checkWinner();
  }
};

//dealHands();

//displayCards();
//const subtractBet = function (bankSubtract) {
//if (bank >= bankSubtract) {
//bank -= bankSubtract;
//bankEle.textContent = bank;
//}
//};

btnNewGame.addEventListener("click", newGame);
btnStartGame.addEventListener("click", startGame);
btnDraw.addEventListener("click", () => {
  dealCard(player);
  addScores();
  checkWinner();
});
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
