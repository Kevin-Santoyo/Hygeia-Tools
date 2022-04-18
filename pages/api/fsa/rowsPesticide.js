import db from '../../../lib/db.ts'

export default async (req, res) => {
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }
  
  const rows = await db.select().from('FSA_FS_DRI_Dataset_v2022_2')
                        .where(params)
                        .orderBy('FS_DRI_Kid', 'desc')
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
