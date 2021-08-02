// import client from "../client";

// export const getSimplereadsInfoModule = (
//   searchTerm = "",
//   largeCategoryId,
//   smallCategoryId,
//   sortFilterId,
//   filterIdList,
//   cursorBreadId,
// :
//   searchTerm: string;
//   largeCategoryId: string;
//   smallCategoryId: string;
//   sortFilterId: string;
//   filterIdList: String[];
//   cursorBreadId?: number;
// ) => {
//   return client.bread.findMany({
//     where: {
//       AND: filterIdList.map((filterId) => ({
//         breadFeatures: {
//           some: {
//             id: filterId,
//           },
//         },
//       })) as any,
//       ...(largeCategoryId != "0" && {
//         breadLargeCategoryId: largeCategoryId,
//       }),
//       ...(smallCategoryId != "0" && {
//         breadSmallCategoryId: smallCategoryId,
//       }),
//       ...(searchTerm != "" && {
//         name: {
//           contains: searchTerm,
//         },
//       }),
//     },
//     select: {
//       id: true,
//       name: true,
//       price: true,
//       discount: true,
//       description: true,
//       isSigniture: true,

//       breadFeatures: {
//         select: {
//           id: true,
//           filter: true,
//         },
//       },
//     },
//     ...(cursorBreadId && { cursor: { id: cursorBreadId } }),
//     skip: cursorBreadId ? 1 : 0,
//     take: 2,
//     orderBy: {
//       //1최신 2 인기 3 저가 4리뷰
//       ...(sortFilterId == "1" && { createdAt: "desc" }),
//       ...(sortFilterId == "2" && { gotDibsUsers: { _count: "desc" } }),
//       ...(sortFilterId == "3" && { price: "asc" }),
//     },
//   });
// };
