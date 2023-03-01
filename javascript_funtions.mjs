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
    hand: new Array(2),
    chipCount: buyin,
    sortedHand: [],
    winningHand: new Array(5),
    FlushBool: 0,
    StraightBool: 0,
    ThreeOfaKindBool: 0,
    TwoPairBool: 0,
    PairBool: 0,
  };

  Object.seal(player)

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

    players[currentPlayerIndex].hand.push(card); // Add the card to the current player's hand
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

  Object.seal(table)

  return table;
}

export function testPass(player){
  player.chipCount = 1;
  return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function determineWinner(player1, player2, communityCards) {

  player1.sortedHand = sortCardsByRank(player1.hand.concat(communityCards.cards));
  player2.sortedHand = sortCardsByRank(player2.hand.concat(communityCards.cards));

  const player1Rank = rankHand(player1); // Determine the rank of player 1's hand 
  const player2Rank = rankHand(player2); // Determine the rank of player 2's hand 

  

  if (player1Rank > player2Rank) {
    player1.chipCount += communityCards.pot;
    return player1;
  } else if (player2Rank > player1Rank) {
    player2.chipCount += communityCards.pot;
    return player2;
  } else {

    // TODO:
    // need to differentiate if a player has a better rank of the same hand
    // i.e pair of 5 is better than pair 3, but our function cant see that 



    // If the two hands have the same rank, compare the high cards
    const player1HighCard = getHighCard(player1.hand);
    const player2HighCard = getHighCard(player2.hand);

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

function rankHand(player) {
  //console.log("Cards " + cards);
  console.log(player.sortedHand);

  if (isRoyalFlush(player)) {                  // not working
    return 10;
  } else if (isStraightFlush(player)) {        // Working
    return 9;
  } else if (isFourOfAKind(player)) {          // Working
    return 8;
  } else if (isFullHouse(player)) {            // Working
    return 7;
  } else if (isFlush(player)) {                // Working
    return 6;
  } else if (isStraight(player)) {             // Working
    return 5;
  } else if (isThreeOfAKind(player)) {         // Working
    return 4;
  } else if (isTwoPair(player)) {              // Working
    return 3;
  } else if (isPair(player)) {                 // Working
    return 2;
  } else {
    return 1;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Not Working
function getHighCard(cards) {
  //console.log(sortCardsByRank(cards)[cards.length-1][0])
  return sortCardsByRank(cards)[cards.length-1][0];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// not Working
function isRoyalFlush(player) {
  console.log("Checking Royal Flush...");
  return (player.isFlush && player.winningHand[0][0] == 10 && player.winningHand[4][0] == A);
  //return isStraightFlush(cards) && cards[0].rank === 'Ten' && cards[4].rank === 'Ace';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for higher quads (do in determineWinner()? )modify or
function isStraightFlush(player) {
  console.log("Checking Straight Flush...");
  if(player.isFlush && player.isStraight){
    //verifyStraightFlush(player); //Need to ensure straightFlush is returned. 
    // Edge case is if there is a 6-card flush, and straight consists of lower 5 cards. isFlush() will return high 5 cards which
    // will not include the straight. There will be a separate function to handle this edge case. I'm sure there will be more
    // edge cases as well. 
  }
  return (player.isFlush && player.isStraight);
  //return isFlush(cards) && isStraight(cards);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for higher quads (do in determineWinner()? )
function isFourOfAKind(player) {

  console.log("Checking 4 Of A Kind...");
   const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = [];
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < player.sortedHand.length; i++){
    CardRanks[i] = player.sortedHand[i][0];
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
function isFullHouse(player) {
  console.log("Checking Full House...");
  return (player.isThreeOfAKind && player.isTwoPair);
  //return isThreeOfAKind(cards) && isTwoPair(cards);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for high card (do in determineWinner()? )
function isFlush(player) {
  console.log("Checking Flush...");
  // To check for a flush
  // Iterate through hand from top rank to low rank, looking for 5 of same suit. 
  // No need to check 4th card, as there isn't enough for a flush anyways
var flushCount = 0;
var highCard = 0;

  for(var i = 6; i > 4; i--){
    var curSuit = player.sortedHand[i][1];
    for(var j = i; j > 0; j--){
      if(curSuit == player.sortedHand[j][1]){ flushCount++;}
    }
    if(flushCount >= 5){ //We have a flush. Determine best flush and set it in player.winningHand before returning true
      for(i = 0; i < player.sortedHand.length; i++){
        if((getRank(player.sortedHand[i]) > highCard) && (player.sortedHand[i][1] == curSuit)){
          //If we have a new higher card that's of the flush suit, push all cards down a slot and put this high card at the top
          
          // why not use shift()?
          
          highCard = getRank(player.sortedHand[i]);
          player.winningHand[0] = player.winningHand[1];
          player.winningHand[1] = player.winningHand[2];
          player.winningHand[2] = player.winningHand[3];
          player.winningHand[3] = player.winningHand[4];
          player.winningHand[4] = player.sortedHand[i];
        }
      }
      player.FlushBool = 1;
      return true; 
    }
    flushCount = 0;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Working
// need to check for high card (do in determineWinner()? )
function isStraight(player) {
  console.log("Checking Straight...");
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = [];

  // get ranks for each card
  // assign weights for each card value

  for(var i = 0; i < player.sortedHand.length; i++){
    CardRanks[i] = player.sortedHand[i][0];
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

  // Check for the special case of A-5-4-3-2, which is a valid straight (Working)
  if (UniqueRanks.includes(13) && UniqueRanks.includes(4) && UniqueRanks.includes(3) && UniqueRanks.includes(2) && UniqueRanks.includes(1)) {
    player.StraightBool = 1;
    if(CardRanks.includes(13)){
      let index = CardRanks.indexOf(13); // Get the index of the element
      player.winningHand.push(player.sortedHand[index]); // Add the element to the new array
    }
    if(CardRanks.includes(1)){
      let index = CardRanks.indexOf(1); // Get the index of the element
      player.winningHand.push(player.sortedHand[index]); // Add the element to the new array
    }
    if(CardRanks.includes(2)){
      let index = CardRanks.indexOf(2); // Get the index of the element
      player.winningHand.push(player.sortedHand[index]); // Add the element to the new array
    }
    if(CardRanks.includes(3)){
      let index = CardRanks.indexOf(3); // Get the index of the element
      player.winningHand.push(player.sortedHand[index]); // Add the element to the new array
    }
    if(CardRanks.includes(4)){
      let index = CardRanks.indexOf(4); // Get the index of the element
      player.winningHand.push(player.sortedHand[index]); // Add the element to the new array
    }

  }

  // optimization in progress
  // if(player.StraightBool == false){
  //   for (let i = 0; i < UniqueRanks.length-4; i++) {
  //     if (UniqueRanks[i] == UniqueRanks[i+1] - 1 && UniqueRanks[i] == UniqueRanks[i+2] - 2 && UniqueRanks[i] == UniqueRanks[i+3] - 3 && UniqueRanks[i] == UniqueRanks[i+4] - 4) {
  //       player.StraightBool = true;
  //     } 
  //     else{
  //       player.StraightBool = false;
  //       break;
  //     }
  //   }
  // }

  // Check for low straights 
  if(player.StraightBool == 0){
    for (let i = 0; i < 4; i++) {
      if (UniqueRanks[i] == UniqueRanks[i+1] - 1) {
        player.StraightBool = 1;
      } 
      else{
        player.StraightBool = 0;
        break;
      }
    }
  }

  // Check for high straights
  if(player.StraightBool == 0){

    for (let i = UniqueRanks.length-1; i > UniqueRanks.length-5; i--) {
      if (UniqueRanks[i] == UniqueRanks[i-1] + 1) {
        player.StraightBool = 1;
      } 
      else{
        player.StraightBool = 0;
        break;
      }
    }
  }

  // Check for middle straights 
  if(player.StraightBool == 0){
    for (let i = 1; i < 5; i++) {
      if (UniqueRanks[i] == UniqueRanks[i+1] - 1) {
        player.StraightBool = 1;
      } 
      else{
        player.StraightBool = 0;
        break;
      }
    }
  }

  if(player.StraightBool == 1){
    return true;
  } else{
    return false;
  }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Working
// need to check for high card (do in determineWinner()? )

function isThreeOfAKind(player) {
  console.log("Checking 3 Of A Kind...");
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = []
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < player.sortedHand.length; i++){
    CardRanks[i] = player.sortedHand[i][0];
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

function isTwoPair(player) {
  console.log("Checking Two Pair...");
  let pairs = 0;
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = []
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < player.sortedHand.length; i++){
    CardRanks[i] = player.sortedHand[i][0];
    CardRanks[i] = rankOrder[CardRanks[i]];
  }

  for (let i = 0; i < player.sortedHand.length - 1; i++) {
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

function isPair(player) {
  console.log("Checking Pair...");
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  var CardRanks = [];
  var pairFlag = 0;
  var pairRank = 0;
  var firstCard;
  var secondCard;
  // get ranks for each card
  // assign weights for each card value
  for(var i = 0; i < player.sortedHand.length; i++){
    CardRanks[i] = player.sortedHand[i][0];
    CardRanks[i] = rankOrder[CardRanks[i]];
  }

  //need 6 iterations of loop to check 7 card slots
  for (let i = 0; i < 6; i++) {
    if (CardRanks[i] === CardRanks[i + 1] ) {
      player.PairBool = 1;
      pairFlag = 1;
      pairRank = CardRanks[i][0];
      firstCard = CardRanks[i];
      secondCard = CardRanks[i+1];
      break;
    }
  }


  //Fill winning Hand array with top 5-ranked cards.
  for( let i = 0; i < 5; i++){
    player.winningHand[i] = player.sortedHand[i+2]
  }

  // player.winningHand[4] = player.sortedHand[6]; 
  // player.winningHand[3] = player.sortedHand[5];
  // player.winningHand[2] = player.sortedHand[4];
  // player.winningHand[1] = player.sortedHand[3];
  // player.winningHand[0] = player.sortedHand[2];

  //Now ensure pair is inside winningHand, else insert them.
  if((player.winningHand.indexOf(firstCard) == -1) || (player.winningHand.indexOf(secondCard) == -1)){ 
    //One or Zero cards from pair are in winning hand...
    for(i = 2; i < player.winningHand.length; i++){ //Iterate through winningHand to find insertion point
      if(player.winningHand[i][0] > pairRank){ //If current point is 
        player.winningHand.splice(i, 0, firstCard, secondCard); //Insert firstCard and secondCard into array.
        player.winningHand.shift();
        player.winningHand.shift();
      }
    }
  }

  if(pairFlag){
    return true;
  } else {
    return false;
  }
}

export function getRank(card){
  const rankOrder = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 1: 9, J: 10, Q: 11, K: 12, A: 13};
  return rankOrder[card[0]];
}

/*export function playGame(){
  const commCards[5];

  const deck = createDeck();
  shuffleDeck(deck)


}*/
