export as namespace IdnArea;

export type Province = {
  code: string;
  name: string;
};

export type Regency = {
  code: string;
  name: string;
  province_code: string;
};

export type RegencyTransformed = {
  code: string;
  name: string;
  provinceCode: string;
};

export type District = {
  code: string;
  name: string;
  regency_code: string;
};

export type DistrictTransformed = {
  code: string;
  name: string;
  regencyCode: string;
};

export type Village = {
  code: string;
  district_code: string;
  name: string;
};

export type VillageTransformed = {
  code: string;
  districtCode: string;
  name: string;
};

export type Island = {
  code: string;
  coordinate: string;
  is_outermost_small: string;
  is_populated: string;
  name: string;
  regency_code: string;
};

export type IslandTransformed = {
  code: string;
  coordinate: string;
  isOutermostSmall: boolean;
  isPopulated: boolean;
  name: string;
  regencyCode: string;
};

export type Areas = 'provinces' | 'regencies' | 'districts' | 'villages' | 'islands';

export type RegencyResult<T extends boolean | undefined = false> = T extends true
  ? RegencyTransformed : Regency;

export type DistrictResult<T extends boolean | undefined = false> = T extends true
  ? DistrictTransformed : District;

export type VillageResult<T extends boolean | undefined = false> = T extends true
  ? VillageTransformed : Village;

export type IslandResult<T extends boolean | undefined = false> = T extends true
  ? IslandTransformed : Island;

export type Options = {
  /**
   * Transform the data.
   *
   * @default false
   */
  transform?: boolean;
};

type Transform<T> = T extends Options
  ? T['transform'] extends true
    ? true : false
  : false;

export function getData<
  A extends Areas,
  T extends Options,
>(area: A, options?: T): A extends 'provinces'
  ? Promise<Province[]> : A extends 'regencies'
  ? Promise<RegencyResult<Transform<T>>[]> : A extends 'districts'
  ? Promise<DistrictResult<Transform<T>>[]> : A extends 'villages'
  ? Promise<VillageResult<Transform<T>>[]> : A extends 'islands'
  ? Promise<IslandResult<Transform<T>>[]> : never;

/**
 * Get all provinces.
 */
export function provinces<
  T extends Options,
>(options?: T): ReturnType<typeof getData<'provinces', T>>;

/**
 * Get all regencies.
 */
export function regencies<
  T extends Options,
>(options?: T): ReturnType<typeof getData<'regencies', T>>;

/**
 * Get all districts.
 */
export function districts<
  T extends Options,
>(options?: T): ReturnType<typeof getData<'districts', T>>;

/**
 * Get all villages.
 */
export function villages<
  T extends Options,
>(options?: T): ReturnType<typeof getData<'villages', T>>;

/**
 * Get all islands.
 */
export function islands<
  T extends Options,
>(options?: T): ReturnType<typeof getData<'islands', T>>;
