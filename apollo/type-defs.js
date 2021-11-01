import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }

  type Parameter {
    type: String!
    name: String!
  }

  type Origin {
    origin: String!
  }

  type Query {
    viewer: User
    fsaOrigins: [Origin]
  }
`;
