import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getSimpleBreadsInfo(
      largeCategoryId: String
      smallCategoryId: String
      sortFilterId: String!
      filterIdList: [String]
      cursorId: Int
    ): [Bread]
  }
`;
