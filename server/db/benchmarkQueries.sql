-- psql -d reviewsdb -f ./db/benchmarkQueries.sql
\timing
select r.*, p.id as photo_id, p.url from reviews r
left join photos p on r.id = p.review_id
where r.product_id = 63609;
-- Time: 739.447 ms

SELECT
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
      WHERE r.product_id = 63609 OFFSET 1 LIMIT 5
-- Time: 3109.744 ms

 SELECT json_build_object(
      'product_id', product_id,
       'ratings',
           (SELECT json_object_agg(rating,num_reviews)
              FROM (SELECT rating, count(*) as num_reviews from reviews
                  WHERE product_id = 63609 GROUP BY rating) r),

       'recommended',
            (SELECT json_object_agg(recommend,num_reviews)
            FROM (SELECT recommend, count(*) as num_reviews FROM reviews
             WHERE product_id = 63609 group by recommend) re),
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
              WHERE c.product_id = 63609
              GROUP BY  c.name, c.id
                ) r
            )
     )
    FROM reviews
    WHERE product_id = 63609;

