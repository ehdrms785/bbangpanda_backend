import { gql } from "apollo-server-core";

export default gql`
  type Bakery {
    id: Int!
    name: String!
    address: String
    description: String
    detailDescription: String
    breads(cursorBreadId: Int): [Bread]
    signitureBreads: [Bread]
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
