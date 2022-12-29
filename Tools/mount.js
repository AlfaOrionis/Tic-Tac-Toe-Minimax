export function mount(uploadScore, easyBtn) {
  easyBtn.classList.add("active");

  let score = localStorage.getItem("score");
  if (!score) {
    localStorage.setItem("score", JSON.stringify({ player: 0, computer: 0 }));
  }
  uploadScore();
}
