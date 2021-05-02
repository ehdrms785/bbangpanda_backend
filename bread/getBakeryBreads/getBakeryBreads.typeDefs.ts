import { gql } from "apollo-server-core";

export default gql`
  type Query {
    getBakeryBreads(bakeryId: Int!, cursorBreadId: Int): [Bread]
  }
`;
