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

function numButtonHandler(btn) {
	if (disp.innerText === "0" || isEnteringSecondOperand) {
		updateDisplay(btn.id);
		isEnteringSecondOperand = false;
	} else {
		updateDisplay(`${disp.innerText}${btn.id}`);
	}
}

function operatorButtonHandler(btn) {
	if (disp.innerText === "NaN") {
		alert("Operations cannot be done on NaN");
		resetParams();
		return;
	}
	if (currentOperator && !isEnteringSecondOperand) {
		y = content;
		const result = operate(x, y, currentOperator);
		x = result;
	} else {
		x = content;
	}
	currentOperator = btn.value;
	isEnteringSecondOperand = true;
}

function evalEquals() {
	if (currentOperator !== null && !isEnteringSecondOperand) {
		y = content;
		const result = operate(x, y, currentOperator);
		x = result === "NaN" ? null : result;
		currentOperator = null;
		isEnteringSecondOperand = true;
	}
}

function initButtons() {
	const buttons = document.querySelectorAll("button");

	buttons.forEach((btn) => {
		// Numbers
		if (!isNaN(Number(btn.id))) {
			btn.addEventListener("click", () => {
				numButtonHandler(btn);
			});
		} else if (btn.className === "operator") {
			btn.addEventListener("click", () => {
				operatorButtonHandler(btn);
			});
		} else if (btn.id === "equals") {
			btn.addEventListener("click", () => {
				evalEquals(btn);
			});
		} else if (btn.id === "clear") {
			btn.addEventListener("click", () => {
				resetParams();
			});
		}
	});
}

initButtons();
