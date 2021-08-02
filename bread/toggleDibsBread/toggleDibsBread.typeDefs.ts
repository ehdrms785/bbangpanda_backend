import { gql } from "apollo-server-express";

export default gql`
    type Mutation {
        toggleDibsBread(breadId: Int):MutationResponse!
    }
`;