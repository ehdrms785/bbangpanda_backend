import client from "../client";

interface getSimpleBakeriesInfoArgs {
  searchTerm?: string;
  filterIdList: string[];
  sortFilterId: string;
  cursorBakeryId?: number;
}

export const getSimpleBakeriesInfoModule = async (
  args: getSimpleBakeriesInfoArgs
) => {
  console.log(`args.cursorBakeryId: ${args.cursorBakeryId}`);
  return client.bakery.findMany({
    where: {
      AND: args.filterIdList.map((filterId) => ({
        bakeryFeatures: {
          some: {
            id: filterId,
          },
        },
      })) as any,
      ...(args.searchTerm != "" && {
        name: {
          contains: args.searchTerm,
        },
      }),
    },
    select: {
      id: true,
      name: true,
      description: true,

      bakeryFeatures: {
        select: {
          id: true,
          filter: true,
        },
      },
    },
    ...(args.cursorBakeryId && { cursor: { id: args.cursorBakeryId } }),
    skip: args.cursorBakeryId ? 1 : 0,
    take: 2,
    orderBy: {
      //1최신 2 인기 3 리뷰
      ...(args.sortFilterId == "1" && { createdAt: "desc" }),
      ...(args.sortFilterId == "2" && { gotDibsUsers: { _count: "desc" } }),
      // ...(sortFilterId == "3" && {  }),
    },
  });
};
