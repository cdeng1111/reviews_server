const model = require('./model');

module.exports = {
  getReviews: (req, res) => {
    const { count, page, product_id } = req.query;
    const count1 = count || 5;
    const page1 = page || 1;
    model.getAllReviews(product_id, count1, page1)
      .then((results) => {
        res.json({
          product: product_id,
          page: page1,
          count: count1,
          results: results.rows,
        });
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  postReview: (req, res) => {
    const {
      product_id, rating, summary, body, recommend,
      reviewer_name, reviewer_email, photos, characteristics,
    } = req.body;

    model.postReview(
      product_id,
      rating,
      summary,
      body,
      recommend,
      reviewer_name,
      reviewer_email,
      photos,
      characteristics,
    )
      .then(() => {
        res.status(201).send('A review has been added.');
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  getMeta: (req, res) => {
    const { product_id } = req.query;
    model.getMetaData(product_id)
      .then((results) => {
        res.status(201).send(results.rows[0].json_build_object);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
};
