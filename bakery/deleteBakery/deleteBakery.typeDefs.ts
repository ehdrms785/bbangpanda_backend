import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteBakery(bakeryId: Int!): MutationResponse!
  }
`;
