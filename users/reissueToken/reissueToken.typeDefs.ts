import { gql } from "apollo-server-core";

export default gql`
  type ReissueTokenResult {
    ok: Boolean!
    token: String
    expiredTime: Int
    refreshToken: String
    error: String
  }

  type Mutation {
    reissueToken(refreshToken: String!): ReissueTokenResult!
  }
`;
