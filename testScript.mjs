//test script
import * as functions from "./javascript_funtions.mjs";

const deck = functions.createDeck();                    // This will return an array with 52 cards
console.log(deck);                                      // ['2♠', '2♡', '2♢', '2♣', '3♠', '3♡', '3♢', '3♣', ... , 'A♠', 'A♡', 'A♢', 'A♣']

var shuffledDeck = functions.shuffleDeck(deck);         // This will shuffle the deck randomly
console.log(shuffledDeck);                              // Outputs the shuffled deck in the console

// shuffledDeck = functions.shuffleDeck(shuffledDeck);  // This will shuffle the deck randomly
// console.log(shuffledDeck);                           // Outputs the shuffled deck in the console

const player1 = functions.createPlayer('Player 1');     // This will create a player object with an empty `cards` array

const player2 = functions.createPlayer('Player 2');     // This will create a player object with an empty `cards` array

functions.dealHands(deck, player1, player2);            // Deal 4 cards from the deck, alternating between the two players
                                                        //player1 is small blind; player 2 is big blind
console.log(player1);                                // Outputs the small blind player object in the console, with 2 cards in its `cards` array
console.log(player2);                                  // Outputs the big blind player object in the console, with 2 cards in its `cards` array

const commCards = functions.genCommArray();
console.log(commCards);
functions.dealFlop(shuffledDeck, commCards);
console.log(commCards);
functions.dealTurn(shuffledDeck, commCards);
console.log(commCards);
functions.dealRiver(shuffledDeck, commCards);
console.log(commCards);

var winner = functions.determineWinner(player1, player2, commCards)
console.log(winner)