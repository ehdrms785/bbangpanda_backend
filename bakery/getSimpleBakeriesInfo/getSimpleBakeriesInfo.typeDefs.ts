import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getSimpleBakeriesInfo(
      sortFilterId: String!
      filterIdList: [String]
      cursorBakeryId: Int
    ): [Bakery]
  }
`;
