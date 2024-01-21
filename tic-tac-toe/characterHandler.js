const gameContainer = document.getElementById("game-container");
const gridItem = gameContainer.querySelectorAll(".grid-item");

function characterHandler() {
    gridItem.forEach((element) => {
      if (element.innerHTML === "X") {
        element.style.backgroundImage = "url('./santa.png')";
      } else if (element.innerHTML === "O") {
        element.style.backgroundImage = "url('./sprout.png')";
      }
      element.style.backgroundSize = "80px 80px";
      element.style.backgroundRepeat = "no-repeat";
      element.style.backgroundPosition = "center";
    });
  }

  export { characterHandler };