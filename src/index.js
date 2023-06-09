const { join } = require('path');
const CsvParser = require('./csv-parser');

/**
 * @type {Record<IdnArea.Areas, (header: string) => string>}
 */
const headerTransformer = {
  regencies: (header) => {
    switch (header) {
      case 'province_code':
        return 'provinceCode';
      default:
        return header;
    }
  },
  districts: (header) => {
    switch (header) {
      case 'regency_code':
        return 'regencyCode';
      default:
        return header;
    }
  },
  villages: (header) => {
    switch (header) {
      case 'district_code':
        return 'districtCode';
      default:
        return header;
    }
  },
  islands: (header) => {
    switch (header) {
      case 'regency_code':
        return 'regencyCode';
      case 'is_populated':
        return 'isPopulated';
      case 'is_outermost_small':
        return 'isOutermostSmall';
      default:
        return header;
    }
  },
};

/**
 * @type {Record<IdnArea.Areas, (value: string, header: string) => string>}
 */
const valueTransformer = {
  islands: (value, header) => {
    switch (header) {
      case headerTransformer.islands('is_populated'):
        return !!parseInt(value, 10);
      case headerTransformer.islands('is_outermost_small'):
        return !!parseInt(value, 10);
      default:
        return value;
    }
  },
};

/**
 * @type {IdnArea.Options}
 */
const defaultOptions = {
  transform: false,
};

async function getData(area, options = defaultOptions) {
  const { transform } = options;
  const filePath = join(__dirname, `../data/${area}.csv`);
  const result = await CsvParser.parse(filePath, {
    header: true,
    ...(transform && {
      transformHeader: (header) => headerTransformer[area]?.(header) ?? header,
      transform: (value, header) => valueTransformer[area]?.(value, header) ?? value,
    }),
  });

  return result.data;
}

function provinces() {
  return getData('provinces');
}

function regencies(options = {}) {
  return getData('regencies', options);
}

function districts(options = {}) {
  return getData('districts', options);
}

function villages(options = {}) {
  return getData('villages', options);
}

function islands(options = {}) {
  return getData('islands', options);
}

module.exports = {
  getData,
  provinces,
  regencies,
  districts,
  villages,
  islands,
};
