import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchBakeries(
      searchTerm: String
      sortFilterId: String
      filterIdList: [String!]!
      cursorBakeryId: Int
    ): [Bakery]
  }
`;
