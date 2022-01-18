
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
