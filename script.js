// Play Sound Function
function playSound(id, volume = 0.5) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play().catch(error => console.log("Error playing sound:", error));
    }
}

// Populate Factorials
const factorialsContainer = document.getElementById("factorials");
if (factorialsContainer) {
    for (let i = 1; i <= 10; i++) {
        createProblem(factorialsContainer, `${i}! =`, factorial(i));
    }
}

// Populate Powers Of 2
const powersContainer = document.getElementById("powers");
if (powersContainer) {
    for (let i = 0; i <= 10; i++) {
        createProblem(powersContainer, `2^${i} =`, Math.pow(2, i));
    }
}

// Populate Squares
const squaresContainer = document.getElementById("squares");
if (squaresContainer) {
    for (let i = 0; i <= 50; i++) { // Covers 1^2 through 25^2 as requested
        createProblem(squaresContainer, `${i}² =`, i * i);
    }
}

// Populate Multiplication (1x1 to 25x25)
const multiplicationContainer = document.getElementById("multiplication");
if (multiplicationContainer) {
    for (let i = 1; i <= 25; i++) {
        for (let j = 1; j <= 25; j++) {
            createProblem(multiplicationContainer, `${i} × ${j} =`, i * j);
        }
    }
}

// Populate Cubes (1^3 to 10^3)
const cubesContainer = document.getElementById("cubes");
if (cubesContainer) {
    for (let i = 1; i <= 10; i++) {
        createProblem(cubesContainer, `${i}³ =`, Math.pow(i, 3));
    }
}

// Populate Fractions (Reciprocals 1/2 to 1/20)
const fractionsContainer = document.getElementById("fractions");
if (fractionsContainer) {
    for (let i = 2; i <= 20; i++) {
        let answer = parseFloat((1 / i).toFixed(4)); // Answer to 4 decimal places
        createProblem(fractionsContainer, `1/${i} =`, answer);
    }
}

// Populate Square Roots (sqrt(2), sqrt(3), sqrt(5), sqrt(7))
const squareRootsContainer = document.getElementById("square-roots");
if (squareRootsContainer) {
    const roots = [2, 3, 5, 7];
    roots.forEach(num => {
        let answer = parseFloat(Math.sqrt(num).toFixed(3)); // Answer to 3 decimal places
        createProblem(squareRootsContainer, `√${num} =`, answer);
    });
}


