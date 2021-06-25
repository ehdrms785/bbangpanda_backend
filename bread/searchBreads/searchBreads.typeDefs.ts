import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchBreads(searchTerm: String, cursorBreadId: Int): [Bread]
  }
`;
