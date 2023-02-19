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

function createPlayer(name, buyin) {
  const player = {
    name: name,
    cards: [],
    chipCount: buyin,
  };

  return player;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// may need to pass MAXBUYIN or MINBUYIN argument to ensure player does not exceed max/min buy in
// "prompt()" only available in browser commands, may need in future

// const playerName = prompt(`Enter player's name:`);
// let buyIn = parseFloat(prompt(`Enter ${playerName}'s buy-in amount:`));

// // Validate input
// while (isNaN(buyIn) || buyIn <= 0) {
//   buyIn = parseFloat(prompt(`Invalid input. Enter a valid buy-in amount for ${playerName}:`));
// }

export function getBuyIns(playername, buyin) {

  const Player = createPlayer(playername, buyin)

  return Player;
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function placeBet(player, commCards) {
  // const bet = prompt(`Enter bet amount for ${player.name}: `);

  console.log("place your bet")
  //hard coded for testing
  const bet = 100
  const parsedBet = parseFloat(bet);

  if (isNaN(parsedBet) || parsedBet <= 0) {
    console.log(`Invalid bet amount.`);
    return false;
  }

  if (parsedBet > player.chipCount) {
    console.log(`Bet amount exceeds chip count.`);
    return false;
  }

  player.chipCount -= parsedBet;
  console.log(`${player.name} bets ${parsedBet}.`);
  commCards.pot += parsedBet;
  return bet;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function genTable(){
  const table ={
    cards: new Array(5),
    pot: 0
  };
  return table;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function determineWinner(player1, player2, communityCards) {
  const Cards = communityCards.cards
  const player1Hand = player1.cards.concat(Cards); // Concatenate the player's two cards with the community cards
  const player2Hand = player2.cards.concat(Cards); // Concatenate the player's two cards with the community cards

  const player1Rank = rankHand(player1Hand); // Determine the rank of player 1's hand using a separate function
  const player2Rank = rankHand(player2Hand); // Determine the rank of player 2's hand using a separate function

  if (player1Rank > player2Rank) {
    player1.chipCount += communityCards.pot
    return player1;
  } else if (player2Rank > player1Rank) {
    player2.chipCount += communityCards.pot
    return player2;
  } else {

    // TODO:
    // need to differentiate if a player has a better rank of the same hand
    // i.e pair of 5 is better than pair 3, but our function cant see that 



    // If the two hands have the same rank, compare the high cards
    const player1HighCard = getHighCard(player1Hand);
    const player2HighCard = getHighCard(player2Hand);

    if (player1HighCard > player2HighCard) {
      player1.chipCount += communityCards.pot
      return player1;
    } else if (player2HighCard > player1HighCard) {
      player2.chipCount += communityCards.pot
      return player2;
    } else {
      return null; // The game is a tie
    }
  }
}

function sortCardsByRank(cards) {
  return cards.sort((a, b) => {
    //"1" is first character of 10, so assign it a weight of 9. A is defined as 13, 1 is not needed. 
    const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
    return rankOrder[a[0]] - rankOrder[b[0]];
  });
}

function rankHand(cards) {
  // console.log(cards);
  const sortedCards = sortCardsByRank(cards);

  // console.log(sortedCards);

  // if(isStraight(sortedCards)){
  //   console.log("STRAIGHT");
  // }

  // if(isFlush(sortedCards)){
  //   console.log("FLUSH");
  // }

  // if(isStraightFlush(sortedCards)){
  //   console.log("STRAIGHT FLUSH");
  // }

  // if(isFourOfAKind(sortedCards)){
  //   console.log("QUADS");
  // }

  // if(isThreeOfAKind(sortedCards)){
  //   console.log("3oak");
  // }

  // if(isTwoPair(sortedCards)){
  //   console.log("2 pair");
  // }

  // if(isPair(sortedCards)){
  //   console.log("pair");
  // }

  if (isRoyalFlush(sortedCards)) {
    return 10;
  } else if (isStraightFlush(sortedCards)) {
    return 9;
  } else if (isFourOfAKind(sortedCards)) {          // Working
    return 8;
  } else if (isFullHouse(sortedCards)) {            // Working
    return 7;
  } else if (isFlush(sortedCards)) {                // Working
    return 6;
  } else if (isStraight(sortedCards)) {             // Working
    return 5;
  } else if (isThreeOfAKind(sortedCards)) {         // Working
    return 4;
  } else if (isTwoPair(sortedCards)) {              // Working
    return 3;
  } else if (isPair(sortedCards)) {                 // Working
    return 2;
  } else {
    return 1;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Not Working
function getHighCard(cards) {
  console.log(sortCardsByRank(cards)[cards.length-1][0])
  return sortCardsByRank(cards)[cards.length-1][0];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Working
function isRoyalFlush(cards) {
  return isStraightFlush(cards) && cards[0].rank === 'Ten' && cards[4].rank === 'Ace';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for higher quads (do in determineWinner()? )
function isStraightFlush(cards) {
  return isFlush(cards) && isStraight(cards);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for higher quads (do in determineWinner()? )
function isFourOfAKind(cards) {

  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = []
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < cards.length; i++){
    CardRanks[i] = cards[i][0];
    CardRanks[i] = rankOrder[CardRanks[i]];
  }

  //need 4 iterations of loop to check 7 card slots
  for (let i = 0; i < 4; i++) {
    if (CardRanks[i] === CardRanks[i + 1] && CardRanks[i + 1] === CardRanks[i + 2] && CardRanks[i + 2] === CardRanks[i + 3]) {
      return true;
    }
  }
  return false;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Working
// need to check for higher full house (do in determineWinner()? )
function isFullHouse(cards) {
  return isThreeOfAKind(cards) && isTwoPair(cards);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for high card (do in determineWinner()? )
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for high card (do in determineWinner()? )
function isStraight(cards) {
  
  let straightBool = false;
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = [];

  // get ranks for each card
  // assign weights for each card value

  for(var i = 0; i < cards.length; i++){
    CardRanks[i] = cards[i][0];
    CardRanks[i] = rankOrder[CardRanks[i]];
  }

  // function to get unique card ranks from array
  var UniqueRanks = CardRanks.filter((value, index, self) => {    
    return self.indexOf(value) === index;
  });

  // impossible for stright if there are not at least 5 unique ranks
  if(UniqueRanks.length < 5){
    return false;
  }


  // Check for the special case of A-5-4-3-2, which is a valid straight
  if (UniqueRanks.includes('13') && UniqueRanks.includes('4') && UniqueRanks.includes('3') && UniqueRanks.includes('2') && UniqueRanks.includes('1')) {
    straightBool = true;
  }


  // Check for low straights 
  if(straightBool == false){
    for (let i = 0; i < 4; i++) {
      if (UniqueRanks[i] == UniqueRanks[i+1] - 1) {
        straightBool = true;
      } 
      else{
        straightBool = false;
        break;
      }
    }
  }

  // Check for high straights
  if(straightBool == false){

    for (let i = UniqueRanks.length-1; i > UniqueRanks.length-5; i--) {
      if (UniqueRanks[i] == UniqueRanks[i-1] + 1) {
        straightBool = true;
      } 
      else{
        straightBool = false;
        break;
      }
    }
  }

  // Check for middle straights 
  if(straightBool == false){
    for (let i = 1; i < 5; i++) {
      if (UniqueRanks[i] == UniqueRanks[i+1] - 1) {
        straightBool = true;
      } 
      else{
        straightBool = false;
        break;
      }
    }
  }

  if(straightBool == true){
    return true;
  } else{
    return false;
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Working
// need to check for high card (do in determineWinner()? )

function isThreeOfAKind(cards) {

  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = []
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < cards.length; i++){
    CardRanks[i] = cards[i][0];
    CardRanks[i] = rankOrder[CardRanks[i]];
  }

  //need 5 iterations of loop to check 7 card slots
  for (let i = 0; i < 5; i++) {
    if (CardRanks[i] === CardRanks[i + 1] && CardRanks[i + 1] === CardRanks[i + 2] ) {
      return true;
    }
  }

  return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Working
// need to check for high card (do in determineWinner()? )

function isTwoPair(cards) {
  let pairs = 0;
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = []
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < cards.length; i++){
    CardRanks[i] = cards[i][0];
    CardRanks[i] = rankOrder[CardRanks[i]];
  }

  for (let i = 0; i < cards.length - 1; i++) {
    if (CardRanks[i] === CardRanks[i + 1] ) {
      pairs++;
      i++;
    }
  }
  return pairs === 2;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Working
// need to check for high card (do in determineWinner()? )

function isPair(cards) {
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = []
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < cards.length; i++){
    CardRanks[i] = cards[i][0];
    CardRanks[i] = rankOrder[CardRanks[i]];
  }

  //need 6 iterations of loop to check 7 card slots
  for (let i = 0; i < 6; i++) {
    if (CardRanks[i] === CardRanks[i + 1] ) {
      return true;
    }
  }
  return false;
}

/*export function playGame(){
  const commCards[5];

  const deck = createDeck();
  shuffleDeck(deck)


}*/
