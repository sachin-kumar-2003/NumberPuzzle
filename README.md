# Number Puzzle Game

This is a simple number puzzle game built with HTML, CSS, and JavaScript. The goal is to arrange the tiles in ascending order by moving the numbered tiles into the empty slot.

## Demo

https://sachin-kumar-2003.github.io/NumberPuzzle/

## Features

- Shuffle tiles to start a new game.
- Move tiles by clicking them, adjacent to the empty slot.
- Displays the number of moves made by the player.
- Displays a winning message when the puzzle is solved.

## How to Play

1. Click the "Shuffle" button to mix up the tiles.
2. Click on a numbered tile adjacent to the empty slot to move it.
3. Repeat until the tiles are in ascending order from 1 to 24, with the empty slot at the bottom-right corner.

## Project Structure

- `index.html`: Contains the HTML structure.
- `style.css`: CSS for styling the game.
- `script.js`: JavaScript logic for tile creation, shuffling, movement, and winning condition.

## Code Explanation

The main JavaScript logic includes:

- `createTiles`: Initializes the 5x5 grid with numbered tiles from 1 to 24, leaving one empty slot.
- `printTiles`: Renders tiles in the container dynamically.
- `suffleTilesArray`: Shuffles the tiles randomly to start a new game.
- `move`: Handles tile movement when the user clicks on a tile.
- `isAdjacent`: Checks if a tile is adjacent to the empty slot.
- `checkWin`: Checks if the player has arranged the tiles in the correct order to win.


