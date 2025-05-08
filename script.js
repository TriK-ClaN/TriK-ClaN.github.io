// Global State And Dom Elements
let problemsByCat = {
    Factorials: [], PowersOf2: [], Squares: [], Multiplication: [],
    Cubes: [], Reciprocals: [], SquareRoots: []
};
const categoryDisplayNames = {
    Factorials: "Factorials", PowersOf2: "Powers of 2", Squares: "Squares",
    Multiplication: "Multiplication", Cubes: "Cubes", Reciprocals: "Reciprocals",
    SquareRoots: "Square Roots"
};
const defaultSdCategories = ['Multiplication', 'Squares', 'Reciprocals', 'Cubes', 'SquareRoots'];
const terminatingReciprocalDenominators = [2, 4, 5, 8, 10, 16, 20]; // Denominators with exact decimal representation

let sdCategoryOrder = [];
let sdCurrentCategoryIndex = 0;
let suddenDeathGameStarted = false;

let suddenDeathActive = false;
let currentSuddenDeathStreak = 0;
let currentSuddenDeathProblemData = null; // Holds the full data object for the current SD problem

const practiceModeContainer = document.getElementById('practiceModeContainer');
const suddenDeathModeContainer = document.getElementById('suddenDeathModeContainer');
const suddenDeathContent = document.querySelector('.sudden-death-content');
const suddenDeathBtn = document.getElementById('suddenDeathBtn');
const practiceModeBtn = document.getElementById('practiceModeBtn');
const mainHeaderTitle = document.getElementById('mainHeaderTitle');
const suddenDeathProblemArea = document.getElementById('suddenDeathProblemArea');
const suddenDeathScorePopup = document.getElementById('suddenDeathScorePopup');
const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
const sdCategorySelector = document.getElementById('sdCategorySelector');
const sdCategoryTogglesContainer = document.getElementById('sdCategoryTogglesContainer');
const startSuddenDeathCustomBtn = document.getElementById('startSuddenDeathCustomBtn');
const sdErrorNoCategory = document.getElementById('sdErrorNoCategory');


// Sound Function
function playSound(id, volume = 0.5) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play().catch(error => console.warn("Error playing sound:", id, error));
    }
}

