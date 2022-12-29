export function miniMaxAction(minimax, createCircle, board, liArray) {
  let bestVal = -1000;
  let bestMove = {};
  bestMove.row = -1;
  bestMove.col = -1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = "O";

        let moveVal = minimax(board, 0, false);

        board[i][j] = "";

        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }
  const intelligentId = bestMove.row * 3 + (bestMove.col % 3);
  createCircle(liArray[intelligentId]);
  board[bestMove.row][bestMove.col] = "O";
}
