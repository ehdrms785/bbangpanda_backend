import { prisma } from "@prisma/client";
import { Resolvers } from "../../types";
import { getSimpleBreadsInfoModule } from "../breadSharedFunctions";
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

const GetSimpleBreadsInfoQuery: Resolvers = {
  Query: {
    getSimpleBreadsInfo: async (
      _,
      {
        bakeryId,
        largeCategoryId = "0",
        smallCategoryId = "0",
        sortFilterId,
        filterIdList = [],
        cursorBreadId,
      }: {
        bakeryId: number | undefined;
        largeCategoryId: string;
        smallCategoryId: string;
        sortFilterId: string;
        filterIdList: string[];
        cursorBreadId: number;
      },
      { client }
    ) => {
      try {
        console.log("여기는 getSimpleBreadsInfo");
        console.log(`cursorBreadId: ${cursorBreadId}`);
        console.log(`sortFilterId: ${sortFilterId}`);
        console.log(`largeCategoryId: ${largeCategoryId}`);
        console.log(`smallCategoryId: ${smallCategoryId}`);

        console.log(filterIdList);

        const result = await getSimpleBreadsInfoModule({
          bakeryId,
          largeCategoryId,
          smallCategoryId,
          sortFilterId,
          filterIdList,
          cursorBreadId: cursorBreadId,
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
export default GetSimpleBreadsInfoQuery;
