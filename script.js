const container = document.querySelector(".container");
const shuffleButton = document.getElementById("shuffleButton");
const movesDisplay = document.getElementById("moves");
const minElement = document.getElementById('min');
const secElement = document.getElementById('sec');
let seconds = 0;
let moves = 0;
let tiles = [];
let start = false;

// Add click event listener for shuffle button
shuffleButton.addEventListener('click', () => {
  clearInterval(gameTimer)
  seconds=0;
    sec = seconds % 60;
    minutes = parseInt(seconds / 60);
  secElement.innerHTML = sec;
  minElement.innerHTML = minutes;
  suffleTilesArray(tiles);
  

  start = false;
});

// Initial tile creation and shuffling
createTiles();
suffleTilesArray(tiles);

// Create tiles
function createTiles() {
  tiles = new Array(25).fill(0);
  for (let i = 0; i < 24; i++) {
    tiles[i] = i + 1; 
  }
  tiles[24] = 0;
}

// Print tiles to the container
function printTiles(tiles) {
  container.innerHTML = "";
  tiles.forEach((element, index) => {
    let tile = document.createElement('div');
    tile.textContent = element !== 0 ? element : ''; 
    if (tile.innerText != '') {
      tile.classList.add('tile');
    }
    tile.setAttribute('data-index', index); 
    tile.addEventListener('click', () => move(element, index));
    container.appendChild(tile);
  });
  movesDisplay.textContent = `Moves: ${moves}`; 
}

// Shuffle tiles array
function suffleTilesArray(tiles) {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  // append again if it is not append
  if (!tiles.includes(0)) {
    tiles[24] = 0; 
  }
  printTiles(tiles);
}

// Move function
function move(tileValue, tileIndex) {
  if (!start) {
    timer();
    start = true;
  }
  const emptyIndex = tiles.indexOf(0);
  if (isAdjacent(tileIndex, emptyIndex)) {
    tiles[emptyIndex] = tileValue;
    tiles[tileIndex] = 0;
    moves++;
    printTiles(tiles);
    if (checkWin(tiles)) {
      updateRecordDisplay(seconds);
      clearInterval(gameTimer);
      alert(`congrate...you have won this match by ${moves} moves `);
    }
  }
}

// Check if two indices are adjacent
function isAdjacent(tileIndex, emptyIndex) {
  const tileIndexRow = Math.floor(tileIndex / 5);
  const tileIndexCol = tileIndex % 5;

  const emptyIndexRow = Math.floor(emptyIndex / 5);
  const emptyIndexCol = emptyIndex % 5;

  const isAdjacent =
    (tileIndexRow === emptyIndexRow && Math.abs(tileIndexCol - emptyIndexCol) === 1) || 
    (tileIndexCol === emptyIndexCol && Math.abs(tileIndexRow - emptyIndexRow) === 1);  

  return isAdjacent;
}

// Win
function checkWin(tiles) {
  for (let i = 0; i <= 24; i++) {
    if (i == 24) {
      return true;
    } else {
      if (tiles[i] != i + 1) {
        return false;
      }
    }
  }
}

// Add time functionality
function timer() {
  gameTimer = setInterval(() => {
    seconds++;
    const sec = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    secElement.innerHTML = sec;
    minElement.innerHTML = minutes;

    // Check and update the lowest recorded time
    const recordedTime = localStorage.getItem('recordedTime') ? parseInt(localStorage.getItem('recordedTime')) : Infinity;

    if (seconds < recordedTime) {
      localStorage.setItem('recordedTime', seconds);
      updateRecordDisplay(seconds);
    }
  }, 1000);
}

// Function to display the recorded time in the "Record" section
function updateRecordDisplay(timeInSeconds) {
  const recordMinutes = Math.floor(timeInSeconds / 60);
  const recordSeconds = timeInSeconds % 60;

  // Update the "Record" section in the HTML
  const recordDisplay = document.querySelector('.game-container div:last-child');
  if (recordDisplay) {
    recordDisplay.innerHTML = `
      <p>Record:</p>
      <span>${recordMinutes}</span> Min <span>${recordSeconds}</span> Sec
    `;
  }
}
