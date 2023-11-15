let formDetails = document.querySelector("#details");
let formImgOne = document.querySelector("#imgOne");
let formImgTwo = document.querySelector("#imgTwo");
let btnDownload = document.querySelector("#btnDownload");
let btnPreview = document.querySelector("#btnPreview");
let btnReset = document.querySelector("#btnReset");
let posterOutput = document.querySelector("#output");
let loadingModalContainer = document.querySelector("#loadingModalContainer");
let imageOneOutput;
let imageTwoOutput;
let screenSizeLess400 = window.matchMedia("(max-width: 400px)").matches;

formDetails.value =
  "Date\nBreed\nExtra info\nTown\nFirst letters of postcode\nMobile 1\nMobile 2";

btnDownload.addEventListener("click", function () {
  loadingModalContainer.style.display = "flex";
  generateHTML();
  setTimeout(function () {
    html2canvas(posterOutput, { allowTaint: true, useCORS: true }).then(
      function (canvas) {
        let downloadLink = document.querySelector("#download");
        let imgData = canvas.toDataURL("image/png");
        downloadLink.href = imgData;
        downloadLink.download = "poster.png";
        downloadLink.click();
        if (screenSizeLess400) {
          posterOutput.style.display = "none";
        }
        loadingModalContainer.style.display = "none";
      }
    );
  }, 1500);
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
      <img class="image-output" id="imageOneOutput">
      <img class="image-output" id="imageTwoOutput">
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

  if (formImgOne.files.length > 0) {
    let fr1 = new FileReader();
    fr1.readAsDataURL(formImgOne.files[0]);
    fr1.onload = function () {
      imageOneOutput.src = fr1.result;
    };
  }

  if (formImgTwo.files.length > 0) {
    let fr2 = new FileReader();
    fr2.readAsDataURL(formImgTwo.files[0]);
    fr2.onload = function () {
      imageTwoOutput.src = fr2.result;
    };
  }

  if (formImgOne.files.length > 0 && formImgTwo.files.length < 1) {
    imageOneOutput.style.maxHeight = "90%";
  }

  if (formImgOne.files.length < 1 && formImgTwo.files.length > 0) {
    imageTwoOutput.style.maxHeight = "90%";
  }

  if (formImgOne.files.length > 0 && formImgTwo.files.length > 0) {
    imageOneOutput.style.maxHeight = "45%";
    imageTwoOutput.style.maxHeight = "45%";
  }

  posterOutput.style.display = "block";
  if (screenSizeLess400) {
    posterOutput.style.transform = "translateY(1000px)";
  }
}
