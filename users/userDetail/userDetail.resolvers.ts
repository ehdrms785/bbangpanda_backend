import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const UserDetailQuery: Resolvers = {
  Query: {
    userDetail: protectResolver(async (_, __, { client, loggedInUser }) => {
      console.log("UserDetail 들어옴?");
      return client.user.findUnique({
        where: {
          id: loggedInUser?.id,
        },
        // select: {
        //   id: true,
        //   username: true,
        //   orderList: {
        //     where: {
        //       userId: loggedInUser?.id,
        //     },
        //   },
        // },
      });
    }),
  },
};

export default UserDetailQuery;
