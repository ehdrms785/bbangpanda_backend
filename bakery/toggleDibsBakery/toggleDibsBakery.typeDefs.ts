import { gql } from "apollo-server-express";

export default gql`

    type Mutation {
        toggleDibsBakery(bakeryId:Int):MutationResponse!
    }
`;