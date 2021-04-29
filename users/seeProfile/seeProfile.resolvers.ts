import { Resolvers } from "../../types";

const SeeProfileQuery: Resolvers = {
  Query: {
    seeProfile: (_, { username }: { username: string }, { client }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

export default SeeProfileQuery;
