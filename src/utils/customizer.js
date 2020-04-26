const fs = require("fs");


modifySVG = (svgCode, colorCode, sizeInPixels) => {

  if (svgCode.search('width="24" height="24"')) {
    svgCode = svgCode.replace('width="24" height="24"', '');
  }

  const index1 = [...svgCode.matchAll(/>/g)][0]["index"] + 1;
  const arr = [...svgCode.matchAll(/</g)];
  const index2 = arr[arr.length - 1]["index"];

  const finalSVG =
    svgCode.slice(0, index1 - 1) +
    ` width="${sizeInPixels}px" height="${sizeInPixels}px">` +
    `<g fill="#${colorCode}">` +
    svgCode.slice(index1, index2) +
    "</g>" +
    svgCode.slice(index2, svgCode.length);

  return finalSVG;
};

generateJSON = (category, iconName, colorCode, sizeInPixels) => {
  const svgFile = "./public/img/svg/" + category + "/" + iconName + ".svg";
  const svgCode = fs.readFileSync(svgFile, "utf8");
  const modifiedSvgCode = modifySVG(svgCode, colorCode, sizeInPixels);

  finalJSON = {};

  finalJSON["iconName"] = iconName;
  finalJSON["svgCode"] = modifiedSvgCode;
  finalJSON["colorCode"] = colorCode;
  finalJSON["sizeInPixels"] = sizeInPixels;

  return finalJSON;
};
