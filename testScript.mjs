//test script
import * as functions from "./javascript_funtions.mjs";

const deck = functions.createDeck();                    // This will return an array with 52 cards
//console.log(deck);                                      // ['2♠', '2♡', '2♢', '2♣', '3♠', '3♡', '3♢', '3♣', ... , 'A♠', 'A♡', 'A♢', 'A♣']

var shuffledDeck = functions.shuffleDeck(deck);         // This will shuffle the deck randomly
//console.log(shuffledDeck);                              // Outputs the shuffled deck in the console

shuffledDeck = functions.shuffleDeck(shuffledDeck);     // This will shuffle the deck randomly
// console.log(shuffledDeck);                           // Outputs the shuffled deck in the console

const player1 = functions.createPlayer('Player 1');     // This will create a player object with an empty `cards` array
const player2 = functions.createPlayer('Player 2');     // This will create a player object with an empty `cards` array



functions.dealHands(deck, player1, player2);            // Deal 4 cards from the deck, alternating between the two players
//                                                         //player1 is small blind; player 2 is big blind
console.log(player1);                                   // Outputs the small blind player object in the console, with 2 cards in its `cards` array
console.log(player2);                                   // Outputs the big blind player object in the console, with 2 cards in its `cards` array

const commCards = functions.genCommArray();
// console.log(commCards);
functions.dealFlop(shuffledDeck, commCards);
// console.log(commCards);
functions.dealTurn(shuffledDeck, commCards);
// console.log(commCards);
functions.dealRiver(shuffledDeck, commCards);
console.log(commCards);

//TEST FOR SPECIAL CASE STRAIGHT

// const player1 = { name: 'Player 1', cards: [ '2♠', '4♡' ] }
// const player2 = { name: 'Player 2', cards: [ 'A♢', '4♣' ] }
// var commCards = [ '6♡', '5♡', '3♢', '3♣', '7♠' ];

//TEST FOR HIGH STRAIGHT

// const player1 = { name: 'Player 1', cards: [ '9♠', 'K♡' ] }
// const player2 = { name: 'Player 2', cards: [ 'A♢', 'K♣' ] }
// var commCards = [ 'J♡', '10♡', '3♢', '3♣', 'Q♠' ];

//TEST FOR MID STRAIGHT

// const player1 = { name: 'Player 1', cards: [ '2♠', '4♡' ] }
// const player2 = { name: 'Player 2', cards: [ '8♢', '4♣' ] }
// var commCards = [ '6♡', '5♡', 'Q♢', 'J♣', '7♠' ];

// const player1 = { name: 'Player 1', cards: [ 'J♢', 'J♠' ] };
// const player2 = { name: 'Player 2', cards: [ '2♢', '2♡' ] };
// var commCards = [ '4♣', '9♡', 'K♠', '4♡', '8♠' ];

//TEST FOR STRAIGHT FLUSH
//not thuroughly tested

// const player1 ={ name: 'Player 1', cards: [ '8♡', '4♡' ] }
// const player2 = { name: 'Player 2', cards: [ '9♢', 'Q♢' ] }
// var commCards = [ '8♠', 'K♢', '8♢', 'J♢', '10♣' ]

var winner = functions.determineWinner(player1, player2, commCards)
console.log(winner)