import { Resolvers } from "../../types";

const SeeDibsBreadQuery: Resolvers = {
  Query: {
    seeDibsBread: async (
      _,
      { userId, cursorId }: { userId: number; cursorId?: number },
      { client }
    ) => {
      if (!userId) {
        return null;
      }
      return client.bread.findMany({
        where: {
          dibedUsers: {
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

export default SeeDibsBreadQuery;
