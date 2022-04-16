import db from '../../../lib/db.ts'

export default async (req, res) => {
  
  let params

  if (req.query.params) {
    params = JSON.parse(req.query.params)
  } else {
    params = {}
  }

  const rows = await db.select().from('PDP_FS_DRI_Dataset_v2022_2 AS c_p')
                        .leftJoin('commodity_2022 as c', 'c.commodity_code', 'c_p.Commodity_Code')
                        .leftJoin('pesticide_2022 as p', 'p.pesticide_code', 'c_p.Pest_Code')
                        .where(params)
                        .orderBy('FS_DRI_Kid', 'desc')
  console.log('resulting rows: ', rows)
  
  res.json(rows)
}
