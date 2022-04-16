import db from '../../../lib/db.ts'

const validFields = ['Origin', 'Commodity_Name', 'Claim', 'PDP_Year']

export default async (req, res) => {
  const field = req.query.field
  let values
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
  
  if (validFields.indexOf(field) === -1) return res.json({ error: field })
  if (field == 'PDP_Year') {
    values = await db.from('form_commodity_2022').distinct(field).where(dependencies).orderBy(field, 'desc')
  } else {
    values = await db.from('form_commodity_2022').distinct(field).where(dependencies).orderBy(field)
  }
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
