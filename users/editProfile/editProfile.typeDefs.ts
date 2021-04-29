import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      username: String
      avatar: String
      address: String
      phonenumber: String
    ): SecureMutationResponse!
  }
`;
