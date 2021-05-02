import { gql } from "apollo-server-core";

export default gql`
  type Bread {
    id: Int!
    name: String!
    price: Int!
    description: String
    detailDescription: String
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
