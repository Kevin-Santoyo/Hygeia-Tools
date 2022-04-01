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

    const rows = await db.select().from('fsa_fs_dri_data_2022_1')
      .where(params).andWhere('Origin', 'UK').andWhereNot('Claim', 'All')

    res.json(rows)

  } else if (tableNum == 2 || tableNum == 3) {

    const rows = await db.select().from('fsa_fs_dri_data_2022_1 AS fsaDri')
      .leftJoin('UK_FSA_Pesticide_Risk_Factors as fsaRisk', 'fsaRisk.FSA_Pest_Name', 'fsaDri.Rpt_Pest_Name')
      .where(params).andWhere('Origin', 'UK').andWhere('Claim', 'Organic')
      .orderBy('Rpt_Pest_Name', 'asec')

    res.json(rows)

  } else if (tableNum == 4) {

    const rows = await db.select().from('fsa_fs_dri_data_2022_1 AS fsaDri')
      .leftJoin('UK_FSA_Pesticide_Risk_Factors as fsaRisk', 'fsaRisk.FSA_Pest_Name', 'fsaDri.Rpt_Pest_Name')
      .where(params).andWhere('Origin', 'UK').andWhere('Claim', 'Organic')
      .orderBy('FS_DRI_Kid', 'desc')

    res.json(rows)

  }

  
}
