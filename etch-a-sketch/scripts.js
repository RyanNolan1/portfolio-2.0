function getGrid(columns, rows) {
  const gridContainer = document.getElementById("grid-container");
  let grid = document.createElement("div");
  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  grid.className = "grid";

  const columnWidth = `calc(600px / ${columns})`;
  for (let i = 0; i < columns; ++i) {
    let column = document.createElement("div");
    column.className = "column";
    column.style.width = columnWidth;
    for (let j = 0; j < rows; ++j) {
      const rowHeight = `calc(600px / ${rows})`;
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.style.height = rowHeight;

      column.appendChild(cell);
    }
    grid.appendChild(column);
  }
  gridContainer.appendChild(grid);
}

function changeGridSize() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.innerHTML = "";
  let size = prompt("Please enter a number between 1 and 100");
  if (size < 1 || size > 100 || isNaN(size) === true) {
    alert("Input invalid! please enter a number between 1 and 100");
    size = 16;
  }
  getGrid(size, size);
}

const cells = document.getElementsByClassName("cell");

function chooseColourHandler() {
  let colour = document.getElementById("colour-picker").value;
  this.style.backgroundColor = colour;
  this.style.opacity = 1;
}

function chooseColour() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("mouseover", whiteToBlackHandler);
    cells[i].addEventListener("mouseover", chooseColourHandler);
  }
}

function getRandomColour() {
  let letters = "0123456789ABCDEF";
  let colour = "#";
  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
}

function rainbowHandler() {
  this.style.backgroundColor = getRandomColour();
  this.style.opacity = 1;
}

function rainbow() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("mouseover", chooseColourHandler);
    cells[i].removeEventListener("mouseover", whiteToBlackHandler);
    cells[i].removeEventListener("mouseover", eraserHandler);
    cells[i].addEventListener("mouseover", rainbowHandler);
  }
}

function whiteToBlackHandler() {
  this.style.backgroundColor = "white";
  this.style.opacity = parseFloat(this.style.opacity || 1) - 0.1;
}

function whiteToBlack() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("mouseover", chooseColourHandler);
    cells[i].removeEventListener("mouseover", rainbowHandler);
    cells[i].removeEventListener("mouseover", eraserHandler);
    cells[i].addEventListener("mouseover", whiteToBlackHandler);
  }
}

function eraserHandler() {
  this.style.backgroundColor = "white";
  this.style.opacity = 1;
}

function eraser() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("mouseover", eraserHandler);
  }
}

function clearGrid() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = "white";
    cells[i].style.opacity = 1;
  }
}

getGrid(16, 16);
