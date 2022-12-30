import { checkIfWin } from "./checkIfWin.js";
import { animateLine } from "../Animations/animateLine.js";
import { animateText } from "../Animations/animateText.js";

export function changeTurn(
  board,
  resetBtn,
  getEmptyCells,
  trn,
  state,
  uploadScore,
  resetGameHandler,
  liArray,
  computerAction
) {
  console.log(computerAction);
  resetBtn.classList.remove("disabled");
  const winner = checkIfWin(board);
  if (winner.winner) {
    state.turn = "";
    trn.textContent =
      "WINNER:" + " " + (winner.winner === "X" ? "Player" : "Computer");

    uploadScore(winner.winner, state.difficulty);
    animateLine(winner);

    setTimeout(() => {
      resetGameHandler();
    }, 4000);

    return;
  } else if (getEmptyCells(board).length === 0) {
    state.turn = "";
    trn.textContent = "TIE!";

    animateText();

    setTimeout(() => {
      resetGameHandler();
    }, 4000);

    trn.textContent = "TIE!";
    return;
  } else if (state.turn === "X") {
    state.turn = "O";

    setTimeout(() => {
      computerAction && computerAction();
    }, 1000);
  } else if (state.turn === "O") state.turn = "X";
  trn.textContent = state.turn;
}
