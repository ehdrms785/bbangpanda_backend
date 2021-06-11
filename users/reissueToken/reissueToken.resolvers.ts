import { Resolvers } from "../../types";
import {
  decryptToken,
  encryptToken,
  refTokenExtractKey,
  getRefreshToken,
  verifyToken,
  userRefTokenKeyUpdate,
  protectResolver,
  calcExpiredTime,
} from "../users.utils";
import { TokenExpiredError } from "jsonwebtoken";
import { makeErrorMessage } from "../../shared/shared.utils";
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
          error: makeErrorMessage("X00001", "Ref 토큰이 없습니다."),
        };
      }
      console.log(refreshToken);
      const decryptedRefreshToken = decryptToken(refreshToken);
      if (!decryptedRefreshToken) {
        return {
          ok: false,
          error: makeErrorMessage("X00002", "Ref 토큰 Decrpyting 에러"),
        };
      }
      try {
        const { key, exp } = verifyToken(decryptedRefreshToken) as {
          key: string;
          exp: number;
        };
        console.log(
          `key:${key} :: exp:${exp} :: 남은시간:${
            (exp - Date.now() / 1000) / 60 / 60
          }시간`
        );
        if (!key.endsWith(`${process.env.RSKEY}`)) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00007",
              "로그아웃 한 후 다시 로그인 해 주세요"
            ),
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
            error: makeErrorMessage(
              "X00003",
              "토큰을 가진 유저가 존재하지 않습니다."
            ),
          };
        }
        let newRefToken = null;
        let refreshTokenExpired = null;
        // 5일: 432,000초 (Ref토큰 발행일이 5일 미만 남았을 때 재 발행)
        if (exp - Date.now() / 1000 < 432000) {
          console.log("리프레쉬토큰 재발행");

          const newRefreshToken = await getRefreshToken(userId);
          const refTokenKey = refTokenExtractKey(refreshToken);
          await userRefTokenKeyUpdate(userId, refTokenKey);
          newRefToken = newRefreshToken;
          refreshTokenExpired = calcExpiredTime(
            `${process.env.REFTOKEN_EXPIRED}`
          );
        } else {
          //ref 토큰 가져와서 비교
          if (!user?.refToken) {
            return {
              ok: false,
              error: makeErrorMessage("X00004", "Ref 토큰이 없습니다."),
            };
          }
          const checkKey = refTokenExtractKey(refreshToken);
          if (checkKey != user.refToken) {
            return {
              ok: false,
              error: makeErrorMessage("X00005", "Rf 토큰 검증 실패"),
            };
          }
        }
        console.log("여기까지 오면 성공인데");
        return {
          ok: true,
          ...(newRefToken && {
            refreshToken: newRefToken,
            refreshTokenExpired,
          }),
        };
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          return {
            ok: false,
            error: makeErrorMessage("X00006", "토큰 만료"),
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
