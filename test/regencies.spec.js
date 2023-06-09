const IdnArea = require('../src');
const { isStrNumber } = require('../src/validator');

describe('regencies', () => {
  /**
   * @type {string[]}
   */
  let provinceCodes = [];

  beforeAll(async () => {
    provinceCodes = (await IdnArea.provinces()).map((province) => province.code);
  });

  describe('get all regencies `regencies()`', () => {
    /**
     * @type {IdnArea.Regency[]}
     */
    let regencies;

    beforeAll(async () => {
      regencies = await IdnArea.regencies();
    });

    it('should be defined', () => {
      expect(regencies).toBeDefined();
    });

    it('should equals with `getData(\'regencies\')`', async () => {
      expect(regencies).toEqual(await IdnArea.getData('regencies'));
    });

    it('should have valid regency objects', async () => {
      const validRegencies = regencies.filter((regency) => (
        isStrNumber(regency.code, 4)
        && provinceCodes.includes(regency.province_code)
        && regency.name
      ));

      expect(regencies).toEqual(validRegencies);
      expect(validRegencies.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = regencies.map((regency) => regency.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes).toEqual(uniqueCodes);
    });
  });

  describe('get all transformed regencies `regencies(true)`', () => {
    /**
     * @type {IdnArea.RegencyTransformed[]}
     */
    let regencies;

    beforeAll(async () => {
      regencies = await IdnArea.regencies(true);
    });

    it('should be defined', () => {
      expect(regencies).toBeDefined();
    });

    it('should equals with `getData(\'regencies\', true)`', async () => {
      expect(regencies).toEqual(await IdnArea.getData('regencies', true));
    });

    it('should have valid transformed regency objects', async () => {
      const validRegencies = regencies.filter((regency) => (
        isStrNumber(regency.code, 4)
        && provinceCodes.includes(regency.provinceCode)
        && regency.name
      ));

      expect(regencies).toEqual(validRegencies);
      expect(validRegencies.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = regencies.map((regency) => regency.code);
      const uniqueCodes = [...new Set(codes)];

      expect(codes).toEqual(uniqueCodes);
    });
  });
});
