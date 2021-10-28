import { gql } from "apollo-server-core";

export default gql`
  type Bread {
    id: Int!
    thumbnail: String
    name: String!
    bakeryName: String
    price: Int!
    costPrice: Int!
    discount: Int!
    description: String
    detailDescription: String
    isSigniture: Boolean!
    isMine: Boolean!
    isGotDibs: Boolean!
    gotDibsUserCount: Int
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
