import { gql } from "apollo-server-core";

export default gql`
  type Query {
    bakeryDetail(bakeryName: String!): Bakery
  }
`;
