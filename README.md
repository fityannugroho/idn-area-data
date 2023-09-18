<h1 align="">Indonesian Area Data (<i>Data Wilayah Indonesia</i>)</h1>

[![npm version](https://img.shields.io/npm/v/idn-area-data.svg)](https://www.npmjs.com/package/idn-area-data)
[![npm downloads](https://img.shields.io/npm/dm/idn-area-data.svg)](https://www.npmjs.com/package/idn-area-data)
[![GitHub license](https://img.shields.io/github/license/fityannugroho/idn-area-data.svg)](LICENSE)

Provides the administrative areas data of Indonesia, from the province, regency, district, to village levels based on the latest official sources. It also provides island data since version 1.3.0, and the **new PAPUA provinces data** since version 2.0.0.

> [!WARNING]
> Since version 3.0.0, **idn-area-data** is published as ECMAScript Module (ESM).

<h2>Table of Contents</h2>

- [Prerequisite](#prerequisite)
- [Upgrading](#upgrading)
- [Installation](#installation)
- [Usage](#usage)
  - [ESM](#esm)
  - [CommonJS](#commonjs)
- [Methods](#methods)
  - [`getProvinces()`](#getprovinces)
  - [`getRegencies(?options)`](#getregenciesoptions)
  - [`getDistricts(?options)`](#getdistrictsoptions)
  - [`getVillages(?options)`](#getvillagesoptions)
  - [`getIslands(?options)`](#getislandsoptions)
  - [`getData(area, ?options)`](#getdataarea-options)
- [Try it now](#try-it-now)
- [Motivation](#motivation)
- [Data](#data)
- [Problem Reporting](#problem-reporting)
  - [Reporting a Bug](#reporting-a-bug)
  - [Requesting a New Feature](#requesting-a-new-feature)
  - [Asking a Question](#asking-a-question)
- [License](#license)

---

## Prerequisite

- [Node.js](https://nodejs.org) (version 18 or higher)
- [npm 9](https://www.npmjs.com) or [yarn](https://yarnpkg.com)

## Upgrading

If you are upgrading from version 2 to version 3, please read the [upgrade guide](docs/upgrading/upgrade-to-v3.md).

## Installation

```bash
npm install --save idn-area-data
```

Use this for **yarn** user :

```bash
yarn add idn-area-data
```

## Usage

Import the package into your project as shown below.

> [!NOTE]
> The following code examples use [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) to run the asynchronous function. You also can use the [Promise `.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) instead.

### ESM

Import specific function only :

```js
import { getProvinces } from 'idn-area-data';

(async () => {
  const provinces = await getProvinces();
})();
```

Import the entire module :

```js
import * as IdnArea from 'idn-area-data';

(async () => {
  const provinces = await IdnArea.getProvinces();
})();
```

### CommonJS

Since version 3.0.0, **idn-area-data** is published as ECMAScript Module (ESM). So that, for CommonJS user, you need to import it using [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) like this :

```js
(async () => {
  const {getProvinces} = await import('idn-area-data');
  const provinces = await getProvinces();
})();
```

Then, you can get the data you need using these methods below.

## Methods

### `getProvinces()`

Asynchronous function to get all provinces data.

```js
import { getProvinces } from 'idn-area-data';

(async () => {
  const provinces = await getProvinces();
  console.log(provinces);
})();

/*
[
  {
    code: '11',
    name: 'ACEH',
  },
  ...
]
*/
```

### `getRegencies(?options)`

Asynchronous function to get all regencies data

```js
import { getRegencies } from 'idn-area-data';

(async () => {
  const regencies = await getRegencies();
  console.log(regencies);
})();

/*
[
  {
    code: '11.01',
    name: 'KABUPATEN ACEH SELATAN',
    province_code: '11',
  },
  ...
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`**.

```js
const regencies = await getRegencies({ transform: true });
/*
[
  {
    code: '11.01',
    name: 'KABUPATEN ACEH SELATAN',
    provinceCode: '11',
  },
  ...
]
*/
```

### `getDistricts(?options)`

Asynchronous function to get all districts data.

```js
import { getDistricts } from 'idn-area-data';

(async () => {
  const districts = await getDistricts();
  console.log(districts);
})();

/*
[
  {
    code: '11.01.01',
    name: 'Bakongan',
    regency_code: '11.01',
  },
  ...
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`**.

```js
const districts = await getDistricts({ transform: true });
/*
[
  {
    code: '11.01.01',
    name: 'Bakongan',
    regencyCode: '11.01',
  },
  ...
]
*/
```

### `getVillages(?options)`

Asynchronous function to get all villages data.

```js
import { getVillages } from 'idn-area-data';

(async () => {
  const villages = await getVillages();
  console.log(villages);
})();

/*
[
  {
    code: '11.01.01.2001',
    district_code: '11.01.01',
    name: 'Keude Bakongan',
  },
  ...
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`**.

```js
const villages = await getVillages({ transform: true });
/*
[
  {
    code: '11.01.01.2001',
    districtCode: '11.01.01',
    name: 'Keude Bakongan',
  },
  ...
]
*/
```

### `getIslands(?options)`

Asynchronous function to get all islands data.

```js
import { getIslands } from 'idn-area-data';

(async () => {
  const islands = await getIslands();
  console.log(islands);
})();

/*
[
  {
    code: '11.01.40001',
    coordinate: '03°19'03.44" N 097°07'41.73" E',
    name: 'Pulau Batukapal',
    is_outermost_small: '0',
    is_populated: '0',
    regency_code: '11.01',
  },
  ...
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`** and the data type will be converted (for `boolean` and `number`).

> [!IMPORTANT]
> The `regencyCode` will be **`null`** if the island doesn't belong to any regency and the `transform` option is enabled.

```js
const islands = await getIslands({ transform: true });
/*
[
  {
    code: '11.01.40001',
    coordinate: '03°19'03.44" N 097°07'41.73" E',
    name: 'Pulau Batukapal',
    isOutermostSmall: false,
    isPopulated: false,
    regencyCode: '11.01', <-- It will be `null` if the island doesn't belong to any regency
  },
  ...
]
*/
```

### `getData(area, ?options)`

If you need to **customize the attribute names or values of the data** yourself, you can use this asyncronous function and provide the data transformer configuration in `options.transform`.

To customize the attribute names, define the pair between the old attribute and the new attribute in `options.transform.headers`. The old attributes is equals to the CSV headers of each [data](#data).

To customize the attribute values, set the value transformer functions in `options.transform.values`.

See the example below :

```ts
// .ts
import { getData } from 'idn-area-data';

// Define the custom type of the data
type Provinsi = {
  kode: number;
  nama: string;
};

// Get the data
(async () => {
  const data = await getData<Provinsi>('provinces', {
    transform: {
      headers: {
        code: 'kode',
        name: 'nama',
      },
      values: {
        code: (value) => parseInt(value),
      },
    },
  });

  console.log(data);
})();

/*
[
  {
    kode: 11,
    nama: 'ACEH',
  },
  ...
]
*/
```

```js
// .js
import { getData } from 'idn-area-data';

(async () => {
  const data = await getData('provinces', {
    transform: {
      headers: {
        code: 'kode',
        name: 'nama',
      },
      values: {
        code: (value) => parseInt(value),
      },
    },
  });

  console.log(data);
})();
```

## Try it now

You can try to run this package in the code playground :

[![Edit idn-area-data](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/idn-area-data-rkievt)

## Motivation

This package is a solution that addresses the limitations of other existing packages, repositories, or sources that provides Indonesian area data. Here's why it's the perfect choice for developers :

1. Up-to-date and Government-Sourced Data

    This package ensures that you have access to the most current Indonesian area data. We rely on official government sources, guaranteeing that the information provided is reliable and up-to-date.

1. Seamless Database Integration

    This package offers data in a format that seamlessly integrates with various databases. Unlike other sources that provide data solely in SQL query or JSON, this package store the data sources in CSV and use JavaScript to parse it into an array. You can easily insert the data into any database by using database integration tools like [Prisma](https://www.prisma.io), [Sequelize](https://sequelize.org), [node-postgres](https://node-postgres.com), [mongodb](https://github.com/mongodb/node-mongodb-native), etc. This approach ensures compatibility with a wide range of databases.

1. Easy Integration and Minimum Package Size

    You just need to install this package as a dependency into your project, just like any other library or module. This package has minimal dependencies on other packages, with the majority of its size being attributed to the data source itself.

## Data

The data we used is based on official data from the government and stored in separated CSV files by the levels in [`data`](data) directory.

> You can see the list of official sources we refer to [here](docs/references.md).

## Problem Reporting

We have different channels for each problem, please use them by following these conditions :

### Reporting a Bug
To report a bug, please open a new issue following the guide [here](CONTRIBUTING.md#submitting-an-issue).

### Requesting a New Feature
If you have a new feature in mind, please open a new issue following the guide [here](CONTRIBUTING.md#submitting-an-issue).

### Asking a Question
If you have a question, you can search for answers in the GitHub Discussions Q&A category [here](https://github.com/fityannugroho/idn-area-data/discussions/categories/q-a). If you don't find a relevant discussion already, you can open a new discussion.

## License

- This package and repository are licensed under the [MIT License](LICENSE).
- All data that included in this package and repository are made available under the [Open Database License](data/LICENSE.md).

These licenses apply to the current and previous versions, and apply to future versions until changed.
