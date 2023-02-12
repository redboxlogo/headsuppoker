from poker_funcs import Player
from poker_funcs import deal_cards
import random
from poker import Card, Hand
from itertools import combinations

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

