import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import { getBreadsFromBakery } from "../bread.utils";
import client from "../../client";
import { getSimpleBreadsInfoModule } from "../breadSharedFunctions";

const SearchBreadsQuery: Resolvers = {
  Query: {
    searchBreads: async (
      _,
      {
        searchTerm,
        sortFilterId,
        filterIdList = [],
        cursorBreadId,
      }: {
        sortFilterId: string;
        filterIdList: string[];
        searchTerm: string;
        cursorBreadId: number;
      }
    ) => {
      if (searchTerm == "") return null;
      try {
        console.log("여기는 SearchBreads");

        const result = await getSimpleBreadsInfoModule({
          searchTerm,
          sortFilterId,
          filterIdList,
          cursorBreadId,
        });
        console.log(result);
        return result;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },
};

export default SearchBreadsQuery;
