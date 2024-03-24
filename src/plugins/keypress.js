export function number (evt) {
  const event = (evt) || window.event
  const charCode = (event.which) ? event.which : event.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    event.preventDefault()
    return false
  }
  return true
}

export function numberNoDecimal (evt) {
  const event = (evt) || window.event
  const charCode = (event.which) ? event.which : event.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) || charCode === 46) {
    event.preventDefault()
    return false
  }
  return true
}

export function numberComma (evt) {
  const event = (evt) || window.event
  const charCode = (event.which) ? event.which : event.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 && charCode !== 44) {
    event.preventDefault()
    return false
  }
  return true
}

export function telInput (evt) {
  const event = evt || window.event
  const charCode = event.which ? event.which : event.keyCode
  if (
    ((charCode > 31 && (charCode < 48 || charCode > 57)) || charCode === 46) && charCode !== 43
  ) {
    event.preventDefault()
    return false
  }
  return true
}

export function telInputWithPrefix (evt) {
  const event = evt || window.event
  const charCode = event.which ? event.which : event.keyCode
  if (charCode === 32 || charCode === 40 || charCode === 41 || charCode === 43 || charCode === 45) {
    return true
  }
  return telInput(evt)
}

const keypress = {
  number,
  numberNoDecimal,
  numberComma,
  telInput,
  telInputWithPrefix
}

export default {
  install: (app) => {
    app.config.globalProperties.$keypress = keypress
  }
}