import { gql } from "apollo-server-express";

export default gql`
    type Query  {
        getBakeryDescription(bakeryId: Int!): Bakery
    }
`;
