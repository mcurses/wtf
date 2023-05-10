const express = require("express");
const app = express();
const port = 3000;

let wtfCounter = 0;
let wtfTimestamps = [];

app.use(express.json());

app.post("/wtf", (req, res) => {
  const now = Date.now();
  wtfCounter++;
  wtfTimestamps.push(now);
  res.status(200).send({ message: "WTF received" });
});

app.get("/wtf", (req, res) => {
  res.status(200).send({ message: `Total WTFs: ${wtfCounter}` });
});

app.get("/wtf-per-minute", (req, res) => {
  const oneMinuteAgo = Date.now() - 60 * 1000;

  // Remove outdated timestamps
  while (wtfTimestamps.length > 0 && wtfTimestamps[0] < oneMinuteAgo) {
    wtfTimestamps.shift();
  }

  res.status(200).send({ wtfPerMinute: wtfTimestamps.length });
});

app.post("/reset", (req, res) => {
  wtfCounter = 0;
  wtfTimestamps = [];
  res.status(200).send({ message: "wtfs have been resettet" });
});

app.post("/undo", (req, res) => {
  if (wtfCounter > 0) {
    wtfCounter--;
    wtfTimestamps.pop();
    res
      .status(200)
      .send({ message: "We all do errors. Your WTF is no longer there" });
  } else {
    res.status(400).send({ message: "No WTF to undo" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
