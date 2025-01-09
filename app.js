//Jūsų tikslas – sukurti pilnai funkcionuojantį skaičiuotuvą su 4 funkcijom: sudėt, atimt, dalint, daugint,
//  na ir aišku dėti tašką, ištrinti ir anuliuoti.
//  NEGALIMA NAUDOTI:
//  o innerHTML
//  o JS HTML failo viduje 
// o eval() ar bet ko kas dirba su string duomenų tipu
//  apskaičiavime.

document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
  
    let currentInput = "";
    let previousInput = "";
    let operator = null;
  
    function updateDisplay(value) {
        display.textContent = value;
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;                
            if (button.classList.contains("number")) {                
                currentInput += buttonText;
                updateDisplay(currentInput);                    
            } else if (button.classList.contains("operator")) {                
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
                currentInput = "";
                previousInput = "";
                operator = null;
                updateDisplay("0");
            } else if (button.id === "delete") {                
                currentInput = currentInput.slice(0, -1);
                if (currentInput === "") {
                    updateDisplay("0");
                } else {
                    updateDisplay(currentInput);
                }
            } else if (button.id === "dot") {                
                if (!currentInput.includes(".")) {
                    currentInput += ".";
                    updateDisplay(currentInput);
                }
            }
        });
    });
  
    function calculate(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "\u00d7":
                return num1 * num2;
            case "\u00f7":
                return num2 !== 0 ? num1 / num2 : "Error";
            default:
                return 0;
        }
    }
  });
  