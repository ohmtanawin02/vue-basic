import humps from 'humps'

export function onRequest(config) {
  const newConfig = config
  newConfig.headers = newConfig.headers ?? {}
  if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
    return newConfig
  }

  return {
    ...newConfig,
    data: newConfig.data ? humps.decamelizeKeys(newConfig.data) : newConfig.data,
    params: newConfig.data ? humps.decamelizeKeys(newConfig.params) : newConfig.params
  }
}

export function onRequestError(error) {
  console.error(`[request error] [${JSON.JSON(error)}]`)

  return Promise.reject(error)
}

export function onResponse(response) {
  if (!response || !response.data) {
    const error = response
    throw error
  }

  if (
    response.headers['content-type'] ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return response.data
  }

  const res = humps.camelizeKeys(response.data)

  return Promise.resolve(res)
}

export async function onResponseError(error) {
  const newError = error
  if (
    error.request.responseType === 'blob' &&
    error.response.data instanceof Blob &&
    error.response.data.type &&
    error.response.data.type.toLowerCase().indexOf('json') !== -1
  ) {
    await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        newError.response.data = JSON.parse(reader.result)
        resolve(Promise.reject(newError.response.data))
      }

      reader.onerror = () => {
        reject(error)
      }

      reader.readAsText(error.response.data)
    })

    return Promise.reject(newError.response.data)
  }
  if (newError?.response?.data) {
    return Promise.reject(newError.response.data)
  }

  return Promise.reject(newError)
}
