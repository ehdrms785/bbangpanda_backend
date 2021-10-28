import { Resolvers } from "../../types";
import admin from "firebase-admin";

import {
  calcExpiredTime,
  convertPhoneNumber,
  encryptToken,
  getCustomToken,
  getRefreshToken,
  hashingPassword,
  refTokenExtractKey,
  userRefTokenKeyUpdate,
} from "../users.utils";
import { makeErrorMessage } from "../../shared/shared.utils";
import client from "../../client";

const userExsitWith = async ({
  username,
  email,
  phonenumber,
}: {
  username?: string;
  email?: string;
  phonenumber?: string;
}): Promise<Boolean> => {
  const userExist = await client.user.findUnique({
    where: {
      ...(username && { username }),
      ...(email && { email }),
      ...(phonenumber && { phonenumber }),
    },
    select: {
      id: true,
    },
  });
  return userExist !== null;
};

const firebaseUserDelete = async (uid: string) => {
  if (uid) {
    try {
      await admin.auth().deleteUser(uid);
    } catch (e) {
      console.log("파이어베이스 아이디 삭제 실패");
    }
  }
};
const CreateUserMutation: Resolvers = {
  Mutation: {
    createUser: async (
      _,
      {
        username,
        email,
        address,
        phonenumber,
        password,
        uid,
      }: {
        username: string;
        email: string;
        address?: string;
        phonenumber: string;
        password: string;
        uid: string;
      },
      { client }
    ) => {
      try {
        if (!username || !email || !phonenumber || !password) {
          return {
            ok: false,
            error: makeErrorMessage("X00020", "필수 입력값을 입력 해 주세요"),
          };
        }
        email = email.toLowerCase();
        if (await userExsitWith({ email })) {
          return {
            ok: false,
            error: makeErrorMessage("X00021-1", "중복된 이메일이 존재합니다."),
          };
        }
        if (await userExsitWith({ username })) {
          return {
            ok: false,
            error: makeErrorMessage("X00021-2", "중복된 이름이 존재합니다."),
          };
        }
        if (await userExsitWith({ phonenumber })) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00021-3",
              "중복된 휴대폰번호가 존재합니다."
            ),
          };
        }
        firebaseUserDelete(uid);
        const hashedPassword = await hashingPassword(password);

        const createdUser = await client.user.create({
          data: {
            username,
            email,
            address,
            phonenumber,
            password: hashedPassword,
            dibsDrawerList: {
              create: {
              }
            }
          },
          select: {
            id: true,
            email: true,
            phonenumber: true,
          },
        });

        //파이어 베이스 회원가입

        const updateParams = {
          uid: createdUser.id.toString(),
          email: createdUser.email,
          phoneNumber: convertPhoneNumber(createdUser.phonenumber),
        };
        console.log(
          `phoneNumber: ${convertPhoneNumber(createdUser.phonenumber)}`
        );
        try {
          await admin.auth().createUser(updateParams as any);
        } catch (err) {
          console.log(err);
          console.log("야호");
          await client.user.delete({
            where: {
              id: createdUser.id,
            },
          });
          return {
            ok: false,
            error: makeErrorMessage("X00022", "파이어베이스 회원가입실패"),
          };
        }
        const customToken = await getCustomToken(createdUser.id);
        const refreshToken = await getRefreshToken(createdUser.id);
        const refTokenKey = refTokenExtractKey(refreshToken);
        //
        await userRefTokenKeyUpdate(createdUser.id, refTokenKey);

        console.log(`customToken:${customToken}`);
        console.log(`refreshToken: ${refreshToken}`);

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
        console.log(e);
        return {
          ok: false,
          error: makeErrorMessage(
            "X00023",
            "같은 오류가 반복된다면 관리자에게 문의 해 주세요."
          ),
        };
      }
    },
  },
};

export default CreateUserMutation;
