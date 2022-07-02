
function showHighscores () {
  Object.keys(localStorage).sort().reverse()
  var highscoreList = document.getElementById('highscoreList')
  for(var i = 0, len = setHighscoreLength(); i < len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    var listItem = document.createElement('li')
    listItem.innerText = `${key}: ${value}`
    highscoreList.appendChild(listItem)
  }
}

function setHighscoreLength () {
  if(localStorage.length < 10) {
    return localStorage.length
  } else {
    return 10
  }
}