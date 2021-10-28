import { gql } from "apollo-server-core";

export default gql`
  type BreadDetailResponse {
    bread: Bread!
    bakery: Bakery!
  }
  type Query {
    getBreadDetail(breadId: Int!): BreadDetailResponse
  }
`;
