import {
  beforeAll, describe, expect, test,
} from 'vitest';
import {
  IslandCsv, getData, getDistricts, getIslands, getProvinces, getRegencies, getVillages,
} from '~/index.js';

describe('getProvinces', () => {
  test('return valid province objects', async () => {
    const provinces = await getProvinces();

    expect(provinces).toBeDefined();
    expect(provinces).not.toHaveLength(0);

    provinces.forEach((province) => {
      expect(province).toMatchObject({
        code: expect.stringMatching(/^\d{2}$/) as string,
        name: expect.stringMatching(/^(?!\s)(?!PROVINSI)[A-Z ]+$/) as string,
      });
    });
  });
});

describe('getRegencies', () => {
  describe('options.transform', () => {
    let provinceCodeRegex: RegExp;

    beforeAll(async () => {
      const provinceCodes = (await getProvinces()).map((province) => province.code);
      provinceCodeRegex = new RegExp(`^(?:${provinceCodes.join('|')})$`);
    });

    test('options.transform: false', async () => {
      const regencies = await getRegencies({ transform: false });

      expect(regencies).toBeDefined();
      expect(regencies).not.toHaveLength(0);

      regencies.forEach((regency) => {
        expect(regency).toMatchObject({
          code: expect.stringMatching(/^\d{4}$/) as string,
          name: expect.stringMatching(/^(?:KABUPATEN|KOTA)[A-Z ]+$/) as string,
          province_code: expect.stringMatching(provinceCodeRegex) as string,
        });
      });
    });

    test('options.transform: true', async () => {
      const regencies = await getRegencies({ transform: true });

      expect(regencies).toBeDefined();
      expect(regencies).not.toHaveLength(0);

      regencies.forEach((regency) => {
        expect(regency).toMatchObject({
          code: expect.stringMatching(/^\d{4}$/) as string,
          name: expect.stringMatching(/^(?:KABUPATEN|KOTA)[A-Z ]+$/) as string,
          provinceCode: expect.stringMatching(provinceCodeRegex) as string,
        });
      });
    });

    test('default (false)', async () => {
      expect(await getRegencies()).toEqual(await getRegencies({ transform: false }));
    });
  });
});

