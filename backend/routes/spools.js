const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const PDFDocument = require("pdfkit");
const qr = require("qr-image");

const db = mongoose.connection;

const Spool = require("../models/spool");

router.get("/", async (req, res) => {
    try {
        const spools = await Spool.find();
        res.json(spools);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/exportpdf", async (req, res) => {
    try {
        const getDate = () => {
            const today = new Date();
            const offset = today.getTimezoneOffset();
            const fileName = new Date(today.getTime() + offset * 60 * 1000);
            return fileName.toISOString().split("T")[0];
        };
        const doc = new PDFDocument();
        let fileName = getDate();
        fileName = encodeURIComponent(fileName)
            .replace(/['()]/g, escape)
            .replace(/\*/g, "%2A")
            .replace(/%(?:7C|60|5E)/g, unescape);
        res.setHeader(
            "Content-disposition",
            'attachment; filename="' + fileName + '"'
        );
        res.setHeader("Content-type", "application/pdf");
        req.body
            ? req.body.map((spool) => {
                  const qrcode = qr.imageSync(spool.index, { type: "png" });
                  doc.image(qrcode, {
                      fit: [100, 100],
                      align: "left",
                      valign: "left",
                  }).text(spool.index);
              })
            : doc.text("");
        doc.end();
        doc.pipe(res);
    } catch (err) {
        console.error(err);
    }
});

router.post("/", async (req, res) => {
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

const getSpoolByIndex = async (req, res, next) => {
    Spool.find({ index: req.params.index })
        .then((spool) => {
            if (spool === null) {
                return res
                    .status(404)
                    .json({ message: "ERROR 404: Couldn't find spool" });
            }
            res.spool = spool;
            next();
        })
        .catch((err) => res.status(500).json({ message: err }));
};

router.get("/:index", getSpoolByIndex, (req, res) => {
    res.json(res.spool);
});

module.exports = router;
