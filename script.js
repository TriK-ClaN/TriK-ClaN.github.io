// Global state and DOM elements
let problemsByCat = { // Problems will be organized by category
    Factorials: [], PowersOf2: [], Squares: [], Multiplication: [],
    Cubes: [], Reciprocals: [], SquareRoots: []
};
let sdCategoryOrder = []; // For shuffled category order in Sudden Death
let sdCurrentCategoryIndex = 0; // Index for sdCategoryOrder

let suddenDeathActive = false;
let currentSuddenDeathStreak = 0;
let currentSuddenDeathProblemData = null;

const practiceModeContainer = document.getElementById('practiceModeContainer');
const suddenDeathModeContainer = document.getElementById('suddenDeathModeContainer');
const suddenDeathBtn = document.getElementById('suddenDeathBtn');
const practiceModeBtn = document.getElementById('practiceModeBtn');
const mainHeaderTitle = document.getElementById('mainHeaderTitle');
const suddenDeathProblemArea = document.getElementById('suddenDeathProblemArea');
const suddenDeathScorePopup = document.getElementById('suddenDeathScorePopup');

// --- Sound Function ---
function playSound(id, volume = 0.5) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play().catch(error => console.warn("Error playing sound:", id, error));
    }
}

// --- Utility: Shuffle Array (Fisher-Yates) ---
function shuffleArray(array) {
    let newArray = [...array]; // Create a copy to avoid mutating original if it's a reference
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// --- Problem Data Population (Categorized) ---
function populateAllProblemData() {
    // Clear existing problems
    for (const category in problemsByCat) {
        problemsByCat[category] = [];
    }

    // Factorials
    for (let i = 1; i <= 10; i++) {
        problemsByCat.Factorials.push({ questionText: `${i}! =`, correctAnswer: factorial(i), type: 'integer' });
    }
    // Powers Of 2
    for (let i = 0; i <= 10; i++) {
        problemsByCat.PowersOf2.push({ questionText: `2^${i} =`, correctAnswer: Math.pow(2, i), type: 'integer' });
    }
    // Squares
    for (let i = 0; i <= 50; i++) {
        problemsByCat.Squares.push({ questionText: `${i}² =`, correctAnswer: i * i, type: 'integer' });
    }
    // Multiplication
    for (let i = 1; i <= 25; i++) {
        for (let j = 1; j <= 25; j++) {
            problemsByCat.Multiplication.push({ questionText: `${i} × ${j} =`, correctAnswer: i * j, type: 'integer' });
        }
    }
    // Cubes
    for (let i = 1; i <= 10; i++) {
        problemsByCat.Cubes.push({ questionText: `${i}³ =`, correctAnswer: Math.pow(i, 3), type: 'integer' });
    }
    // Reciprocals
    for (let i = 2; i <= 20; i++) {
        let answer = parseFloat((1 / i).toFixed(4));
        problemsByCat.Reciprocals.push({ questionText: `1/${i} =`, correctAnswer: answer, type: 'float', precision: 4 });
    }
    // Square Roots
    const roots = [2, 3, 5, 7];
    roots.forEach(num => {
        let answer = parseFloat(Math.sqrt(num).toFixed(3));
        problemsByCat.SquareRoots.push({ questionText: `√${num} =`, correctAnswer: answer, type: 'float', precision: 3 });
    });
}

// --- Practice Mode Problem Creation (DOM) ---
function createProblem(container, text, correctAnswer) {
    const problemDiv = document.createElement("div");
    problemDiv.className = "problem";
    const label = document.createElement("span");
    label.textContent = text;
    const input = document.createElement("input");
    input.type = "text";
    if (Number.isInteger(correctAnswer)) {
        input.placeholder = "e.g. 42";
    } else if (correctAnswer.toString().includes('.')) {
        const precision = correctAnswer.toString().split('.')[1].length;
        input.placeholder = precision === 3 ? "e.g. 1.234" : (precision === 4 ? "e.g. 0.1234" : "e.g. 1.23");
    }
    const button = document.createElement("button");
    button.textContent = "Check";

    button.addEventListener("click", () => {
        const userAnswerText = input.value.trim().replace(',', '.');
        const userAnswerNum = parseFloat(userAnswerText);
        let isActuallyCorrect = false;
        input.classList.remove("correct", "incorrect");
        if (isNaN(userAnswerNum)) {
            isActuallyCorrect = false;
        } else {
            const isCorrectAnswerInt = Number.isInteger(correctAnswer) || (Math.abs(correctAnswer - Math.round(correctAnswer)) < 0.0000001);
            const decimals = correctAnswer.toString().includes('.') ? correctAnswer.toString().split('.')[1].length : 0;
            if (isCorrectAnswerInt && decimals === 0) {
                isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < 0.0000001;
            } else {
                let tolerance;
                if (decimals === 4) tolerance = 0.00005;
                else if (decimals === 3) tolerance = 0.0005;
                else if (decimals === 1 && Math.abs(correctAnswer - 0.5) < 0.0001) tolerance = 0.005;
                else tolerance = 0.001;
                isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < tolerance;
            }
        }
        if (isActuallyCorrect) {
            input.classList.add("correct");
            playSound("correct-sound", 0.1);
            if (!Number.isInteger(correctAnswer) && correctAnswer.toString().includes('.')) {
                 const dp = correctAnswer.toString().split('.')[1].length;
                 if (dp > 0) input.value = userAnswerNum.toFixed(dp); else input.value = userAnswerNum.toString();
            } else if (Number.isInteger(correctAnswer)){
                 input.value = correctAnswer.toString();
            }
            checkAllAnswers();
        } else {
            input.classList.add("incorrect");
            playSound("wrong-sound", 0.1);
        }
    });
    input.addEventListener("keypress", (event) => { if (event.key === "Enter") button.click(); });
    input.addEventListener("keydown", (event) => { if (event.key === "Tab") { event.preventDefault(); focusNextInput(input); }});
    problemDiv.appendChild(label);
    problemDiv.appendChild(input);
    problemDiv.appendChild(button);
    container.appendChild(problemDiv);
}

function focusNextInput(currentInput) {
    const inputs = Array.from(document.querySelectorAll("#practiceModeContainer input[type='text']:not([disabled])"));
    const currentIndex = inputs.indexOf(currentInput);
    const nextInput = inputs[currentIndex + 1];
    if (nextInput) nextInput.focus(); else if (inputs.length > 0) inputs[0].focus();
}

function factorial(n) {
    if (n < 0) return NaN; if (n === 0) return 1;
    let result = 1; for (let i = n; i > 0; i--) result *= i; return result;
}

function checkAllAnswers() {
    const inputs = document.querySelectorAll("#practiceModeContainer input[type='text']");
    if (inputs.length === 0) return;
    const allCorrect = Array.from(inputs).every((input) => input.classList.contains("correct"));
    if (allCorrect) { playSound("cheer-sound", 0.1); launchConfetti(); }
}

function launchConfetti() {
    if (typeof confetti === 'function') {
        confetti({ particleCount: 600, spread: 100, startVelocity: 35, origin: { y: 0.6 }, scalar: 1.1 });
    }
}

// --- Mode Switching Functions ---
function switchToSuddenDeath() {
    suddenDeathActive = true;
    if(practiceModeContainer) practiceModeContainer.style.display = 'none';
    if(suddenDeathModeContainer) suddenDeathModeContainer.style.display = 'flex';
    if(mainHeaderTitle) mainHeaderTitle.textContent = 'Sudden Death';
    if(suddenDeathBtn) suddenDeathBtn.style.display = 'none';
    if(practiceModeBtn) practiceModeBtn.style.display = 'inline-block';

    const categoryKeys = Object.keys(problemsByCat).filter(key => problemsByCat[key] && problemsByCat[key].length > 0);
    if (categoryKeys.length === 0) {
        console.error("Sudden Death: No categories with problems found!");
        if(suddenDeathProblemArea) suddenDeathProblemArea.innerHTML = '<p>Error: No problems available for Sudden Death mode!</p>';
        return;
    }
    sdCategoryOrder = shuffleArray(categoryKeys); // Shuffle initial order
    sdCurrentCategoryIndex = 0; // Start from the beginning of the shuffled list

    currentSuddenDeathStreak = 0;
    showScorePopup(false);
    loadNextSuddenDeathProblem();
}

function switchToPracticeMode() {
    suddenDeathActive = false;
    if(suddenDeathModeContainer) suddenDeathModeContainer.style.display = 'none';
    if(practiceModeContainer) practiceModeContainer.style.display = 'block';
    if(mainHeaderTitle) mainHeaderTitle.textContent = 'GMAT Practice';
    if(suddenDeathBtn) suddenDeathBtn.style.display = 'inline-block';
    if(practiceModeBtn) practiceModeBtn.style.display = 'none';
    if(suddenDeathProblemArea) suddenDeathProblemArea.innerHTML = '';
    showScorePopup(false);
}

// --- Sudden Death Game Logic ---
function loadNextSuddenDeathProblem() {
    if (!suddenDeathProblemArea) return;
    suddenDeathProblemArea.innerHTML = '';

    let availableCategories = Object.keys(problemsByCat).filter(key => problemsByCat[key] && problemsByCat[key].length > 0);
    if (availableCategories.length === 0) {
        suddenDeathProblemArea.innerHTML = '<p>Error: No problems available!</p>';
        return;
    }

    if (sdCategoryOrder.length === 0 || sdCurrentCategoryIndex >= sdCategoryOrder.length) {
        // Reshuffle categories if we've gone through all of them or if order is empty
        sdCategoryOrder = shuffleArray(availableCategories);
        sdCurrentCategoryIndex = 0;
        if (sdCategoryOrder.length === 0) { // Should be caught by availableCategories check
            suddenDeathProblemArea.innerHTML = '<p>Error: Categories exhausted unexpectedly!</p>';
            return;
        }
    }

    const currentCategoryKey = sdCategoryOrder[sdCurrentCategoryIndex];
    const problemsInCurrentCategory = problemsByCat[currentCategoryKey];

    if (!problemsInCurrentCategory || problemsInCurrentCategory.length === 0) {
        console.warn(`Category ${currentCategoryKey} is empty. Attempting to skip.`);
        sdCurrentCategoryIndex++; // Move to next category
        loadNextSuddenDeathProblem(); // Recursive call, will check index bounds again
        return;
    }

    const randomIndex = Math.floor(Math.random() * problemsInCurrentCategory.length);
    currentSuddenDeathProblemData = problemsInCurrentCategory[randomIndex];
    
    createSuddenDeathProblemDOM(currentSuddenDeathProblemData);
    
    sdCurrentCategoryIndex++; // Move to the next category in the shuffled list for the next turn
}

function createSuddenDeathProblemDOM(problemData) {
    if (!suddenDeathProblemArea) return;
    const problemDiv = document.createElement("div");
    problemDiv.className = "problem";
    const label = document.createElement("span");
    label.textContent = problemData.questionText;
    const input = document.createElement("input");
    input.type = "text";
    if (problemData.type === 'integer') {
        input.placeholder = "e.g. 42";
    } else if (problemData.type === 'float') {
        const prec = problemData.precision;
        input.placeholder = prec === 3 ? "e.g. 1.234" : (prec === 4 ? "e.g. 0.1234" : "e.g. 1.23");
    }
    const button = document.createElement("button");
    button.textContent = "Check";
    button.addEventListener("click", () => handleSuddenDeathAnswer(input.value, problemData, problemDiv));
    input.addEventListener("keypress", (event) => { if (event.key === "Enter") button.click(); });
    problemDiv.appendChild(label);
    problemDiv.appendChild(input);
    problemDiv.appendChild(button);
    suddenDeathProblemArea.appendChild(problemDiv);
    input.focus();
}

function handleSuddenDeathAnswer(userAnswerText, problemData, problemDiv) {
    if (!problemDiv) return;
    const inputField = problemDiv.querySelector('input[type="text"]');
    const checkButton = problemDiv.querySelector('button');
    if (inputField) inputField.disabled = true;
    if (checkButton) checkButton.disabled = true;

    const userAnswerNum = parseFloat(userAnswerText.trim().replace(',', '.'));
    let isCorrect = false;
    if (isNaN(userAnswerNum)) {
        isCorrect = false;
    } else {
        if (problemData.type === 'integer') {
            isCorrect = Math.abs(userAnswerNum - problemData.correctAnswer) < 0.0000001;
        } else { 
            let tolerance;
            if (problemData.precision === 4) tolerance = 0.00005;
            else if (problemData.precision === 3) tolerance = 0.0005;
            else if (problemData.precision === 1 && Math.abs(problemData.correctAnswer - 0.5) < 0.0001) tolerance = 0.005;
            else tolerance = 0.001;
            isCorrect = Math.abs(userAnswerNum - problemData.correctAnswer) < tolerance;
        }
    }
    
    if (inputField) {
        inputField.classList.remove("correct", "incorrect");
        if (isCorrect) inputField.classList.add("correct"); else inputField.classList.add("incorrect");
    }

    if (isCorrect) {
        currentSuddenDeathStreak++;
        playSound("correct-sound", 0.1);
        showScorePopup(true, false, `Score: ${currentSuddenDeathStreak}`);
        setTimeout(loadNextSuddenDeathProblem, 1800);
    } else {
        playSound("wrong-sound", 0.1);
        
        const correctAnswerDisplay = document.createElement("div");
        correctAnswerDisplay.className = "correct-answer-display";
        let correctAnswerTextValue = problemData.correctAnswer.toString();
        if (problemData.type === 'float' && typeof problemData.precision === 'number') {
            correctAnswerTextValue = problemData.correctAnswer.toFixed(problemData.precision);
        }
        correctAnswerDisplay.innerHTML = `Correct Answer: <strong>${correctAnswerTextValue}</strong>`;
        
        if (problemDiv && problemDiv.parentNode) {
            problemDiv.parentNode.insertBefore(correctAnswerDisplay, problemDiv);
        } else if (suddenDeathProblemArea) {
            suddenDeathProblemArea.prepend(correctAnswerDisplay);
        }

        showScorePopup(true, true, `Game Over! Final Streak: ${currentSuddenDeathStreak}`);
        
        const playAgainButton = document.createElement("button");
        playAgainButton.textContent = "Play Again";
        playAgainButton.className = "header-button sudden-death-button";
        playAgainButton.style.position = "static";
        playAgainButton.style.margin = "20px auto";
        playAgainButton.style.display = "block";
        playAgainButton.addEventListener("click", switchToSuddenDeath);
        
        if (problemDiv && problemDiv.parentNode) {
            problemDiv.parentNode.appendChild(playAgainButton);
        } else if (suddenDeathProblemArea) {
            suddenDeathProblemArea.appendChild(playAgainButton);
        }
    }
}

let scorePopupTimeout;
function showScorePopup(show, isGameOver = false, text = "") {
    if (!suddenDeathScorePopup) return;
    clearTimeout(scorePopupTimeout);
    if (text) suddenDeathScorePopup.textContent = text;

    if (show) {
        suddenDeathScorePopup.style.display = 'block';
        void suddenDeathScorePopup.offsetWidth;
        suddenDeathScorePopup.classList.add('show');
        if (!isGameOver) {
            scorePopupTimeout = setTimeout(() => {
                suddenDeathScorePopup.classList.remove('show');
                setTimeout(() => { if (suddenDeathScorePopup && !suddenDeathScorePopup.classList.contains('show')) suddenDeathScorePopup.style.display = 'none'; }, 300);
            }, 1500);
        }
    } else {
        suddenDeathScorePopup.classList.remove('show');
        setTimeout(() => { if (suddenDeathScorePopup && !suddenDeathScorePopup.classList.contains('show')) suddenDeathScorePopup.style.display = 'none'; }, 300);
    }
}

// --- Initial Page Setup ---
document.addEventListener('DOMContentLoaded', () => {
    populateAllProblemData(); // Populate the categorized problems

    const uiElements = { // Store references to DOM elements used for practice mode
        factorials: document.getElementById("factorials"),
        powers: document.getElementById("powers"),
        squares: document.getElementById("squares"),
        multiplication: document.getElementById("multiplication"),
        cubes: document.getElementById("cubes"),
        fractions: document.getElementById("fractions"),
        squareRoots: document.getElementById("square-roots")
    };

    if (uiElements.factorials) {
        for (let i = 1; i <= 10; i++) createProblem(uiElements.factorials, `${i}! =`, factorial(i));
    }
    if (uiElements.powers) {
        for (let i = 0; i <= 10; i++) createProblem(uiElements.powers, `2^${i} =`, Math.pow(2, i));
    }
    if (uiElements.squares) {
        for (let i = 0; i <= 50; i++) createProblem(uiElements.squares, `${i}² =`, i * i);
    }
    if (uiElements.multiplication) {
        for (let i = 1; i <= 25; i++) {
            for (let j = 1; j <= 25; j++) createProblem(uiElements.multiplication, `${i} × ${j} =`, i * j);
        }
    }
    if (uiElements.cubes) {
        for (let i = 1; i <= 10; i++) createProblem(uiElements.cubes, `${i}³ =`, Math.pow(i, 3));
    }
    if (uiElements.fractions) {
        for (let i = 2; i <= 20; i++) createProblem(uiElements.fractions, `1/${i} =`, parseFloat((1 / i).toFixed(4)));
    }
    if (uiElements.squareRoots) {
        const roots = [2, 3, 5, 7];
        roots.forEach(num => createProblem(uiElements.squareRoots, `√${num} =`, parseFloat(Math.sqrt(num).toFixed(3))));
    }

    if (suddenDeathBtn) suddenDeathBtn.addEventListener('click', switchToSuddenDeath);
    if (practiceModeBtn) practiceModeBtn.addEventListener('click', switchToPracticeMode);
});