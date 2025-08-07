<h1>Upgrade to idn-area-data Version 4</h1>

## Data Changes

### Formatting and normalization

- **Quotation marks (`"`) are now allowed in district and village names**, so names can be written as they are (previously, some of them were replaced with `'`). The quotation mark is escaped by using an additional quotation mark (`""`) and the name is enclosed in double quotes.

  For example:

  | Old data (v3) | New data (v4) |
  |---|---|
  | `35.29.22,35.29,Ra'as` | `35.29.22,35.29,"Ra""as"` |
  | `35.13.15.2017,35.13.15,Soka"an` | `35.13.15.2017,35.13.15,"Soka""an"` |
  | `35.18.17.2007,35.18.17,Ja"an` | `35.18.17.2007,35.18.17,"Ja""an"` |

  So, if you see a name like `"Soka""an"` in the CSV files, it means the actual name is `Soka"an`.

  > The double quotation mark (`""`) is commonly used to escape quotation marks in CSV format, as specified in [RFC 4180](https://datatracker.ietf.org/doc/html/rfc4180).

- **Commas (`,`) are now allowed in district and village names**, so names can be written as they are, without needing to replace the comma with a different character (previously, commas were replaced with spaces).
  The comma is enclosed in double quotes.

  For example:

  | Old data (v3) | New data (v4) |
  |---|---|
  | `12.07.28.1007,12.07.28,Lubuk Pakam I II` | `12.07.28.1007,12.07.28,"Lubuk Pakam I,II"` |

- **Spaces in names are now normalized**, making names consistent and easier to read.

  For example:

  | Old data (v3) | New data (v4) |
  |---|---|
  | `12.71.15.1001,12.71.15,A u r` | `12.71.15.1001,12.71.15,Aur` |
  | `12.71.15.1003,12.71.15,J a t i` | `12.71.15.1003,12.71.15,Jati` |

### Province data

- Province names are now **written in their original case** instead of uppercase.

  For example:

  | Old name (v3) | New name (v4) |
  |---|---|
  | `ACEH` | `Aceh` |
  | `SUMATERA UTARA` | `Sumatera Utara` |

### Regency data

- Regency names are now **written in their original case** instead of uppercase.

  For example:

  | Old name (v3) | New name (v4) |
  |---|---|
  | `KABUPATEN ACEH SELATAN` | `Kabupaten Aceh Selatan` |
  | `KOTA BANDA ACEH` | `Kota Banda Aceh` |

- Dashes (`-`) are now allowed in regency names.

  For example:

  | Old name (v3) | New name (v4) |
  |---|---|
  | `72.04,72,Kabupaten Toli Toli` | `72.04,72,Kabupaten Toli-Toli` |
