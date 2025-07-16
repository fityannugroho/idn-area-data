import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import CsvParser from './csv-parser.js';

type ToCsv<T, RemovedKeys extends string, NewKeys extends string> = {
  [K in keyof T as Exclude<K, RemovedKeys> | NewKeys]: string;
};

export type Province = {
  code: string;
  name: string;
};

export type Regency = {
  code: string;
  name: string;
  provinceCode: string;
};

export type RegencyCsv = ToCsv<Regency, 'provinceCode', 'province_code'>;

export type District = {
  code: string;
  name: string;
  regencyCode: string;
};

export type DistrictCsv = ToCsv<District, 'regencyCode', 'regency_code'>;

export type Village = {
  code: string;
  districtCode: string;
  name: string;
};

export type VillageCsv = ToCsv<Village, 'districtCode', 'district_code'>;

export type Island = {
  code: string;
  coordinate: string;
  isOutermostSmall: boolean;
  isPopulated: boolean;
  name: string;
  regencyCode: string | null;
};

export type IslandCsv = ToCsv<
  Island,
  'isOutermostSmall' | 'isPopulated' | 'regencyCode',
  'is_outermost_small' | 'is_populated' | 'regency_code'
>;

export type Areas =
  | 'provinces'
  | 'regencies'
  | 'districts'
  | 'villages'
  | 'islands';

export type AreaHeaders<A extends Areas> = A extends 'provinces'
  ? keyof Province
  : A extends 'regencies'
    ? keyof RegencyCsv
    : A extends 'districts'
      ? keyof DistrictCsv
      : A extends 'villages'
        ? keyof VillageCsv
        : A extends 'islands'
          ? keyof IslandCsv
          : never;

export type HeaderTransformer = {
  [A in Areas]?: {
    [H in AreaHeaders<A>]?: string;
  };
};

export type ValueTransformer = {
  [A in Areas]?: {
    [H in AreaHeaders<A>]?: (value: string) => unknown;
  };
};

export type Transformer<A extends Areas> = {
  headers?: HeaderTransformer[A];
  values?: ValueTransformer[A];
};

export type BaseOptions<A extends Areas, Tr = Transformer<A>> = {
  transform?: Tr;
};

export type Options<A extends Areas, Tr extends boolean = false> = BaseOptions<
  A,
  Tr
>;

function transformValue<A extends Areas>(
  value: string,
  /**
   * The header (old or new).
   */
  header: string,
  transformer: Transformer<A>,
) {
  let headerKey: string = header;

  // Check if there is a transformation function for the header
  if (!Object.hasOwn(transformer.values ?? {}, header)) {
    const headerEntries = Object.entries(transformer.headers ?? {});

    // If there's no transformation function, check if `tHeader` is the new header name
    for (const [oldHeader, newHeader] of headerEntries) {
      if (newHeader === header) {
        headerKey = oldHeader;
        break;
      }
    }
  }

  const transformFunction = transformer.values?.[headerKey as AreaHeaders<A>];
  return transformFunction ? transformFunction(value) : value;
}

export async function getData<T, A extends Areas = Areas>(
  area: A,
  options?: BaseOptions<A>,
) {
  const filePath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    `../data/${area}.csv`,
  );
  const transformer = options?.transform;

  const result = await CsvParser.parse<T>(filePath, {
    header: true,
    ...(transformer && {
      transformHeader(header) {
        const newHeader = transformer.headers?.[header as AreaHeaders<A>];
        return newHeader ?? header;
      },
      transform(value, tHeader) {
        if (typeof tHeader === 'string') {
          return transformValue(value, tHeader, transformer);
        }
        return value;
      },
    }),
  });

  return result.data;
}

export function getProvinces() {
  return getData<Province>('provinces');
}

export function getRegencies<Tr extends boolean = false>(
  options?: Options<'regencies', Tr>,
) {
  return getData<Tr extends false ? RegencyCsv : Regency>('regencies', {
    ...options,
    transform: options?.transform
      ? {
          headers: {
            province_code: 'provinceCode',
          },
        }
      : undefined,
  });
}

export function getDistricts<Tr extends boolean = false>(
  options?: Options<'districts', Tr>,
) {
  return getData<Tr extends false ? DistrictCsv : District>('districts', {
    ...options,
    transform: options?.transform
      ? {
          headers: {
            regency_code: 'regencyCode',
          },
        }
      : undefined,
  });
}

export function getIslands<Tr extends boolean = false>(
  options?: Options<'islands', Tr>,
) {
  return getData<Tr extends false ? IslandCsv : Island>('islands', {
    ...options,
    transform: options?.transform
      ? {
          headers: {
            is_outermost_small: 'isOutermostSmall',
            is_populated: 'isPopulated',
            regency_code: 'regencyCode',
          },
          values: {
            is_populated: (value) => !!Number.parseInt(value, 10),
            is_outermost_small: (value) => !!Number.parseInt(value, 10),
            regency_code: (value) => (value === '' ? null : value),
          },
        }
      : undefined,
  });
}

export function getVillages<Tr extends boolean = false>(
  options?: Options<'villages', Tr>,
) {
  return getData<Tr extends false ? VillageCsv : Village>('villages', {
    ...options,
    transform: options?.transform
      ? {
          headers: {
            district_code: 'districtCode',
          },
        }
      : undefined,
  });
}
