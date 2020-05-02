const fs = require("fs");


customizeSVG = (svgCode, colorCode, sizeInPixels) => {

  if (svgCode.search('width="24" height="24"')) {
    svgCode = svgCode.replace('width="24" height="24"', '');
  }

  // Index of Closing Bracket
  const index = [...svgCode.matchAll(/>/)][0]["index"];

  return svgCode.slice(0, index) +
    ` fill="#${colorCode}" width="${sizeInPixels}px" height="${sizeInPixels}px"` +
    svgCode.slice(index, svgCode.length);
};

generateJSON = (category, iconName, colorCode, sizeInPixels) => {
  const svgFile = "./public/img/svg/" + category + "/" + iconName + ".svg";
  const svgCode = fs.readFileSync(svgFile, "utf8");
  const modifiedSvgCode = customizeSVG(svgCode, colorCode, sizeInPixels);

  finalJSON = {};

  finalJSON["iconName"] = iconName;
  finalJSON["svgCode"] = modifiedSvgCode;
  finalJSON["colorCode"] = colorCode;
  finalJSON["sizeInPixels"] = sizeInPixels;

  return finalJSON;
};
