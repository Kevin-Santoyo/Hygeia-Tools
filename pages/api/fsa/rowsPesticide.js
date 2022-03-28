import db from '../../../lib/db.ts'

export default async (req, res) => {
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }
  
  const rows = await db.select().from('fsa_fs_dri_data_2022_1')
                        .where(params)
                        .orderBy('FS_DRI_Kid', 'desc')
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
