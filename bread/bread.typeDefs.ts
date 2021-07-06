import { gql } from "apollo-server-core";

export default gql`
  type Bread {
    id: Int!
    name: String!
    bakeryName: String
    price: Int!
    discount: Int!
    description: String
    detailDescription: String
    isSigniture: Boolean!
    isMine: Boolean!
    breadFeatures: [BreadFeature]
    createdAt: String!
    updatedAt: String!
  }

  type BreadFeature {
    id: String!
    filter: String!
    breads: [Bread]
  }

  type BreadLargeCategory {
    id: String!
    category: String!
    breadSmallCategory: [BreadSmallCategory]
  }
  type BreadSmallCategory {
    id: String!
    category: String!
    breads: [Bread]
  }
`;
