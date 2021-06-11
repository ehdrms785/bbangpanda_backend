import { Resolvers } from "../../types";

const GetFilteredBreadListQuery: Resolvers = {
  Query: {
    getFilteredBreadList: async (
      _,
      {
        largeCategoryId = "0",
        smallCategoryId = "0",
        sortFilterId,
        filterIdList,
        cursorId,
      }: {
        largeCategoryId: string;
        smallCategoryId: string;
        sortFilterId: string;
        filterIdList: String[];
        cursorId: number;
      },
      { client }
    ) => {
      if (filterIdList == null || filterIdList.length == 0) {
        return null;
      }
      try {
        console.log("여기는 GetFilteredBreadList");
        console.log(`cursorId: ${cursorId}`);
        console.log(filterIdList);

        const result = await client.bread.findMany({
          where: {
            AND: filterIdList.map((filterId) => ({
              breadFeatures: {
                some: {
                  id: filterId,
                },
              },
            })) as any,
            ...(largeCategoryId != "0" && {
              breadLargeCategoryId: largeCategoryId,
            }),
            ...(smallCategoryId != "0" && {
              breadSmallCategoryId: smallCategoryId,
            }),
          },
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            breadFeatures: {
              select: {
                id: true,
                filter: true,
              },
            },
          },
          ...(cursorId && { cursor: { id: cursorId } }),
          skip: cursorId ? 1 : 0,
          take: 2,
          orderBy: {
            ...(sortFilterId == "0" && { createdAt: "desc" }), // 최신순
            // ...(sortFilterId == '1' && {}), //인기순
            ...(sortFilterId == "2" && { price: "asc" }), //저가순
            // ...(sortFilterId == '1' && {createdAt: 'desc'}), //리뷰많은순
          },
        });
        console.log(result);
        return result;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },
};
export default GetFilteredBreadListQuery;
