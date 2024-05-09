import { sql } from '../utils/db.js';

await sql`
  CREATE TABLE IF NOT EXISTS provinces (
    code VARCHAR(2),
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS regencies (
    code VARCHAR(5),
    province_code VARCHAR(2) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (province_code) REFERENCES provinces(code)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS districts (
    code VARCHAR(8),
    regency_code VARCHAR(5) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (regency_code) REFERENCES regencies(code)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS villages (
    code VARCHAR(13),
    district_code VARCHAR(8) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (district_code) REFERENCES districts(code)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS islands (
    code VARCHAR(11),
    regency_code VARCHAR(5) DEFAULT NULL,
    name VARCHAR(255) NOT NULL,
    coordinate VARCHAR(255) NOT NULL,
    is_outermost_small BOOLEAN NOT NULL,
    is_populated BOOLEAN NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (regency_code) REFERENCES regencies(code)
  )
`;

sql.end();
console.log('Migration completed');
