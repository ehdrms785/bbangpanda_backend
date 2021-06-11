import { Resolvers } from "../../types";

const GetBakeryFilterQuery: Resolvers = {
  Query: {
    getBakeryFilter: async (_, __, { client }) =>
      client.bakeryFeature.findMany({
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

export default GetBakeryFilterQuery;
