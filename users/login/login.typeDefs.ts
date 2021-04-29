import { gql } from "apollo-server-core";

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    customToken: String
    customTokenExpired: Int
    refreshToken: String
    refreshTokenExpired: Int
  }
  type Mutation {
    login(email: String, phonenumber: String, password: String!): LoginResult!
  }
`;
