import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createBread(
      name: String!
      costPrice: Int!
      discount: Int
      description: String
      detailDescription: String
    ): MutationResponse!
  }
`;
