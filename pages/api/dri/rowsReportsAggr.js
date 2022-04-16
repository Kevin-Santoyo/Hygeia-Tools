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
  const rows = await db.select('PDP_Year', 'Commodity_Name')
                            .avg('Total_Samples AS AvgOfTotal_Samples')
                            .max('Total_Samples AS MaxOfTotal_Samples')
                            .sum('Number_Positives AS SumOfNumber_Positives')
                            .sum('DRI_Mean_Kid AS SumOfDRI_Mean_Kid')
                            .sum('FS_DRI_Kid AS SumOfFS_DRI_Kid')
                        .from('PDP_FS_DRI_Dataset_v2022_2')
                        .where(params)
                        .andWhere('Total_Samples', '>=', '10')
                        .groupBy('PDP_Year', 'Commodity_Name')
                        .orderBy('SumOfFS_DRI_Kid', 'DESC')
  
  res.json(rows)
  } else if (tableNum == 2) {
      const rows = await db.select('Rpt_Pest_Name', 'PDP_Year', 'Risk_Group', 'FOC_Name_Website')
                                .sum('Total_Samples AS SumOfTotal_Samples')
                                .sum('Number_Positives AS SumOfNumber_Positives')
                                .sum('DRI_Mean_Kid AS SumOfDRI_Mean_Kid')
                                .sum('FS_DRI_Kid AS SumOfFS_DRI_Kid')
                            .from('PDP_FS_DRI_Dataset_v2022_2')
                            .where(params)
                            .andWhere('Total_Samples', '>=', '10')
                            .groupBy('Rpt_Pest_Name', 'PDP_Year', 'Risk_Group', 'FOC_Name_Website')
                            .orderBy('SumOfFS_DRI_Kid', 'DESC')
                            
  res.json(rows)
  }
}
