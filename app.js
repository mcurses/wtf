const express = require("express");
const app = express();
const port = process.env.PORT || 3003;

let miauCounter = 0;
const miauTimestamps = [];

app.use(express.json());

app.post("/miau", (req, res) => {
    const now = Date.now();
    miauCounter++;
    miauTimestamps.push(now);
    res.status(200).send({message: "maius received"});
});

app.get("/miau-per-minute", (req, res) => {
    const oneMinuteAgo = Date.now() - 60 * 1000;

    // Remove outdated timestamps
    while (miauTimestamps.length > 0 && miauTimestamps[0] < oneMinuteAgo) {
        miauTimestamps.shift();
    }

    res.status(200).send({miauPerMinute: miauTimestamps.length});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
