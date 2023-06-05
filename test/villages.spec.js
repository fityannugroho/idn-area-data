const IdnArea = require('../src');
const { isStrNumber } = require('../src/validator');

describe('villages data', () => {
  let villages = [];

  beforeAll(async () => {
    villages = await IdnArea.villages();
  });

  it('should be defined', () => {
    expect(villages).toBeDefined();
  });

  it('should have valid code (10 digits number)', () => {
    const ids = villages.map((village) => village.code);
    const validIds = ids.filter((id) => isStrNumber(id, 10));

    expect(ids).toEqual(validIds);
    expect(validIds.length).toBeGreaterThan(0);
  });

  it('should have unique code', () => {
    const ids = villages.map((village) => village.code);
    const uniqueIds = [...new Set(ids)];

    expect(ids).toEqual(uniqueIds);
  });

  it('should have valid district code', async () => {
    const districtCodes = (await IdnArea.districts())
      .map((district) => district.code).sort();

    const uniqueVillageDistrictCodes = [
      ...new Set(villages.map((village) => village.district_code)),
    ].sort();

    expect(uniqueVillageDistrictCodes).toEqual(districtCodes);
  });
});
