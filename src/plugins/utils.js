import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

export function toDate (date, {
  endOf = null,
  startOf = null,
  now = false,
  move = { value: 0, type: null },
  utc = false
} = {}) {
  if (!date) {
    return null
  }
  let dateVal = dayjs(date)

  if (utc) {
    dateVal = dateVal.utc()
  }
  const isValidType = (type) => ['day', 'month', 'year'].includes(type || '')
  const isEndOf = endOf && isValidType(endOf)
  const isStartOf = startOf && isValidType(startOf)
  if (isEndOf) {
    dateVal = dayjs(dateVal).endOf(endOf)
  } else if (isStartOf) {
    dateVal = dayjs(dateVal).startOf(startOf)
  } else if (now) {
    const current = dayjs()
    dateVal = dayjs(dateVal).set('hour', current.get('hour')).set('minute', current.get('minute')).set('second', current.get('second'))
  }

  const isMove = move && move?.value !== 0 && isValidType(move.type)
  if (isMove) {
    if (move?.value > 0) {
      dateVal = dayjs(dateVal).add(move.value, move.type)
    } else if (move?.value < 0) {
      dateVal = dayjs(dateVal).subtract(move.value, move.type)
    }
  }
  const result = dateVal.toISOString()
  return result
}

export function toDateFormat (date, {
  plain = false,
  utc = false,
  tz = 'Asia/Bangkok',
  format = 'YYYY/MM/DD' } = {}) {
  if (!date) {
    return '-'
  }

  if (!utc && !plain) {
    return dayjs(date).tz(tz).format(format)
  }

  const dateString = this.toDate(date, {
    utc: !plain
      ? utc
      : false
  })
  return dayjs(dateString).format(format)
}

export function toNumber (number, initialValue) {
  let value = Number(number)
  if (Number.isNaN(value) || !value) {
    return initialValue || 0
  }
  return value
}

export function commaStringToNumber (number) {
  if (!number) {
    return 0
  }

  if (typeof number === 'number') {
    return number
  }

  let result = typeof number === 'string'
    ? number.replaceAll(',', '')
    : number
  return this.toNumber(result)
}

const utils = {
  toDate,
  toDateFormat,
  toNumber,
  commaStringToNumber
}

export default {
  install: (app) => {
    app.config.globalProperties.$utils = utils
  }
}