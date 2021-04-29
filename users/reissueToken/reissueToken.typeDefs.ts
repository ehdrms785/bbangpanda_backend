import { gql } from "apollo-server-core";

export default gql`
  type ReissueTokenResult {
    ok: Boolean!
    error: String
    refreshToken: String
    refreshTokenExpired: Int
  }

  type Mutation {
    reissueToken(refreshToken: String!): ReissueTokenResult!
  }
`;
