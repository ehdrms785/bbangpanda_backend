import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchBakeries(searchTerm: String, cursorBakeryId: Int): [Bread]
  }
`;
