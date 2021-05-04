import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const ToggleDibsBakeryMutation: Resolvers = {
  Mutation: {
    toggleDibsBakery: protectResolver(
      async (
        _,
        { bakeryId }: { bakeryId: number },
        { client, loggedInUser }
      ) => {
        if (!bakeryId) {
          return {
            ok: false,
            error: makeErrorMessage("X00028", "빵집 Id가 제공되지 않았습니다"),
          };
        }
        try {
          const bakeryExist = await client.bakery.findUnique({
            where: {
              id: bakeryId,
            },
            select: {
              id: true,
            },
          });
          if (!bakeryExist) {
            return {
              ok: false,
              error: makeErrorMessage(
                "X00028-1",
                "해당 Id를 가진 빵집이 존재하지 않습니다"
              ),
            };
          }
          const userAlreadyDibed = await client.bakery.findFirst({
            where: {
              id: bakeryId,
              dibedUsers: {
                some: {
                  id: loggedInUser?.id,
                },
              },
            },
            select: {
              id: true,
            },
          });
          await client.user.update({
            where: {
              id: loggedInUser?.id,
            },
            data: {
              dibsBakeries: {
                ...(userAlreadyDibed && {
                  disconnect: {
                    id: bakeryId,
                  },
                }),
                ...(!userAlreadyDibed && {
                  connect: {
                    id: bakeryId,
                  },
                }),
              },
            },
          });
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            error: makeErrorMessage("X00029", "찜한 빵집 정보 업데이트 실패"),
          };
        }
      }
    ),
  },
};

export default ToggleDibsBakeryMutation;