// Create Problem Row
function createProblem(container, text, correctAnswer) {
    const problemDiv = document.createElement("div");
    problemDiv.className = "problem";

    const label = document.createElement("span");
    label.textContent = text;

    const input = document.createElement("input");
    input.type = "text";
    // Set placeholder based on type of correctAnswer for guidance
    if (Number.isInteger(correctAnswer)) {
        input.placeholder = "e.g. 42";
    } else if (correctAnswer.toString().includes('.')) {
        const precision = correctAnswer.toString().split('.')[1].length;
        if (precision === 3) input.placeholder = "e.g. 1.234";
        else if (precision === 4) input.placeholder = "e.g. 0.1234";
        else input.placeholder = "e.g. 1.23"; // Default for other float precisions
    }


    const button = document.createElement("button");
    button.textContent = "Check";

    button.addEventListener("click", () => {
        const userAnswerText = input.value.trim().replace(',', '.'); // Allow comma for decimal
        const userAnswerNum = parseFloat(userAnswerText);
        let isActuallyCorrect = false;

        input.classList.remove("correct", "incorrect");

        if (isNaN(userAnswerNum)) {
            isActuallyCorrect = false;
        } else {
            const isCorrectAnswerEffectivelyInteger = Number.isInteger(correctAnswer) || (Math.abs(correctAnswer - Math.round(correctAnswer)) < 0.0000001);
            const correctAnswerStr = correctAnswer.toString();
            const decimalPlacesOfCorrectAnswer = correctAnswerStr.includes('.') ? correctAnswerStr.split('.')[1].length : 0;

            if (isCorrectAnswerEffectivelyInteger && decimalPlacesOfCorrectAnswer === 0) {
                // For integer correct answers, user's answer should be an integer or a float exactly equal to it.
                isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < 0.0000001;
            } else {
                // Floating point correctAnswer
                let tolerance;
                // Determine tolerance based on the precision of the correctAnswer (which was set by toFixed)
                if (decimalPlacesOfCorrectAnswer === 3) { // e.g., sqrt(x) which were toFixed(3)
                    tolerance = 0.0005; // User input should be within +/- 0.0005 of the stored 3-decimal answer
                } else if (decimalPlacesOfCorrectAnswer === 4) { // e.g., 1/x which were toFixed(4)
                    tolerance = 0.00005; // User input should be within +/- 0.00005 of the stored 4-decimal answer
                } else if (decimalPlacesOfCorrectAnswer === 1 && correctAnswer === 0.5) { // Special case for 1/2 = 0.5
                    tolerance = 0.005; // e.g. for 0.5, allow 0.50
                }
                 else { // Default for other floats if any, or if precision detection failed
                    tolerance = 0.001; // A general tolerance
                }
                isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < tolerance;
            }
        }

        if (isActuallyCorrect) {
            input.classList.add("correct");
            playSound("correct-sound", 0.1);
            // Optionally reformat input to match correct answer's precision if it's a float
            if (!Number.isInteger(correctAnswer) && correctAnswer.toString().includes('.')) {
                 const dp = correctAnswer.toString().split('.')[1].length;
                 if (dp > 0) { // ensure there is a decimal part
                    input.value = userAnswerNum.toFixed(dp);
                 } else {
                    input.value = userAnswerNum.toString(); // if it became an integer like 1.0
                 }
            } else if (Number.isInteger(correctAnswer)){
                 input.value = correctAnswer.toString(); // Standardize integer display
            }
            checkAllAnswers();
        } else {
            input.classList.add("incorrect");
            playSound("wrong-sound", 0.1);
        }
    });

    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            button.click();
        }
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            focusNextInput(input);
        }
    });

    problemDiv.appendChild(label);
    problemDiv.appendChild(input);
    problemDiv.appendChild(button);
    container.appendChild(problemDiv);
}

// Focus Next Input Field
function focusNextInput(currentInput) {
    const inputs = Array.from(document.querySelectorAll("input[type='text']:not([disabled])")); // Select only enabled inputs
    const currentIndex = inputs.indexOf(currentInput);
    const nextInput = inputs[currentIndex + 1];
    if (nextInput) {
        nextInput.focus();
    } else {
        // If it's the last input, maybe focus the first input of the page or do nothing
        if (inputs.length > 0) inputs[0].focus(); // Loop to the first input
    }
}

// Factorial Calculation
function factorial(n) {
    if (n < 0) return NaN; // Factorial not defined for negative numbers
    if (n === 0) return 1; // 0! = 1
    let result = 1;
    for (let i = n; i > 0; i--) {
        result *= i;
    }
    return result;
}

// Check All Answers
function checkAllAnswers() {
    const inputs = document.querySelectorAll("input[type='text']");
    if (inputs.length === 0) return; // No inputs to check

    const allCorrect = Array.from(inputs).every((input) =>
        input.classList.contains("correct")
    );

    if (allCorrect) {
        playSound("cheer-sound", 0.1);
        launchConfetti();
    }
}

// Massive Confetti Animation
function launchConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 600, // Adjusted for performance/preference
            spread: 100,
            startVelocity: 35,
            origin: { y: 0.6 },
            scalar: 1.1
        });
    }
}

// Ensure DOM is loaded before trying to get elements if scripts are in <head>
// Since script is at the end of body, this is less critical but good practice.
document.addEventListener('DOMContentLoaded', () => {
    // The population scripts for containers already have null checks,
    // so they are safe even if DOM elements are not found.
});