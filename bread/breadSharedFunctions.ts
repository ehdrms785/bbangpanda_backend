import client from "../client";

interface getSimpleBreadsInfoArgs {
  searchTerm?: string;
  largeCategoryId?: string;
  smallCategoryId?: string;
  sortFilterId: string;
  filterIdList: string[];
  cursorBreadId: number;
}

export const getSimpleBreadsInfoModule = (args: getSimpleBreadsInfoArgs) => {
  console.log(`cursorId: ${args.cursorBreadId}`);
  return client.bread.findMany({
    where: {
      AND: args.filterIdList.map((filterId) => ({
        breadFeatures: {
          some: {
            id: filterId,
          },
        },
      })) as any,
      ...(args.largeCategoryId != "0" && {
        breadLargeCategoryId: args.largeCategoryId,
      }),
      ...(args.smallCategoryId != "0" && {
        breadSmallCategoryId: args.smallCategoryId,
      }),
      ...(args.searchTerm != "" && {
        name: {
          contains: args.searchTerm,
        },
      }),
    },
    select: {
      id: true,
      thumbnail: true,
      name: true,
      price: true,
      discount: true,
      description: true,
      isSigniture: true,

      breadFeatures: {
        select: {
          id: true,
          filter: true,
        },
      },
    },
    ...(args.cursorBreadId && { cursor: { id: args.cursorBreadId } }),
    skip: args.cursorBreadId ? 1 : 0,
    take: 2,
    orderBy: {
      //1최신 2 인기 3 저가 4리뷰
      ...(args.sortFilterId == "1" && { createdAt: "desc" }),
      ...(args.sortFilterId == "2" && { dibedUsers: { _count: "desc" } }),
      ...(args.sortFilterId == "3" && { price: "asc" }),
    },
  });
};
