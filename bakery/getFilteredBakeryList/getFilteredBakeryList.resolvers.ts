import {
  codeSpeedTestEnd,
  codeSpeedTestStart,
} from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { getSimpleBakeriesInfoModule } from "../bakerySharedFunctions";

const GetFilteredBakeryListQuery: Resolvers = {
  Query: {
    getFilteredBakeryList: async (
      _,
      {
        sortFilterId,
        filterIdList,
        cursorBakeryId,
      }: {
        sortFilterId: string;
        filterIdList: string[];
        cursorBakeryId: number;
      },
      { client }
    ) => {
      if (filterIdList == null || filterIdList.length == 0) {
        return null;
      }
      try {
        console.log(`cursorBakeryId: ${cursorBakeryId}`);
        console.log(filterIdList);
        const start2 = codeSpeedTestStart();

        const result = await getSimpleBakeriesInfoModule({
          sortFilterId,
          filterIdList,
          cursorBakeryId,
        });
        codeSpeedTestEnd(start2);
        console.log(result);

        return result;
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  },
};

export default GetFilteredBakeryListQuery;
