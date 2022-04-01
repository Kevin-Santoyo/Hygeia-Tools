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
    const rows = await db.select().from('fsa_fs_dri_data_2022_1')
                          .where(params)
                          .orderBy('FS_DRI_Kid', 'desc')
    console.log('resulting rows: ', rows)
    
    res.json(rows)
  } else if (tableNum == 2) {
    const rows = await db.select().from('fsa_fs_dri_data_2022_1 as fsaDri')
                          .where(params)
                          .leftJoin('UK_FSA_Pesticide_Risk_Factors as fsaRisk', 'fsaRisk.FSA_Pest_Name', 'fsaDri.Rpt_Pest_Name')
                          .orderBy('FS_DRI_Kid', 'desc')
    console.log('resulting rows: ', rows)
    
    res.json(rows)

  }
}
