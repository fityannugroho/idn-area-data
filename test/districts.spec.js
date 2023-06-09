const IdnArea = require('../src');
const { isStrNumber } = require('../src/validator');

describe('districts', () => {
  /**
   * @type {string[]}
   */
  let regencyCodes;

  beforeAll(async () => {
    regencyCodes = (await IdnArea.regencies()).map((regency) => regency.code);
  });

  describe('get all districts `districts()`', () => {
    /**
     * @type {IdnArea.District[]}
     */
    let districts;

    beforeAll(async () => {
      districts = await IdnArea.districts();
    });

    it('should be defined', () => {
      expect(districts).toBeDefined();
    });

    it('should equals with `getData(\'districts\')`', async () => {
      expect(districts).toEqual(await IdnArea.getData('districts'));
    });

    it('should have valid district objects', async () => {
      const validDistricts = districts.filter((district) => (
        isStrNumber(district.code, 6)
        && regencyCodes.includes(district.regency_code)
        && district.name
      ));

      expect(districts).toEqual(validDistricts);
      expect(validDistricts.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = districts.map((district) => district.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes).toEqual(uniqueCodes);
    });
  });

  describe('get all transformed districts `districts(true)`', () => {
    /**
     * @type {IdnArea.DistrictTransformed[]}
     */
    let districts;

    beforeAll(async () => {
      districts = await IdnArea.districts(true);
    });

    it('should be defined', () => {
      expect(districts).toBeDefined();
    });

    it('should equals with `getData(\'districts\', true)`', async () => {
      expect(districts).toEqual(await IdnArea.getData('districts', true));
    });

    it('should have valid transformed district objects', async () => {
      const validDistricts = districts.filter((district) => (
        isStrNumber(district.code, 6)
        && regencyCodes.includes(district.regencyCode)
        && district.name
      ));

      expect(districts).toEqual(validDistricts);
      expect(validDistricts.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = districts.map((district) => district.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes).toEqual(uniqueCodes);
    });
  });
});
