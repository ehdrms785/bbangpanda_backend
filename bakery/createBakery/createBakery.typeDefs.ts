import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createBakery(
      name: String!
      address: String
      description: String
      detailDescription: String
    ): MutationResponse!
  }
`;
