import { createReadStream } from 'node:fs';
import Papa from 'papaparse';

export type ParserConfig = Omit<Papa.ParseLocalConfig, 'complete' | 'error' | 'transform'> & {
  transform?(value: string, field: string | number): unknown
};

export default class CsvParser {
  defaultConfig?: ParserConfig;

  /**
   * Create a new instance of CsvHelper.
   * @param defaultConfig The default options
   */
  constructor(defaultConfig?: ParserConfig) {
    this.defaultConfig = defaultConfig;
  }

  /**
   * Parse CSV file asynchronously.
   *
   * @param path Path to the CSV file.
   * @param config The configuration for the parser.
   */
  static async parse<T = unknown>(path: string, config?: ParserConfig) {
    const encoding = config?.encoding ? config.encoding as BufferEncoding : 'utf8';
    const sourceFile = createReadStream(path, encoding);

    return new Promise<Papa.ParseResult<T>>((resolve, reject) => {
      Papa.parse<T>(sourceFile, {
        ...config,
        complete: resolve,
        error: reject,
      });
    });
  }

  /**
   * Parse CSV file asynchronously.
   *
   * @param path Path to the CSV file.
   * @param config The configuration for the parser.
   */
  async parse<T = unknown>(path: string, config?: ParserConfig) {
    return CsvParser.parse<T>(path, {
      ...this.defaultConfig,
      ...config,
    } as ParserConfig);
  }
}
