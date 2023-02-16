function createDeck() {
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

const deck = createDeck(); // This will return an array with 52 cards
console.log(deck); // ['2♠', '2♡', '2♢', '2♣', '3♠', '3♡', '3♢', '3♣', ... , 'A♠', 'A♡', 'A♢', 'A♣']

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

const deck = createDeck(); // Assumes you already have a function to create a deck
const shuffledDeck = shuffleDeck(deck); // This will shuffle the deck randomly
console.log(shuffledDeck); // Outputs the shuffled deck in the console

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createPlayer(name) {
  const player = {
    name: name,
    cards: []
  };

  return player;
}

const player1 = createPlayer('Player 1'); // This will create a player object with an empty `cards` array
console.log(player1); // Outputs the player object in the console


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dealHands(deck, smallBlind, bigBlind) {
  const players = [smallBlind, bigBlind];
  let currentPlayerIndex = 0;

  for (let i = 0; i < 4; i++) {
    const card = deck.shift(); // Remove the top card from the deck

    players[currentPlayerIndex].cards.push(card); // Add the card to the current player's hand
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Switch to the next player in the array
  }

  return [smallBlind, bigBlind];
}

const deck = createDeck(); // Create a deck of cards
shuffleDeck(deck); // Shuffle the deck
const smallBlind = createPlayer('Small Blind'); // Create the small blind player
const bigBlind = createPlayer('Big Blind'); // Create the big blind player

dealHands(deck, smallBlind, bigBlind); // Deal 4 cards from the deck, alternating between the two players
console.log(smallBlind); // Outputs the small blind player object in the console, with 2 cards in its `cards` array
console.log(bigBlind); // Outputs the big blind player object in the console, with 2 cards in its `cards` array

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
