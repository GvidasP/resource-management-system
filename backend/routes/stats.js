const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const db = mongoose.connection;

//Get all info about different values
router.get("/", async (req, res) => {
    try {
        db.collection("statistics").findOne(
            {},
            { sort: { _id: -1 } },
            (err, data) => {
                res.json(data);
            }
        );
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post("/update", async (req, res) => {
    const update = {
        manufacturers: req.body.manufacturers
    };
    // db.collection("statistics")
    //     .findOneAndUpdate(
    //         { sort: { _id: -1 } },
    //         { $set: update },
    //         {
    //             returnNewDocument: true
    //         }
    //     )
    //     .then(updatedDoc => console.log(updatedDoc))
    //     .catch(error => console.log(error));
    // res.status(200).json(data);
    db.collection("statistics").findOne(
        {},
        { sort: { _id: -1 } },
        (err, data) => {
            db.collection("statistics").insertOne();
        }
    );
});

module.exports = router;
