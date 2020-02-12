const fs = require("fs");
const template = fs.readFileSync(__dirname + "/template.svg", "utf8").split("[x]");

//Express
const express = require("express");
const app = express();
app.listen(8012);

//ID
app.get("/:id", (req, res) => {
    const svg = template[0] + Math.floor(Math.random() * 1000) + template[1];
    res.send(svg);
});