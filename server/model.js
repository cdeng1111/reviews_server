const pool = require('./db');

module.exports = {
  getAllReviews: async (product_id, count, page) => {
    const limit = count;
    const offset = (page === undefined || page <= 1) ? 0 : (page - 1) * count;
    const queryParams = [product_id, offset, limit];
    const queryString = `SELECT
         r.id,
         r.rating,
         r.summary,
         r.recommend,
         r.response,
         r.body,
         r.date,
         r.reviewer_name,
         r.helpfulness,
         (SELECT coalesce(json_agg(
                json_build_object(
                    'id', id,
                    'url', url
                    )), '[]'::json)
                AS Photos FROM photos WHERE r.id = review_id
          )
      FROM reviews r
      WHERE r.product_id = $1 OFFSET $2 LIMIT $3`;
    try {
      return await pool.query(queryString, queryParams);
    } catch (err) {
      return err;
    }
  },
  postReview: async (
    product_id,
    rating,
    summary,
    body,
    recommend,
    reviewer_name,
    reviewer_email,
    photos,
    characteristics,
  ) => {
    const queryStringForReviews = `
          INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email) VALUES($1, $2, (SELECT NOW()::timestamp), $3, $4, $5, false, $6, $7) RETURNING id AS review_id
          `;
    const queryParamsForReviews = [product_id, rating, summary, body,
      recommend, reviewer_name, reviewer_email];

    const queryStringForPhotos = `
          INSERT INTO photos(review_id, url) VALUES($1, $2)
          `;
    const queryStringForCharacteristics = `
          INSERT INTO characteristic_reviews(characteristic_id, review_id, value) VALUES($1, $2, $3)
          `;
    try {
      const review = await pool.query(queryStringForReviews, queryParamsForReviews);
      const review_id = review.rows[0].review_id;
      for (let i = 0; i < photos.length; i++) {
        await pool.query(queryStringForPhotos, [review_id, photos[i]]);
      }
      for (let key in characteristics) {
        await pool.query(queryStringForCharacteristics,[key, review_id, characteristics[key]]);
      }
      return review.rows[0];
    } catch (err) {
      return err;
    }
  },
  getMetaData: async (product_id) => {
    const queryParams = [product_id];
    const queryString = `
    SELECT json_build_object(
      'product_id', product_id,
       'ratings',
           (SELECT json_object_agg(rating,num_reviews)
              FROM (SELECT rating, count(*) as num_reviews from reviews
                  WHERE product_id = $1 GROUP BY rating) r),

       'recommended',
            (SELECT json_object_agg(recommend,num_reviews)
            FROM (SELECT recommend, count(*) as num_reviews FROM reviews
             WHERE product_id = $1 group by recommend) re),
      'characteristics',
             (SELECT json_object_agg
             ( name, json_build_object(
                    'id', id,
                    'value', value
                 ))
            FROM (
              SELECT  c.name,  c.id, sum(value)/count(*) as value
              FROM characteristics c
              LEFT JOIN characteristic_reviews cr
              ON c.id = cr.characteristic_id
              WHERE c.product_id = $1
              GROUP BY  c.name, c.id
                ) r
            )
     )
    FROM reviews
    WHERE product_id = $1 ;
    `;
    try {
      return await pool.query(queryString, queryParams);
    } catch (err) {
      return err;
    }
  },
};
