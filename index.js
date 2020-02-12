const fs = require("fs");
var data = {};

//Image
const template = fs.readFileSync(__dirname + "/template.svg", "utf8").split("[x]");
const {convert} = require("convert-svg-to-png");
const image = async content => {
    const svg = template[0] + content + template[1];
    const png = await convert(svg);
    return png;
};

//Express
const express = require("express");
const app = express();
app.listen(8012);

//ID
app.get("/:id", async (req, res) => {
    const {id} = req.params;
    data[id] = (typeof data[id] === "undefined") ? 1 : data[id] + 1;
    res.type("image/png").send(await image(data[id]));
});

//Refresh every 24 hours
setInterval(() => data = {}, 1000 * 60 * 60 * 24);