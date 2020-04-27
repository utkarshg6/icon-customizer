const form = document.querySelector("form");
const message = document.querySelector("#message");
const displayImage = document.getElementById("display-image");
const downloadSVG = document.getElementById("download-svg");
const downloadPNG = document.getElementById("download-png");
const iconNameDropdown = document.getElementById("icon-name-dropdown");
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
  iconNameDropdown.options.add(new Option(text = "Action Chains", value = "action_chains"));
  iconNameDropdown.options.add(new Option(text = "Activate Subscriptions", value = "activate_subscriptions"));
  iconNameDropdown.options.add(new Option(text = "Admin", value = "admin"));
  iconNameDropdown.options.add(new Option(text = "Api", value = "api"));
  iconNameDropdown.options.add(new Option(text = "Application Incomplete", value = "application_incomplete"));
  iconNameDropdown.options.add(new Option(text = "Application Instance", value = "application_instance"));
}

if (category == "material") {
  fetchDetails("material", "wifi", "000000", "500");
  iconNameDropdown.options.add(new Option(text = "3d Rotation", value = "3d_rotation"));
  iconNameDropdown.options.add(new Option(text = "Ac Unit", value = "ac_unit"));
  iconNameDropdown.options.add(new Option(text = "Access Alarm", value = "access_alarm"));
  iconNameDropdown.options.add(new Option(text = "Access Alarms", value = "access_alarms"));
  iconNameDropdown.options.add(new Option(text = "Access Time", value = "access_time"));
}

if (category == "animated") {
  fetchDetails("animated", "installing", "000000", "500");
  downloadPNG.hidden = true;
  iconNameDropdown.options.add(new Option(text = "Installing", value = "installing"));
  iconNameDropdown.options.add(new Option(text = "Loading", value = "loading"));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const iconName = document.querySelector("#icon-name-dropdown").value;
  const colorCode = document.querySelector("#color-code").value.slice(1, 7);
  const sizeInPixels = document.querySelector("#size-in-pixels").value;
  console.log(category);
  console.log(iconName);
  // message.textContent = "Loading...";

  fetchDetails(category, iconName, colorCode, sizeInPixels);
  // message.textContent =
  //   "The Image has been changed to Color #" +
  //   data.colorCode +
  //   " and size " +
  //   data.sizeInPixels +
  //   "px.";
});
