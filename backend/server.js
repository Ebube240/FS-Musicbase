const express = require("express");
const cors = require("cors");

const artistroute = require("./routes/artistsroute");
const albumroute = require("./routes/albumroute");
const songroute = require("./routes/songroute");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../frontend"));

app.use("/artists", artistroute);
app.use("/albums", albumroute);
app.use("/songs", songroute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});