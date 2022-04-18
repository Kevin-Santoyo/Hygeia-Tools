import db from '../../../lib/db.ts'

export default async (req, res) => {
  const tableNum = req.query.tableNum

  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }
  if (tableNum == 1) {

    const rows = await db.distinct('Claim')
      .avg('Total_Samples as avg_total_samples')
      .sum('Number_Positives as sum_number_positives')
      .sum('FS_DRI_Kid as sum_dri_fs')
      .sum('DRI_Mean_Kid as sum_dri_mean')
      .from('FSA_FS_DRI_Dataset_v2022_2')
      .where(params).andWhere('Origin', 'UK').andWhereNot('Claim', 'All')
      .groupBy('Claim')

    res.json(rows)

  } else if (tableNum == 2) {

    const rows = await db.select().from('FSA_FS_DRI_Dataset_v2022_2 as fsaDri')
        .where(params)
        .andWhere('Origin', 'UK')
        .andWhere('Claim', 'Organic')
        .orderBy('Rpt_Pest_Name', 'asec')
        
    res.json(rows)

  } else if (tableNum == 3) {

    const rows = await db.select().from('FSA_FS_DRI_Dataset_v2022_2 as fsaDri')
      .leftJoin('UK_FSA_Pesticide_Risk_Factors as fsaRisk', 'fsaRisk.FSA_Pest_Name', 'fsaDri.Rpt_Pest_Name')
      .where(params)
      .andWhere('Origin', 'UK')
      .andWhere('Claim', 'Organic')
      .orderBy('Rpt_Pest_Name', 'asec')

    res.json(rows)

  } else if (tableNum == 4) {

    const rows = await db.select().from('FSA_FS_DRI_Dataset_v2022_2 as fsaDri')
      .leftJoin('UK_FSA_Pesticide_Risk_Factors as fsaRisk', 'fsaRisk.FSA_Pest_Name', 'fsaDri.Rpt_Pest_Name')
      .where(params).andWhere('Origin', 'UK').andWhere('Claim', 'Conventional')
      .orderBy('FS_DRI_Kid', 'desc')

    res.json(rows)

  }

}
