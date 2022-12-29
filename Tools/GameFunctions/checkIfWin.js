export function checkIfWin(b) {
  let winner = "";
  //I need winWay just to animate drawing line
  let winWay = "";
  for (let i = 0; i < 3; i++) {
    //horizontal
    if (b[i][0] === b[i][1] && b[i][1] === b[i][2] && b[i][0] !== "") {
      winner = b[i][2];
      winWay = { way: "horizontal", indx: i };
      break;
    }
  }
  //vertical
  for (let i = 0; i < 3; i++) {
    if (b[0][i] === b[1][i] && b[1][i] === b[2][i] && b[0][i] !== "") {
      winner = b[2][i];
      winWay = { way: "vertical", indx: i };
      break;
    }
  }
  //diagonal
  //rotate is to which direction to rotate the drawing line
  if (b[0][0] === b[1][1] && b[1][1] === b[2][2] && b[0][0] !== "") {
    winner = b[1][1];
    winWay = { way: "diagonal", rotate: "-45deg" };
  }
  if (b[0][2] === b[1][1] && b[1][1] === b[2][0] && b[0][2] !== "") {
    winner = b[1][1];
    winWay = { way: "diagonal", rotate: "45deg" };
  }

  return { winner: winner, winWay: winWay };
}
