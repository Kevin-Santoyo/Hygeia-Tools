import db from "../../../lib/db.ts";

export default async (req, res) => {
  const tableNum = req.query.tableNum;

  let params;

  if (req.query.params) {
    params = JSON.parse(req.query.params);
  } else {
    params = {};
  }

  if (tableNum == 1) {
    const rows = await db
      .select()
      .from("commodity_summary AS c_s", "commodity_pesticide AS c_p", "commodity AS c", "pesticide AS p")
      .where(params)
      .andWhereNot('origin', 'All Samples')

    res.json(rows);
  } else if (tableNum == 2) {

    const rows = await db.select().from("commodity_pesticide AS c_p")
      .leftJoin('commodity as c', 'c.commodity_id', 'c_p.commodity_id')
      .leftJoin('pesticide as p', 'p.pesticide_id', 'c_p.pesticide_id')
      .where(params)
      .orderBy('per_agg_fsdri', 'desc')

    res.json(rows);
  } else if (tableNum == 3) {

    const rows = await db.select().from("commodity_pesticide AS c_p")
      .leftJoin('commodity as c', 'c.commodity_id', 'c_p.commodity_id')
      .leftJoin('pesticide as p', 'p.pesticide_id', 'c_p.pesticide_id')
      .where(params)
      .orderBy('per_agg_fsdri', 'desc')

    res.json(rows);
  } else if (tableNum == 4) {
    const rows = await db.select('commodity').from("commodity_pesticide AS c_p")
      .leftJoin('commodity as c', 'c.commodity_id', 'c_p.commodity_id')
      .leftJoin('pesticide as p', 'p.pesticide_id', 'c_p.pesticide_id')
      .where(params)
      .andWhere('dri_mean_kid', '>', .1)
      .orderBy('per_agg_fsdri', 'desc')

    res.json(rows);
  }
};
