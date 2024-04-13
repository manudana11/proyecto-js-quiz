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
const questionsContainerElement = document.getElementById('questions-container');
const questionElement = document.getElementById('questions');
const answersButtonsElement = document.getElementById('answers-buttons');
const API_URL = 'https://opentdb.com/api.php?amount=10';
let questionsApi = [];
let currentQuestionIndex;
console.log(home, quiz,stats,homeNav,quizNav,statsNav,welcomeQuiz,btnStart,btnNext,questionElement,answersButtonsElement)

// FUNCIONES

axios.get(API_URL)
.then((res) => {
    questionsApi = res.data;
    console.log(questionsApi);
}).catch((err) => console.log(err));

const hideViews = () => {
    home.classList.add('hide');
    quiz.classList.add('hide');
    stats.classList.add('hide');
}

const showHome = () => {
    hideViews();
    home.classList.remove('hide');
}

const showQuiz = () => {
    hideViews();
    quiz.classList.remove('hide');
}

const showStats = () => {
    hideViews();
    stats.classList.remove('hide');
}

const startGame = () => {
    btnStart.classList.add('hide');
    currentQuestionIndex = 0;
    questionsContainerElement.classList.remove('hide');
}

// const showQuestions = (questionsApi) => {

// }

// LLAMAR FUNCIONES

homeNav.addEventListener('click', showHome);
quizNav.addEventListener('click', showQuiz);
statsNav.addEventListener('click', showStats);
btnStart.addEventListener('click', startGame);