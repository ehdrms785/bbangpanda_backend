import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editCartBread(cartBreadId: Int!, quantity: Int!): MutationResponse!
  }
`;
