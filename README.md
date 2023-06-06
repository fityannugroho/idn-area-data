<h1 align="">Indonesian Area Data (<i>Data Wilayah Indonesia</i>)</h1>

Provides the administrative areas data of Indonesia, from the province, regency, district, to village levels based on the latest official sources.

<h2>Table of Contents</h2>

- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)
  - [Get all provinces](#get-all-provinces)
  - [Get all regencies](#get-all-regencies)
  - [Get all districts](#get-all-districts)
  - [Get all villages](#get-all-villages)
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

Then, you can get the data you need :

### Get all provinces

```js
const provinces = await IdnArea.provinces();

/*
[
  {
    id: '11',
    name: 'ACEH',
  },
  ...
]
*/
```

### Get all regencies

```js
const regencies = await IdnArea.regencies();

/*
[
  {
    id: '1101',
    name: 'KABUPATEN ACEH SELATAN',
    province_id: '11',
  },
  ...
]
*/
```

### Get all districts

```js
const districts = await IdnArea.districts();

/*
[
  {
    id: '110101',
    name: 'BAKONGAN',
    regency_id: '1101',
  },
  ...
]
*/
```

### Get all villages

```js
const villages = await IdnArea.villages();

/*
[
  {
    id: '1101012001',
    district_id: '110101',
    name: 'KEUDE BAKONGAN',
  },
  ...
]
*/
```

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
