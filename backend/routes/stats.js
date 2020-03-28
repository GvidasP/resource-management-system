const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const db = mongoose.connection;

//Get all info about different values
router.get("/", async (req, res) => {
    try {
        const doc = await db
            .collection("statistics")
            .findOne({}, { sort: { _id: -1 } });
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post("/update", async (req, res) => {
    try {
        const oldDoc = await db
            .collection("statistics")
            .findOne({}, { sort: { _id: -1 } });

        const updatedDoc = {
            manufacturers: req.body.manufacturers
                ? [...oldDoc.manufacturers, req.body.manufacturers]
                : [...oldDoc.manufacturers],
            plasticTypes: req.body.plasticTypes
                ? [...oldDoc.plasticTypes, req.body.plasticTypes]
                : [...oldDoc.plasticTypes],
            colors: req.body.colors
                ? [...oldDoc.colors, req.body.colors]
                : [...oldDoc.colors]
        };
        db.collection("statistics").insertOne(updatedDoc);
        res.status(200).json(updatedDoc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
