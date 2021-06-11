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
    bakeryFeatures: [BakeryFeatures]
    createdAt: String!
    updatedAt: String!
  }

  type BakeryFeatures {
    id: String!
    filter: String!
    bakeries: [Bakery]
  }
`;
