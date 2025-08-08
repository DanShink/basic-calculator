// Init display
const disp = document.querySelector("p");
disp.innerText = "0";

let x = null;
let y = null;
let content = 0;
let currentOperator = null;
let isEnteringSecondOperand = false;

function resetParams() {
	x = null;
	y = null;
	content = 0;
	currentOperator = null;
	isEnteringSecondOperand = false;
	disp.innerText = "0";
}

function updateDisplay(dispVal) {
	const strVal = dispVal.toString();
	disp.innerText = strVal;
	content = Number(strVal);
}

function add(a, b) {
	return Number(a) + Number(b);
}

function subtract(a, b) {
	return Number(a) - Number(b);
}

function multiply(a, b) {
	return Number(a) * Number(b);
}

function divide(a, b) {
	return Number(a) / Number(b);
}

function operate(a, b, operator) {
	console.log(`x: ${a}`);
	console.log(`y: ${b}`);
	console.log(`operator: ${operator}`);
	let result;
	switch (operator) {
		case "+":
			result = add(a, b);
			break;
		case "-":
			result = subtract(a, b);
			break;
		case "*":
			result = multiply(a, b);
			break;
		case "/":
			result = Number(b) !== 0 ? divide(a, b) : "NaN";
			break;
		default:
			console.log(`Error: Operator ${operator} Unknown!`);
			return null;
	}
	result = Math.round(result * 10000) / 10000;
	updateDisplay(result);
	return result;
}

function isValNum(num) {
	const valid = !isNaN(num) && num !== null;
	return valid;
}

function nanCheck() {
	if (disp.innerText === "NaN") {
		resetParams();
		return true;
	}
	return false;
}

function numButtonHandler(number) {
	if (nanCheck()) return;
	if (disp.innerText === "0" || isEnteringSecondOperand) {
		updateDisplay(number);
		isEnteringSecondOperand = false;
	} else if (disp.innerText.length < 10) {
		updateDisplay(`${disp.innerText}${number}`);
	}
}

function operatorButtonHandler(operator) {
	if (nanCheck()) return;
	if (x === null || currentOperator === null) {
		x = content;
	} else if (isValNum(x) && !isValNum(y) && !isEnteringSecondOperand) {
		y = content;
		evalEquals();
	}
	isEnteringSecondOperand = true;
	currentOperator = operator;
}

function evalEquals() {
	if (nanCheck()) return;
	if (y === null && currentOperator !== null && !isEnteringSecondOperand)
		y = content;
	if (isValNum(x) && isValNum(y)) {
		const result = operate(x, y, currentOperator);
		x = result;
		y = null;
		currentOperator = null;
		updateDisplay(result);
		isEnteringSecondOperand = true;
	}
}

function handleDecimal() {
	if (disp.innerText.includes(".") || disp.innerText.length >= 10) return;
	disp.innerText = `${disp.innerText}.`;
}

function initButtons() {
	const numberButtons = document.querySelectorAll(".number");
	numberButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			numButtonHandler(btn.innerText);
		});
	});

	const operators = document.querySelectorAll(".operator");
	operators.forEach((btn) => {
		btn.addEventListener("click", () => {
			operatorButtonHandler(btn.value);
		});
	});

	const equalsButton = document.querySelector("#equals");
	equalsButton.addEventListener("click", () => {
		evalEquals();
	});

	const clearButton = document.querySelector("#clear");
	clearButton.addEventListener("click", () => {
		resetParams();
	});

	const decimal = document.querySelector("#period");
	decimal.addEventListener("click", () => {
		handleDecimal();
	});
}

initButtons();
