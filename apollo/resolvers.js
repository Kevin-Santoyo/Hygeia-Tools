import knex from "knex";

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_CONNECTION_STRING,
});

export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, name: "John Smith", status: "cached" };
    },
    fsaOrigins(_parent, _args, _context, _info) {
      // return db.select("origin").distinct("origin").from("fsa_rows").limit(10);
      return [{ origin: "Example " }, { origin: "Demo" }];
    },
  },
};
