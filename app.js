const express = require("express");
const app = express();
const port = process.env.PORT || 3003;

let wtfCounter = 0;
const wtfTimestamps = [];
let wowCounter = 0;
const wowTimestamps = [];

app.use(express.json());

app.post("/wtf", (req, res) => {
  const now = Date.now();
  wtfCounter++;
  wtfTimestamps.push(now);
  res.status(200).send({ message: "WTF received help" });
});

app.get("/wtf-per-minute", (req, res) => {
  const oneMinuteAgo = Date.now() - 60 * 1000;

  // Remove outdated timestamps
  while (wtfTimestamps.length > 0 && wtfTimestamps[0] < oneMinuteAgo) {
    wtfTimestamps.shift();
  }

  res.status(200).send({ wtfPerMinute: wtfTimestamps.length });
});

app.post("/wow", (req, res) => {
  const now = Date.now();
  wowCounter++;
  wowTimestamps.push(now);
  res.status(200).send({ message: "WOW received" });
});

app.get("/wow-per-minute", (req, res) => {
  const oneMinuteAgo = Date.now() - 60 * 1000;

  // Remove outdated timestamps
  while (wowTimestamps.length > 0 && wowTimestamps[0] < oneMinuteAgo) {
    wowTimestamps.shift();
  }

  res.status(200).send({ wowPerMinute: wowTimestamps.length });
});

app.delete("/delete-all", (req, res) => {
  wtfCounter = 0;
  wowCounter = 0;
  wowTimestamps.length = 0;
  wtfTimestamps.lengt = 0;

  res.status(200).send({ message: "Everything gone" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
