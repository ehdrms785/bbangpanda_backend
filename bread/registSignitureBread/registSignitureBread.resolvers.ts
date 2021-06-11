import {
  codeSpeedTestEnd,
  codeSpeedTestStart,
  makeErrorMessage,
} from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const RegistSignitureBread: Resolvers = {
  Mutation: {
    registSignitureBread: protectResolver(
      async (
        _,
        { breadList }: { breadList: number[] },
        { client, loggedInUser }
      ) => {
        if (!breadList || breadList.length === 0) {
          return {
            ok: false,
            error: makeErrorMessage("X00080", "제공된 리스트가 없습니다"),
          };
        }

        try {
          await client.bread.updateMany({
            where: {
              bakery: {
                ownerId: loggedInUser?.id,
              },
              isSigniture: true,
            },
            data: {
              isSigniture: false,
            },
          });
          await client.bread.updateMany({
            where: {
              OR: breadList.map((breadId) => ({
                id: breadId,
              })),
              bakery: {
                ownerId: loggedInUser?.id,
              },
            },
            data: {
              isSigniture: true,
            },
          });
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            error: makeErrorMessage("X00081", "주력메뉴 업데이트 중 오류 발생"),
          };
        }
      }
    ),
  },
};

export default RegistSignitureBread;
