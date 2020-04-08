const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const db = mongoose.connection;

router.get("/spools", async (req, res) => {
    const doc = await db
        .collection("counters")
        .findOne({ _id: "spools" }, {})
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
