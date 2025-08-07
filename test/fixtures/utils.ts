
/**
 * Build a compact regex pattern (without ^$) for a list of codes,
 * each code being either:
 *  - "XX"
 *  - "XX.YY"
 *  - "XX.YY.ZZ"
 *  - ...any number of dot-separated two-digit segments
 */
export function buildMultiLevelPattern(codes: string[], sep = '.'): string {
  // Base case: no code contains the separator → it's a set of two-digit codes
  if (!codes.some(c => c.includes(sep))) {
    // parse tens & ones
    const groups = new Map<number, number[]>();
    for (const c of codes) {
      const tens = +c[0];
      const ones = +c[1];
      if (!groups.has(tens)) groups.set(tens, []);
      groups.get(tens)!.push(ones);
    }
    // compress each group into ranges
    const parts: string[] = [];
    for (const [tens, arr] of groups) {
      const sorted = Array.from(new Set(arr)).sort((a, b) => a - b);
      let start = sorted[0], end = sorted[0];
      for (let i = 1; i < sorted.length; i++) {
        const n = sorted[i];
        if (n === end + 1) {
          end = n;
        } else {
          parts.push(formatTwoDigit(tens, start, end));
          start = end = n;
        }
      }
      parts.push(formatTwoDigit(tens, start, end));
    }
    return parts.sort().join('|');
  }

  // Recursive case: codes have at least one separator
  const prefixMap = new Map<string, string[]>();
  for (const code of codes) {
    const idx = code.indexOf(sep);
    const pref = code.substring(0, idx);
    const suf = code.substring(idx + sep.length);
    if (!prefixMap.has(pref)) prefixMap.set(pref, []);
    prefixMap.get(pref)!.push(suf);
  }

  // Escape the separator for regex
  const escSep = sep.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  // For each prefix, recurse on its suffixes, then combine
  const parts: string[] = [];
  for (const [pref, suffixes] of prefixMap) {
    const subPattern = buildMultiLevelPattern(suffixes, sep);
    // group the subPattern if it has alternations
    const wrapped = subPattern.includes('|') ? `(?:${subPattern})` : subPattern;
    parts.push(`${pref}${escSep}${wrapped}`);
  }

  return parts.sort().join('|');
}

/** format tens & ones into either "XY" or "X[Y-Z]" **/
function formatTwoDigit(tens: number, s: number, e: number): string {
  if (s === e) {
    return `${tens}${s}`;
  }
  return `${tens}[${s}-${e}]`;
}

/**
 * Build a regex that matches a range of codes,
 * e.g. "01", "01.02", "01.02.03"
 */
export function buildRangeRegex(codes: string[], sep = '.'): RegExp {
  const pattern = buildMultiLevelPattern(codes, sep);
  return new RegExp(`^(?:${pattern})$`);
}
