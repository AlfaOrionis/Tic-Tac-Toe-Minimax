export function mount(uploadScore) {
  let score = localStorage.getItem("score");
  if (!score) {
    localStorage.setItem("score", JSON.stringify({ player: 0, computer: 0 }));
  }
  uploadScore();
}
