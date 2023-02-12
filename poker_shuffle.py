import random
from poker import Card, Hand
from itertools import combinations

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
    num_board_cards = 3
    burn_card = 0
    
    # Deal the flop
    board_cards = []
    for i in range(num_board_cards):
        if i == burn_card:
            deck.pop(0)  # Burn a card
        card = deck.pop(0)
        board_cards.append(card)
    print(f"Flop: {', '.join(str(card) for card in board_cards)}")
    
    # Deal the turn
    if burn_card < num_board_cards:
        burn_card += 1
    if burn_card < num_board_cards:
        deck.pop(0)  # Burn a card
    card = deck.pop(0)
    board_cards.append(card)
    print(f"Turn: {card}")
    
    # Deal the river
    if burn_card < num_board_cards:
        burn_card += 1
    if burn_card < num_board_cards:
        deck.pop(0)  # Burn a card
    card = deck.pop(0)
    board_cards.append(card)
    print(f"River: {card}")
    
    # print(board_cards)

    # Deal the board cards to all players
    for player in players:
        player.hand.extend(board_cards)

    return(board_cards)

def main():
    # Set up the game
    num_players = 2
    players = [Player(f"Player {i+1}") for i in range(num_players)]
    deck = list(Card)
    random.shuffle(deck)
    
    # Deal the hole cards
    for i in range(num_players):
        player = players[i]
        if i == 0:
            print("Small blind:")
        elif i == 1:
            print("Big blind:")
        hand = [deck.pop(0), deck.pop(0)]
        player.set_hand(hand)
        print(f"{player.name}: {hand}")
    
    # Deal the flop, turn, and river
    community_cards = deal_cards(deck, players)
    

if __name__ == '__main__':
    main()

