import { Resolvers } from "../types";

const UserResolvers: Resolvers = {
  User: {
    isMe: ({ id }, _, { client, loggedInUser }) => id === loggedInUser?.id,
  },
};

export default UserResolvers;
