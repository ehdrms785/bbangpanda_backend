import { Resolvers } from "../../types";

const SeeDibsBakeryQuery: Resolvers = {
  Query: {
    seeDibsBakery: async (
      _,
      { userId, cursorId }: { userId: number; cursorId?: number },
      { client }
    ) => {
      if (!userId) {
        return null;
      }
      return client.bakery.findMany({
        where: {
          gotDibsUsers: {
            some: {
              id: userId,
            },
          },
        },
        ...(cursorId && {
          cursor: {
            id: cursorId,
          },
          skip: cursorId ? 1 : 0,
          take: 1,
        }),
      });
    },
  },
};

export default SeeDibsBakeryQuery;
