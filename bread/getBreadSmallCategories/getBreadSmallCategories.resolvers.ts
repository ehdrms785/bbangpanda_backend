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

const GetBreadSmallCategories: Resolvers = {
  Query: {
    getBreadSmallCategories: async (
      _,
      {
        largeCategoryId = "1",
      }: {
        largeCategoryId: string;
      },
      { client }
    ) => {
      try {
        console.log("여기는 GetBreadSmallCategories");

        const result = await client.breadSmallCategory.findMany({
          where: {
            largeCategoryId,
          },
          select: {
            id: true,
            category: true,
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
export default GetBreadSmallCategories;
