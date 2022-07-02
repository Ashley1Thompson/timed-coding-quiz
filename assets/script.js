// variables 
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var submitButton = document.getElementById('submit-btn')
var questionContainerEl = document.getElementById('question-container')
var shuffleQuestions, currentQuestion
var questionEl = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-option')
var timerEl = document.getElementById('countdown');
var timeCount = 90
var timeInterval 
var gameOver = document.getElementById('gameOver')
var score
var scoreEl = document.getElementById('score')

// buttons and events
startButton.addEventListener('click', startQuiz)

nextButton.addEventListener('click', () =>{
  currentQuestion++
  setNextQuestion()
})

submitButton.addEventListener('click', submit)

// show a random question from the array
function setNextQuestion() {
  resetState()
  showQuestion(shuffleQuestions[currentQuestion])
}

// start timer, hide start button, show question container 
// shuffle random question from array
function startQuiz() {
  timerCountdown(false)
  startButton.classList.add('hide')
  questionContainerEl.classList.remove('hide')
  shuffleQuestions = questions.sort(() => Math.random() - .5)
  currentQuestion = 0
  setNextQuestion()
}

// timer begins at timeCount and countsdown one second at a time
// when timer stops display game over screen
function timerCountdown(stop) {
  var timeInterval = setInterval(function() {
      if (timeCount > 0) {
          timerEl.textContent = 'Timer: ' + timeCount;
          timeCount --;
      } else {
        // Game over function
        timerEl.textContent = 'Times up!';
        clearInterval(timeInterval);
        showGameOver()
      }
  }, 1000);
}

// display score (how many seconds left on timer)
function stopQuiz () {
  score = timeCount
  clearInterval(timeInterval)
  showGameOver()
  timerEl.style.visibility = 'hidden'
  scoreEl.innerText = `Your Score is ${score}`
}

// hide question container, show game over
function showGameOver () {
  questionContainerEl.style.display = 'none'
  gameOver.classList.remove('hide')
  gameOver.style.display = 'inline'
}

// when a question is answered present next button
function selectAnswer(e) {
  var selectedAnswer = e.target
  var correct = selectedAnswer.dataset.correct
  setStatus(document.body, correct)
  Array.from(answerBtnEl.children).forEach(button => {
    setStatus(button, button.dataset.correct)
  })
  !correct && (timeCount = timeCount - 10)
  if (shuffleQuestions.length > currentQuestion + 1){
    nextButton.classList.remove('hide')
  } else if (shuffleQuestions.length = currentQuestion + 1) {
    stopQuiz()
  }
}

// When a question is answered correctly background green
// when a question is answered incorrectly background red
function setStatus(element, correct) {
  clearStatus(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

// clear correct/wrong status 
function clearStatus (element){
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// display the question text
// assigning a button to each answer option
function showQuestion(question) {
  questionEl.innerText = question.question
  question.answer.forEach(answer => {
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

// hide next button after reset
function resetState () {
  clearStatus(document.body)
  nextButton.classList.add('hide')
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild
    (answerBtnEl.firstChild)
  }
}

// store highscore and name to browser local storage
function submit () {
  var name = document.getElementById('name').value
  localStorage.setItem(score, name)
  submitButton.disabled = true
}

// all of the quiz questions and answers
var questions = [
  {
    question: 'Commonly used datatypes do NOT include:',
    answer: [
      {text: 'booleans', correct: false},
      {text: 'alerts', correct: true},
      {text: 'strings', correct: false},
      {text: 'numbers', correct: false},
    ]
  },
  {
    question: 'The condition of an if/else statement is enclosed with ___.',
    answer: [
      {text: 'quotes', correct: false},
      {text: 'curly brackets', correct: false},
      {text: 'parenthesis', correct: true},
      {text: 'square brackets', correct: false},
    ]
  },
  {
    question: 'Arrays in Javascript can be used to store ___.',
    answer: [
      {text: 'numbers and strings', correct: false},
      {text: 'other arrays', correct: false},
      {text: 'booleans', correct: false},
      {text: 'all of the above', correct: true},
    ]
  },
  {
    question: 'String values must be enclosed within ___ when being assigned to variables.',
    answer: [
      {text: 'quotes', correct: true},
      {text: 'commas', correct: false},
      {text: 'parenthesis', correct: false},
      {text: 'curly brackets', correct: false},
    ]
  },
  {
    question: 'What does API stand for?',
    answer: [
      {text: 'abstract parameter integer', correct: false},
      {text: 'absolute programming internet', correct: false},
      {text: 'application programming interface', correct: true},
      {text: 'anti-plagarism inspector', correct: false},
    ]
  }
]

