/**
 * Check if a string is a number and has a specific length.
 *
 * @param value The string to be checked
 * @param digits The length of the string
 */
const isStrNumber = (value, digits) => /^\d+$/.test(value) && (!digits || value.length === digits);

/**
 * Check if a string is a boolean ("true" or "false").
 *
 * @param {string} value The string to be checked
 */
const isStrBoolean = (value) => ['true', 'false', '0', '1'].includes(value.toLowerCase());

/**
 * Check if the coordinate has valid DMS (degrees minutes seconds) format.
 *
 * Valid DMS format: `{a}°{b}'{c}" {y} {d}°{e}'{f}" {x}`
 * - `{a}` should be 2 digit integer from 00 to 90
 * - `{b}` should be 2 digit integer from 00 to 60
 * - `{c}` should be 2 digit integer with 2 decimal points from 00.00 to 60.00
 * - `{y}` should be N or S
 * - `{d}` should be 3 digit integer from 000 to 180
 * - `{e}` should be 2 digit integer from 00 to 60
 * - `{f}` should be 2 digit integer with 2 decimal points from 00.00 to 60.00
 * - `{x}` should be E or W
 *
 * Tested here: https://regex101.com/r/GQe8WT
 *
 * @param {string} coordinate The coordinate to test.
 */
function isValidCoordinate(coordinate) {
  const regex = /^([0-8][0-9]|90)°([0-5][0-9]|60)'(([0-5][0-9].[0-9]{2})|60.00)"\s(N|S)\s(0\d{2}|1([0-7][0-9]|80))°([0-5][0-9]|60)'(([0-5][0-9].[0-9]{2})|60.00)"\s(E|W)$/;
  return regex.test(coordinate);
}

module.exports = { isStrNumber, isStrBoolean, isValidCoordinate };
