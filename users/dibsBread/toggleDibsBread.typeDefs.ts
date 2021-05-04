import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleDibsBread(breadId: Int!): MutationResponse!
  }
`;
