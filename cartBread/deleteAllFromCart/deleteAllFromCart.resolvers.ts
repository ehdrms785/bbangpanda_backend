import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const DeleteAllFromCartMutation: Resolvers = {
  Mutation: {
    deleteAllFromCart: protectResolver(
      async (_, {}, { client, loggedInUser }) => {
        try {
          await client.cartBread.deleteMany({
            where: {
              userId: loggedInUser?.id,
            },
          });
        } catch (err) {
          return {
            ok: false,
            error: makeErrorMessage("X00163", "장바구니빵 삭제 중 오류 발생"),
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default DeleteAllFromCartMutation;
