//I am creating a circle with JS only because of animation,
//The cross is made with just css (after and before pseudoelements) so there is no createCross function.

export function createCircle(target) {
  let circle = document.createElement("div");
  let boxTopLeft = document.createElement("div");
  let boxBottomLeft = document.createElement("div");
  let boxBottomRight = document.createElement("div");
  let boxTopRight = document.createElement("div");

  circle.append(boxTopLeft);
  circle.append(boxBottomLeft);
  circle.append(boxBottomRight);
  circle.append(boxTopRight);

  circle.classList.add("circle");

  boxTopLeft.classList.add("box", "box-top-left");
  boxBottomLeft.classList.add("box", "box-bottom-left");
  boxBottomRight.classList.add("box", "box-bottom-right");
  boxTopRight.classList.add("box", "box-top-right");

  target.append(circle);
}
