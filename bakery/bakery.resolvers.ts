import { getBreadsFromBakery } from "../bread/bread.utils";
import { Resolvers } from "../types";

const BakeryResolvers: Resolvers = {
  Bakery: {
    breads: ({ id }, { cursorBreadId }) =>
      getBreadsFromBakery(id, cursorBreadId),
    isMine: ({ ownerId }, _, { loggedInUser }) => ownerId === loggedInUser?.id,
  },
};

export default BakeryResolvers;
