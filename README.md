# Ratings and Reviews API

This service is built to replaces the existing API with a backend system that can support the full data set for product ratings and reviews and can scale to meet the demands of production traffic.

Data was stored in a Postgres database. Data stored consisted of Reviews, Review Photos, and Reviews of specific product Characteristics.

The server was built using Node.js/Express.js, and primarily serves the following three endpoints: Getting product-specific reviews, getting metadata for product-specific reviews, and posting a new product review.

## Technlogies

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Frisby](https://docs.frisbyjs.com/)
- [k6](https://k6.io/stress-testing/)
- [Loader.io](https://loader.io/)
- [AWS EC2](https://aws.amazon.com/ec2/)
- [NGINX](https://nginx.org/en/)
- [New Relic](https://newrelic.com/)
