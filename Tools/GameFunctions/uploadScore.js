export function uploadScore(winner, difficulty) {
  const playerScore = document.getElementById("player-score");
  const computerScore = document.getElementById("computer-score");
  const score = JSON.parse(localStorage.getItem("score"));

  //This is the case of winning/losing the game
  if (winner) {
    const theWinner = winner === "X" ? "player" : "computer";
    !difficulty ? (score.easy[theWinner] += 1) : (score.hard[theWinner] += 1);
    localStorage.setItem("score", JSON.stringify(score));
  }
  //This is the case of just starting the app
  const level = difficulty ? "hard" : "easy";
  playerScore.textContent = score[level].player;
  computerScore.textContent = score[level].computer;
}
