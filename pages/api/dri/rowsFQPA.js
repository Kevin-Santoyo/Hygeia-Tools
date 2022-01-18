import db from '../../../lib/db.ts'

export default async (req, res) => {
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }

  const rows = await db.select().from('fsdri_commodity_summary AS fsdri_sum')
                                //.leftJoin('commodity AS c', 'c.commodity_id', 'c_p.commodity_id')
                                //.leftJoin('pesticide AS p', 'p.pesticide_id', 'c_p.pesticide_id')
                                .where(params)
                                .andWhereNot('origin', 'Combined Imports')
                                //.orderBy('fs_dri_kid', 'desc').catch((err) => console.log(err, 'rowsPesticide ERROR'))
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
