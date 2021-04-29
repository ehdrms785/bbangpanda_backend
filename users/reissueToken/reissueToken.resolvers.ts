import { Resolvers } from "../../types";
import {
  decryptToken,
  getAccessToken,
  encryptToken,
  refTokenExtractKey,
  getRefreshToken,
  verifyToken,
} from "../users.utils";
import { TokenExpiredError } from "jsonwebtoken";
const ReissueTokenMutation: Resolvers = {
  Mutation: {
    reissueToken: async (
      _,
      {
        refreshToken,
      }: {
        refreshToken: string;
      },
      { client }
    ) => {
      console.log("리이슈 토큰!");
      if (!refreshToken) {
        return {
          ok: false,
          error: "X00001",
        };
      }
      const decryptedRefreshToken = decryptToken(refreshToken);
      if (!decryptedRefreshToken) {
        return { ok: false, error: "X00002" };
      }
      try {
        const { key, exp } = verifyToken(decryptedRefreshToken) as {
          key: string;
          exp: any;
        };
        console.log(
          `key:${key} :: exp:${exp} :: 남은시간:${
            (exp - Date.now() / 1000) / 60 / 60
          }시간`
        );
        if (!key.endsWith(`${process.env.RSKEY}`)) {
          return {
            ok: false,
            error: "Error Code X00007\n로그아웃 한 후 다시 로그인 해 주세요",
          };
        }
        const userId = Number(key.replace(`${process.env.RSKEY}`, ""));
        console.log(`userId:${userId}`);
        const user = await client.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            refToken: true,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "X00003",
          };
        }
        let newRefToken = null;
        // 5일: 432,000초 (Ref토큰 발행일이 5일 미만 남았을 때 재 발행)
        if (exp - Date.now() / 1000 < 432000) {
          console.log("리프레쉬토큰 재발행");
          const newRefreshToken = await getRefreshToken(userId);
          const ecryptedReftoken = encryptToken(newRefreshToken);
          const refTokenKey = refTokenExtractKey(ecryptedReftoken);
          await client.user.update({
            where: {
              id: userId,
            },
            data: {
              refToken: refTokenKey,
            },
            select: {
              id: true,
            },
          });
          newRefToken = newRefreshToken;
        } else {
          //ref 토큰 가져와서 비교
          if (!user?.refToken) {
            return {
              ok: false,
              error: "X00004",
            };
          }
          const checkKey = refTokenExtractKey(refreshToken);
          if (checkKey != user.refToken) {
            return {
              ok: false,
              error: "X00005",
            };
          }
        }
        const newAccToken = await getAccessToken(userId);
        const expiredTime = Math.floor(Date.now() / 1000) + 1800;

        return {
          ok: true,
          token: newAccToken,
          expiredTime,
          ...(newRefToken && { refreshToken: newRefToken }),
        };
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          return {
            ok: false,
            error: "X00006",
          };
        } else {
          return {
            ok: false,
            error: err,
          };
        }
      }
    },
  },
};

export default ReissueTokenMutation;
