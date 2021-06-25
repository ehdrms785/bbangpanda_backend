import { Resolvers } from "../../types";

const GetFilteredBreadListQuery: Resolvers = {
  Query: {
    getFilteredBreadList: async (
      _,
      { filterIdList, cursorId }: { filterIdList: String[]; cursorId: number },
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
