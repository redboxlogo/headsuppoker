import random

def main():

    # prompt user for buy-in amounts for each player
    buy_in_player1 = int(input('Enter buy-in amount for Player 1: '))
    buy_in_player2 = int(input('Enter buy-in amount for Player 2: '))

    # create two players
    players = ['Player 1', 'Player 2']
    dealer = 0  # player 1 is the dealer in the first round

    # play 5 rounds
    for round in range(1, 6):
        print(f'Round {round}: \n')

        # create a list of 52 cards with rank and suit
        suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs']
        ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
        cards = [f'{rank} of {suit}' for suit in suits for rank in ranks]

        # shuffle the cards using random.shuffle() function
        random.shuffle(cards)

        # determine small blind and big blind
        small_blind_player = (dealer + 1) % 2
        big_blind_player = dealer

        # print small blind and big blind
        print(f'{players[small_blind_player]} is the small blind')
        print(f'{players[big_blind_player]} is the big blind\n')

        # burn one card and deal two cards to each player
        burn_card = cards.pop(0)
        player1_cards = [cards.pop(), cards.pop()]
        player2_cards = [cards.pop(), cards.pop()]

        # print each player's cards
        print(f'{players[0]}: {player1_cards}')
        print(f'{players[1]}: {player2_cards}\n')

        # deal the flop
        burn_card = cards.pop(0)
        flop = [cards.pop(), cards.pop(), cards.pop()]
        print(f'Flop: {flop}')

        # deal the turn
        burn_card = cards.pop(0)
        turn = cards.pop()
        print(f'Turn: {turn}')

        # deal the river
        burn_card = cards.pop(0)
        river = cards.pop()
        print(f'River: {river}')


        # update dealer for next round
        dealer = (dealer + 1) % 2

        print('\n')

if __name__ == '__main__':
    main()