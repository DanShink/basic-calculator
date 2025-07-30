// Init display
const disp = document.querySelector("p");
disp.innerText = "0";

let x = null;
let y = null;
let content = 0;

function updateDisplay(dispString) {
	disp.innerText = dispString;
	content = Number(dispString);
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
	let result;
	switch (operator) {
		case "+":
			result = add(a, b);
			updateDisplay(result.toString());
			break;
		case "-":
			result = subtract(a, b);
			updateDisplay(result.toString());
			break;
		case "*":
			result = multiply(a, b);
			updateDisplay(result.toString());
			break;
		case "/":
			result = divide(a, b);
			updateDisplay(result.toString());
			break;
		default:
			console.log(`Error: Operator ${operator} Unknown!`);
			break;
	}
}

function numButtonHandler(btn) {
	disp.innerText === "0"
		? updateDisplay(btn.id)
		: updateDisplay(`${disp.innerText}${btn.id}`);
	content = Number(disp.innerText);
}

function operatorButtonHandler(btn) {
	console.log(`I am an operator of value ${btn.value}`);
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
		}
	});
}

initButtons();
