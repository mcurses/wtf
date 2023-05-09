const express = require("express");
const app = express();
const port = process.env.PORT || 3003;

let halloechenCounter = 0;
const halloechenTimestamps = [];

app.use(express.json());

app.post("/halloechen", (req, res) => {
  const now = Date.now();
  halloechenCounter++;
  halloechenTimestamps.push(now);
  res.status(200).send({ message: "HALLOECHEN received" });
});

app.get("/halloechen-per-minute", (req, res) => {
  const oneMinuteAgo = Date.now() - 60 * 1000;

  // Remove outdated timestamps
  while (
    halloechenTimestamps.length > 0 &&
    halloechenTimestamps[0] < oneMinuteAgo
  ) {
    halloechenTimestamps.shift();
  }

  res.status(200).send({ halloechenPerMinute: halloechenTimestamps.length });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
