const container = document.querySelector(".container");
const shuffleButton = document.getElementById("shuffleButton");
const movesDisplay = document.getElementById("moves");
const minElement = document.getElementById('min');
const secElement = document.getElementById('sec');
const recordDisplay = document.getElementById('record'); 
let seconds = 0;
let moves = 0;
let tiles = [];
let start = false;
let gameTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  displayStoredRecord();
});

shuffleButton.addEventListener('click', () => {
  clearInterval(gameTimer);
  seconds = 0;
  moves = 0;
  secElement.innerHTML = 0;
  minElement.innerHTML = 0;
  movesDisplay.textContent = `Moves: ${moves}`;
  shuffleTilesArray(tiles);
  start = false;
});

createTiles();
shuffleTilesArray(tiles);

function createTiles() {
  tiles = new Array(25).fill(0);
  for (let i = 0; i < 24; i++) {
    tiles[i] = i + 1;
  }
  tiles[24] = 0;
}

function printTiles(tiles) {
  container.innerHTML = "";
  tiles.forEach((element, index) => {
    let tile = document.createElement('div');
    tile.textContent = element !== 0 ? element : '';
    if (tile.innerText !== '') {
      tile.classList.add('tile');
    }
    tile.setAttribute('data-index', index);
    tile.addEventListener('click', () => move(element, index));
    container.appendChild(tile);
  });
  movesDisplay.textContent = `Moves: ${moves}`;
}

function shuffleTilesArray(tiles) {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  if (!tiles.includes(0)) {
    tiles[24] = 0;
  }
  printTiles(tiles);
}

function move(tileValue, tileIndex) {
  if (!start) {
    startTimer();
    start = true;
  }
  const emptyIndex = tiles.indexOf(0);
  if (isAdjacent(tileIndex, emptyIndex)) {
    tiles[emptyIndex] = tileValue;
    tiles[tileIndex] = 0;
    moves++;
    printTiles(tiles);
    if (checkWin(tiles)) {
      clearInterval(gameTimer);
      updateBestTime(seconds);
      alert(`Congratulations! You won in ${moves} moves.`);
    }
  }
}

function isAdjacent(tileIndex, emptyIndex) {
  const tileIndexRow = Math.floor(tileIndex / 5);
  const tileIndexCol = tileIndex % 5;
  const emptyIndexRow = Math.floor(emptyIndex / 5);
  const emptyIndexCol = emptyIndex % 5;

  return (
    (tileIndexRow === emptyIndexRow && Math.abs(tileIndexCol - emptyIndexCol) === 1) ||
    (tileIndexCol === emptyIndexCol && Math.abs(tileIndexRow - emptyIndexRow) === 1)
  );
}

function checkWin(tiles) {
  for (let i = 0; i < 24; i++) {
    if (tiles[i] !== i + 1) {
      return false;
    }
  }
  return true;
}

function startTimer() {
  gameTimer = setInterval(() => {
    seconds++;
    secElement.innerHTML = seconds % 60;
    minElement.innerHTML = Math.floor(seconds / 60);
  }, 1000);
}

function updateBestTime(timeInSeconds) {
  let bestTime = localStorage.getItem('bestTime') ? parseInt(localStorage.getItem('bestTime')) : Infinity;
  
  if (timeInSeconds < bestTime) {
    localStorage.setItem('bestTime', timeInSeconds);
    displayStoredRecord();
  }
}

function displayStoredRecord() {
  let bestTime = localStorage.getItem('bestTime');
  
  if (bestTime !== null) {
    const recordMinutes = Math.floor(bestTime / 60);
    const recordSeconds = bestTime % 60;
    recordDisplay.innerHTML = `Best Time: <span>${recordMinutes}</span> Min <span>${recordSeconds}</span> Sec`;
  } else {
    recordDisplay.innerHTML = "Best Time: No record yet!";
  }
}
