import theGameStructure from "./theGameStructure.js";
import { characterHandler } from "./characterHandler.js"

const gameContainer = document.getElementById("game-container");
const gridItem = gameContainer.querySelectorAll(".grid-item");
const gameOutComeOverlay = document.getElementById("game-outcome-overlay");
const gameOutComeMessage = document.getElementById("game-outcome-message");
const newGameButton = document.getElementById("new-game-button");
const playerOneScore = document.getElementById("player-one-score");
const playerTwoScore = document.getElementById("player-two-score");
const gameScore = document.getElementById("game-score");

const whoWins = (function () {
  let gameArray = ["", "", "", "", "", "", "", "", ""];
  let moveCount = 0;
  let playerOneWinsCount = 0;
  let playerTwoWinsCount = 0;

  newGameButton.addEventListener("click", function () {
    playerOneWinsCount= 0;
    playerTwoWinsCount = 0;
  });

  gridItem.forEach((element, index) => {
    element.addEventListener("click", function () {
    if (gameArray[index] === "") {
        moveCount++;
        gridItem.forEach((element, index) => {
          gameArray.splice(index, 1, element.innerHTML);
        });
        const topRow = [gameArray[0], gameArray[1], gameArray[2]];
        const middleRow = [gameArray[3], gameArray[4], gameArray[5]];
        const bottomRow = [gameArray[6], gameArray[7], gameArray[8]];
        const firstColumn = [gameArray[0], gameArray[3], gameArray[6]];
        const middleColumn = [gameArray[1], gameArray[4], gameArray[7]];
        const thirdColumn = [gameArray[2], gameArray[5], gameArray[8]];
        const diagonalDown = [gameArray[0], gameArray[4], gameArray[8]];
        const diagonalUp = [gameArray[6], gameArray[4], gameArray[2]];

        const isItX = (marker) => marker === "X";
        const isItO = (marker) => marker === "O";

        function announceWinner(winningMarker) {
          gameOutComeMessage.innerHTML = `${winningMarker} Wins!`;
          gameOutComeOverlay.style.visibility = "visible";
          gameScore.style.visibility = "hidden"
          gameArray = ["", "", "", "", "", "", "", "", ""];
          moveCount = 0;
          if (winningMarker === theGameStructure.playerOneMarker) {
            playerOneWinsCount += 1;
            playerOneScore.innerHTML = `${theGameStructure.playerOneCharacter} Score: ${playerOneWinsCount}`;
            gameOutComeMessage.innerHTML = `${theGameStructure.playerOneCharacter} Wins!`;
          } else if (winningMarker === theGameStructure.playerTwoMarker) {
            playerTwoWinsCount += 1;
            playerTwoScore.innerHTML = `${theGameStructure.playerTwoCharacter} Score: ${playerTwoWinsCount}`;
            gameOutComeMessage.innerHTML = `${theGameStructure.playerTwoCharacter} Wins!`;
            characterHandler();
          }
        }

        if (topRow.every(isItX) || topRow.every(isItO)) {
          [0, 1, 2].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(topRow[0]);
        } else if (middleRow.every(isItX) || middleRow.every(isItO)) {
          [3, 4, 5].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(middleRow[0]);
        } else if (bottomRow.every(isItX) || bottomRow.every(isItO)) {
          [6, 7, 8].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(bottomRow[0]);
        } else if (firstColumn.every(isItX) || firstColumn.every(isItO)) {
          [0, 3, 6].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(firstColumn[0]);
        } else if (middleColumn.every(isItX) || middleColumn.every(isItO)) {
          [1, 4, 7].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(middleColumn[0]);
        } else if (thirdColumn.every(isItX) || thirdColumn.every(isItO)) {
          [2, 5, 8].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(thirdColumn[0]);
        } else if (diagonalDown.every(isItX) || diagonalDown.every(isItO)) {
          [0, 4, 8].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(diagonalDown[0]);
        } else if (diagonalUp.every(isItX) || diagonalUp.every(isItO)) {
          [6, 4, 2].forEach((i) => (gridItem[i].style.backgroundColor = "red"));
          announceWinner(diagonalUp[0]);
        } else if (
          moveCount === 9 ||
          (theGameStructure.playerTwo === "AI" && moveCount === 5)
        ) {
          gameOutComeMessage.innerHTML = "It's a Draw!";
          gameScore.style.visibility = "hidden"
          gameOutComeOverlay.style.visibility = "visible";
          gameArray = ["", "", "", "", "", "", "", "", ""];
          moveCount = 0;
        }
      }
    });
  });
})();

export default whoWins;
