import db from '../../../lib/db.ts'

const validFields = ['Origin', 'Food', 'Sub_Food', 'Claim', 'FSA_Year', 'rpt_pest_name']

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
  //if (validFields.indexOf(field) === -1) return res.json({ error: 'Invalid Field Specified' })
  if (validFields.indexOf(field) === -1) return res.json({ error: field })
  if (field == 'FSA_Year') {
    values = await db.from('form_fsa_commodity').distinct(field).where(dependencies).orderBy(field, 'desc')
  } else {
    values = await db.from('form_fsa_commodity').distinct(field).where(dependencies).orderBy(field)
  }
  res.json(values.map(row => row[field]))
}
