import { gql } from "apollo-server-core";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    expiredTime: Int
    refreshToken: String
    error: String
  }
  type Mutation {
    login(email: String, phonenumber: String, password: String!): LoginResult!
  }
`;
