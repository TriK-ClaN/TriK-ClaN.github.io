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
const terminatingReciprocalDenominators = [2, 4, 5, 8, 10, 16, 20];

let sdCategoryOrder = [];
let sdCurrentCategoryIndex = 0;
let suddenDeathGameStarted = false;

let suddenDeathActive = false;
let currentSuddenDeathStreak = 0;
let currentSuddenDeathProblemData = null;

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

function playSound(id, volume = 0.5) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play().catch(error => console.warn("Error playing sound:", id, error));
    }
}

function shuffleArray(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function populateAllProblemData() {
    for (const category in problemsByCat) { problemsByCat[category] = []; }

    for (let i = 1; i <= 10; i++) { problemsByCat.Factorials.push({ questionText: `${i}! =`, correctAnswer: factorial(i), type: 'integer' }); }
    for (let i = 0; i <= 10; i++) { problemsByCat.PowersOf2.push({ questionText: `2^${i} =`, correctAnswer: Math.pow(2, i), type: 'integer' }); }
    for (let i = 0; i <= 25; i++) { problemsByCat.Squares.push({ questionText: `${i}² =`, correctAnswer: i * i, type: 'integer' }); }
    for (let i = 1; i <= 25; i++) { for (let j = 1; j <= 25; j++) { problemsByCat.Multiplication.push({ questionText: `${i} × ${j} =`, correctAnswer: i * j, type: 'integer' }); } }
    for (let i = 1; i <= 10; i++) { problemsByCat.Cubes.push({ questionText: `${i}³ =`, correctAnswer: Math.pow(i, 3), type: 'integer' }); }

    for (let i = 2; i <= 20; i++) {
        let problemPrecision;
        let answerForChecking;
        let calculatedAnswer = 1 / i;

        if (terminatingReciprocalDenominators.includes(i)) {
            answerForChecking = calculatedAnswer;
            let s = calculatedAnswer.toString();
            problemPrecision = s.includes('.') ? s.split('.')[1].length : 0;
        } else {
            problemPrecision = 4;
            answerForChecking = parseFloat(calculatedAnswer.toFixed(problemPrecision));
        }
        problemsByCat.Reciprocals.push({
            questionText: `1/${i} =`,
            correctAnswer: answerForChecking,
            denominator: i,
            type: 'float',
            precision: problemPrecision
        });
    }

    const roots = [2, 3, 5, 7];
    roots.forEach(num => {
        let problemPrecision = 4;
        let answerForChecking = parseFloat(Math.sqrt(num).toFixed(problemPrecision));
        problemsByCat.SquareRoots.push({
             questionText: `√${num} =`,
             correctAnswer: answerForChecking,
             type: 'float',
             precision: problemPrecision
        });
     });
}

function createProblem(container, problemData) {
    const problemDiv = document.createElement("div");
    problemDiv.className = "problem";
    problemDiv.dataset.problemData = JSON.stringify(problemData);

    const label = document.createElement("span");
    label.textContent = problemData.questionText;

    const input = document.createElement("input");
    input.type = "text";
    input.incorrectGuessCount = 0;
    if (problemData.type === 'integer') {
         input.placeholder = "e.g. 42";
    } else if (problemData.type === 'float') {
        const p = problemData.precision;
        input.placeholder = p === 1 ? "e.g. 0.5" : (p === 2 ? "e.g. 0.12" : (p === 3 ? "e.g. 1.234" : (p === 4 ? "e.g. 0.1234" : "e.g. 1.23")));
    }

    const button = document.createElement("button");
    button.textContent = "Check";

    button.addEventListener("click", () => {
        if (suddenDeathActive) return;

        const currentProblemData = JSON.parse(problemDiv.dataset.problemData);
        const correctAnswer = currentProblemData.correctAnswer;

        const userAnswerText = input.value.trim().replace(',', '.');
        const userAnswerNum = parseFloat(userAnswerText);
        let isActuallyCorrect = false;
        input.classList.remove("correct", "incorrect");

        if (isNaN(userAnswerNum)) {
             isActuallyCorrect = false;
        } else {
            if (currentProblemData.type === 'integer') {
                isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < 0.0000001;
            } else {
                 let tolerance;
                 const precision = currentProblemData.precision;
                 if (precision === 1) tolerance = 0.001;      // For precision 1 (e.g. 0.5)
                 else if (precision === 2) tolerance = 0.005; // For precision 2 (e.g. 0.25)
                 else if (precision === 3) tolerance = 0.0005; // For precision 3 (e.g. 0.125)
                 else if (precision === 4) tolerance = 0.00015; // For precision 4 (e.g. 0.1667), allows 0.1666
                 else tolerance = 0.001; // Default fallback
                 isActuallyCorrect = Math.abs(userAnswerNum - correctAnswer) < tolerance;
            }
        }

        if (isActuallyCorrect) {
            input.classList.add("correct");
            playSound("correct-sound", 0.1);
            input.incorrectGuessCount = 0;
            if (currentProblemData.type === 'float') {
                 let displayValue;
                 if (currentProblemData.denominator && terminatingReciprocalDenominators.includes(currentProblemData.denominator)) {
                     displayValue = (1 / currentProblemData.denominator).toString();
                 } else {
                     displayValue = correctAnswer.toFixed(currentProblemData.precision);
                 }
                 input.value = displayValue;
            } else {
                 input.value = correctAnswer.toString();
            }
            input.disabled = true;
            button.disabled = true;
            checkAllAnswers();
        } else {
            input.classList.add("incorrect");
            playSound("wrong-sound", 0.1);
            input.incorrectGuessCount++;
            if (input.incorrectGuessCount >= 3) {
                let formattedCorrectAnswer;
                 if (currentProblemData.type === 'float') {
                     if (currentProblemData.denominator && terminatingReciprocalDenominators.includes(currentProblemData.denominator)) {
                         formattedCorrectAnswer = (1 / currentProblemData.denominator).toString();
                     } else {
                         formattedCorrectAnswer = correctAnswer.toFixed(currentProblemData.precision);
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
function factorial(n) { if (n < 0) return NaN; if (n === 0) return 1; let r = 1; for (let i = n; i > 0; i--) r *= i; return r; }
function checkAllAnswers() {
    const inputs = document.querySelectorAll("#practiceModeContainer input[type='text']");
    if (inputs.length === 0) return;
    if (Array.from(inputs).every(input => input.classList.contains("correct"))) { playSound("cheer-sound", 0.1); launchConfetti(); }
}
function launchConfetti() { if (typeof confetti === 'function') confetti({ particleCount: 600, spread: 100, startVelocity: 35, origin: { y: 0.6 }, scalar: 1.1 }); }

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
    currentSuddenDeathProblemData = problemsInCurrentCategory[randomIndex];
    createSuddenDeathProblemDOM(currentSuddenDeathProblemData);
    sdCurrentCategoryIndex++;
}

function createSuddenDeathProblemDOM(problemData) {
    if (!suddenDeathProblemArea) return; const problemDiv = document.createElement("div"); problemDiv.className = "problem";
    const label = document.createElement("span"); label.textContent = problemData.questionText;
    const input = document.createElement("input"); input.type = "text";
    if (problemData.type === 'integer') {
         input.placeholder = "e.g. 42";
    } else if (problemData.type === 'float') {
        const p = problemData.precision;
        input.placeholder = p === 1 ? "e.g. 0.5" : (p === 2 ? "e.g. 0.12" : (p === 3 ? "e.g. 1.234" : (p === 4 ? "e.g. 0.1234" : "e.g. 1.23")));
    }
    const button = document.createElement("button"); button.textContent = "Check";
    button.addEventListener("click", () => handleSuddenDeathAnswer(input.value, problemData, problemDiv));
    input.addEventListener("keypress", (event) => { if (event.key === "Enter") button.click(); });
    problemDiv.appendChild(label); problemDiv.appendChild(input); problemDiv.appendChild(button);
    suddenDeathProblemArea.appendChild(problemDiv); input.focus();
}

function handleSuddenDeathAnswer(userAnswerText, problemData, problemDiv) {
    if (!problemDiv) return; const inputField = problemDiv.querySelector('input'); const checkButton = problemDiv.querySelector('button');
    if (inputField) inputField.disabled = true; if (checkButton) checkButton.disabled = true;

    const correctAnswer = problemData.correctAnswer;
    const userAnswerNum = parseFloat(userAnswerText.trim().replace(',', '.'));
    let isCorrect = false;

    if (isNaN(userAnswerNum)) {
         isCorrect = false;
    } else {
        if (problemData.type === 'integer') {
            isCorrect = Math.abs(userAnswerNum - correctAnswer) < 0.0000001;
        } else {
            let t;
            const precision = problemData.precision;
            if (precision === 1) t = 0.001;      // For precision 1
            else if (precision === 2) t = 0.005; // For precision 2
            else if (precision === 3) t = 0.0005; // For precision 3
            else if (precision === 4) t = 0.00015; // For precision 4
            else t = 0.001; // Default fallback
            isCorrect = Math.abs(userAnswerNum - correctAnswer) < t;
        }
    }

    if (inputField) { inputField.classList.remove("correct", "incorrect"); if (isCorrect) inputField.classList.add("correct"); else inputField.classList.add("incorrect"); }

    if (isCorrect) {
        currentSuddenDeathStreak++; playSound("correct-sound", 0.1); showScorePopup(true, false, `Score: ${currentSuddenDeathStreak}`);
        setTimeout(loadNextSuddenDeathProblem, 1800);
    } else {
        playSound("wrong-sound", 0.1); suddenDeathGameStarted = false;
        if(suddenDeathContent) suddenDeathContent.classList.remove('game-active');
        const correctAnswerDisplay = document.createElement("div"); correctAnswerDisplay.className = "correct-answer-display";

        let cAnsTxt;
        if (problemData.type === 'float') {
            if (problemData.denominator && terminatingReciprocalDenominators.includes(problemData.denominator)) {
                 cAnsTxt = (1 / problemData.denominator).toString();
            } else {
                 cAnsTxt = correctAnswer.toFixed(problemData.precision);
            }
        } else {
             cAnsTxt = correctAnswer.toString();
        }

        correctAnswerDisplay.innerHTML = `Correct Answer: <strong>${cAnsTxt}</strong>`;
        if (problemDiv.parentNode) problemDiv.parentNode.insertBefore(correctAnswerDisplay, problemDiv); else if (suddenDeathProblemArea) suddenDeathProblemArea.prepend(correctAnswerDisplay);
        showScorePopup(true, true, `Game Over! Final Streak: ${currentSuddenDeathStreak}`);

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
    if (!savedCategoriesJson) {
        localStorage.setItem('sdSelectedCategories', JSON.stringify(categoriesToSelect));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateAllProblemData();
    createSdCategoryToggles();

    const savedTheme = localStorage.getItem('theme');
    if (themeToggleCheckbox) {
        if (savedTheme) { applyTheme(savedTheme); }
        else { applyTheme('light'); }
    }

    const uiElements = {
        factorials: document.getElementById("factorials"), powers: document.getElementById("powers"), squares: document.getElementById("squares"),
        multiplication: document.getElementById("multiplication"), cubes: document.getElementById("cubes"),
        fractions: document.getElementById("fractions"), squareRoots: document.getElementById("square-roots")
    };

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