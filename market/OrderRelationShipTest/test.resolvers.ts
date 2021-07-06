import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import client from "../../client";
import { getSimpleBakeriesInfoModule } from "../../bakery/bakerySharedFunctions";
import { getSimpleMarketOrdersInfoModule } from "../marketOrderSharedFunctions";

const Test: Resolvers = {
  Query: {
    test: async (
      _,
      {
        cursorId,
      }: {
        cursorId: number;
      }
    ) => {
      return client.post.findMany({
        ...(cursorId && { cursor: { id: cursorId } }),
        skip: cursorId ? 1 : 0,
        take: 4,
        orderBy: {
          LikedPeople: { _count: "desc" },
        },
      });
    },
  },
};

export default Test;
