import { gql } from "apollo-server-core";

export default gql`
  type BreadDetailResponse {
    bread: Bread!
    bakery: Bakery!
    gotDibsUserCount: Int!
  }
  type Query {
    getBreadDetail(breadId: Int!): BreadDetailResponse
  }
`;
