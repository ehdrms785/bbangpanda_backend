import { Resolvers } from "../../types";

const BreadDetailQuery: Resolvers = {
  Query: {
    breadDetail: (_, { breadId }: { breadId: number }, { client }) =>
      client.bread.findUnique({
        where: {
          id: breadId,
        },
      }),
  },
};
export default BreadDetailQuery;
