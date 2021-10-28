import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";
import crypto from "crypto-js";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
import ms from "ms";
import { makeErrorMessage } from "../shared/shared.utils";

// import {MutationResponse} from "../types";

export const getUser = async (accessToken: string | undefined) => {
  try {
    console.log("getUser 들어왔다");
    console.log(accessToken);
    if (
      accessToken == null ||
      accessToken == "" ||
      !accessToken.startsWith("Bearer ")
    ) {
      return null;
    }
    accessToken = accessToken.substr(7);
    const { uid } = await admin.auth().verifyIdToken(accessToken);
    const user = await client.user.findUnique({
      where: {
        id: parseInt(uid),
      },
      select: {
        id: true,
      },
    });
    if (user) {
      console.log("유저 있음");
      return user;
    } else {
      console.log("유저 없음");
      return null;
    }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log("토큰 만료");
      return null;
    } else if (err instanceof JsonWebTokenError) {
      console.log("토큰 인증 불가");
      return null;
    }
    console.log("getUser 에러 발생");
    console.log(err);
    return null;
  }
};

export const protectResolver =
  (ourResolver: Resolver): Resolver =>
  async (root, args, context, info) => {
    try {
      console.log("여기는 오나?");
      if (context.loggedInUser == null) {
        let isQuery = info.operation.operation === "query";
        console.log(isQuery);

        if (isQuery) {
          return null;
        } else {
          return {
            ok: false,
            error: makeErrorMessage('X01000', '로그인이 필요합니다.')
          };
        }
      }
    } catch (err) {
      console.log(err);
    }
    return ourResolver(root, args, context, info);
  };

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  return bcrypt.compare(password, hashPassword);
};

export const encryptToken = (token: string) => {
  return crypto.AES.encrypt(token, `${process.env.ENCRYPT_KEY}`).toString();
};
export const decryptToken = (token: string) => {
  try {
    const newToken = crypto.AES.decrypt(
      token,
      `${process.env.ENCRYPT_KEY}`
    ).toString(crypto.enc.Utf8);
    return newToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const calcExpiredTime = (time_format_ms: string): number => {
  console.log("시간결과검사");
  console.log(Date.now());
  console.log(ms(time_format_ms));
  console.log((Date.now() + ms(time_format_ms)));
  console.log((Date.now() + ms(time_format_ms)) / 1000);
  console.log(Math.floor((Date.now() + ms(time_format_ms)) / 1000));
  return Math.floor((Date.now() + ms(time_format_ms)) / 1000);
};1628562725 

export const getCustomToken = async (id: number): Promise<string> => {
  return admin.auth().createCustomToken(id.toString());
};
export const getRefreshToken = async (id: number): Promise<string> => {
  const refreshToken = jwt.sign(
    {
      key: `${id}${process.env.RSKEY}`,
    },
    `${process.env.SECRET_KEY}`,
    {
      expiresIn: `${process.env.REFTOKEN_EXPIRED}`,
    }
  );
  const encryptedRefreshToken = encryptToken(refreshToken);
  return encryptedRefreshToken;
};
export const refTokenExtractKey = (refreshToken: string) => {
  return `
  ${refreshToken.substring(10, 12)}${refreshToken.substring(
    20,
    22
  )}${refreshToken.substring(30, 32)}
  `.trim();
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, `${process.env.SECRET_KEY}`);
};

export const convertPhoneNumber = (phoneNumber: string): string => {
  //E.164 Standard
  if (phoneNumber.startsWith("0")) {
    phoneNumber = `+82${phoneNumber.replace("0", "")}`;
  }
  return phoneNumber;
};

export const hashingPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, parseInt(`${process.env.HASHCOUNT}`));
};
export const userRefTokenKeyUpdate = async (
  id: number,
  refTokenKey: string
) => {
  try {
    await client.user.update({
      where: {
        id,
      },
      data: {
        refToken: refTokenKey,
      },
      select: {
        id: true,
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getFirebaseUser = async (id: number | string) => {
  try {
    if (typeof id === "number") {
      return admin.auth().getUser(id.toString());
    } else {
      return admin.auth().getUser(id);
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteFirebaseUser = async (id: number | string) => {
  try {
    if (typeof id === "number") {
      return admin.auth().deleteUser(id.toString());
    } else {
      return admin.auth().deleteUser(id);
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};
