const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-screen');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    // Check if the clicked element is a button
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            clearCalculator();
            break;
        default:
            // Check if the value is a number
            if (!isNaN(parseFloat(value))) {
                inputDigit(value);
            }
    }
});

function inputDigit(digit) {
    if (waitingForSecondValue === true) {
        // Start a new input if waiting for second value
        display.value = digit;
        waitingForSecondValue = false;
    } else {
        // Append digit, replace '0' if it's the current display
        display.value = display.value === '0' ? digit : display.value + digit;
    }
}

function inputDecimal(dot) {
    // Prevent multiple decimals
    if (waitingForSecondValue === true) {
        display.value = '0.';
        waitingForSecondValue = false;
        return;
    }

    if (!display.value.includes(dot)) {
        display.value += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (operator && waitingForSecondValue) {
        // If an operator is already selected and we are waiting for the second number,
        // update the operator to the new one.
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        // Set the first number
        firstValue = inputValue;
    } else if (operator) {
        // If an operator is present, calculate the result
        const result = calculate(firstValue, inputValue, operator);
        display.value = String(result);
        firstValue = result; // Set the result as the new first value
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return first / second;
    
    return second;
}

function clearCalculator() {
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    display.value = '0';
}
