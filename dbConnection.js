/* eslint-disable prettier/prettier */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RemarkDB',
  password: '141747',
  port: 5432,
});

module.exports = pool;
