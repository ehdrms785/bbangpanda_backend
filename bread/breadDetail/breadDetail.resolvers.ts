import { codeSpeedTestEnd, codeSpeedTestStart } from "../../shared/shared.utils";
import { Resolvers } from "../../types";

const GetBreadDetailQuery: Resolvers = {
  Query: {
    getBreadDetail: async (_, { breadId }: { breadId: number }, { client,loggedInUser}) => {
      

      const breadResult = await client.bread.findUnique({
        where: {
          id: breadId,
        },
        select: {
          id: true,
          name: true,
          thumbnail: true,
          costPrice: true,
          price: true,
          discount: true,
          description: true,
          detailDescription: true,
          bakeryId: true,
        }
      });

      if(breadResult == null) {
        return null;
      }
      const bakeryResult = await client.bakery.findUnique({
        where: {
          id: breadResult.bakeryId!,
        },
        select: {
          id:true,
          name:true,
          thumbnail:true,
          bakeryFeatures: true
        }
      });
      // const gotDibsUserCount = await client.user.count({
      //   where: {
      //     dibsBreads: {
      //       some: {
      //         id: breadId
      //       }
      //     }
      //   }
      // })


      return {
        bread: {...breadResult},
        bakery: {...bakeryResult},
      };
    }
  },
};
export default GetBreadDetailQuery;
