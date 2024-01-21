import theGameStructure from "./theGameStructure.js";
import { characterHandler } from "./characterHandler.js";

const chooseMarker = document.getElementsByName("choose-marker");
const continueButton = document.getElementById("continue-button");
const gameStartOverlay = document.getElementById("game-start-overlay");
const gameOutComeOverlay = document.getElementById("game-outcome-overlay");
const nextRoundButton = document.getElementById("next-round-button");
const newGameButton = document.getElementById("new-game-button");
const gridItem = document.querySelectorAll(".grid-item");
const playerOneScore = document.getElementById("player-one-score");
const playerTwoScore = document.getElementById("player-two-score");
const gameScore = document.getElementById("game-score");

const markerHandler = (function () {
  let chosenMarker;
  let whichMarker = 0;
  let playerOneMarker;
  let playerTwoMarker;
  let randomNumber = 0;

  continueButton.addEventListener("click", () => {
    gameStartOverlay.style.visibility = "hidden";
    chooseMarker.forEach((element) => {
      if (element.checked && element.value === "X") {
        chosenMarker = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
        playerOneMarker = "X";
        playerTwoMarker = "O";
      } else if (element.checked && element.value === "O") {
        chosenMarker = ["O", "X", "O", "X", "O", "X", "O", "X", "O"];
        playerOneMarker = "O";
        playerTwoMarker = "X";
      }
      playerOneScore.innerHTML = `${theGameStructure.playerOneCharacter} Score: 0`;
      playerTwoScore.innerHTML = `${theGameStructure.playerTwoCharacter} Score: 0`;
    });
  });

  function winning(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function emptyIndexies(board) {
    return board.filter((s) => s != "O" && s != "X");
  }

  function minimax(newBoard, player) {
    let availSpots = emptyIndexies(newBoard);
    if (winning(newBoard, playerOneMarker)) {
      return { score: -10 };
    } else if (winning(newBoard, playerTwoMarker)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    let moves = [];

    for (let i = 0; i < availSpots.length; i++) {
      let move = {};
      move.index = newBoard[availSpots[i]];

      newBoard[availSpots[i]] = player;
      if (player === playerTwoMarker) {
        let result = minimax(newBoard, playerOneMarker);
        move.score = result.score;
      } else {
        let result = minimax(newBoard, playerTwoMarker);
        move.score = result.score;
      }
      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }
    let bestMove;
    if (player === playerTwoMarker) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  let computedStyle = window.getComputedStyle(gameOutComeOverlay);

  function playAiRound() {
    let emptyCellIndex = [];
    gridItem.forEach((element, index) => {
      if (element.innerHTML === "") {
        emptyCellIndex.push(index);
      } else {
        emptyCellIndex.push(element.innerHTML);
      }
    });
    let computersMove = minimax(emptyCellIndex, playerTwoMarker).index;
    if (gridItem[computersMove] !== undefined) {
      gridItem[computersMove].innerHTML = chosenMarker[whichMarker];
      emptyCellIndex.splice(computersMove, 1, chosenMarker[whichMarker]);
    }
    whichMarker += 1;
    setTimeout(() => {
      if (computedStyle.visibility === "hidden") {
        characterHandler();
      }
    }, "500");
  }

  function playRandomAiRound() {
    let emptyCellIndex = [];
    gridItem.forEach((element, index) => {
      if (element.innerHTML === "") {
        emptyCellIndex.push(index);
      }
    });
    let randomIndex =
      emptyCellIndex[Math.floor(Math.random() * emptyCellIndex.length)];
    if (emptyCellIndex.length > 1) {
      gridItem[randomIndex].innerHTML = chosenMarker[whichMarker];
      whichMarker += 1;
    }

    emptyCellIndex.forEach((element, index) => {
      if (element === randomIndex) emptyCellIndex.splice(index, 1);
    });
    setTimeout(() => {
      if (computedStyle.visibility === "hidden") {
        characterHandler();
      }
    }, "500");
  }

  gridItem.forEach((element, index) => {
    element.addEventListener("click", function () {
      randomNumber = Math.random() * 100;
      if (gridItem[index].innerHTML === "") {
        gridItem[index].innerHTML = chosenMarker[whichMarker];
        whichMarker += 1;
        characterHandler();
        if (
          theGameStructure.playerTwo === "AI" &&
          theGameStructure.difficulty === "random"
        ) {
          playRandomAiRound();
        } else if (
          theGameStructure.playerTwo === "AI" &&
          theGameStructure.difficulty === "easy"
        ) {
          let randomNumber = Math.random() * 100;
          if (randomNumber < 40) playAiRound();
          else if (randomNumber < 100) playRandomAiRound();
        } else if (
          theGameStructure.playerTwo === "AI" &&
          theGameStructure.difficulty === "medium"
        ) {
          if (randomNumber < 60) playAiRound();
          else if (randomNumber < 100) playRandomAiRound();
        } else if (
          theGameStructure.playerTwo === "AI" &&
          theGameStructure.difficulty === "hard"
        ) {
          if (randomNumber < 90) playAiRound();
          else if (randomNumber < 100) playRandomAiRound();
        } else if (
          theGameStructure.playerTwo === "AI" &&
          theGameStructure.difficulty === "impossible"
        ) {
          playAiRound();
        }
      }
    });
  });

  nextRoundButton.addEventListener("click", function () {
    whichMarker = 0;
    gameOutComeOverlay.style.visibility = "hidden";
    gameScore.style.visibility = "visible";
    gridItem.forEach((element) => {
      element.innerHTML = "";
      element.style.backgroundColor = "#424B54";
      element.style.backgroundImage = "none";
    });
  });

  newGameButton.addEventListener("click", function () {
    window.location.reload();
    });
})();

export default markerHandler;
