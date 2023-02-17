export function createDeck() {
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = ['♠', '♡', '♢', '♣'];
  const deck = [];

  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      const card = ranks[i] + suits[j];
      deck.push(card);
    }
  }

  return deck;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function createPlayer(name) {
  const player = {
    name: name,
    cards: []
  };

  return player;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function dealHands(deck, smallBlind, bigBlind) {
  const players = [smallBlind, bigBlind];
  let currentPlayerIndex = 0;

  for (let i = 0; i < 4; i++) {
    const card = deck.shift(); // Remove the top card from the deck

    players[currentPlayerIndex].cards.push(card); // Add the card to the current player's hand
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player in the array
  }

  return [smallBlind, bigBlind];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function dealFlop(deck, commCards){
  deck.shift(); //burn
  commCards[0] = deck.shift(); //Flop 1
  commCards[1] = deck.shift(); //Flop 2
  commCards[2] = deck.shift(); //Flop 3
  return;
}

export function dealTurn(deck, commCards){
  deck.shift(); //burn
  commCards[3] = deck.shift(); //Turn
  return;
}

export function dealRiver(deck, commCards){
  deck.shift(); //burn
  commCards[4] = deck.shift(); //River
  return;
}

export function genCommArray(){
  return new Array(5);
}

/*export function playGame(){
  const commCards[5];

  const deck = createDeck();
  shuffleDeck(deck)


}*/
