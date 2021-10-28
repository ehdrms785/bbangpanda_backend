import { gql } from "apollo-server-core";

export default gql`

  type Query {
    getBakeryDetail(bakeryId: Int!): Bakery!
  }
`;
