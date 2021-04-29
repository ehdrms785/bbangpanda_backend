import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import {
  calcExpiredTime,
  comparePassword,
  encryptToken,
  getCustomToken,
  getRefreshToken,
  refTokenExtractKey,
  userRefTokenKeyUpdate,
} from "../users.utils";

const LoginMutation: Resolvers = {
  Mutation: {
    login: async (
      _,
      {
        email,
        phonenumber,
        password,
      }: {
        email?: string;
        phonenumber?: string;
        password: string;
      },
      { client }
    ) => {
      try {
        if (!email && !phonenumber) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00010",
              "휴대폰번호나 이메일 둘 중 하나는 입력되어야 합니다."
            ),
          };
        }
        const user = await client.user.findFirst({
          where: {
            ...(phonenumber && { phonenumber }),
            ...(email && { email: email.toLowerCase() }),
          },
          select: {
            id: true,
            password: true,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00011",
              "해당 이메일 혹은 휴대폰번호를 가진 유저가 없습니다"
            ),
          };
        }
        const passwordCheck = await comparePassword(password, user.password);
        if (!passwordCheck) {
          return {
            ok: false,
            error: makeErrorMessage("X00012", "비밀번호 오류"),
          };
        }
        const customToken = await getCustomToken(user.id);
        const refreshToken = await getRefreshToken(user.id);
        const refTokenKey = refTokenExtractKey(refreshToken);
        //
        await userRefTokenKeyUpdate(user.id, refTokenKey);
        const customTokenExpired = calcExpiredTime(
          `${process.env.CSTOKEN_EXPIRED}`
        );
        const refreshTokenExpired = calcExpiredTime(
          `${process.env.REFTOKEN_EXPIRED}`
        );
        return {
          ok: true,
          customToken,
          customTokenExpired,
          refreshToken,
          refreshTokenExpired,
        };
      } catch (e) {
        return {
          ok: false,
          error: e,
        };
      }
    },
  },
};

export default LoginMutation;
