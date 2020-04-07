require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const spoolsRouter = require("./routes/spools");
app.use("/api/spools", spoolsRouter);

const statsRouter = require("./routes/statistics");
app.use("/api/statistics", statsRouter);

app.listen(8000, () => console.log("server started"));
