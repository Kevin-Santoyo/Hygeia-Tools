import db from '../../../lib/db.ts'

export default async (req, res) => {
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }
  
  const rows = await db.select().from('individual_samples AS is')
                        .where(params)
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
