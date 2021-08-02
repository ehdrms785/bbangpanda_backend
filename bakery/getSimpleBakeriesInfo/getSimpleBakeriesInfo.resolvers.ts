import { prisma } from "@prisma/client";
import { Resolvers } from "../../types";
/*
BakerySortFilter
  1: 최신순
  2: 인기순
  3: 저가순
  4: 리뷰많은순

BakeryOptionFilter
  1: 택배가능
  2: 매장취식
  3: 우리밀
  4: 유기농밀
  5: 통밀
  6: 글루텐프리
  7: 무가당
  8: 천연발효
*/

const GetSimpleBakeriesInfoQuery: Resolvers = {
  Query: {
    getSimpleBakeriesInfo: async (
      _,
      {
        sortFilterId,
        filterIdList = [],
        cursorBakeryId,
      }: {
        sortFilterId: string;
        filterIdList: String[];
        cursorBakeryId: number;
      },
      { client }
    ) => {
      // if (filterIdList == null || filterIdList.length == 0) {
      //   return null;
      // }
      try {
        console.log("여기는 GetFilteredBreadList");
        console.log(`cursorBakeryId: ${cursorBakeryId}`);
        console.log(`sortFilterId: ${sortFilterId}`);
        console.log(filterIdList);

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
          ...(cursorBakeryId && { cursor: { id: cursorBakeryId } }),
          skip: cursorBakeryId ? 1 : 0,
          take: 4,
          orderBy: {
            //1최신 2 인기 3 리뷰순
            ...(sortFilterId == "1" && { createdAt: "desc" }),
            ...(sortFilterId == "2" && {
              gotDibsUsers: { _count: "desc" },
            }),
            // ...(sortFilterId == "3" && { price: "asc" }),
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
export default GetSimpleBakeriesInfoQuery;
