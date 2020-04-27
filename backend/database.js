const mongoose = require("mongoose");
// const connection =
//     "mongodb+srv://3DCreative:zAFXRHsw10wIBabj@rms-53vfe.mongodb.net/rms-api?retryWrites=true&w=majority";
const connection = "mongodb://localhost/rms-api";
mongoose
    .connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));
