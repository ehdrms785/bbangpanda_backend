import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const DeleteCartBreadMutation: Resolvers = {
  Mutation: {
    deleteCartBread: protectResolver(
      async (
        _,
        { cartBreadIdList }: { cartBreadIdList: number[] },
        { client, loggedInUser }
      ) => {
        if (!cartBreadIdList || cartBreadIdList.length === 0) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00160",
              "최소 하나 이상의 삭제할 빵이 있어야 합니다."
            ),
          };
        }
        try {
          await client.cartBread.deleteMany({
            where: {
              OR: cartBreadIdList.map((cartBreadId) => ({
                id: cartBreadId,
              })),
            },
          });
        } catch (err) {
          return {
            ok: false,
            error: makeErrorMessage("X00161", "장바구니빵 삭제 중 오류 발생"),
          };
        }

        return {
          ok: true,
        };
      }
    ),
  },
};

export default DeleteCartBreadMutation;
