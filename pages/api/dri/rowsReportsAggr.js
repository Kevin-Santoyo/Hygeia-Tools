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
  const rows = await db.select('pdp_year', 'commodity')
                            .avg('total_samples AS AvgOfTotal_Samples')
                            .max('total_samples AS MaxOfTotal_Samples')
                            .sum('number_positives AS SumOfNumber_Positives')
                            .sum('dri_mean_kid AS SumOfDRI_Mean_Kid')
                            .sum('fs_dri_kid AS SumOfFS_DRI_Kid')
                        .from('fs_dri_dataset')
                        .where(params)
                        .andWhere('total_samples', '>=', '10')
                        .groupBy('pdp_year', 'commodity')
                        .orderByRaw('pdp_year DESC , Sum(FS_DRI_Kid) DESC')
  
  res.json(rows)
  } else if (tableNum == 2) {
      const rows = await db.select('pesticide', 'pdp_year', 'risk_group', 'foc')
                                .sum('total_samples AS SumOfTotal_Samples')
                                .sum('number_positives AS SumOfNumber_Positives')
                                .sum('dri_mean_kid AS SumOfDRI_Mean_Kid')
                                .sum('fs_dri_kid AS SumOfFS_DRI_Kid')
                            .from('fs_dri_dataset')
                            .where(params)
                            .andWhere('total_samples', '>=', '10')
                            .groupByRaw('pesticide, pdp_year, risk_group, foc')
                            .orderBy('SumOfFS_DRI_Kid', 'DESC')
                            
  res.json(rows)
  }
}
