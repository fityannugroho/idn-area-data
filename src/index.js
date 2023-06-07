const { join } = require('path');
const CsvParser = require('./csv-parser');

async function getData(area) {
  const filePath = join(__dirname, `../data/${area}.csv`);
  const result = await CsvParser.parse(filePath, {
    header: true,
  });

  return result.data;
}

function provinces() {
  return getData('provinces');
}

function regencies() {
  return getData('regencies');
}

function districts() {
  return getData('districts');
}

function villages() {
  return getData('villages');
}

module.exports = {
  getData,
  provinces,
  regencies,
  districts,
  villages,
};
