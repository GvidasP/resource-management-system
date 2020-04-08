const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const db = mongoose.connection;

const Spool = require("../models/spool");

// Get all subscribers
router.get("/", async (req, res) => {
    try {
        const spools = await Spool.find();
        res.json(spools);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one subscriber
router.get("/:id", getSpool, (req, res) => {
    res.json(res.spool);
});

router.post("/add", async (req, res) => {
    console.log(req.body.length);
    Spool.insertMany(req.body)
        .then(() => {
            res.status(200).json(req.body);
            db.collection("counters").findOneAndUpdate(
                { _id: "spools" },
                { $inc: { sequence_value: req.body.length } }
            );
        })
        .catch((err) => res.status(400).json({ message: err }));
});

// Update one subscriber
router.patch("/:id", (req, res) => {});

// Delete one subscriber
router.delete("/:id", (req, res) => {});

async function getSpool(req, res, next) {
    try {
        spool = await Spool.findById(req.params.id);
        if (spool === null) {
            return res
                .status(404)
                .json({ message: "ERROR 404: Couldn't find spool" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.spool = spool;
    next();
}

const getNextSequenceValue = async (sequenceName) => {
    const query = { _id: sequenceName };
    const update = { $inc: { sequence_value: 1 } };
    const options = { returnNewDocument: true };

    const doc = await db
        .collection("counters")
        .findOneAndUpdate(query, update, options);

    return doc.value.sequence_value;
};

module.exports = router;
