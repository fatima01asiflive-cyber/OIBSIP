// ==========================================
// GET HTML ELEMENTS
// ==========================================

const previousOperandElement =
    document.getElementById("previous-operand");

const currentOperandElement =
    document.getElementById("current-operand");

const errorMessageElement =
    document.getElementById("error-message");


// ==========================================
// CALCULATOR VARIABLES
// ==========================================

let currentOperand = "";
let previousOperand = "";
let operation = undefined;
let shouldResetScreen = false;


// ==========================================
// CLEAR CALCULATOR
// ==========================================

function clearCalculator() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
    shouldResetScreen = false;

    clearError();
    updateDisplay();
}


// ==========================================
// DELETE LAST CHARACTER
// ==========================================

function deleteLast() {

    if (shouldResetScreen) {
        currentOperand = "";
        shouldResetScreen = false;
    } 
    else {
        currentOperand = currentOperand.slice(0, -1);
    }

    clearError();
    updateDisplay();
}


// ==========================================
// ADD NUMBER
// ==========================================

function appendNumber(number) {

    clearError();

    // New number after getting result
    if (shouldResetScreen) {
        currentOperand = "";
        shouldResetScreen = false;
    }

    // Don't allow two decimal points
    if (number === "." && currentOperand.includes(".")) {
        return;
    }

    // If user starts with decimal
    if (currentOperand === "" && number === ".") {
        currentOperand = "0.";
    }

    // Don't allow numbers like 0005
    else if (currentOperand === "0" && number !== ".") {
        currentOperand = number;
    }

    else {
        currentOperand += number;
    }

    updateDisplay();
}


// ==========================================
// CHOOSE OPERATION
// ==========================================

function chooseOperation(selectedOperation) {

    clearError();

    // Percentage
    if (selectedOperation === "%") {

        if (currentOperand === "") {
            return;
        }

        const value = parseFloat(currentOperand);

        currentOperand = String(value / 100);

        updateDisplay();

        return;
    }

    // Nothing entered
    if (
        currentOperand === "" &&
        previousOperand === ""
    ) {
        return;
    }

    // Change operator
    if (
        currentOperand === "" &&
        previousOperand !== ""
    ) {
        operation = selectedOperation;

        updateDisplay();

        return;
    }

    // Operator chaining
    if (previousOperand !== "") {
        compute();
    }

    operation = selectedOperation;

    previousOperand = currentOperand;

    currentOperand = "";

    shouldResetScreen = false;

    updateDisplay();
}


// ==========================================
// CALCULATE RESULT
// ==========================================

function compute() {

    if (
        previousOperand === "" ||
        currentOperand === "" ||
        operation === undefined
    ) {
        return;
    }

    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (
        Number.isNaN(previous) ||
        Number.isNaN(current)
    ) {
        return;
    }

    let result;


    // ======================================
    // PERFORM OPERATION
    // ======================================

    switch (operation) {

        case "+":

            result = previous + current;

            break;


        case "−":

            result = previous - current;

            break;


        case "×":

            result = previous * current;

            break;


        case "÷":

            // Division by zero
            if (current === 0) {

                showError("Cannot divide by zero.");

                currentOperand = "";
                previousOperand = "";
                operation = undefined;

                updateDisplay();

                return;
            }

            result = previous / current;

            break;


        default:

            return;
    }


    // Save result
    currentOperand = formatResult(result);

    previousOperand = "";

    operation = undefined;

    shouldResetScreen = true;

    updateDisplay();
}


// ==========================================
// FORMAT RESULT
// ==========================================

function formatResult(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    // Avoid very long decimal numbers
    const rounded =
        Number.parseFloat(
            number.toPrecision(12)
        );

    return String(rounded);
}


// ==========================================
// UPDATE DISPLAY
// ==========================================

function updateDisplay() {

    // Current number
    currentOperandElement.textContent =
        currentOperand || "0";


    // Previous number + operator
    if (
        previousOperand &&
        operation
    ) {

        previousOperandElement.textContent =
            `${previousOperand} ${operation}`;

    } 
    else {

        previousOperandElement.textContent = "";
    }
}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(message) {

    errorMessageElement.textContent = message;
}


// ==========================================
// CLEAR ERROR
// ==========================================

function clearError() {

    errorMessageElement.textContent = "";
}


// ==========================================
// NUMBER BUTTONS
// ==========================================

document
    .querySelectorAll("[data-number]")
    .forEach((button) => {

        button.addEventListener("click", () => {

            appendNumber(
                button.dataset.number
            );

        });

    });


// ==========================================
// OPERATOR BUTTONS
// ==========================================

document
    .querySelectorAll("[data-operation]")
    .forEach((button) => {

        button.addEventListener("click", () => {

            chooseOperation(
                button.dataset.operation
            );

        });

    });


// ==========================================
// CLEAR BUTTON
// ==========================================

document
    .querySelector("[data-clear]")
    .addEventListener(
        "click",
        clearCalculator
    );


// ==========================================
// DELETE BUTTON
// ==========================================

document
    .querySelector("[data-delete]")
    .addEventListener(
        "click",
        deleteLast
    );


// ==========================================
// EQUALS BUTTON
// ==========================================

document
    .querySelector("[data-equals]")
    .addEventListener(
        "click",
        compute
    );


// ==========================================
// KEYBOARD SUPPORT
// ==========================================

document.addEventListener("keydown", (event) => {

    // Numbers and decimal
    if (/^[0-9.]$/.test(event.key)) {

        appendNumber(event.key);

        return;
    }


    // Keyboard operators
    const keyboardOperations = {

        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };


    if (keyboardOperations[event.key]) {

        event.preventDefault();

        chooseOperation(
            keyboardOperations[event.key]
        );

        return;
    }


    // Enter or =
    if (
        event.key === "Enter" ||
        event.key === "="
    ) {

        event.preventDefault();

        compute();

        return;
    }


    // Backspace
    if (event.key === "Backspace") {

        deleteLast();

        return;
    }


    // Escape
    if (event.key === "Escape") {

        clearCalculator();
    }

});


// ==========================================
// INITIAL DISPLAY
// ==========================================

updateDisplay();