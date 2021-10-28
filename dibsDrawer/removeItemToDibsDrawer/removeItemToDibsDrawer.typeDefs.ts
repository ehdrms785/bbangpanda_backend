import { gql } from "apollo-server-express";


export default gql`
    type Mutation {
        removeItemToDibsDrawer(
   
            itemId: Int!,
        ): MutationResponse!
    }
`;
