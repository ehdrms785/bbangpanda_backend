import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createBread(
      name: String!
      price: Int!
      description: String
      detailDescription: String
    ): MutationResponse!
  }
`;
