import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createCartBread(breadId: Int!): MutationResponse!
  }
`;
