const fs = require("fs");
var data = {};

//Image
const template = fs.readFileSync(__dirname + "/template.svg", "utf8").split("[x]");
const svg2png = require("svg2png");
const image = content => {
    const svg = template[0] + content + template[1];
    const png = svg2png.sync(svg);
    return png;
};

//Express
const express = require("express");
const app = express();
const cors = require("cors");
app.set("trust proxy", 1);
app.listen(8012);

//Ratelimiting
const ratelimit = require("express-rate-limit")({
    windowMs: 1000 * 60,
    max: 50,
    message: "You have angered the gods."
});

//Static Site
app.use(express.static(__dirname + "/site"));

//Image Counter
app.get("/:id", cors(), ratelimit, (req, res) => {
    if (sum(data) > 10000) data = {};

    const {id} = req.params;
    data[id] = (typeof data[id] === "undefined") ? 1 : data[id] + 1;
    
    var img;
    try {
        img = image(data[id]);
    } catch (err) {
        return res.status(500).send("Something went wrong.");
    }

    res.type("image/png").send(img);
});

//Count Values
function sum(obj) {
    return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
};