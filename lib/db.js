import knex from 'knex'

const db = knex({
  client: 'pg',
    connection: {
    host: process.env.HOST_URL,
    user: 'postgres',
    password: process.env.PASSWORD,
    database: 'postgres'
  }
})

export default db
