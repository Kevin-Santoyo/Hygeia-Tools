import db from '../../../lib/db.ts'

export default async (req, res) => {
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }
  
  const rows = await db.select().from('commodity_pesticide AS c_p')
                        .leftJoin('commodity as c', 'c.commodity_id', 'c_p.commodity_id')
                        .leftJoin('pesticide as p', 'p.pesticide_id', 'c_p.pesticide_id')
                        .where(params)
                        .orderBy('per_agg_fsdri', 'desc')
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