describe('getDistricts', () => {
  describe('options.transform', () => {
    let regencyCodeRegex: RegExp;

    beforeAll(async () => {
      const regencyCodes = (await getRegencies()).map((regency) => regency.code);
      regencyCodeRegex = new RegExp(`^(?:${regencyCodes.join('|')})$`);
    });

    test('options.transform: false', async () => {
      const districts = await getDistricts({ transform: false });

      expect(districts).toBeDefined();
      expect(districts).not.toHaveLength(0);

      districts.forEach((district) => {
        expect(district).toMatchObject({
          code: expect.stringMatching(/^\d{2}\.\d{2}\.\d{2}$/) as string,
          name: expect.stringMatching(/^[a-zA-Z0-9\-'.\\/() ]+$/) as string,
          regency_code: expect.stringMatching(regencyCodeRegex) as string,
        });
      });
    });

    test('options.transform: true', async () => {
      const districts = await getDistricts({ transform: true });

      expect(districts).toBeDefined();
      expect(districts).not.toHaveLength(0);

      districts.forEach((district) => {
        expect(district).toMatchObject({
          code: expect.stringMatching(/^\d{2}\.\d{2}\.\d{2}$/) as string,
          name: expect.stringMatching(/^[a-zA-Z0-9\-'.\\/() ]+$/) as string,
          regencyCode: expect.stringMatching(regencyCodeRegex) as string,
        });
      });
    });

    test('default (false)', async () => {
      expect(await getDistricts()).toEqual(await getDistricts({ transform: false }));
    });
  });
});

describe('getIslands', () => {
  describe('options.transform', () => {
    /**
     * The regex is already tested in https://regex101.com/r/GQe8WT
     */
    const coordinateRegex = /^([0-8][0-9]|90)°([0-5][0-9]|60)'(([0-5][0-9].[0-9]{2})|60.00)"\s(N|S)\s(0\d{2}|1([0-7][0-9]|80))°([0-5][0-9]|60)'(([0-5][0-9].[0-9]{2})|60.00)"\s(E|W)$/;
    let regencyCodeRegex: RegExp;

    beforeAll(async () => {
      const regencyCodes = (await getRegencies()).map((regency) => regency.code);
      regencyCodeRegex = new RegExp(`^(?:${regencyCodes.join('|')}|)$`);
    });

    test('options.transform: false', async () => {
      const islands = await getIslands({ transform: false });

      expect(islands).toBeDefined();
      expect(islands).not.toHaveLength(0);

      islands.forEach((island) => {
        expect(island).toMatchObject({
          code: expect.stringMatching(/^\d{9}$/) as string,
          coordinate: expect.stringMatching(coordinateRegex) as string,
          is_outermost_small: expect.stringMatching(/^(?:true|false|0|1)$/) as string,
          is_populated: expect.stringMatching(/^(?:true|false|0|1)$/) as string,
          name: expect.stringMatching(/^[a-zA-Z0-9\-'/ ]+$/) as string,
          regency_code: expect.stringMatching(regencyCodeRegex) as string,
        });
      });
    });

    test('options.transform: true', async () => {
      const islands = await getIslands({ transform: true });

      expect(islands).toBeDefined();
      expect(islands).not.toHaveLength(0);

      islands.forEach((island) => {
        expect(island).toMatchObject({
          code: expect.stringMatching(/^\d{9}$/) as string,
          coordinate: expect.stringMatching(coordinateRegex) as string,
          isOutermostSmall: expect.any(Boolean) as boolean,
          isPopulated: expect.any(Boolean) as boolean,
          name: expect.stringMatching(/^[a-zA-Z0-9\-'/ ]+$/) as string,
          regencyCode: typeof island.regencyCode === 'string'
            ? expect.stringMatching(regencyCodeRegex) as string
            : null,
        });
      });
    });

    test('default (false)', async () => {
      expect(await getIslands()).toEqual(await getIslands({ transform: false }));
    });
  });
});

describe('getVillages', () => {
  describe('options.transform', () => {
    let districtCodeRegex: RegExp;

    beforeAll(async () => {
      const districtCodes = (await getDistricts()).map((district) => district.code);
      districtCodeRegex = new RegExp(`^(?:${districtCodes.join('|')})$`);
    });

    test('options.transform: false', async () => {
      const villages = await getVillages({ transform: false });

      expect(villages).toBeDefined();
      expect(villages).not.toHaveLength(0);

      villages.forEach((village) => {
        expect(village).toMatchObject({
          code: expect.stringMatching(/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/) as string,
          name: expect.stringMatching(/^[a-zA-Z0-9\-'"’.*\\/() ]+$/) as string,
          district_code: expect.stringMatching(districtCodeRegex) as string,
        });
      });
    });

    test('options.transform: true', async () => {
      const villages = await getVillages({ transform: true });

      expect(villages).toBeDefined();
      expect(villages).not.toHaveLength(0);

      villages.forEach((village) => {
        expect(village).toMatchObject({
          code: expect.stringMatching(/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/) as string,
          name: expect.stringMatching(/^[a-zA-Z0-9\-'"’.*\\/() ]+$/) as string,
          districtCode: expect.stringMatching(districtCodeRegex) as string,
        });
      });
    });

    test('default (false)', async () => {
      expect(await getVillages()).toEqual(await getVillages({ transform: false }));
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
            is_populated: (value) => !!parseInt(value, 10),
            is_outermost_small: (value) => !!parseInt(value, 10),
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
            is_populated: (value) => !!parseInt(value, 10),
            is_outermost_small: (value) => !!parseInt(value, 10),
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
