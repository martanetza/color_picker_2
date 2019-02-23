let img;
let imgData;
let pixelIndex;
const imageCanvas = document.getElementById("imageCanvas");
const zoomCanvas = document.getElementById("zoomCanvas");
let ctx = imageCanvas.getContext("2d");
let ctxZoom = null;
let zoomData;

document.addEventListener("DOMContentLoaded", drawImg);
function drawImg() {
  img = new Image();
  img.src = "cat.jpg";

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    document
      .getElementById("imageCanvas")
      .addEventListener("mousemove", showPosition);
    getImgData();
  };
}

function getImgData() {
  imgData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
}
function showPosition(event) {
  ctx.clearRect(0, 0, 500, 600);
  const x = event.offsetX;
  const y = event.offsetY;
  //   console.log(x, y);
  ctx.putImageData(imgData, 0, 0);
  drawRectangle(x, y);
}

const MAX_MOVEMENT = 10;

function drawRectangle(x, y) {
  const ratioX = (x / imageCanvas.width) * 2 - 1;
  const ratioY = (y / imageCanvas.height) * 2 - 1;
  let displacementX = MAX_MOVEMENT * ratioX;
  let displacementY = MAX_MOVEMENT * ratioY;

  ctx.strokeRect(
    displacementX + MAX_MOVEMENT,
    displacementY + MAX_MOVEMENT,
    imageCanvas.width - 2 * MAX_MOVEMENT,
    imageCanvas.height - 2 * MAX_MOVEMENT
  );
  ctx.strokeStyle = "green";
}
