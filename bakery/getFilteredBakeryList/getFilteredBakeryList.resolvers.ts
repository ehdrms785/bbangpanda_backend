import {
  codeSpeedTestEnd,
  codeSpeedTestStart,
} from "../../shared/shared.utils";
import { Resolvers } from "../../types";

const GetFilteredBakeryListQuery: Resolvers = {
  Query: {
    getFilteredBakeryList: async (
      _,
      {
        sortFilterId,
        filterIdList,
        cursorId,
      }: { sortFilterId: String; filterIdList: String[]; cursorId: number },
      { client }
    ) => {
      if (filterIdList == null || filterIdList.length == 0) {
        return null;
      }
      try {
        console.log(`cursorId: ${cursorId}`);
        console.log(filterIdList);
        const start2 = codeSpeedTestStart();

        const result = await client.bakery.findMany({
          where: {
            AND: filterIdList.map((filterId) => ({
              bakeryFeatures: {
                some: {
                  id: filterId,
                },
              },
            })) as any,
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
          ...(cursorId && { cursor: { id: cursorId } }),
          skip: cursorId ? 1 : 0,
          take: 2,
          orderBy: {
            //1최신 2 인기 3 리뷰
            ...(sortFilterId == "1" && { createdAt: "desc" }),
            ...(sortFilterId == "2" && { dibedUsers: { _count: "desc" } }),
            // ...(sortFilterId == "3" && {  }),
          },
        });
        codeSpeedTestEnd(start2);
        console.log(result);

        return result;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },
};

export default GetFilteredBakeryListQuery;