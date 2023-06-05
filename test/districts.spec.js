const IdnArea = require('../src');
const { isStrNumber } = require('../src/validator');

describe('districts data', () => {
  let districts = [];

  beforeAll(async () => {
    districts = await IdnArea.districts();
  });

  it('should be defined', () => {
    expect(districts).toBeDefined();
  });

  it('should have valid code (6 digits number)', () => {
    const ids = districts.map((district) => district.code);
    const validIds = ids.filter((id) => isStrNumber(id, 6));

    expect(ids).toEqual(validIds);
    expect(validIds.length).toBeGreaterThan(0);
  });

  it('should have unique code', () => {
    const ids = districts.map((district) => district.code);
    const uniqueIds = [...new Set(ids)];

    expect(ids).toEqual(uniqueIds);
  });

  it('should have valid regency code', async () => {
    const regencyCodes = (await IdnArea.regencies())
      .map((regency) => regency.code).sort();

    const uniqueDistrictRegencyCodes = [
      ...new Set(districts.map((district) => district.regency_code)),
    ].sort();

    expect(uniqueDistrictRegencyCodes).toEqual(regencyCodes);
  });
});
