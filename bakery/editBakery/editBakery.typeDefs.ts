import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editBakery(
      name: String
      address: String
      description: String
      detailDescription: String
    ): MutationResponse!
  }
`;
