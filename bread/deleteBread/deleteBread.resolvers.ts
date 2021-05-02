import { gql } from "apollo-server-core";
import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const DeleteBreadMuation: Resolvers = {
  Mutation: {
    deleteBread: protectResolver(
      async (_, { breadId }, { client, loggedInUser }) => {
        if (!breadId) {
          return {
            ok: false,
            error: makeErrorMessage("X00070", "제공된 정보가 없습니다."),
          };
        }
        const breadExisted = await client.bread.findFirst({
          where: {
            id: breadId,
            bakery: {
              ownerId: loggedInUser?.id,
            },
          },
          select: {
            id: true,
          },
        });
        if (!breadExisted) {
          return {
            ok: false,
            error: makeErrorMessage("X00071", "삭제 할 수 있는 빵이 없습니다."),
          };
        }
        try {
          await client.bread.delete({
            where: {
              id: breadId,
            },
          });
        } catch (err) {
          return {
            ok: false,
            error: makeErrorMessage("X00072", "빵 삭제에 실패 했습니다."),
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default DeleteBreadMuation;
