//test scriptpass array in javascript
import * as functions from "./javascript_funtions.mjs";

const deck = functions.createDeck();                    // This will return an array with 52 cards

var shuffledDeck = functions.shuffleDeck(deck);         // This will shuffle the deck randomly

const player1 = functions.getBuyIns("player 1", 10000);                  // This will create a player object with an empty `cards` array
const player2 = functions.getBuyIns("player 2", 10000);                  // This will create a player object with an empty `cards` array

functions.dealHands(shuffledDeck, player1, player2);            // Deal 4 cards from the deck, alternating between the two players
                                                        //player1 is small blind; player 2 is big blind
console.log(player1);                                   // Outputs the small blind player object in the console, with 2 cards in its `cards` array
console.log(player2);                                   // Outputs the big blind player object in the console, with 2 cards in its `cards` array



const commCards = functions.genTable();
//functions.placeBet(player1,commCards);
//functions.placeBet(player2,commCards);
// console.log(commCards);
functions.dealFlop(shuffledDeck, commCards.cards);
//console.log(commCards);
//functions.placeBet(player1,commCards);
//functions.placeBet(player2,commCards);
functions.dealTurn(shuffledDeck, commCards.cards);
//console.log(commCards);
//functions.placeBet(player1,commCards);
//functions.placeBet(player2,commCards);
functions.dealRiver(shuffledDeck, commCards.cards);
console.log(commCards);
//functions.placeBet(player1,commCards);
//functions.placeBet(player2,commCards);

/*console.log("HERE");
console.log(player1);
functions.testPass(player1);
console.log(player1);*/


//TEST FOR SPECIAL CASE STRAIGHT

// const player1 = { name: 'Player 1', cards: [ '2♠', '4♡' ] }
// const player2 = { name: 'Player 2', cards: [ 'A♢', '4♣' ] }
// var commCards = [ '6♡', '5♡', '3♢', '3♣', '7♠' ];

//TEST FOR HIGH STRAIGHT

// const player1 = { name: 'Player 1', cards: [ '9♠', 'K♡' ] }
// const player2 = { name: 'Player 2', cards: [ 'A♢', 'K♣' ] }
// var commCards = [ 'J♡', '10♡', '3♢', '3♣', 'Q♠' ];

//TEST FOR MID STRAIGHT

// const player1 = { name: 'Player 1', hand: [ '2♠', '4♡' ] }
// const player2 = { name: 'Player 2', hand: [ '8♢', '4♣' ] }
// var commCards = [ '6♡', '5♡', 'Q♢', '2♣', '7♠' ];

//TEST FOR STRAIGHT FLUSH
// not theroughly tested

// const player1 ={ name: 'Player 1', cards: [ '8♡', '4♡' ] }
// const player2 = { name: 'Player 2', cards: [ '9♢', 'Q♢' ] }
// var commCards = [ '8♠', 'K♢', '8♢', 'J♢', '10♣' ]

// TEST FOR QUADS("FOUR OF A KIND")
// not theroughly tested

// const player1 = { name: 'Player 1', cards: [ 'J♢', 'J♠' ] };
// const player2 = { name: 'Player 2', cards: [ '2♢', '2♡' ] };
// var commCards = [ '2♣', 'J♡', 'K♠', 'J♣', '2♠' ];

player1.hand = [ 'A♠', '5♠' ];
player2.hand = [ '3♢', '4♡' ];
commCards.cards = [ '6♣', 'J♠', 'K♠', 'Q♠', '7♠' ];


//console.log(player1);
var winner = functions.determineWinner(player1, player2, commCards);
console.log("%%%%%%%%%%%%%%%%%%%%%\nTEST WINNER\n%%%%%%%%%%%%%%%%%%%%% ");
console.log(winner);
//console.log(player1);