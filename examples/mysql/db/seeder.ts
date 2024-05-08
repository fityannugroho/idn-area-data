import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
  getIslands,
} from 'idn-area-data';
import { pool } from '../utils/db.js';

await pool.query('INSERT INTO provinces (code, name) VALUES ?', [
  (await getProvinces()).map((province) => [province.code, province.name]),
]);

await pool.query('INSERT INTO regencies (code, province_code, name) VALUES ?', [
  (await getRegencies({ transform: true })).map((regency) => [
    regency.code,
    regency.provinceCode,
    regency.name,
  ]),
]);

await pool.query('INSERT INTO districts (code, regency_code, name) VALUES ?', [
  (await getDistricts({ transform: true })).map((district) => [
    district.code,
    district.regencyCode,
    district.name,
  ]),
]);

await pool.query('INSERT INTO villages (code, district_code, name) VALUES ?', [
  (await getVillages({ transform: true })).map((village) => [
    village.code,
    village.districtCode,
    village.name,
  ]),
]);

await pool.query(
  'INSERT INTO islands (code, regency_code, name, coordinate, is_outermost_small, is_populated) VALUES ?',
  [
    (await getIslands({ transform: true })).map((island) => [
      island.code,
      island.regencyCode,
      island.name,
      island.coordinate,
      island.isOutermostSmall,
      island.isPopulated,
    ]),
  ],
);

console.log('Seeding successful');
pool.end();
