<h1 align="">Indonesian Area Data (<i>Data Wilayah Indonesia</i>)</h1>

[![npm version](https://img.shields.io/npm/v/idn-area-data.svg)](https://www.npmjs.com/package/idn-area-data)
[![npm downloads](https://img.shields.io/npm/dm/idn-area-data.svg)](https://www.npmjs.com/package/idn-area-data)
[![GitHub license](https://img.shields.io/github/license/fityannugroho/idn-area-data.svg)](LICENSE)

Provides the administrative areas data of Indonesia, from the province, regency, district, to village levels based on the latest official sources.

> **NEW!** [Islands data 🏝️](#islands) available in version 1.3.0 and higher.

<h2>Table of Contents</h2>

- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
  - [`provinces()`](#provinces)
  - [`regencies()`](#regencies)
  - [`districts()`](#districts)
  - [`villages()`](#villages)
  - [`islands()`](#islands)
  - [`getData()`](#getdata)
- [Try it now](#try-it-now)
- [Motivation](#motivation)
- [Data](#data)
- [Problem Reporting](#problem-reporting)
  - [Reporting a Bug](#reporting-a-bug)
  - [Requesting a New Feature](#requesting-a-new-feature)
  - [Asking a Question](#asking-a-question)

---

## Prerequisite

- [Node.js](https://nodejs.org) (version 16 or higher)
- [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com)

## Installation

```bash
npm install --save idn-area-data
```

Use this for **yarn** user :

```bash
yarn add idn-area-data
```

## Usage

Import the package into your project :

```js
// CommonJS
const IdnArea = require('idn-area-data');
// or using ES6
import IdnArea from 'idn-area-data';
```

Then, you can get the data you need using these methods below.

## Methods

### `provinces()`

Get all provinces data.

```js
const provinces = await IdnArea.provinces();

/*
[
  {
    code: '11',
    name: 'ACEH',
  },
]
*/
```

### `regencies()`

Get all regencies data.

```js
const regencies = await IdnArea.regencies();

/*
[
  {
    code: '1101',
    name: 'KABUPATEN ACEH SELATAN',
    province_code: '11',
  },
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`**.

```js
const regencies = await IdnArea.regencies({ transform: true });

/*
[
  {
    code: '1101',
    name: 'KABUPATEN ACEH SELATAN',
    provinceCode: '11',
  },
]
*/
```

### `districts()`

Get all districts data.

```js
const districts = await IdnArea.districts();

/*
[
  {
    code: '110101',
    name: 'BAKONGAN',
    regency_code: '1101',
  },
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`**.

```js
const districts = await IdnArea.districts({ transform: true });

/*
[
  {
    code: '110101',
    name: 'BAKONGAN',
    regencyCode: '1101',
  },
]
*/
```

### `villages()`

Get all villages data.

```js
const villages = await IdnArea.villages();

/*
[
  {
    code: '1101012001',
    district_code: '110101',
    name: 'KEUDE BAKONGAN',
  },
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`**.

```js
const villages = await IdnArea.villages({ transform: true });

/*
[
  {
    code: '1101012001',
    districtCode: '110101',
    name: 'KEUDE BAKONGAN',
  },
]
*/
```

### `islands()`

Get all islands data.

```js
const islands = await IdnArea.islands();

/*
[
  {
    code: '110140001',
    coordinate: '03°19'03.44" N 097°07'41.73" E',
    name: 'Pulau Batukapal',
    is_outermost_small: '0',
    is_populated: '0',
    regency_code: '1101',
  },
]
*/
```

If **`options.transform`** argument is `true`, the property naming will be changed from `snake_case` into **`camelCase`** and the data type will be converted (for `boolean` and `number`).

```js
const islands = await IdnArea.islands({ transform: true });

/*
[
  {
    code: '110140001',
    coordinate: '03°19'03.44" N 097°07'41.73" E',
    name: 'Pulau Batukapal',
    isOutermostSmall: false,
    isPopulated: false,
    regencyCode: '1101',
  },
]
*/
```

> The `regencyCode` will be **`null`** if the island doesn't belong to any regency and the `transform` option is enabled.

### `getData()`

You also can use `getData()` function to get the data by providing the `area` parameter.

```js
const provinces = await IdnArea.getData('provinces');
const regencies = await IdnArea.getData('regencies');
const districts = await IdnArea.getData('districts');
const villages = await IdnArea.getData('villages');
const islands = await IdnArea.getData('islands');
```

You also can put the `options` as the second argument :

```js
const regencies = await IdnArea.getData('regencies', { transform: true });
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
