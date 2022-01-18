import db from '../../../lib/db.ts'

export default async (req, res) => {
  //const values = await db.distinct(field).from('dri_rows').where(dependencies).orderBy(field)
  const values = await db.distinct('commodity_category').from('form_fqpa').orderBy('commodity_category')
  //res.json(values.map(row => row[field]))
  console.log('form data')
  //console.log(values)
  var names = []
  Object.entries(values).forEach(([k,v]) => {
    //console.log("The key: ", k)
    //console.log("The value: ", v)
    names.push(v['commodity_category'])
  })
  console.log(names)
  res.json(names)
}
