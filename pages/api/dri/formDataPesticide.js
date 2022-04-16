import db from '../../../lib/db.ts'

export default async (req, res) => {
  //const values = await db.distinct(field).from('dri_rows').where(dependencies).orderBy(field)
  const values = await db.distinct('Rpt_Pest_Name').from('form_pesticide_2022').orderBy('Rpt_Pest_Name')
  //res.json(values.map(row => row[field]))
  console.log('form data')
  //console.log(values)
  var names = []
  Object.entries(values).forEach(([k,v]) => {
    //console.log("The key: ", k)
    //console.log("The value: ", v)
    names.push(v['Rpt_Pest_Name'])
  })
  console.log(names)
  res.json(names)
}
