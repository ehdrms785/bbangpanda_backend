import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        deleteDibsDrawer(id: Int!): MutationResponse!
    }
`;