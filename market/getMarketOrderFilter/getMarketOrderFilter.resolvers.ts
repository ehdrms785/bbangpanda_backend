import { Resolvers } from "../../types";

const GetMarketOrderFilterQuery: Resolvers = {
  Query: {
    getMarketOrderFilter: async (_, __, { client }) =>
      client.marketOrderFeature.findMany({
        select: {
          id: true,
          filter: true,
        },
        orderBy: {
          id: "asc",
        },
      }),
  },
};

export default GetMarketOrderFilterQuery;
