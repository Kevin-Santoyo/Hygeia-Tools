import db from '../../../lib/db'

export default async (req, res) => {
  console.log('API: Fetch rows - params: ', req.query)
  
  const rows = await db.select().from('dri_rows').where(req.query).orderBy('per_agg_fsdri', 'desc')
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
