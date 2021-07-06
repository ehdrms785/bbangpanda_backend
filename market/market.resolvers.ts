import { Resolvers } from "../types";

const MarketOrderResolvers: Resolvers = {
  MarketOrder: {
    // bakery: ({ bakeryId }, _, { client }) =>
    //   client.bakery.findFirst({ where: { id: bakeryId } }),
  },
};

export default MarketOrderResolvers;
