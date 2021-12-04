import knex from 'knex'
import { types } from 'pg';

// data parsing
types.setTypeParser(types.builtins.INT8, (value: string) => {
  return parseInt(value);
});

types.setTypeParser(types.builtins.FLOAT8, (value: string) => {
  return parseFloat(value);
});

types.setTypeParser(types.builtins.NUMERIC, (value: string) => {
  return parseFloat(value);
});

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
