import { gql } from "apollo-server-express";

export default gql`
    type Query {
        fetchDibsDrawerItems(
            drawerId: Int!,
            cursorBreadId: Int
        ): [Bread]
    }
`;