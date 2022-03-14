import { Logger } from '@mr-huang/vuepress-shared'

export const logger = new Logger('@mr-huang/vuepress-plugin-permalink')

export const isDate = (date: Date) => date instanceof Date && !isNaN(date.getTime())

export const parseDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return {
    year: `${year}`,
    month: addZero(month),
    i_month: `${month}`,
    day: addZero(day),
    i_day: `${day}`,
    hour: `${hour}`,
    minute: `${minute}`,
    second: `${second}`
  }
}

export const addZero = (num: number) => num > 9 ? `${num}` : `0${num}`
