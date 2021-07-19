import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createBread(
      breadLargeCategoryId: String!
      breadSmallCategoryId: String!
      name: String!
      costPrice: Int!
      discount: Int
      description: String
      detailDescription: String
    ): MutationResponse!
  }
`;
