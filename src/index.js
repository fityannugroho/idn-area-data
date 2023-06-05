const { join } = require('path');
const CsvParser = require('./csv-parser');

class IdnArea {
  /**
   * Get data from source.
   *
   * @param {'provinces' | 'regencies' | 'districts' | 'villages'} area
   * @returns Array of data.
   */
  static async getData(area) {
    const filePath = join(__dirname, `../data/${area}.csv`);
    const result = await CsvParser.parse(filePath, {
      header: true,
    });

    return result.data;
  }

  static provinces() {
    return IdnArea.getData('provinces');
  }

  static regencies() {
    return IdnArea.getData('regencies');
  }

  static districts() {
    return IdnArea.getData('districts');
  }

  static villages() {
    return IdnArea.getData('villages');
  }
}

module.exports = IdnArea;
