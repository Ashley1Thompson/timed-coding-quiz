// When the start button is clicked the game starts
 var startButton = document.getElementById('start-btn')
 var questionContainerEl = document.getElementById('question-container')
 var shuffleQuestions, currentQuestion
 var questionEl = document.getElementById('question')
 var answerBtnEl = document.getElementById('answer-option')

 startButton.addEventListener('click', startQuiz)

 function startQuiz() {
   console.log('Start')
   startButton.classList.add('hide')
   questionContainerEl.classList.remove('hide')
   shuffleQuestions = questions.sort(() => Math.random() - .5)
   currentQuestion = 0
   finalCountdown()
   setNextQuestion()


 }
// When the start button is clicked a timer begins to countdown
function finalCountdown() {

}

// when a questioned is answered correctly, I am presented with another question
// When a question is answered incorrectly, time is subtracted from the countdown
function selectAnswer(e) {
  var selectedAnswer = e.target
  var correct = selectedAnswer.dataset.correct
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffleQuestions[currentQuestion])
}

function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerBtnEl.appendChild(button)
  })
}

function resetState () {
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild
    (answerBtnEl.firstChild)
  }
}

// When a question is answered, the result is printed to the bottom of the quiz
function printResult() {

}

// When the game is finished, a user can view their highscore and input their initials

// The highscore data is stored locally

var questions = [
  {
    question: 'Commonly used datatypes do NOT include:',
    answers: [
      {text: 'booleans', correct: false},
      {text: 'alerts', correct: true},
      {text: 'strings', correct: false},
      {text: 'numbers', correct: false},
    ]
  }
]