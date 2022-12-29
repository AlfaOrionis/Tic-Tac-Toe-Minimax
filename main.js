import { createCircle } from "./Tools/createCircle.js";
import { checkIfWin } from "./Tools/checkIfWin.js";
import { animateWin } from "./Tools/animateWin.js";
import { mount } from "./Tools/mount.js";
import { uploadScore } from "./Tools/uploadScore.js";
import { resetScore } from "./Tools/resetScore.js";

const trn = document.getElementById("turn");
const liArray = document.getElementsByTagName("li");
const resetBtn = document.getElementById("reset");
const resetScoreBtn = document.getElementById("reset-score");

mount(uploadScore);

let turn = "X";
let hasTheGameStarted = false;
trn.textContent = turn;

for (let i = 0; i < liArray.length; i++) {
  liArray[i].addEventListener("click", playerAction);
}

resetBtn.addEventListener("click", popUp);
resetScoreBtn.addEventListener("click", () => {
  resetScore();
  uploadScore();
});

window.onbeforeunload = (e) => {
  console.log(e);
  return " ";
};

window.onunload = () => {
  if (!hasTheGameStarted) return;
  const score = JSON.parse(localStorage.getItem("score"));
  score.computer++;
  return localStorage.setItem("score", JSON.stringify(score));
};

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function closeModal(divModal, backdrop) {
  divModal.remove();
  backdrop.remove();
}

function popUp() {
  //Not gonna open if the game hasnt even started
  if (!hasTheGameStarted) return;
  const divModal = document.createElement("div");
  const backdrop = document.createElement("div");

  backdrop.classList.add("backdrop");

  divModal.classList.add("modal");
  divModal.innerHTML = `<div class='modal-div'>
  <p>Are u sure u want to reset the game?
   Resetting the game is tantamount to giving up! </p>
   </div>
   <div class='btn-div'><button id='cancel-btn'>Cancel</button>
   <button id='give-up-btn'>Give up</button>
   </div>
   
   `;
  document.body.append(backdrop);
  document.body.append(divModal);

  const cancelBtn = document.getElementById("cancel-btn");
  const giveUpBtn = document.getElementById("give-up-btn");

  cancelBtn.addEventListener("click", () => {
    closeModal(divModal, backdrop);
  });
  giveUpBtn.addEventListener("click", () => {
    resetGame();
    closeModal(divModal, backdrop);
  });

  console.log(cancelBtn);
}

function resetGame() {
  hasTheGameStarted = false;
  resetBtn.classList.add("disabled");
  //Clearing the board
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  //Removing all the crosses
  for (let i = 0; i < liArray.length; i++) {
    liArray[i].removeAttribute("class", "cross");
    //Removing all the circles
    if (liArray[i].children[0]) {
      liArray[i].removeChild(liArray[i].children[0]);
    }
  }
  //removing drawline if there was a win
  const drawline = document.getElementsByClassName("drawline");

  if (drawline[0]) {
    drawline[0].remove();
  }

  //Uploading score, it means +1 for computer
  uploadScore("O");

  turn = "X";
  trn.textContent = turn;
}

const getEmptyCells = () => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < 3; y++) {
      !board[i][y] && arr.push([i, y]);
    }
  }
  return arr;
};

function playerAction(e) {
  hasTheGameStarted = true;

  if (turn === "X") {
    //Checking if the cell isnt already taken
    if (e.target.children.length > 0 || e.target.classList.length > 0) return;
    e.target.classList.add("cross");
    board[Math.ceil(e.target.id / 3 - 1)][(e.target.id - 1) % 3] = "X";
    changeTurn();
  }
}
function computerAction() {
  const emptyCellsArr = getEmptyCells();
  const randomCellIndex = Math.floor(Math.random() * emptyCellsArr.length);
  const randomCell = emptyCellsArr[randomCellIndex];
  const randomId = randomCell[0] * 3 + (randomCell[1] % 3);
  createCircle(liArray[randomId]);
  board[randomCell[0]][randomCell[1]] = "O";
  changeTurn();
}

function changeTurn() {
  resetBtn.classList.remove("disabled");
  const winner = checkIfWin(board);
  if (winner.winner) {
    uploadScore(winner.winner);

    animateWin(winner.winWay);

    trn.textContent = "WINNER" + " " + winner.winner;
    return;
  } else if (getEmptyCells().length === 0) {
    trn.textContent = "TIE!";
    return;
  } else if (turn === "X") {
    turn = "O";

    setTimeout(() => {
      computerAction();
    }, 1000);
  } else if (turn === "O") turn = "X";
  trn.textContent = turn;
}
