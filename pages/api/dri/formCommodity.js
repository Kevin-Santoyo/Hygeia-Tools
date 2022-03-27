import db from '../../../lib/db.ts'

const validFields = ['origin', 'commodity', 'market', 'pdp_year', 'pesticide']

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
  if (field == 'pdp_year') {
    values = await db.from('form_commodity').distinct(field).where(dependencies).orderBy(field, 'desc')
  } else {
    values = await db.from('form_commodity').distinct(field).where(dependencies).orderBy(field)
  }
  res.json(values.map(row => row[field]))
  
}
