const IdnArea = require('../src');
const { isStrNumber } = require('../src/validator');

describe('villages', () => {
  /**
   * @type {string[]}
   */
  let districtCodes;

  beforeAll(async () => {
    districtCodes = (await IdnArea.districts()).map((district) => district.code);
  });

  describe('get all villages', () => {
    /**
     * @type {IdnArea.Village[]}
     */
    let villages;

    beforeAll(async () => {
      villages = await IdnArea.villages();
    });

    it('should be defined', () => {
      expect(villages).toBeDefined();
    });

    it('should equals with `getData()` method', async () => {
      expect(villages).toEqual(await IdnArea.getData('villages'));
    });

    it('should have valid village objects', async () => {
      const validVillages = villages.filter((village) => (
        isStrNumber(village.code, 10)
        && districtCodes.includes(village.district_code)
        && village.name
      ));

      expect(villages).toEqual(validVillages);
      expect(validVillages.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = villages.map((village) => village.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes).toEqual(uniqueCodes);
    });
  });

  describe('get all transformed villages', () => {
    /**
     * @type {IdnArea.VillageTransformed[]}
     */
    let villages;

    beforeAll(async () => {
      villages = await IdnArea.villages({ transform: true });
    });

    it('should be defined', () => {
      expect(villages).toBeDefined();
    });

    it('should equals with `getData()` method', async () => {
      expect(villages).toEqual(await IdnArea.getData('villages', { transform: true }));
    });

    it('should have valid transformed village objects', async () => {
      const validVillages = villages.filter((village) => (
        isStrNumber(village.code, 10)
        && districtCodes.includes(village.districtCode)
        && village.name
      ));

      expect(villages).toEqual(validVillages);
      expect(validVillages.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = villages.map((village) => village.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes).toEqual(uniqueCodes);
    });
  });
});
