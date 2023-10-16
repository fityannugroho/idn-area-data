<h1 align="">Data Wilayah Indonesia</h1>

[![npm version](https://img.shields.io/npm/v/idn-area-data.svg)](https://www.npmjs.com/package/idn-area-data)
[![npm downloads](https://img.shields.io/npm/dm/idn-area-data.svg)](https://www.npmjs.com/package/idn-area-data)
[![GitHub license](https://img.shields.io/github/license/fityannugroho/idn-area-data.svg)](LICENSE)

Menyediakan data wilayah administratif di Indonesia, mulai dari tingkat provinsi, kabupaten, kecamatan, hingga desa berdasarkan sumber resmi terkini. Modul ini juga menyediakan data pulau sejak versi 1.3.0, dan **data provinsi PAPUA baru** sejak versi 2.0.0.

> [!PERINGATAN]
> Sejak versi 3.0.0, **idn-area-data** diterbitkan sebagai ECMAScript Module (ESM).

<h2>Daftar Isi</h2>

- [Prasyarat](#prasyarat)
- [Peningkatan](#peningkatan)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
  - [ESM](#esm)
  - [CommonJS](#commonjs)
- [Metode](#metode)
  - [`getProvinces()`](#getprovinces)
  - [`getRegencies(?options)`](#getregenciesoptions)
  - [`getDistricts(?options)`](#getdistrictsoptions)
  - [`getVillages(?options)`](#getvillagesoptions)
  - [`getIslands(?options)`](#getislandsoptions)
  - [`getData(area, ?options)`](#getdataarea-options)
- [Coba Sekarang](#coba-sekarang)
- [Motivasi](#motivasi)
- [Data](#data)
- [Laporkan Masalah](#laporkan-masalah)
  - [Melaporkan Bug](#melaporkan-bug)
  - [Permintaan Fitur Baru](#permintaan-fitur-baru)
  - [Pertanyaan](#pertanyaan)
- [Lisensi](#lisensi)

---

## Prasyarat

- [Node.js](https://nodejs.org) (versi 18 atau lebih tinggi)
- [npm 9](https://www.npmjs.com) atau [yarn](https://yarnpkg.com)

## Peningkatan

Jika Anda melakukan peningkatan dari versi 2 ke versi 3, silakan baca [panduan peningkatan](./upgrading/upgrade-to-v3.md).

## Instalasi

```bash
npm install --save idn-area-data
```

Gunakan ini untuk pengguna **yarn** :

```bash
yarn add idn-area-data
```

## Penggunaan

Impor modul ini ke dalam proyek Anda seperti yang ditunjukkan di bawah ini. 

> [!CATATAN]
> Contoh kode berikut menggunakan [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) untuk menjalankan fungsi asinkron. Anda juga dapat menggunakan [Promise `.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then).

### ESM

Impor hanya fungsi spesifik :

```js
import { getProvinces } from 'idn-area-data';

(async () => {
  const provinces = await getProvinces();
})();
```

Impor keseluruhan modul :

```js
import * as IdnArea from 'idn-area-data';

(async () => {
  const provinces = await IdnArea.getProvinces();
})();
```

### CommonJS

Sejak versi 3.0.0, **idn-area-data** diterbitkan sebagai ECMAScript Module (ESM). Untuk itu, pengguna CommonJS, Anda perlu mengimpor menggunakan [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) seperti ini :

```js
(async () => {
  const {getProvinces} = await import('idn-area-data');
  const provinces = await getProvinces();
})();
```

Lalu, Anda bisa mendapatkan data yang dibutuhkan menggunakan metode di bawah.

## Metode

### `getProvinces()`

Fungsi asinkron untuk mendapatkan semua data provinsi.

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

Fungsi asinkron untuk mendapatkan semua data kabupaten.

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

Jika nilai dari **`options.transform`** adalah `true`, maka nama properti akan diubah dari `snake_case` menjadi **`camelCase`**.

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

Fungsi asinkron untuk mendapatkan semua data kecamatan.

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

Jika nilai dari **`options.transform`** adalah `true`, maka nama properti akan diubah dari `snake_case` menjadi **`camelCase`**.

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

Fungsi asinkron untuk mendapatkan semua data desa.

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

Jika nilai dari **`options.transform`** adalah `true`, maka nama properti akan diubah dari `snake_case` menjadi **`camelCase`**.

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

Fungsi asinkron untuk mendapatkan semua data pulau.

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

Jika nilai dari **`options.transform`** adalah `true`, maka nama properti akan diubah dari `snake_case` menjadi **`camelCase`** dan tipe data akan dikonversi (untuk `boolean` dan `number`).

> [!PENTING]
> `regencyCode` akan bernilai **`null`** jika pulau bukan merupakan bagian dari kabupaten manapun dan opsi `transform` diaktifkan.

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
    regencyCode: '11.01', <-- Akan bernilai `null` jika pulau bukan bagian dari kabupaten manapun
  },
  ...
]
*/
```

### `getData(area, ?options)`

Jika Anda membutuhkan untuk **memodifikasi nama atribut atau nilai dari data** sendiri, Anda bisa menggunakan fungsi asinkron ini dan menyediakan konfigurasi transformasi data pada `options.transform`.

Untuk memodifikasi nama atribut, definisikan pasangan dari atribut lama dan atribut baru di `options.transform.headers`. Atribut lama sama dengan CSV headers pada setiap [data](#data).

Untuk memodifikasi nilai atribut, tentukan fungsi transformasi nilai di `options.transform.values`.

Lihat pada contoh di bawah ini :

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

## Coba Sekarang

Anda dapat mencoba menjalankan modul ini di _code playground_ berikut:

[![Edit idn-area-data](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/idn-area-data-rkievt)

## Motivasi

Modul ini merupakan solusi yang dapat mengatasi keterbatasan modul terdahulu lainnya, repositori, atau sumber lain yang menyediakan data wilayah Indonesia. Inilah alasan modul ini merupakan pilihan sempurna bagi developer:

1. Up-to-date dan bersumber dari data pemerintahan

    Modul ini memastikan Anda memiliki akses kepada data area Indonesia terkini. Kami mengandalkan sumber resmi dari pemerintahan, memastikan bahwa informasi yang disediakan dapat dipercaya dan selalu terbaru.

1. Integrasi Database yang Mulus

    Modul ini menyediakan data dalam format yang dapat dengan mudah terintegrasi dengan berbagai database. Tidak seperti sumber lain yang menyediakan data hanya dalam kueri SQL atau JSON, modul ini menyimpan data di CSV dan menggunakan JavaScript untuk menguraikannya ke dalam array. Anda dapat dengan mudah memasukkan data ke dalam database manapun menggunakan perangkat integrasi database seperti [Prisma](https://www.prisma.io), [Sequelize](https://sequelize.org), [node-postgres](https://node-postgres.com), [mongodb](https://github.com/mongodb/node-mongodb-native), dst. Pendekatan ini memastikan kompatibilitas dengan berbagai database.

1. Integrasi yang Mudah dan Ukuran Modul Kecil

    Anda hanya perlu menginstal modul ini sebagai dependency di proyek Anda. Modul ini hanya memiliki sedikit sekali ketergantungan pada modul lain, dan mayoritas ukurannya berasal dari sumber data itu sendiri.

## Data

Data yang kami gunakan berasal dari data resmi pemerintahan dan disimpan dalam CSV terpisah di direktori [`data`](../data).

> Anda dapat melihat daftar sumber resmi yang kami gunakan [di sini](./references.md).

## Laporkan Masalah

Kami memiliki kanal berbeda untuk setiap masalah, silakan gunakan berdasarkan kondisi berikut:

### Melaporkan Bug
Untuk melaporkan bug, silakan buka issue baru mengikuti pedoman [di sini](../CONTRIBUTING.md#submitting-an-issue).

### Permintaan Fitur Baru
Jika Anda memiliki ide fitur baru, silakan buka issue baru mengikuti pedoman [di sini](../CONTRIBUTING.md#submitting-an-issue).

### Pertanyaan
Jika Anda memiliki pertanyaan, Anda bisa mencari jawabannya pada **GitHub Discussions Q&A category** [di sini](https://github.com/fityannugroho/idn-area-data/discussions/categories/q-a). Jika tidak menemukan diskusi yang relevan, Anda bisa membuka diskusi baru.

## Lisensi

- Modul dan repositori ini memiliki lisensi [MIT License](../LICENSE).
- Semua data yang digunakan dalam modul dan repositori ini tersedia di bawah lisensi [Open Database License](../data/LICENSE.md).

Lisensi ini berlaku untuk versi saat ini dan versi sebelumnya, dan berlaku untuk versi selanjutnya hingga perubahan dilakukan.
