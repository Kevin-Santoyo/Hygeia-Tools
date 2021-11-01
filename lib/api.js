import axios from 'axios'

const endpoint = process.env.ENDPOINT

export async function fetchParamOptions ({ field, dependencies, selected, table = dri }) {
  const target = `/api/${table}/form`

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


export async function fetchFormData ({ table = dri }) {
  const target = `/api/${table}/formData`

  const res = await axios.get(target).catch((err) => console.log('FATAL ERROR: ', err))

  console.log('fetch form data')
  return res
}

export async function fetchRows ({ table, params }) {
  const target = `/api/${table}/rows`
  
  const res = await axios.get(target, {
    params
  })
  
  return res.data
}

export async function fetchFSARows (params) {
  const target = '/api/fsa/rows'

  const res = await axios.get(target, {
    params
  })

  return res.data
}