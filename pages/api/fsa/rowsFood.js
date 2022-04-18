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
    const rows = await db.select().from('FSA_FS_DRI_Dataset_v2022_2')
                          .where(params)
                          .orderBy('FS_DRI_Kid', 'desc')
    console.log('resulting rows: ', rows)
    
    res.json(rows)
  } else if (tableNum == 2) {
    const rows = await db.select().from('FSA_FS_DRI_Dataset_v2022_2 as fsaDri')
                          .where(params)
                          .leftJoin('UK_FSA_Pesticide_Risk_Factors as fsaRisk', 'fsaRisk.FSA_Pest_Name', 'fsaDri.Rpt_Pest_Name')
                          .orderBy('FS_DRI_Kid', 'desc')
    console.log('resulting rows: ', rows)
    
    res.json(rows)

  }
}
