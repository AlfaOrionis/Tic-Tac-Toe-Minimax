export function resetScore() {
  const score = { player: 0, computer: 0 };
  localStorage.setItem("score", JSON.stringify(score));
}
