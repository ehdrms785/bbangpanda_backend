import { gql } from "apollo-server-core";

export default gql`
  type BakeryDetailResponse {
    bakery: Bakery!
    gotDibsUserCount: Int!
  }
  type Query {
    getBakeryDetail(bakeryId: Int!): BakeryDetailResponse
  }
`;
