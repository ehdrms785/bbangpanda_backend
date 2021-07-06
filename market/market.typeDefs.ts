import { gql } from "apollo-server-express";

export default gql`
  type MarketOrder {
    id: Int!
    bakery: Bakery
    bakeryId: Int!
    orderName: String!
    thumbnail: String
    lineUpBreads: [Bread]
    signitureBreads: [Bread]
    marketOrderFeatures: [MarketOrderFeature]
    orderStartDate: String!
    orderEndDate: String!
    createdAt: String!
    updatedAt: String!
  }

  type MarketOrderFeature {
    id: String!
    filter: String!
    marketOrders: [MarketOrder]
  }
`;
