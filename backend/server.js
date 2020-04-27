require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

require("./database");

app.use(cors());

app.use(express.json());

const spoolsRouter = require("./routes/spools");
app.use("/api/spools", spoolsRouter);

const statsRouter = require("./routes/statistics");
app.use("/api/statistics", statsRouter);

const countersRouter = require("./routes/counters");
app.use("/api/counters", countersRouter);

app.use(express.static(path.join(__dirname, "../backend/client/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../backend/client/build"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server started"));
