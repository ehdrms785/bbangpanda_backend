import { gql } from "apollo-server-express";


export default gql`
    type Mutation {
        addItemToDibsDrawer(
            id: Int,
            itemId: Int!,
        ): MutationResponse!
    }
`;
