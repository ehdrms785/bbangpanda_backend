import GetBakeryFilter from "../../bakery/getBakeryFilter/getBakeryFilter.resolvers";
import { Resolvers } from "../../types";

const GetBreadFilterQuery: Resolvers = {
  Query: {
    getBreadFilter: async (_, __, { client }) =>
      client.breadFeatures.findMany({
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
export default GetBreadFilterQuery;
