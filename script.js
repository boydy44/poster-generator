let canvas = document.querySelector("#posterCanvas");
canvas.style.backgroundColor = "#ffffff";
let ctx = canvas.getContext("2d");

let formName = document.querySelector("#name");
let formLocation = document.querySelector("#location");
let formPhone = document.querySelector("#phone");
let formImg = document.querySelector("#img");
let nameVal = "";
let locationVal = "";
let phoneVal = "";
let img;

draw();

formName.addEventListener("change", function (event) {
  nameVal = event.target.value;
  draw();
});
formLocation.addEventListener("change", function (event) {
  locationVal = event.target.value;
  draw();
});
formPhone.addEventListener("change", function (event) {
  phoneVal = event.target.value;
  draw();
});
formImg.addEventListener("change", function (event) {
  let img = new Image();
  img.src = URL.createObjectURL(event.target.files[0]);
  img.onload = function () {
    ctx.drawImage(
      img,
      canvas.width / 2 - img.width / 2,
      275,
      img.width,
      img.height
    );
  };
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-under";
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Lost Dog", canvas.width / 2, 50);
  ctx.fillText("Name: " + nameVal, canvas.width / 2, 125);
  ctx.fillText("Location: " + locationVal, canvas.width / 2, 175);
  ctx.fillText("Phone: " + phoneVal, canvas.width / 2, 225);
}

let btnDownload = document.querySelector("#btnDownload");
let download = document.querySelector("#download");
btnDownload.addEventListener("click", function () {
  download.setAttribute("download", "poster.png");
  download.setAttribute(
    "href",
    canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
  );
  download.click();
});
