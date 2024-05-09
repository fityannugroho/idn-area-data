import { pool } from '../utils/db.js';

// Create tables
await pool.query(`
  CREATE TABLE IF NOT EXISTS provinces (
    code VARCHAR(2),
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code)
  );
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS regencies (
    code VARCHAR(5),
    province_code VARCHAR(2) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (province_code) REFERENCES provinces(code)
  );
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS districts (
    code VARCHAR(8),
    regency_code VARCHAR(5) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (regency_code) REFERENCES regencies(code)
  );
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS villages (
    code VARCHAR(13),
    district_code VARCHAR(8) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (district_code) REFERENCES districts(code)
  );
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS islands (
    code VARCHAR(12),
    regency_code VARCHAR(5),
    name VARCHAR(255) NOT NULL,
    coordinate VARCHAR(255) NOT NULL,
    is_outermost_small BOOLEAN NOT NULL,
    is_populated BOOLEAN NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (regency_code) REFERENCES regencies(code)
  );
`);

console.log('Migration successful');
pool.end();