// Shuffle Array Utility
function shuffleArray(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Problem Data Population
function populateAllProblemData() {
    for (const category in problemsByCat) { problemsByCat[category] = []; }
    // Factorials
    for (let i = 1; i <= 10; i++) { problemsByCat.Factorials.push({ questionText: `${i}! =`, correctAnswer: factorial(i), type: 'integer' }); }
    // Powers of 2
    for (let i = 0; i <= 10; i++) { problemsByCat.PowersOf2.push({ questionText: `2^${i} =`, correctAnswer: Math.pow(2, i), type: 'integer' }); }
    // Squares (0-25)
    for (let i = 0; i <= 25; i++) { problemsByCat.Squares.push({ questionText: `${i}² =`, correctAnswer: i * i, type: 'integer' }); }
    // Multiplication (1-25)
    for (let i = 1; i <= 25; i++) { for (let j = 1; j <= 25; j++) { problemsByCat.Multiplication.push({ questionText: `${i} × ${j} =`, correctAnswer: i * j, type: 'integer' }); } }
    // Cubes (1-10)
    for (let i = 1; i <= 10; i++) { problemsByCat.Cubes.push({ questionText: `${i}³ =`, correctAnswer: Math.pow(i, 3), type: 'integer' }); }
    // Reciprocals (1/2 - 1/20) - Store denominator for exact display check
    for (let i = 2; i <= 20; i++) {
        let roundedAnswer = parseFloat((1 / i).toFixed(2)); // Answer rounded for checking
        problemsByCat.Reciprocals.push({
            questionText: `1/${i} =`,
            correctAnswer: roundedAnswer, // Used for checking within tolerance
            denominator: i,               // Store the denominator to check for exact display
            type: 'float',
            precision: 2
        });
    }
    // Square Roots (Exact values, rounded to 2 DP)
    const roots = [2, 3, 5, 7];
    roots.forEach(num => {
        let answer = parseFloat(Math.sqrt(num).toFixed(2));
        problemsByCat.SquareRoots.push({
             questionText: `√${num} =`,
             correctAnswer: answer,
             type: 'float',
             precision: 2
        });
     });
}

// Practice Mode Problem Creation And Interaction
function createProblem(container, problemData) { // Refactored to accept problemData object
    const problemDiv = document.createElement("div");
    problemDiv.className = "problem";
    // Store problem data on the element for later retrieval
    problemDiv.dataset.problemData = JSON.stringify(problemData);

    const label = document.createElement("span");
    label.textContent = problemData.questionText;

    const input = document.createElement("input");
    input.type = "text";
    input.incorrectGuessCount = 0;
    // Set placeholder based on type and precision
    if (problemData.type === 'integer') {
         input.placeholder = "e.g. 42";
    } else if (problemData.type === 'float') {
        const p = problemData.precision;
        input.placeholder = p === 2 ? "e.g. 0.12" : (p === 3 ? "e.g. 1.234" : (p === 4 ? "e.g. 0.1234" : "e.g. 1.23"));
    }

    const button = document.createElement("button");
    button.textContent = "Check";

    // Check Button Event Listener
    button.addEventListener("click", () => {
        if (suddenDeathActive) return;

        // Retrieve problem data from the parent div
        const currentProblemData = JSON.parse(problemDiv.dataset.problemData);
        const correctAnswer = currentProblemData.correctAnswer; // Answer used for checking (possibly rounded)

        const userAnswerText = input.value.trim().replace(',', '.');
        const userAnswerNum = parseFloat(userAnswerText);
        let isActuallyCorrect = false;
        input.classList.remove("correct", "incorrect");

        if (isNaN(userAnswerNum)) {
             isActuallyCorrect = false;
        } else {
            // Check integer or float with tolerance
            if (currentProblemData.type === 'integer') {
                isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < 0.0000001;
            } else { // Float checking using precision for tolerance
                 let tolerance;
                 const precision = currentProblemData.precision;
                 if (precision === 2) tolerance = 0.005;
                 else if (precision === 3) tolerance = 0.0005;
                 else if (precision === 4) tolerance = 0.00005;
                 else tolerance = 0.001; // Default fallback
                 isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < tolerance;
            }
        }

        // Handle Correct Answer
        if (isActuallyCorrect) {
            input.classList.add("correct");
            playSound("correct-sound", 0.1);
            input.incorrectGuessCount = 0;
            // Display formatted answer (could be exact or rounded)
            if (currentProblemData.type === 'float') {
                 let displayValue;
                 // Check for terminating reciprocal
                 if (currentProblemData.denominator && terminatingReciprocalDenominators.includes(currentProblemData.denominator)) {
                     displayValue = (1 / currentProblemData.denominator).toString(); // Show exact
                 } else {
                     displayValue = correctAnswer.toFixed(currentProblemData.precision); // Show rounded
                 }
                 input.value = displayValue;
            } else {
                 input.value = correctAnswer.toString();
            }
            input.disabled = true;
            button.disabled = true;
            checkAllAnswers();
        // Handle Incorrect Answer
        } else {
            input.classList.add("incorrect");
            playSound("wrong-sound", 0.1);
            input.incorrectGuessCount++;
            // Handle Incorrect Guess Limit (Reveal Answer)
            if (input.incorrectGuessCount >= 3) {
                let formattedCorrectAnswer;
                 if (currentProblemData.type === 'float') {
                    // Check for terminating reciprocal for display
                     if (currentProblemData.denominator && terminatingReciprocalDenominators.includes(currentProblemData.denominator)) {
                         formattedCorrectAnswer = (1 / currentProblemData.denominator).toString(); // Show exact
                     } else {
                         formattedCorrectAnswer = correctAnswer.toFixed(currentProblemData.precision); // Show rounded
                     }
                 } else {
                     formattedCorrectAnswer = correctAnswer.toString();
                 }
                input.value = formattedCorrectAnswer;
                input.classList.remove("incorrect");
                input.classList.add("correct");
                input.disabled = true;
                button.disabled = true;
                playSound("correct-sound", 0.1);
                checkAllAnswers();
            }
        }
    });

    // Enter Key Listener
    input.addEventListener("keypress", (event) => { if (event.key === "Enter") button.click(); });
    // Tab Key Listener
    input.addEventListener("keydown", (event) => { if (event.key === "Tab") { event.preventDefault(); focusNextInput(input); }});

    problemDiv.appendChild(label);
    problemDiv.appendChild(input);
    problemDiv.appendChild(button);
    container.appendChild(problemDiv);
}

// Focus Next Input Utility
function focusNextInput(currentInput) {
    const inputs = Array.from(document.querySelectorAll("#practiceModeContainer input[type='text']:not([disabled])"));
    const currentIndex = inputs.indexOf(currentInput);
    const nextInput = inputs[currentIndex + 1];
    if (nextInput) nextInput.focus(); else if (inputs.length > 0) inputs[0].focus();
}
// Factorial Calculation Utility
function factorial(n) { if (n < 0) return NaN; if (n === 0) return 1; let r = 1; for (let i = n; i > 0; i--) r *= i; return r; }
// Check All Practice Answers
function checkAllAnswers() {
    const inputs = document.querySelectorAll("#practiceModeContainer input[type='text']");
    if (inputs.length === 0) return;
    if (Array.from(inputs).every(input => input.classList.contains("correct"))) { playSound("cheer-sound", 0.1); launchConfetti(); }
}
// Confetti Launch
function launchConfetti() { if (typeof confetti === 'function') confetti({ pC: 600, s: 100, sV: 35, o: { y: 0.6 }, sc: 1.1 }); }

// Theme Toggle Logic
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggleCheckbox) themeToggleCheckbox.checked = false;
    }
}
if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener('change', () => {
        const newTheme = themeToggleCheckbox.checked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

// Mode Switching Functions
function switchToSuddenDeathView() {
    suddenDeathActive = true;
    suddenDeathGameStarted = false;
    if(practiceModeContainer) practiceModeContainer.style.display = 'none';
    if(suddenDeathModeContainer) suddenDeathModeContainer.style.display = 'flex';
    if(sdCategorySelector) sdCategorySelector.style.display = 'block';
    if(suddenDeathProblemArea) suddenDeathProblemArea.innerHTML = '';
    if(suddenDeathProblemArea) suddenDeathProblemArea.classList.add('hidden');
    if(suddenDeathContent) suddenDeathContent.classList.remove('game-active');
    if(mainHeaderTitle) mainHeaderTitle.textContent = 'Sudden Death Setup';
    if(suddenDeathBtn) suddenDeathBtn.style.display = 'none';
    if(practiceModeBtn) practiceModeBtn.style.display = 'inline-block';
    if(sdErrorNoCategory) sdErrorNoCategory.style.display = 'none';
    showScorePopup(false);
}

function startGameWithSelectedCategories() {
    const selectedCategories = [];
    const toggles = sdCategoryTogglesContainer.querySelectorAll('input[type="checkbox"]');
    toggles.forEach(toggle => {
        if (toggle.checked) {
            selectedCategories.push(toggle.dataset.category);
        }
    });

    if (selectedCategories.length === 0) {
        if(sdErrorNoCategory) sdErrorNoCategory.style.display = 'block';
        return;
    }
    if(sdErrorNoCategory) sdErrorNoCategory.style.display = 'none';

    suddenDeathGameStarted = true;
    if(sdCategorySelector) sdCategorySelector.style.display = 'none';
    if(suddenDeathProblemArea) suddenDeathProblemArea.classList.remove('hidden');
    if(suddenDeathContent) suddenDeathContent.classList.add('game-active');
    if(mainHeaderTitle) mainHeaderTitle.textContent = 'Sudden Death';


    sdCategoryOrder = shuffleArray(selectedCategories);
    sdCurrentCategoryIndex = 0;
    currentSuddenDeathStreak = 0;
    loadNextSuddenDeathProblem();
}


function switchToPracticeMode() {
    suddenDeathActive = false;
    suddenDeathGameStarted = false;
    if(suddenDeathModeContainer) suddenDeathModeContainer.style.display = 'none';
    if(practiceModeContainer) practiceModeContainer.style.display = 'block';
    if(suddenDeathContent) suddenDeathContent.classList.remove('game-active');
    if(mainHeaderTitle) mainHeaderTitle.textContent = 'GMAT Practice';
    if(suddenDeathBtn) suddenDeathBtn.style.display = 'inline-block';
    if(practiceModeBtn) practiceModeBtn.style.display = 'none';
    if(suddenDeathProblemArea) suddenDeathProblemArea.innerHTML = '';
    showScorePopup(false);
}

// Sudden Death Game Logic
function loadNextSuddenDeathProblem() {
    if (!suddenDeathProblemArea || !suddenDeathGameStarted) return;
    suddenDeathProblemArea.innerHTML = '';

    if (sdCategoryOrder.length === 0 || sdCurrentCategoryIndex >= sdCategoryOrder.length) {
        const selectedCategories = [];
        const toggles = sdCategoryTogglesContainer.querySelectorAll('input[type="checkbox"]');
        toggles.forEach(toggle => { if (toggle.checked) selectedCategories.push(toggle.dataset.category); });
        if(selectedCategories.length === 0) {
             suddenDeathProblemArea.innerHTML = '<p class="game-over-message">No categories selected. Game Over.</p>'; return;
        }
        sdCategoryOrder = shuffleArray(selectedCategories);
        sdCurrentCategoryIndex = 0;
    }

    const currentCategoryKey = sdCategoryOrder[sdCurrentCategoryIndex];
    const problemsInCurrentCategory = problemsByCat[currentCategoryKey];

    if (!problemsInCurrentCategory || problemsInCurrentCategory.length === 0) {
        sdCurrentCategoryIndex++;
        loadNextSuddenDeathProblem();
        return;
    }

    const randomIndex = Math.floor(Math.random() * problemsInCurrentCategory.length);
    currentSuddenDeathProblemData = problemsInCurrentCategory[randomIndex]; // Store full data object
    createSuddenDeathProblemDOM(currentSuddenDeathProblemData);
    sdCurrentCategoryIndex++;
}

function createSuddenDeathProblemDOM(problemData) {
    if (!suddenDeathProblemArea) return; const problemDiv = document.createElement("div"); problemDiv.className = "problem";
    const label = document.createElement("span"); label.textContent = problemData.questionText;
    const input = document.createElement("input"); input.type = "text";
    // Set placeholder based on type and precision
    if (problemData.type === 'integer') {
         input.placeholder = "e.g. 42";
    } else if (problemData.type === 'float') {
        const p = problemData.precision;
        input.placeholder = p === 2 ? "e.g. 0.12" : (p === 3 ? "e.g. 1.234" : (p === 4 ? "e.g. 0.1234" : "e.g. 1.23"));
    }
    const button = document.createElement("button"); button.textContent = "Check";
    button.addEventListener("click", () => handleSuddenDeathAnswer(input.value, problemData, problemDiv)); // Pass problemData
    input.addEventListener("keypress", (event) => { if (event.key === "Enter") button.click(); });
    problemDiv.appendChild(label); problemDiv.appendChild(input); problemDiv.appendChild(button);
    suddenDeathProblemArea.appendChild(problemDiv); input.focus();
}
function handleSuddenDeathAnswer(userAnswerText, problemData, problemDiv) { // Receive full problemData
    if (!problemDiv) return; const inputField = problemDiv.querySelector('input'); const checkButton = problemDiv.querySelector('button');
    if (inputField) inputField.disabled = true; if (checkButton) checkButton.disabled = true;

    const correctAnswer = problemData.correctAnswer; // Answer used for checking (possibly rounded)
    const userAnswerNum = parseFloat(userAnswerText.trim().replace(',', '.'));
    let isCorrect = false;

    if (isNaN(userAnswerNum)) {
         isCorrect = false;
    } else {
        // Check integer or float with tolerance
        if (problemData.type === 'integer') {
            isCorrect = Math.abs(userAnswerNum - correctAnswer) < 0.0000001;
        } else { // Float checking using precision for tolerance
            let t;
            const precision = problemData.precision;
            if (precision === 2) t = 0.005;
            else if (precision === 3) t = 0.0005;
            else if (precision === 4) t = 0.00005;
            else t = 0.001; // Default fallback
            isCorrect = Math.abs(userAnswerNum - correctAnswer) < t;
        }
    }

    if (inputField) { inputField.classList.remove("correct", "incorrect"); if (isCorrect) inputField.classList.add("correct"); else inputField.classList.add("incorrect"); }

    // Handle Correct Answer
    if (isCorrect) {
        currentSuddenDeathStreak++; playSound("correct-sound", 0.1); showScorePopup(true, false, `Score: ${currentSuddenDeathStreak}`);
        setTimeout(loadNextSuddenDeathProblem, 1800);
    // Handle Incorrect Answer
    } else {
        playSound("wrong-sound", 0.1); suddenDeathGameStarted = false;
        if(suddenDeathContent) suddenDeathContent.classList.remove('game-active');
        const correctAnswerDisplay = document.createElement("div"); correctAnswerDisplay.className = "correct-answer-display";

        // Determine Correct Answer String for Display
        let cAnsTxt;
        if (problemData.type === 'float') {
            // Check if it's a terminating reciprocal
            if (problemData.denominator && terminatingReciprocalDenominators.includes(problemData.denominator)) {
                 cAnsTxt = (1 / problemData.denominator).toString(); // Show exact
            } else {
                 cAnsTxt = correctAnswer.toFixed(problemData.precision); // Show rounded to stored precision
            }
        } else {
             cAnsTxt = correctAnswer.toString();
        }

        correctAnswerDisplay.innerHTML = `Correct Answer: <strong>${cAnsTxt}</strong>`;
        if (problemDiv.parentNode) problemDiv.parentNode.insertBefore(correctAnswerDisplay, problemDiv); else if (suddenDeathProblemArea) suddenDeathProblemArea.prepend(correctAnswerDisplay);
        showScorePopup(true, true, `Game Over! Final Streak: ${currentSuddenDeathStreak}`);

        // Add Game Over Buttons
        const playAgainBtn = document.createElement("button");
        playAgainBtn.textContent = "Play Again";
        playAgainBtn.className = "header-button practice-mode-button";
        playAgainBtn.style.position = "static"; playAgainBtn.style.margin = "10px auto"; playAgainBtn.style.display = "block";
        playAgainBtn.addEventListener("click", startGameWithSelectedCategories);

        const changeSettingsBtn = document.createElement("button");
        changeSettingsBtn.textContent = "Change Settings / New Game";
        changeSettingsBtn.className = "header-button practice-mode-button";
        changeSettingsBtn.style.position = "static"; changeSettingsBtn.style.margin = "10px auto"; changeSettingsBtn.style.display = "block";
        changeSettingsBtn.addEventListener("click", switchToSuddenDeathView);


        if (problemDiv.parentNode) {
             problemDiv.parentNode.appendChild(playAgainBtn);
             problemDiv.parentNode.appendChild(changeSettingsBtn);
        } else if (suddenDeathProblemArea) {
            suddenDeathProblemArea.appendChild(playAgainBtn);
            suddenDeathProblemArea.appendChild(changeSettingsBtn);
        }
    }
}
// Score Popup Management
let scorePopupTimeout;
function showScorePopup(show, isGameOver = false, text = "") {
    if (!suddenDeathScorePopup) return; clearTimeout(scorePopupTimeout);
    if (text) suddenDeathScorePopup.textContent = text;
    if (show) {
        suddenDeathScorePopup.style.display = 'block'; void suddenDeathScorePopup.offsetWidth; suddenDeathScorePopup.classList.add('show');
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

// Create Sudden Death Category Toggles
function createSdCategoryToggles() {
    if (!sdCategoryTogglesContainer) return;
    sdCategoryTogglesContainer.innerHTML = '';

    const savedCategoriesJson = localStorage.getItem('sdSelectedCategories');
    const categoriesToSelect = savedCategoriesJson ? JSON.parse(savedCategoriesJson) : defaultSdCategories;

    for (const key in categoryDisplayNames) {
        const div = document.createElement('div');
        div.className = 'category-toggle';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `toggle${key}`;
        input.dataset.category = key;
        input.checked = categoriesToSelect.includes(key);

        const label = document.createElement('label');
        label.htmlFor = `toggle${key}`;
        label.textContent = categoryDisplayNames[key];

        div.appendChild(input);
        div.appendChild(label);
        sdCategoryTogglesContainer.appendChild(div);

        input.addEventListener('change', () => {
            const currentSelected = [];
            sdCategoryTogglesContainer.querySelectorAll('input[type="checkbox"]').forEach(t => {
                if (t.checked) currentSelected.push(t.dataset.category);
            });
            localStorage.setItem('sdSelectedCategories', JSON.stringify(currentSelected));
            if(sdErrorNoCategory && currentSelected.length > 0) sdErrorNoCategory.style.display = 'none';
        });
    }
    // Save initial state if needed
    if (!savedCategoriesJson) {
        localStorage.setItem('sdSelectedCategories', JSON.stringify(categoriesToSelect));
    }
}


// Initial Page Setup
document.addEventListener('DOMContentLoaded', () => {
    populateAllProblemData();
    createSdCategoryToggles();

    const savedTheme = localStorage.getItem('theme');
    if (themeToggleCheckbox) {
        if (savedTheme) { applyTheme(savedTheme); }
        else { applyTheme('light'); }
    }

    // Populate Practice Mode Sections
    const uiElements = {
        factorials: document.getElementById("factorials"), powers: document.getElementById("powers"), squares: document.getElementById("squares"),
        multiplication: document.getElementById("multiplication"), cubes: document.getElementById("cubes"),
        fractions: document.getElementById("fractions"), squareRoots: document.getElementById("square-roots")
    };

    // Use problemsByCat which has the full data including precision etc.
    problemsByCat.Factorials.forEach(pData => createProblem(uiElements.factorials, pData));
    problemsByCat.PowersOf2.forEach(pData => createProblem(uiElements.powers, pData));
    problemsByCat.Squares.forEach(pData => createProblem(uiElements.squares, pData));
    problemsByCat.Multiplication.forEach(pData => createProblem(uiElements.multiplication, pData));
    problemsByCat.Cubes.forEach(pData => createProblem(uiElements.cubes, pData));
    problemsByCat.Reciprocals.forEach(pData => createProblem(uiElements.fractions, pData));
    problemsByCat.SquareRoots.forEach(pData => createProblem(uiElements.squareRoots, pData));


    if (suddenDeathBtn) suddenDeathBtn.addEventListener('click', switchToSuddenDeathView);
    if (practiceModeBtn) practiceModeBtn.addEventListener('click', switchToPracticeMode);
    if (startSuddenDeathCustomBtn) startSuddenDeathCustomBtn.addEventListener('click', startGameWithSelectedCategories);
});