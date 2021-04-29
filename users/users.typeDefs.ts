import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    phonenumber: String!
    avatar: String
    address: String
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    dummy: String!
  }
`;
