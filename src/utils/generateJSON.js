const fs = require("fs");
const path = require("path");

SVGDirectory = path.join(__dirname, '../../public/img/svg/');
// console.log(SVGDirectory)

function readFiles(dirname, onError) {
    const data = {}
    const categories = fs.readdirSync(dirname);

    categories.forEach(function (category) {

        data[category] = [];
        const filesInCategory = fs.readdirSync(dirname + category);

        filesInCategory.forEach(function (filename) {
            iconName = filename.split(".")[0];
            data[category].push({
                "text": iconName
                    .split('_')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' '),
                "value": iconName
            });
        })
    })
    return data;
}

data = readFiles(SVGDirectory, function (error) {
    console.log(error);
})

const pathToJSONFile = path.join(__dirname, '../../public/json/icon-names.json');

fs.writeFile(pathToJSONFile, JSON.stringify(data), (err) => {
    if (err) throw err;
});