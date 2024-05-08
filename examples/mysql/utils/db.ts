import mysql from 'mysql2/promise';
import env from './env.js';

/**
 * MySQL database pool
 */
export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});
