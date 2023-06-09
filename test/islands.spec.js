const IdnArea = require('../src');
const {
  isStrNumber, isValidCoordinate, isStrBoolean, isBoolean,
} = require('../src/validator');

describe('islands', () => {
  /**
   * @type {string[]}
   */
  let regencyCodes;

  beforeAll(async () => {
    regencyCodes = (await IdnArea.regencies()).map((regency) => regency.code);
  });

  describe('get all islands', () => {
    /**
     * @type {IdnArea.Island[]}
     */
    let islands;

    beforeAll(async () => {
      islands = await IdnArea.islands();
    });

    it('should be defined', () => {
      expect(islands).toBeDefined();
    });

    it('should equals with `getData()` method', async () => {
      expect(islands).toEqual(await IdnArea.getData('islands'));
    });

    it('should have valid island objects', async () => {
      const validIslands = islands.filter((island) => (
        isStrNumber(island.code, 9)
        && (!island.regency_code || (
          isStrNumber(island.regency_code, 4)
          && regencyCodes.includes(island.regency_code)
        ))
        && isValidCoordinate(island.coordinate)
        && isStrBoolean(island.is_populated)
        && isStrBoolean(island.is_outermost_small)
        && island.name
      ));

      expect(islands).toEqual(validIslands);
      expect(validIslands.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = islands.map((island) => island.code);
      const uniqueIds = [...new Set(codes)];

      expect(codes).toEqual(uniqueIds);
    });
  });

  describe('get all transformed islands', () => {
    /**
     * @type {IdnArea.IslandTransformed[]}
     */
    let islands;

    beforeAll(async () => {
      islands = await IdnArea.islands({ transform: true });
    });

    it('should be defined', () => {
      expect(islands).toBeDefined();
    });

    it('should equals with `getData()` method', async () => {
      expect(islands).toEqual(await IdnArea.getData('islands', { transform: true }));
    });

    it('should have valid transformed island objects', async () => {
      const validIslands = islands.filter((island) => (
        isStrNumber(island.code, 9)
        && (!island.regencyCode || (
          isStrNumber(island.regencyCode, 4)
          && regencyCodes.includes(island.regencyCode)
        ))
        && isValidCoordinate(island.coordinate)
        && isBoolean(island.isPopulated)
        && isBoolean(island.isOutermostSmall)
        && island.name
      ));

      expect(islands).toEqual(validIslands);
      expect(validIslands.length).toBeGreaterThan(0);
    });

    it('should have unique codes', () => {
      const codes = islands.map((island) => island.code);
      const uniqueIds = [...new Set(codes)];

      expect(codes).toEqual(uniqueIds);
    });
  });
});
