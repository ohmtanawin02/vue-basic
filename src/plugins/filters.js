function numberParseFloat (_number) {
  if (typeof _number === 'string') {
    return parseFloat(_number)
  }
  return _number
}

export function numberFormat (_number = 0) {
  const num = numberParseFloat(_number)
  if (num === 0 || num) {
    return num.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return '-'
}

export function numberFormat2Decimal (_number = 0) {
  const num = numberParseFloat(_number)
  if (num === 0 || num) {
    return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return '-'
}

export function numberFormatWithDecimal (_number = 0, min = 0, max = 0) {
  const num = numberParseFloat(_number)
  if (num === 0 || num) {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: min,
      maximumFractionDigits: min > max ? min : max
    })
  }
  return '-'
}

export function numberFormatNoDecimal (_number = 0) {
  return numberFormatWithDecimal(_number, 0, 0)
}

const filters = {
  numberFormat,
  numberFormat2Decimal,
  numberFormatWithDecimal,
  numberFormatNoDecimal
}

export default {
  install: (app) => {
    app.config.globalProperties.$filters = filters
  }
}