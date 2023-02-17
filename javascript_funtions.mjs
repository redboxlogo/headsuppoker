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

export function determineWinner(player1, player2, communityCards) {
  const player1Hand = player1.cards.concat(communityCards); // Concatenate the player's two cards with the community cards
  const player2Hand = player2.cards.concat(communityCards); // Concatenate the player's two cards with the community cards

  const player1Rank = rankHand(player1Hand); // Determine the rank of player 1's hand using a separate function
  const player2Rank = rankHand(player2Hand); // Determine the rank of player 2's hand using a separate function

  if (player1Rank > player2Rank) {
    return player1;
  } else if (player2Rank > player1Rank) {
    return player2;
  } else {
    // If the two hands have the same rank, compare the high cards
    const player1HighCard = getHighCard(player1Hand);
    const player2HighCard = getHighCard(player2Hand);

    if (player1HighCard > player2HighCard) {
      return player1;
    } else if (player2HighCard > player1HighCard) {
      return player2;
    } else {
      return null; // The game is a tie
    }
  }
}

function rankHand(cards) {
  const sortedCards = sortCardsByRank(cards);

  if (isRoyalFlush(sortedCards)) {
    return 10;
  } else if (isStraightFlush(sortedCards)) {
    return 9;
  } else if (isFourOfAKind(sortedCards)) {
    return 8;
  } else if (isFullHouse(sortedCards)) {
    return 7;
  } else if (isFlush(sortedCards)) {
    return 6;
  } else if (isStraight(sortedCards)) {
    return 5;
  } else if (isThreeOfAKind(sortedCards)) {
    return 4;
  } else if (isTwoPair(sortedCards)) {
    return 3;
  } else if (isPair(sortedCards)) {
    return 2;
  } else {
    return 1;
  }
}

function sortCardsByRank(cards) {
  return cards.sort((a, b) => {
    const rankOrder = {Ace: 1, Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13};
    return rankOrder[a.rank] - rankOrder[b.rank];
  });
}

function isPair(cards) {
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].rank === cards[i + 1].rank) {
      return true;
    }
  }
  return false;
}

function isTwoPair(cards) {
  let pairs = 0;
  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].rank === cards[i + 1].rank) {
      pairs++;
      i++;
    }
  }
  return pairs === 2;
}

function isThreeOfAKind(cards) {
  for (let i = 0; i < cards.length - 2; i++) {
    if (cards[i].rank === cards[i + 1].rank && cards[i + 1].rank === cards[i + 2].rank) {
      return true;
    }
  }
  return false;
}

function isStraight(cards) {
  // Check for the special case of A-5-4-3-2, which is a valid straight
  if (cards[0].rank === 'Ace' && cards[1].rank === 'Five' && cards[2].rank === 'Four' && cards[3].rank === 'Three' && cards[4].rank === 'Two') {
    return true;
  }

  for (let i = 0; i < cards.length - 1; i++) {
    if (cards[i].rank !== cards[i + 1].rank - 1) {
      return false;
    }
  }
  return true;
}

function isFlush(cards) {
  const suits = cards.map(card => card.suit);
  return suits.every(suit => suit === suits[0]);
}

function isFullHouse(cards) {
  return isThreeOfAKind(cards) && isPair(cards);
}

function isFourOfAKind(cards) {
  for (let i = 0; i < cards.length - 3; i++) {
    if (cards[i].rank === cards[i + 1].rank && cards[i + 1].rank === cards[i + 2].rank && cards[i + 2].rank === cards[i + 3].rank) {
      return true;
    }
  }
  return false;
}

function isStraightFlush(cards) {
  return isFlush(cards) && isStraight(cards);
}

function isRoyalFlush(cards) {
  return isStraightFlush(cards) && cards[0].rank === 'Ten' && cards[4].rank === 'Ace';
}

function getHighCard(cards) {
  return sortCardsByRank(cards)[4].rank;
}


/*export function playGame(){
  const commCards[5];

  const deck = createDeck();
  shuffleDeck(deck)


}*/
