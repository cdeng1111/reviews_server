
-- psql -d reviewsdb -f ./db/schema.sql

DROP DATABASE IF EXISTS reviewsdb;
CREATE DATABASE reviewsdb;
\c reviewsdb;

DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULl,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR NOT NULL,
  reviewer_email VARCHAR NOT NULL,
  response VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR NOT NULL
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NUll,
  name VARCHAR NOT NULL
);

CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics (id),
  review_id INT REFERENCES reviews (id),
  value INTEGER NOT NULL
);


\COPY reviews FROM '../sdc_data/reviews.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY photos FROM '../sdc_data/reviews_photos.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY characteristics FROM '../sdc_data/characteristics.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);
\COPY characteristic_reviews FROM '../sdc_data/characteristic_reviews.csv' WITH (FORMAT CSV, DELIMITER ',', HEADER);

ALTER TABLE reviews
  ALTER COLUMN date SET DATA TYPE timestamp without time zone
  USING timestamp without time zone 'epoch' + (date / 1000 ) * interval '1 second';

SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"reviews"', 'review_id')), (SELECT (MAX("review_id") + 1) FROM "reviews"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"photos"', 'id')), (SELECT (MAX("id") + 1) FROM "photos"), FALSE);
SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"characteristic_reviews"', 'id')), (SELECT (MAX("id") + 1) FROM "characteristic_reviews"), FALSE);

CREATE INDEX product_id_idx ON reviews (product_id);
CREATE INDEX rating_idx ON reviews (rating);
CREATE INDEX recommend_idx ON reviews (recommend);
CREATE INDEX review_id_characteristic_id_idx ON characteristic_reviews (review_id, characteristic_id);
CREATE INDEX characteristic_id_idx ON characteristic_reviews ( characteristic_id);
CREATE INDEX name_id_idx ON characteristics (name, id);
CREATE INDEX char_product_id_idx ON characteristics (product_id);
CREATE INDEX name_idx ON characteristics (name);