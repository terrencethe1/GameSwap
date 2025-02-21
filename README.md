# GameSwap

## Diablo Swing Orchestra
### Group Members:
- Thida Phongsavath
- Terrence Johnson
- Michael Jandres
- Christopher Makousky
- Thomas Nielsen

## Problem:
As an avid gamer with a collection of physical video game media, I would like to be able to borrow games from others in exchange for something from my personal collection.

## Solution:
### “GameSwap: Power to the Players”

GameSwap is a software that allows users to temporarily trade video games on a one-to-one swap basis. GameSwap is designed for the temporary exchange of physical media. Users will sign up and log into GameSwap from a login page that is separate from the home page. The page will redirect to the home page once login is complete.

Users add the games that they are willing to share to the GameSwap database. GameSwap will keep track of these games in a MongoDB NoSQL database. Detailed information on each title can be pulled from the RAWG.io API. Alternatively, the user can enter all relevant game information manually.

On the home page, an array of games that are available for swap will be displayed. A list of games that are currently swapped and unavailable for trade will also be displayed on the home page. Return/due-dates for the unavailable games will be displayed next to the appropriate titles.

Users can select games from the home page that they would like to borrow. The user whose game is selected will receive a notification about the pending trade, and then he can confirm or deny the trade. Exchanges will be one-for-one trades over a limited time frame.

Users will be able to view their ongoing swaps on a dedicated “swap” page. Details on the end/due dates for each ongoing swap will be available for viewing.
