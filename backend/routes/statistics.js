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
        console.log(doc.manufacturers.findIndex(obj => obj.title === "bla"));
        res.status(200).json(doc);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post("/update", async (req, res) => {
    const oldDoc = await db
        .collection("statistics")
        .findOne({}, { sort: { _id: -1 } });

    const updatedDoc = {
        manufacturers: req.body.manufacturers
            ? [
                  ...oldDoc.manufacturers,
                  {
                      id: await getNextSequenceValue("manufacturers"),
                      title: req.body.manufacturers.title
                  }
              ]
            : [...oldDoc.manufacturers],
        plasticTypes: req.body.plasticTypes
            ? [
                  ...oldDoc.plasticTypes,
                  {
                      id: await getNextSequenceValue("plasticTypes"),
                      title: req.body.plasticTypes.title
                  }
              ]
            : [...oldDoc.plasticTypes],
        colors: req.body.colors
            ? [
                  ...oldDoc.colors,
                  {
                      id: await getNextSequenceValue("colors"),
                      title: req.body.colors.title
                  }
              ]
            : [...oldDoc.colors]
    };
    db.collection("statistics").insertOne(updatedDoc);
    res.status(200).json(updatedDoc);
});

const getNextSequenceValue = async sequenceName => {
    const query = { _id: sequenceName };
    const update = { $inc: { sequence_value: 1 } };
    const options = { returnNewDocument: true };

    const doc = await db
        .collection("counters")
        .findOneAndUpdate(query, update, options);

    return doc.value.sequence_value;
};

module.exports = router;
