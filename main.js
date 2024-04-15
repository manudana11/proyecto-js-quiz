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
const correctAnswerCounterElemet = document.getElementById('correct-answer-counter');
const finalResultElement = document.getElementById('final-result');
const pastResultsElement = document.getElementById('past-results');
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

// const showStats = () => {
//     hideViews();
//     stats.classList.remove('hide');
//     quizPlaysHistory();
// };

const startGame = () => {
    btnStart.classList.add('hide');
    welcomeQuiz.classList.add('hide');
    btnStats.classList.add('hide');
    currentQuestionIndex = 0;
    questionsContainerElement.classList.remove('hide');
    setNextQuestion();
};

const quizPlaysHistory = () => {
    const allResults = JSON.parse(localStorage.getItem('results')) || [];
    allResults.forEach((results) => {
        console.log(results);
        const divResults = document.createElement('div');
        divResults.innerHTML= `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <h2 class="d-flex justify-content-center align-items-center">Your result are:</h2>
        <div class="col-md-4">
            <h2 class="card-title d-flex justify-content-center">${results}/10</h2>
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <p class="card-text">Sigue intentandolo chaval</p>
            </div>
        </div>
        </div>
        </div>`;
        pastResultsElement.appendChild(divResults);
    });
    console.log(allResults);
};

const showStats = () => {
    hideViews();
    stats.classList.remove('hide');
    quizPlaysHistory();
};

const showQuestions = () => {
    const currentQuestion = questionsApi[currentQuestionIndex]
    questionElement.innerHTML = currentQuestion.question;
    questionCategoryElement.innerHTML = currentQuestion.category;
    questionDificultyElement.innerHTML = currentQuestion.difficulty;
    correctAnswerCounterElemet.innerHTML = `${correctAnswerAcumulator}/10`;
    pastResultsElement.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
  <h2 class="d-flex justify-content-center align-items-center">Your result are:</h2>
  <div class="col-md-4">
    <h2 class="card-title d-flex justify-content-center">${correctAnswerAcumulator}/10</h2>
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <p class="card-text">Sigue intentandolo chaval</p>
    </div>
  </div>
  </div>
  </div>`;
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
        correctAnswerCounterElemet.innerHTML = `${correctAnswerAcumulator}/10`;
    }
    Array.from(answersButtonsElement.children).forEach((button) => {
        setStatusClass(button);
    });
    if (questionsApi.length > currentQuestionIndex + 1) {
        btnNext.classList.remove('hide');
    } else {
        btnStart.innerText = 'Restart';
        btnStart.classList.remove('hide');
        btnStats.classList.remove('hide');
    }
};

const resetState = () => {
    btnNext.classList.add('hide');
    answersButtonsElement.innerHTML = '';
}

const setStatsInfo = () => {
    let actualResult = JSON.parse(localStorage.getItem('results')) || [];
    actualResult.unshift(correctAnswerAcumulator);
    localStorage.setItem('results', JSON.stringify(actualResult));
    finalResultElement.classList.remove('hide');
    correctAnswerAcumulator = 0;
    console.log(localStorage.results);
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
btnStats.addEventListener('click', () => {
    showStats();
    setStatsInfo();
});