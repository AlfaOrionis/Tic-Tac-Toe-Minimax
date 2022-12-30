import { createCircle } from "./Tools/Animations/createCircle.js";
import { mount } from "./Tools/mount.js";
import { uploadScore } from "./Tools/GameFunctions/uploadScore.js";
import { resetScore } from "./Tools/GameFunctions/resetScore.js";
import { minimax } from "./Tools/ComputerActions/miniMax.js";
import { getEmptyCells } from "./Tools/GameFunctions/getEmptyCells.js";
import { miniMaxAction } from "./Tools/ComputerActions/miniMaxAction.js";
import { randomAction } from "./Tools/ComputerActions/randomAction.js";
import { popUp } from "./Tools/popUp.js";
import { changeTurn } from "./Tools/GameFunctions/changeTurn.js";
import { resetGame } from "./Tools/GameFunctions/resetGame.js";

const trn = document.getElementById("turn");
const liArray = document.getElementsByTagName("li");
const resetBtn = document.getElementById("reset");
const resetScoreBtn = document.getElementById("reset-score");
const easyBtn = document.getElementById("easy");
const hardBtn = document.getElementById("hard");
const computerBtn = document.getElementById("computer-starts");
const playerBtn = document.getElementById("player-starts");
console.log(computerBtn);
let state = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  hasTheGameStarted: false,
  turn: "X",
  difficulty: false,
};
trn.textContent = state.turn;

mount(uploadScore, easyBtn, playerBtn);

for (let i = 0; i < liArray.length; i++) {
  liArray[i].addEventListener("click", playerAction);
}

computerBtn.addEventListener("click", () => {
  if (state.hasTheGameStarted) {
    alert("The game has already started!");
    return;
  }
  playerBtn.classList.remove("active");
  computerBtn.classList.add("active");
  state = { ...state, turn: "O", hasTheGameStarted: true };
  console.log(state);
  computerAction();
});

easyBtn.addEventListener("click", () => {
  if (state.hasTheGameStarted) {
    alert("You cant change difficulty level during the game!");
    return;
  }
  state.difficulty = false;
  uploadScore(false, state.difficulty);
  hardBtn.classList.remove("active");
  easyBtn.classList.add("active");
});
hardBtn.addEventListener("click", () => {
  if (state.hasTheGameStarted) {
    alert("You cant change difficulty level during the game!");
    return;
  }
  state.difficulty = true;
  uploadScore(false, state.difficulty);
  easyBtn.classList.remove("active");
  hardBtn.classList.add("active");
});

resetBtn.addEventListener("click", () =>
  popUp(state.hasTheGameStarted, resetGameHandler)
);
resetScoreBtn.addEventListener("click", () => {
  resetScore(state.difficulty);
  uploadScore(null, state.difficulty);
});

window.onbeforeunload = (e) => {
  return " ";
};
//Leaving page equals defeat
window.onunload = () => {
  if (!state.hasTheGameStarted) return;
  const score = JSON.parse(localStorage.getItem("score"));
  score.computer++;
  return localStorage.setItem("score", JSON.stringify(score));
};

function resetGameHandler(giveUp) {
  playerBtn.classList.add("active");
  computerBtn.classList.remove("active");
  resetGame(state, resetBtn, liArray, trn, uploadScore, giveUp);
}

function changeTurnHandler() {
  changeTurn(
    state.board,
    resetBtn,
    getEmptyCells,
    trn,
    state,
    uploadScore,
    resetGameHandler,
    liArray,
    computerAction
  );
}

function playerAction(e) {
  state.hasTheGameStarted = true;
  if (state.turn === "X") {
    //Checking if the cell isnt already taken
    if (e.target.children.length > 0 || e.target.classList.length > 0) return;
    e.target.classList.add("cross");
    state.board[Math.ceil(e.target.id / 3 - 1)][(e.target.id - 1) % 3] = "X";

    changeTurnHandler();
  }
}
function computerAction() {
  console.log("XD");
  //RANDOM
  if (!state.difficulty)
    randomAction(createCircle, state.board, liArray, getEmptyCells);

  //MINIMAX
  if (state.difficulty)
    miniMaxAction(minimax, createCircle, state.board, liArray);

  changeTurnHandler();
}
