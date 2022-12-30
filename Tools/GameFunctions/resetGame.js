export function resetGame(state, resetBtn, liArray, trn, uploadScore, giveUp) {
  console.log(state);
  state.hasTheGameStarted = false;
  resetBtn.classList.add("disabled");
  //Clearing the board
  state.board = [
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

  //Uploading score if giveUp, it means +1 for computer
  giveUp && uploadScore("O", state.difficulty);

  state.turn = "X";
  trn.textContent = state.turn;
}
