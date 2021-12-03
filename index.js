"use strict";
const express = require("express");
var app = express();
var mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, { useUnifiedTopology: true });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/views/index.html");
});
app.get("/api/hello/", (req, res) => {
    res.json({ hello: "hello worldd" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening on port " + port);
});
//
