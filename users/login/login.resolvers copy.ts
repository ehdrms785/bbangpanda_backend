import { Resolvers } from "../../types";
import admin from "firebase-admin";
import {
  comparePassword,
  encryptToken,
  getAccessToken,
  getRefreshToken,
  refTokenExtractKey,
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
        let user = null;
        if (!email && !phonenumber) {
          return {
            ok: false,
            error: "X00010",
          };
        }
        user = await client.user.findFirst({
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
            error: "X00011",
          };
        }
        const passwordCheck = await comparePassword(password, user.password);
        if (!passwordCheck) {
          return {
            ok: false,
            error: "X00012",
          };
        }
        const accessToken = await getAccessToken(user.id);
        const expiredTime = Math.floor(Date.now() / 1000) + 1800;
        console.log(`expiredTime: ${expiredTime}`);
        const refreshToken = await getRefreshToken(user.id);
        const encryptedRefreshToken = encryptToken(refreshToken);
        const refTokenKey = refTokenExtractKey(encryptedRefreshToken);
        //
        await client.user.update({
          where: {
            id: user.id,
          },
          data: {
            refToken: refTokenKey,
          },
          select: {
            id: true,
          },
        });
        // admin.auth().getUser(user.id.toString()).to
        // admin.auth().verifyIdToken()
        // admin.auth().
        return {
          ok: true,
          token: accessToken,
          expiredTime,
          refreshToken: encryptedRefreshToken,
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
