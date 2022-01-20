const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
{
    user: process.env.DB_USER,
    password: process.env.DB_PORT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
  });

module.exports = pool;
