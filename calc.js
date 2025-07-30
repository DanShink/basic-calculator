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
	switch (operator) {
		case "+":
			return add(a, b);
		case "-":
			return subtract(a, b);
		case "*":
			return multiply(a, b);
		case "/":
			return divide(a, b);

		default:
			console.log(`Error: Operator ${operator} Unknown!`);
			break;
	}
}

let x = 0;
let y = 0;
let z = 0;
