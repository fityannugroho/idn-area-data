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

## Prerequisite

- [Node.js](https://nodejs.org/en) (version 14 or higher)
- [NPM](https://www.npmjs.com)

## Installation

```bash
npm install --save idn-area-data
```

## Usage

Import the package into your project:

```js
// CommonJS
const IdnArea = require('idn-area-data');
// or using ES6
import IdnArea from 'idn-area-data';
```

Then, you can get the data you need:

### Get all provinces

```js
const provinces = await IdnArea.provinces();
```

### Get all regencies

```js
const regencies = await IdnArea.regencies();
```

### Get all districts

```js
const districts = await IdnArea.districts();
```

### Get all villages

```js
const villages = await IdnArea.villages();
```

## Motivation

This package is a solution that addresses the limitations of other existing packages, repositories, or sources that provides Indonesian area data. Here's why it's the perfect choice for developers:

1. Up-to-date and Government-Sourced Data

    This package ensures that you have access to the most current Indonesian area data. We rely on official government sources, guaranteeing that the information provided is reliable and up-to-date.

1. Seamless Database Integration

    This package offers data in a format that seamlessly integrates with various databases. Unlike other sources that provide data solely in SQL query or JSON, this package store the data sources in CSV and use JavaScript to parse it into an array. You can easily insert the data into any database by using database integration tools like [Prisma](https://www.prisma.io), [Sequelize](https://sequelize.org), [node-postgres](https://node-postgres.com), [mongodb](https://github.com/mongodb/node-mongodb-native), etc. This approach ensures compatibility with a wide range of databases.

1. Easy Integration and Minimum Package Size

    You just need to install this package as a dependency into your project, just like any other library or module. This package has minimal dependencies on other packages, with the majority of its size being attributed to the data source itself.

## Data

The data we used is based on official data from the government and stored in separated CSV files by the levels in [`data`](data) directory.

> You can see the list of official sources we refer to [here](docs/references.md).
