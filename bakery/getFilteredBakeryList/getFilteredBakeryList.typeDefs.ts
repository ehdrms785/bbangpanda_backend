import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getFilteredBakeryList(
      sortFilterId: String
      filterIdList: [String!]!
      cursorBakeryId: Int
    ): [Bakery]
  }
`;
