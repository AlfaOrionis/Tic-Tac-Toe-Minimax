export function getEmptyCells(board) {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < 3; y++) {
      !board[i][y] && arr.push([i, y]);
    }
  }
  return arr;
}
