import { Resolvers } from "../types";

const UserResolvers: Resolvers = {
  User: {
    isMe: ({ id }, _, { client, loggedInUser }) => id === loggedInUser?.id,
    orderListCount: ({ id }, _, { client }) =>
      client.orderList.count({
        where: {
          userId: id,
        },
      }),
  },
};

export default UserResolvers;
