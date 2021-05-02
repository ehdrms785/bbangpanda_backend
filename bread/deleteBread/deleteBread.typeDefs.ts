import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteBread(breadId: Int!): MutationResponse!
  }
`;
