import { gql } from "apollo-server-core";

export default gql`
  type Query {
    test(cursorId: Int): [Post]
  }

  type Post {
    id: Int!
    title: String!
    LikedPeople: [Person]
  }

  type Person {
    id: Int!
    likePosts: [Post]
  }
`;
