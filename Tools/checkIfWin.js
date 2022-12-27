export function checkIfWin(b) {
  let winner = "";
  for (let i = 0; i < 3; i++) {
    //horizontal
    if (b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
      winner = b[i][2];
    }
  }
  //vertical
  for (let i = 0; i < 3; i++) {
    if (b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
      winner = b[2][i];
    }
  }
  //diagonal
  if (
    (b[0][0] === b[1][1] && b[1][1] === b[2][2]) ||
    (b[0][2] === b[1][1] && b[1][1] === b[2][0])
  ) {
    winner = b[1][1];
  }

  return winner;
}
