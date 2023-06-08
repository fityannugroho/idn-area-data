const { createReadStream } = require('fs');
const Papa = require('papaparse');

class CsvParser {
  /**
   * Create a new instance of CsvHelper.
   * @param {Papa.ParseLocalConfig} defaultConfig The default options
   */
  constructor(defaultConfig = {}) {
    this.defaultConfig = defaultConfig;
  }

  /**
   * Parse CSV file asynchronously.
   *
   * @param {string} path Path to the CSV file.
   * @param {Papa.ParseLocalConfig} config The configuration for the parser.
   */
  static parse(path, config = {}) {
    const sourceFile = createReadStream(path, config.encoding ?? 'utf8');

    return new Promise((resolve, reject) => {
      Papa.parse(sourceFile, {
        ...config,
        complete: resolve,
        error: reject,
      });
    });
  }

  /**
   * Parse CSV file asynchronously.
   *
   * @param {string} path Path to the CSV file.
   * @param {Papa.ParseLocalConfig} config The configuration for the parser.
   */
  async parse(path, config = {}) {
    return CsvParser.parse(path, {
      ...this.defaultConfig,
      ...config,
    });
  }
}

module.exports = CsvParser;
