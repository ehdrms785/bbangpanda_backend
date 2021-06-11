import { getBreadsFromBakery } from "../bread/bread.utils";
import { Resolvers } from "../types";

const BakeryResolvers: Resolvers = {
  Bakery: {
    breads: ({ id }, { cursorBreadId }) =>
      getBreadsFromBakery(id, cursorBreadId),
    isMine: ({ ownerId }, _, { loggedInUser }) => ownerId === loggedInUser?.id,
    signitureBreads: ({ id }, _, { client }) =>
      client.bread.findMany({
        where: {
          bakeryId: id,
          isSigniture: true,
        },
        select: {
          id: true,
          name: true,
        },
      }),
  },
};

export default BakeryResolvers;
