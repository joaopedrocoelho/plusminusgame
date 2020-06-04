// gets a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
// Typhoon GIF visibility
const audio = new Audio("sounds/typhoon.mp3");
function makeVisible(status) {
  let TyphoonGif = document.getElementById("TyphoonGif");
  if (status == "visible") {
    audio.play();
    setTimeout(() => (TyphoonGif.style.visibility = "visible"), 3000);
    setTimeout(() => (TyphoonGif.style.visibility = "hidden"), 7000);
  } else {
    TyphoonGif.style.visibility = "hidden";
  }
}

//points of the game
// selects all the cells
let possibleValues = [
  /* "+", "-", "&#247;", "x", "÷" */
];
const places = document.getElementsByClassName("place");

//assign random numbers to each cell
function assignValues() {
  for (let i = 0; i <= places.length - 1; i++) {
    places[i].innerHTML =
      possibleValues[getRandomInt(0, possibleValues.length)];
  }
}

/* game options */

// set number of teams , rows and starting points
function addOrRemove(operator, what) {
  let currentValue = parseInt(document.getElementById(what).innerText);
  if (what == "startingPoints") {
    if (currentValue < 50 && operator == "add") {
      document.getElementById(what).innerText = currentValue + 10;
    }
    if (currentValue > 20 && operator == "remove") {
      document.getElementById(what).innerText = currentValue - 10;
    }
  } else {
    if (currentValue < 6 && operator == "add") {
      document.getElementById(what).innerText = currentValue + 1;
    }
    if (currentValue > 1 && operator == "remove") {
      document.getElementById(what).innerText = currentValue - 1;
    }
  }
}

/* set operators */
function setOperators() {
  let plusCheckbox = document.getElementById("plus-checkbox");
  let minusCheckbox = document.getElementById("minus-checkbox");
  let divideCheckbox = document.getElementById("division-checkbox");
  let multiplyCheckbox = document.getElementById("multiply-checkbox");
  let checkboxArr = [
    plusCheckbox,
    minusCheckbox,
    divideCheckbox,
    multiplyCheckbox,
  ];
  for (i = 0; i < checkboxArr.length; i++) {
    if (checkboxArr[i].checked == true) {
      possibleValues.push(
        checkboxArr[i].nextElementSibling.firstChild.innerHTML
      );
      console.log();
      console.log(possibleValues);
    }
  }
}

/*assign teams */
//assign number of Teams
let NUM_PLAYERS = 0; //hardcode value for now
let scores = [];
let startingScore = 0;
/* start the game */

function startGame() {
  createRows(parseInt(document.getElementById("numberOfRows").innerHTML));
  setOperators();
  assignValues();
  startingScore = parseInt(document.getElementById("startingPoints").innerHTML);
  NUM_PLAYERS = document.getElementById("numberOfTeams").innerText;
  createTeams(NUM_PLAYERS);
  // Make an array filled with startingPoints, with a length of NUM_PLAYERS:
  scores = Array.from({ length: NUM_PLAYERS }, () => startingScore);
  highlightPlayer();
  /* let window = document.documentElement;
  window.requestFullscreen(); */
  //modal close animations
  let table = document.getElementById("game");
  let modal = document.getElementById("gameOptions");
  console.log(NUM_PLAYERS, typeof NUM_PLAYERS);
  table.style.animationName = "unBlur";
  setTimeout(
    () => (
      (table.style.filter = "none"),
      (table.style.opacity = "1"),
      (table.style.pointerEvents = "auto"),
      (modal.style.visibility = "hidden"),
      (modal.style.animationDuration = "1s"),
      (modal.style.animationName = "disappear")
    ),
    1000
  );
}

//create teams on HTML
function createTeams(number) {
  for (i = 1; i <= number; i++) {
    let team = `<div class="team">
    <h4 id="teamName${i - 1}">Team ${i}</h4>
    <span class="points" id="team${i}">${startingScore}</span>
  </div>`;
    document
      .getElementById("teamsContainer")
      .insertAdjacentHTML("beforeend", team);
  }
}

//create rows on HTML
function createRows(number) {
  for (i = 1; i <= number; i++) {
    let row = `<div class="Rtable-cell numbers">${i}</div>
    <div class="Rtable-cell place" data-row="${i}" onclick="showPoints()"></div>
    <div class="Rtable-cell place" data-row="${i}" onclick="showPoints()"></div>
    <div class="Rtable-cell place" data-row="${i}" onclick="showPoints()"></div>
    <div class="Rtable-cell place" data-row="${i}" onclick="showPoints()"></div>
    <div class="Rtable-cell place" data-row="${i}" onclick="showPoints()"></div>`;
    document
      .getElementById("teamsContainer")
      .insertAdjacentHTML("beforebegin", row);
  }
}

//assign points to a Team
let activePlayerIndex = 0;

function assignPoints(operator, points) {
  switch (operator) {
    case possibleValues[0]: //add
      console.log("add");
      //adds points to the team according to the row
      scores[activePlayerIndex] += parseInt(points);
      document.getElementById(
        "team" + (activePlayerIndex + 1)
      ).innerHTML = Math.round(scores[activePlayerIndex]);
      activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
      break;
    case possibleValues[1]: //subtract
      console.log("minus");
      //subtracts points to the team according to the row
      scores[activePlayerIndex] -= parseInt(points);
      document.getElementById(
        "team" + (activePlayerIndex + 1)
      ).innerHTML = Math.round(scores[activePlayerIndex]);
      activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
      break;
    case possibleValues[4]: //divides
      //divides points to the team according to the row
      scores[activePlayerIndex] = scores[activePlayerIndex] / parseInt(points);
      document.getElementById(
        "team" + (activePlayerIndex + 1)
      ).innerHTML = Math.round(scores[activePlayerIndex]);
      activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
      break;
    case possibleValues[3]:
      console.log("multiply"); //multiply
      scores[activePlayerIndex] = scores[activePlayerIndex] * parseInt(points);
      document.getElementById(
        "team" + (activePlayerIndex + 1)
      ).innerHTML = Math.round(scores[activePlayerIndex]);
      activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
      //multiplies points to the team according to the row
      break;
  }
  highlightPlayer();
}

//shows the points when the cell is clicked
function showPoints() {
  event.target.style.fontSize = "4vw";
  event.target.className = "Rtable-cell place disabled";
  let scorePopUpBox = document.getElementById("scorePopUpBox");
  let scorePopUp = document.getElementById("scorePopUp");
  scorePopUp.innerText = event.target.innerText;
  scorePopUpBox.style.visibility = "visible";
  scorePopUpBox.style.animationName = "jumpInLeft";
  setTimeout(
    () => (
      (scorePopUpBox.style.animationDuration = "1s"),
      (scorePopUpBox.style.animationName = "jumpOutRight")
    ),
    1500
  );
  setTimeout(() => (scorePopUpBox.style.visibility = "hidden"), 2500);
  assignPoints(event.target.innerHTML, event.target.dataset.row);
}

// skip turn button
function skipTurn() {
  activePlayerIndex = (activePlayerIndex + 1) % NUM_PLAYERS;
  highlightPlayer();
}

//highlights current player
function highlightPlayer() {
  document.getElementById(
    "teamName" + (activePlayerIndex % NUM_PLAYERS)
  ).style.color = "red";
  if (activePlayerIndex > 0 && activePlayerIndex < NUM_PLAYERS) {
    document.getElementById(
      "teamName" + ((activePlayerIndex - 1) % NUM_PLAYERS)
    ).style.color = "black";
  } else {
    document.getElementById("teamName" + (NUM_PLAYERS - 1)).style.color =
      "black";
  }
}
