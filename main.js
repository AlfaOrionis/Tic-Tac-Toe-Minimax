import { createCircle } from "./Tools/createCircle.js";
import { checkIfWin } from "./Tools/checkIfWin.js";

const trn = document.getElementById("turn");
const liArray = document.getElementsByTagName("li");
const table = document.getElementById("table");
console.log(table.clientHeight);
let turn = "X";
trn.textContent = turn;

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function animateWin(winWay) {
  const div = document.createElement("div");
  //Horizontal case
  if (winWay.way === "horizontal") {
    const tHeight = table.clientHeight;
    const drawLineHeight = (tHeight / 3) * winWay.indx + tHeight / 6;
    div.classList.add("drawline", "horizontal");
    div.style.top = drawLineHeight + "px";
  } else if (winWay.way === "vertical") {
    const tWidth = table.clientWidth;
    const drawLineWidth = (tWidth / 3) * winWay.indx + tWidth / 6;
    div.classList.add("drawline", "vertical");
    div.style.left = drawLineWidth + "px";
  } else if (winWay.way === "diagonal") {
    div.classList.add("drawline", "diagonal");
    div.style.transform = `translate(-50%, -50%) rotate(${winWay.rotate})`;
  }

  table.append(div);
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
    trn.textContent = "THE END";
    return;
  } else if (turn === "X") {
    turn = "O";

    computerAction();
  } else if (turn === "O") turn = "X";
  trn.textContent = turn;
}

//I am creating a circle with JS only because of animation,
//The cross is made with just css (after and before pseudoelements) so there is no createCross function.
