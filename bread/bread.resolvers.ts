import client from "../client";
import { Resolvers } from "../types";

const BreadResolvers: Resolvers = {
  Bread: {
    isMine: ({ ownerId }, __, { loggedInUser }) => loggedInUser?.id === ownerId,
    bakeryName: async ({ id, name }, _, { client }) => {
      console.log(`breadId :${id} name: ${name}`);
      const bakery = await client.bakery.findFirst({
        where: {
          breads: {
            some: {
              id,
            },
          },
        },
        select: {
          name: true,
        },
      });
      return bakery?.name;
    },
    breadFeatures: ({ id }, _, { client }) =>
      client.bread
        .findFirst({
          where: {
            id,
          },
        })
        .breadFeatures(),
        isGotDibs: async({id}, _, {loggedInUser}) => {
          const isGotDibs = await client.bread.findFirst({
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
      gotDibsUserCount: ({id}, _, {client}) => client.user.count({where: {
          dibsBreads: {
              some: {
                  id: id
              }
            }
          }
        })
  },
};

export default BreadResolvers;
