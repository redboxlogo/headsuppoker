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
  //console.log(player1Hand);
  //console.log(player2Hand);

  const player1Rank = rankHand(player1Hand); // Determine the rank of player 1's hand using a separate function
  const player2Rank = rankHand(player2Hand); // Determine the rank of player 2's hand using a separate function

  //console.log(player1Rank);
  //console.log(player2Rank);
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
  //console.log(cards);
  const sortedCards = sortCardsByRank(cards);

  //console.log(sortedCards);

  if(isFlush(sortedCards)){
    console.log("FLUSH");
  }

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
    //"1" is first character of 10, so assign it a weight of 9. A is defined as 13, 1 is not needed. 
    const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
    return rankOrder[a[0]] - rankOrder[b[0]];
  });
}

//////////////////////////////////////////////////////////////////////////////////

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

//Not working
function isStraight(cards) {
  // // Check for the special case of A-5-4-3-2, which is a valid straight
  // if (cards[0][0] === 'A' && cards[1][0] === 'Five' && cards[2][0]] === 'Four' && cards[3][0] === 'Three' && cards[4][0] === 'Two') {
  //   return true;
  // }

  // for (let i = 0; i < cards.length - 1; i++) {
  //   if (cards[i].rank !== cards[i + 1].rank - 1) {
  //     return false;
  //   }
  // }
  // return true;
  // To check for a straight
  // Iterate through hand from top rank to low rank, looking for 5 in a row. Duplicates will be handled in the next iteration of loop anyways.
  // Also need to add one final check for A-2-3-4-5 straight which will wrap around the array.
  // var straightCount = 0;
  // const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  // for(var i = 6; i > 4; i--){
  //   var startCard = cards[i][0];
  //   for(var j = 1; j < 5; j++){
  //     if((rankOrder[startCard] - j) == cards[i - j][1]){
  //       straightCount++;
  //     } else {
  //       break; 
  //     }
  //     if(straightCount == 5){ return true; }
  //   }
  //   straightCount = 0;
  // } //Check for A-2-3-4-5 condition
  // if()
  // return false;
}


//Working
function isFlush(cards) {
  // To check for a flush
  // Iterate through hand from top rank to low rank, looking for 5 of same suit. 
  // No need to check 4th card, as there isn't enough for a flush anyways
var flushCount = 0;
  for(var i = 6; i > 4; i--){
    var curSuit = cards[i][1];
    for(var j = i; j > 0; j--){
      if(curSuit == cards[j][1]){ flushCount++;}
      if(flushCount == 5){ return true; }
    }
    flushCount = 0;
  }
  return false;
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
