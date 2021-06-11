import { gql } from "apollo-server-core";

export default gql`
  type Bread {
    id: Int!
    name: String!
    price: Int!
    description: String
    detailDescription: String
    isSigniture: Boolean!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type BreadFeatures {
    id: String!
    filter: String!
    breads: [Bread]
  }
`;
