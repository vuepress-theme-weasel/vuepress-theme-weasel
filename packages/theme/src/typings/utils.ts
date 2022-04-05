export type ArraySortFn<T> = (pageA: T, pageB: T) => number
export type ArrayMapFn<T> = (value: T, index: number, array: T[]) => any[]
