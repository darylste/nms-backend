const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/events.json`));

app.get('/api/v1/events', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

app.post('/api/v1/events', (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      event: req.body,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('App running on port: 3000');
});
