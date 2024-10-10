# Single Player Poker (5 Card Draw)

This project is a simple poker like game for a single player written in Svelte and Javascript. 

It uses a single image sprite with all the cards and it copies them and draws them on a canvas. 

The game is similar to 5 Card Draw, but as a single player game.

Play like this:

1. Place your bet by clicking the 'Bet 1' button several times until you reach the desired bet. You can reset the bet to 1 by clicking the 'Reset Bet' button.

2. Click the 'Deal' button for the first dealing of cards. 

3. Now you can hold up to 3 cards by clicking the 'Hold' buttons, or you can finish the round by clicking the 'Finish Round' button. 

4. Click the 'Deal' button again, and the cards that is not held will be swapped with new cards. 

5. Click the 'Finish Round' button to collect your score and end the round. 

6. Repeat from 1. 

Types of scores:  
Royal Flush: the 5 highest ranking cards in order (straight) (10, J, Q, K, A) and all in the same suit (flush)  
Straight Flush: 5 cards in order (E.g. 6, 7, 8, 9, 10) in any different suits  
4 of a kind: 4 cards with the same rank  
Full House: 3 of a kind and 2 of a kind (E.g. 5, 5, 5, 8, 8)  
Flush: 5 cards in the same suit  
Straight: 5 cards in a row, E.g. 3, 4, 5, 6, 7 in different suits  
3 of a kind: 3 cards with the same rank  
2 pairs: 2 pairs with the same ranks, E.g. 4, 4, 9, 9  
1 pair: 2 cards with the same rank, E.g. 6, 6  