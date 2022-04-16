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
      .from('PDP_FS_DRI_Dataset_v2022_2')
      .where(params).andWhere('Origin', 'Domestic').andWhereNot('Claim', 'All')
      .groupBy('Claim')


    res.json(rows)

  } else if (tableNum == 2) {
      const rows = await db.select().from('PDP_FS_DRI_Dataset_v2022_2')
        .where(params)
        .andWhere('Origin', 'Domestic')
        .andWhere('Claim', 'Organic')
        .orderBy('Rpt_Pest_Name', 'asec')

      res.json(rows)
  } else if (tableNum == 3) {

    const rows = await db.distinct('pdpDRI.Rpt_Pest_Name', 'PH_Fungicide', 'Number_Positives', 'Mean_Positives', 'Tolerance_Level', 'AT', 'Conv_Mean_Res', 'DRI_Mean_Kid', 'NOP_Approved').from('PDP_FS_DRI_Dataset_v2022_2 as pdpDRI')
    .leftJoin('Organic_Sample_NOP_Compliance_v2022_1 as pdpOrganic', function() {
      this.on('pdpOrganic.Rpt_Pest_Name', 'pdpDRI.Rpt_Pest_Name')
      .andOn('pdpOrganic.PDP_Year', 'pdpDRI.PDP_Year')
      .andOn('pdpOrganic.Commodity_Name', 'pdpDRI.Commodity_Name')
    })
    .where(params)
      .andWhere('Origin', 'Domestic')
      .andWhere('Claim', 'Organic')
      .orderBy('pdpDRI.Rpt_Pest_Name', 'asec')

    res.json(rows)

  } else if (tableNum == 4) {

    const rows = await db.select().from('PDP_FS_DRI_Dataset_v2022_2 as pdpDRI')
      .leftJoin('PDP_Pesticide_Factors_v2022_1 as pdpRisk', 'pdpRisk.Rpt_Pest_Name', 'pdpDRI.Rpt_Pest_Name')
      .where(params).andWhere('Origin', 'Domestic').andWhere('Claim', 'Conventional')
      .orderBy('FS_DRI_Kid', 'desc')

    res.json(rows)

  }

  
}
