// VARIABLES

const home = document.getElementById('home');
const quiz = document.getElementById('quiz');
const stats = document.getElementById('stats');
const homeNav = document.getElementById('home-nav');
const quizNav = document.getElementById('quiz-nav');
const statsNav = document.getElementById('stats-nav');
const welcomeQuiz = document.getElementById('welcome-quiz');
const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnStats = document.getElementById('btn-stats');
const questionsContainerElement = document.getElementById('questions-container');
const questionElement = document.getElementById('questions');
const answersButtonsElement = document.getElementById('answers-buttons');
const questionCategoryElement = document.getElementById('questions-category');
const questionDificultyElement = document.getElementById('questions-dificulty');
const API_URL = 'https://opentdb.com/api.php?amount=10';
let questionsApi = [];
let correctAnswerAcumulator = 0;
let currentQuestionIndex;

// FUNCIONES

axios.get(API_URL)
.then((res) => {
    questionsApi = res.data.results;
    console.log('questions', questionsApi);
    setNextQuestion();
}).catch((err) => console.log(err));

const hideViews = () => {
    home.classList.add('hide');
    quiz.classList.add('hide');
    stats.classList.add('hide');
};

const showHome = () => {
    hideViews();
    home.classList.remove('hide');
};

const showQuiz = () => {
    hideViews();
    quiz.classList.remove('hide');
};

const showStats = () => {
    hideViews();
    stats.classList.remove('hide');
};

const startGame = () => {
    btnStart.classList.add('hide');
    currentQuestionIndex = 0;
    questionsContainerElement.classList.remove('hide');
    setNextQuestion();
};

const showQuestions = () => {
    const currentQuestion = questionsApi[currentQuestionIndex]
    questionElement.innerHTML = currentQuestion.question;
    questionCategoryElement.innerHTML = currentQuestion.category;
    questionDificultyElement.innerHTML = currentQuestion.difficulty;
    const correctAnswer = currentQuestion.correct_answer;
    let allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
    const arrayMix = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    allAnswers = arrayMix(allAnswers);
    allAnswers.forEach((answers) => {
        const button = document.createElement('button');
        button.innerHTML = answers;
        if (answers === correctAnswer) {
            button.dataset.correct = 'true';
        } else {
            button.dataset.correct = 'false';
        }
        button.addEventListener('click', () => {
            selectAnswer(button, correctAnswer);
        });
        answersButtonsElement.appendChild(button);
    });
};

const setNextQuestion = () => {
    resetState();
    showQuestions(questionsApi[currentQuestionIndex]);
};

const setStatusClass = (element) => {
    if (element.dataset.correct === 'true') {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

const selectAnswer = (selectedButton, correctAnswer) => {
    setStatusClass(selectedButton)
    if (selectedButton.innerText === correctAnswer) {
        correctAnswerAcumulator++;
        console.log('acumulador respuestas correctas', correctAnswerAcumulator);
    }
    Array.from(answersButtonsElement.children).forEach((button) => {
        setStatusClass(button);
    });
    if (questionsApi.length > currentQuestionIndex + 1) {
        btnNext.classList.remove('hide');
    } else {
        // btnStart.innerText = 'Restart';
        // btnStart.classList.remove('hide');
        btnStats.classList.remove('hide');
    }
};

const resetState = () => {
    btnNext.classList.add('hide');
    answersButtonsElement.innerHTML = '';
}

// LLAMAR FUNCIONES

homeNav.addEventListener('click', showHome);
quizNav.addEventListener('click', showQuiz);
statsNav.addEventListener('click', showStats);
btnStart.addEventListener('click', () => {
    startGame();
});
btnNext.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
btnStats.addEventListener('click', showStats);