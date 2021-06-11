import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const EditCartBreadMutation: Resolvers = {
  Mutation: {
    editCartBread: protectResolver(
      async (
        _,
        { cartBreadId, quantity }: { cartBreadId: number; quantity: number },
        { client, loggedInUser }
      ) => {
        if (!quantity || quantity < 0) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00165",
              "올바르지 않은 수량을 입력했습니다"
            ),
          };
        }
        const cartBreadExist = await client.cartBread.findFirst({
          where: {
            id: cartBreadId,
            userId: loggedInUser?.id,
          },
          select: {
            id: true,
          },
        });
        if (!cartBreadExist) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00166",
              "해당 Id를 가진 장바구니 상품이 존재하지 않습니다"
            ),
          };
        }
        try {
          await client.cartBread.update({
            where: {
              id: cartBreadId,
            },
            data: {
              quantity,
            },
          });
          return {
            ok: true,
          };
        } catch (err) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00167",
              "상품 수령 수정중에 문제가 발생했습니다."
            ),
          };
        }
      }
    ),
  },
};

export default EditCartBreadMutation;
