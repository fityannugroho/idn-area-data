import {
  getDistricts,
  getIslands,
  getProvinces,
  getRegencies,
  getVillages,
} from 'idn-area-data';
import { sql } from '../utils/db.js';

// Insert provinces
await sql`INSERT INTO provinces ${sql(await getProvinces())};`;

// Insert regencies
await sql`INSERT INTO regencies ${sql(await getRegencies({ transform: true }))};`;

// Insert districts
await sql`INSERT INTO districts ${sql(await getDistricts({ transform: true }))};`;

const BATCH_SIZE = 1000;

// Insert villages in batch
const villages = await getVillages({ transform: true });

for (let i = 0; i < villages.length; i += BATCH_SIZE) {
  const batch = villages.slice(i, i + BATCH_SIZE);
  await sql`INSERT INTO villages ${sql(batch)};`;
}

// Insert islands in batch
const islands = await getIslands({ transform: true });

for (let i = 0; i < islands.length; i += BATCH_SIZE) {
  const batch = islands.slice(i, i + BATCH_SIZE);
  await sql`INSERT INTO islands ${sql(batch)};`;
}

sql.end();
console.log('Seed completed');
