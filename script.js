let formDetails = document.querySelector("#details");
let formImgOne = document.querySelector("#imgOne");
let formImgTwo = document.querySelector("#imgTwo");
let btnDownload = document.querySelector("#btnDownload");
let btnPreview = document.querySelector("#btnPreview");
let btnReset = document.querySelector("#btnReset");
let downloadLink = document.querySelector("#download");
let posterOutput = document.querySelector("#output");
let imageOneOutput;
let imageTwoOutput;

btnDownload.addEventListener("click", function () {
  generateHTML();
  html2canvas(posterOutput, { allowTaint: true, useCORS: true }).then(function (
    canvas
  ) {
    let imgData = canvas.toDataURL("image/png");
    downloadLink.href = imgData;
    downloadLink.download = "poster.png";
    downloadLink.click();
  });
});

btnPreview.addEventListener("click", function () {
  generateHTML();
});

function generateHTML() {
  let formDetailsFormatted = formDetails.value.replace(/\n\r?/g, "<br />");
  let posterHTML = `<div class="poster-header-container">
    <div class="logo-container">
      <img id="logo" src="logo.jpg" />
    </div>
    <div class="header-text-container">
      <span class="header-text">PLEASE DO NOT APPROACH</span>
      <span class="header-text">CALL WITH SIGHTINGS</span>
    </div>
  </div>
  <div class="poster-body-container">
    <div class="images-container">
      <img id="missing" src="missing.png">
      <img id="imageOneOutput">
      <img id="imageTwoOutput">
    </div>
    <div class="details-container">
      ${formDetailsFormatted}
    </div>
  </div>
  <div class="instructions-container">
    <span class="instructions-text"
      >CALL / TEXT NUMBER ON POSTER WITH EXACT LOCATION, TIME & DIRECTION
      OF TRAVEL. PHOTO/VIDEO IF POSSIBLE. PLEASE DON'T REPORT SIGHTINGS TO
      OTHER GROUPS AS WE NEED TO ACT PROMPTLY</span
    >
    <span class="instructions-text"
      >Don't put sightings on social media.</span
    >
    <span class="instructions-text"
      >If you see this missing dog and he/she won't willingly come to you
      please don't shout, chase or try to catch him/her.</span
    >
  </div>
  <div class="poster-footer-container">
    <div class="qr-container">
      <img id="qr" src="qr.png" />
    </div>
    <div class="footer-text-container">
      <span class="footer-text"
        >ADDR is a FREE SERVICE run by a small team of volunteers.</span
      >
      <span class="footer-text"
        >We rely solely on donations and are not affiliated with other
        fundraisers. Donations to:</span
      >
      <span class="footer-text">Paypal: ayrshireddr@gmail.com</span>
      <span class="footer-text"
        >Bank of Scotland: Ayrshire Drone Dog Rescue. S/C: 802260.
        ACCNO: 24742264</span
      >
      <span class="footer-text"
        >FB: https://www.facebook.com/AyrshireDDR CALL:07424 425866</span
      >
    </div>
  </div>`;
  posterOutput.innerHTML = posterHTML;
  imageOneOutput = document.querySelector("#imageOneOutput");
  imageTwoOutput = document.querySelector("#imageTwoOutput");
  let fr1 = new FileReader();
  fr1.readAsDataURL(formImgOne.files[0]);
  fr1.onload = function () {
    imageOneOutput.src = fr1.result;
  };
  let fr2 = new FileReader();
  fr2.readAsDataURL(formImgTwo.files[0]);
  fr2.onload = function () {
    imageTwoOutput.src = fr2.result;
  };
  posterOutput.style.display = "block";
}
