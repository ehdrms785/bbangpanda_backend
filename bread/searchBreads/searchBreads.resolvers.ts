import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import { getBreadsFromBakery } from "../bread.utils";
import client from "../../client";

const SearchBreadsQuery: Resolvers = {
  Query: {
    searchBreads: async (
      _,
      {
        searchTerm,
        cursorBreadId,
      }: {
        searchTerm: string;
        cursorBreadId?: number;
      }
    ) => {
      if (searchTerm == "") return null;
      return client.bread.findMany({
        where: {
          name: {
            contains: searchTerm,
          },
        },
        select: {
          id: true,
          name: true,
          discount: true,
          price: true,
          description: true,
        },
      });
    },
  },
};

export default SearchBreadsQuery;
