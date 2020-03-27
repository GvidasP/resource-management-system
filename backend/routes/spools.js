const express = require("express");
const router = express.Router();

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

var cb0 = function(req, res, next) {
    console.log("CB0");
    next();
};

var cb1 = function(req, res, next) {
    console.log("CB1");
    next();
};

router.get(
    "/example/d",
    [cb0, cb1],
    function(req, res, next) {
        console.log("the response will be sent by the next function ...");
        next();
    },
    function(req, res) {
        res.send("Hello from D!");
    }
);

// router.get("/:field", async (req, res) => {
//     try {
//         const values = await Spool.find().distinct(
//             req.params.field,
//             (error, ids) => {
//                 console.log(ids);
//             }
//         );
//         res.json(values);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Get one subscriber
router.get("/:id", getSpool, (req, res) => {
    res.json(res.spool);
});

// Create one subscriber
router.post("/add", async (req, res) => {
    const spool = new Spool({
        customId: req.body.customId,
        manufacturer: req.body.manufacturer,
        plasticType: req.body.plasticType,
        weight: req.body.weight,
        color: req.body.color,
        dateOpened: req.body.dateOpened
    });
    try {
        const newSpool = await spool.save();
        res.status(200).json(newSpool);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
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

module.exports = router;
