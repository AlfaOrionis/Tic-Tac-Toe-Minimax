export function randomAction(createCircle, board, liArray, getEmptyCells) {
  const emptyCellsArr = getEmptyCells(board);
  const randomCellIndex = Math.floor(Math.random() * emptyCellsArr.length);
  const randomCell = emptyCellsArr[randomCellIndex];
  const randomId = randomCell[0] * 3 + (randomCell[1] % 3);

  createCircle(liArray[randomId]);
  board[randomCell[0]][randomCell[1]] = "O";
}
