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
    const rows = await db.distinct('Origin')
      .avg('Total_Samples as avg_total_samples')
      .sum('Number_Positives as sum_number_positives')
      .sum('FS_DRI_Kid as sum_dri_fs')
      .sum('DRI_Mean_Kid as sum_dri_mean')
      .from('PDP_FS_DRI_Dataset_v2022_2')
      .where(params).andWhereNot('Origin', 'All')
      .groupBy('Origin')

    res.json(rows);
  } else if (tableNum == 2 || tableNum == 3) {

    const rows = await db.select().from('PDP_FS_DRI_Dataset_v2022_2')
      .where(params)
      .orderBy('FS_DRI_Kid', 'desc')

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
