import { createCircle } from "./Tools/createCircle.js";
import { checkIfWin } from "./Tools/checkIfWin.js";
import { animateWin } from "./Tools/animateWin.js";

const trn = document.getElementById("turn");
const liArray = document.getElementsByTagName("li");
const resetBtn = document.getElementById("reset");

let turn = "X";
trn.textContent = turn;

for (let i = 0; i < liArray.length; i++) {
  liArray[i].addEventListener("click", playerAction);
}

resetBtn.addEventListener("click", resetGame);

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function resetGame() {
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

  const drawline = document.getElementsByClassName("drawline");

  if (drawline[0]) {
    console.dir(drawline[0].remove());
  }

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
  console.log(e.target);
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
  const winner = checkIfWin(board);
  console.log(winner);
  if (winner.winner) {
    turn = "";
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
