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
  /* The regex is already tested in https://regex101.com/r/NoRXu9/2 */
  rowRegex: /^(\d{4}4\d{4})(?!\s),(?!\s)(\d{4}|)(?!\s),(?!\s)((?:[0-8][0-9]|90)°(?:[0-5][0-9]|60)'(?:[0-5][0-9].[0-9]{2}|60.00)"\s[N|S]\s(?:0\d{2}|1(?:[0-7][0-9]|80))°(?:[0-5][0-9]|60)'(?:[0-5][0-9].[0-9]{2}|60.00)"\s[W|E])(?!\s),(?!\s)(0|1)(?!\s),(?!\s)(0|1)(?!\s),(?!\s)([^,"]+)$/,
});
