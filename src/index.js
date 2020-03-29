"use strict";
exports.__esModule = true;
var express_1 = require("express");
var shelljs_1 = require("shelljs");
var app = express_1["default"]();
var port = 2000;
app.use(express_1["default"].json());
app.post("/exec", function (req, res) {
    var request_data = req.body;
    if (request_data.code === undefined) {
        res.statusCode = 404;
        res.send({ output: "Error! Please try again", error: true });
    }
    else {
        var code = request_data.code;
        var commandOutput = shelljs_1["default"].exec("/app/prybar-nodejs -q -e '" + code + "'");
        if (commandOutput.code !== 0) {
            res.send({ output: commandOutput.stderr, error: true });
        }
        else {
            res.send({ output: commandOutput.stdout, error: false });
        }
    }
});
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
