import db from '../../../lib/db.ts'

export default async (req, res) => {
  console.log('API: Fetch rows - params: ', req.query)

  const rows = await db.select().from('fsa_rows').where(req.query)
  console.log('resulting rows: ', rows)

  res.json(rows)
}
