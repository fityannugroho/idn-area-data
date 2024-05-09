import { PrismaClient } from '@prisma/client';
import {
  getDistricts,
  getIslands,
  getProvinces,
  getRegencies,
  getVillages,
} from 'idn-area-data';

const prisma = new PrismaClient();

await prisma.province.createMany({
  data: await getProvinces(),
});

await prisma.regency.createMany({
  data: await getRegencies({ transform: true }),
});

await prisma.district.createMany({
  data: await getDistricts({ transform: true }),
});

await prisma.village.createMany({
  data: await getVillages({ transform: true }),
});

await prisma.island.createMany({
  data: await getIslands({ transform: true }),
});

await prisma.$disconnect();
