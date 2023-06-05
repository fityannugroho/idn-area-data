const IdnArea = require('../src');
const { isStrNumber } = require('../src/validator');

describe('provinces data', () => {
  let provinces = [];

  beforeAll(async () => {
    provinces = await IdnArea.provinces();
  });

  it('should be defined', () => {
    expect(provinces).toBeDefined();
  });

  it('should have valid code (2 digits number)', () => {
    const ids = provinces.map((province) => province.code);
    const validIds = ids.filter((id) => isStrNumber(id, 2));

    expect(ids).toEqual(validIds);
    expect(validIds.length).toBeGreaterThan(0);
  });

  it('should have unique code', () => {
    const ids = provinces.map((province) => province.code);
    const uniqueIds = [...new Set(ids)];

    expect(ids).toEqual(uniqueIds);
  });
});
