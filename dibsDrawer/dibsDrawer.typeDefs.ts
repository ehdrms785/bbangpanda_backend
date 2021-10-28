import { gql } from "apollo-server-express";

export default gql`
    type DibsDrawerList {
        id: Int!
        dibsDrawers: [DibsDrawer]
    }

    type DibsDrawer {
        id: Int!
        name: String!
        item(count: Int): [Bread]
        itemCount: Int!
    }
`;