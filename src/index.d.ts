export type Province = {
  code: string;
  name: string;
}

export type Regency = {
  code: string;
  province_code: string;
  name: string;
}

export type District = {
  code: string;
  regency_code: string;
  name: string;
}

export type Village = {
  code: string;
  district_code: string;
  name: string;
}

export type Areas = 'provinces' | 'regencies' | 'districts' | 'villages';

export private function getData<T extends Areas>(area: T): T extends 'provinces'
  ? Promise<Province[]> : T extends 'regencies'
  ? Promise<Regency[]> : T extends 'districts'
  ? Promise<District[]> : T extends 'villages'
  ? Promise<Village[]> : never;

/**
 * Get all provinces.
 */
export function provinces(): Promise<Province[]>;

/**
 * Get all regencies.
 */
export function regencies(): Promise<Regency[]>;

/**
 * Get all districts.
 */
export function districts(): Promise<District[]>;

/**
 * Get all villages.
 */
export function villages(): Promise<Village[]>;

export as namespace IdnArea;
