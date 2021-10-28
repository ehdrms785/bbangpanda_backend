// import { makeErrorMessage } from "../../shared/shared.utils";
// import { Resolvers } from "../../types";
// import { protectResolver } from "../../users/users.utils";

// const GetDibsDrawerListQuery: Resolvers = {
//   Query: {
//     getDibsDrawerList: protectResolver(
//       async (_,__, { client, loggedInUser }) => {

//         // const result = await client.dibsDrawerList.findFirst({
//         //   where: {
//         //     userId: loggedInUser?.id
//         //   },
//         // }).dibsDrawers();

//         const result = await client.dibsDrawer.findMany({
//           where: {
//             dibsDrawerList: {
//               userId: loggedInUser?.id
//             }
//           },
//           select: {
//             id: true,
//             name: true,
//           }, 
//         });
//         console.log('GetDibsDrawerList 결과보기');
//         console.log(result);
//         console.log(`result.length = ${result.length}`);
//         if(result.length == 0) return null;

       
//         return result;
//        }
//     ),
//   },
// };

// export default GetDibsDrawerListQuery;
