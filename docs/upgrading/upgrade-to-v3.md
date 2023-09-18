<h1>Upgrade to idn-area-data Version 3</h1>

## Version Changes

idn-area-data version 3 includes some minimum version changes for Node.js and npm.

- Node.js 18 or higher
- npm 9 or higher

## Support for CommonJS

**idn-area-data** version 3 now only supports **ES Modules**.
If you are using CommonJS, you can use the [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) syntax to import the module.

We also **removed `IdnArea` [namespace](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)**, so you may need to change your import statement like this:

```js
// Old (import the namespace)
import IdnArea from 'idn-area-data';

// New (import the whole module and define it as `IdnArea`)
import * as IdnArea from 'idn-area-data';
```

> See the [documentation](/README.md#usage) for more details.

## Data Changes

In general, the data changes are only in the `code`, `name`, and `parent_code` fields. The `code` and `parent_code` fields are now written with the dot (`.`) just like the original code (see [issue #45](https://github.com/fityannugroho/idn-area-data/issues/45)). The district's and village's `name` now is written in original case instead of uppercase (see [issue #46](https://github.com/fityannugroho/idn-area-data/issues/46)). For more details, see the changes below.

### Regencies

The regency's `code` now is written with the dot (`.`) just like the original code. For example: `1101` changes to `11.01`.

### Districts

The district's `code` now is written with the dot (`.`) just like the original code. For example: `1101010` changes to `11.01.01`.
The `regency_code` also changes following the new format of regency's `code`.

The district's `name` now is written in original case instead of uppercase. For example:

- `BAKONGAN` changes to `Bakongan`
- `KLUET UTARA` changes to `Kluet Utara`
- `KOTO XI TARUSAN` changes to `Koto XI Tarusan`

### Villages

The village's `code` now is written with the dot (`.`) just like the original code. For example: `1101010001` changes to `11.01.01.0001`. The `district_code` also changes following the new format of district's `code`.

The village's `name` now is written in original case instead of uppercase. For example:

- `KEUDE BAKONGAN` changes to `Keude Bakongan`
- `UJONG XII` changes to `Ujong XII`

Some characters are now allowed in village's `name`, so that the village name can be written as it is instead of using the replacement character `'`. The allowed characters are:

- `"` quotation mark (U+0022)

  For example: `Soka"an` changed from `SOKA'AN`

- `’` right single quotation mark (U+2019)

  For example: `Regapu’u` changed from `REGAPU'U`

- `*` asterisk (U+002A)

  For example: `Teuw*` changed from `TEUW`

### Islands

The island's `code` now is written with the dot (`.`) just like the original code. For example: `110140001` changes to `11.01.40001`.
The `regency_code` also changes following the new format of regency's `code`.

> See the [data](/data) for more details.

## Method Changes

Several methods have been renamed, see in the table below.

| Old Method | New Method |
| ---------- | ---------- |
| `provinces()` | [`getProvinces()`](/README.md#getprovinces) |
| `regencies(?options)` | [`getRegencies(?options)`](/README.md#getregenciesoptions) |
| `districts(?options)` | [`getDistricts(?options)`](/README.md#getdistrictsoptions) |
| `villages(?options)` | [`getVillages(?options)`](/README.md#getvillagesoptions) |
| `islands(?options)` | [`getIslands(?options)`](/README.md#getislandsoptions) |

`baseOptions` now is the second parameter of [`getData(area, ?baseOptions)`](/README.md#getdataarea-options) method which is different with `options` parameter that used by other methods. See the differences below.

**`options`**

- `options.transform` (boolean) - Transform the data before returning it using built-in transformer configuration. Default: `false`.

**`baseOptions`**

- `baseOptions.transform` (object) - Define the custom transformer configuration. Default: `undefined`.
  - `baseOptions.transform.headers` (object) - Define the pair of old headers and new headers. Default: `undefined`.
  - `baseOptions.transform.values` (object) - Define the value transformer function for each header. Default: `undefined`.

> [!IMPORTANT]
> The data returned by each method also changes according to the [data changes](#data-changes) described above. See the [documentation](/README.md#methods) for more details.

## Tips

### Get data with old format

You can use the [`getData()`](/README.md#getdataarea-options) method to get the data in the same format as the previous version (version 2).

Below is the example of how to get the islands data in the same format as version 2 using `getData()` method in version 3.

```ts
// .ts
import { getData, Island, IslandCsv } from 'idn-area-data';

(async () => {
  // Equivalent to `islands()` in version 2
  const islands1 = await getData<IslandCsv>('islands', {
    transform: {
      values: {
        code: (value) => value.replaceAll('.', ''),
        regency_code: (value) => value.replaceAll('.', ''),
      },
    }
  });

  console.log(islands1);
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
    ...
  ]
  */

  // Equivalent to `islands({ transform: true })` in version 2
  const islands2 = await getData<Island>('islands', {
    transform: {
      headers: {
        regency_code: 'regencyCode',
        is_populated: 'isPopulated',
        is_outermost_small: 'isOutermostSmall',
      },
      values: {
        code: (value) => value.replaceAll('.', ''),
        is_populated: (value) => !!parseInt(value),
        is_outermost_small: (value) => !!parseInt(value),
        regency_code: (value) => (value === '' ? null : value.replaceAll('.', '')),
      },
    }
  });

  console.log(islands2);
  /*
  [
    {
      code: '110140001',
      coordinate: '03°19'03.44" N 097°07'41.73" E',
      name: 'Pulau Batukapal',
      isOutermostSmall: false,
      isPopulated: false,
      regencyCode: '1101', <-- It will be `null` if the island doesn't belong to any regency
    },
    ...
  ]
  */
})();
```
