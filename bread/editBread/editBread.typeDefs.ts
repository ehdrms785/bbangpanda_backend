import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editBread(
      breadId: Int!
      name: String
      price: Int
      description: String
      detailDescription: String
    ): MutationResponse!
  }
`;
