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
    const rows = await db.distinct('Origin', 'Country_Name')
      .avg('Total_Samples as avg_total_samples')
      .sum('Number_Positives as sum_number_positives')
      .sum('FS_DRI_Kid as sum_dri_fs')
      .sum('DRI_Mean_Kid as sum_dri_mean')
      .from('FSA_FS_DRI_Dataset_v2022_2')
      .where(params).andWhereNot('Origin', 'All')
      .groupBy('Origin', 'Country_Name')

    res.json(rows);
  } else if (tableNum == 2 || tableNum == 3) {

    const rows = await db.select().from('FSA_FS_DRI_Dataset_v2022_2')
      .where(params)
      .orderBy('FS_DRI_Kid', 'desc')

    res.json(rows);
  } else if (tableNum == 4) {
    const rows = await db.select('Food').from("FSA_FS_DRI_Dataset_v2022_2")
      .where(params)
      .andWhere('DRI_Mean_Kid', '>', .1)
      .orderBy('FS_DRI_Kid', 'desc')

    res.json(rows);
  }
};
