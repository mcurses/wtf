const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

let meowCounter = 0;
const meowTimestamps = [];

app.use(express.json());

app.post('/meow', (req, res) => {
  const now = Date.now();
  meowCounter++;
  meowTimestamps.push(now);
  res.status(200).send({ message: 'meow received' });
});

app.get('/meow-per-minute', (req, res) => {
  const oneMinuteAgo = Date.now() - 60 * 1000;
  
  // Remove outdated timestamps
  while (meowTimestamps.length > 0 && meowTimestamps[0] < oneMinuteAgo) {
    meowTimestamps.shift();
  }

  res.status(200).send({ meowPerMinute: meowTimestamps.length });
  res.end("Test");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

