/*-------------------------------- Constants --------------------------------*/

const display = document.querySelector('.display');
const calculator = document.querySelector('#calculator');

/*-------------------------------- Variables --------------------------------*/

let currentInput = '';
let previousInput = '';
let operator = '';

/*------------------------ Cached Element References ------------------------*/




/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('button')) {
        const value = clickedElement.innerText;
        handleButtonClick(value);
    }
});

/*-------------------------------- Functions --------------------------------*/


// Handles button clicks and performs the appropriate actions
function handleButtonClick(value) {
    if (isNumber(value)) {
        currentInput += value;
        updateDisplay(currentInput);
    } else if (isOperator(value)) {
        if (currentInput !== '') {
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
    } else if (value === '=') {
        if (currentInput !== '' && previousInput !== '' && operator !== '') {
            const result = calculate(previousInput, currentInput, operator);
            updateDisplay(result);
            resetCalculator(result);
        }
    } else if (value === 'C') {
        resetCalculator();
        updateDisplay('');
    }
}

// Checks if the value is a number
function isNumber(value) {
    return !isNaN(value);
}

// Checks if the value is an operator
function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

// Performs a calculation based on the operator and inputs
function calculate(prev, curr, op) {
    const num1 = parseFloat(prev);
    const num2 = parseFloat(curr);

    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error'; // Handle division by zero
        default:
            return '';
    }
}

// Updates the calculator display with the given value
function updateDisplay(value) {
    display.innerText = value;
}

// Resets the calculator to its initial state
function resetCalculator(result = '') {
    currentInput = result ? result.toString() : '';
    previousInput = '';
    operator = '';
}