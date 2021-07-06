import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchMarketOrders(
      searchTerm: String
      sortFilterId: String
      filterIdList: [String!]!
      cursorMarketOrderId: Int
    ): [MarketOrder]
  }
`;
