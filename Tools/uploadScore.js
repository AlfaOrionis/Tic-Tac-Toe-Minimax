export function uploadScore(winner) {
  const playerScore = document.getElementById("player-score");
  const computerScore = document.getElementById("computer-score");
  const score = JSON.parse(localStorage.getItem("score"));

  //This is the case of winning/losing the game
  if (winner) {
    const theWinner = winner === "X" ? "player" : "computer";
    score[theWinner] += 1;
    localStorage.setItem("score", JSON.stringify(score));
  }
  //This is the case of just starting the app
  playerScore.textContent = score.player;
  computerScore.textContent = score.computer;
}
