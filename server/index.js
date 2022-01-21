const express = require('express');
const router = require('./routes');
// const newrelic = require('newrelic');

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
