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

// axios.get(API_URL)
// .then((res) => {
//     questionsApi = res.data.results;
//     console.log('questions', questionsApi);
//     setNextQuestion();
// }).catch((err) => console.log(err));

const resetState = () => {
    btnNext.classList.add('hide');
    answersButtonsElement.innerHTML = '';
}

const setNextQuestion = () => {
    resetState();
    showQuestions(questionsApi[currentQuestionIndex]);
};

const getQuestions = () => {
    axios.get(API_URL)
.then((res) => {
    questionsApi = res.data.results;
    console.log('questions', questionsApi);
    showQuestions();
}).catch((err) => console.log(err));
}

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
    quizPlaysHistory();
};

const generateResultsMesaje = (r) => {
    switch(r) {
        case 0:
            return 'Dedicate yourself to something else.';
            break;
        case 1:
            return 'Who knew that wrong answers are also a skill! Keep practicing, you are doing great.';
            break;
        case 2:
            return 'Do you need a map to find the answers?';
            break;
        case 3:
            return 'Is this a score or a reminder of your mistakes?';
            break;
        case 4:
            return 'Is this the best you can do? Really?';
            break;
        case 5:
            return 'Almost did it! But you still have some obstacles on the way to victory.';
            break;
        case 6:
            return `Nice try! But mediocrity won't get you very far.`;
            break;
        case 7:
            return 'Your determination is admirable, but you still have a long way to go to achive the vixtory.';
            break;
        case 8:
            return 'Impressive.';
            break;
        case 9:
            return 'Increidible! You are a legend.';
            break;
        case 10:
            return 'Congratulations! You just broke the score';
            break;
        default:
            return 'You beat the game. GG'
    }
}

const startGame = () => {
    getQuestions();
    btnStart.classList.add('hide');
    welcomeQuiz.classList.add('hide');
    btnStats.classList.add('hide');
    currentQuestionIndex = 0;
    correctAnswerAcumulator = 0;
    questionsContainerElement.classList.remove('hide');
   // setNextQuestion();
};

const quizPlaysHistory = () => {
    const allResults = JSON.parse(localStorage.getItem('results')) || [];
    allResults.forEach((results) => {
        console.log(results);
        const divResults = document.createElement('div');
        divResults.innerHTML= `
        <div class="card text-white bg-info mb-3" style="max-width: 25rem;">
          <div class="row g-0">
            <div class="col-12" style="height: 50px;">
              <div class="text-center py-3">
                <h5>Your past result are:</h5>
              </div>
            </div>
            <div class="col-md-4 position-relative" style='background-image: url(./assets/circle.jpg); background-size: contain; background-repeat: no-repeat; max-width: 150px; height: 125px;'>
              <div class="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h4 class="m-0">${results}/10</h4>
              </div>
            </div>
            <div class="col-md-8 d-flex justify-content-center align-items-center" style="height: 125px; width: 248px;">
              <div class="card-body text-center">
                <p class="card-text">${generateResultsMesaje(results)}</p>
              </div>
            </div>
          </div>
        </div>`;
        pastResultsElement.appendChild(divResults);
    });
    console.log(allResults);
};

const showQuestions = () => {
    const currentQuestion = questionsApi[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    questionsContainerElement.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-body text-center">
                        <h5 class="card-title">${currentQuestion.question}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    questionCategoryElement.innerHTML = currentQuestion.category;
    questionDificultyElement.innerHTML = currentQuestion.difficulty;
    correctAnswerCounterElemet.innerHTML = `${correctAnswerAcumulator}/10`;
    pastResultsElement.innerHTML = `
    <div class="card text-white bg-primary mb-3" style="max-width: 25rem;">
          <div class="row g-0">
            <div class="col-12" style="height: 50px;">
              <div class="text-center py-3">
                <h5>Your past result are:</h5>
              </div>
            </div>
            <div class="col-md-4 position-relative" style='background-image: url(./assets/circle2.jpg); background-size: contain; background-repeat: no-repeat; max-width: 150px; height: 125px;'>
              <div class="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h4 class="m-0">${correctAnswerAcumulator}/10</h4>
              </div>
            </div>
            <div class="col-md-8 d-flex justify-content-center align-items-center" style="height: 125px; width: 248px;">
              <div class="card-body text-center">
                <p class="card-text">${generateResultsMesaje(correctAnswerAcumulator)}</p>
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
    let buttonRow = document.createElement('div');
    buttonRow.classList.add('row');
    allAnswers.forEach((answers, index) => {
        console.log('crear boton', answers);
        const button = document.createElement('button');
        button.innerHTML = answers;
        button.classList.add('btn', 'btn-lg', 'btn-secondary', 'col-md-6', 'mb-2');
        if (answers === correctAnswer) {
            button.dataset.correct = 'true';
        } else {
            button.dataset.correct = 'false';
        }
        button.addEventListener('click', () => {
            selectAnswer(button, correctAnswer);
        });
        answersButtonsElement.classList.remove('hide');
        console.log('boton creado', button);
        buttonRow.appendChild(button);
        if ((index + 1) % 2 === 0 || index === allAnswers.length - 1) {
            answersButtonsElement.appendChild(buttonRow);
            buttonRow = document.createElement('div');
            buttonRow.classList.add('row');
        }
    });
};

const setStatusClass = (element) => {
    if (element.dataset.correct === 'true') {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

const selectAnswer = (selectedButton, correctAnswer) => {
    setStatusClass(selectedButton);
    const allAnswersButtonsElements = document.querySelectorAll('#answers-buttons button');
    if (selectedButton.innerText === correctAnswer) {
        correctAnswerAcumulator++;
        correctAnswerCounterElemet.innerHTML = `${correctAnswerAcumulator}/10`;
        allAnswersButtonsElements.forEach(button => {
            button.disabled = true;
        });
    } else {
        allAnswersButtonsElements.forEach(button => {
            button.disabled = true;
        });
    };
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