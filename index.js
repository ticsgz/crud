"use strict";
const express = require("express");
var app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, { useUnifiedTopology: true });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

let exerciseSessionSchema = mongoose.Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: String,
});
let userSchema = mongoose.Schema({
    username: { type: String, required: true },
    log: [exerciseSessionSchema],
});
let Session = mongoose.model("Session", exerciseSessionSchema);
let User = mongoose.model("User", userSchema);
let vehicleSchema = mongoose.Schema({
    brand: { type: String, required: true },
});
let Vehicle = mongoose.model("Vehicle", vehicleSchema);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/views/index.html");
});
app.get("/api/users", (req, res) => {
    User.find({}, (error, arrayOfUsers) => {
        res.json(arrayOfUsers);
    });
});
app.get("/api/hello/", (req, res) => {
    res.json({ hello: "hello worldd" });
});
app.post("/api/vehicles", (req, res) => {
    // res.json({ test: "test" });
    // const { vehicle } = req.body;
    console.log(req.body);
    let newVehicle = new Vehicle({ brand: req.body.vehicle });
    newVehicle.save((err, vehicle) => {
        if (!err) {
            let responseObject = {};
            responseObject["brand"] = vehicle.brand;
            return res.json(responseObject);
        }
    });
});
app.get('/api/vehicles', (req, res) => {
    Vehicle.find({}, (err, vehicles) => {
        res.json(vehicles)
    })
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening on port " + port);
});
//
