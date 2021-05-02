import { Resolvers } from "../types";

const BreadResolvers: Resolvers = {
  Bread: {
    isMine: ({ ownerId }, __, { loggedInUser }) => loggedInUser?.id === ownerId,
  },
};

export default BreadResolvers;
