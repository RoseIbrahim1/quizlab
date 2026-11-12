

// Quiz Questions Organized by Category

const questions = {

    programming: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            answer: 0
        },
        {
            question: "Which language is used to style web pages?",
            options: ["Python", "HTML", "CSS", "Java"],
            answer: 2
        },
        {
            question: "Which language makes web pages interactive?",
            options: ["CSS", "JavaScript", "SQL", "HTML"],
            answer: 1
        },
        {
            question: "Which HTML tag creates a link?",
            options: ["<img>", "<p>", "<a>", "<h1>"],
            answer: 2
        },
        {
            question: "Which keyword declares a variable in JavaScript?",
            options: ["var", "int", "string", "define"],
            answer: 0
        }
    ],

    science: [
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: 1
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["CO2", "O2", "H2O", "NaCl"],
            answer: 2
        }
    ],

    geography: [
        {
            question: "What is the capital of Japan?",
            options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
            answer: 2
        },
        {
            question: "Which is the largest ocean?",
            options: [
                "Atlantic Ocean",
                "Indian Ocean",
                "Arctic Ocean",
                "Pacific Ocean"
            ],
            answer: 3
        }
    ],

    general: [
        {
            question: "How many days are there in a leap year?",
            options: ["364", "365", "366", "367"],
            answer: 2
        },
        {
            question: "Which animal is known as the King of the Jungle?",
            options: ["Tiger", "Lion", "Elephant", "Leopard"],
            answer: 1
        }
    ]

};


// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let selectedCategory = "";
let currentQuestions = [];

// HTML Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const progress = document.getElementById("progress");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

const categoryScreen = document.getElementById("category-screen");

const categoryButtons = document.querySelectorAll(".category-btn");

const questionCategory = document.querySelector(".question-category");

// Start the Quiz
function startQuiz() {
    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");

    categoryScreen.classList.remove("hidden");
}

function selectCategory(category) {

    selectedCategory = category;

    currentQuestions = questions[category];

    currentQuestionIndex = 0;
    score = 0;

    categoryScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    questionCategory.textContent = category.toUpperCase();

    showQuestion();
}

// Display a Question
function showQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    questionElement.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    progress.style.width =
        `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`;

    // Create answer buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(button, index);
        });

        answersContainer.appendChild(button);
    });

    nextBtn.disabled = true;

    nextBtn.textContent =
        currentQuestionIndex === currentQuestions.length - 1
            ? "Submit"
            : "Next";
}

// Handle Answer Selection

function selectAnswer(selectedButton, selectedIndex) {

    // Get the current question from the selected category
    const currentQuestion = currentQuestions[currentQuestionIndex];

    const answerButtons = answersContainer.querySelectorAll(".answer-btn");

    // Prevent selecting multiple answers
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    // Check the selected answer
    if (selectedIndex === currentQuestion.answer) {

        selectedButton.classList.add("correct");
        score++;

    } else {

        selectedButton.classList.add("wrong");

        // Highlight the correct answer
        answerButtons[currentQuestion.answer].classList.add("correct");
    }

    // Update the score
    scoreDisplay.textContent = `Score: ${score}`;

    // Enable the Next button
    nextBtn.disabled = false;
}


// Move to the Next Question
function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

// Display Final Results
function showResults() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const percentage = Math.round((score / currentQuestions.length) * 100);

    finalScore.textContent =
        `You scored ${score} out of ${currentQuestions.length} (${percentage}%)`;

    if (percentage === 100) {
        resultMessage.textContent = "Excellent! You got every question right!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Well done! You have a good understanding.";
    } else {
        resultMessage.textContent = "Keep practicing! You can do even better.";
    }
}

// Button Events
// Button Events

startBtn.addEventListener("click", startQuiz);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        selectCategory(category);
    });
});

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", startQuiz);
