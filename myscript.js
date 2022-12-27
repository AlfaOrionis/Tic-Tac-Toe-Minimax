import { createCircle } from "./Tools/createCircle.js";
import { checkIfWin } from "./Tools/checkIfWin.js";

let turn = "X";
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const getEmptyCells = () => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < 3; y++) {
      !board[i][y] && arr.push([i, y]);
    }
  }
  return arr;
};

const trn = document.getElementById("turn");
trn.textContent = turn;

const liArray = document.getElementsByTagName("li");

for (let i = 0; i < liArray.length; i++) {
  liArray[i].addEventListener("click", playerAction);
}

function playerAction(e) {
  console.log(e.target);
  if (turn === "X") {
    //Checking if the cell isnt already taken
    if (e.target.children.length > 0 || e.target.classList.length > 0) return;
    e.target.classList.add("cross");
    board[Math.ceil(e.target.id / 3 - 1)][(e.target.id - 1) % 3] = "X";
    console.log(board);
    changeTurn();
  }
}
function computerAction() {
  const emptyCellsArr = getEmptyCells();
  //   const randomCell = Math.floor(Math.random() * countEmptyCells().length + 1);
  const randomCellIndex = Math.floor(Math.random() * emptyCellsArr.length);
  const randomCell = emptyCellsArr[randomCellIndex];
  const randomId = randomCell[0] * 3 + (randomCell[1] % 3);
  createCircle(liArray[randomId]);
  board[randomCell[0]][randomCell[1]] = "O";
  changeTurn();
}

function changeTurn() {
  const winner = checkIfWin(board);
  if (winner) {
    trn.textContent = "WINNER" + " " + winner;
    turn = "";
    return;
  }

  if (getEmptyCells().length === 0) {
    trn.textContent = "THE END";
    return;
  }
  if (turn === "X") {
    turn = "O";
    setTimeout(() => {
      computerAction();
    }, 1000);
  } else turn = "X";
  trn.textContent = turn;
}

//I am creating a circle with JS only because of animation,
//The cross is made with just css (after and before pseudoelements) so there is no createCross function.
