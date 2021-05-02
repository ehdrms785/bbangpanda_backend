import { gql } from "apollo-server-core";
import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const DeleteBakeryMutation: Resolvers = {
  Mutation: {
    deleteBakery: protectResolver(
      async (_, { bakeryId }, { client, loggedInUser }) => {
        if (!bakeryId) {
          return {
            ok: false,
            error: makeErrorMessage("X00120", "제공된 정보가 없습니다."),
          };
        }
        const bakeryExist = await client.bakery.findFirst({
          where: {
            id: bakeryId,
            ownerId: loggedInUser?.id,
          },
          select: {
            id: true,
          },
        });
        if (!bakeryExist) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00121",
              "소유중인 삭제할 수 있는 빵집이 없습니다"
            ),
          };
        }
        try {
          await client.bakery.delete({
            where: {
              id: bakeryExist.id,
            },
          });
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            error: makeErrorMessage("X00122", "빵집 삭제에 실패 했습니다."),
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default DeleteBakeryMutation;
