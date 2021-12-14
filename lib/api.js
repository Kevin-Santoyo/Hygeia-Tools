import axios from 'axios'

const endpoint = process.env.ENDPOINT

export async function fetchParamOptions({ field, dependencies, selected, table, form }) {
  const target = `/api/${table}/form${form}`

  console.log('Field:', field)
  const res = await axios.get(target, {
    params: {
      field,
      dependencies
    }
  }).catch((err) => console.log('FATAL ERROR: ', err))

  console.log('set options')
  return res.data
}


export async function fetchFormData({ table, form }) {
  const target = `/api/${table}/formData${form}`

  const res = await axios.get(target).catch((err) => console.log('FATAL ERROR: ', err))

  console.log('fetch form data')
  return res
}

export async function fetchRows({ table, params, form, tableNum }) {
  const target = `/api/${table}/rows${form}`

  const res = await axios.get(target, {
    params: {
      tableNum, params
    }
  }).catch((err) => console.log('FATAL ERROR: ', err))

  console.log(res, tableNum)
  return res.data
}

export async function fetchFSARows(params) {
  const target = '/api/fsa/rows'

  const res = await axios.get(target, {
    params
  })

  return res.data
}