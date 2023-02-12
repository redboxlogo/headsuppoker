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