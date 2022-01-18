const { Pool } = require('pg');
const user = require('../../env/config');

const pool = new Pool(user);

module.exports = pool;
