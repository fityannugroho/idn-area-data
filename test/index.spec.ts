import { beforeAll, describe, expect, test } from 'vitest';
import {
  getData,
  getDistricts,
  getIslands,
  getProvinces,
  getRegencies,
  getVillages,
  type IslandCsv,
} from '~/index.js';
import { buildMultiLevelPattern, buildRangeRegex } from './fixtures/utils.js';

describe('getProvinces', () => {
  const provinceCodeRegex = /^\d{2}$/;
  const provinceNameRegex =
    /^(?![Pp][Rr][Oo][Vv][Ii][Nn][Ss][Ii]\b)[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;

  test('return valid province objects', async () => {
    const provinces = await getProvinces();

    expect(provinces).toBeDefined();
    expect(provinces).not.toHaveLength(0);

    for (const province of provinces) {
      expect(province).toMatchObject({
        code: expect.stringMatching(provinceCodeRegex) as string,
        name: expect.stringMatching(provinceNameRegex) as string,
      });
    }
  });
});

describe('getRegencies', () => {
  const regencyCodeRegex = /^\d{2}\.\d{2}$/;
  const regencyNameRegex = /^(?:Kabupaten|Kota)(?: [A-Za-z]+(?:-[A-Za-z]+)*)+$/;

  describe('options.transform', () => {
    let provinceCodeRegex: RegExp;

    beforeAll(async () => {
      const provinceCodes = (await getProvinces()).map(
        (province) => province.code,
      );
      provinceCodeRegex = buildRangeRegex(provinceCodes);
    });

    test('options.transform: false', async () => {
      const regencies = await getRegencies({ transform: false });

      expect(regencies).toBeDefined();
      expect(regencies).not.toHaveLength(0);

      for (const regency of regencies) {
        expect(regency).toMatchObject({
          code: expect.stringMatching(regencyCodeRegex) as string,
          name: expect.stringMatching(regencyNameRegex) as string,
          province_code: expect.stringMatching(provinceCodeRegex) as string,
        });
      }
    });

    test('options.transform: true', async () => {
      const regencies = await getRegencies({ transform: true });

      expect(regencies).toBeDefined();
      expect(regencies).not.toHaveLength(0);

      for (const regency of regencies) {
        expect(regency).toMatchObject({
          code: expect.stringMatching(regencyCodeRegex) as string,
          name: expect.stringMatching(regencyNameRegex) as string,
          provinceCode: expect.stringMatching(provinceCodeRegex) as string,
        });
      }
    });

    test('default (false)', async () => {
      expect(await getRegencies()).toEqual(
        await getRegencies({ transform: false }),
      );
    });
  });
});

describe('getDistricts', () => {
  const districtCodeRegex = /^\d{2}\.\d{2}\.\d{2}$/;
  const districtNameRegex = /^[a-zA-Z0-9\-"'.\\/() ]+$/;

  describe('options.transform', () => {
    let regencyCodeRegex: RegExp;

    beforeAll(async () => {
      const regencyCodes = (await getRegencies()).map(
        (regency) => regency.code,
      );
      regencyCodeRegex = buildRangeRegex(regencyCodes);
    });

    test('options.transform: false', async () => {
      const districts = await getDistricts({ transform: false });

      expect(districts).toBeDefined();
      expect(districts).not.toHaveLength(0);

      for (const district of districts) {
        expect(district).toMatchObject({
          code: expect.stringMatching(districtCodeRegex) as string,
          name: expect.stringMatching(districtNameRegex) as string,
          regency_code: expect.stringMatching(regencyCodeRegex) as string,
        });
      }
    });

    test('options.transform: true', async () => {
      const districts = await getDistricts({ transform: true });

      expect(districts).toBeDefined();
      expect(districts).not.toHaveLength(0);

      for (const district of districts) {
        expect(district).toMatchObject({
          code: expect.stringMatching(districtCodeRegex) as string,
          name: expect.stringMatching(districtNameRegex) as string,
          regencyCode: expect.stringMatching(regencyCodeRegex) as string,
        });
      }
    });

    test('default (false)', async () => {
      expect(await getDistricts()).toEqual(
        await getDistricts({ transform: false }),
      );
    });
  });
});

describe('getIslands', () => {
  const islandCodeRegex = /^\d{2}\.\d{2}\.4\d{4}$/;
  const islandNameRegex = /^[a-zA-Z0-9\-'/’ ]+$/;
  /**
   * The regex is already tested in https://regex101.com/r/GQe8WT/4
   */
  const coordinateRegex =
    /^([0-8][0-9]|90)°([0-5][0-9])'([0-5][0-9]\.[0-9]{2})"\s(N|S)\s(0[0-9]{2}|1([0-7][0-9]|80))°([0-5][0-9])'([0-5][0-9]\.[0-9]{2})"\s(E|W)$/

  describe('options.transform', () => {
    let regencyCodeRegex: RegExp;
    beforeAll(async () => {
      const regencyCodes = (await getRegencies()).map(
        (regency) => regency.code,
      );
      regencyCodeRegex = new RegExp(
        `^(?:${buildMultiLevelPattern(regencyCodes)}|)$`,
      );
    });

    test('options.transform: false', async () => {
      const islands = await getIslands({ transform: false });

      expect(islands).toBeDefined();
      expect(islands).not.toHaveLength(0);

      for (const island of islands) {
        expect(island).toMatchObject({
          code: expect.stringMatching(islandCodeRegex) as string,
          coordinate: expect.stringMatching(coordinateRegex) as string,
          is_outermost_small: expect.stringMatching(
            /^(?:true|false|0|1)$/,
          ) as string,
          is_populated: expect.stringMatching(/^(?:true|false|0|1)$/) as string,
          name: expect.stringMatching(islandNameRegex) as string,
          regency_code: expect.stringMatching(regencyCodeRegex) as string,
        });
      }
    });

    test('options.transform: true', async () => {
      const islands = await getIslands({ transform: true });

      expect(islands).toBeDefined();
      expect(islands).not.toHaveLength(0);

      for (const island of islands) {
        expect(island).toMatchObject({
          code: expect.stringMatching(islandCodeRegex) as string,
          coordinate: expect.stringMatching(coordinateRegex) as string,
          isOutermostSmall: expect.any(Boolean) as boolean,
          isPopulated: expect.any(Boolean) as boolean,
          name: expect.stringMatching(islandNameRegex) as string,
          regencyCode:
            typeof island.regencyCode === 'string'
              ? (expect.stringMatching(regencyCodeRegex) as string)
              : null,
        });
      }
    });

    test('default (false)', async () => {
      expect(await getIslands()).toEqual(
        await getIslands({ transform: false }),
      );
    });
  });
});

describe('getVillages', () => {
  const villageCodeRegex = /^\d{2}\.\d{2}\.\d{2}\.\d{4}$/;
  const villageNameRegex = /^(?!^".*"$)[A-Za-z0-9\-'"’.*\\/(), ]+$/;

  describe('options.transform', () => {
    let districtCodeRegex: RegExp;

    beforeAll(async () => {
      const districtCodes = (await getDistricts()).map(
        (district) => district.code,
      );
      districtCodeRegex = buildRangeRegex(districtCodes);
    });

    test('options.transform: false', { timeout: 40_000 }, async () => {
      const villages = await getVillages({ transform: false });

      expect(villages).toBeDefined();
      expect(villages).not.toHaveLength(0);

      for (const village of villages) {
        expect(village).toMatchObject({
          code: expect.stringMatching(villageCodeRegex) as string,
          name: expect.stringMatching(villageNameRegex) as string,
          district_code: expect.stringMatching(districtCodeRegex) as string,
        });
      }
    });

    test('options.transform: true', { timeout: 40_000 }, async () => {
      const villages = await getVillages({ transform: true });

      expect(villages).toBeDefined();
      expect(villages).not.toHaveLength(0);

      for (const village of villages) {
        expect(village).toMatchObject({
          code: expect.stringMatching(villageCodeRegex) as string,
          name: expect.stringMatching(villageNameRegex) as string,
          districtCode: expect.stringMatching(districtCodeRegex) as string,
        });
      }
    });

    test('default (false)', async () => {
      expect(await getVillages()).toEqual(
        await getVillages({ transform: false }),
      );
    });
  });
});

describe('getData', () => {
  describe('options.transform', () => {
    test('Get data with custom header', async () => {
      type CustomIsland = Omit<IslandCsv, 'regency_code' | 'is_populated'> & {
        regencyCode: string;
        isPopulated: string;
      };

      const customIslands = await getData<CustomIsland>('islands', {
        transform: {
          headers: {
            regency_code: 'regencyCode',
            is_populated: 'isPopulated',
          },
        },
      });

      expect(customIslands).toBeDefined();
      expect(customIslands).not.toHaveLength(0);

      expect(customIslands[0]).toMatchObject({
        code: expect.any(String) as string,
        regencyCode: expect.any(String) as string,
        coordinate: expect.any(String) as string,
        isPopulated: expect.any(String) as string,
        is_outermost_small: expect.any(String) as string,
        name: expect.any(String) as string,
      });
    });

    test('Get data with custom values', async () => {
      type CustomIsland = IslandCsv & {
        is_populated: boolean;
        is_outermost_small: boolean;
      };

      const customIslands = await getData<CustomIsland>('islands', {
        transform: {
          values: {
            is_populated: (value) => !!Number.parseInt(value, 10),
            is_outermost_small: (value) => !!Number.parseInt(value, 10),
          },
        },
      });

      expect(customIslands).toBeDefined();
      expect(customIslands).not.toHaveLength(0);

      expect(customIslands[0]).toMatchObject({
        code: expect.any(String) as string,
        regency_code: expect.any(String) as string,
        coordinate: expect.any(String) as string,
        is_populated: expect.any(Boolean) as boolean,
        is_outermost_small: expect.any(Boolean) as boolean,
        name: expect.any(String) as string,
      });
    });

    test('Get data with custom headers and values', async () => {
      type CustomIsland = {
        kode: string;
        kodeKabKota: string;
        koordinat: string;
        berpenduduk: boolean;
        pulauTerluar: boolean;
        nama: string;
      };

      const customIslands = await getData<CustomIsland>('islands', {
        transform: {
          headers: {
            code: 'kode',
            regency_code: 'kodeKabKota',
            coordinate: 'koordinat',
            is_populated: 'berpenduduk',
            is_outermost_small: 'pulauTerluar',
            name: 'nama',
          },
          values: {
            is_populated: (value) => !!Number.parseInt(value, 10),
            is_outermost_small: (value) => !!Number.parseInt(value, 10),
          },
        },
      });

      expect(customIslands).toBeDefined();
      expect(customIslands).not.toHaveLength(0);

      expect(customIslands[0]).toMatchObject({
        kode: expect.any(String) as string,
        kodeKabKota: expect.any(String) as string,
        koordinat: expect.any(String) as string,
        berpenduduk: expect.any(Boolean) as boolean,
        pulauTerluar: expect.any(Boolean) as boolean,
        nama: expect.any(String) as string,
      });
    });
  });
});
