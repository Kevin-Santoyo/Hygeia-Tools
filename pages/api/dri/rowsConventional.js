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

    const rows = await db.select().from('commodity_summary AS c_s')
      .where(params).andWhere('origin', 'Domestic Samples').andWhereNot('market', 'All Market Claims')

    res.json(rows)

  } else if (tableNum == 2) {

    const rows = await db.select().from('commodity_pesticide AS c_p')
      .leftJoin('commodity as c', 'c.commodity_id', 'c_p.commodity_id')
      .leftJoin('pesticide as p', 'p.pesticide_id', 'c_p.pesticide_id')
      .where(params).andWhere('origin', 'Domestic Samples').andWhere('market', 'Organic')
      .orderBy('pesticide', 'asec')

    res.json(rows)

  } else if (tableNum == 3) {

    const rows = await db.select().from('commodity_pesticide AS c_p')
      .leftJoin('commodity as c', 'c.commodity_id', 'c_p.commodity_id')
      .leftJoin('pesticide as p', 'p.pesticide_id', 'c_p.pesticide_id')
      .where(params).andWhere('origin', 'Domestic Samples').andWhere('market', 'Organic')
      .orderBy('pesticide', 'asec')

    res.json(rows)

  } else if (tableNum == 4) {

    const rows = await db.select().from('commodity_pesticide AS c_p')
      .leftJoin('commodity as c', 'c.commodity_id', 'c_p.commodity_id')
      .leftJoin('pesticide as p', 'p.pesticide_id', 'c_p.pesticide_id')
      .where(params).andWhere('origin', 'Domestic Samples').andWhere('market', 'Conventional')
      .orderBy('fs_dri_kid', 'desc')

    res.json(rows)

  }

  
}
