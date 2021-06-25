import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import client from "../../client";

const SearchBakeriesQuery: Resolvers = {
  Query: {
    searchBakeries: async (
      _,
      {
        searchTerm,
        cursorBakeryId,
      }: {
        searchTerm: string;
        cursorBakeryId?: number;
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

export default SearchBakeriesQuery;
