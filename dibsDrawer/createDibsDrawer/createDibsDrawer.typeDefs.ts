import { gql } from "apollo-server-express";


export default gql`
    type CreateDibsDrawerResponse {
        ok: Boolean!,
        error: String
        dibsDrawer: DibsDrawer
    }
    type Mutation {
        createDibsDrawer(name: String!): CreateDibsDrawerResponse!
    }
`;