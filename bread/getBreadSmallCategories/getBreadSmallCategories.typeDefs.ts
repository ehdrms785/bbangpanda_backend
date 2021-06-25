import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getBreadSmallCategories(largeCategoryId: String): [BreadSmallCategory]
  }
`;
