import db from '../../../lib/db.ts'

export default async (req, res) => {
  const tableNum = req.query.tableNum;
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }
  
  if (tableNum == 2) {
    const rows = await db.select('sample_id', 'rpt_pest_name', 'residue_ppm', 'dri', 'tolerance', 'claim', 'sample_date', 'origin_desc', 'state_country')
          .from('individual_samples')
          .where(params)
          .orderByRaw('MAX(dri) OVER(PARTITION BY sample_id) DESC, sample_id, dri DESC')
    console.log('resulting rows: ', rows)
    res.json(rows)
  } else if (tableNum == 1) {
    const rows = await db
          .select(['sample_id', 'claim', 'origin_desc', 'state_country'])
          .count('* AS num_res')
          .sum('dri AS aggr_sample_dri')
          .from('individual_samples')
          .where(params)
          .groupByRaw('sample_id, claim, origin_desc, state_country')
          .orderBy('aggr_sample_dri', 'desc')
    res.json(rows)
  }
}
