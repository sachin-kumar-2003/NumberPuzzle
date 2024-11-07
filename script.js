const container = document.querySelector(".container");
const shuffleButton = document.getElementById("shuffleButton");
const movesDisplay = document.getElementById("moves");
let moves = 0;
let tiles = [];

// Add click event listener for shuffle button
shuffleButton.addEventListener('click', () => {
  suffleTilesArray(tiles);
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
    if(tile.innerText!=''){
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
  const emptyIndex = tiles.indexOf(0);
  if(isAdjacent(tileIndex, emptyIndex)) {
    tiles[emptyIndex] = tileValue;
    tiles[tileIndex] = 0;
    moves++;
    printTiles(tiles);
    if(checkWin(tiles)){
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

//win
function checkWin(tiles){
  for(let i=0;i<=24;i++){
    if(i==24){
      return true 
    }else{
      if(tiles[i]!=i+1){
        return false
      }
    }
  }
}
