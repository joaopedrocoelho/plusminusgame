/* number of teams */

function addOrRemoveTeam(operator) {
  let currentValue = parseInt(
    document.getElementById("numberOfTeams").innerText
  );
  if (currentValue < 5 && operator == "add") {
    document.getElementById("numberOfTeams").innerText = currentValue + 1;
  }
  if (currentValue > 1 && operator == "remove") {
    document.getElementById("numberOfTeams").innerText = currentValue - 1;
  }
}

/*assign teams */

//assign number of Teams
let NUM_PLAYERS = 0;
function assignTeams(quantity) {
  NUM_PLAYERS = quantity;
}

/* start the game */

function startGame() {
  let table = document.getElementById("game");
  let modal = document.getElementById("gameOptions");
  assignTeams(parseInt(document.getElementById("numberOfTeams").innerText));
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
