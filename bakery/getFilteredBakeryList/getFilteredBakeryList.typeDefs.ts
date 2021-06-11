import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getFilteredBakeryList(filterIdList: [String!]!, cursorId: Int): [Bakery]
  }
`;
