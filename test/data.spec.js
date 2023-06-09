const fs = require('fs');
const path = require('path');

/**
 * Validate the comma-separated CSV file.
 * @param {string} filePath The path to CSV file.
 * @param {object} options The options (required).
 * @param {string} options.tag The name tag (optional).
 * @param {string[]} options.header The header of data, the first row in CSV.
 * @param {RegExp} options.rowRegex The regex to test each rows.
 */
const validateCsvFile = (filePath, options) => {
  describe(`Validate CSV: ${options.tag ?? filePath}`, () => {
    const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    const header = data.shift();

    it('should have valid header', () => {
      expect(header.split(',')).toEqual(options.header);
    });

    it('should have valid rows format', () => {
      data.forEach((row) => {
        expect(row).toMatch(options.rowRegex);
      });
    });
  });
};

validateCsvFile(path.join(__dirname, '../data/provinces.csv'), {
  tag: 'provinces',
  header: ['code', 'name'],
  /* The regex is already tested in https://regex101.com/r/hw8PEP */
  rowRegex: /^(\d{2})(?!\s),(?!\s)((?!PROVINSI)[A-Z ]+)$/,
});

validateCsvFile(path.join(__dirname, '../data/regencies.csv'), {
  tag: 'regencies',
  header: ['code', 'province_code', 'name'],
  /* The regex is already tested in https://regex101.com/r/4iefT0 */
  rowRegex: /^(\d{4})(?!\s),(?!\s)(\d{2})(?!\s),(?!\s)((?:KABUPATEN|KOTA)[A-Z ]+)$/,
});

validateCsvFile(path.join(__dirname, '../data/districts.csv'), {
  tag: 'districts',
  header: ['code', 'regency_code', 'name'],
  /* The regex is already tested in https://regex101.com/r/cBkfxx */
  rowRegex: /^(\d{6})(?!\s),(?!\s)(\d{4})(?!\s),(?!\s)((?!')[A-Z0-9\-'./() ]+)$/,
});

validateCsvFile(path.join(__dirname, '../data/villages.csv'), {
  tag: 'villages',
  header: ['code', 'district_code', 'name'],
  /* The regex is already tested in https://regex101.com/r/7FKCem */
  rowRegex: /^(\d{10})(?!\s),(?!\s)(\d{6})(?!\s),(?!\s)((?!')[A-Z0-9\-'./() ]+)$/,
});

validateCsvFile(path.join(__dirname, '../data/islands.csv'), {
  tag: 'islands',
  header: [
    'code',
    'regency_code',
    'coordinate',
    'is_populated',
    'is_outermost_small',
    'name',
  ],
  /* The regex is already tested in https://regex101.com/r/NoRXu9 */
  rowRegex: /^(\d{4}4\d{4})(?!\s),(?!\s)(\d{4}|)(?!\s),(?!\s)((?:[0-8][0-9]|90)°(?:[0-5][0-9]|60)'(?:[0-5][0-9].[0-9]{2}|60.00)"\s[N|S]\s(?:0\d{2}|1(?:[0-7][0-9]|80))°(?:[0-5][0-9]|60)'(?:[0-5][0-9].[0-9]{2}|60.00)"\s[W|E])(?!\s),(?!\s)(0|1)(?!\s),(?!\s)(0|1)(?!\s),(?!\s)((?!')[a-zA-Z0-9\-'/ ]+)$/,
});
