document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
  
    let currentInput = "";
    let previousInput = "";
    let operator = null;


    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;
  
            if (button.classList.contains("number")) {
                // Append number to the current input
                currentInput += buttonText;
                updateDisplay(currentInput);
            } else if (button.classList.contains("operator")) {
                // Store the current input and operator
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = "";
                    operator = buttonText;
                    updateDisplay(operator);
                }
            } else if (button.id === "equals") {
                if (previousInput && currentInput && operator) {
                    const result = calculate(Number(previousInput), Number(currentInput), operator);
                    updateDisplay(result);
                    previousInput = "";
                    currentInput = result.toString();
                    operator = null;
                }
            } else if (button.id === "clear") {
                // Clear all inputs and reset display
                currentInput = "";
                previousInput = "";
                operator = null;
                updateDisplay("0");
            } else if (button.id === "delete") {
                // Remove last character from current input
                currentInput = currentInput.slice(0, -1);
                if (currentInput === "") {
                    updateDisplay("0");
                } else {
                    updateDisplay(currentInput);
                }
            } else if (button.id === "dot") {
                // Add dot to the current input
                if (!currentInput.includes(".")) {
                    currentInput += ".";
                    updateDisplay(currentInput);
                }
            }
        });
    });




});