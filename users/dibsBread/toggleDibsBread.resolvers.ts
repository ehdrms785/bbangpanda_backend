import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const ToggleDibsBreadMutation: Resolvers = {
  Mutation: {
    toggleDibsBread: protectResolver(
      async (_, { breadId }: { breadId: number }, { client, loggedInUser }) => {
        if (!breadId) {
          return {
            ok: false,
            error: makeErrorMessage("X00025", "빵 Id가 제공되지 않았습니다"),
          };
        }
        try {
          const breadExist = await client.bread.findUnique({
            where: {
              id: breadId,
            },
            select: {
              id: true,
            },
          });
          if (!breadExist) {
            return {
              ok: false,
              error: makeErrorMessage(
                "X00025-1",
                "해당 Id를 가진 빵이 존재하지 않습니다"
              ),
            };
          }
          const userAlreadyDibed = await client.bread.findFirst({
            where: {
              id: breadId,
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
              dibsBread: {
                ...(userAlreadyDibed && {
                  disconnect: {
                    id: breadId,
                  },
                }),
                ...(!userAlreadyDibed && {
                  connect: {
                    id: breadId,
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
            error: makeErrorMessage("X00026", "찜한빵 정보 업데이트 실패"),
          };
        }
      }
    ),
  },
};

export default ToggleDibsBreadMutation;
