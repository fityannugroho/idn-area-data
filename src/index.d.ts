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

export type RegencyResult<T extends boolean = false> = T extends true
  ? RegencyTransformed : Regency;

export type DistrictResult<T extends boolean = false> = T extends true
  ? DistrictTransformed : District;

export type VillageResult<T extends boolean = false> = T extends true
  ? VillageTransformed : Village;

export type IslandResult<T extends boolean = false> = T extends true
  ? IslandTransformed : Island;

export function getData<
  A extends Areas,
  T extends boolean = false,
>(area: A, transform: T): A extends 'provinces'
  ? Promise<Province[]> : A extends 'regencies'
  ? Promise<RegencyResult<T>[]> : A extends 'districts'
  ? Promise<DistrictResult<T>[]> : A extends 'villages'
  ? Promise<VillageResult<T>[]> : A extends 'islands'
  ? Promise<IslandResult<T>[]> : never;

/**
 * Get all provinces.
 */
export function provinces(): Promise<Province[]>;

/**
 * Get all regencies.
 */
export function regencies<
  T extends boolean = false,
>(transform: T): Promise<RegencyResult<T>[]>;

/**
 * Get all districts.
 */
export function districts<
  T extends boolean = false
>(transform: T): Promise<DistrictResult<T>[]>;

/**
 * Get all villages.
 */
export function villages<
  T extends boolean = false,
>(transform: T): Promise<VillageResult<T>[]>;

/**
 * Get all islands.
 */
export function islands<
  T extends boolean = false,
>(transform: T): Promise<IslandResult<T>[]>;
