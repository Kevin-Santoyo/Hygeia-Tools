import db from '../../../lib/db.ts'

export default async (req, res) => {
    
  const values = await db.distinct('Rpt_Pest_Name').from('form_fsa_pesticide').orderBy('Rpt_Pest_Name')
  
  console.log('form data')
  
  var names = []
  Object.entries(values).forEach(([k,v]) => {
      
    names.push(v['Rpt_Pest_Name'])
  })
  console.log(names)
  res.json(names)
}
