console.log("JS Linked!");

// $(document).ready(function(){
//   console.log("Ready to do something!")
// });
var gameWon = false;
var deck;
var dealerCards = [];
var playerCards = [];
// var bankroll = 1000; //Might implement if I have time

var deckNames = [
  "sA", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "sJ", "sQ", "sK",
  "hA", "h02", "h03", "h04", "h05", "h06", "h07", "h08", "h09", "h10", "hJ", "hQ", "hK",
  "cA", "c02", "c03", "c04", "c05", "c06", "c07", "c08", "c09", "c10", "cJ", "cQ", "cK",
  "dA", "d02" , "d03", "d04", "d05", "d06", "d07", "d08", "d09", "d10", "dJ", "dQ", "dK",
  ];

function Card(cssName) {
  this.cssName = cssName;
  if (cssName.length === 3) {
    this.value = parseInt(cssName.slice(1))
  } else if (cssName.indexOf("A") > -1) {
    this.value = 11;
  } else {
    this.value = 10;
  }
};

function createObjDeck() {
  var deck = [];
  for (var i = 0; i < deckNames.length; i++) {
    deck.push(new Card(deckNames[i]));
  }
  return deck;
};

//Shuffle deckNames Array using Lodash (Maybe redundant)
var shuffle = function(){
  deck = _.shuffle(createObjDeck());
};

//deal function that picks random number between 1 and 52,
//and returns a card and removes it from the deckNames array
var deal = function(){
  // console.log(card);
  if (deck === undefined) {
    shuffle();
  }
  var card = Math.floor(Math.random() * deck.length);
  return deck.splice(card,1)[0];
};

var dealPlayer = function(){
  var playerCard = deal();
  playerCards.push(playerCard);
  var score = calcPlayerScore();
  if(score >= 21){
    whoWon();
  }
};

function dealHand(hand) {
  hand.splice(0, hand.length);
  hand.push(deal(), deal());
  if(calcScore === 21){
    whoWon();
  }
};

function dealHouse() {
  while (calcDealerScore() < 17) {
    dealerCards.push(deal());
  }
  whoWon();
};

var calcPlayerScore = function(){
  var playerScore = 0;
  for(var i = 0; i < playerCards.length; i++){
    playerScore += playerCards[i].value;
  }
  return playerScore;
};

function calcScore(hand) {
  var score = 0;
    for(var i = 0; i < hand.length; i++){
    score += hand[i].value;
  };
  return score;
};

var calcDealerScore = function(){
  var dealerScore = 0;
  for(var i = 0; i < dealerCards.length; i++){
    dealerScore += dealerCards[i].value;
  };
  return dealerScore;
};

var whoWon = function(){
  var dealerScore = calcDealerScore();
  var playerScore = calcScore(playerCards);
  if (playerScore === 21 && dealerScore != 21){
    console.log("21! Player Wins!");
    window.alert("21! Player Wins!");
  } else if (playerScore > 21){
    console.log("Player Busts! Dealer Wins!");
    window.alert("Player Busts! Dealer Wins!");
  } else if (dealerScore === 21 && playerScore != 21){
    console.log("21! Dealer Wins!");
    window.alert("21! Dealer Wins!");
  } else if (playerScore > dealerScore && playerScore <= 21){
    console.log("Player Wins!");
    window.alert("Player Wins!");
  } else if (dealerScore > playerScore && dealerScore <= 21){
    console.log("Dealer Wins!");
    window.alert("Dealer Wins!");
  } else if (dealerScore > 21 && playerScore <=21){
    console.log("Dealer Busts! Player Wins!");
    window.alert("Dealer Busts! Player Wins!");
  } else if(dealerScore === playerScore){
    console.log("It's a Push!");
    window.alert("It's a Push!");
  }
  render();
};

function render() {
  $('#playerScore').text("Player: " + calcPlayerScore());
  $('#dealerScore').text("Dealer: " + calcDealerScore());
};



// Welcome screen and FadeOut
$('#start').on('click', function(){
  $(this).parent('#welcome').fadeOut(1000);
  shuffle();
});

$('#deal').on('click', function(){
  dealHand(playerCards);
  dealHand(dealerCards);
  $('#playerScore').text("Player: " + calcPlayerScore());
});

$('#hit').on('click', function(){
    dealPlayer();
    calcScore(playerCards);
    render();
});

$('#stay').on('click', function(){
    dealHouse();
    calcScore(dealerCards);
    render();
});



