import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    registSignitureBread(breadList: [Int]): MutationResponse
  }
`;
