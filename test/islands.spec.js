const IdnArea = require('../src');
const { isStrNumber, isValidCoordinate, isStrBoolean } = require('../src/validator');

describe('islands data', () => {
  let islands = [];

  beforeAll(async () => {
    islands = await IdnArea.islands();
  });

  it('should be defined', () => {
    expect(islands).toBeDefined();
  });

  it('should have valid island object', async () => {
    const regencyCodes = (await IdnArea.regencies()).map((regency) => regency.code);
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

  it('should have unique code', () => {
    const codes = islands.map((island) => island.code);
    const uniqueIds = [...new Set(codes)];

    expect(codes).toEqual(uniqueIds);
  });
});
