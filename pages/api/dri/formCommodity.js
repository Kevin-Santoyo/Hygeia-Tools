import db from '../../../lib/db.ts'

const validFields = ['Origin', 'Commodity_Name', 'Claim', 'PDP_Year', 'pesticide']

export default async (req, res) => {
  const field = req.query.field
  let values
  
  let dependencies
  if (req.query.dependencies) {
    dependencies = JSON.parse(req.query.dependencies)
  } else {
    
    dependencies = {}
  }
  
  if (validFields.indexOf(field) === -1) return res.json({ error: field })
  if (field == 'PDP_Year') {
    values = await db.from('form_commodity_2022').distinct(field).where(dependencies).orderBy(field, 'desc')
  } else {
    values = await db.from('form_commodity_2022').distinct(field).where(dependencies).orderBy(field)
  }
  res.json(values.map(row => row[field]))
  
}
