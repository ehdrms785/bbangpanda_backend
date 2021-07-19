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
    bakeryFeatures: [BakeryFeature]
    breadLargeCategories: [BreadLargeCategory]
    breadSmallCategories: [BreadSmallCategory]
    createdAt: String!
    updatedAt: String!
  }

  type BakeryFeature {
    id: String!
    filter: String!
    bakeries: [Bakery]
  }

`;
