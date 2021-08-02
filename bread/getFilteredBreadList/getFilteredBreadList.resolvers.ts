import { prisma } from "@prisma/client";
import { Resolvers } from "../../types";
/*
BreadSortFilter
  1: 최신순
  2: 인기순
  3: 저가순
  4: 리뷰많은순

BreadOptionFilter
  1: 글루텐프리
  2: 쌀빵
  3: 무가당
*/

const GetFilteredBreadListQuery: Resolvers = {
  Query: {
    getFilteredBreadList: async (
      _,
      {
        largeCategoryId = "0",
        smallCategoryId = "0",
        sortFilterId,
        filterIdList = [],
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
      // if (filterIdList == null || filterIdList.length == 0) {
      //   return null;
      // }
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
            //1최신 2 인기 3 저가 4리뷰
            ...(sortFilterId == "1" && { createdAt: "desc" }),
            ...(sortFilterId == "2" && { gotDibsUsers: { _count: "desc" } }),
            ...(sortFilterId == "3" && { price: "asc" }),
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
