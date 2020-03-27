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
        const docUpdate = {
            $set: {
                manufacturers: [...oldDoc.manufacturers, req.body.manufacturer]
            }
        };
        db.collection("statistics").updateOne({ _id: oldDoc._id }, docUpdate);
        res.status(200).json(docUpdate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
