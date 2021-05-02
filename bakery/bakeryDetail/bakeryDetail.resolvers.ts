import { Resolvers } from "../../types";

const BakeryDetailQuery: Resolvers = {
  Query: {
    bakeryDetail: (_, { bakeryId }: { bakeryId: number }, { client }) =>
      client.bakery.findUnique({
        where: {
          id: bakeryId,
        },
      }),
  },
};
export default BakeryDetailQuery;
