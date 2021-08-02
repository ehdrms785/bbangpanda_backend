import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getSimpleBreadsInfo(
      bakeryId: Int,
      largeCategoryId: String
      smallCategoryId: String
      sortFilterId: String!
      filterIdList: [String]
      cursorBreadId: Int
    ): [Bread]
  }
`;
