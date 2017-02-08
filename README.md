# Cu Game Server

Me and my friends love play this card game we call Cu.

Since most of us are programmer, I recently came up with the idea of an AI challenge: I would build
a game controller and everybody would build a bot to compete for the Cu Bot Championship.

This is the game controller project and it's on early development stage.

## The game

### The basics

- The game is round based.
- The game has a predefined sequence of player, but each round can start from any of it's members.
- The first starter player is decided by luck.
- Each player must receive 9 or more cards (use multiple decks if and only if needed).
- The cards suits don't matter in this game.
- This is how the cards values are sorted (from lowest to highest):
  - `3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2`

### Glossary

- **Set**: a set of cards of the same value.
- **Size**: the number of cards in a **Set**.
- **Value**: the value of the cards in a **Set**.

### Objective

Be the first to have 0 cards in your hand.

### Playing

- The starter player can play any **set** from his's hand.
- Each subsequent player can only play a **set** of the same **size** with a higher **value**.
- If a player can't (or don't want to) play any **set** he's allowed to pass.
- The round ends when every player had the chance to play or if someone plays a **set** of the
highest **value** (`2`).
- The last player to play a **set** in a round becomes the next round's starter player.

## Players

The contestants must provide an URL endpoint so the game controller can ask for the player's move.

The endpoint must accept and respond every request using the JSON notation.

### Structures

#### Card

The structure representing one card from the game.

- `suit` (`string`): one of [`♥`, `♦`, `♣`, `♠`].
- `value` (`string`): one of [`3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`, `A`, `2`].

#### Play

The structure representing one play from a player.

- `playerIndex` (`int`): the index of the player in the players sequence.
- `set` (`[Card]`): the cards played (an empty array represents a pass).

### The API

A POST request will be made each time the player needs to play.

Every request will contain the current state of the game together with all the previous plays:

- `hand` (`[Card]`): the cards assigned to the player.
- `starterIndex` (`int`): the index of this round's starter player.
- `currentIndex` (`int`): the index of the player in the player sequence.
- `lastPlayedSet` (`[Card]`): the last set played this round (empty array if round starter).
- `playersHands` (`[int]`): the number of cards in each player's hand.
- `numOfDecks` (`int`): the number of decks being used in this game.
- `previousPlays` (`[Play]`): the previous plays made in this game.

The response body must be an subset of the `hand` property sent in the payload.
