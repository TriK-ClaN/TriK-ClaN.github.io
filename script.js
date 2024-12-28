// Populate Factorials
const factorialsContainer = document.getElementById("factorials");
for (let i = 1; i <= 10; i++) {
    createProblem(factorialsContainer, `${i}! =`, factorial(i));
}

// Populate Powers Of 2
const powersContainer = document.getElementById("powers");
for (let i = 0; i <= 10; i++) {
    createProblem(powersContainer, `2^${i} =`, Math.pow(2, i));
}

// Populate Squares
const squaresContainer = document.getElementById("squares");
for (let i = 0; i <= 50; i++) {
    createProblem(squaresContainer, `${i}² =`, i * i);
}

// Create Problem Row
function createProblem(container, text, correctAnswer) {
    const problemDiv = document.createElement("div");
    problemDiv.className = "problem";

    const label = document.createElement("span");
    label.textContent = text;

    const input = document.createElement("input");
    input.type = "text";

    const button = document.createElement("button");
    button.textContent = "Check";

    button.addEventListener("click", () => {
        const userAnswer = parseInt(input.value, 10);
        input.classList.remove("correct", "incorrect");

        if (userAnswer === correctAnswer) {
            input.classList.add("correct");
            checkAllAnswers();
        } else {
            input.classList.add("incorrect");
        }
    });

    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            button.click();
        }
    });

    problemDiv.appendChild(label);
    problemDiv.appendChild(input);
    problemDiv.appendChild(button);
    container.appendChild(problemDiv);
}

// Factorial Calculation
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// Check All Answers
function checkAllAnswers() {
    const inputs = document.querySelectorAll("input[type='text']");
    const allCorrect = Array.from(inputs).every((input) =>
        input.classList.contains("correct")
    );

    if (allCorrect) {
        launchConfetti();
    }
}

// Massive Confetti Animation
function launchConfetti() {
    confetti({
        particleCount: 1000,
        spread: 160,
        startVelocity: 50,
        origin: { y: 0.6 },
        scalar: 1.5
    });
}