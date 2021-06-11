import { gql } from "apollo-server-core";

export default gql`
  type MutationResponse {
    ok: Boolean!
    error: String
  }
  type SecureMutationResponse {
    ok: Boolean!
    error: String
  }
  type SendSmsMutationResponse {
    ok: Boolean!
    error: String
    code: String
  }
  type Mutation {
    sendSms(phonenumber: String!): SendSmsMutationResponse!
  }
`;
