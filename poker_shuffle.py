import random
from poker import Card

class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []
        
    def set_hand(self, hand):
        self.hand = hand
    
    def get_hand(self):
        return self.hand

def deal_cards(deck, players):
    num_players = len(players)
    
    for i in range(num_players*2):
        player = players[i % num_players]
        card = deck.pop(0)
        player.hand.append(card)

def main():
    deck = list(Card)
    random.shuffle(deck)
    print(deck)

    # Create the two players
    player1 = Player("Player 1")
    player2 = Player("Player 2")
    players = [player1, player2]
    
    deal_cards(deck, players)
    
    # Store each player's hand in the Player object
    for player in players:
        player.set_hand(player.hand)
        # print(f"{player.name}'s hand: {', '.join(str(card) for card in player.get_hand())}")

    flop_burn = deck.pop(0)
    flop = [deck.pop(0) for i in range(3)]
    turn_burn = deck.pop(0)
    turn = deck.pop(0)
    river_burn = deck.pop(0)
    river = deck.pop(0)

    # print(flop)
    # print(turn)
    # print(river)

if __name__ == '__main__':
    main()
