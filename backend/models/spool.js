const mongoose = require("mongoose");

const spoolSchema = new mongoose.Schema({
    index: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    plasticType: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    dateOpened: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Spool", spoolSchema);

/*
    Plastiko tipas,
    Gamintojas,
    Svoris,
    Atidarymo data,
    spalva,
    id
*/
