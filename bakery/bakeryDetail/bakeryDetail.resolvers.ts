import { Resolvers } from "../../types";

const GetBakeryDetailQuery: Resolvers = {
  Query: {
    getBakeryDetail: async (
      _,
      { bakeryId }: { bakeryId: number },
      { client,loggedInUser }
    ) => {
      const bakeryResult = await client.bakery.findUnique({
        where: {
          id: bakeryId,
        },
        select: {
          id: true,
          thumbnail: true,
          name: true,
          bakeryFeatures: true,
          description: true,
          breadLargeCategories: true,
          breadSmallCateogries: true,
        },
      });
      // console.log("\n\n 베이커리 디테일 Result \n\n");
      // console.log(bakeryResult);

      // const gotDibsUserCount = await client.user.count({
      //   where: {
      //     dibsBakeries: {
      //       some: {
      //         id: bakeryId
      //       }
      //     }
      //   }
      // })
    
      return bakeryResult;
    },
  },
};
export default GetBakeryDetailQuery;
