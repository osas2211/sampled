/**
 * Truncates a string showing start and end characters with ellipsis in the middle
 * @param str - The string to truncate
 * @param start - Number of characters to keep at the start (default: 10)
 * @param end - Number of characters to keep at the end (default: 10)
 * @param separator - The separator to use in the middle (default: "...")
 * @returns Truncated string in format: "start...end"
 */
export const truncateString = (
  str: string,
  start: number = 10,
  end: number = 10,
  separator: string = "...",
): string => {
  if (!str) return "";

  const totalChars = start + end;

  // If string is shorter than or equal to total chars to keep, return as is
  if (str.length <= totalChars) return str;

  return `${str.slice(0, start)}${separator}${str.slice(-end)}`;
};
