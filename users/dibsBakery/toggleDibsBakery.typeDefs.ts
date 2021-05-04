import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleDibsBakery(bakeryId: Int!): MutationResponse!
  }
`;
