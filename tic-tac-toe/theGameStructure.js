const theGameStructure = (function () {
  const continueButton = document.getElementById("continue-button");
  const playerOneName = document.getElementById("player-1-name");
  const playerTwoName = document.getElementById("player-2-name");
  const chooseOpponent = document.getElementsByName("choose-opponent");
  const chooseDifficulty = document.getElementById("choose-difficulty");
  const chooseMarker = document.getElementsByName("choose-marker");
  const difficultyContainer = document.getElementById("difficulty-container");
  const playerTwoContainer = document.getElementById("player-2-container");
  const opponentRadios = document.querySelectorAll(".opponent-radios");

  const playerFactory = (name) => {
    return name;
  };

  function santaOrSprout(marker) {
    if (marker === "X") {
      return "Santa";
    } else if (marker === "O") {
      return "Sprout";
    }
  }

  const gameBoard = {
    playerOne: "",
    playerTwo: "",
    difficulty: "",
    playerOneMarker: "",
    playerTwoMarker: "",
    playerOneCharacter: "",
    playerTwoCharacter: "",
    rows: 3,
    columns: 3,
    gameArray: ["", "", "", "", "", "", "", "", ""],
  };

  function createPlayer() {
    chooseOpponent.forEach((element) => {
      if (element.checked && element.value === "AI") {
        gameBoard.playerOne = playerFactory(playerOneName.value);
        gameBoard.playerTwo = playerFactory("AI");
        gameBoard.difficulty = chooseDifficulty.value;
        chooseMarker.forEach((element) => {
          if (element.checked && element.value === "X") {
            gameBoard.playerOneMarker = "X";
            gameBoard.playerTwoMarker = "O";
            gameBoard.playerTwoCharacter = playerFactory("Sprout");
            if (gameBoard.playerOne === "") {
              gameBoard.playerOneCharacter = "Santa";
            } else {
              gameBoard.playerOneCharacter = gameBoard.playerOne;
            }
          } else if (element.checked && element.value === "O") {
            gameBoard.difficulty = chooseDifficulty.value;
            gameBoard.playerOneMarker = "O";
            gameBoard.playerTwoMarker = "X";
            gameBoard.playerTwoCharacter = playerFactory("Santa");
            if (gameBoard.playerOne === "") {
              gameBoard.playerOneCharacter = "Sprout";
            } else {
              gameBoard.playerOneCharacter = gameBoard.playerOne;
            }
          }
        });
      } else if (element.checked && element.value === "Player") {
        chooseMarker.forEach((element) => {
          if (element.checked && element.value === "X") {
            gameBoard.playerOneMarker = "X";
            gameBoard.playerTwoMarker = "O";
          } else if (element.checked && element.value === "O") {
            gameBoard.playerOneMarker = "O";
            gameBoard.playerTwoMarker = "X";
          }
          gameBoard.playerOneCharacter = playerFactory(playerOneName.value);
          gameBoard.playerTwoCharacter = playerFactory(playerTwoName.value);

          if (gameBoard.playerOneCharacter === "") {
            gameBoard.playerOneCharacter = santaOrSprout(
              gameBoard.playerOneMarker
            );
          }

          if (gameBoard.playerTwoCharacter === "") {
            gameBoard.playerTwoCharacter = santaOrSprout(
              gameBoard.playerTwoMarker
            );
          }
        });
      }
    });
  }

  opponentRadios.forEach(function (element) {
    element.addEventListener("change", function () {
      if (element.checked && element.value === "AI") {
        gameBoard.difficulty = chooseDifficulty.value;
        difficultyContainer.style.display = "flex";
        playerTwoContainer.style.display = "none";
      } else if (element.checked && element.value === "Player") {
        difficultyContainer.style.display = "none";
        playerTwoContainer.style.display = "flex";
      }
    });
  });

  continueButton.addEventListener("click", createPlayer);

  return gameBoard;
})();

export default theGameStructure;
