/**
 * Javascript Calculator
 * Author: Antonis Triantafullopoylos <antonistri96@gmail.com>
 * Date: 25/01/2018
 */

var display = document.getElementById('display');
var keys = document.getElementsByClassName('keys');

/**
 * Main controller function
 */
function displayController() {
    var keyValue = this.value.toLowerCase();
    var displayValue = display.value;

    switch (keyValue) {
        case "c":
            clearScreen();
            break;
        case "ce":
            display.value = backspace(displayValue);
            break;
        case "=":
            display.value = calculate(displayValue);
            break;
        default:
            var currentDisplay = displayValue + keyValue;
            var lastChar = getLastChar(currentDisplay);
            if (currentDisplay.indexOf("0") === 0 && currentDisplay.indexOf(".") !== 1) {
                clearScreen();
                appendToDisplay(keyValue);
            } else if (isOperator(keyValue) && hasOperator(displayValue) !== false) {
                var newValue = calculate(displayValue);
                display.value = newValue + keyValue;
            } else if (isOperator(lastChar) && hasOperator(displayValue) !== false) {
                var newValue = backspace(displayValue);
                display.value = newValue + keyValue;
            } else {
                appendToDisplay(keyValue);
            }
            break;
    }
}

/**
 * Append last pressed key to display
 * @param {string} str 
 */
function appendToDisplay(str) {
    var oldDisplay = display.value;
    display.value = oldDisplay + str;
}

/**
 * Clear the display
 */
function clearScreen() {
    display.value = "";
}

/**
 * Remove last character of a string
 * @param {string} str 
 */
function backspace(str) {
    return str.slice(0, -1);
}

/**
 * Return last character of a string
 * @param {string} str 
 */
function getLastChar(str) {
    return str.slice(-1);
}

/**
 * Make calculation
 * @param {string} str 
 */
function calculate(str) {
    operator = hasOperator(str);
    if (operator !== false) {
        var firstNegative = false;
        if (str.charAt(0) === "-") {
            firstNegative = true;
            str = str.slice(1);
        }
        var numbers = str.split(operator);
        var num1 = numbers[0]
        if (firstNegative) {
            num1 = "-" + num1;
        }
        num1 = isInt(num1);
        var num2 = isInt(numbers[1]);
        if (isNaN(num2)) {
            return num1;
        } else if (num2 === 0 && operator === "/") {
            return "\u221e";
        }
        switch (operator) {
            case "+":
                return num1 + num2;
                break;
            case "-":
                return num1 - num2;
                break;
            case "*":
                return num1 * num2;
                break;
            case "/":
                return num1 / num2;
                break;
            case "^":
                return Math.pow(num1, num2);
                break;
        }
    }
    return str;
}

/**
 * Insert a string number and return Integer or Float 
 * @param {number} x 
 */
function isInt(x) {
    if (Number.isSafeInteger(x)) {
        return Number.parseInt(x);
    } else {
        return Number.parseFloat(x);
    }
}

/**
 * Check if an operator exist
 * @param {string} str 
 */
function hasOperator(str) {
    var operators = ["+", "-", "*", "/", "^"];
    var i = 0;
    do {
        if (str.indexOf(operators[i], 1) !== -1) {
            return operators[i];
        }
        i++;
    } while (i < operators.length);
    return false;
}

/**
 * Check if key has exist
 * @param {string} key 
 */
function isOperator(key) {
    var operators = ["+", "-", "*", "/", "^"];
    var i = 0;
    do {
        if (key === operators[i]) {
            return true;
        }
        i++;
    } while (i < operators.length);
    return false;
}

/**
 * Add event listeners to buttons
 */
for (var key = 0; key < keys.length; key++) {
    keys[key].addEventListener("click", displayController, false);
}