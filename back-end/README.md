# Slot Machine Smart Contract

## Global Variables
`casinoOwner` variable of type address that stores the address of person who deployed the smart contract.

`casinoBalance` variable of type uint that stores the amount of Wei currently in the smart contract.

## Arrays, Mappings, and Enums

`symbols` array of type uint that stores non-negative integers to represent the symbols for the slot machine.

`linesWon` array of type string that stores lines won in a game.

`Games` array of type Game that stores current active games. (See below on "Game representation using struct")

`FinishedGames` array of type Game that stores all the finished games or games in the `Finished` state. (See below on "Game representation using struct")

`symbolWorth` mapping from uint to uint that stores the value of a symbol.

The following table shows the integer tied to a symbol as well as it's worth in Wei:

| Integer | Symbol  | Value |
| ------- | ------- | ----- |
| 0       | Apple   | 3     |
| 1       | Refund  | 0*    |
| 2       | Cherry  | 2**   |
| 3       | Banana  | 6     |
| 4       | Grape   | 12    |
| 5       | Orange  | 100   |
| 6       | Kiwi    | 200   |
| 7       | Jackpot | 300   |

\* - Refund symbol is initialized to 0 and gets assigned the value of the player's bet.

\*\* - Cherry symbol has a value of 2 for a single symbol. Each consecutive Cherry symbol adds an additional 2, up to a maximum of 6 in one line.

`State` enum that keeps track of the state of the game, the state `inProgress` is assigned to game upon the player betting and being placed in a game, and the state `Finished` is assigned to the game after the game finishes.

## Game representation using struct

`Game` struct to represent a game in the slot machine. The following variables compose the struct:

`state` State variable that keeps track of game state.

`playerAddress` variable of type address that stores the address of the player for the game.

`playerBetAmount` variable of type uint that stores the amount of Wei that the player bet for the game.

`time` variable of type uint that stores the current block timestamp as seconds since unix epoch. In other words, the start time of the game.

`slotsState` 2-dimensional array of type uint that stores the current status of the slot machine reels as a 3x3 array.

`prizeMoney` variable of type uint that stores the amount of Wei that the player has won for a game.

`linesWon` array of type string that stores the names of the lines won by the player for a game.

`result` variable of type string that tells if the player has won or lost a game, based on if there is a winning line.

`slotsHash` variable of type bytes32 that stores the hash for a game.

## Modifiers

`onlyOwner` modifier to a function that only allows the `casinoOwner` address to call it.

`onlyPlayer` modifier to a function that only allows any address but `casinoOwner` address to call it.

`inState` modifier to a function that requires a certain game state before the function can be called.

## Functions

`fundCasino` function with the `onlyOwner` modifer that allows the casino owner to fund the smart contract.

``
