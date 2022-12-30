export function resetScore(difficulty) {
  const score = JSON.parse(localStorage.getItem("score"));
  //if difficulty is false it means the game is in easy mode, so i will reset only easy score, if its true then i'll do the opposite
  !difficulty
    ? (score.easy = { player: 0, computer: 0 })
    : (score.hard = { player: 0, computer: 0 });

  localStorage.setItem("score", JSON.stringify(score));
}
