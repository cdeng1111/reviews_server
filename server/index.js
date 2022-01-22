const express = require('express');
// const router = require('./routes');
// const newrelic = require('newrelic');
const controller = require('./controller');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());

// app.use('/', router);

app.get('/reviews', controller.getReviews);
app.get('/reviews/meta', controller.getMeta);
app.post('/reviews', controller.postReview);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
