export function mount(uploadScore, easyBtn, playerBtn) {
  easyBtn.classList.add("active");
  playerBtn.classList.add("active");
  let score = localStorage.getItem("score");
  if (!score) {
    localStorage.setItem(
      "score",
      JSON.stringify({
        easy: { player: 0, computer: 0 },
        hard: { player: 0, computer: 0 },
      })
    );
  }
  uploadScore();
}
