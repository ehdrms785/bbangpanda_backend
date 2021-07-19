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
    breadLargeCategories: ({ id }, _, { client }) =>
      client.breadLargeCategory.findMany({
        where: {
          bakeries: {
            some: {
              id,
            },
          },
        },
      }),
    breadSmallCategories: ({ id }, _, { client }) =>
      client.breadSmallCategory.findMany({
        where: {
          bakeries: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default BakeryResolvers;
