const form = document.querySelector("form");
const displayImage = document.getElementById("display-image");
const downloadSVG = document.getElementById("download-svg");
const downloadPNG = document.getElementById("download-png");
const iconNameDropdown = document.getElementById("icon-name-dropdown");
const category = document.title.toLowerCase();

const defaultColorCode = "000000";
const defaultSizeInPixels = "500";

const updateSVG = (name) => {
  downloadSVG.setAttribute("download", name + ".svg");
  downloadSVG.setAttribute("href", displayImage.src);
}

const updatePNG = (name, sizeInPixels) => {
  mycanvas = document.createElement('canvas');
  mycanvas.width = mycanvas.height = sizeInPixels;
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
          console.log(data.error);
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

if (category == "animated") {
  downloadPNG.hidden = true;
}

fetch("./json/icon-names.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    iconsArray = data[category];

    for (let i = 0; i < iconsArray.length; i++) {
      iconNameDropdown
        .options
        .add(new Option(text = iconsArray[i]["text"], value = iconsArray[i]["value"]));
    }
    fetchDetails(category, iconNameDropdown.value, defaultColorCode, defaultSizeInPixels);
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const iconName = iconNameDropdown.value;
  const colorCode = document.querySelector("#color-code").value.slice(1, 7) || defaultColorCode;
  const sizeInPixels = document.querySelector("#size-in-pixels").value || defaultSizeInPixels;

  fetchDetails(category, iconName, colorCode, sizeInPixels);
});
