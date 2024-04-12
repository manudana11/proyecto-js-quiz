// VARIABLES

const home = document.getElementById('home');
const quiz = document.getElementById('quiz');
const stats = document.getElementById('stats');
const homeNav = document.getElementById('homeNav');
const quizNav = document.getElementById('quizNav');
const statsNav = document.getElementById('statsNav');
const API_URL = 'https://opentdb.com/api.php?amount=10';

// FUNCIONES

const hideViews = () => {
    home.classList.add('hiden');
    quiz.classList.add('hiden');
    stats.classList.add('hiden');
}

const showHome = () => {
    hideViews();
    home.classList.remove('hiden');
}

const showQuiz = () => {
    hideViews();
    quiz.classList.remove('hiden');
}

const showStats = () => {
    hideViews();
    stats.classList.remove('hiden');
}

axios.get(API_URL).then((res) => console.log('prueba1', res.data))

// LLAMAR FUNCIONES

homeNav.addEventListener('click', showHome);
quizNav.addEventListener('click', showQuiz);
statsNav.addEventListener('click', showStats);