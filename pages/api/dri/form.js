import db from '../../../lib/db'

const validFields = ['origin', 'commodity_name', 'claim', 'pdp_year', 'rpt_pest_name']

export default async (req, res) => {
  const field = req.query.field
  //console.log("form request")
  //console.log(req.query)
  let dependencies
  if (req.query.dependencies) {
    //console.log('dependencies found, ', req.query.dependencies)
    dependencies = JSON.parse(req.query.dependencies)
  } else {
    // console.log('no dependencies found')
    dependencies = {}
  }
  //if (validFields.indexOf(field) === -1) return res.json({ error: 'Invalid Field Specified' })
  if (validFields.indexOf(field) === -1) return res.json({ error: field })
  
  const values = await db.from('dri_rows').distinct(field).where(dependencies).orderBy(field)
  res.json(values.map(row => row[field]))
  // console.time('fetch origins')
  // const origins = await db
  //   .select('origin')
  //   .distinct('origin')
  //   .from('fsa_rows')
  // console.timeEnd('fetch origins')
  // console.log('fetched origins: ', origins)
  //
  // const paramOptions = {
  //   origin: origins
  // }
  //
  // res.json(paramOptions)
}
