import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getFilteredBreadList(
      largeCategoryId: String
      smallCategoryId: String
      sortFilterId: String!
      filterIdList: [String!]!
      cursorId: Int
    ): [Bread]
  }
`;
