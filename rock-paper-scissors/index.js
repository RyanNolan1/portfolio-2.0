function getComputerChoice() {
  const choiceArray = ["Rock", "Paper", "Scissors"];
  let computerChoice = choiceArray[Math.floor(Math.random() * 3)];
  if (computerChoice === "Rock") {
    document.getElementById("computer-hand").src = "./images/Right Rock.png";
  } else if (computerChoice === "Paper") {
    document.getElementById("computer-hand").src = "./images/Right Paper.png";
  } else if (computerChoice === "Scissors") {
    document.getElementById("computer-hand").src =
      "./images/Right Scissors.png";
  }
  return computerChoice;
}

let userScore = 0;
let computerScore = 0;
let computerChoice;
let buttonValue;
let playRoundFunctionResult;

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".buttons");
  buttons.forEach(function (currentButton) {
    currentButton.addEventListener("click", function () {
      computerChoice = getComputerChoice();
      buttonValue = currentButton.value;
      playRoundFunctionResult = playRound(buttonValue, computerChoice);
      getUserHandImages(buttonValue);
      if (userScore === 8 || computerScore === 8) {
        finishGame(userScore, computerScore);
      }
      document.getElementById("score-area").innerHTML =
        playRoundFunctionResult[0].toUpperCase();
    });
  });
});

function finishGame() {
  if (userScore === 8) {
    document.getElementById("winner-image").src = "./images/user-wins.png";
    document.getElementById("winner-message").innerHTML = "HUMAN WINS!";
    document.getElementById("human-audio").play();
    document.getElementById(
      "winner-score"
    ).innerHTML = `HUMAN: ${userScore} MACHINE: ${computerScore}`;
    openNav();
  } else if (computerScore === 8) {
    document.getElementById("winner-image").src = "./images/computer-wins.webp";
    document.getElementById("winner-message").innerHTML = "MACHINE WINS!";
    document.getElementById("machine-audio").play();
    document.getElementById(
      "winner-score"
    ).innerHTML = `MACHINE: ${computerScore} HUMAN: ${userScore}`;
    openNav();
  }
}

function openNav() {
  document.getElementById("win-screen").style.display = "block";
}

function getUserHandImages(userHandValue) {
  if (userHandValue === "Rock") {
    document.getElementById("user-hand").src = "./images/Left Rock.png";
  } else if (userHandValue === "Paper") {
    document.getElementById("user-hand").src = "./images/Left Paper.png";
  } else if (userHandValue === "Scissors") {
    document.getElementById("user-hand").src = "./images/Left Scissors.png";
  }
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === "Rock" && computerSelection === "Scissors") {
    userScore += 1;
    playUserPunchNoise();
    document.getElementById("user-score").innerHTML = `SCORE: ${userScore}`;
    return ["You Win! Rock beats Scissors", userScore];
  } else if (playerSelection === "Rock" && computerSelection === "Rock") {
    playDrawNoise();
    return ["Draw! Rock draws with Rock"];
  } else if (playerSelection === "Rock" && computerSelection === "Paper") {
    computerScore += 1;
    document.getElementById(
      "computers-score"
    ).innerHTML = `SCORE ${computerScore}`;
    playComputerPunchNoise();
    return ["You Lose! Paper beats Rock", computerScore];
  }

  if (playerSelection === "Scissors" && computerSelection === "Paper") {
    userScore += 1;
    playUserPunchNoise();
    document.getElementById("user-score").innerHTML = `SCORE ${userScore}`;
    return ["You Win! Scissors beats Paper", userScore];
  } else if (
    playerSelection === "Scissors" &&
    computerSelection === "Scissors"
  ) {
    playDrawNoise();
    return ["Draw! Scissors draws with Scissors"];
  } else if (playerSelection === "Scissors" && computerSelection === "Rock") {
    computerScore += 1;
    document.getElementById(
      "computers-score"
    ).innerHTML = `SCORE: ${computerScore}`;
    playComputerPunchNoise();
    return ["You Lose! Rock beats Scissors", computerScore];
  }

  if (playerSelection === "Paper" && computerSelection === "Rock") {
    userScore += 1;
    playUserPunchNoise();
    document.getElementById("user-score").innerHTML = `SCORE ${userScore}`;
    return ["You Win! Paper beats Rock", userScore];
  } else if (playerSelection === "Paper" && computerSelection === "Paper") {
    playDrawNoise();
    return ["Draw! Paper draws with Paper"];
  } else if (playerSelection === "Paper" && computerSelection === "Scissors") {
    computerScore += 1;
    document.getElementById(
      "computers-score"
    ).innerHTML = `SCORE ${computerScore}`;
    playComputerPunchNoise();
    return ["You Lose! Scissors beats Paper", computerScore];
  }
}

function playUserPunchNoise() {
  let sound = "./audio/punch-soft-quick--2151.wav";
  document.getElementById("punch-noise-player").innerHTML =
    '<embed src="' + sound + '" hidden="true" autostart="true" loop="false" />';
}

function playComputerPunchNoise() {
  let sound = "./audio/punch-weak-hit-impact-2148.wav";
  document.getElementById("punch-noise-player").innerHTML =
    '<embed src="' + sound + '" hidden="true" autostart="true" loop="false" />';
}

function playDrawNoise() {
  let sound = "./audio/mixkit-air-in-a-hit-2161.wav";
  document.getElementById("punch-noise-player").innerHTML =
    '<embed src="' + sound + '" hidden="true" autostart="true" loop="false" />';
}
