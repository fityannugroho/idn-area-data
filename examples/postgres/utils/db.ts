import postgres from 'postgres';
import env from './env.js';

/**
 * Postgres database
 */
export const sql = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  transform: postgres.fromCamel, // Convert camelCase property names to snake_case database column names
});
