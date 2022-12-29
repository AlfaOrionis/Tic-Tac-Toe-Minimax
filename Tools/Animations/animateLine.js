import { animateText } from "./animateText.js";

export function animateLine({ winWay, winner }) {
  //Animate drawline
  const div = document.createElement("div");
  //Horizontal case
  if (winWay.way === "horizontal") {
    const tHeight = table.clientHeight;
    console.log(table);
    const drawLineHeight = (tHeight / 3) * winWay.indx + tHeight / 6;
    div.classList.add("drawline", "horizontal");
    div.style.top = drawLineHeight + "px";
    //Vertical case
  } else if (winWay.way === "vertical") {
    const tWidth = table.clientWidth;
    const drawLineWidth = (tWidth / 3) * winWay.indx + tWidth / 6;
    div.classList.add("drawline", "vertical");
    div.style.left = drawLineWidth + "px";
    //Diagonal case
  } else if (winWay.way === "diagonal") {
    div.classList.add("drawline", "diagonal");
    div.style.transform = `translate(-50%, -50%) rotate(${winWay.rotate})`;
    div.style.animation = `${
      winWay.rotate === "-45deg"
        ? "drawingDiagonalLeft"
        : "drawingDiagonalRight"
    } forwards 1s ease`;
  }

  animateText(winner);

  table.append(div);
}
