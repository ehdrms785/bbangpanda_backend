import client from "../client";

interface getSimpleMarketOrdersInfoArgs {
  searchTerm?: string;
  filterIdList: string[];
  sortFilterId: string;
  cursorMarketOrderId?: number;
}

export const getSimpleMarketOrdersInfoModule = async (
  args: getSimpleMarketOrdersInfoArgs
) => {
  return client.marketOrder.findMany({
    where: {
      AND: args.filterIdList.map((filterId) => ({
        marketOrderFeatures: {
          some: {
            id: filterId,
          },
        },
      })) as any,
      ...(args.searchTerm != "" && {
        orderName: {
          contains: args.searchTerm,
        },
      }),
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
    ...(args.cursorMarketOrderId && {
      cursor: { id: args.cursorMarketOrderId },
    }),
    skip: args.cursorMarketOrderId ? 1 : 0,
    take: 3,
    orderBy: {
      // 1최신 2인기 3마감임박순
      ...(args.sortFilterId == "1" && { createdAt: "desc" }),
      ...(args.sortFilterId == "2" && { dibedUsers: { _count: "desc" } }),
      ...(args.sortFilterId == "3" && { orderEndDate: "asc" }),
    },
  });
};
