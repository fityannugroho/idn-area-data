import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// You will write your Prisma Client queries here. For example:
// Get all provinces with count of regencies, districts, villages, and islands
const timeStart = performance.now();
const result = await prisma.$queryRaw`
  SELECT
    provinces.code AS province_code,
    provinces.name AS province_name,
    COUNT(DISTINCT regencies.code) AS regency_count,
    COUNT(DISTINCT districts.code) AS district_count,
    COUNT(DISTINCT villages.code) AS village_count,
    COUNT(DISTINCT islands.code) AS island_count
  FROM provinces
  LEFT JOIN regencies ON regencies.province_code = provinces.code
  LEFT JOIN districts ON districts.regency_code = regencies.code
  LEFT JOIN villages ON villages.district_code = districts.code
  LEFT JOIN islands ON islands.regency_code = regencies.code
  GROUP BY provinces.code
`;
const timeEnd = performance.now();

console.log(`Query executed in ${timeEnd - timeStart}ms`);
console.table(result);

await prisma.$disconnect();
