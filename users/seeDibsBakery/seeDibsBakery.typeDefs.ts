import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeDibsBakery(userId: Int!, cursorId: Int): [Bakery]
  }
`;
