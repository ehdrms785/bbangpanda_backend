import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import { getBreadsFromBakery } from "../bread.utils";

const GetBakeryBreadsQuery: Resolvers = {
  Query: {
    getBakeryBreads: async (
      _,
      {
        bakeryId,
        cursorBreadId,
      }: {
        bakeryId: number;
        cursorBreadId?: number;
      }
    ) => {
      if (!bakeryId) {
        return {
          ok: false,
          error: makeErrorMessage("X00065 ", "베이커리 id가 없습니다."),
        };
      }
      return getBreadsFromBakery(bakeryId, cursorBreadId);
    },
  },
};

export default GetBakeryBreadsQuery;
