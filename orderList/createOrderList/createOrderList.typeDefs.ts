import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createOrderList(
      breadIdList: [Int]
      payAmount: Int!
      discountAmount: Int
      shippingFee: Int
    ): MutationResponse!
  }
`;
