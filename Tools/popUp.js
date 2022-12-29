export function popUp(hasTheGameStarted, resetGameHandler) {
  //Not gonna open if the game hasnt even started
  if (!hasTheGameStarted) return;
  const divModal = document.createElement("div");
  const backdrop = document.createElement("div");

  backdrop.classList.add("backdrop");

  divModal.classList.add("modal");
  divModal.innerHTML = `<div class='modal-div'>
    <p>Are u sure u want to reset the game?
     Resetting the game is tantamount to giving up! </p>
     </div>
     <div class='btn-div'><button id='cancel-btn'>Cancel</button>
     <button id='give-up-btn'>Give up</button>
     </div>
     
     `;
  document.body.append(backdrop);
  document.body.append(divModal);

  const cancelBtn = document.getElementById("cancel-btn");
  const giveUpBtn = document.getElementById("give-up-btn");
  backdrop.addEventListener("click", () => {
    divModal.remove();
    backdrop.remove();
  });
  cancelBtn.addEventListener("click", () => {
    divModal.remove();
    backdrop.remove();
  });
  giveUpBtn.addEventListener("click", () => {
    resetGameHandler("give up");
    divModal.remove();
    backdrop.remove();
  });

  console.log(cancelBtn);
}
