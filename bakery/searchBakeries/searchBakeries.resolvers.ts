import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import client from "../../client";
import { getSimpleBakeriesInfoModule } from "../bakerySharedFunctions";

const SearchBakeriesQuery: Resolvers = {
  Query: {
    searchBakeries: async (
      _,
      {
        searchTerm,
        sortFilterId,
        filterIdList,
        cursorBakeryId,
      }: {
        searchTerm: string;
        sortFilterId: string;
        filterIdList: string[];
        cursorBakeryId?: number;
      }
    ) => {
      if (searchTerm == "") return null;
      return getSimpleBakeriesInfoModule({
        searchTerm,
        filterIdList,
        sortFilterId,
        cursorBakeryId,
      });
    },
  },
};

export default SearchBakeriesQuery;
