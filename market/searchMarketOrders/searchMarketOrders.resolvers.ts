import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import client from "../../client";
import { getSimpleBakeriesInfoModule } from "../../bakery/bakerySharedFunctions";
import { getSimpleMarketOrdersInfoModule } from "../marketOrderSharedFunctions";

const SearchMarketOrders: Resolvers = {
  Query: {
    searchMarketOrders: async (
      _,
      {
        searchTerm,
        sortFilterId,
        filterIdList,
        cursorMarketOrderId,
      }: {
        searchTerm: string;
        sortFilterId: string;
        filterIdList: string[];
        cursorMarketOrderId?: number;
      }
    ) => {
      if (searchTerm == "") return null;
      return getSimpleMarketOrdersInfoModule({
        searchTerm,
        filterIdList,
        sortFilterId,
        cursorMarketOrderId,
      });
    },
  },
};

export default SearchMarketOrders;
