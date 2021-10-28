import { getBreadsFromBakery } from "../bread/bread.utils";
import client from "../client";
import { Resolvers } from "../types";

const BakeryResolvers: Resolvers = {
  Bakery: {
    breads: ({ id }, { cursorBreadId }) =>
      getBreadsFromBakery(id, cursorBreadId),
    isMine: ({ ownerId }, _, { loggedInUser }) => ownerId === loggedInUser?.id,
    isGotDibs: async ({id},_, {loggedInUser})=> { 
      
      const isGotDibs = await client.bakery.findFirst({
      where: {
        id,
        gotDibsUsers: {
          some: {
            id: loggedInUser?.id
          }
        },

      },
      select: {
        id: true
      }
    });
    return Boolean(isGotDibs);
  },
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
    gotDibsUserCount: ({id}, _, {client})=> client.user.count({
      where: {
        dibsBakeries: {
          some: {
            id: id
          }
        }
      }
    })
  },
};

export default BakeryResolvers;
