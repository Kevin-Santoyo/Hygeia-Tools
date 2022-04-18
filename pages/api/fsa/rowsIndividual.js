import db from '../../../lib/db.ts'

export default async (req, res) => {
  const tableNum = req.query.tableNum;
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }
  
  if (tableNum == 1) {
    const rows = await db
          .select(['Sample_Id', 'Market_Claim', 'Origin', 'Country'])
          .count('* AS num_res')
          .sum('DRI AS aggr_sample_dri')
          .from('UK_FSA_Individual_Sample_Detail')
          .where(params)
          .groupBy('Sample_Id', 'Market_Claim', 'Origin', 'Country')
          .orderBy('aggr_sample_dri', 'desc')
    res.json(rows)
  } else if (tableNum == 2) {
    const rows = await db.select('Sample_Id', 'Rpt_Pest_Name', 'DRI', 'MRL', 'Market_Claim', 'Origin', 'Country', 'AI_Type')
          .from('UK_FSA_Individual_Sample_Detail')
          .where(params)
          .orderByRaw('MAX("DRI") OVER(PARTITION BY "Sample_Id") DESC, "Sample_Id", "DRI" DESC')

    res.json(rows)
  } else if (tableNum == 3) {
    const rows = await db.select('Sample_Id', 'Rpt_Pest_Name', 'DRI', 'MRL', 'Market_Claim', 'Origin', 'Country', 'AI_Type')
          .from('UK_FSA_Individual_Sample_Detail')
          .where(params)
          .orderByRaw('DRI DESC')
    res.json(rows)
  }
}
