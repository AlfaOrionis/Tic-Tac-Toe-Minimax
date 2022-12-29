export function animateText(winner) {
  const text = document.createElement("p");
  const backdrop = document.createElement("div");

  backdrop.classList.add("backdrop");
  const textContent = winner
    ? `WINNER : ${winner === "X" ? "Player" : "Computer"}`
    : "TIE!";
  text.textContent = textContent;
  text.classList.add("win-text");
  text.style.animation = "winTextAppear 1.5s";
  setTimeout(() => {
    document.body.append(text);
    document.body.append(backdrop);
  }, 500);

  setTimeout(() => {
    text.style.animation = "";
  }, 2000);
  setTimeout(() => {
    text.style.animation = "winTextAppear 1.5s reverse";
  }, 2500);

  setTimeout(() => {
    text.remove();
    backdrop.remove();
  }, 4000);
}
