/**
 * Check if a string is a number and has a specific length.
 *
 * @param value The string to be checked
 * @param digits The length of the string
 */
const isStrNumber = (value, digits) => /^\d+$/.test(value) && (!digits || value.length === digits);

module.exports = { isStrNumber };
