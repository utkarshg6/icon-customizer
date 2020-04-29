const path = require("path");
const express = require("express");
const hbs = require("hbs");
const customizer = require("./utils/customizer");

const app = express();
const port = process.env.PORT || 3000;

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Satic directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Regular",
  });
});

app.get("/material", (req, res) => {
  res.render("index", {
    title: "Material",
  });
});

app.get("/animated", (req, res) => {
  res.render("index", {
    title: "Animated",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page.",
  });
});

app.get("/customize", (req, res) => {
  return res.send(generateJSON(req.query.category,
    req.query.iconName,
    (!req.query.colorCode) ? '000000' : req.query.colorCode,
    (!req.query.sizeInPixels) ? '500' : req.query.sizeInPixels));
});


app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on Port " + port + ".");
});
