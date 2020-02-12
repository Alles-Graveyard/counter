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
app.set("trust proxy", 1);
app.listen(8012);

//Ratelimiting
const ratelimit = require("express-rate-limit")({
    windowMs: 1000 * 60,
    max: 50,
    message: "You have angered the gods."
});

//Image Counter
app.get("/:id", ratelimit, async (req, res) => {
    if (sum(data) > 10000) data = {};
    const {id} = req.params;
    data[id] = (typeof data[id] === "undefined") ? 1 : data[id] + 1;
    res.type("image/png").send(await image(data[id]));
});

//Count Values
function sum(obj) {
    return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
};