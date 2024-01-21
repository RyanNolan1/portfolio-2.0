const numberButtons = document.querySelectorAll(".number-buttons");
// const calculatorScreen = document.getElementById("calculator-screen");
const operatorButtons = document.querySelectorAll(".operator-buttons");
const clearButton = document.getElementById("ac-button");
const equalsButton = document.getElementById("equals-button");
const backButton = document.getElementById("back-button");
const screenNumbersContainer = document.getElementById(
  "screen-numbers-container"
);

screenNumbersContainer.style.fontSize = "82px";
let inputtedValue = "";
let calculationArray = [];
let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let repeatEquals = false;


function fontResizer() {
  if (screenNumbersContainer.clientWidth > 300) {
    let newFontSize = parseInt(screenNumbersContainer.style.fontSize) - 4;
    screenNumbersContainer.style.fontSize = `${newFontSize}px`;
  }
}

for (let i = 0; i < numberButtons.length; i++) {
  const numberButton = numberButtons[i];
  numberButton.addEventListener("click", function () {
    repeatEquals = false;
    const buttonValue = numberButton.textContent;
    inputtedValue += buttonValue;

    let inputtedValueArray = [...inputtedValue];
    removeDecimalDuplicates(inputtedValueArray);
    screenNumbersContainer.innerText = inputtedValue;
    fontResizer();
  });
}

for (let i = 0; i < operatorButtons.length; i++) {
  const operatorButton = operatorButtons[i];
  operatorButton.addEventListener("click", function () {
    repeatEquals = false;
    const buttonOperator = operatorButton.textContent;
    if (buttonOperator !== "AC" && buttonOperator !== "←") {
      calculationArray.push(inputtedValue, buttonOperator);
      inputtedValue = "";
    }
    if (calculationArray.length === 4) {
      firstNumber = calculationArray[0];
      operator = calculationArray[1];
      secondNumber = calculationArray[2];
      screenNumbersContainer.innerText = operate(operator, firstNumber, secondNumber);
      calculationArray.splice(0, 3);
      calculationArray.unshift(screenNumbersContainer.innerText);
    }
  });
  fontResizer();
}

equalsButton.addEventListener("click", function () {
  firstNumber = calculationArray[0];
  operator = calculationArray[1];
  secondNumber = inputtedValue;
  if (operator === "÷" && secondNumber === "0") {
    screenNumbersContainer.innerText = "CAN'T DIVIDE BY 0!!";
    screenNumbersContainer.style.fontSize = "2.6rem";
    screenNumbersContainer.style.color = "red";
  } else if (repeatEquals === false) {
    screenNumbersContainer.innerText = operate(
      operator,
      firstNumber,
      secondNumber
    );
    repeatEquals = true;
  } else if (repeatEquals === true) {
    firstNumber = screenNumbersContainer.innerText;
    screenNumbersContainer.innerText = operate(
      operator,
      firstNumber,
      secondNumber
    );
    calculationArray[0] = firstNumber;
  }
  fontResizer();
});

clearButton.addEventListener("click", function () {
  screenNumbersContainer.style.fontSize = "82px";
  repeatEquals = false;
  calculationArray = [];
  screenNumbersContainer.innerHTML = 0;
  inputtedValue = "";
  screenNumbersContainer.style.color = "lime";
});

backButton.addEventListener("click", function () {
  let numberRemoved = inputtedValue.replace(/.$/, "");
  inputtedValue = numberRemoved;
  screenNumbersContainer.innerHTML = numberRemoved;
});

function operate(operator, firstNumber, secondNumber) {
  if (operator === "+") return add(Number(firstNumber), Number(secondNumber));
  if (operator === "-")
    return subtract(Number(firstNumber), Number(secondNumber));
  if (operator === "x")
    return multiply(Number(firstNumber), Number(secondNumber));
  if (operator === "÷")
    return divide(Number(firstNumber), Number(secondNumber));
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function removeDecimalDuplicates(arr) {
  let removedDecimalDuplicates = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "." && removedDecimalDuplicates.includes(".")) {
    } else {
      removedDecimalDuplicates.push(arr[i]);
    }
  }
  inputtedValue = removedDecimalDuplicates.join("");
}

