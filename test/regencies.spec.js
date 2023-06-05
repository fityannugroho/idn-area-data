const IdnArea = require('../src');
const { isStrNumber } = require('../src/validator');

describe('regencies data', () => {
  let regencies = [];

  beforeAll(async () => {
    regencies = await IdnArea.regencies();
  });

  it('should be defined', () => {
    expect(regencies).toBeDefined();
  });

  it('should have valid code (4 digits number)', () => {
    const ids = regencies.map((regency) => regency.code);
    const validIds = ids.filter((id) => isStrNumber(id, 4));

    expect(ids).toEqual(validIds);
    expect(validIds.length).toBeGreaterThan(0);
  });

  it('should have unique code', () => {
    const ids = regencies.map((regency) => regency.code);
    const uniqueIds = [...new Set(ids)];

    expect(ids).toEqual(uniqueIds);
  });

  it('should have valid province code', async () => {
    const provinceCodes = (await IdnArea.provinces())
      .map((province) => province.code).sort();

    const uniqueRegencyProvinceCodes = [
      ...new Set(regencies.map((regency) => regency.province_code)),
    ].sort();

    expect(uniqueRegencyProvinceCodes).toEqual(provinceCodes);
  });
});
