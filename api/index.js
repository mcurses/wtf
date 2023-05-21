// Reference: https://vercel.com/guides/using-express-with-vercel

const app = require("express")();
const { v4 } = require("uuid");

let meowCounter = 0;
const meowTimestamps = [];

app.post("/api/meow", (req, res) => {
  const now = Date.now();
  meowCounter++;
  meowTimestamps,push(now);
  res.status(200).send({ message: "Mewo received"});
});

app.get("/api/meow-per-minute", (req, res) => {
  const oneMinuteAgo = Date.now() - 60 * 1000;

  //Remove outdated timestamps
  while (meowTimestamps.length > 0 && meowTimestamps[0] < oneMinuteAgo) {
    meowTimestamps.shift();
  }

  res.status(200).send({ meowPerMinute: meowTimestamps.length}); 
});