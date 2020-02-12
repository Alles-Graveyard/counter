const fs = require("fs");
const template = fs.readFileSync(__dirname + "/template.svg", "utf8").split("[x]");
const {convert} = require("convert-svg-to-png");

//Express
const express = require("express");
const app = express();
app.listen(8012);

//ID
app.get("/:id", async (req, res) => {
    const svg = template[0] + Math.floor(Math.random() * 1000) + template[1];
    const png = await convert(svg);
    res.type("image/png").send(png);
});