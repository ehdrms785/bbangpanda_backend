import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getBakeryFilter: [BakeryFeature!]!
  }
`;
