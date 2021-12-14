import db from '../../../lib/db.ts'

export default async (req, res) => {
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }

  const rows = await db.select('c.commodity', 'p.pesticide', 'c_p.total_foods', 'c_p.pdp_year', 'c_p.total_samples', 'c_p.number_positives', 'c_p.percent_positive', 'c_p.mean_positives', 'c_p.crfc_kid', 'c_p.dri_mean_kid', 'c_p.fs_dri_kid', 'c_p.per_agg_fsdri').from('commodity_pesticide AS c_p')
                                .leftJoin('commodity AS c', 'c.commodity_id', 'c_p.commodity_id')
                                .leftJoin('pesticide AS p', 'p.pesticide_id', 'c_p.pesticide_id')
                                .where(params)
                                .orderBy('fs_dri_kid', 'desc').catch((err) => console.log(err, 'rowsPesticide ERROR'))
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
