//test scriptpass array in javascript
import * as functions from "./javascript_funtions.mjs";

const deck = functions.createDeck();                    // This will return an array with 52 cards

var shuffledDeck = functions.shuffleDeck(deck);         // This will shuffle the deck randomly

const player1 = functions.getBuyIns("player 1", 10000);                  // This will create a player object with an empty `cards` array
const player2 = functions.getBuyIns("player 2", 10000);                  // This will create a player object with an empty `cards` array

// functions.dealHands(shuffledDeck, player1, player2);            // Deal 4 cards from the deck, alternating between the two players
                                                        //player1 is small blind; player 2 is big blind
// console.log(player1);                                   // Outputs the small blind player object in the console, with 2 cards in its `cards` array
// console.log(player2);                                   // Outputs the big blind player object in the console, with 2 cards in its `cards` array



const commCards = functions.genTable();
// functions.placeBet(player1,commCards);
// functions.placeBet(player2,commCards);
// console.log(commCards.cards);
// functions.dealFlop(shuffledDeck, commCards.cards);
// console.log(commCards.cards);
// functions.placeBet(player1,commCards);
// functions.placeBet(player2,commCards);
// functions.dealTurn(shuffledDeck, commCards.cards);
// console.log(commCards.cards);
// functions.placeBet(player1,commCards);
// functions.placeBet(player2,commCards);
// functions.dealRiver(shuffledDeck, commCards.cards);
// console.log(commCards.cards);
// functions.placeBet(player1,commCards);
// functions.placeBet(player2,commCards);

/*console.log("HERE");
console.log(player1);
functions.testPass(player1);
console.log(player1);*/


//TEST FOR SPECIAL CASE STRAIGHT

// player1.hand = [ '9♠', '4♡' ] 
// player2.hand = [ 'A♢', '4♣' ]
// commCards.cards = [ '6♡', '5♡', '2♢', '3♣', '7♠' ];

//TEST FOR HIGH STRAIGHT

// player1.hand = [ '9♠', 'K♡' ];
// player2.hand = [ 'A♢', 'K♣' ];
// commCards.cards = [ 'J♡', '10♡', '3♢', '3♣', 'Q♠' ];

//TEST FOR MID STRAIGHT

// player1.hand = [ '2♠', '4♡' ]; 
// player2.hand = [ '8♢', '4♣' ];
// commCards.cards = [ '6♡', '5♡', 'Q♢', '2♣', '7♠' ];

//TEST FOR low STRAIGHT
// player1.hand = [ 'A♠', '5♠' ];
// player2.hand = [ '3♢', '4♡' ];
// commCards.cards = [ '5♣', 'J♠', '7♠', 'Q♠', '6♠' ];


//TEST FOR STRAIGHT FLUSH
// not theroughly tested

player1.hand = [ '8♡', '4♡' ] 
player2.hand = [ '9♢', 'Q♢' ] 
commCards.cards = [ '8♠', '10♢', '8♢', 'J♢', '10♣' ]

// TEST FOR QUADS("FOUR OF A KIND")
// not theroughly tested

// player1.hand = [ 'J♢', 'J♠' ];
// player2.hand = [ '2♢', '2♡' ];
// commCards.cards = [ '2♣', 'J♡', 'K♠', 'J♣', '2♠' ];


// TEST FOR FLUSH
// player1.hand = [ 'A♠', '3♠' ];
// player2.hand = [ '3♢', '4♡' ];
// commCards.cards = [ '6♣', '5♠', 'K♠', 'Q♠', '7♠' ];


// console.log(player1);
// console.log(player2);
var winner = functions.determineWinner(player1, player2, commCards);
console.log(player1);
console.log(player2);
console.log("%%%%%%%%%%%%%%%%%%%%%\nTEST WINNER\n%%%%%%%%%%%%%%%%%%%%% ");
console.log(winner);
