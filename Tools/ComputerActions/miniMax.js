import { checkIfWin } from "../GameFunctions/checkIfWin.js";
import { getEmptyCells } from "../GameFunctions/getEmptyCells.js";

export function minimax(board, depth, isMax) {
  const winner = checkIfWin(board).winner;

  let score = (winner === "O" && 10) || (winner === "X" && -10);

  if (score === 10 || score === -10) return score;

  if (getEmptyCells(board).length === 0) return 0;

  // If this maximizer's move
  if (isMax) {
    let best = -1000;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = "O";

          best = Math.max(best, minimax(board, depth + 1, !isMax));
          board[i][j] = "";
        }
      }
    }
    return best;
  } else {
    let best = 1000;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = "X";

          best = Math.min(best, minimax(board, depth + 1, !isMax));

          board[i][j] = "";
        }
      }
    }
    return best;
  }
}
