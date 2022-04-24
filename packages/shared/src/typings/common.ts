
/**
 * 是否是纯粹的对象
 * @param obj
 * @returns
 */
const objectToString = Object.prototype.toString
export const toTypeString = (value: any) => objectToString.call(value)
export const isPlainObject = (val: any) => toTypeString(val) === '[object Object]'

/**
 * 是否是string
 * @param val
 * @returns
 */
export const isString = (val: any) => typeof val === 'string'
