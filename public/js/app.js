const form = document.querySelector("form");
const message = document.querySelector("#message");
const displayImage = document.getElementById("display-image");
const downloadSVG = document.getElementById("download-svg");
const downloadPNG = document.getElementById("download-png");
const category = document.title.toLowerCase();

const updateSVG = (name) => {
  downloadSVG.setAttribute("download", name + ".svg");
  downloadSVG.setAttribute("href", displayImage.src);

}

const updatePNG = (name, sizeInPixels) => {
  mycanvas = document.createElement('canvas');
  mycanvas.width = sizeInPixels;
  mycanvas.height = sizeInPixels;
  ctx = mycanvas.getContext("2d");
  displayImage.onload = function () {
    ctx.drawImage(displayImage, 0, 0);
    downloadPNG.setAttribute("download", name + ".png");
    downloadPNG.setAttribute("href", mycanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  }
}

const fetchDetails = (category, iconName, colorCode, sizeInPixels) => {

  const thisString = "/customize?" +
    "category=" + category + "&" +
    "iconName=" + iconName + "&" +
    "colorCode=" + colorCode + "&" +
    "sizeInPixels=" + sizeInPixels;

  console.log(thisString);

  fetch(thisString).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message.textContent = data.error;
        } else {
          displayImage.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(data.svgCode)));
          // newImage.src = "/img/temp.svg?" + new Date().getTime();

          updateSVG(data.iconName);
          updatePNG(data.iconName, sizeInPixels);
        }
      })
    }
  )
}


if (category == "regular") {
  fetchDetails("regular", "action_chains", "000000", "500");
}

if (category == "material") {
  fetchDetails("material", "wifi", "000000", "500");
}

if (category == "animated") {
  fetchDetails("animated", "installing", "000000", "500");
  downloadPNG.hidden = true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const iconName = document.querySelector("#iconName").value;
  const colorCode = document.querySelector("#colorCode").value.slice(1, 7);
  const sizeInPixels = document.querySelector("#sizeInPixels").value;
  console.log(category);
  // message.textContent = "Loading...";

  fetchDetails(category, iconName, colorCode, sizeInPixels);
  // message.textContent =
  //   "The Image has been changed to Color #" +
  //   data.colorCode +
  //   " and size " +
  //   data.sizeInPixels +
  //   "px.";
});
