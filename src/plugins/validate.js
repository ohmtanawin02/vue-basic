const emailRegex = /^[\w.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,})$/

const validate = {
  required: (val, name) => {
    if (!!val || val?.length) return true
    return name
      ? `please enter: ${ name }`
      : 'this field is required'
  },
  email: (val) => emailRegex.test(val) || 'Email invalid',
  confirmPassword: (val, password) => val === password || `The password does't match`,
  duplicatePassword: (val, password) => val !== password || 'Password invalid',
  length: (val, length) => (!!val && val.length === length) || `Input should be ${ length } letter(s)`,
  minLength: (val, length) => (!!val && val.length >= length) || `Please enter at lease ${ length } letter(s)`,
  maxLength: (val, length) => (!!val && val.length <= length) || `Please enter at most ${ length } letter(s)`,
  between: (val, min, max) => (!!val && val.length >= min && val.length <= max)
    || `please enter between ${ min } and ${ max } letter`,
  valueBetween: (val, min, max) => (!!val && +val >= min && +val <= max)
    || `please enter between ${ min } and ${ max }`,
  atLeast: (val, length = 1) => (!!val.length && val.length >= length) || `Please select at least ${ length } option(s)`,
  numWithDecimal: (val) => /^\d+(\.\d+)*$/.test(val) || 'Please enter only number and decimal',
  numCommaDecimal: (val) => /^\d+(,\d{3})*(\.\d+)?$/.test(val) || 'Please enter only number, comma and decimal',
  numOnly: (val) => /\d/.test(val) || 'Please enter only number',
  maxValue: (val, max) => (val === 0 || val <= max) || `Please enter value that less than ${ max }`,
  minValue: (val, min) => (val === 0 || val >= min) || `Please enter value that more than ${ min }`,
  maxDecimal: (val, max) => {
    let splitVal = ''
    if (val?.toString()?.includes('.')) {
      splitVal = val?.toString().split('.')[1]
    }
    return (val === 0 || splitVal?.length <= max) || `Please enter ${ max } decimal`
  }
}

export default {
  install: (app) => {
    app.config.globalProperties.$validate = validate
  }
}
