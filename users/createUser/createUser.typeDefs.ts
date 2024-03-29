import { gql } from "apollo-server-core";

export default gql`
  type CreateUserMutationResult {
    ok: Boolean!
    error: String
    customToken: String
    customTokenExpired: Int
    refreshToken: String
    refreshTokenExpired: Int
  }
  type Mutation {
    createUser(
      username: String!
      email: String!
      address: String
      phonenumber: String!
      password: String!
      uid: String!
    ): CreateUserMutationResult!
  }
`;
