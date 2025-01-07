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
  
    let currentInput = "";//dabartine ivestis
    let previousInput = "";//buvusi ivestis
    let operator = null;//matematinis operatorius(+-*/)
  
    function updateDisplay(value) {
        display.textContent = value;
    }
  //ForEach loopas kartojamas per visus mygtukus priskiriant paspaudimo ivyki kiekvienam, kai paspaudziamas mygtukas
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonText = button.textContent;
  
            if (button.classList.contains("number")) {
                //Priskiria skaiciu dabartiniai ivesciai
                currentInput += buttonText;
                updateDisplay(currentInput);
            } else if (button.classList.contains("operator")) {
                // issaugo dabartine ivesti ir operacija
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = "";
                    operator = buttonText;
                    updateDisplay(operator);
                }
            } else if (button.id === "equals") {
                //iskviecia calculate funkcija su trimis parametrais (Number, Number, operator)
                if (previousInput && currentInput && operator) {
                    const result = calculate(Number(previousInput), Number(currentInput), operator);
                    updateDisplay(result); //atvaizduoja ekrane apskaiciuota rezultata
                    previousInput = "";  //buvusi ivestis priskiriama tusciam stringui
                    currentInput = result.toString(); //dabartinei ivesciai priskiriamas rezultata pavercia i stringa
                    operator = null;//operator priskiriamas null, nes nėra laukiančios operacijos (operatorius iš naujo nustatomas kaip tuščias)
                }
            } else if (button.id === "clear") {                
                //isvalyti visas ivestis (su opratorium) ir sk. ekrane atvaizduoti "0"
                currentInput = "";
                previousInput = "";
                operator = null;
                updateDisplay("0");
            } else if (button.id === "delete") {
                // Istrina paskutini skaiciu ekrane
                currentInput = currentInput.slice(0, -1);
                if (currentInput === "") {
                    updateDisplay("0");
                } else {
                    updateDisplay(currentInput);
                }
            } else if (button.id === "dot") {
                // Prideda taska dabartiniai ivesciai
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
            case "\u00d7": // daugyba
                return num1 * num2;
            case "\u00f7": // dalyba
                return num2 !== 0 ? num1 / num2 : "Error";
            default:
                return 0;
        }
    }
  });
  