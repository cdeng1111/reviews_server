const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

//middleware
app.use(express.json());


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
