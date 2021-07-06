import { Resolvers } from "../../types";
export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
const GetSimpleMarketOrdersInfoQuery: Resolvers = {
  Query: {
    getSimpleMarketOrdersInfo: async (
      _,
      {
        sortFilterId,
        filterIdList = [],
        cursorMarketOrderId,
      }: {
        sortFilterId: string;
        filterIdList: string[];
        cursorMarketOrderId: number;
      },
      { client }
    ) => {
      try {
        console.log("getSImpleMarketOrderInfo 들어왔다");
        const result = await client.marketOrder.findMany({
          where: {
            AND: filterIdList.map((filterId) => ({
              marketOrderFeatures: {
                some: {
                  id: filterId,
                },
              },
            })) as any,
          },
          select: {
            id: true,
            bakery: {
              select: {
                id: true,
                name: true,
              },
            },
            marketOrderFeatures: {
              select: {
                id: true,
                filter: true,
              },
            },
            orderName: true,
            lineUpBreads: true,
            signitureBreads: true,
            orderEndDate: true,
            orderStartDate: true,
          },

          orderBy: {
            // 1최신 2인기 3마감임박순
            ...(sortFilterId == "1" && { createdAt: "desc" }),
            ...(sortFilterId == "2" && { dibedUsers: { _count: "desc" } }),
            ...(sortFilterId == "3" && { orderEndDate: "asc" }),
          },
          ...(cursorMarketOrderId && { cursor: { id: cursorMarketOrderId } }),
          skip: cursorMarketOrderId ? 1 : 0,
          take: 3,
        });

        return result;
      } catch (e) {
        console.log(e);
      }
      return null;
    },
  },
};

export default GetSimpleMarketOrdersInfoQuery;
