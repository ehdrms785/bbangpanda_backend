import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteUser(phonenumber: String!, password: String!): MutationResponse!
  }
`;
