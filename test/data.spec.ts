import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

type Options = {
  /**
   * The header of data, the first row in CSV.
   */
  header: string[];
  /**
   * The regex to test each rows.
   */
  rowRegex: RegExp;
  /**
   * The name tag.
   */
  tag?: string;
};

/**
 * Validate the comma-separated CSV file.
 * @param filePath The path to CSV file.
 * @param options The options (required).
 */
function validateCsvFile(filePath: string, options: Options) {
  describe(`Validate CSV: ${options.tag ?? filePath}`, () => {
    const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
    const header = data.shift();

    it('should have valid header', () => {
      expect(header?.split(',')).toEqual(options.header);
    });

    it('should have valid rows format', () => {
      for (const row of data) {
        expect(row).toMatch(options.rowRegex);
      }
    });

    it('should have unique rows ID', () => {
      const rows = data.map((row) => row.split(',')[0]);
      const uniqueRows = [...new Set(rows)];

      expect(rows).toEqual(uniqueRows);
    });
  });
}

validateCsvFile(path.join(__dirname, '../data/provinces.csv'), {
  tag: 'provinces',
  header: ['code', 'name'],
  /* The regex is already tested in https://regex101.com/r/hw8PEP/7 */
  rowRegex: /^(\d{2}),(?!\s)((?!PROVINSI)[A-Z][A-Za-z ]+)$/,
});

validateCsvFile(path.join(__dirname, '../data/regencies.csv'), {
  tag: 'regencies',
  header: ['code', 'province_code', 'name'],
  /* The regex is already tested in https://regex101.com/r/4iefT0/5 */
  rowRegex:
    /^(\d{2}\.\d{2}),(\d{2}),(?:(?:KABUPATEN|KOTA)(?:\s[A-Z]+(?:-[A-Z]+)*)+|(?:Kabupaten|Kota)(?:\s[A-Za-z0-9\-'./()]+)+)$/,
});

validateCsvFile(path.join(__dirname, '../data/districts.csv'), {
  tag: 'districts',
  header: ['code', 'regency_code', 'name'],
  /* The regex is already tested in https://regex101.com/r/cBkfxx/5 */
  rowRegex:
    /^(\d{2}\.\d{2}\.\d{2}),(\d{2}\.\d{2}),(?:"(?:""|[A-Za-z0-9 \-'./(),])*"|(?!\s)(?!')[A-Za-z0-9 \-'./()]+)$/,
});

validateCsvFile(path.join(__dirname, '../data/villages.csv'), {
  tag: 'villages',
  header: ['code', 'district_code', 'name'],
  /* The regex is already tested in https://regex101.com/r/7FKCem/6 */
  rowRegex:
    /^(\d{2}\.\d{2}\.\d{2}\.\d{4}),(\d{2}\.\d{2}\.\d{2}),(?:"(?:""|[A-Za-z0-9 \-'’.*/(),])*"|(?!\s)(?!['"])[A-Za-z0-9 \-'’.*/()]+)$/,
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
  /* The regex is already tested in https://regex101.com/r/NoRXu9/8 */
  rowRegex:
    /^(\d{2}\.\d{2}\.4\d{4}),(\d{2}\.\d{2}|),((?:[0-8][0-9]|90)°(?:[0-5][0-9]|60)'(?:[0-5][0-9]\.[0-9]{2}|60\.00)"\s[N|S]\s(?:0\d{2}|1(?:[0-7][0-9]|80))°(?:[0-5][0-9]|60)'(?:[0-5][0-9]\.[0-9]{2}|60\.00)"\s[W|E]),(0|1),(0|1),(?!\s)((?!')[a-zA-Z0-9\-'/ ]+)$/,
});
