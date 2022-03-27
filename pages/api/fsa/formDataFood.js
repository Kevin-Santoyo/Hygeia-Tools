import db from '../../../lib/db.ts'

export default async (req, res) => {
    
  const values = await db.distinct('Food').from('form_fsa_commodity').orderBy('Food')
  
  console.log('form data')
  
  var names = []
  Object.entries(values).forEach(([k,v]) => {
      
    names.push(v['Food'])
  })
  console.log(names)
  res.json(names)
}
