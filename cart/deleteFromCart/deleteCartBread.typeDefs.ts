import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteCartBread(cartBreadIdList: [Int]): MutationResponse!
  }
`;
