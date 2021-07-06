import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchBreads(
      searchTerm: String!
      sortFilterId: String!
      filterIdList: [String]
      cursorBreadId: Int
    ): [Bread]
  }
`;
