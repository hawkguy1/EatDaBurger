var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", (req, res) => {
    burger.selectAll((data) => {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", (req, res) => {
    burger.insertOne([
        "burger_name",
        "devoured"
    ], [
            req.body.name, 0
        ], (result) => {
            res.json({ id: result.insertId });
        });
});

router.put("/api/burgers/:id", (req, res) => {
    var condition = `id= ${req.params.id}`;
    console.log("devoured", condition);
    burger.updateOne({
        devoured: 1
    }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;