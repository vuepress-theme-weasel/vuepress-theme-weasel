/**
 * 通用的字符处理
 */

/**
 * 首字母大写
 * @param str
 * @returns
 */
export function upperFirstChar(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
